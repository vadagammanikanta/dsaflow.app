import React, { useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { curriculum } from '../../../modules/learning/content_a2z';
import ShareCard from '../Layout/ShareCard';
import { getTodayPOTD, BADGES, getWeekKey } from '../../context/AppContext';

const QUOTES = [
  { text: "An algorithm must be seen to be believed.", author: "Donald Knuth" },
  { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
  { text: "Every expert was once a beginner. Start today.", author: "dsaflow.app" },
  { text: "The best time to learn DSA was yesterday. The second best time is NOW.", author: "dsaflow.app" },
  { text: "Clean code always looks like it was written by someone who cares.", author: "Robert C. Martin" },
  { text: "Consistency beats talent every single time. Code daily.", author: "dsaflow.app" },
  { text: "Solving one LeetCode problem a day keeps unemployment away.", author: "dsaflow.app" },
  { text: "Hard problems only feel impossible before you solve them.", author: "dsaflow.app" },
  { text: "FAANG or not — DSA mastery opens every door.", author: "dsaflow.app" },
  { text: "DP is just recursion with a memory. So is learning.", author: "dsaflow.app" },
];
const todayQuote = QUOTES[new Date().getDate() % QUOTES.length];

const STREAK_MILESTONES = [3, 7, 14, 30];

function usePOTDCountdown() {
  const [secs, setSecs] = useState(() => {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0);
    return Math.floor((midnight - now) / 1000);
  });
  useEffect(() => {
    const t = setInterval(() => setSecs(s => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, []);
  const h = String(Math.floor(secs / 3600)).padStart(2, '0');
  const m = String(Math.floor((secs % 3600) / 60)).padStart(2, '0');
  const s = String(secs % 60).padStart(2, '0');
  return `${h}:${m}:${s}`;
}

export default function Dashboard() {
  const { appState, updateAppState, setInterviewDate, interviewDaysLeft, markPOTDSolved, clearNewBadges } = useApp();
  const { trial, user } = useAuth();
  const navigate = useNavigate();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [pickedDate, setPickedDate] = useState(appState.interviewDate || '');
  const [shareCard, setShareCard] = useState(null);
  const [badgeToast, setBadgeToast] = useState(null);
  const [sharedMilestones] = useState(() => {
    try { return JSON.parse(localStorage.getItem('dsaflow_shared_milestones') || '[]'); } catch { return []; }
  });
  const [notifAsked, setNotifAsked] = useState(() => localStorage.getItem('dsaflow_notif_asked') === '1');

  const potdCountdown = usePOTDCountdown();
  const todayPOTD = getTodayPOTD();
  const todayKey = new Date().toISOString().slice(0, 10);
  const potdSolvedToday = appState.potdSolved?.[todayKey] === todayPOTD.id;
  const currentWeekKey = getWeekKey();
  const currentWeeklyScore = appState.weeklyScores?.[currentWeekKey] || { problems: 0, modules: 0, streak: 0 };

  // Badge toast
  useEffect(() => {
    if (appState.newBadges?.length > 0) {
      const badgeId = appState.newBadges[0];
      const badge = BADGES.find(b => b.id === badgeId);
      if (badge) {
        setBadgeToast(badge);
        setTimeout(() => { setBadgeToast(null); clearNewBadges(); }, 5000);
      }
    }
  }, [appState.newBadges]);

  // Push notification permission prompt (after day 2)
  useEffect(() => {
    if (!notifAsked && (appState.dayStreak || 0) >= 2 && 'Notification' in window && Notification.permission === 'default') {
      setTimeout(() => {
        Notification.requestPermission().then(perm => {
          if (perm === 'granted') {
            updateAppState({ notifEnabled: true });
            new Notification('dsaflow.app 🔥', { body: `You have a ${appState.dayStreak}-day streak! Keep it going!`, icon: '/favicon.ico' });
          }
          localStorage.setItem('dsaflow_notif_asked', '1');
          setNotifAsked(true);
        });
      }, 3000);
    }
  }, []);

  // Streak reminder push notification on load
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'granted') {
      const todayKey = new Date().toISOString().slice(0, 10);
      const potdSolvedToday = appState.potdSolved?.[todayKey];
      if (!potdSolvedToday) {
        setTimeout(() => {
          new Notification('dsaflow.app 🔥', {
            body: `Don't lose your ${appState.dayStreak || 1}-day streak! Solve today's Problem of the Day now! ⚡`,
            icon: '/favicon.ico'
          });
        }, 4000);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredLessons = useMemo(() => curriculum.filter(l =>
    appState.activeDifficulty === 'all' ||
    (l.difficulty && l.difficulty.toLowerCase() === appState.activeDifficulty.toLowerCase())
  ), [appState.activeDifficulty]);

  const handleCardClick = (lessonId) => { updateAppState({ activeLessonId: lessonId }); navigate('/learn'); };
  const isPremium = trial?.isPaid;
  const completedCount = appState.completedLessons.length;
  const nextLesson = curriculum.find(l => !appState.completedLessons.includes(l.id)) || curriculum[0];
  const progressPercent = curriculum.length ? ((completedCount / curriculum.length) * 100).toFixed(1) : 0;
  const dayStreak = appState.dayStreak || 1;
  const problemsSolved = Object.values(appState.patternProgress || {}).reduce((t, p) => t + (p.done?.length || 0), 0);
  const countdownLabel = interviewDaysLeft === null ? null : interviewDaysLeft === 0 ? '🎯 Interview Day!' : `⏳ ${interviewDaysLeft} days left`;
  const modulesPerDayNeeded = interviewDaysLeft && interviewDaysLeft > 0 ? Math.ceil((curriculum.length - completedCount) / interviewDaysLeft) : null;
  const earnedBadges = BADGES.filter(b => (appState.earnedBadges || []).includes(b.id));

  const showStreakMilestone = () => {
    const milestone = STREAK_MILESTONES.find(m => dayStreak >= m && !sharedMilestones.includes(`streak-${m}`));
    if (milestone) {
      const updated = [...sharedMilestones, `streak-${milestone}`];
      localStorage.setItem('dsaflow_shared_milestones', JSON.stringify(updated));
      setShareCard({ type: 'streak', value: milestone });
    }
  };

  const handleSaveDate = () => { if (pickedDate) { setInterviewDate(pickedDate); setShowDatePicker(false); } };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(`🔥 I've completed ${completedCount} of ${curriculum.length} DSA modules on dsaflow.app with a ${dayStreak}-day streak! 💪\n\nJoin me and crack your placements too → https://dsaflow.app`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const referralCode = user?.uid ? user.uid.slice(0, 8).toUpperCase() : 'INVITE';
  const referralLink = `https://dsaflow.app?ref=${referralCode}`;
  const handleCopyReferral = () => {
    navigator.clipboard.writeText(referralLink);
    const btn = document.getElementById('referral-copy-btn');
    if (btn) { btn.textContent = '✅ Copied!'; setTimeout(() => { btn.textContent = '📋 Copy Link'; }, 2000); }
  };

  const diffColors = { Easy: '#10b981', Medium: '#f59e0b', Hard: '#f43f5e' };

  return (
    <section className="tab-pane active" id="dashboard" style={{ display: 'grid', gap: '20px', position: 'relative' }}>

      {/* Badge Toast */}
      {badgeToast && (
        <div style={{
          position: 'fixed', top: '80px', right: '24px', zIndex: 99999,
          background: 'linear-gradient(135deg, #0d1117, #161b27)',
          border: `1px solid ${badgeToast.color}50`,
          borderRadius: '16px', padding: '16px 20px',
          display: 'flex', alignItems: 'center', gap: '14px',
          boxShadow: `0 0 40px ${badgeToast.color}40, 0 8px 32px rgba(0,0,0,0.5)`,
          animation: 'slideInRight 0.4s cubic-bezier(0.34,1.56,0.64,1)',
          maxWidth: '320px',
        }}>
          <div style={{ fontSize: '2.2rem', lineHeight: 1 }}>{badgeToast.icon}</div>
          <div>
            <p style={{ margin: 0, fontWeight: 800, color: badgeToast.color, fontSize: '0.9rem' }}>Badge Unlocked!</p>
            <p style={{ margin: '2px 0 0', color: '#f1f5f9', fontWeight: 700, fontSize: '1rem' }}>{badgeToast.name}</p>
            <p style={{ margin: '2px 0 0', color: '#64748b', fontSize: '0.75rem' }}>{badgeToast.desc}</p>
          </div>
        </div>
      )}

      {/* Share Achievement Card Modal */}
      {shareCard && (
        <ShareCard type={shareCard.type} value={shareCard.value} userName={user?.name || user?.displayName || ''} onClose={() => setShareCard(null)} />
      )}

      {/* Welcome Hero Banner */}
      <div className="card welcome-hero">
        <div className="hero-badge">
          🚀 {isPremium ? 'Premium Account Active' : 'Placement Ready • Free Trial Active'}
        </div>
        <h1>Master DSA with <span className="gradient-text">dsaflow.app</span></h1>
        <p className="hero-quote" style={{ fontSize: '0.87rem', color: 'var(--text-muted)', fontStyle: 'italic', marginBottom: '16px' }}>
          "{todayQuote.text}" — <strong style={{ fontStyle: 'normal' }}>{todayQuote.author}</strong>
        </p>
        <p>The most comprehensive, interactive DSA platform built for cracking FAANG, product-based &amp; service-based company interviews.</p>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '16px' }}>
          <button className="btn btn-accent" onClick={() => navigate('/roadmap')}>🗺️ Roadmap</button>
          <button className="btn btn-primary" onClick={() => navigate('/learn')}>📖 Learn</button>
          <button className="btn btn-secondary" onClick={() => navigate('/patterns')}>🧩 Patterns</button>
          <button className="btn btn-secondary" onClick={() => navigate('/planner')}>📅 Planner</button>
          <button className="btn btn-secondary" onClick={() => navigate('/leaderboard')}>🏆 Leaderboard</button>
          <button className="btn" style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)', color: '#fff', border: 'none' }} onClick={handleWhatsAppShare}>📤 Share</button>
        </div>
      </div>

      {/* ── Daily Problem of the Day ── */}
      <div className="card" style={{
        background: 'linear-gradient(135deg, rgba(251,191,36,0.06), rgba(249,115,22,0.04))',
        border: potdSolvedToday ? '1px solid rgba(16,185,129,0.4)' : '1px solid rgba(251,191,36,0.3)',
        borderRadius: '16px', padding: '20px 24px',
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ flex: 1, minWidth: '220px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span style={{ fontSize: '1.1rem' }}>⚡</span>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#fbbf24', textTransform: 'uppercase', letterSpacing: '0.8px' }}>Daily Problem of the Day</span>
              {appState.potdStreak > 0 && (
                <span style={{ fontSize: '0.68rem', background: 'rgba(249,115,22,0.15)', color: '#fb923c', padding: '2px 8px', borderRadius: '99px', fontWeight: 600 }}>
                  🔥 {appState.potdStreak}-day POTD streak
                </span>
              )}
            </div>
            <h3 style={{ margin: '0 0 6px', fontSize: '1.1rem', color: '#f1f5f9', fontWeight: 800 }}>{todayPOTD.title}</h3>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '10px' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 600, color: diffColors[todayPOTD.difficulty], background: `${diffColors[todayPOTD.difficulty]}18`, padding: '2px 8px', borderRadius: '99px', border: `1px solid ${diffColors[todayPOTD.difficulty]}30` }}>
                {todayPOTD.difficulty}
              </span>
              <span style={{ fontSize: '0.72rem', color: '#a78bfa', background: 'rgba(124,77,255,0.1)', padding: '2px 8px', borderRadius: '99px' }}>
                {todayPOTD.pattern}
              </span>
              {todayPOTD.companies.slice(0, 2).map(c => (
                <span key={c} style={{ fontSize: '0.68rem', color: '#94a3b8', background: 'rgba(255,255,255,0.04)', padding: '2px 8px', borderRadius: '99px', border: '1px solid rgba(255,255,255,0.06)' }}>{c}</span>
              ))}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#475569' }}>
              ⏰ Resets in: <span style={{ fontFamily: 'monospace', color: '#fbbf24', fontWeight: 700 }}>{potdCountdown}</span>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-end' }}>
            {potdSolvedToday ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                <span style={{ fontSize: '2rem' }}>✅</span>
                <span style={{ fontSize: '0.72rem', color: '#10b981', fontWeight: 700 }}>Solved Today!</span>
              </div>
            ) : (
              <>
                <a href={todayPOTD.link} target="_blank" rel="noreferrer" className="btn btn-accent" style={{ textDecoration: 'none', fontSize: '0.85rem', padding: '10px 18px', whiteSpace: 'nowrap' }}>
                  Solve on LeetCode →
                </a>
                <button
                  className="btn btn-secondary"
                  style={{ fontSize: '0.78rem', padding: '6px 14px' }}
                  onClick={() => markPOTDSolved(todayPOTD.id)}
                >
                  ✓ Mark as Solved
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ── Weekly Progress Report Card ── */}
      <div className="card" style={{
        background: 'linear-gradient(135deg, rgba(124,77,255,0.06), rgba(6,182,212,0.04))',
        border: '1px solid rgba(124,77,255,0.25)',
        borderRadius: '16px', padding: '20px 24px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span style={{ fontSize: '1.2rem' }}>📊</span>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#a78bfa', textTransform: 'uppercase', letterSpacing: '0.8px' }}>Weekly Progress Report</span>
            </div>
            <h3 style={{ margin: '0 0 8px', fontSize: '1.1rem', color: '#f1f5f9', fontWeight: 800 }}>Weekly Summary ({currentWeekKey})</h3>
            <p style={{ margin: '0 0 16px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Track your weekly targets. Share your progress to stay motivated!
            </p>
            {/* Weekly Stats Sub-row */}
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Problems Solved</span>
                <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>{currentWeeklyScore.problems}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Modules Completed</span>
                <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#a78bfa' }}>{currentWeeklyScore.modules}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Weekly Max Streak</span>
                <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#f59e0b' }}>{Math.max(currentWeeklyScore.streak, appState.dayStreak || 0)}🔥</span>
              </div>
            </div>
          </div>
          <div>
            <button
              className="btn btn-accent"
              style={{ fontSize: '0.85rem', padding: '10px 18px', display: 'flex', alignItems: 'center', gap: '6px' }}
              onClick={() => setShareCard({
                type: 'weekly',
                value: {
                  problems: currentWeeklyScore.problems,
                  modules: currentWeeklyScore.modules,
                  streak: Math.max(currentWeeklyScore.streak, appState.dayStreak || 0)
                }
              })}
            >
              📤 Share Report
            </button>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="progress-stats-row">
        <div className="progress-stat-card">
          <div className="stat-header"><span className="stat-icon">📚</span><span className="stat-title">Modules Done</span></div>
          <div className="stat-value">{completedCount} <span className="stat-total">/ {curriculum.length}</span></div>
          <div className="thin-progress-bar"><div className="thin-progress-fill" style={{ width: `${progressPercent}%` }}></div></div>
        </div>

        <div className="progress-stat-card" style={{ cursor: dayStreak >= 3 ? 'pointer' : 'default' }} onClick={dayStreak >= 3 ? showStreakMilestone : undefined} title={dayStreak >= 3 ? 'Click to share your streak!' : ''}>
          <div className="stat-header">
            <span className="stat-icon">🔥</span>
            <span className="stat-title">Day Streak</span>
            {dayStreak >= 3 && <span style={{ fontSize: '0.62rem', color: 'var(--accent-cyan)', marginLeft: 'auto' }}>tap to share</span>}
          </div>
          <div className="stat-value" style={{ color: dayStreak >= 7 ? 'var(--accent-amber)' : undefined }}>
            {dayStreak}
            {dayStreak >= 3 && <span style={{ fontSize: '0.65rem', marginLeft: '6px', color: 'var(--accent-amber)' }}>{dayStreak >= 30 ? '🏆' : dayStreak >= 7 ? '⚡' : '🔥'}</span>}
          </div>
          <div className="stat-action" style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            {dayStreak === 1 ? 'Come back tomorrow!' : `${dayStreak} days in a row 💪`}
          </div>
        </div>

        <div className="progress-stat-card">
          <div className="stat-header"><span className="stat-icon">💻</span><span className="stat-title">Problems Solved</span></div>
          <div className="stat-value">{problemsSolved}</div>
          <div className="stat-action" onClick={() => navigate('/patterns')} style={{ cursor: 'pointer', fontSize: '0.72rem', color: 'var(--accent-cyan)', marginTop: '4px' }}>Mark solved in Patterns ↗</div>
        </div>

        <div className="progress-stat-card">
          <div className="stat-header"><span className="stat-icon">🎯</span><span className="stat-title">Interview In</span></div>
          {appState.interviewDate ? (
            <>
              <div className="stat-value" style={{ fontSize: '1.3rem', color: interviewDaysLeft === 0 ? 'var(--accent-rose)' : 'var(--accent-cyan)' }}>{countdownLabel}</div>
              {modulesPerDayNeeded !== null && modulesPerDayNeeded > 0 && <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>Do {modulesPerDayNeeded} module{modulesPerDayNeeded > 1 ? 's' : ''}/day</div>}
              <button className="btn btn-secondary stat-btn" style={{ padding: '3px 8px', fontSize: '0.7rem', marginTop: '6px' }} onClick={() => setShowDatePicker(true)}>Change date</button>
            </>
          ) : (
            <>
              <div className="stat-value" style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>Not set</div>
              <button className="btn btn-secondary stat-btn" style={{ padding: '4px 10px', fontSize: '0.75rem', marginTop: '6px' }} onClick={() => setShowDatePicker(true)}>Set date 📅</button>
            </>
          )}
        </div>
      </div>

      {/* ── Badges ── */}
      {earnedBadges.length > 0 && (
        <div className="card" style={{ padding: '20px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>🏅 My Badges <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 400 }}>({earnedBadges.length}/{BADGES.length} earned)</span></h3>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {BADGES.map(badge => {
              const earned = (appState.earnedBadges || []).includes(badge.id);
              return (
                <div key={badge.id} title={`${badge.name}: ${badge.desc}`} style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
                  padding: '10px 12px', borderRadius: '12px', width: '72px',
                  background: earned ? `${badge.color}12` : 'rgba(255,255,255,0.02)',
                  border: `1px solid ${earned ? badge.color + '40' : 'rgba(255,255,255,0.06)'}`,
                  opacity: earned ? 1 : 0.3, transition: 'all 0.2s', cursor: 'default',
                }}>
                  <span style={{ fontSize: '1.5rem', filter: earned ? 'none' : 'grayscale(1)' }}>{badge.icon}</span>
                  <span style={{ fontSize: '0.6rem', color: earned ? badge.color : 'var(--text-muted)', fontWeight: 600, textAlign: 'center', lineHeight: 1.2 }}>{badge.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Interview Date Picker Modal */}
      {showDatePicker && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setShowDatePicker(false)}>
          <div className="card" style={{ padding: '28px 32px', maxWidth: '340px', width: '90%', textAlign: 'center' }} onClick={e => e.stopPropagation()}>
            <div style={{ fontSize: '2rem', marginBottom: '12px' }}>📅</div>
            <h3 style={{ marginBottom: '8px' }}>When is your interview?</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '20px' }}>We'll show you a daily module target to be ready on time.</p>
            <input type="date" value={pickedDate} min={new Date().toISOString().slice(0, 10)} onChange={e => setPickedDate(e.target.value)} style={{ background: 'var(--bg-input)', border: '1px solid var(--border-glass)', borderRadius: '8px', padding: '10px 14px', color: 'var(--text-primary)', fontSize: '1rem', width: '100%', fontFamily: 'var(--font-main)', marginBottom: '16px', outline: 'none' }} />
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button className="btn btn-secondary" onClick={() => setShowDatePicker(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSaveDate} disabled={!pickedDate}>Save</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Invite Friends Card ── */}
      <div className="card" style={{ background: 'linear-gradient(135deg, rgba(124,77,255,0.08), rgba(6,182,212,0.06))', border: '1px solid rgba(124,77,255,0.25)', borderRadius: '16px', padding: '22px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ flex: 1, minWidth: '220px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
            <span style={{ fontSize: '1.6rem' }}>🎁</span>
            <div>
              <h3 style={{ margin: 0, fontSize: '1rem', color: '#f1f5f9', fontWeight: 700 }}>Invite Friends — Earn Rewards!</h3>
              <p style={{ margin: '2px 0 0', fontSize: '0.8rem', color: '#94a3b8' }}>Share your link. When a friend joins, you both win!</p>
            </div>
          </div>
          <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '8px', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', border: '1px solid rgba(124,77,255,0.2)', marginTop: '10px' }}>
            <span style={{ color: '#94a3b8', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{referralLink}</span>
            <button id="referral-copy-btn" onClick={handleCopyReferral} style={{ background: 'rgba(124,77,255,0.2)', border: '1px solid rgba(124,77,255,0.3)', color: '#c4b5fd', borderRadius: '6px', padding: '4px 10px', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}>📋 Copy Link</button>
          </div>
        </div>
        <a href={`https://wa.me/?text=${encodeURIComponent(`🚀 Hey! Join dsaflow.app — India's best DSA platform for placements! Start FREE → ${referralLink}`)}`} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'linear-gradient(135deg, #25D366, #128C7E)', color: '#fff', fontWeight: 700, fontSize: '0.82rem', padding: '10px 16px', borderRadius: '10px', textDecoration: 'none', whiteSpace: 'nowrap' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
          WhatsApp Invite
        </a>
      </div>

      {/* Continue Learning */}
      <div className="continue-learning-card card" onClick={() => handleCardClick(nextLesson.id)}>
        <div className="continue-content">
          <span className="continue-label">{completedCount === 0 ? 'START LEARNING' : 'CONTINUE LEARNING'}</span>
          <h3 className="continue-title">{nextLesson.title}</h3>
          <p className="continue-meta">{nextLesson.category} • {nextLesson.readTime || '5 mins'}</p>
        </div>
        <button className="btn btn-primary continue-btn">{completedCount === 0 ? 'Start Learning ↗' : 'Resume Learning ↗'}</button>
      </div>

      {/* Modules Grid */}
      <div className="section-header" style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Learning Modules</h2>
        {filteredLessons.length < curriculum.length && <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Showing {filteredLessons.length} of {curriculum.length}</span>}
      </div>
      <div className="grid-3col" id="dashboard-modules-grid">
        {filteredLessons.map(lesson => {
          const isCompleted = appState.completedLessons.includes(lesson.id);
          const isQuiz = lesson.type === 'quiz';
          return (
            <div key={lesson.id} className={`card topic-card ${isQuiz ? 'quiz-card' : ''}`} onClick={() => handleCardClick(lesson.id)} style={isQuiz ? { border: '1px dashed var(--accent-rose)', background: 'rgba(244,63,94,0.03)' } : {}}>
              <div className="topic-card-top">
                <div className={`topic-icon ${lesson.iconColor || 'purple'}`}>{lesson.icon}</div>
                <span className={`diff-badge ${isQuiz ? 'Advanced' : lesson.difficulty}`} style={isQuiz ? { background: 'rgba(244,63,94,0.1)', color: 'var(--accent-rose)' } : {}}>{isQuiz ? 'Phase Quiz' : lesson.difficulty}</span>
              </div>
              <div className="topic-title">{lesson.title}</div>
              <div className="topic-summary">{isQuiz ? "Test your knowledge on this phase's topics." : lesson.summary}</div>
              <div className="topic-meta">
                <span>{lesson.category} {isQuiz ? '' : `• ${lesson.readTime || '5 mins'}`}</span>
                {isCompleted && <span className="topic-completed" style={isQuiz ? { color: 'var(--accent-rose)' } : {}}>✓ Completed</span>}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
