import { Resend } from 'resend';

const FROM_ADDRESS  = 'dsa.flow <noreply@dsaflow.app>';
const ADMIN_EMAIL   = 'vadagammanikanta2006@gmail.com';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST')    return res.status(405).json({ error: 'Method not allowed' });

  const { email, name, whatsapp, paymentId, type } = req.body;

  if (!email || !name) {
    return res.status(400).json({ error: 'Missing email or name' });
  }

  if (!process.env.RESEND_API_KEY) {
    console.info(`[EMAIL SIM] No RESEND_API_KEY — skipping send to ${email}`);
    return res.status(200).json({ success: true, message: 'Email simulated (RESEND_API_KEY not set)' });
  }

  const resend   = new Resend(process.env.RESEND_API_KEY);
  const isWelcome = type === 'welcome';

  // ── Member Email ──────────────────────────────────────────────────────
  const memberSubject = isWelcome
    ? '🚀 Welcome to dsa.flow — Your DSA Journey Begins!'
    : '🎉 dsa.flow Premium Activated — You Are In!';

  const memberHtml = isWelcome ? `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0; padding:0; background:#0f172a; font-family:'Segoe UI',Arial,sans-serif;">
  <div style="max-width:600px; margin:0 auto; padding:40px 20px;">

    <!-- Header -->
    <div style="text-align:center; margin-bottom:32px;">
      <h1 style="color:#06b6d4; font-size:28px; margin:0; letter-spacing:-1px;">dsa.flow</h1>
      <p style="color:#475569; font-size:13px; margin:4px 0 0;">FAANG Placement Prep</p>
    </div>

    <!-- Main Card -->
    <div style="background:#1e293b; border-radius:16px; padding:40px; border:1px solid #334155;">

      <div style="text-align:center; margin-bottom:24px;">
        <span style="background:#022c22; color:#4ade80; padding:8px 20px; border-radius:999px;
                     font-size:13px; font-weight:600; border:1px solid #166534;">
          🎉 Welcome Aboard!
        </span>
      </div>

      <h2 style="color:#f1f5f9; font-size:22px; text-align:center; margin:0 0 6px;">
        Hey ${name}! 👋
      </h2>
      <h3 style="color:#06b6d4; font-size:20px; text-align:center; margin:0 0 24px;">
        Your free account is active
      </h3>

      <div style="height:1px; background:#334155; margin:24px 0;"></div>

      <p style="color:#cbd5e1; font-size:15px; line-height:1.7; margin:0 0 20px;">
        Your <strong style="color:#4ade80;">24-hour Free Trial</strong> is now live. 
        Explore the full A-Z DSA roadmap, Monaco coding arena, 3D visualizers, and AI tutor — 
        then upgrade anytime for lifetime access.
      </p>

      <!-- Account Details -->
      <div style="background:#0f172a; border-radius:12px; padding:20px; margin-bottom:28px; border:1px solid #1e3a8a;">
        <p style="color:#64748b; font-size:12px; margin:0 0 12px; text-transform:uppercase; letter-spacing:1px;">Account Details</p>
        <table style="width:100%; border-collapse:collapse; font-size:14px; color:#94a3b8;">
          <tr><td style="padding:4px 0;"><strong>Email:</strong></td><td style="text-align:right; color:#f1f5f9;">${email}</td></tr>
          <tr><td style="padding:4px 0;"><strong>WhatsApp:</strong></td><td style="text-align:right; color:#f1f5f9;">${whatsapp || 'N/A'}</td></tr>
          <tr><td style="padding:4px 0;"><strong>Support:</strong></td><td style="text-align:right;"><a href="mailto:${ADMIN_EMAIL}" style="color:#06b6d4;">${ADMIN_EMAIL}</a></td></tr>
        </table>
      </div>

      <div style="text-align:center;">
        <a href="https://dsa-learning-hub-delta.vercel.app"
           style="display:inline-block; background:#06b6d4; color:#0f172a; font-weight:700;
                  font-size:15px; padding:14px 40px; border-radius:8px; text-decoration:none;">
          Start Learning →
        </a>
      </div>
    </div>

    <!-- Footer -->
    <div style="text-align:center; margin-top:32px;">
      <p style="color:#334155; font-size:12px; margin:0 0 8px;">
        You're receiving this because you signed up at dsa.flow.
      </p>
      <p style="color:#475569; font-size:12px; margin:0;">© 2026 dsa.flow · All rights reserved</p>
    </div>

  </div>
</body>
</html>
  ` : `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0; padding:0; background:#0f172a; font-family:'Segoe UI',Arial,sans-serif;">
  <div style="max-width:600px; margin:0 auto; padding:40px 20px;">

    <!-- Header -->
    <div style="text-align:center; margin-bottom:32px;">
      <h1 style="color:#a78bfa; font-size:28px; margin:0; letter-spacing:-1px;">dsa.flow</h1>
      <p style="color:#475569; font-size:13px; margin:4px 0 0;">FAANG Placement Prep · Premium</p>
    </div>

    <!-- Main Card -->
    <div style="background:#1e293b; border-radius:16px; padding:40px; border:1px solid #334155;">

      <!-- Gradient Badge -->
      <div style="text-align:center; margin-bottom:24px;">
        <span style="background:linear-gradient(135deg,#7c3aed,#2563eb); color:#fff;
                     padding:10px 24px; border-radius:999px; font-size:14px; font-weight:700;">
          ⭐ Lifetime Premium Activated
        </span>
      </div>

      <h2 style="color:#f1f5f9; font-size:22px; text-align:center; margin:0 0 6px;">
        Congratulations, ${name}! 🎉
      </h2>
      <p style="color:#94a3b8; text-align:center; font-size:15px; margin:0 0 24px;">
        You are now an official lifetime premium member of dsa.flow.
      </p>

      <div style="height:1px; background:#334155; margin:24px 0;"></div>

      <!-- Benefits -->
      <p style="color:#64748b; font-size:12px; text-transform:uppercase; letter-spacing:1px; margin:0 0 14px;">Your Premium Benefits</p>

      <div style="margin-bottom:12px; background:#0f172a; border-radius:10px; padding:14px 18px; border:1px solid #1e293b;">
        <span style="margin-right:8px;">🗺️</span>
        <strong style="color:#f1f5f9;">450+ Curated Problems</strong>
        <span style="color:#64748b; font-size:13px;"> — Full lifetime access to all 35 DSA modules</span>
      </div>
      <div style="margin-bottom:12px; background:#0f172a; border-radius:10px; padding:14px 18px; border:1px solid #1e293b;">
        <span style="margin-right:8px;">🧠</span>
        <strong style="color:#f1f5f9;">AI Tutor + Interview Trainer</strong>
        <span style="color:#64748b; font-size:13px;"> — Personalized Gemini-powered guidance</span>
      </div>
      <div style="margin-bottom:12px; background:#0f172a; border-radius:10px; padding:14px 18px; border:1px solid #1e293b;">
        <span style="margin-right:8px;">💻</span>
        <strong style="color:#f1f5f9;">Monaco Coding Arena</strong>
        <span style="color:#64748b; font-size:13px;"> — Write, compile and run code instantly</span>
      </div>
      <div style="margin-bottom:24px; background:#0f172a; border-radius:10px; padding:14px 18px; border:1px solid #1e293b;">
        <span style="margin-right:8px;">🎯</span>
        <strong style="color:#f1f5f9;">Placement Quiz Engine</strong>
        <span style="color:#64748b; font-size:13px;"> — Timed company-style assessments</span>
      </div>

      <!-- Transaction Info -->
      <div style="background:rgba(124,77,255,0.06); border:1px solid rgba(124,77,255,0.2); border-radius:12px; padding:20px; margin-bottom:28px;">
        <p style="color:#a78bfa; font-size:12px; text-transform:uppercase; letter-spacing:1px; margin:0 0 12px; font-weight:700;">Payment Information</p>
        <table style="width:100%; border-collapse:collapse; font-size:14px; color:#94a3b8;">
          <tr><td style="padding:4px 0;"><strong>Receipt ID:</strong></td><td style="text-align:right; font-family:monospace; color:#f1f5f9;">${paymentId}</td></tr>
          <tr><td style="padding:4px 0;"><strong>Access Plan:</strong></td><td style="text-align:right; color:#f1f5f9;">Lifetime Premium (One-Time)</td></tr>
          <tr><td style="padding:4px 0;"><strong>WhatsApp:</strong></td><td style="text-align:right; color:#f1f5f9;">${whatsapp}</td></tr>
        </table>
      </div>

      <div style="text-align:center;">
        <a href="https://dsa-learning-hub-delta.vercel.app"
           style="display:inline-block; background:linear-gradient(135deg,#7c3aed,#2563eb);
                  color:#fff; font-weight:700; font-size:15px; padding:14px 40px;
                  border-radius:8px; text-decoration:none;">
          🚀 Start Coding Now
        </a>
      </div>
    </div>

    <!-- Footer -->
    <div style="text-align:center; margin-top:32px;">
      <p style="color:#334155; font-size:12px; margin:0 0 8px;">
        You're receiving this because you upgraded to dsa.flow Premium.
      </p>
      <p style="color:#475569; font-size:12px; margin:0;">
        Support: <a href="mailto:${ADMIN_EMAIL}" style="color:#a78bfa;">${ADMIN_EMAIL}</a>
      </p>
      <p style="color:#334155; font-size:11px; margin:6px 0 0;">© 2026 dsa.flow · All rights reserved</p>
    </div>

  </div>
</body>
</html>
  `;

  // ── Admin Notification Email ─────────────────────────────────────────
  const adminSubject = isWelcome
    ? `🚨 New User Registered: ${name}`
    : `🚨 New Premium Upgrade: ${name}`;

  const adminHtml = `
<!DOCTYPE html>
<html>
<body style="font-family:Arial,sans-serif; max-width:600px; margin:20px auto; padding:20px; border:1px solid #e0e0e0; border-radius:8px; background:#ffffff;">
  <h2 style="color:#0f172a;">${isWelcome ? '📝 New User Registration' : '💳 New Premium Upgrade'}</h2>
  <table style="width:100%; border-collapse:collapse; font-size:14px;">
    <tr><td style="padding:6px 0; width:130px;"><strong>Name:</strong></td><td>${name}</td></tr>
    <tr><td style="padding:6px 0;"><strong>Email:</strong></td><td>${email}</td></tr>
    <tr><td style="padding:6px 0;"><strong>WhatsApp:</strong></td><td>${whatsapp || 'N/A'}</td></tr>
    ${!isWelcome ? `<tr><td style="padding:6px 0;"><strong>Payment ID:</strong></td><td style="font-family:monospace;">${paymentId}</td></tr>` : ''}
    <tr><td style="padding:6px 0;"><strong>Date:</strong></td><td>${new Date().toISOString()}</td></tr>
  </table>
</body>
</html>
  `;

  try {
    // Send to member
    const { error: memberErr } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: email,
      subject: memberSubject,
      html: memberHtml,
    });
    if (memberErr) throw new Error(`Member email failed: ${memberErr.message || JSON.stringify(memberErr)}`);

    // Send to admin
    const { error: adminErr } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: ADMIN_EMAIL,
      subject: adminSubject,
      html: adminHtml,
    });
    if (adminErr) console.warn('[send-email] Admin notification failed:', adminErr);

    return res.status(200).json({ success: true });

  } catch (e) {
    console.error('[send-email] Resend error:', e.message);
    return res.status(500).json({ error: `Email send failed: ${e.message}` });
  }
}
