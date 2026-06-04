import React, { useState, useRef, useEffect, useCallback } from 'react';

/* ── Suggested Prompt Categories ── */
const PROMPT_CATEGORIES = [
  {
    icon: '🧠',
    label: 'Core DSA',
    color: 'cyan',
    prompts: [
      'Explain Two Sum using HashMap with code',
      'What is the difference between BFS and DFS?',
      'How does Binary Search work? Give me code.',
      'Explain Merge Sort with time complexity',
    ]
  },
  {
    icon: '⚡',
    label: 'Patterns',
    color: 'purple',
    prompts: [
      'Explain sliding window technique with an example',
      'When to use Two Pointers vs Sliding Window?',
      'Explain the fast & slow pointer pattern',
      'What is the monotonic stack pattern?',
    ]
  },
  {
    icon: '🏆',
    label: 'Placement Prep',
    color: 'amber',
    prompts: [
      'Top 5 array problems for FAANG interviews',
      'When to use Greedy vs Dynamic Programming?',
      'Explain Dijkstra\'s algorithm step by step',
      'How to detect a cycle in a Linked List?',
    ]
  },
  {
    icon: '🐛',
    label: 'Debug & Analyze',
    color: 'rose',
    prompts: [
      'What is the time complexity of QuickSort?',
      'How to analyze space complexity of recursion?',
      'Explain amortized analysis with an example',
      'What are common DP anti-patterns?',
    ]
  },
];

const ALL_PROMPTS = PROMPT_CATEGORIES.flatMap(c => c.prompts);

/* ── Copy to Clipboard Hook ── */
function useCopy() {
  const [copied, setCopied] = useState(false);
  const copy = useCallback((text) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);
  return [copied, copy];
}

/* ── Escape HTML ── */
const escapeHtml = (str) =>
  str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/* ── Format markdown-like content ── */
function formatContent(text) {
  // Code blocks
  text = text.replace(/```(\w+)?\n?([\s\S]*?)```/g, (_, lang, code) => {
    const safeCode = escapeHtml(code.trim());
    const langLabel = lang || 'code';
    return `<div class="ai-code-block"><div class="ai-code-header"><span class="ai-code-lang">${langLabel}</span><button class="ai-copy-code-btn" data-code="${encodeURIComponent(code.trim())}" title="Copy code">⧉ Copy</button></div><pre><code>${safeCode}</code></pre></div>`;
  });
  // Inline code
  text = text.replace(/`([^`]+)`/g, '<code class="ai-inline-code">$1</code>');
  // Bold
  text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  // Italic
  text = text.replace(/\*(.+?)\*/g, '<em>$1</em>');
  // Headers
  text = text.replace(/^### (.+)$/gm, '<h4 class="ai-msg-h4">$1</h4>');
  text = text.replace(/^## (.+)$/gm, '<h3 class="ai-msg-h3">$1</h3>');
  text = text.replace(/^# (.+)$/gm, '<h2 class="ai-msg-h2">$1</h2>');
  // Bullet lists
  text = text.replace(/^[\-\*] (.+)$/gm, '<li>$1</li>');
  text = text.replace(/(<li>.*<\/li>(\n)?)+/g, '<ul class="ai-msg-ul">$&</ul>');
  // Numbered lists
  text = text.replace(/^\d+\. (.+)$/gm, '<li class="ai-msg-li-num">$1</li>');
  // Horizontal rule
  text = text.replace(/^---$/gm, '<hr class="ai-msg-hr"/>');
  // Line breaks
  text = text.replace(/\n\n/g, '</p><p class="ai-msg-p">');
  text = text.replace(/\n/g, '<br/>');
  return `<p class="ai-msg-p">${text}</p>`;
}

/* ── Typing Indicator ── */
function TypingIndicator() {
  return (
    <div className="ai-message ai-message--bot">
      <div className="ai-message-avatar ai-avatar-bot">
        <span className="ai-bot-icon">✦</span>
      </div>
      <div className="ai-message-bubble ai-message-bubble--bot">
        <div className="ai-typing-dots">
          <span /><span /><span />
        </div>
        <span className="ai-typing-label">Thinking…</span>
      </div>
    </div>
  );
}

/* ── Code Block with Copy ── */
function MessageBubble({ msg }) {
  const isUser = msg.role === 'user';
  const [copied, copy] = useCopy();
  const bubbleRef = useRef(null);

  // Attach copy handlers to dynamically injected copy buttons
  useEffect(() => {
    if (!bubbleRef.current) return;
    const btns = bubbleRef.current.querySelectorAll('.ai-copy-code-btn');
    btns.forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const code = decodeURIComponent(btn.dataset.code);
        navigator.clipboard.writeText(code).catch(() => {});
        btn.textContent = '✓ Copied!';
        btn.classList.add('ai-copy-code-btn--copied');
        setTimeout(() => {
          btn.textContent = '⧉ Copy';
          btn.classList.remove('ai-copy-code-btn--copied');
        }, 2000);
      };
    });
  });

  return (
    <div className={`ai-message ${isUser ? 'ai-message--user' : 'ai-message--bot'}`}>
      {!isUser && (
        <div className="ai-message-avatar ai-avatar-bot">
          <span className="ai-bot-icon">✦</span>
        </div>
      )}
      <div className={`ai-message-bubble ${isUser ? 'ai-message-bubble--user' : 'ai-message-bubble--bot'}`}>
        {isUser ? (
          <p style={{ margin: 0 }}>{msg.content}</p>
        ) : (
          <div
            ref={bubbleRef}
            className="ai-message-content"
            dangerouslySetInnerHTML={{ __html: formatContent(msg.content) }}
          />
        )}
        {!isUser && (
          <div className="ai-message-actions">
            <button className={`ai-action-btn ${copied ? 'ai-action-btn--copied' : ''}`} onClick={() => copy(msg.content)} title="Copy response">
              {copied ? '✓' : '⧉'}
            </button>
          </div>
        )}
      </div>
      {isUser && (
        <div className="ai-message-avatar ai-avatar-user">
          <span>U</span>
        </div>
      )}
    </div>
  );
}

/* ── Stats Bar ── */
function StatsBar({ messageCount }) {
  return (
    <div className="ai-stats-bar">
      <div className="ai-stat">
        <span className="ai-stat-icon">💬</span>
        <span>{messageCount} messages</span>
      </div>
      <div className="ai-stat-divider" />
      <div className="ai-stat">
        <span className="ai-stat-icon">🔥</span>
        <span>Groq AI</span>
      </div>
      <div className="ai-stat-divider" />
      <div className="ai-stat">
        <span className="ai-stat-dot" />
        <span>Online · Free tier</span>
      </div>
    </div>
  );
}

/* ── Main Component ── */
export default function DsaFlowAI() {
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('dsaflow_ai_history');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [
      {
        role: 'assistant',
        content: `👋 Hey there! I'm **dsaflow.app AI** — your personal DSA tutor, powered by Groq.

