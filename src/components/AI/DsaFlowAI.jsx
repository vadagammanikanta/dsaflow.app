import React, { useState, useRef, useEffect } from 'react';

const SUGGESTED_PROMPTS = [
  "Explain Two Sum using HashMap approach with code",
  "What is the difference between BFS and DFS?",
  "How do I solve Longest Common Subsequence with DP?",
  "Explain sliding window technique with an example",
  "What is the time complexity of QuickSort?",
  "How to detect a cycle in a Linked List?",
  "Explain Dijkstra's algorithm step by step",
  "When to use Greedy vs Dynamic Programming?",
];

function TypingIndicator() {
  return (
    <div className="ai-message ai-message--bot">
      <div className="ai-message-avatar">✨</div>
      <div className="ai-message-bubble ai-message-bubble--bot">
        <div className="ai-typing-dots">
          <span /><span /><span />
        </div>
      </div>
    </div>
  );
}

function MessageBubble({ msg }) {
  const isUser = msg.role === 'user';

  // Render markdown-like formatting for bot responses
  const formatContent = (text) => {
    // Code blocks
    text = text.replace(/```(\w+)?\n?([\s\S]*?)```/g, (_, lang, code) => {
      return `<div class="ai-code-block"><div class="ai-code-lang">${lang || 'code'}</div><pre><code>${escapeHtml(code.trim())}</code></pre></div>`;
    });
    // Inline code
    text = text.replace(/`([^`]+)`/g, '<code class="ai-inline-code">$1</code>');
    // Bold
    text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    // Headers
    text = text.replace(/^### (.+)$/gm, '<h4 class="ai-msg-h4">$1</h4>');
    text = text.replace(/^## (.+)$/gm, '<h3 class="ai-msg-h3">$1</h3>');
    // Bullet lists
    text = text.replace(/^\- (.+)$/gm, '<li>$1</li>');
    text = text.replace(/(<li>.*<\/li>(\n)?)+/g, '<ul class="ai-msg-ul">$&</ul>');
    // Numbered lists
    text = text.replace(/^\d+\. (.+)$/gm, '<li>$1</li>');
    // Line breaks
    text = text.replace(/\n\n/g, '</p><p class="ai-msg-p">');
    text = text.replace(/\n/g, '<br/>');
    return `<p class="ai-msg-p">${text}</p>`;
  };

  const escapeHtml = (str) =>
    str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  return (
    <div className={`ai-message ${isUser ? 'ai-message--user' : 'ai-message--bot'}`}>
      {!isUser && <div className="ai-message-avatar">✨</div>}
      <div className={`ai-message-bubble ${isUser ? 'ai-message-bubble--user' : 'ai-message-bubble--bot'}`}>
        {isUser ? (
          <p style={{ margin: 0 }}>{msg.content}</p>
        ) : (
          <div
            className="ai-message-content"
            dangerouslySetInnerHTML={{ __html: formatContent(msg.content) }}
          />
        )}
      </div>
      {isUser && <div className="ai-message-avatar ai-message-avatar--user">👤</div>}
    </div>
  );
}

export default function DsaFlowAI() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `👋 Hey there! I'm **dsa.flow AI** — your personal DSA tutor, powered by Llama 3.3 70B.

I can help you with:
- 🧠 **Solving** any DSA problem with step-by-step explanations
- ⚡ **Explaining** algorithms, patterns, and data structures
- 🐛 **Debugging** your code and fixing edge cases
- 📊 **Analyzing** time & space complexity

Ask me anything about DSA — let's crack those placements! 🚀`
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const sendMessage = async (text) => {
    const userText = (text || input).trim();
    if (!userText || loading) return;

    setInput('');
    setError('');

    const newMessages = [...messages, { role: 'user', content: userText }];
    setMessages(newMessages);
    setLoading(true);

    try {
      // Only send last 20 messages to stay within token limits
      const historyToSend = newMessages.slice(-20).map(m => ({
        role: m.role === 'assistant' ? 'assistant' : 'user',
        content: m.content
      }));

      const res = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: historyToSend })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to get response from AI.');
      }

      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (err) {
      setError(err.message);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `❌ Sorry, I ran into an error: *${err.message}*. Please try again in a moment.`
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
      content: `👋 Hey there! I'm **dsa.flow AI** — your personal DSA tutor, powered by Llama 3.3 70B.\n\nAsk me anything about DSA — let's crack those placements! 🚀`
    }]);
    setError('');
  };

  return (
    <div className="ai-page-container">
      <div className="ai-glow-orb" />

      {/* Header */}
      <div className="ai-chat-header">
        <div className="ai-chat-header-left">
          <div className="ai-chat-avatar-lg">✨</div>
          <div>
            <h1 className="ai-chat-title">dsa.flow AI</h1>
            <div className="ai-chat-status">
              <span className="ai-status-dot" />
              Powered by Llama 3.3 70B • 14,400 req/day free
            </div>
          </div>
        </div>
        <button className="ai-clear-btn" onClick={clearChat} title="Clear chat">
          🗑️ Clear
        </button>
      </div>

      {/* Suggested Prompts — shown only at start */}
      {messages.length <= 1 && (
        <div className="ai-suggestions">
          <p className="ai-suggestions-label">Try asking:</p>
          <div className="ai-suggestions-grid">
            {SUGGESTED_PROMPTS.map((prompt, i) => (
              <button
                key={i}
                className="ai-suggestion-chip"
                onClick={() => sendMessage(prompt)}
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Chat Messages */}
      <div className="ai-chat-messages">
        {messages.map((msg, i) => (
          <MessageBubble key={i} msg={msg} />
        ))}
        {loading && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>

      {/* Input Box */}
      <div className="ai-chat-input-area">
        <div className="ai-chat-input-wrapper">
          <textarea
            ref={inputRef}
            className="ai-chat-input"
            placeholder="Ask me about any DSA topic, problem, or algorithm… (Enter to send)"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            disabled={loading}
          />
          <button
            className={`ai-send-btn ${(!input.trim() || loading) ? 'ai-send-btn--disabled' : ''}`}
            onClick={() => sendMessage()}
            disabled={!input.trim() || loading}
            title="Send message"
          >
            {loading ? '⏳' : '➤'}
          </button>
        </div>
        <p className="ai-input-hint">
          Shift+Enter for new line • Specialized in DSA, algorithms & placement prep
        </p>
      </div>
    </div>
  );
}
