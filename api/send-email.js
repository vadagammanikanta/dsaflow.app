import nodemailer from 'nodemailer';

const ADMIN_EMAIL = 'dsa.flow@outlook.com';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, name, whatsapp, paymentId, type } = req.body;

  if (!email || !name) {
    return res.status(400).json({ error: 'Missing email or name' });
  }

  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;
  const isWelcome = type === 'welcome';

  const memberSubject = isWelcome 
    ? "Welcome to dsa.flow! 🚀 Start your DSA Journey" 
    : "Welcome to dsa.flow Premium! 🚀";

  const memberHtml = isWelcome ? `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; background: #0b0f19; color: #f3f4f6;">
      <h2 style="color: #00e5ff; border-bottom: 2px solid #00e5ff; padding-bottom: 8px;">Welcome to dsa.flow, ${name}! 🎉</h2>
      <p style="font-size: 1.1rem; line-height: 1.5;">Your free account has been successfully created and your <strong>24-hour Free Trial</strong> is now active.</p>
      <div style="background: rgba(255,255,255,0.05); padding: 16px; border-radius: 6px; margin: 18px 0; border: 1px solid rgba(255,255,255,0.1);">
        <p style="margin: 0 0 8px 0;"><strong>Account Details:</strong></p>
        <ul style="margin: 0; padding-left: 20px;">
          <li style="margin-bottom: 4px;"><strong>Registered Email:</strong> ${email}</li>
          <li style="margin-bottom: 4px;"><strong>WhatsApp Contact:</strong> ${whatsapp || 'N/A'}</li>
          <li style="margin-bottom: 4px;"><strong>Support:</strong> <a href="mailto:${ADMIN_EMAIL}" style="color: #00e5ff;">${ADMIN_EMAIL}</a></li>
        </ul>
      </div>
      <p style="line-height: 1.5;">Try out the Elite A-Z DSA roadmap, code fetcher, visualizer, and online compiler. If you like the platform, you can upgrade to Premium at any time for lifetime access!</p>
      <p style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 12px; margin-bottom: 0;">Best regards,<br/><strong>dsa.flow Team</strong></p>
    </div>
  ` : `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; background: #0b0f19; color: #f3f4f6;">
      <h2 style="color: #00e5ff; border-bottom: 2px solid #00e5ff; padding-bottom: 8px;">Congratulations ${name}! 🎉</h2>
      <p style="font-size: 1.1rem; line-height: 1.5;">Your payment was successful and your <strong>dsa.flow Premium</strong> account is now active.</p>
      <div style="background: rgba(255,255,255,0.05); padding: 16px; border-radius: 6px; margin: 18px 0; border: 1px solid rgba(255,255,255,0.1);">
        <p style="margin: 0 0 8px 0;"><strong>Payment Details:</strong></p>
        <ul style="margin: 0; padding-left: 20px;">
          <li style="margin-bottom: 4px;"><strong>Transaction ID:</strong> <span style="font-family: monospace; color: #a5f3fc;">${paymentId}</span></li>
          <li style="margin-bottom: 4px;"><strong>WhatsApp Registered:</strong> ${whatsapp}</li>
          <li style="margin-bottom: 4px;"><strong>Support:</strong> <a href="mailto:${ADMIN_EMAIL}" style="color: #00e5ff;">${ADMIN_EMAIL}</a></li>
        </ul>
      </div>
      <p style="line-height: 1.5;">You now have lifetime access to all 16 DSA learning modules, the interactive VisuAlgo visualizer, coding arena with multi-language execution, and placement test quizzes.</p>
      <p style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 12px; margin-bottom: 0;">Best regards,<br/><strong>dsa.flow Team</strong></p>
    </div>
  `;

  const adminSubject = isWelcome 
    ? `🚨 New User Registered: ${name}`
    : `🚨 New Premium Upgrade: ${name}`;

  const adminHtml = isWelcome ? `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
      <h2>New User Registration 📝</h2>
      <ul>
        <li><strong>Name:</strong> ${name}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>WhatsApp:</strong> ${whatsapp || 'N/A'}</li>
        <li><strong>Date:</strong> ${new Date().toISOString()}</li>
      </ul>
    </div>
  ` : `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
      <h2>New Premium Upgrade 💳</h2>
      <ul>
        <li><strong>Name:</strong> ${name}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>WhatsApp:</strong> ${whatsapp}</li>
        <li><strong>Payment ID:</strong> ${paymentId}</li>
        <li><strong>Date:</strong> ${new Date().toISOString()}</li>
      </ul>
    </div>
  `;

  if (emailUser && emailPass) {
    try {
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // SSL/TLS
        auth: {
          user: emailUser,
          pass: emailPass
        }
      });

      // Send to Member
      await transporter.sendMail({
        from: `"dsa.flow" <${emailUser}>`,
        to: email,
        subject: memberSubject,
        html: memberHtml
      });

      // Send to Admin
      await transporter.sendMail({
        from: `"dsa.flow" <${emailUser}>`,
        to: ADMIN_EMAIL,
        subject: adminSubject,
        html: adminHtml
      });

      return res.status(200).json({ success: true });
    } catch (e) {
      console.error('[dsa.flow] SMTP send failed:', e.message);
      return res.status(500).json({ error: `Email send failed: ${e.message}` });
    }
  } else {
    console.info(`[EMAIL SIM] To: ${email} | Subject: ${memberSubject}`);
    console.info(`[EMAIL SIM] To Admin: ${ADMIN_EMAIL} | Subject: ${adminSubject}`);
    return res.status(200).json({ success: true, message: 'Email simulated (set EMAIL_USER and EMAIL_PASS to activate)' });
  }
}
