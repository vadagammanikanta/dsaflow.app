import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { createSupportTicket } from '../../../modules/auth/auth.js';

const SUPPORT_EMAIL = 'dsaflow@outlook.com';

const FAQ = [
  {
    q: 'How do I unlock lifetime access?',
    a: 'Click "Upgrade" from the dashboard and complete the ₹99 payment via Razorpay. Access is activated instantly.'
  },
  {
    q: 'The compiler is not running my code — what do I do?',
    a: 'Make sure you selected the correct language from the dropdown. If it still fails, try refreshing and running again. For persistent issues, email us.'
  },
  {
    q: 'I paid but my account still shows trial mode.',
    a: 'This can happen if your browser lost session data. Sign out, sign back in, and your paid status should restore. If not, email us with your payment ID and we will manually activate it.'
  },
  {
    q: 'Can I access dsaflow.app on mobile?',
    a: 'Yes! dsaflow.app is fully responsive. The Online IDE and Visualizer work best on larger screens, but learning modules and roadmap work perfectly on mobile.'
  },
  {
    q: 'Which programming languages are supported in the IDE?',
    a: 'Python, JavaScript, C++, C, Java, Go, Rust, Ruby, PHP, Swift, Kotlin, C#. All are available in both the Online IDE and Coding Arena.'
  },
  {
    q: 'Is there a refund policy?',
    a: 'Since this is a one-time lifetime access fee of ₹99, refunds are evaluated case by case. Contact us at dsaflow@outlook.com within 7 days of payment.'
  },
  {
    q: 'How do I track my learning progress?',
    a: 'Your progress is automatically saved in the browser and synced to Firebase if you are signed in. The dashboard shows your completion percentage and streak.'
  },
  {
    q: 'Which companies\' interview patterns are covered?',
    a: 'dsaflow.app covers FAANG (Google, Amazon, Meta, Apple, Netflix), Microsoft, Flipkart, Razorpay, Swiggy, Zepto, and other top product companies.'
  }
];

export default function Support() {
  const { user } = useAuth();
  const [openFaq, setOpenFaq]   = useState(null);
  const [form, setForm]         = useState({ subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending]   = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);

    const ticketData = {
      name: user?.name || 'Anonymous User',
      email: user?.email || 'no-email@dsaflow.app',
      userId: user?.uid || 'anonymous',
      subject: form.subject,
      message: form.message
    };

    try {
      const success = await createSupportTicket(ticketData);
      setSending(false);
      if (success) {
        setSubmitted(true);
      } else {
        alert('Failed to submit support ticket. Please try again.');
      }
    } catch (err) {
      console.error('Support ticket submission error:', err);
      setSending(false);
      alert(`Failed to submit support ticket: ${err.message || err}`);
    }
  };

  return (
    <div className="support-page">
      {/* Hero */}
      <div className="support-hero">
        <div className="support-hero-icon">🛟</div>
        <h1>Support Center</h1>
        <p>We're here to help you succeed. Reach out anytime and we'll respond within 24 hours.</p>
      </div>

      {/* Contact Cards */}
      <div className="support-cards">
        <a href={`mailto:${SUPPORT_EMAIL}`} className="support-card primary">
          <div className="support-card-icon">✉️</div>
          <div className="support-card-body">
            <h3>Email Support</h3>
            <p>{SUPPORT_EMAIL}</p>
            <span className="support-card-badge">Response within 24h</span>
          </div>
          <div className="support-card-arrow">→</div>
        </a>

        <div className="support-card">
          <div className="support-card-icon">⏰</div>
          <div className="support-card-body">
            <h3>Support Hours</h3>
            <p>Mon – Sat, 9 AM – 9 PM IST</p>
            <span className="support-card-badge green">Currently Active</span>
          </div>
        </div>

        <div className="support-card">
          <div className="support-card-icon">⚡</div>
          <div className="support-card-body">
            <h3>Quick Help</h3>
            <p>Check the FAQ below for instant answers</p>
            <span className="support-card-badge">8 common questions</span>
          </div>
        </div>
      </div>

      <div className="support-grid">
        {/* FAQ */}
        <div className="support-faq">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-list">
            {FAQ.map((item, i) => (
              <div
                key={i}
                className={`faq-item ${openFaq === i ? 'open' : ''}`}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <div className="faq-question">
                  <span>{item.q}</span>
                  <span className="faq-chevron">{openFaq === i ? '▲' : '▼'}</span>
                </div>
                {openFaq === i && (
                  <div className="faq-answer">{item.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div className="support-form-wrap">
          <h2>Send us a Message</h2>
          {submitted ? (
            <div className="support-success">
              <div className="support-success-icon">✅</div>
              <h3>Message Sent!</h3>
              <p>Your support ticket has been recorded on our database and sent directly to the Admin Dashboard.</p>
              <p style={{ opacity: 0.6, fontSize: '0.85rem', marginTop: 8 }}>
                We will look into your request shortly. If urgent, feel free to email <a href={`mailto:${SUPPORT_EMAIL}`} style={{ color: 'var(--accent-cyan)' }}>{SUPPORT_EMAIL}</a>
              </p>
              <button className="btn btn-secondary" onClick={() => { setSubmitted(false); setForm({ subject: '', message: '' }); }} style={{ marginTop: 12 }}>
                Send Another
              </button>
            </div>
          ) : (
            <form className="support-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Subject</label>
                <select
                  value={form.subject}
                  onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                  required
                >
                  <option value="">Select a topic...</option>
                  <option value="Payment & Activation">Payment &amp; Activation</option>
                  <option value="Compiler Issue">Compiler Issue</option>
                  <option value="Account Problem">Account Problem</option>
                  <option value="Content / Curriculum">Content / Curriculum</option>
                  <option value="Refund Request">Refund Request</option>
                  <option value="General Feedback">General Feedback</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea
                  rows={5}
                  placeholder="Describe your issue or question in detail..."
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  required
                />
              </div>
              <button className="btn btn-accent" type="submit" disabled={sending} style={{ width: '100%' }}>
                {sending ? '⏳ Submitting Ticket...' : '📨 Send Support Ticket'}
              </button>
              <p className="support-form-note">
                This submits your issue directly to the admin team via the database.
              </p>
            </form>
          )}
        </div>
      </div>

      {/* Bottom Banner */}
      <div className="support-banner">
        <span>💡</span>
        <span>
          For urgent payment issues, email <a href={`mailto:${SUPPORT_EMAIL}?subject=[URGENT] Payment Issue`}>{SUPPORT_EMAIL}</a> with your Razorpay Payment ID and we'll activate your account manually within 2 hours.
        </span>
      </div>
    </div>
  );
}
