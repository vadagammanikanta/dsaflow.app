import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { Resend } from 'resend';

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
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed. Use POST.' });

  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required.' });

  try {
    const db = getAdminDb();
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes from now

    // Store OTP in Firestore
    await db.collection('otps').doc(email.toLowerCase()).set({
      otp,
      expiresAt
    });

    // Send OTP via Resend
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: 'dsa.flow <noreply@dsaflow.app>',
      to: email,
      subject: 'Your dsa.flow Verification Code',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 500px; margin: 0 auto; background: #0f172a; color: #f8fafc; border-radius: 10px;">
          <h2 style="color: #06b6d4; text-align: center;">dsa.flow Security</h2>
          <p>Hello,</p>
          <p>Your one-time verification code is:</p>
          <div style="background: #1e293b; padding: 15px; text-align: center; font-size: 28px; font-weight: bold; letter-spacing: 4px; border-radius: 8px; margin: 20px 0; color: #a78bfa;">
            ${otp}
          </div>
          <p style="font-size: 13px; color: #94a3b8;">This code will expire in 10 minutes. If you did not request this, please ignore this email.</p>
        </div>
      `
    });

    if (error) {
      console.error('[send-otp] Resend error:', error);
      return res.status(500).json({ error: 'Failed to send OTP email. Please try again later.' });
    }

    return res.status(200).json({ success: true, message: 'OTP sent successfully.' });
  } catch (err) {
    console.error('[send-otp] Server error:', err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
}
