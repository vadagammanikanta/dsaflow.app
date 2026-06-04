import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { Resend } from 'resend';
import nodemailer from 'nodemailer';

const FROM_ADDRESS   = 'dsaflow.app <noreply@dsaflow.app>';
// This is the Resend account owner email — the only address you can send TO
// on the free plan without a verified domain.
const OWNER_EMAIL    = 'vadagammanikanta2006@gmail.com';
const DOMAIN_ERROR_HINT = 'RESEND_DOMAIN_NOT_VERIFIED';

function getAdminDb() {
  if (getApps().length === 0) {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT || '{}');
    initializeApp({ credential: cert(serviceAccount) });
  }
  return getFirestore();
}

function buildBroadcastHtml(userName, subject, message, emailType) {
  const accentColor = emailType === 'announcement' ? '#06b6d4'
    : emailType === 'promotion'  ? '#a78bfa'
    : emailType === 'alert'      ? '#f59e0b'
    : '#4ade80'; // default: update/green

  const badgeText = emailType === 'announcement' ? '📢 Announcement'
    : emailType === 'promotion' ? '🎉 Special Offer'
    : emailType === 'alert'     ? '⚠️ Important Alert'
    : '🔔 Platform Update';

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0; padding:0; background:#0f172a; font-family:'Segoe UI',Arial,sans-serif;">
  <div style="max-width:600px; margin:0 auto; padding:40px 20px;">

    <!-- Header -->
    <div style="text-align:center; margin-bottom:32px;">
      <h1 style="color:${accentColor}; font-size:28px; margin:0; letter-spacing:-1px;">dsaflow.app</h1>
      <p style="color:#475569; font-size:13px; margin:4px 0 0;">FAANG Placement Prep</p>
    </div>

    <!-- Main Card -->
    <div style="background:#1e293b; border-radius:16px; padding:40px; border:1px solid #334155;">

      <!-- Badge -->
      <div style="text-align:center; margin-bottom:24px;">
        <span style="background:rgba(0,0,0,0.3); color:${accentColor};
                     padding:8px 20px; border-radius:999px;
                     font-size:13px; font-weight:600;
                     border:1px solid ${accentColor}33;">
          ${badgeText}
        </span>
      </div>

      <!-- Greeting -->
      <h2 style="color:#f1f5f9; font-size:20px; margin:0 0 8px;">Hi ${userName}! 👋</h2>
      <h3 style="color:${accentColor}; font-size:22px; margin:0 0 24px;">${subject}</h3>

      <!-- Divider -->
      <div style="height:1px; background:#334155; margin:24px 0;"></div>

      <!-- Message Body -->
      <div style="color:#cbd5e1; font-size:15px; line-height:1.8;">
        ${message}
      </div>

      <!-- CTA Button -->
      <div style="text-align:center; margin-top:32px;">
        <a href="https://dsa-learning-hub-delta.vercel.app"
           style="display:inline-block; background:${accentColor};
                  color:#0f172a; font-weight:700; font-size:15px;
                  padding:14px 40px; border-radius:8px;
                  text-decoration:none; letter-spacing:0.3px;">
          Open dsaflow.app →
        </a>
      </div>
    </div>

    <!-- Footer -->
    <div style="text-align:center; margin-top:32px;">
      <p style="color:#334155; font-size:12px; margin:0 0 8px;">
        You're receiving this because you're a dsaflow.app member.
      </p>
      <p style="color:#475569; font-size:12px; margin:0;">
        © 2026 dsaflow.app · All rights reserved
      </p>
    </div>

  </div>
</body>
</html>`;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST')    return res.status(405).json({ error: 'Method not allowed. Use POST.' });

  // ── Security ─────────────────────────────────────────────────────────
  const adminSecret = process.env.ADMIN_SECRET;
  const { key, subject, message, emailType = 'update', target = 'all', test_mode = false } = req.body;

  if (!adminSecret || key !== adminSecret) {
    return res.status(401).json({ error: 'Unauthorized. Invalid admin key.' });
  }

  if (!subject || !message) {
    return res.status(400).json({ error: 'Missing subject or message.' });
  }

  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({ error: 'RESEND_API_KEY environment variable is not set.' });
  }

  if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
    return res.status(500).json({ error: 'FIREBASE_SERVICE_ACCOUNT environment variable is not set.' });
  }

  try {
    const db = getAdminDb();
    const snapshot = await db.collection('users').get();

    if (snapshot.empty) {
      return res.status(200).json({ success: true, sentCount: 0, message: 'No users found.' });
    }

    // Filter by target audience
    let users = snapshot.docs.map(doc => {
      const d = doc.data();
      return { name: d.name || 'Student', email: d.email || '', isPaid: !!d.isPaid };
    }).filter(u => u.email !== '');

    if (target === 'premium') users = users.filter(u => u.isPaid);
    if (target === 'free')    users = users.filter(u => !u.isPaid);

    if (users.length === 0) {
      return res.status(200).json({ success: true, sentCount: 0, message: `No ${target} users to email.` });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    
    // Setup Nodemailer fallback using Gmail
    let transporter = null;
    if (process.env.GMAIL_APP_PASSWORD) {
      transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'noreply.dsaflow@gmail.com',
          pass: process.env.GMAIL_APP_PASSWORD
        }
      });
    }

    let successCount = 0;
    const failures = [];

    // ── Test Mode: send only to owner's verified Resend email ──────────
    if (test_mode) {
      const html = buildBroadcastHtml('Admin', subject, message, emailType);
      const { error } = await resend.emails.send({
        from: FROM_ADDRESS,
        to: OWNER_EMAIL,
        subject: `[TEST PREVIEW] ${subject}`,
        html,
      });
      if (error) {
        return res.status(500).json({ error: error.message || JSON.stringify(error) });
      }
      return res.status(200).json({
        success: true,
        test_mode: true,
        sentCount: 1,
        totalUsers: users.length,
        message: `Test email sent to ${OWNER_EMAIL}. Verify your domain to broadcast to all ${users.length} users.`,
      });
    }

    // ── Full Broadcast ─────────────────────────────────────────────────
    let domainVerificationError = false;

    for (const user of users) {
      try {
        const html = buildBroadcastHtml(user.name, subject, message, emailType);
        const { error } = await resend.emails.send({
          from: FROM_ADDRESS,
          to: user.email,
          subject: subject,
          html,
        });

        if (error) {
          const msg = error.message || JSON.stringify(error);
          // Detect Resend's domain restriction error or quota limit (e.g., 429 Too Many Requests)
          const isQuotaOrDomainError = msg.toLowerCase().includes('rate limit') || 
                                       msg.includes('429') || 
                                       msg.includes('verify a domain') || 
                                       msg.includes('testing emails') || 
                                       msg.includes('your own email');
                                       
          if (isQuotaOrDomainError && transporter) {
            console.log(`[broadcast] Resend failed for ${user.email} due to quota/domain. Falling back to Gmail...`);
            await transporter.sendMail({
              from: '"dsaflow.app" <noreply.dsaflow@gmail.com>',
              to: user.email,
              subject: subject,
              html: html
            });
            successCount++;
            continue; // Skip throwing error since fallback succeeded
          }

          if (isQuotaOrDomainError && !transporter) {
            domainVerificationError = true;
          }
          throw new Error(msg);
        }
        successCount++;
      } catch (sendErr) {
        console.error(`[broadcast] Failed to send to ${user.email}:`, sendErr.message);
        failures.push({ email: user.email, error: sendErr.message });
      }

      // Brief delay to avoid rate-limiting on Resend free tier
      await new Promise(r => setTimeout(r, 300));
    }

    return res.status(200).json({
      success: successCount > 0,
      totalUsers: users.length,
      sentCount: successCount,
      failures,
      // Flag so the UI can show the domain verification CTA (if Resend failed and no fallback was available)
      domainError: domainVerificationError && !process.env.GMAIL_APP_PASSWORD ? DOMAIN_ERROR_HINT : null,
    });

  } catch (err) {
    console.error('[send-bulk-emails] Error:', err);
    return res.status(500).json({ error: `Internal error: ${err.message}` });
  }
}
