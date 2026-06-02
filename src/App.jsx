import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import Header from './components/Layout/Header';
import Navbar from './components/Layout/Navbar';
import Dashboard from './components/Learning/Dashboard';
import Roadmap from './components/Learning/Roadmap';
import LearningHub from './components/Learning/LearningHub';
import Arena from './components/Arena/Arena';
import WebIDE from './components/IDE/WebIDE';
import Visualizer from './components/Visualizer/Visualizer';
import MockQuiz from './components/Quiz/MockQuiz';
import Platforms from './components/Platforms/Platforms';
import Support from './components/Support/Support';
import DsaFlowAI from './components/AI/DsaFlowAI';
import AdminDashboard from './components/Admin/AdminDashboard';
import { openRazorpayCheckout } from '../modules/payment/payment';
import './index.css';

const QUOTES = [
  { text: "An algorithm must be seen to be believed.", author: "Donald Knuth" },
  { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
  { text: "Every expert was once a beginner. Start today.", author: "dsa.flow" },
  { text: "The best time to learn DSA was yesterday. The second best time is NOW.", author: "dsa.flow" },
  { text: "Clean code always looks like it was written by someone who cares.", author: "Robert C. Martin" },
  { text: "Data structures + algorithms = programs. Master both.", author: "Niklaus Wirth" },
  { text: "Debugging is twice as hard as writing the code in the first place.", author: "Brian Kernighan" },
  { text: "The function of good software is to make the impossible possible.", author: "Theo de Raadt" },
  { text: "Consistency beats talent every single time. Code daily.", author: "dsa.flow" },
  { text: "Solving one LeetCode problem a day keeps unemployment away.", author: "dsa.flow" },
  { text: "Hard problems only feel impossible before you solve them.", author: "dsa.flow" },
  { text: "O(N²) is fine for 1000 elements. But your interviewer has 10⁶.", author: "dsa.flow" },
  { text: "The secret to getting ahead is getting started.", author: "Mark Twain" },
  { text: "Great software is not built in a day — but great habits are formed in one.", author: "dsa.flow" },
  { text: "FAANG or not — DSA mastery opens every door.", author: "dsa.flow" },
  { text: "Your comfort zone is the enemy of your placement offer.", author: "dsa.flow" },
  { text: "Binary search cuts problems in half. So does asking the right question.", author: "dsa.flow" },
  { text: "In programming, if you can't explain it simply, you don't understand it well enough.", author: "Albert Einstein (adapted)" },
  { text: "DP is just recursion with a memory. So is learning.", author: "dsa.flow" },
  { text: "The journey of 1000 LeetCode problems begins with a single array.", author: "dsa.flow" },
  { text: "Code is poetry. DSA is the grammar.", author: "dsa.flow" },
  { text: "Your future self will thank you for every hour of DSA practice today.", author: "dsa.flow" },
  { text: "An optimal solution always exists. Finding it is the challenge.", author: "dsa.flow" },
  { text: "Graphs are just trees that grew up and got complicated. Like real life.", author: "dsa.flow" },
  { text: "Every O(N!) problem has an O(2^N) hidden inside it waiting to be found.", author: "dsa.flow" }
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

function AppLayout() {
  const { user, trial, loading, login, register, logout, payAndUnlock, sendPasswordReset } = useAuth();
  
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

  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState('');

  // Payment error
  const [paymentError, setPaymentError] = useState('');
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
        await register({
          name: signUpName,
          email: signUpEmail,
          phone: signUpPhone,
          password: signUpPassword
        });
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
        await sendPasswordReset(forgotEmail);
        setForgotSuccess('Password reset link sent! Check your inbox.');
        setForgotEmail('');
      } catch (err) {
        setAuthError(err.message || 'Failed to send password reset email.');
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
              <span>dsa.flow</span>
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
                <span className="stat-value">35+</span>
                <span className="stat-label">Modules</span>
              </div>
              <div className="promo-stat-card">
                <span className="stat-value">4</span>
                <span className="stat-label">Languages</span>
              </div>
              <div className="promo-stat-card">
                <span className="stat-value">100%</span>
                <span className="stat-label">Visual</span>
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
                <span>dsa.flow</span>
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
                  Enter your email address and we'll send you a recovery link to reset your password.
                </p>
                
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

                {authError && <div className="auth-error">{authError}</div>}
                {forgotSuccess && <div className="auth-success-alert">{forgotSuccess}</div>}

                <button type="submit" className="btn btn-primary auth-submit-btn" disabled={authLoading}>
                  <span className="btn-text">{authLoading ? '⏳ Sending...' : 'Send Reset Link'}</span>
                </button>
                
                <p className="auth-form-footer-link">
                  Remembered your password? <span onClick={() => { setAuthTab('signin'); setAuthError(''); setForgotSuccess(''); }}>Sign In →</span>
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
                <button type="submit" className="btn btn-accent auth-submit-btn" disabled={authLoading}>
                  <span className="btn-text">{authLoading ? '⏳ Creating...' : '🚀 Start Free Trial'}</span>
                </button>
                <p className="auth-terms">By signing up, you agree to our Terms of Service. Your data is securely stored and will only be used to contact you about placement opportunities.</p>
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

    return (
      <div className="overlay-fullscreen payment-overlay" style={{ display: 'flex' }}>
        <div className="auth-glow-bg"></div>
        <div className="payment-card">
          <div className="payment-icon">⏳</div>
          <h2 className="payment-title">Your Free Trial Has Ended</h2>
          <p className="payment-subtitle">Get <strong>lifetime access</strong> to dsa.flow for just</p>
          <div className="payment-price">
            <span className="price-original">₹499</span>
            <span className="price-current">₹99</span>
            <span className="price-badge">80% OFF</span>
          </div>
          <p className="payment-desc">One-time payment • Lifetime access • No subscription</p>

          <div className="payment-features">
            <div className="pf-item"><span className="pf-icon">🧩</span> 16 complete DSA modules</div>
            <div className="pf-item"><span className="pf-icon">🌐</span> Multi-language code (JS, C++, Java, Python)</div>
            <div className="pf-item"><span className="pf-icon">📊</span> Interactive algorithm visualizer</div>
            <div className="pf-item"><span className="pf-icon">🎯</span> 15-question placement quiz</div>
            <div className="pf-item"><span className="pf-icon">🗺️</span> Structured DSA roadmap</div>
            <div className="pf-item"><span className="pf-icon">🏆</span> LeetCode + HackerRank guides</div>
          </div>

          <button className="btn btn-accent payment-cta" onClick={handlePayNow} disabled={paymentLoading}>
            {paymentLoading ? '⏳ Processing...' : '💳 Pay ₹99 — Unlock Lifetime Access'}
          </button>
          <div className="payment-security">
            🔒 Secured by Razorpay • Support: <a href="mailto:dsa.flow@outlook.com" style={{ color: 'var(--accent-cyan)', textDecoration: 'none' }}>dsa.flow@outlook.com</a>
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
            <Route path="/admin-dsa-secret" element={<AdminDashboard />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
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
