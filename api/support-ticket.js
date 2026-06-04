import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

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
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { name, email, userId, subject, message } = req.body;

  if (!subject || !message) {
    return res.status(400).json({ error: 'Missing subject or message' });
  }

  if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
    return res.status(500).json({ error: 'FIREBASE_SERVICE_ACCOUNT env variable not set.' });
  }

  try {
    const db = getAdminDb();
    const ticket = {
      name: name || 'Anonymous User',
      email: email || 'no-email@dsaflow.app',
      userId: userId || 'anonymous',
      subject,
      message,
      createdAt: Date.now(),
      status: 'pending'
    };

    await db.collection('support_tickets').add(ticket);
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('[support-ticket API] Error saving ticket to Firestore:', err);
    return res.status(500).json({ error: `Internal server error: ${err.message}` });
  }
}
