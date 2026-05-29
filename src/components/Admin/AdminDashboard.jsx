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
  const [emailSending, setEmailSending] = useState(false);

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
      const allTickets = await getSupportTickets();
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
      const success = await resolveSupportTicket(ticketId);
      if (success) {
        setActionStatus('Success: Ticket resolved!');
        const allTickets = await getSupportTickets();
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
          const allTickets = await getSupportTickets();
          setTickets(allTickets);
        } catch (e) {
          console.warn('Failed to reload tickets on tab change:', e);
        }
      };
      loadTickets();
    }
  }, [activeTab, isAuthenticated]);

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
    if (!window.confirm(`Broadcast email to ALL users? This action cannot be undone.`)) return;
    
    setEmailSending(true);
    setActionStatus('Sending broadcast...');
    try {
      const res = await fetch('/api/send-bulk-emails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: adminKey, subject: emailSubject, message: emailBody })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send bulk emails');
      
      setActionStatus(`Success: Sent ${data.sentCount} emails.`);
      setEmailSubject('');
      setEmailBody('');
    } catch (err) {
      setActionStatus(`Error: ${err.message}`);
    } finally {
      setEmailSending(false);
      setTimeout(() => setActionStatus(''), 5000);
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
                    const allTickets = await getSupportTickets();
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
              <div className="broadcast-card">
                <h3>Compose Mass Email</h3>
                <p className="broadcast-desc">This will send an email to all registered users via SMTP.</p>
                <form onSubmit={handleSendBulkEmail}>
                  <div className="form-group">
                    <label>Email Subject</label>
                    <input 
                      type="text" 
                      value={emailSubject} 
                      onChange={e => setEmailSubject(e.target.value)} 
                      placeholder="e.g. New AI Features Released!" 
                      className="admin-input"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Email HTML Body</label>
                    <textarea 
                      value={emailBody} 
                      onChange={e => setEmailBody(e.target.value)} 
                      placeholder="<p>Write your message here in HTML...</p>" 
                      className="admin-textarea"
                      rows={8}
                      required
                    />
                  </div>
                  <button type="submit" className="admin-btn-primary" disabled={emailSending}>
                    {emailSending ? 'Broadcasting...' : '🚀 Send Broadcast to All Users'}
                  </button>
                </form>
              </div>
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
