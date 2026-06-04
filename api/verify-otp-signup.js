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

  const { email, otp, password, name, phone } = req.body;
  if (!email || !otp || !password) return res.status(400).json({ error: 'Missing required fields.' });

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

    // OTP is valid. Delete it so it can't be reused.
    await docRef.delete();

    // Check if user already exists
    let userRecord;
    try {
      userRecord = await auth.getUserByEmail(email);
      return res.status(400).json({ error: 'An account with this email already exists. Please Sign In.' });
    } catch (e) {
      if (e.code !== 'auth/user-not-found') {
        throw e;
      }
    }

    // Create the user in Firebase Auth
    userRecord = await auth.createUser({
      email: email,
      password: password,
      displayName: name,
    });

    // Optionally save extra data to Firestore
    await db.collection('users').doc(userRecord.uid).set({
      uid: userRecord.uid,
      name: name || '',
      email: email.toLowerCase(),
      whatsapp: phone || '',
      signupDate: Date.now(),
      trialExpiry: Date.now() + 24 * 60 * 60 * 1000, // 24 hours trial
      isPaid: false,
      createdAt: new Date().toISOString()
    }, { merge: true });

    // Generate a Custom Token to log them in automatically on the frontend
    const customToken = await auth.createCustomToken(userRecord.uid);

    return res.status(200).json({ success: true, token: customToken });

  } catch (err) {
    console.error('[verify-otp-signup] Error:', err);
    return res.status(500).json({ error: err.message || 'Internal server error.' });
  }
}
