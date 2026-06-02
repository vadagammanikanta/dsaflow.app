import React, { useState, useEffect } from 'react';
import { getSupportTickets, resolveSupportTicket } from '../../../modules/auth/auth.js';
import './admin.css';

export default function AdminDashboard() {
  const [adminKey, setAdminKey] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Stats Data
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Email form state
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [emailType, setEmailType] = useState('update');
  const [emailTarget, setEmailTarget] = useState('all');
  const [emailSending, setEmailSending] = useState(false);
  const [broadcastResult, setBroadcastResult] = useState(null);
  const [previewMode, setPreviewMode] = useState(false);

  // AI chat state
  const [aiInput, setAiInput] = useState('');
  const [aiChat, setAiChat] = useState([
    { role: 'ai', content: 'Greetings, Administrator. I am the Intellectual Admin AI for dsa.flow. How may I assist you with user analytics or curriculum insights today?' }
  ]);
  const [aiThinking, setAiThinking] = useState(false);

  // Action status
  const [actionStatus, setActionStatus] = useState('');

  const fetchStats = async (key) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/admin-stats?key=${key}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to authenticate');
      
      setStats(data.summary);
      
      // Combine all users for CRUD
      const combined = [
        ...data.upgradedMembers.map(u => ({ ...u, isPaid: true })),
        ...data.freeUsers.map(u => ({ ...u, isPaid: false }))
      ];
      setUsers(combined.sort((a, b) => new Date(b.signupDate) - new Date(a.signupDate)));
      
      // Fetch support tickets
      const allTickets = await getSupportTickets(key);
      setTickets(allTickets);
      
      setIsAuthenticated(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResolveTicket = async (ticketId) => {
    if (!window.confirm('Are you sure you want to mark this support ticket as resolved?')) return;
    
    setActionStatus('Resolving ticket...');
    try {
      const success = await resolveSupportTicket(ticketId, adminKey);
      if (success) {
        setActionStatus('Success: Ticket resolved!');
        const allTickets = await getSupportTickets(adminKey);
        setTickets(allTickets);
      } else {
        throw new Error('Failed to resolve support ticket');
      }
    } catch (err) {
      setActionStatus(`Error: ${err.message}`);
    }
    setTimeout(() => setActionStatus(''), 4000);
  };

  // Fetch support tickets automatically when the admin switches to the tickets tab
  useEffect(() => {
    if (isAuthenticated && activeTab === 'tickets') {
      const loadTickets = async () => {
        try {
          const allTickets = await getSupportTickets(adminKey);
          setTickets(allTickets);
        } catch (e) {
          console.warn('Failed to reload tickets on tab change:', e);
        }
      };
      loadTickets();
    }
  }, [activeTab, isAuthenticated, adminKey]);

  const handleLogin = (e) => {
    e.preventDefault();
    fetchStats(adminKey);
  };

  const handleManualUpgrade = async (email) => {
    if (!window.confirm(`Are you sure you want to grant a FREE LIFETIME UPGRADE to ${email}?`)) return;
    
    setActionStatus(`Upgrading ${email}...`);
    try {
      const res = await fetch('/api/admin-action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: adminKey, action: 'MANUAL_UPGRADE', targetEmail: email })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upgrade failed');
      
      setActionStatus(`Success: ${email} upgraded!`);
      // Refresh stats
      fetchStats(adminKey);
    } catch (err) {
      setActionStatus(`Error: ${err.message}`);
    }
    setTimeout(() => setActionStatus(''), 4000);
  };

  const handleSendBulkEmail = async (e) => {
    e.preventDefault();
    const targetLabel = emailTarget === 'all' ? 'ALL users' : emailTarget === 'premium' ? 'Premium members only' : 'Free/Trial users only';
    if (!window.confirm(`Send "${emailSubject}" to ${targetLabel}? This cannot be undone.`)) return;
    
    setEmailSending(true);
    setBroadcastResult(null);
    setActionStatus('📤 Broadcasting via Resend...');
    try {
      const res = await fetch('/api/send-bulk-emails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          key: adminKey,
          subject: emailSubject,
          message: emailBody,
          emailType,
          target: emailTarget,
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send broadcast');
      
      setBroadcastResult(data);
      setActionStatus(`✅ Sent ${data.sentCount} of ${data.totalUsers} emails!`);
      setEmailSubject('');
      setEmailBody('');
    } catch (err) {
      setActionStatus(`❌ Error: ${err.message}`);
    } finally {
      setEmailSending(false);
      setTimeout(() => setActionStatus(''), 8000);
    }
  };

  const handleAiSubmit = (e) => {
    e.preventDefault();
    if (!aiInput.trim()) return;
    
    const userMessage = aiInput;
    setAiChat(prev => [...prev, { role: 'admin', content: userMessage }]);
    setAiInput('');
    setAiThinking(true);
    
    // Mocking an intellectual AI response based on the input
    setTimeout(() => {
      let response = '';
      const lower = userMessage.toLowerCase();
      if (lower.includes('email') || lower.includes('draft')) {
        response = "Certainly. Here is a draft for your broadcast:\\n\\n**Subject:** Important Update to your dsa.flow Account\\n\\n**Body:**\\nWe've recently rolled out our new AI tools and offline code snippets. Check your dashboard to experience the seamless performance! Let me know if you want me to refine this tone.";
      } else if (lower.includes('stats') || lower.includes('revenue') || lower.includes('users')) {
        response = `Based on current metrics, we have ${stats?.totalUsers || 0} total registered users, with ${stats?.upgradedMembers || 0} premium members generating ${stats?.revenue || '₹0'}. Consider running a discount campaign for the ${stats?.freeTrialExpired || 0} users whose trial has expired.`;
      } else {
        response = "I have analyzed your request. As your intellectual assistant, I recommend focusing our efforts on improving conversion rates for expired trial users. Is there a specific data metric you'd like me to fetch?";
      }
      
      setAiChat(prev => [...prev, { role: 'ai', content: response }]);
      setAiThinking(false);
    }, 1500);
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-login-wrapper">
        <div className="admin-login-card">
          <div className="admin-lock-icon">🔒</div>
          <h2>Admin Secure Access</h2>
          <p>Please enter the administrator passphrase.</p>
          <form onSubmit={handleLogin}>
            <input 
              type="password" 
              placeholder="Admin Key..." 
              value={adminKey} 
              onChange={e => setAdminKey(e.target.value)} 
              className="admin-input"
              required 
            />
            {error && <div className="admin-error">{error}</div>}
            <button type="submit" className="admin-btn" disabled={loading}>
              {loading ? 'Authenticating...' : 'Enter System'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-sidebar">
        <div className="admin-brand">
          <span className="admin-brand-icon">⚡</span>
          <span>dsa.flow <span className="admin-badge">ADMIN</span></span>
        </div>
        <nav className="admin-nav">
          <button className={activeTab === 'overview' ? 'active' : ''} onClick={() => setActiveTab('overview')}>📊 Overview</button>
          <button className={activeTab === 'users' ? 'active' : ''} onClick={() => setActiveTab('users')}>👥 User Management</button>
          <button className={activeTab === 'tickets' ? 'active' : ''} onClick={() => setActiveTab('tickets')}>🎫 Support Tickets</button>
          <button className={activeTab === 'broadcast' ? 'active' : ''} onClick={() => setActiveTab('broadcast')}>✉️ Broadcast Emails</button>
          <button className={activeTab === 'ai' ? 'active' : ''} onClick={() => setActiveTab('ai')}>🧠 Intellectual AI</button>
        </nav>
        <div className="admin-footer">
          <button onClick={() => { setIsAuthenticated(false); setAdminKey(''); }} className="admin-logout-btn">Sign Out</button>
        </div>
      </div>

      <div className="admin-content">
        <header className="admin-header">
          <h1>
            {activeTab === 'overview' && 'System Overview'}
            {activeTab === 'users' && 'User Management & CRUD'}
            {activeTab === 'tickets' && 'User Support Tickets'}
            {activeTab === 'broadcast' && 'Broadcast Communication'}
            {activeTab === 'ai' && 'Intellectual Admin Assistant'}
          </h1>
          {actionStatus && <div className="admin-action-toast">{actionStatus}</div>}
        </header>

        <main className="admin-main">
          {activeTab === 'overview' && stats && (
            <div className="admin-overview">
              <div className="admin-stat-cards">
                <div className="admin-stat-card">
                  <div className="stat-label">Total Users</div>
                  <div className="stat-value">{stats.totalUsers}</div>
                </div>
                <div className="admin-stat-card premium">
                  <div className="stat-label">Premium Upgrades</div>
                  <div className="stat-value">{stats.upgradedMembers}</div>
                </div>
                <div className="admin-stat-card revenue">
                  <div className="stat-label">Total Revenue</div>
                  <div className="stat-value">{stats.revenue}</div>
                </div>
                <div className="admin-stat-card warning">
                  <div className="stat-label">Trials Expired</div>
                  <div className="stat-value">{stats.freeTrialExpired}</div>
                </div>
              </div>
              <div className="admin-info-panel">
                <h3>System Health</h3>
                <p>All core services are operational. Firebase connection is active. Last data refresh: {stats.generatedAt}</p>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="admin-users">
              <div className="admin-table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Status</th>
                      <th>Signup Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u, i) => (
                      <tr key={i}>
                        <td>{u.name}</td>
                        <td>{u.email}</td>
                        <td>
                          {u.isPaid 
                            ? <span className="status-badge paid">Premium</span> 
                            : <span className="status-badge free">Free/Trial</span>}
                        </td>
                        <td>{u.signupDate}</td>
                        <td>
                          {!u.isPaid && (
                            <button className="admin-btn-small" onClick={() => handleManualUpgrade(u.email)}>
                              ✨ Free Upgrade
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'tickets' && (
            <div className="admin-tickets">
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '14px' }}>
                <button
                  onClick={async () => {
                    setActionStatus('Refreshing tickets...');
                    const allTickets = await getSupportTickets(adminKey);
                    setTickets(allTickets);
                    setActionStatus('Tickets refreshed!');
                    setTimeout(() => setActionStatus(''), 2000);
                  }}
                  className="admin-btn-small"
                  style={{ width: 'auto', padding: '6px 12px', fontSize: '0.8rem', background: 'rgba(124, 77, 255, 0.1)', color: 'var(--accent-purple)', borderColor: 'rgba(124, 77, 255, 0.3)' }}
                >
                  🔄 Refresh Tickets
                </button>
              </div>
              {tickets.length === 0 ? (
                <p style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '40px' }}>
                  No support tickets found in database.
                </p>
              ) : (
                <div className="admin-table-container">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>User</th>
                        <th>Email</th>
                        <th>Subject</th>
                        <th>Message</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tickets.map((t, idx) => (
                        <tr key={t.id || idx}>
                          <td><strong>{t.name}</strong></td>
                          <td><small>{t.email}</small></td>
                          <td>
                            <span className="status-badge free" style={{ textTransform: 'capitalize' }}>
                              {t.subject}
                            </span>
                          </td>
                          <td style={{ maxWidth: '300px', whiteSpace: 'pre-wrap', wordBreak: 'break-word', fontSize: '0.85rem' }}>
                            {t.message}
                          </td>
                          <td>
                            <small>{t.createdAt ? new Date(t.createdAt).toLocaleString() : 'N/A'}</small>
                          </td>
                          <td>
                            {t.status === 'resolved' ? (
                              <span className="status-badge paid">Resolved</span>
                            ) : (
                              <span className="status-badge free" style={{ background: 'rgba(255, 152, 0, 0.1)', color: '#ff9800', border: '1px solid rgba(255, 152, 0, 0.3)' }}>Pending</span>
                            )}
                          </td>
                          <td>
                            {t.status !== 'resolved' && (
                              <button 
                                className="admin-btn-small" 
                                onClick={() => handleResolveTicket(t.id || t.createdAt)}
                                style={{ background: 'rgba(0, 255, 128, 0.1)', color: '#00ff80', borderColor: 'rgba(0, 255, 128, 0.3)' }}
                              >
                                Resolve
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === 'broadcast' && (
            <div className="admin-broadcast">

              {/* ── Compose Card ── */}
              <div className="broadcast-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <h3 style={{ margin: 0 }}>📧 Compose Broadcast Email</h3>
                  <span style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', background: 'rgba(6,182,212,0.08)', padding: '4px 10px', borderRadius: '999px', border: '1px solid rgba(6,182,212,0.2)' }}>
                    Powered by Resend
                  </span>
                </div>
                <p className="broadcast-desc">Send professional emails to your users via Resend API. Choose audience, type, and compose your message.</p>

                <form onSubmit={handleSendBulkEmail}>

                  {/* Email Type + Audience Row */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                    <div className="form-group" style={{ margin: 0 }}>
                      <label>📂 Email Type</label>
                      <select
                        value={emailType}
                        onChange={e => setEmailType(e.target.value)}
                        className="admin-input"
                        style={{ cursor: 'pointer' }}
                      >
                        <option value="update">🔔 Platform Update</option>
                        <option value="announcement">📢 Announcement</option>
                        <option value="promotion">🎉 Promotion / Offer</option>
                        <option value="alert">⚠️ Important Alert</option>
                      </select>
                    </div>
                    <div className="form-group" style={{ margin: 0 }}>
                      <label>🎯 Target Audience</label>
                      <select
                        value={emailTarget}
                        onChange={e => setEmailTarget(e.target.value)}
                        className="admin-input"
                        style={{ cursor: 'pointer' }}
                      >
                        <option value="all">👥 All Users</option>
                        <option value="premium">⭐ Premium Members Only</option>
                        <option value="free">🆓 Free / Trial Users Only</option>
                      </select>
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="form-group">
                    <label>✉️ Email Subject</label>
                    <input
                      type="text"
                      value={emailSubject}
                      onChange={e => setEmailSubject(e.target.value)}
                      placeholder="e.g. Exciting New Features Just Dropped! 🚀"
                      className="admin-input"
                      required
                    />
                  </div>

                  {/* Body + Preview Toggle */}
                  <div className="form-group">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <label style={{ margin: 0 }}>📝 Message Body (HTML supported)</label>
                      <button
                        type="button"
                        onClick={() => setPreviewMode(p => !p)}
                        style={{
                          background: previewMode ? 'rgba(6,182,212,0.15)' : 'rgba(255,255,255,0.05)',
                          border: '1px solid rgba(6,182,212,0.3)',
                          color: '#06b6d4',
                          borderRadius: '6px',
                          padding: '4px 12px',
                          fontSize: '0.78rem',
                          cursor: 'pointer',
                          fontWeight: 600,
                        }}
                      >
                        {previewMode ? '✏️ Edit' : '👁️ Preview'}
                      </button>
                    </div>

                    {previewMode ? (
                      <div
                        style={{
                          background: '#0f172a',
                          border: '1px solid #334155',
                          borderRadius: '8px',
                          padding: '20px',
                          minHeight: '180px',
                          color: '#cbd5e1',
                          fontSize: '14px',
                          lineHeight: '1.7',
                        }}
                        dangerouslySetInnerHTML={{ __html: emailBody || '<em style="color:#475569">Nothing to preview yet...</em>' }}
                      />
                    ) : (
                      <textarea
                        value={emailBody}
                        onChange={e => setEmailBody(e.target.value)}
                        placeholder={`Write your message here. HTML is supported.\n\nExample:\n<p>We just launched our new AI Interview Trainer! 🎯</p>\n<p><strong>Click below to try it now.</strong></p>`}
                        className="admin-textarea"
                        rows={9}
                        required
                      />
                    )}
                  </div>

                  {/* Template Chips */}
                  <div style={{ marginBottom: '20px' }}>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.78rem', margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Quick Templates:</p>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {[
                        { label: '🎯 New Feature', subject: '🎯 New Feature Just Launched on dsa.flow!', body: '<p>We are thrilled to announce a brand new feature on <strong>dsa.flow</strong>. Log in now to experience it firsthand and level up your DSA prep!</p>\n<p>As always, your feedback helps us grow. 🚀</p>' },
                        { label: '📅 Weekly Tip', subject: '💡 Your Weekly DSA Tip', body: '<p>Here is your weekly DSA interview tip from the dsa.flow team:</p>\n<blockquote style="border-left:3px solid #06b6d4; padding-left:14px; color:#94a3b8;">Always define your DP state in one clear English sentence before writing any code.</blockquote>\n<p>Keep grinding — FAANG is within reach! 🔥</p>' },
                        { label: '🎉 Offer', subject: '🎉 Limited Offer: Upgrade to Premium Today!', body: '<p>For a <strong>limited time</strong>, we are offering exclusive access to dsa.flow Premium at a special rate.</p>\n<p>Get lifetime access to 450+ curated problems, AI tutor, code arena, and more. Do not miss out!</p>' },
                      ].map(t => (
                        <button
                          key={t.label}
                          type="button"
                          onClick={() => { setEmailSubject(t.subject); setEmailBody(t.body); }}
                          style={{
                            background: 'rgba(255,255,255,0.04)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            color: 'var(--text-secondary)',
                            borderRadius: '6px',
                            padding: '5px 12px',
                            fontSize: '0.78rem',
                            cursor: 'pointer',
                          }}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Send Button */}
                  <button
                    type="submit"
                    className="admin-btn-primary"
                    disabled={emailSending}
                    style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
                  >
                    {emailSending ? (
                      <><span style={{ display: 'inline-block', width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} /> Broadcasting via Resend...</>
                    ) : (
                      `🚀 Send to ${emailTarget === 'all' ? 'All Users' : emailTarget === 'premium' ? 'Premium Members' : 'Free Users'}`
                    )}
                  </button>
                </form>
              </div>

              {/* ── Result Panel ── */}
              {broadcastResult && (
                <div style={{
                  background: broadcastResult.sentCount > 0 ? 'rgba(74,222,128,0.05)' : 'rgba(239,68,68,0.05)',
                  border: `1px solid ${broadcastResult.sentCount > 0 ? 'rgba(74,222,128,0.2)' : 'rgba(239,68,68,0.2)'}`,
                  borderRadius: '12px',
                  padding: '20px 24px',
                  marginTop: '20px',
                }}>
                  <h4 style={{ margin: '0 0 14px', color: broadcastResult.sentCount > 0 ? '#4ade80' : '#ef4444' }}>
                    {broadcastResult.sentCount > 0 ? '✅ Broadcast Complete' : '❌ Broadcast Failed'}
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '14px' }}>
                    {[{ label: 'Total Audience', val: broadcastResult.totalUsers },
                      { label: 'Sent ✅', val: broadcastResult.sentCount },
                      { label: 'Failed ❌', val: broadcastResult.failures?.length || 0 },
                    ].map(s => (
                      <div key={s.label} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '8px', padding: '12px', textAlign: 'center' }}>
                        <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#f1f5f9' }}>{s.val}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>{s.label}</div>
                      </div>
                    ))}
                  </div>
                  {broadcastResult.failures?.length > 0 && (
                    <details style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                      <summary style={{ cursor: 'pointer', color: '#f87171', marginBottom: '8px' }}>View {broadcastResult.failures.length} failed deliveries</summary>
                      {broadcastResult.failures.map((f, i) => (
                        <div key={i} style={{ padding: '4px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                          <strong style={{ color: '#f87171' }}>{f.email}</strong>: {f.error}
                        </div>
                      ))}
                    </details>
                  )}
                </div>
              )}

            </div>
          )}

          {activeTab === 'ai' && (
            <div className="admin-ai-chat">
              <div className="chat-window">
                {aiChat.map((msg, i) => (
                  <div key={i} className={`chat-bubble ${msg.role}`}>
                    <div className="chat-avatar">{msg.role === 'ai' ? '🧠' : '👨‍💻'}</div>
                    <div className="chat-content" dangerouslySetInnerHTML={{__html: msg.content.replace(/\\n/g, '<br/>')}}></div>
                  </div>
                ))}
                {aiThinking && (
                  <div className="chat-bubble ai thinking">
                    <div className="chat-avatar">🧠</div>
                    <div className="chat-content">Analyzing parameters...</div>
                  </div>
                )}
              </div>
              <form className="chat-input-area" onSubmit={handleAiSubmit}>
                <input 
                  type="text" 
                  value={aiInput} 
                  onChange={e => setAiInput(e.target.value)} 
                  placeholder="Ask the AI to draft an email, analyze stats, or write queries..." 
                  className="admin-input"
                />
                <button type="submit" className="admin-btn-primary">Send</button>
              </form>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
