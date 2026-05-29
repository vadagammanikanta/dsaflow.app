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

  // ── Security ──────────────────────────────────────────────────────────
  const adminSecret = process.env.ADMIN_SECRET;
  const { key, action, targetEmail, ticketId } = req.body;

  if (!adminSecret || key !== adminSecret) {
    return res.status(401).json({ error: 'Unauthorized. Invalid admin secret.' });
  }

  if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
    return res.status(500).json({ error: 'FIREBASE_SERVICE_ACCOUNT env variable not set.' });
  }

  if (!action) {
    return res.status(400).json({ error: 'Missing action in request body.' });
  }

  try {
    const db = getAdminDb();

    if (action === 'MANUAL_UPGRADE') {
      if (!targetEmail) {
        return res.status(400).json({ error: 'Missing targetEmail in request body.' });
      }

      const usersRef = db.collection('users');
      const snapshot = await usersRef.where('email', '==', targetEmail).get();

      if (snapshot.empty) {
        return res.status(404).json({ error: 'User not found with the provided email.' });
      }

      const userDoc = snapshot.docs[0];
      await userDoc.ref.update({
        isPaid: true,
        paymentId: 'MANUAL_UPGRADE_ADMIN',
        paymentDate: new Date().toISOString()
      });

      // Trigger congratulations email asynchronously but awaited so the container doesn't shut down before completion.
      try {
        const userData = userDoc.data() || {};
        const protocol = req.headers['x-forwarded-proto'] || 'http';
        const emailUrl = `${protocol}://${req.headers.host}/api/send-email`;
        
        await fetch(emailUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: targetEmail,
            name: userData.name || 'Valued Member',
            whatsapp: userData.whatsapp || 'N/A',
            paymentId: 'MANUAL_UPGRADE_ADMIN'
          })
        });
        console.info(`[admin-action] Triggered congratulations email for manually upgraded user: ${targetEmail}`);
      } catch (emailErr) {
        console.error('[admin-action] Failed to trigger manual upgrade email:', emailErr);
      }

      return res.status(200).json({ success: true, message: `Successfully upgraded ${targetEmail} to lifetime premium.` });

    } else if (action === 'GET_SUPPORT_TICKETS') {
      const ticketsRef = db.collection('support_tickets');
      const snapshot = await ticketsRef.orderBy('createdAt', 'desc').get();
      const tickets = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return res.status(200).json({ success: true, tickets });

    } else if (action === 'RESOLVE_SUPPORT_TICKET') {
      if (!ticketId) {
        return res.status(400).json({ error: 'Missing ticketId in request body.' });
      }

      const ticketRef = db.collection('support_tickets').doc(ticketId);
      const ticketDoc = await ticketRef.get();
      if (!ticketDoc.exists) {
        return res.status(404).json({ error: 'Ticket not found.' });
      }

      await ticketRef.update({ status: 'resolved' });
      return res.status(200).json({ success: true, message: `Successfully resolved ticket ${ticketId}.` });

    } else {
      return res.status(400).json({ error: 'Unknown action specified.' });
    }

  } catch (err) {
    console.error('[admin-action] Firestore error:', err);
    return res.status(500).json({ error: `Firestore error: ${err.message}` });
  }
}
