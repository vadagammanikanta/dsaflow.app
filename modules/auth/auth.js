// ═══════════════════════════════════════════════════════════════════
//  dsa.flow — Authentication Module
//  Firebase Auth + Firestore with localStorage fallback
//  ► Set FIREBASE_CONFIG with your project credentials to enable cloud storage
//  ► If left as placeholders, the app runs in local-only demo mode
// ═══════════════════════════════════════════════════════════════════

// ── CONFIGURE YOUR FIREBASE PROJECT HERE ──────────────────────────
const FIREBASE_CONFIG = {
  apiKey:            "YOUR_API_KEY",
  authDomain:        "dsaflow-49a72.firebaseapp.com",
  projectId:         "dsaflow-49a72",
  storageBucket:     "dsaflow-49a72.firebasestorage.app",
  messagingSenderId: "705752713835",
  appId:             "1:705752713835:web:cdb2cf3ac978e2d7e97f2e"
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
    console.info('[dsa.flow] Firebase connected ✓');
    return true;
  } catch (e) {
    console.warn('[dsa.flow] Firebase init failed, using local mode:', e.message);
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
      console.info('[dsa.flow] User saved to Firestore ✓');
    } catch (e) {
      if (e.code === 'auth/email-already-in-use') throw new Error('Email already registered. Please sign in.');
      throw new Error(e.message);
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
      const snap = await _db.collection('users').doc(uid).get();
      if (snap.exists) {
        const data = snap.data();
        saveLocalUser(data);
        return data;
      }
    } catch (e) {
      if (e.code === 'auth/user-not-found')     throw new Error('No account found with this email.');
      if (e.code === 'auth/wrong-password')      throw new Error('Incorrect password.');
      if (e.code === 'auth/invalid-email')       throw new Error('Invalid email format.');
      if (e.code === 'auth/too-many-requests')   throw new Error('Too many failed attempts. Please try again later.');
      throw new Error(e.message);
    }
  }

  // localStorage fallback
  const stored = getLocalUser();
  if (!stored)                    throw new Error('No account found. Please sign up first.');
  if (stored.email !== email)     throw new Error('No account found with this email.');
  // Note: in local mode, we skip password verification for demo
  return stored;
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

  if (tryInitFirebase()) {
    try {
      await _db.collection('users').doc(user.uid).update({
        isPaid: true,
        paymentId,
        paymentDate: user.paymentDate
      });
    } catch (e) { console.warn('Firestore update failed:', e.message); }
  }
}

/* ═══ AUTH STATE ══════════════════════════════════════════════════════ */
export function getCurrentUser() { return getLocalUser(); }

export function getTrialInfo() {
  const user = getLocalUser();
  if (!user) return null;
  const remaining = user.trialExpiry - Date.now();
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
