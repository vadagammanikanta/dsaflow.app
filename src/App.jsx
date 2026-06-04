import React, { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import Header from './components/Layout/Header';
import Navbar from './components/Layout/Navbar';
import Dashboard from './components/Learning/Dashboard';
import Roadmap from './components/Learning/Roadmap';
import LearningHub from './components/Learning/LearningHub';
import { openRazorpayCheckout } from '../modules/payment/payment';
import './index.css';

// Heavy components — lazy loaded to reduce initial bundle
const Arena       = lazy(() => import('./components/Arena/Arena'));
const WebIDE      = lazy(() => import('./components/IDE/WebIDE'));
const Visualizer  = lazy(() => import('./components/Visualizer/Visualizer'));
const MockQuiz    = lazy(() => import('./components/Quiz/MockQuiz'));
const Platforms   = lazy(() => import('./components/Platforms/Platforms'));
const Support     = lazy(() => import('./components/Support/Support'));
const DsaFlowAI   = lazy(() => import('./components/AI/DsaFlowAI'));
const AdminDashboard = lazy(() => import('./components/Admin/AdminDashboard'));
const Patterns    = lazy(() => import('./components/Patterns/Patterns'));

// Minimal loading fallback
const PageLoader = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh', color: 'var(--text-muted)', flexDirection: 'column', gap: '12px' }}>
    <div style={{ width: '32px', height: '32px', border: '3px solid var(--border-glass)', borderTop: '3px solid var(--accent-purple)', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
    <span style={{ fontSize: '0.85rem' }}>Loading...</span>
  </div>
);


const QUOTES = [
  { text: "An algorithm must be seen to be believed.", author: "Donald Knuth" },
  { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
  { text: "Every expert was once a beginner. Start today.", author: "dsaflow.app" },
  { text: "The best time to learn DSA was yesterday. The second best time is NOW.", author: "dsaflow.app" },
  { text: "Clean code always looks like it was written by someone who cares.", author: "Robert C. Martin" },
  { text: "Data structures + algorithms = programs. Master both.", author: "Niklaus Wirth" },
  { text: "Debugging is twice as hard as writing the code in the first place.", author: "Brian Kernighan" },
  { text: "The function of good software is to make the impossible possible.", author: "Theo de Raadt" },
  { text: "Consistency beats talent every single time. Code daily.", author: "dsaflow.app" },
  { text: "Solving one LeetCode problem a day keeps unemployment away.", author: "dsaflow.app" },
  { text: "Hard problems only feel impossible before you solve them.", author: "dsaflow.app" },
  { text: "O(N²) is fine for 1000 elements. But your interviewer has 10⁶.", author: "dsaflow.app" },
  { text: "The secret to getting ahead is getting started.", author: "Mark Twain" },
  { text: "Great software is not built in a day — but great habits are formed in one.", author: "dsaflow.app" },
  { text: "FAANG or not — DSA mastery opens every door.", author: "dsaflow.app" },
  { text: "Your comfort zone is the enemy of your placement offer.", author: "dsaflow.app" },
  { text: "Binary search cuts problems in half. So does asking the right question.", author: "dsaflow.app" },
  { text: "In programming, if you can't explain it simply, you don't understand it well enough.", author: "Albert Einstein (adapted)" },
  { text: "DP is just recursion with a memory. So is learning.", author: "dsaflow.app" },
  { text: "The journey of 1000 LeetCode problems begins with a single array.", author: "dsaflow.app" },
  { text: "Code is poetry. DSA is the grammar.", author: "dsaflow.app" },
  { text: "Your future self will thank you for every hour of DSA practice today.", author: "dsaflow.app" },
  { text: "An optimal solution always exists. Finding it is the challenge.", author: "dsaflow.app" },
  { text: "Graphs are just trees that grew up and got complicated. Like real life.", author: "dsaflow.app" },
  { text: "Every O(N!) problem has an O(2^N) hidden inside it waiting to be found.", author: "dsaflow.app" }
];

function QuotesTicker() {
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setQuoteIdx(prev => (prev + 1) % QUOTES.length);
        setFade(true);
      }, 400);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const activeQuote = QUOTES[quoteIdx];

  return (
    <div className="quotes-ticker" id="quotes-ticker" style={{ display: 'block' }}>
      <div className="quotes-ticker-inner">
        <span className="quote-icon">💡</span>
        <div className="quote-slide-wrapper" style={{ opacity: fade ? 1 : 0, transition: 'opacity 0.4s ease, transform 0.4s ease', transform: fade ? 'translateY(0)' : 'translateY(-6px)' }}>
          <p className="quote-text">"{activeQuote.text}"</p>
          <p className="quote-author">— {activeQuote.author}</p>
        </div>
      </div>
    </div>
  );
}

// Activity feed for social proof on auth page
const ACTIVITY_FEED = [
  { name: 'Rahul K.', city: 'Hyderabad', action: 'completed Arrays & Hashing', ago: '2 min ago' },
  { name: 'Priya S.', city: 'Bangalore', action: 'solved 3 sliding window problems', ago: '5 min ago' },
  { name: 'Arjun M.', city: 'Chennai', action: 'just unlocked Premium', ago: '8 min ago' },
  { name: 'Sneha R.', city: 'Pune', action: 'hit a 7-day streak 🔥', ago: '12 min ago' },
  { name: 'Vikram P.', city: 'Delhi', action: 'completed Binary Trees module', ago: '15 min ago' },
  { name: 'Ananya T.', city: 'Mumbai', action: 'scored 95% on Mock Quiz', ago: '18 min ago' },
  { name: 'Kiran B.', city: 'Coimbatore', action: 'started Dynamic Programming', ago: '22 min ago' },
  { name: 'Deepa N.', city: 'Kolkata', action: 'solved N-Queens problem', ago: '28 min ago' },
];

const TESTIMONIALS = [
  { name: 'Aditya R.', role: 'Placed at Amazon', text: 'Cracked SDE-1 at Amazon after 3 weeks on dsaflow.app. The patterns tab is a game changer!', avatar: '👨‍💻' },
  { name: 'Pooja V.', role: 'Placed at Flipkart', text: 'Finally understood DP and Trees thanks to the visualizers. Got an offer in my first attempt!', avatar: '👩‍💻' },
  { name: 'Santhosh K.', role: 'Placed at Infosys', text: 'The interview countdown timer kept me accountable. Completed all 42 modules in 30 days!', avatar: '🧑‍💻' },
];

function AppLayout() {
  const { user, trial, loading, login, loginWithToken, register, logout, payAndUnlock, sendPasswordReset } = useAuth();
  
  // Auth Form tabs and inputs
  const [authTab, setAuthTab] = useState('signin'); // 'signin', 'signup', or 'forgot_password'
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  // Form Fields
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  
  const [signUpName, setSignUpName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPhone, setSignUpPhone] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');

  const [showOtpScreen, setShowOtpScreen] = useState(false);
  const [otpCode, setOtpCode] = useState('');

  const [showForgotOtpScreen, setShowForgotOtpScreen] = useState(false);
  const [forgotOtpCode, setForgotOtpCode] = useState('');
  const [forgotNewPassword, setForgotNewPassword] = useState('');

  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState('');

  // Payment error
  const [paymentError, setPaymentError] = useState('');
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Social proof: live activity feed
  const [activityIdx, setActivityIdx] = useState(0);
  const [activityVisible, setActivityVisible] = useState(true);
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  // FOMO countdown: 10-min timer starting from mount
  const [fomoSeconds, setFomoSeconds] = useState(() => {
    const stored = sessionStorage.getItem('fomo_timer_start');
    if (stored) {
      const elapsed = Math.floor((Date.now() - parseInt(stored)) / 1000);
      return Math.max(0, 600 - elapsed);
    }
    sessionStorage.setItem('fomo_timer_start', Date.now().toString());
    return 600;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setActivityVisible(false);
      setTimeout(() => {
        setActivityIdx(prev => (prev + 1) % ACTIVITY_FEED.length);
        setActivityVisible(true);
      }, 400);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIdx(prev => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (fomoSeconds <= 0) return;
    const interval = setInterval(() => {
      setFomoSeconds(prev => {
        if (prev <= 1) { clearInterval(interval); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const fomoMins = String(Math.floor(fomoSeconds / 60)).padStart(2, '0');
  const fomoSecs = String(fomoSeconds % 60).padStart(2, '0');

  if (loading) return <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center', color: 'white', background: '#070810' }}>Loading...</div>;

  // 1. Authentication Overlay Gate
  if (!user) {
    const handleSignInSubmit = async (e) => {
      e.preventDefault();
      setAuthError('');
      setAuthLoading(true);
      try {
        await login({ email: signInEmail, password: signInPassword });
      } catch (err) {
        setAuthError(err.message || 'Login failed.');
      } finally {
        setAuthLoading(false);
      }
    };

    const handleSignUpSubmit = async (e) => {
      e.preventDefault();
      setAuthError('');
      setAuthLoading(true);
      try {
        if (!showOtpScreen) {
          // Step 1: Request OTP
          const res = await fetch('/api/send-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: signUpEmail })
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data.error || 'Failed to send OTP.');
          
          setShowOtpScreen(true);
        } else {
          // Step 2: Verify OTP and securely create account via backend
          const res = await fetch('/api/verify-otp-signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              email: signUpEmail, 
              otp: otpCode, 
              password: signUpPassword, 
              name: signUpName, 
              phone: signUpPhone 
            })
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data.error || 'Failed to verify OTP.');
          
          // Use the custom token returned by the backend to log in securely
          await loginWithToken(data.token);
        }
      } catch (err) {
        setAuthError(err.message || 'Registration failed.');
      } finally {
        setAuthLoading(false);
      }
    };

    const handleForgotPasswordSubmit = async (e) => {
      e.preventDefault();
      setAuthError('');
      setForgotSuccess('');
      setAuthLoading(true);
      try {
        if (!showForgotOtpScreen) {
          // Step 1: Request OTP
          const res = await fetch('/api/send-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: forgotEmail })
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data.error || 'Failed to send OTP.');
          
          setShowForgotOtpScreen(true);
          setForgotSuccess('OTP sent to your email.');
        } else {
          // Step 2: Verify OTP and reset password
          const res = await fetch('/api/reset-password-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              email: forgotEmail, 
              otp: forgotOtpCode, 
              newPassword: forgotNewPassword 
            })
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data.error || 'Failed to verify OTP.');
          
          setForgotSuccess('Password reset successfully! Logging you in...');
          if (data.token) {
             await loginWithToken(data.token);
          } else {
             setAuthTab('signin');
             setShowForgotOtpScreen(false);
          }
        }
      } catch (err) {
        setAuthError(err.message || 'Failed to reset password.');
      } finally {
        setAuthLoading(false);
      }
    };

    return (
      <div className="auth-page-container">
        <div className="auth-glow-bg"></div>
        
        {/* Left Side: Brand Promo Panels */}
        <div className="auth-side-promo">
          <div className="promo-grid-lines"></div>
          <div className="promo-glow-spot"></div>
          
          <div className="promo-header">
            <div className="auth-brand">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
              <span>dsaflow.app</span>
            </div>
            <span className="promo-edition-badge">Premium v2.4</span>
          </div>

          <div className="promo-main">
            <h1 className="promo-headline">
              Master DSA. <br />
              <span className="gradient-text">Ace Your Placements.</span>
            </h1>
            <p className="promo-subtext">
              The smart, interactive learning environment tailored for Indian students aiming for product-based roles. Learn concepts visually and code in real-time.
            </p>

            {/* Micro Stats Row */}
            <div className="promo-stats">
              <div className="promo-stat-card">
                <span className="stat-value">1,200+</span>
                <span className="stat-label">Students</span>
              </div>
              <div className="promo-stat-card">
                <span className="stat-value">42</span>
                <span className="stat-label">Modules</span>
              </div>
              <div className="promo-stat-card">
                <span className="stat-value">₹99</span>
                <span className="stat-label">Lifetime</span>
              </div>
            </div>

            {/* Live Activity Feed */}
            <div style={{
              background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '12px', padding: '12px 16px', marginTop: '16px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4ade80', display: 'inline-block', boxShadow: '0 0 6px #4ade80', flexShrink: 0 }}></span>
                <span style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Live Activity</span>
              </div>
              <div style={{ opacity: activityVisible ? 1 : 0, transition: 'opacity 0.4s ease', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '32px', height: '32px', borderRadius: '50%', flexShrink: 0,
                  background: 'linear-gradient(135deg, rgba(124,77,255,0.5), rgba(6,182,212,0.5))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.9rem', fontWeight: 700, color: '#fff',
                }}>
                  {ACTIVITY_FEED[activityIdx].name[0]}
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: '#e2e8f0', lineHeight: 1.3 }}>
                    <strong>{ACTIVITY_FEED[activityIdx].name}</strong> from {ACTIVITY_FEED[activityIdx].city}
                  </p>
                  <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748b' }}>
                    {ACTIVITY_FEED[activityIdx].action} • {ACTIVITY_FEED[activityIdx].ago}
                  </p>
                </div>
              </div>
            </div>

            {/* Checklist */}
            <div className="promo-features-list">
              <div className="promo-feature-card">
                <span className="feature-icon">🧩</span>
                <div className="feature-card-body">
                  <h4>Interactive Visualizers</h4>
                  <p>Step through code execution and watch structures update dynamically.</p>
                </div>
              </div>
              <div className="promo-feature-card">
                <span className="feature-icon">💻</span>
                <div className="feature-card-body">
                  <h4>Built-in Coding Arena</h4>
                  <p>Solve problems in Javascript, C++, Java, or Python with testcases.</p>
                </div>
              </div>
              <div className="promo-feature-card">
                <span className="feature-icon">🧠</span>
                <div className="feature-card-body">
                  <h4>AI Tutor Integration</h4>
                  <p>Resolve doubts instantly with your personalized Gemini-powered chat agent.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="promo-footer">
            <p>Trusted by thousands of tech aspirants nationwide</p>
          </div>
        </div>

        {/* Right Side: Auth Form Container */}
        <div className="auth-side-form">
          <div className="auth-card">
            {/* Brand Header (Visible on Mobile Only) */}
            <div className="auth-brand-mobile">
              <div className="auth-brand">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                <span>dsaflow.app</span>
              </div>
              <p className="auth-subtitle">India's #1 DSA Learning Platform for Placements</p>
            </div>

            <div className="trial-promo-badge">
              <span className="trial-badge-dot"></span>
              🎯 <strong>1-Day FREE Trial</strong> — Then ₹99 for Lifetime Access
            </div>

            {authTab !== 'forgot_password' && (
              <div className="auth-tabs-pill">
                <button 
                  className={`auth-tab-pill-btn ${authTab === 'signin' ? 'active' : ''}`}
                  onClick={() => { setAuthTab('signin'); setAuthError(''); setForgotSuccess(''); }}
                >
                  Sign In
                </button>
                <button 
                  className={`auth-tab-pill-btn ${authTab === 'signup' ? 'active' : ''}`}
                  onClick={() => { setAuthTab('signup'); setAuthError(''); setForgotSuccess(''); }}
                >
                  Sign Up Free
                </button>
              </div>
            )}

            {authTab === 'forgot_password' ? (
              <form className="auth-form" onSubmit={handleForgotPasswordSubmit}>
                <h3 className="auth-form-title">Reset Password</h3>
                <p className="auth-form-desc">
                  {!showForgotOtpScreen 
                    ? "Enter your email address and we'll send you a 6-digit recovery code."
                    : `Enter the code sent to ${forgotEmail} and your new password.`}
                </p>
                
                {!showForgotOtpScreen ? (
                  <div className="form-group">
                    <label>Email Address</label>
                    <div className="input-with-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                      <input 
                        type="email" 
                        placeholder="your@email.com" 
                        value={forgotEmail} 
                        onChange={e => setForgotEmail(e.target.value)} 
                        required 
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="form-group">
                      <label>6-Digit Code</label>
                      <div className="input-with-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                        <input 
                          type="text" 
                          placeholder="000000" 
                          value={forgotOtpCode} 
                          onChange={e => setForgotOtpCode(e.target.value.replace(/\\D/g, '').slice(0, 6))}
                          required 
                          pattern="\\d{6}"
                          maxLength="6"
                          style={{ letterSpacing: '4px', textAlign: 'center', fontSize: '1.2rem', fontWeight: 'bold' }}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>New Password <span className="label-helper">(min 6 characters)</span></label>
                      <div className="input-with-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                        <input 
                          type={showPassword ? 'text' : 'password'} 
                          placeholder="Create a strong password" 
                          value={forgotNewPassword} 
                          onChange={e => setForgotNewPassword(e.target.value)} 
                          required 
                          minLength={6} 
                        />
                        <button
                          type="button"
                          className="password-toggle-btn"
                          onClick={() => setShowPassword(!showPassword)}
                          title={showPassword ? 'Hide Password' : 'Show Password'}
                        >
                          {showPassword ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                          )}
                        </button>
                      </div>
                    </div>
                  </>
                )}

                {authError && <div className="auth-error">{authError}</div>}
                {forgotSuccess && <div className="auth-success-alert">{forgotSuccess}</div>}

                <button type="submit" className="btn btn-primary auth-submit-btn" disabled={authLoading}>
                  <span className="btn-text">{authLoading ? '⏳ Processing...' : (!showForgotOtpScreen ? 'Send Reset Code' : 'Reset & Log In')}</span>
                </button>
                
                <p className="auth-form-footer-link">
                  {!showForgotOtpScreen ? (
                    <>Remembered your password? <span onClick={() => { setAuthTab('signin'); setAuthError(''); setForgotSuccess(''); }}>Sign In →</span></>
                  ) : (
                    <span onClick={() => { setShowForgotOtpScreen(false); setAuthError(''); setForgotSuccess(''); }}>← Try a different email</span>
                  )}
                </p>
              </form>
            ) : authTab === 'signin' ? (
              <form className="auth-form" onSubmit={handleSignInSubmit}>
                <div className="form-group">
                  <label>Email Address</label>
                  <div className="input-with-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                    <input 
                      type="email" 
                      placeholder="your@email.com" 
                      value={signInEmail} 
                      onChange={e => setSignInEmail(e.target.value)} 
                      required 
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <span>Password</span>
                    <span 
                      onClick={() => { setAuthTab('forgot_password'); setAuthError(''); setForgotSuccess(''); }} 
                      className="auth-forgot-link"
                    >
                      Forgot Password?
                    </span>
                  </label>
                  <div className="input-with-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                    <input 
                      type={showPassword ? 'text' : 'password'} 
                      placeholder="Your password" 
                      value={signInPassword} 
                      onChange={e => setSignInPassword(e.target.value)} 
                      required 
                    />
                    <button
                      type="button"
                      className="password-toggle-btn"
                      onClick={() => setShowPassword(!showPassword)}
                      title={showPassword ? 'Hide Password' : 'Show Password'}
                    >
                      {showPassword ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                      )}
                    </button>
                  </div>
                </div>
                {authError && <div className="auth-error">{authError}</div>}
                <button type="submit" className="btn btn-primary auth-submit-btn" disabled={authLoading}>
                  <span className="btn-text">{authLoading ? '⏳ Signing In...' : 'Sign In'}</span>
                </button>
                <p className="auth-form-footer-link">
                  Don't have an account? <span onClick={() => setAuthTab('signup')}>Sign up free →</span>
                </p>
              </form>
            ) : (
              <form className="auth-form" onSubmit={handleSignUpSubmit}>
                {!showOtpScreen ? (
                  <>
                    <div className="form-group">
                      <label>Full Name</label>
                  <div className="input-with-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 1 0-16 0"/></svg>
                    <input 
                      type="text" 
                      placeholder="Ganesh" 
                      value={signUpName} 
                      onChange={e => setSignUpName(e.target.value)} 
                      required 
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <div className="input-with-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                    <input 
                      type="email" 
                      placeholder="your@email.com" 
                      value={signUpEmail} 
                      onChange={e => setSignUpEmail(e.target.value)} 
                      required 
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>WhatsApp Number <span className="label-helper">(for placement alerts)</span></label>
                  <div className="input-with-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.56 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    <input 
                      type="tel" 
                      placeholder="+91 98765 43210" 
                      value={signUpPhone} 
                      onChange={e => setSignUpPhone(e.target.value)} 
                      required 
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Password <span className="label-helper">(min 6 characters)</span></label>
                  <div className="input-with-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                    <input 
                      type={showPassword ? 'text' : 'password'} 
                      placeholder="Create a strong password" 
                      value={signUpPassword} 
                      onChange={e => setSignUpPassword(e.target.value)} 
                      required 
                      minLength={6} 
                    />
                    <button
                      type="button"
                      className="password-toggle-btn"
                      onClick={() => setShowPassword(!showPassword)}
                      title={showPassword ? 'Hide Password' : 'Show Password'}
                    >
                      {showPassword ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                      )}
                    </button>
                  </div>
                </div>
                {authError && <div className="auth-error">{authError}</div>}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '16px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  <input type="checkbox" id="terms-checkbox" required style={{ marginTop: '4px', cursor: 'pointer', accentColor: 'var(--accent-cyan)' }} />
                  <label htmlFor="terms-checkbox" style={{ cursor: 'pointer', lineHeight: '1.4' }}>
                    I agree to the <span style={{ color: 'var(--accent-cyan)' }}>Terms of Service</span> and <span style={{ color: 'var(--accent-cyan)' }}>Privacy Policy</span>. My data will only be used for placement opportunities.
                  </label>
                </div>
                <button type="submit" className="btn btn-accent auth-submit-btn" disabled={authLoading}>
                  <span className="btn-text">{authLoading ? '⏳ Sending OTP...' : '🚀 Start Free Trial'}</span>
                </button>
                  </>
                ) : (
                  <>
                    <div className="form-group" style={{ textAlign: 'center', marginBottom: '24px' }}>
                      <label style={{ fontSize: '1.1rem', color: '#f8fafc', marginBottom: '8px' }}>Verify Your Email</label>
                      <p style={{ fontSize: '0.85rem', color: '#94a3b8', margin: 0 }}>We've sent a 6-digit code to <strong>{signUpEmail}</strong></p>
                    </div>
                    <div className="form-group">
                      <div className="input-with-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                        <input 
                          type="text" 
                          placeholder="Enter 6-digit code" 
                          value={otpCode} 
                          onChange={e => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                          required 
                          pattern="\d{6}"
                          maxLength="6"
                          style={{ letterSpacing: '4px', textAlign: 'center', fontSize: '1.2rem', fontWeight: 'bold' }}
                        />
                      </div>
                    </div>
                    {authError && <div className="auth-error">{authError}</div>}
                    <button type="submit" className="btn btn-accent auth-submit-btn" disabled={authLoading}>
                      <span className="btn-text">{authLoading ? '⏳ Verifying...' : 'Verify & Create Account'}</span>
                    </button>
                    <p className="auth-form-footer-link" style={{ marginTop: '16px', textAlign: 'center' }}>
                      Didn't receive code? <span onClick={() => { setShowOtpScreen(false); setAuthError(''); }}>Go back</span>
                    </p>
                  </>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }

  // 2. Payment Gateway Overlay Block Gate
  if (trial && !trial.hasAccess) {
    const handlePayNow = async () => {
      setPaymentError('');
      setPaymentLoading(true);
      try {
        const paymentId = await openRazorpayCheckout(user);
        await payAndUnlock(paymentId);
      } catch (err) {
        setPaymentError(err.message || 'Payment cancelled.');
      } finally {
        setPaymentLoading(false);
      }
    };

    const currentTestimonial = TESTIMONIALS[testimonialIdx];

    return (
      <div className="overlay-fullscreen payment-overlay" style={{ display: 'flex' }}>
        <div className="auth-glow-bg"></div>
        <div className="payment-card" style={{ maxWidth: '480px' }}>
          {/* FOMO Banner */}
          {fomoSeconds > 0 && (
            <div style={{
              background: 'linear-gradient(135deg, rgba(244,63,94,0.15), rgba(251,146,60,0.12))',
              border: '1px solid rgba(244,63,94,0.3)',
              borderRadius: '10px', padding: '10px 16px', marginBottom: '16px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              flexWrap: 'wrap', gap: '8px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '1rem' }}>⚡</span>
                <div>
                  <p style={{ margin: 0, fontSize: '0.78rem', fontWeight: 700, color: '#fca5a5' }}>80% Offer Expires In</p>
                  <p style={{ margin: 0, fontSize: '0.7rem', color: '#94a3b8' }}>Price goes back to ₹499 after this</p>
                </div>
              </div>
              <div style={{
                fontFamily: 'monospace', fontSize: '1.5rem', fontWeight: 900,
                color: '#f87171', letterSpacing: '2px',
                textShadow: '0 0 20px rgba(248,113,113,0.5)',
              }}>
                {fomoMins}:{fomoSecs}
              </div>
            </div>
          )}

          <div className="payment-icon">⏳</div>
          <h2 className="payment-title">Your Free Trial Has Ended</h2>
          <p className="payment-subtitle">Get <strong>lifetime access</strong> to dsaflow.app for just</p>
          <div className="payment-price">
            <span className="price-original">₹499</span>
            <span className="price-current">₹99</span>
            <span className="price-badge">80% OFF</span>
          </div>
          <p className="payment-desc">One-time payment • Lifetime access • No subscription</p>

          {/* Social Proof Counter */}
          <div style={{
            background: 'rgba(74,222,128,0.06)', border: '1px solid rgba(74,222,128,0.15)',
            borderRadius: '8px', padding: '8px 14px', marginBottom: '16px',
            display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem',
          }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4ade80', display: 'inline-block', boxShadow: '0 0 6px #4ade80', flexShrink: 0 }}></span>
            <span style={{ color: '#86efac' }}>
              <strong>23 students</strong> upgraded to Premium in the last 24 hours
            </span>
          </div>

          <div className="payment-features">
            <div className="pf-item"><span className="pf-icon">🧩</span> 42 complete DSA modules</div>
            <div className="pf-item"><span className="pf-icon">🔄</span> 26 Grokking Coding Patterns (211+ problems)</div>
            <div className="pf-item"><span className="pf-icon">🤖</span> AI Placement Assistant (Powered by Groq)</div>
            <div className="pf-item"><span className="pf-icon">🔥</span> Daily Streak Tracker &amp; Interview Target Countdown</div>
            <div className="pf-item"><span className="pf-icon">📊</span> Interactive code visualizers &amp; IDE sandbox</div>
            <div className="pf-item"><span className="pf-icon">🎯</span> Mock quizzes &amp; full placement roadmap</div>
          </div>

          {/* Rotating Testimonial */}
          <div style={{
            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '12px', padding: '14px 16px', marginBottom: '16px',
            textAlign: 'left', transition: 'opacity 0.4s ease',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <div style={{
                width: '36px', height: '36px', borderRadius: '50%', flexShrink: 0,
                background: 'linear-gradient(135deg, rgba(124,77,255,0.4), rgba(6,182,212,0.4))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.1rem',
              }}>
                {currentTestimonial.avatar}
              </div>
              <div>
                <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: 700, color: '#f1f5f9' }}>{currentTestimonial.name}</p>
                <p style={{ margin: 0, fontSize: '0.72rem', color: '#4ade80' }}>{currentTestimonial.role}</p>
              </div>
              <div style={{ marginLeft: 'auto', display: 'flex', gap: '2px' }}>
                {[1,2,3,4,5].map(s => <span key={s} style={{ color: '#fbbf24', fontSize: '0.75rem' }}>★</span>)}
              </div>
            </div>
            <p style={{ margin: 0, fontSize: '0.82rem', color: '#94a3b8', lineHeight: 1.5, fontStyle: 'italic' }}>
              "{currentTestimonial.text}"
            </p>
          </div>

          <button className="btn btn-accent payment-cta" onClick={handlePayNow} disabled={paymentLoading}>
            {paymentLoading ? '⏳ Processing...' : '💳 Pay ₹99 — Unlock Lifetime Access'}
          </button>
          <div className="payment-security">
            🔒 Secured by Razorpay • Support: <a href="mailto:dsaflow@outlook.com" style={{ color: 'var(--accent-cyan)', textDecoration: 'none' }}>dsaflow@outlook.com</a>
          </div>
          <button className="btn btn-secondary" onClick={logout} style={{ marginTop: '14px', width: '100%', opacity: 0.6, fontSize: '0.82rem' }}>
            Sign out &amp; switch account
          </button>

          {paymentError && <div className="payment-error">{paymentError}</div>}
        </div>
      </div>
    );
  }

  // 3. Main App Layout (Authenticated and Paid/Trial Active)
  return (
    <>
      <div className="background-glow"></div>
      <div className="app-container">
        <Header />
        <Navbar />
        <main className="main-content" style={{ position: 'relative' }}>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/roadmap" element={<Roadmap />} />
              <Route path="/learn" element={<LearningHub />} />
              <Route path="/arena" element={<Arena />} />
              <Route path="/ide" element={<WebIDE />} />
              <Route path="/visualizer" element={<Visualizer />} />
              <Route path="/platforms" element={<Platforms />} />
              <Route path="/quiz" element={<MockQuiz />} />
              <Route path="/ai" element={<DsaFlowAI />} />
              <Route path="/support" element={<Support />} />
              <Route path="/patterns" element={<Patterns />} />
              <Route path="/admin-dsa-secret" element={<AdminDashboard />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </main>
      </div>
      <QuotesTicker />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <Router>
          <AppLayout />
        </Router>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;
