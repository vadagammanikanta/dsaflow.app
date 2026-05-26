const ADMIN_EMAIL = 'dsa.flow@outlook.com';

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, name, whatsapp, paymentId } = req.body;

  if (!email || !name) {
    return res.status(400).json({ error: 'Missing email or name' });
  }

  const resendApiKey = process.env.RESEND_API_KEY;

  const memberSubject = "Welcome to dsa.flow Premium! 🚀";
  const memberHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; background: #0b0f19; color: #f3f4f6;">
      <h2 style="color: #00e5ff; border-bottom: 2px solid #00e5ff; padding-bottom: 8px;">Congratulations ${name}! 🎉</h2>
      <p style="font-size: 1.1rem; line-height: 1.5;">Your payment was successful and your <strong>dsa.flow Premium</strong> account is now active.</p>
      <div style="background: rgba(255,255,255,0.05); padding: 16px; border-radius: 6px; margin: 18px 0; border: 1px solid rgba(255,255,255,0.1);">
        <p style="margin: 0 0 8px 0;"><strong>Payment Details:</strong></p>
        <ul style="margin: 0; padding-left: 20px;">
          <li style="margin-bottom: 4px;"><strong>Transaction ID:</strong> <span style="font-family: monospace; color: #a5f3fc;">${paymentId}</span></li>
          <li style="margin-bottom: 4px;"><strong>WhatsApp Registered:</strong> ${whatsapp}</li>
          <li style="margin-bottom: 4px;"><strong>Support Contact:</strong> <a href="mailto:${ADMIN_EMAIL}" style="color: #00e5ff;">${ADMIN_EMAIL}</a></li>
        </ul>
      </div>
      <p style="line-height: 1.5;">You now have lifetime, unrestricted access to all 16 DSA learning modules, the interactive VisuAlgo visualizer, coding arena with multi-language execution, and placement test quizzes.</p>
      <p style="line-height: 1.5;">Let's ace those placement rounds together!</p>
      <br/>
      <p style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 12px; margin-bottom: 0;">Best regards,<br/><strong>dsa.flow Team</strong></p>
    </div>
  `;

  const adminSubject = `🚨 New Premium Upgrade: ${name}`;
  const adminHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
      <h2>New Premium Upgrade Received 💳</h2>
      <p>A user has successfully upgraded to dsa.flow Premium.</p>
      <p><strong>User Details:</strong></p>
      <ul>
        <li><strong>Name:</strong> ${name}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>WhatsApp:</strong> ${whatsapp}</li>
        <li><strong>Payment ID:</strong> ${paymentId}</li>
        <li><strong>Date:</strong> ${new Date().toISOString()}</li>
      </ul>
    </div>
  `;

  if (resendApiKey) {
    try {
      // Send to upgraded member
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${resendApiKey}`
        },
        body: JSON.stringify({
          from: 'dsa.flow Premium <onboarding@resend.dev>',
          to: [email],
          subject: memberSubject,
          html: memberHtml
        })
      });

      // Send copy to admin
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${resendApiKey}`
        },
        body: JSON.stringify({
          from: 'dsa.flow Premium <onboarding@resend.dev>',
          to: [ADMIN_EMAIL],
          subject: adminSubject,
          html: adminHtml
        })
      });

      return res.status(200).json({ success: true, message: 'Emails sent successfully via Resend API' });
    } catch (e) {
      console.error("Resend API failed:", e);
      return res.status(500).json({ error: `Failed to send email: ${e.message}` });
    }
  } else {
    // Demo/Development mode fallback
    console.info("===== EMAIL SIMULATION (RESEND_API_KEY not configured) =====");
    console.info(`To Member (${email}):`, memberSubject);
    console.info(`To Admin (${ADMIN_EMAIL}):`, adminSubject);
    console.info("=========================================================");
    return res.status(200).json({ success: true, message: 'Email simulated successfully (add RESEND_API_KEY in environment to activate live mails)' });
  }
};
