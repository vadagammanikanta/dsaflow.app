import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { curriculum } from '../../../modules/learning/content_a2z';
import ShareCard from '../Layout/ShareCard';

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

// Pick a quote that rotates daily (same quote all day, changes tomorrow)
const todayQuote = QUOTES[new Date().getDate() % QUOTES.length];

const STREAK_MILESTONES = [3, 7, 14, 30];

export default function Dashboard() {
  const { appState, updateAppState, setInterviewDate, interviewDaysLeft } = useApp();
  const { trial, user } = useAuth();
  const navigate = useNavigate();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [pickedDate, setPickedDate] = useState(appState.interviewDate || '');
  const [shareCard, setShareCard] = useState(null); // { type, value }
  const [sharedMilestones] = useState(() => {
    try { return JSON.parse(localStorage.getItem('dsaflow_shared_milestones') || '[]'); } catch { return []; }
  });

  const filteredLessons = useMemo(() => {
    return curriculum.filter(lesson =>
      appState.activeDifficulty === 'all' ||
      (lesson.difficulty && lesson.difficulty.toLowerCase() === appState.activeDifficulty.toLowerCase())
    );
  }, [appState.activeDifficulty]);

  const handleCardClick = (lessonId) => {
    updateAppState({ activeLessonId: lessonId });
    navigate('/learn');
  };

  const isPremium = trial?.isPaid;
  const completedCount = appState.completedLessons.length;
  const nextLesson = curriculum.find(lesson => !appState.completedLessons.includes(lesson.id)) || curriculum[0];
  const progressPercent = curriculum.length ? ((completedCount / curriculum.length) * 100).toFixed(1) : 0;

  // Streak
  const dayStreak = appState.dayStreak || 1;

  // Check for streak milestone to show share card
  const showStreakMilestone = () => {
    const milestone = STREAK_MILESTONES.find(m => dayStreak >= m && !sharedMilestones.includes(`streak-${m}`));
    if (milestone) {
      const key = `streak-${milestone}`;
      setShareCard({ type: 'streak', value: milestone });
      const updated = [...sharedMilestones, key];
      localStorage.setItem('dsaflow_shared_milestones', JSON.stringify(updated));
    }
  };

  // Problems solved = count of unique pattern problems marked done
  const problemsSolved = Object.values(appState.patternProgress || {})
    .reduce((total, p) => total + (p.done?.length || 0), 0);

  // Interview readiness score (simple: % of lessons done)
  const readinessPercent = progressPercent;

  // Interview countdown label
  const countdownLabel = interviewDaysLeft === null
    ? null
    : interviewDaysLeft === 0
      ? '🎯 Interview Day!'
      : `⏳ ${interviewDaysLeft} days left`;

  const modulesPerDayNeeded = interviewDaysLeft && interviewDaysLeft > 0
    ? Math.ceil((curriculum.length - completedCount) / interviewDaysLeft)
    : null;

  const handleSaveDate = () => {
    if (pickedDate) {
      setInterviewDate(pickedDate);
      setShowDatePicker(false);
    }
  };

  // WhatsApp share progress
  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      `🔥 I've completed ${completedCount} of ${curriculum.length} DSA modules on dsaflow.app with a ${dayStreak}-day streak! 💪\n\nJoin me and crack your placements too → https://dsaflow.app`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  // Referral link
  const referralCode = user?.uid ? user.uid.slice(0, 8).toUpperCase() : 'INVITE';
  const referralLink = `https://dsaflow.app?ref=${referralCode}`;
  const handleCopyReferral = () => {
    navigator.clipboard.writeText(referralLink);
    const btn = document.getElementById('referral-copy-btn');
    if (btn) { btn.textContent = '✅ Copied!'; setTimeout(() => { btn.textContent = '📋 Copy Link'; }, 2000); }
  };

  return (
    <section className="tab-pane active" id="dashboard" style={{ display: 'grid', gap: '20px' }}>

      {/* Share Achievement Card Modal */}
      {shareCard && (
        <ShareCard
          type={shareCard.type}
          value={shareCard.value}
          userName={user?.name || user?.displayName || ''}
          onClose={() => setShareCard(null)}
        />
      )}

      {/* Welcome Hero Banner */}
      <div className="card welcome-hero">
        <div className="hero-badge">
          🚀 {isPremium ? 'Premium Account Active' : 'Placement Ready • Free Trial Active'}
        </div>
        <h1>Master DSA with <span className="gradient-text">dsaflow.app</span></h1>

        {/* Daily rotating quote */}
        <p className="hero-quote" style={{ fontSize: '0.87rem', color: 'var(--text-muted)', fontStyle: 'italic', marginBottom: '16px' }}>
          "{todayQuote.text}" — <strong style={{ fontStyle: 'normal' }}>{todayQuote.author}</strong>
        </p>

        <p>The most comprehensive, interactive DSA platform built for cracking FAANG, product-based &amp; service-based company interviews. Learn, visualize, and solve.</p>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '16px' }}>
          <button className="btn btn-accent" onClick={() => navigate('/roadmap')}>🗺️ View Roadmap</button>
          <button className="btn btn-primary" onClick={() => navigate('/learn')}>📖 Start Learning</button>
          <button className="btn btn-secondary" onClick={() => navigate('/patterns')}>🧩 Interview Patterns</button>
          <button
            className="btn"
            style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)', color: '#fff', border: 'none' }}
            onClick={handleWhatsAppShare}
          >
            📤 Share Progress
          </button>
        </div>
      </div>

      {/* Personal Progress Stats Row */}
      <div className="progress-stats-row">

        {/* Modules Done */}
        <div className="progress-stat-card">
          <div className="stat-header">
            <span className="stat-icon">📚</span>
            <span className="stat-title">Modules Done</span>
          </div>
          <div className="stat-value">{completedCount} <span className="stat-total">/ {curriculum.length}</span></div>
          <div className="thin-progress-bar">
            <div className="thin-progress-fill" style={{ width: `${progressPercent}%` }}></div>
          </div>
        </div>

        {/* Day Streak — clickable to show share card */}
        <div
          className="progress-stat-card"
          style={{ cursor: dayStreak >= 3 ? 'pointer' : 'default' }}
          onClick={dayStreak >= 3 ? showStreakMilestone : undefined}
          title={dayStreak >= 3 ? 'Click to share your streak!' : ''}
        >
          <div className="stat-header">
            <span className="stat-icon">🔥</span>
            <span className="stat-title">Day Streak</span>
            {dayStreak >= 3 && <span style={{ fontSize: '0.62rem', color: 'var(--accent-cyan)', marginLeft: 'auto' }}>tap to share</span>}
          </div>
          <div className="stat-value" style={{ color: dayStreak >= 7 ? 'var(--accent-amber)' : undefined }}>
            {dayStreak}
            {dayStreak >= 3 && <span style={{ fontSize: '0.65rem', marginLeft: '6px', color: 'var(--accent-amber)' }}>
              {dayStreak >= 30 ? '🏆' : dayStreak >= 7 ? '⚡' : '🔥'}
            </span>}
          </div>
          <div className="stat-action" style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            {dayStreak === 1 ? 'Come back tomorrow to build your streak!' : `${dayStreak} days in a row 💪`}
          </div>
        </div>

        {/* Problems Solved */}
        <div className="progress-stat-card">
          <div className="stat-header">
            <span className="stat-icon">💻</span>
            <span className="stat-title">Problems Solved</span>
          </div>
          <div className="stat-value">{problemsSolved}</div>
          <div className="stat-action" onClick={() => navigate('/patterns')} style={{ cursor: 'pointer', fontSize: '0.72rem', color: 'var(--accent-cyan)', marginTop: '4px' }}>
            Mark solved in Patterns ↗
          </div>
        </div>

        {/* Interview Countdown */}
        <div className="progress-stat-card">
          <div className="stat-header">
            <span className="stat-icon">🎯</span>
            <span className="stat-title">Interview In</span>
          </div>
          {appState.interviewDate ? (
            <>
              <div className="stat-value" style={{ fontSize: '1.3rem', color: interviewDaysLeft === 0 ? 'var(--accent-rose)' : 'var(--accent-cyan)' }}>
                {countdownLabel}
              </div>
              {modulesPerDayNeeded !== null && modulesPerDayNeeded > 0 && (
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  Do {modulesPerDayNeeded} module{modulesPerDayNeeded > 1 ? 's' : ''}/day to finish
                </div>
              )}
              <button
                className="btn btn-secondary stat-btn"
                style={{ padding: '3px 8px', fontSize: '0.7rem', marginTop: '6px' }}
                onClick={() => setShowDatePicker(true)}
              >
                Change date
              </button>
            </>
          ) : (
            <>
              <div className="stat-value" style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>Not set</div>
              <button
                className="btn btn-secondary stat-btn"
                style={{ padding: '4px 10px', fontSize: '0.75rem', marginTop: '6px' }}
                onClick={() => setShowDatePicker(true)}
              >
                Set interview date 📅
              </button>
            </>
          )}
        </div>
      </div>

      {/* Interview Date Picker Modal */}
      {showDatePicker && (
        <div
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)',
            zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}
          onClick={() => setShowDatePicker(false)}
        >
          <div
            className="card"
            style={{ padding: '28px 32px', maxWidth: '340px', width: '90%', textAlign: 'center' }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ fontSize: '2rem', marginBottom: '12px' }}>📅</div>
            <h3 style={{ marginBottom: '8px' }}>When is your interview?</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
              We'll show you a daily module target to be ready on time.
            </p>
            <input
              type="date"
              value={pickedDate}
              min={new Date().toISOString().slice(0, 10)}
              onChange={e => setPickedDate(e.target.value)}
              style={{
                background: 'var(--bg-input)', border: '1px solid var(--border-glass)',
                borderRadius: '8px', padding: '10px 14px', color: 'var(--text-primary)',
                fontSize: '1rem', width: '100%', fontFamily: 'var(--font-main)',
                marginBottom: '16px', outline: 'none'
              }}
            />
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button className="btn btn-secondary" onClick={() => setShowDatePicker(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSaveDate} disabled={!pickedDate}>Save</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Invite Friends Card ── */}
      <div className="card" style={{
        background: 'linear-gradient(135deg, rgba(124,77,255,0.08) 0%, rgba(6,182,212,0.06) 100%)',
        border: '1px solid rgba(124,77,255,0.25)',
        borderRadius: '16px',
        padding: '22px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
      }}>
        <div style={{ flex: 1, minWidth: '220px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
            <span style={{ fontSize: '1.6rem' }}>🎁</span>
            <div>
              <h3 style={{ margin: 0, fontSize: '1rem', color: '#f1f5f9', fontWeight: 700 }}>
                Invite Friends — Earn Rewards!
              </h3>
              <p style={{ margin: '2px 0 0', fontSize: '0.8rem', color: '#94a3b8' }}>
                Share your link. When a friend signs up, you both win!
              </p>
            </div>
          </div>
          <div style={{
            background: 'rgba(0,0,0,0.3)', borderRadius: '8px', padding: '8px 12px',
            display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem',
            border: '1px solid rgba(124,77,255,0.2)', marginTop: '10px',
          }}>
            <span style={{ color: '#94a3b8', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {referralLink}
            </span>
            <button
              id="referral-copy-btn"
              onClick={handleCopyReferral}
              style={{
                background: 'rgba(124,77,255,0.2)', border: '1px solid rgba(124,77,255,0.3)',
                color: '#c4b5fd', borderRadius: '6px', padding: '4px 10px',
                fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap',
              }}
            >
              📋 Copy Link
            </button>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <a
            href={`https://wa.me/?text=${encodeURIComponent(`🚀 Hey! I've been using dsaflow.app to prepare for placements and it's seriously awesome. Join me and get started for FREE → ${referralLink}`)}`}
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              background: 'linear-gradient(135deg, #25D366, #128C7E)',
              color: '#fff', fontWeight: 700, fontSize: '0.82rem',
              padding: '10px 16px', borderRadius: '10px', textDecoration: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
            WhatsApp Invite
          </a>
        </div>
      </div>

      {/* Continue Where You Left Off */}
      <div className="continue-learning-card card" onClick={() => handleCardClick(nextLesson.id)}>
        <div className="continue-content">
          <span className="continue-label">{completedCount === 0 ? 'START LEARNING' : 'CONTINUE LEARNING'}</span>
          <h3 className="continue-title">{nextLesson.title}</h3>
          <p className="continue-meta">{nextLesson.category} • {nextLesson.readTime || '5 mins'}</p>
        </div>
        <button className="btn btn-primary continue-btn">
          {completedCount === 0 ? 'Start Learning ↗' : 'Resume Learning ↗'}
        </button>
      </div>

      {/* Grid Section Header */}
      <div className="section-header" style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Learning Modules</h2>
        {filteredLessons.length < curriculum.length && (
          <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Showing {filteredLessons.length} of {curriculum.length}
          </span>
        )}
      </div>

      {/* Modules Cards Grid */}
      <div className="grid-3col" id="dashboard-modules-grid">
        {filteredLessons.map(lesson => {
          const isCompleted = appState.completedLessons.includes(lesson.id);
          const isQuiz = lesson.type === 'quiz';
          return (
            <div
              key={lesson.id}
              className={`card topic-card ${isQuiz ? 'quiz-card' : ''}`}
              onClick={() => handleCardClick(lesson.id)}
              style={isQuiz ? { border: '1px dashed var(--accent-rose)', background: 'rgba(244, 63, 94, 0.03)' } : {}}
            >
              <div className="topic-card-top">
                <div className={`topic-icon ${lesson.iconColor || 'purple'}`}>{lesson.icon}</div>
                <span className={`diff-badge ${isQuiz ? 'Advanced' : lesson.difficulty}`} style={isQuiz ? { background: 'rgba(244, 63, 94, 0.1)', color: 'var(--accent-rose)' } : {}}>
                  {isQuiz ? 'Phase Quiz' : lesson.difficulty}
                </span>
              </div>
              <div className="topic-title">{lesson.title}</div>
              <div className="topic-summary">
                {isQuiz ? "Test your knowledge on this phase's topics with a comprehensive phase assessment." : lesson.summary}
              </div>
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