I can help you with:
- 🧠 **Solving** any DSA problem with step-by-step explanations
- ⚡ **Explaining** algorithms, patterns, and data structures
- 🐛 **Debugging** your code and fixing edge cases
- 📊 **Analyzing** time & space complexity
- 🏆 **Preparing** for FAANG & placement interviews

Ask me anything about DSA — let's crack those placements! 🚀`
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('dsaflow_ai_history', JSON.stringify(messages));
  }, [messages]);

  const [customApiKey, setCustomApiKey] = useState(() => {
    return localStorage.getItem('dsaflow_custom_api_key') || '';
  });
  const [tempKey, setTempKey] = useState(() => {
    return localStorage.getItem('dsaflow_custom_api_key') || '';
  });
  const [isKeyActive, setIsKeyActive] = useState(() => {
    return !!localStorage.getItem('dsaflow_custom_api_key');
  });

  const handleActivateKey = () => {
    const key = tempKey.trim();
    if (!key) return;
    setCustomApiKey(key);
    setIsKeyActive(true);
    localStorage.setItem('dsaflow_custom_api_key', key);
    alert('Grok Unlimited AI Activated! 🎉');
  };

  const handleDeactivateKey = () => {
    setCustomApiKey('');
    setTempKey('');
    setIsKeyActive(false);
    localStorage.removeItem('dsaflow_custom_api_key');
  };

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const messagesRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Auto-resize textarea
  useEffect(() => {
    if (!inputRef.current) return;
    inputRef.current.style.height = 'auto';
    inputRef.current.style.height = Math.min(inputRef.current.scrollHeight, 160) + 'px';
  }, [input]);

  const sendMessage = async (text) => {
    const userText = (text || input).trim();
    if (!userText || loading) return;

    setInput('');
    const newMessages = [...messages, { role: 'user', content: userText }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const historyToSend = newMessages.slice(-20).map(m => ({
        role: m.role === 'assistant' ? 'assistant' : 'user',
        content: m.content
      }));

      let replyText = '';

      // Always route requests through the backend proxy to avoid client-side CORS errors
      const res = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: historyToSend,
          customApiKey: customApiKey.trim() || undefined
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to get response from AI.');
      replyText = data.reply;
      
      setMessages(prev => [...prev, { role: 'assistant', content: replyText }]);
    } catch (err) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `❌ **Error:** ${err.message}\n\nPlease check your connection and try again.`
      }]);
    } finally {
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([{
      role: 'assistant',
      content: `👋 Chat cleared! Ready for your next DSA question. What would you like to explore?`
    }]);
  };

  const userMsgCount = messages.filter(m => m.role === 'user').length;
  const isLimitReached = userMsgCount >= 10 && !isKeyActive;

  return (
    <div className="aipage-root">
      {/* Ambient Background */}
      <div className="aipage-ambient">
        <div className="aipage-orb aipage-orb--1" />
        <div className="aipage-orb aipage-orb--2" />
        <div className="aipage-orb aipage-orb--3" />
      </div>

      {/* Sidebar Overlay for mobile */}
      {sidebarOpen && <div className="aipage-overlay" onClick={() => setSidebarOpen(false)} />}

      {/* ── Sidebar ── */}
      <aside className={`aipage-sidebar ${sidebarOpen ? 'aipage-sidebar--open' : ''}`}>
        <div className="aisidebar-brand">
          <div className="aisidebar-logo">✦</div>
          <div>
            <div className="aisidebar-title">dsaflow.app AI</div>
            <div className="aisidebar-subtitle">DSA Tutor</div>
          </div>
        </div>

        <div className="aisidebar-section-label">Capabilities</div>
        {[
          { icon: '🧠', label: 'Algorithm Explanations', desc: 'Step-by-step breakdowns' },
          { icon: '💻', label: 'Code Generation', desc: 'Multi-language solutions' },
          { icon: '🐛', label: 'Debug Assistant', desc: 'Find & fix edge cases' },
          { icon: '📊', label: 'Complexity Analysis', desc: 'Big-O space & time' },
          { icon: '🗺️', label: 'Pattern Recognition', desc: 'Sliding window, DP, etc.' },
          { icon: '🏆', label: 'Interview Prep', desc: 'FAANG & placement focus' },
        ].map((cap, i) => (
          <div key={i} className="aisidebar-cap">
            <span className="aisidebar-cap-icon">{cap.icon}</span>
            <div>
              <div className="aisidebar-cap-label">{cap.label}</div>
              <div className="aisidebar-cap-desc">{cap.desc}</div>
            </div>
          </div>
        ))}

        {!isKeyActive && (
          <div className="aisidebar-model-card">
            <div className="aisidebar-model-badge">AI Model</div>
            <div className="aisidebar-model-name">Groq AI</div>
            <div className="aisidebar-model-meta">Powered by Groq API</div>
            <div className="aisidebar-model-bar">
              <div className="aisidebar-model-fill" style={{ width: `${Math.min((userMsgCount / 10) * 100, 100)}%` }} />
            </div>
            <div className="aisidebar-model-count">{userMsgCount} / 10 today</div>
          </div>
        )}

        {/* Bring Your Own Key Widget */}
        <div className="aisidebar-byok-card">
          <div className="byok-header">
            {isKeyActive ? '⚡ Groq Unlimited Active' : '🚀 Unlock Unlimited AI'}
          </div>
          
          {isKeyActive ? (
            <div style={{ textAlign: 'center', marginTop: '10px' }}>
              <div className="byok-desc" style={{ color: 'var(--accent-green)', fontWeight: '500', marginBottom: '12px' }}>
                🎉 Custom Groq key is active. Enjoy unlimited requests!
              </div>
              <div style={{ fontSize: '0.82rem', fontFamily: 'monospace', background: 'rgba(255,255,255,0.05)', padding: '6px 12px', borderRadius: '6px', color: 'var(--text-muted)', marginBottom: '14px', wordBreak: 'break-all' }}>
                {customApiKey.slice(0, 8)}••••••••••••••••
              </div>
              <button 
                className="btn btn-secondary" 
                style={{ width: '100%', padding: '6px 12px', fontSize: '0.8rem' }}
                onClick={handleDeactivateKey}
              >
                Deactivate / Change Key
              </button>
            </div>
          ) : (
            <>
              <div className="byok-desc">
                Enter your own Groq API key below to continue chatting for free and unlock unlimited requests.
              </div>
              <input 
                type="password" 
                className="byok-input" 
                placeholder="Paste gsk_..." 
                value={tempKey}
                onChange={(e) => setTempKey(e.target.value)}
                style={{ marginBottom: '10px' }}
              />
              
              {tempKey.trim().length > 0 && (
                <button
                  className="btn btn-primary"
                  style={{ width: '100%', marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '8px 12px', fontSize: '0.85rem' }}
                  onClick={handleActivateKey}
                >
                  🚀 Activate Key
                </button>
              )}

              <div className="byok-footer">
                Stored securely in your browser. <br/>
                <a href="https://console.groq.com" target="_blank" rel="noreferrer" style={{ color: 'var(--accent-cyan)' }}>Get a free key here</a>
              </div>
            </>
          )}
        </div>

        <button className="aisidebar-clear-btn" onClick={clearChat}>
          🗑️ Clear Conversation
        </button>
      </aside>

      {/* ── Main Chat Panel ── */}
      <main className="aipage-main">

        {/* ── Top Header Bar ── */}
        <div className="ai-topbar">
          <button className="ai-topbar-menu" onClick={() => setSidebarOpen(s => !s)} title="Toggle sidebar">
            ☰
          </button>
          <div className="ai-topbar-center">
            <div className="ai-topbar-avatar">✦</div>
            <div>
              <div className="ai-topbar-name">dsaflow.app AI</div>
              <div className="ai-topbar-status">
                <span className="ai-status-dot" />
                Online · Groq AI
              </div>
            </div>
          </div>
          <button className="ai-topbar-clear" onClick={clearChat} title="Clear chat">
            🗑️
          </button>
        </div>

        {/* ── Welcome Banner (shows only at start) ── */}
        {messages.length <= 1 && (
          <div className="ai-welcome-banner">
            <div className="ai-welcome-glyph">✦</div>
            <h2 className="ai-welcome-heading">Your Personal DSA Tutor</h2>
            <p className="ai-welcome-sub">Powered by Groq · Specialized in algorithms, data structures & placement prep</p>
            <StatsBar messageCount={messages.length} />
          </div>
        )}

        {/* ── Category Tabs + Suggestions (only at start) ── */}
        {messages.length <= 1 && (
          <div className="ai-prompt-section">
            <div className="ai-category-tabs">
              {PROMPT_CATEGORIES.map((cat, i) => (
                <button
                  key={i}
                  className={`ai-cat-tab ai-cat-tab--${cat.color} ${activeCategory === i ? 'ai-cat-tab--active' : ''}`}
                  onClick={() => setActiveCategory(i)}
                >
                  {cat.icon} {cat.label}
                </button>
              ))}
            </div>
            <div className="ai-suggestions-grid">
              {PROMPT_CATEGORIES[activeCategory].prompts.map((prompt, i) => (
                <button
                  key={i}
                  className={`ai-suggestion-chip ai-suggestion-chip--${PROMPT_CATEGORIES[activeCategory].color}`}
                  onClick={() => sendMessage(prompt)}
                >
                  <span className="ai-chip-arrow">→</span>
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Messages ── */}
        <div className="ai-chat-messages" ref={messagesRef}>
          {messages.map((msg, i) => (
            <MessageBubble key={i} msg={msg} />
          ))}
          {loading && <TypingIndicator />}
          <div ref={bottomRef} />
        </div>

        {/* ── Input Area ── */}
        <div className="ai-input-area">
          <div className="ai-input-wrapper">
            <div className="ai-input-inner">
              <textarea
                ref={inputRef}
                className="ai-input-textarea"
                placeholder={isLimitReached ? "Daily limit reached. Add your API key in the sidebar to continue." : "Ask about any DSA topic, problem, or algorithm…"}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
                disabled={loading || isLimitReached}
              />
            </div>
            <div className="ai-input-actions">
              <div className="ai-input-char-count">{input.length > 0 ? `${input.length} chars` : ''}</div>
              <button
                className={`ai-send-btn ${(!input.trim() || loading || isLimitReached) ? 'ai-send-btn--disabled' : 'ai-send-btn--active'}`}
                onClick={() => sendMessage()}
                disabled={!input.trim() || loading || isLimitReached}
                title="Send message (Enter)"
              >
                {loading ? (
                  <span className="ai-send-spinner" />
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"/>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                  </svg>
                )}
              </button>
            </div>
          </div>
          <div className="ai-input-footer">
            <span>⏎ Enter to send · Shift+Enter for new line</span>
            <span>Specialized in DSA · algorithms · placement prep</span>
          </div>
        </div>
      </main>
    </div>
  );
}
