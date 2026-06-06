// Admin Stats — uses Firebase Admin SDK to bypass Firestore security rules
// Protected by ADMIN_SECRET env variable
// Requires FIREBASE_SERVICE_ACCOUNT env var (JSON string of service account key)

import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

function getAdminDb() {
  // Avoid re-initializing on hot reload
  if (getApps().length === 0) {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT || '{}');
    initializeApp({ credential: cert(serviceAccount) });
  }
  return getFirestore();
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET')    return res.status(405).json({ error: 'Method not allowed' });

  // ── Security ──────────────────────────────────────────────────────────
  const adminSecret = process.env.ADMIN_SECRET;
  const providedKey = req.query.key;
  if (!adminSecret || providedKey !== adminSecret) {
    return res.status(401).json({ error: 'Unauthorized. Provide ?key=YOUR_ADMIN_SECRET' });
  }

  // ── Firebase Service Account check ────────────────────────────────────
  if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
    return res.status(500).json({
      error: 'FIREBASE_SERVICE_ACCOUNT env variable not set.',
      setup: 'Go to Firebase Console → Project Settings → Service Accounts → Generate New Private Key → Paste the JSON as FIREBASE_SERVICE_ACCOUNT in Vercel Environment Variables.'
    });
  }

  try {
    const db = getAdminDb();
    const snapshot = await db.collection('users').get();

    const users = snapshot.docs.map(doc => {
      const d = doc.data();
      return {
        docId:            doc.id,
        uid:              d.uid             || doc.id,
        name:             d.name            || 'Unknown',
        email:            d.email           || '',
        whatsapp:         d.whatsapp        || '',
        isPaid:           d.isPaid          || false,
        paymentId:        d.paymentId       || null,
        paymentDate:      d.paymentDate     || null,
        signupDate:       d.signupDate      || null,
        trialExpiry:      d.trialExpiry     || null,
        completedLessons: d.completedLessons || [],
        quizHighScore:    d.quizHighScore    || 0,
        selectedLanguage: d.selectedLanguage || 'javascript',
        lastSynced:       d.lastSynced       || null,
      };
    });

    const upgradedUsers = users.filter(u => u.isPaid);
    const freeUsers     = users.filter(u => !u.isPaid);
    const now           = Date.now();
    const trialActive   = freeUsers.filter(u => u.trialExpiry && u.trialExpiry > now);
    const trialExpired  = freeUsers.filter(u => !u.trialExpiry || u.trialExpiry <= now);

    return res.status(200).json({
      summary: {
        totalUsers:       users.length,
        upgradedMembers:  upgradedUsers.length,
        freeTrialActive:  trialActive.length,
        freeTrialExpired: trialExpired.length,
        revenue:          `₹${upgradedUsers.length * 99}`,
        generatedAt:      new Date().toISOString()
      },
      upgradedMembers: upgradedUsers.map(u => ({
        name:             u.name,
        email:            u.email,
        whatsapp:         u.whatsapp,
        paymentId:        u.paymentId,
        paymentDate:      u.paymentDate ? new Date(u.paymentDate).toLocaleString('en-IN') : null,
        signupDate:       u.signupDate  ? new Date(u.signupDate).toLocaleString('en-IN')  : null,
        completedLessons: u.completedLessons,
        quizHighScore:    u.quizHighScore,
        selectedLanguage: u.selectedLanguage,
        lastSynced:       u.lastSynced ? new Date(u.lastSynced).toLocaleString('en-IN') : null,
      })),
      freeUsers: freeUsers.map(u => ({
        name:             u.name,
        email:            u.email,
        whatsapp:         u.whatsapp,
        status:           u.trialExpiry && u.trialExpiry > now ? '🟡 Trial Active' : '🔴 Trial Expired',
        signupDate:       u.signupDate ? new Date(u.signupDate).toLocaleString('en-IN') : null,
        completedLessons: u.completedLessons,
        quizHighScore:    u.quizHighScore,
        selectedLanguage: u.selectedLanguage,
        lastSynced:       u.lastSynced ? new Date(u.lastSynced).toLocaleString('en-IN') : null,
      }))
    });

  } catch (err) {
    console.error('[admin-stats] Firestore error:', err);
    return res.status(500).json({ error: `Firestore error: ${err.message}` });
  }
}
