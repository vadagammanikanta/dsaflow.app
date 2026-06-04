// ═══════════════════════════════════════════════════════════════════
//  dsaflow.app — Authentication Module
//  Firebase Auth + Firestore with localStorage fallback
//  ► Set FIREBASE_CONFIG with your project credentials to enable cloud storage
//  ► If left as placeholders, the app runs in local-only demo mode
// ═══════════════════════════════════════════════════════════════════

// ── CONFIGURE YOUR FIREBASE PROJECT HERE ──────────────────────────
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyAXGDzwz77q2l2Wm4HwE9rQwJQ2jXXLMEY",
  authDomain: "dsa-flow-546f4.firebaseapp.com",
  databaseURL: "https://dsa-flow-546f4-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "dsa-flow-546f4",
  storageBucket: "dsa-flow-546f4.firebasestorage.app",
  messagingSenderId: "947997229343",
  appId: "1:947997229343:web:9c145ec6ed6464e0c9f02a",
  measurementId: "G-P0NB6W0PD9"
};
// ─────────────────────────────────────────────────────────────────

const TRIAL_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours
const STORAGE_KEY = 'dsaflow_user_v1';

let _firebaseReady = false;
let _auth = null;
let _db   = null;

/* ─── Try to initialize Firebase ─── */
function tryInitFirebase() {
  if (typeof firebase === 'undefined') return false;
  if (FIREBASE_CONFIG.apiKey === 'YOUR_API_KEY') return false; // placeholder — skip
  try {
    if (!firebase.apps.length) firebase.initializeApp(FIREBASE_CONFIG);
    _auth = firebase.auth();
    _db   = firebase.firestore();
    _firebaseReady = true;
    console.info('[dsaflow.app] Firebase connected ✓');
    return true;
  } catch (e) {
    console.warn('[dsaflow.app] Firebase init failed, using local mode:', e.message);
    return false;
  }
}

