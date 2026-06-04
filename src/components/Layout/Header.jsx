import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { curriculum } from '../../../modules/learning/content_a2z';
import { openRazorpayCheckout } from '../../../modules/payment/payment';

export default function Header() {
  const { user, trial, logout, payAndUnlock, refreshTrial } = useAuth();
  const { appState, updateAppState } = useApp();
  const navigate = useNavigate();
  
  const [langOpen, setLangOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('dsaflow_theme') || 'dark';
    // Apply immediately on first render
    document.documentElement.setAttribute('data-theme', saved);
    return saved;
  });
  
  // Search state
  const [searchVal, setSearchVal] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  
  // Countdown Timer state
  const [timeLeft, setTimeLeft] = useState(0);

  const langRef = useRef(null);
  const avatarRef = useRef(null);
  const searchRef = useRef(null);

  // Sync trial duration on change
  useEffect(() => {
    if (trial && trial.isActive && !trial.isPaid) {
      setTimeLeft(trial.remaining);
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1000) {
            clearInterval(timer);
            refreshTrial();
            return 0;
          }
          return prev - 1000;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [trial]);

  // Click outside handlers
  useEffect(() => {
    function handleClickOutside(event) {
      if (langRef.current && !langRef.current.contains(event.target)) setLangOpen(false);
      if (avatarRef.current && !avatarRef.current.contains(event.target)) setAvatarOpen(false);
      if (searchRef.current && !searchRef.current.contains(event.target)) setDropdownVisible(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Search logic
  const handleSearchChange = (e) => {
    const q = e.target.value;
    setSearchVal(q);
    const queryClean = q.trim().toLowerCase();
    
    if (queryClean.length < 2) {
      setSearchResults([]);
      setDropdownVisible(false);
      return;
    }
    
    const results = curriculum.filter(t =>
      t.title.toLowerCase().includes(queryClean) || 
      t.category.toLowerCase().includes(queryClean) || 
      t.summary.toLowerCase().includes(queryClean)
    ).slice(0, 6);
    
    setSearchResults(results);
    setDropdownVisible(true);
  };

  const handleResultClick = (lessonId) => {
    setSearchVal('');
    setDropdownVisible(false);
    updateAppState({ activeLessonId: lessonId });
    navigate('/learn');
  };

  // Payment triggers
  const handleUpgrade = async () => {
    try {
      const paymentId = await openRazorpayCheckout(user);
      await payAndUnlock(paymentId);
    } catch (err) {
      alert(err.message || 'Payment cancelled.');
    }
  };

  // Theme toggle
  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('dsaflow_theme', nextTheme);
  };

  const formatCountdown = (ms) => {
    const h = Math.floor(ms / 3600000);
    const m = Math.floor((ms % 3600000) / 60000);
    const s = Math.floor((ms % 60000) / 1000);
    return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  };

  const labelsMap = { javascript: 'JS', cpp: 'C++', java: 'Java', python: 'Py' };
  const doneCount = appState.completedLessons.length;
  const progressPercent = curriculum.length ? Math.round((doneCount / curriculum.length) * 100) : 0;

  return (
    <header>
      <div className="logo" style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
        </svg>
        <span>dsaflow.app</span>
      </div>

      {/* Global Search */}
      <div ref={searchRef} className="global-search-wrapper">
        <div className="global-search">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input 
            type="text" 
            placeholder="Search topics, algorithms..." 
            value={searchVal} 
            onChange={handleSearchChange} 
            onFocus={() => { if (searchVal.trim().length >= 2) setDropdownVisible(true); }}
            autoComplete="off"
          />
        </div>
        {dropdownVisible && searchResults.length > 0 && (
          <div className="search-results-dropdown visible">
            {searchResults.map(t => (
              <div key={t.id} className="search-result-item" onClick={() => handleResultClick(t.id)}>
                <span style={{ fontSize: '1.3rem' }}>{t.icon}</span>
                <div>
                  <div className="search-result-title">{t.title}</div>
                  <div className="search-result-category">{t.category} • {t.difficulty}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="header-right">
        {/* Trial timer countdown */}
        {trial && trial.isActive && !trial.isPaid && (
          <div className="trial-timer-pill">
            <span>⏰</span>
            <span>{formatCountdown(timeLeft)} left</span>
            <button className="upgrade-inline-btn" onClick={handleUpgrade}>Upgrade ₹99</button>
          </div>
        )}

        {/* Overall Progress */}
        <div className="progress-pill">
          <span>Progress:</span>
          <span className="progress-val">{progressPercent}%</span>
        </div>

        {/* Language Picker */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600' }}>Practice in</span>
          <div 
            ref={langRef}
            className={`lang-selector-pill ${langOpen ? 'open' : ''}`} 
            onClick={() => setLangOpen(!langOpen)}
          >
            <span>{labelsMap[appState.selectedLanguage] || appState.selectedLanguage}</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="m6 9 6 6 6-6"/>
            </svg>
            
            <div className="lang-dropdown">
              {Object.keys(labelsMap).map(lang => (
                <div 
                  key={lang} 
                  className={`lang-option ${appState.selectedLanguage === lang ? 'active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    updateAppState({ selectedLanguage: lang });
                    setLangOpen(false);
                  }}
                >
                  {lang === 'javascript' ? '⚡ JavaScript' : lang === 'cpp' ? '⚙️ C++' : lang === 'java' ? '☕ Java' : '🐍 Python'}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Theme Toggle */}
        <button className="theme-toggle-btn" title="Toggle theme" onClick={toggleTheme}>
          {theme === 'dark' ? <span>🌙</span> : <span>☀️</span>}
        </button>

        {/* User Avatar */}
        <div 
          ref={avatarRef}
          className={`user-avatar-pill ${avatarOpen ? 'open' : ''}`}
          onClick={() => setAvatarOpen(!avatarOpen)}
        >
          <span id="user-initial">{user && user.name ? user.name[0].toUpperCase() : 'U'}</span>
          
          <div className="user-dropdown">
            <div className="user-info">
              <strong>{user?.name || 'User'}</strong>
              <small>{user?.email || ''}</small>
            </div>
            <hr style={{ borderColor: 'var(--border-glass)', margin: '6px 0' }} />
            <div className="user-dd-item" onClick={logout}>
              🚪 Sign Out
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
