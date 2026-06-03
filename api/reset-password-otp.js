import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

function getAdminApp() {
  if (getApps().length === 0) {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT || '{}');
    return initializeApp({ credential: cert(serviceAccount) });
  }
  return getApps()[0];
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed. Use POST.' });

  const { email, otp, newPassword } = req.body;
  if (!email || !otp || !newPassword) return res.status(400).json({ error: 'Missing required fields.' });

  try {
    const app = getAdminApp();
    const db = getFirestore(app);
    const auth = getAuth(app);

    const docRef = db.collection('otps').doc(email.toLowerCase());
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(400).json({ error: 'No OTP found for this email. Please request a new one.' });
    }

    const data = doc.data();
    if (Date.now() > data.expiresAt) {
      return res.status(400).json({ error: 'OTP has expired. Please request a new one.' });
    }

    if (data.otp !== otp) {
      return res.status(400).json({ error: 'Invalid OTP.' });
    }

    // Check if user exists
    let userRecord;
    try {
      userRecord = await auth.getUserByEmail(email);
    } catch (e) {
      if (e.code === 'auth/user-not-found') {
        return res.status(400).json({ error: 'No account found with this email.' });
      }
      throw e;
    }

    // OTP is valid. Update the user's password securely
    await auth.updateUser(userRecord.uid, { password: newPassword });

    // Delete OTP so it can't be reused
    await docRef.delete();

    // Optionally generate a Custom Token to auto-login them immediately after reset
    const customToken = await auth.createCustomToken(userRecord.uid);

    return res.status(200).json({ success: true, message: 'Password updated successfully.', token: customToken });

  } catch (err) {
    console.error('[reset-password-otp] Error:', err);
    return res.status(500).json({ error: err.message || 'Internal server error.' });
  }
}