/* ═══ SIGN UP ═══════════════════════════════════════════════════════ */
export async function signUp({ name, email, phone, password }) {
  email = email.trim().toLowerCase();
  phone = phone.replace(/\D/g, '');
  if (phone.length < 10) throw new Error('Enter a valid WhatsApp number (min 10 digits).');

  // Check duplicate in localStorage
  const existing = getLocalUser();
  if (existing && existing.email === email) throw new Error('Email already registered. Please sign in.');

  let uid = 'local_' + Date.now();
  const now = Date.now();
  const trialExpiry = now + TRIAL_DURATION_MS;

  // Attempt Firebase first
  if (tryInitFirebase()) {
    try {
      const cred = await _auth.createUserWithEmailAndPassword(email, password);
      await cred.user.updateProfile({ displayName: name });
      uid = cred.user.uid;

      // Save to Firestore
      await _db.collection('users').doc(uid).set({
        uid, name, email,
        whatsapp: phone,
        signupDate: now,
        trialExpiry,
        isPaid: false,
        paymentId: null,
        paymentDate: null,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      console.info('[dsaflow.app] User saved to Firestore ✓');
    } catch (e) {
      if (e.code === 'auth/email-already-in-use') throw new Error('Email already registered. Please sign in.');
      console.warn('[dsaflow.app] Firebase sign up failed, falling back to local mode:', e.message);
    }
  }

  // Always save locally too
  const userData = { uid, name, email, whatsapp: phone, signupDate: now, trialExpiry, isPaid: false, paymentId: null, paymentDate: null };
  saveLocalUser(userData);
  return userData;
}

/* ═══ SIGN IN ════════════════════════════════════════════════════════ */
export async function signIn({ email, password }) {
  email = email.trim().toLowerCase();

  if (tryInitFirebase()) {
    try {
      const cred = await _auth.signInWithEmailAndPassword(email, password);
      const uid  = cred.user.uid;
      
      // Fetch from Firestore
      try {
        const snap = await _db.collection('users').doc(uid).get();
        if (snap.exists) {
          const data = snap.data();
          saveLocalUser(data);
          return data;
        }
      } catch (firestoreErr) {
        console.warn('[dsaflow.app] Firestore read failed during login:', firestoreErr.message);
      }
      
      // If Firestore read failed or snap doesn't exist, but Auth succeeded:
      const stored = getLocalUser();
      if (stored && stored.email === email) {
        return stored;
      }
      
      // Fallback data if no local storage and Firestore failed
      const fallbackData = {
        uid,
        name: cred.user.displayName || email.split('@')[0],
        email,
        trialExpiry: Date.now() + TRIAL_DURATION_MS,
        isPaid: false
      };
      saveLocalUser(fallbackData);
      return fallbackData;

    } catch (e) {
      if (e.code === 'auth/user-not-found')     throw new Error('No account found with this email.');
      if (e.code === 'auth/wrong-password')      throw new Error('Incorrect password.');
      if (e.code === 'auth/invalid-credential')  throw new Error('Invalid email or password.');
      if (e.code === 'auth/invalid-email')       throw new Error('Invalid email format.');
      if (e.code === 'auth/too-many-requests')   throw new Error('Too many failed attempts. Please try again later.');
      
      console.warn('[dsaflow.app] Firebase sign in failed, falling back to local mode:', e.message);
    }
  }

  // localStorage fallback
  const stored = getLocalUser();
  if (!stored)                    throw new Error('No account found. Please sign up first.');
  if (stored.email !== email)     throw new Error('No account found with this email.');
  // Note: in local mode, we skip password verification for demo
  return stored;
}

/* ═══ CUSTOM TOKEN LOGIN ════════════════════════════════════════════ */
export async function loginWithCustomToken(token) {
  if (tryInitFirebase()) {
    try {
      const cred = await _auth.signInWithCustomToken(token);
      const uid = cred.user.uid;
      
      const snap = await _db.collection('users').doc(uid).get();
      if (snap.exists) {
        const data = snap.data();
        saveLocalUser(data);
        return data;
      }
      
      // Fallback data if Firestore read fails
      const fallbackData = {
        uid,
        name: cred.user.displayName || 'Student',
        email: cred.user.email,
        trialExpiry: Date.now() + TRIAL_DURATION_MS,
        isPaid: false
      };
      saveLocalUser(fallbackData);
      return fallbackData;
    } catch (e) {
      console.error('[dsaflow.app] Custom token login failed:', e);
      throw new Error('Failed to securely login. Please try again.');
    }
  }
  throw new Error('Database connection required for secure OTP login.');
}

/* ═══ SIGN OUT ════════════════════════════════════════════════════════ */
export async function signOut() {
  if (_firebaseReady && _auth) {
    try { await _auth.signOut(); } catch (e) { /* ignore */ }
  }
  clearLocalUser();
}

/* ═══ MARK AS PAID ════════════════════════════════════════════════════ */
export async function markAsPaid(paymentId) {
  const user = getLocalUser();
  if (!user) return;
  user.isPaid = true;
  user.paymentId   = paymentId;
  user.paymentDate = Date.now();
  saveLocalUser(user);

  // Try Firebase SDK first
  if (tryInitFirebase() && _auth && _auth.currentUser) {
    try {
      await _db.collection('users').doc(user.uid).set({
        uid:         user.uid,
        name:        user.name,
        email:       user.email,
        whatsapp:    user.whatsapp || '',
        signupDate:  user.signupDate || Date.now(),
        trialExpiry: user.trialExpiry || 0,
        isPaid:      true,
        paymentId:   paymentId,
        paymentDate: user.paymentDate
      }, { merge: true });
      console.info('[dsaflow.app] Payment saved to Firestore via SDK ✓');
      return;
    } catch (e) { console.warn('[dsaflow.app] Firestore SDK update failed:', e.message); }
  }

  // Fallback: Firestore REST API (works even without active Auth session)
  try {
    const projectId = FIREBASE_CONFIG.projectId;
    const apiKey    = FIREBASE_CONFIG.apiKey;
    const uid       = user.uid.startsWith('local_') ? 'anon_' + user.uid : user.uid;
    const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/users/${uid}?key=${apiKey}`;
    await fetch(url, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fields: {
          uid:         { stringValue: uid },
          name:        { stringValue: user.name        || '' },
          email:       { stringValue: user.email       || '' },
          whatsapp:    { stringValue: user.whatsapp    || '' },
          signupDate:  { integerValue: String(user.signupDate  || Date.now()) },
          trialExpiry: { integerValue: String(user.trialExpiry || 0) },
          isPaid:      { booleanValue: true },
          paymentId:   { stringValue: paymentId },
          paymentDate: { integerValue: String(user.paymentDate) }
        }
      })
    });
    console.info('[dsaflow.app] Payment saved to Firestore via REST API ✓');
  } catch (e) {
    console.warn('[dsaflow.app] Firestore REST API update also failed:', e.message);
  }
}

/* ═══ PASSWORD RESET ═════════════════════════════════════════════════ */
export async function resetPassword(email) {
  email = email.trim().toLowerCase();
  
  if (tryInitFirebase()) {
    try {
      await _auth.sendPasswordResetEmail(email);
      console.info(`[dsaflow.app] Password reset email sent to ${email} via SDK ✓`);
      return true;
    } catch (e) {
      console.error('[dsaflow.app] Firebase password reset failed:', e);
      throw e;
    }
  }

  // Local fallback / simulation
  console.info(`[EMAIL SIM] Simulated password reset sent to: ${email}`);
  return true;
}

/* ═══ AUTH STATE ══════════════════════════════════════════════════════ */
export function getCurrentUser() { return getLocalUser(); }

export function getTrialInfo() {
  const user = getLocalUser();
  if (!user) return null;
  
  let expiry = user.trialExpiry;
  if (!expiry && user.signupDate) {
    expiry = user.signupDate + 24 * 60 * 60 * 1000;
  }
  if (!expiry && user.createdAt) {
    // If createdAt is an ISO string, convert to timestamp
    const t = new Date(user.createdAt).getTime();
    if (!isNaN(t)) expiry = t + 24 * 60 * 60 * 1000;
  }
  // Safe default fallback
  if (!expiry) {
    expiry = Date.now() + 24 * 60 * 60 * 1000;
  }

  const remaining = expiry - Date.now();
  return {
    isActive:  remaining > 0,
    remaining: Math.max(0, remaining),
    isPaid:    !!user.isPaid,
    hasAccess: !!user.isPaid || remaining > 0
  };
}

/* ═══ CLOUD SYNC ══════════════════════════════════════════════════════ */
export async function syncProgressToCloud(uid, appState) {
  if (!tryInitFirebase()) return;
  try {
    await _db.collection('users').doc(uid).set({
      completedLessons: appState.completedLessons || [],
      quizHighScore: appState.quizHighScore || 0,
      selectedLanguage: appState.selectedLanguage || 'javascript',
      lastSynced: Date.now()
    }, { merge: true });
  } catch (e) {
    console.warn('Failed to sync progress:', e.message);
  }
}

export async function loadProgressFromCloud(uid) {
  if (!tryInitFirebase()) return null;
  try {
    const doc = await _db.collection('users').doc(uid).get();
    if (doc.exists) {
      return doc.data();
    }
  } catch (e) {
    console.warn('Failed to load progress:', e.message);
  }
  return null;
}

/* ═══ LOCAL HELPERS ════════════════════════════════════════════════════ */
function saveLocalUser(data) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch(e) {}
}
function getLocalUser() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch(e) { return null; }
}
function clearLocalUser() {
  try { localStorage.removeItem(STORAGE_KEY); } catch(e) {}
}

/* ═══ SUPPORT TICKETS ══════════════════════════════════════════════════ */
export async function createSupportTicket({ name, email, subject, message, userId }) {
  // Always try the serverless API endpoint first if running in browser
  try {
    const res = await fetch('/api/support-ticket', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, subject, message, userId })
    });
    
    if (res.ok) {
      const data = await res.json();
      if (data.success) {
        console.info('[dsaflow.app] Support ticket saved to Firestore via API ✓');
        return true;
      }
    }
    
    // If the serverless endpoint returned a non-200 or failure, parse the error
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.error || `HTTP error ${res.status}`);
  } catch (e) {
    console.warn('[dsaflow.app] Cloud API support ticket save failed, checking local fallback:', e.message);
    
    // If we're in local demo mode (Firebase not connected or running locally without backend), use localStorage fallback
    if (!tryInitFirebase()) {
      try {
        const saved = localStorage.getItem('dsaflow_tickets') || '[]';
        const tickets = JSON.parse(saved);
        tickets.push({
          id: 'ticket_' + Date.now(),
          name,
          email,
          userId: userId || 'local_user',
          subject,
          message,
          createdAt: Date.now(),
          status: 'pending'
        });
        localStorage.setItem('dsaflow_tickets', JSON.stringify(tickets));
        console.info('[dsaflow.app] Support ticket saved to local storage ✓');
        return true;
      } catch (localErr) {
        console.error('Failed to save ticket locally:', localErr);
        return false;
      }
    }
    
    // Otherwise, propagate the cloud error to show the user
    throw e;
  }
}

export async function getSupportTickets(adminKey) {
  // If adminKey is provided, retrieve support tickets securely via the serverless admin-action API
  if (adminKey) {
    try {
      const res = await fetch('/api/admin-action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: adminKey, action: 'GET_SUPPORT_TICKETS' })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.tickets) {
          return data.tickets;
        }
      }
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || `HTTP error ${res.status}`);
    } catch (e) {
      console.error('[dsaflow.app] Failed to fetch tickets via admin API:', e);
      throw e;
    }
  }

  // Otherwise, default client-side retrieval (if authorized or fallback)
  if (tryInitFirebase()) {
    try {
      const snapshot = await _db.collection('support_tickets').orderBy('createdAt', 'desc').get();
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (e) {
      console.warn('[dsaflow.app] Failed to load tickets from Firestore, falling back to local storage:', e.message);
    }
  }
  
  try {
    const saved = localStorage.getItem('dsaflow_tickets') || '[]';
    return JSON.parse(saved).sort((a, b) => b.createdAt - a.createdAt);
  } catch (e) {
    return [];
  }
}

export async function resolveSupportTicket(ticketId, adminKey) {
  // If adminKey is provided, resolve ticket securely via the serverless admin-action API
  if (adminKey) {
    try {
      const res = await fetch('/api/admin-action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: adminKey, action: 'RESOLVE_SUPPORT_TICKET', ticketId })
      });
      if (res.ok) {
        const data = await res.json();
        return !!data.success;
      }
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || `HTTP error ${res.status}`);
    } catch (e) {
      console.error('[dsaflow.app] Failed to resolve ticket via admin API:', e);
      throw e;
    }
  }

  // Otherwise, default client-side resolve (if authorized or fallback)
  if (tryInitFirebase()) {
    try {
      const ticketRef = _db.collection('support_tickets').doc(ticketId);
      const ticketDoc = await ticketRef.get();
      if (ticketDoc.exists) {
        await ticketRef.update({ status: 'resolved' });
        return true;
      }
    } catch (e) {
      console.warn('[dsaflow.app] Failed to resolve ticket in Firestore:', e.message);
    }
  }
  
  try {
    const saved = localStorage.getItem('dsaflow_tickets') || '[]';
    const tickets = JSON.parse(saved);
    const updated = tickets.map(t => (t.id === ticketId || String(t.createdAt) === String(ticketId)) ? { ...t, status: 'resolved' } : t);
    localStorage.setItem('dsaflow_tickets', JSON.stringify(updated));
    return true;
  } catch (e) {
    return false;
  }
}
