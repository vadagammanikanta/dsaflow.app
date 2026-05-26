import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import nodemailer from 'nodemailer';

const ADMIN_EMAIL = 'dsa.flow@outlook.com';

function getAdminDb() {
  if (getApps().length === 0) {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT || '{}');
    initializeApp({ credential: cert(serviceAccount) });
  }
  return getFirestore();
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST')    return res.status(405).json({ error: 'Method not allowed. Use POST.' });

  // ── Security Check ──────────────────────────────────────────────────
  const adminSecret = process.env.ADMIN_SECRET;
  const { key, subject, message } = req.body;

  if (!adminSecret || key !== adminSecret) {
    return res.status(401).json({ error: 'Unauthorized. Provide valid key in body.' });
  }

  if (!subject || !message) {
    return res.status(400).json({ error: 'Missing subject or message content.' });
  }

  // ── Credentials Check ───────────────────────────────────────────────
  if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
    return res.status(500).json({ error: 'FIREBASE_SERVICE_ACCOUNT env variable not set.' });
  }

  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;

  if (!emailUser || !emailPass) {
    return res.status(500).json({ error: 'EMAIL_USER or EMAIL_PASS SMTP environment variables not set.' });
  }

  try {
    const db = getAdminDb();
    const snapshot = await db.collection('users').get();
    
    if (snapshot.empty) {
      return res.status(200).json({ success: true, count: 0, message: 'No registered users found.' });
    }

    const users = snapshot.docs.map(doc => {
      const d = doc.data();
      return {
        name: d.name || 'Student',
        email: d.email || ''
      };
    }).filter(u => u.email !== '');

    // Setup transporter
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // SSL/TLS
      auth: {
        user: emailUser,
        pass: emailPass
      }
    });

    let successCount = 0;
    let errors = [];

    // Send emails sequentially to respect SMTP rate limits
    for (const user of users) {
      try {
        const personalizedHtml = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; background: #0b0f19; color: #f3f4f6;">
            <h2 style="color: #00e5ff; border-bottom: 2px solid #00e5ff; padding-bottom: 8px;">Hello ${user.name}! 👋</h2>
            <div style="font-size: 1.05rem; line-height: 1.6; margin: 18px 0; color: #d1d5db;">
              ${message}
            </div>
            <p style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 12px; font-size: 0.85rem; color: #9ca3af; margin-bottom: 0;">
              Best regards,<br/><strong>dsa.flow Team</strong><br/>
              Support: <a href="mailto:${ADMIN_EMAIL}" style="color: #00e5ff;">${ADMIN_EMAIL}</a>
            </p>
          </div>
        `;

        await transporter.sendMail({
          from: `"dsa.flow" <${emailUser}>`,
          to: user.email,
          subject: subject,
          html: personalizedHtml
        });

        successCount++;
      } catch (sendErr) {
        console.error(`Failed to send bulk email to ${user.email}:`, sendErr.message);
        errors.push({ email: user.email, error: sendErr.message });
      }
    }

    return res.status(200).json({
      success: true,
      totalUsers: users.length,
      sentCount: successCount,
      failures: errors
    });

  } catch (err) {
    console.error('[send-bulk-emails] Error:', err);
    return res.status(500).json({ error: `Internal execution error: ${err.message}` });
  }
}
