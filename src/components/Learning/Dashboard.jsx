import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { curriculum } from '../../../modules/learning/content_a2z';

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

export default function Dashboard() {
  const { appState, updateAppState, setInterviewDate, interviewDaysLeft } = useApp();
  const { trial } = useAuth();
  const navigate = useNavigate();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [pickedDate, setPickedDate] = useState(appState.interviewDate || '');

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

  return (
    <section className="tab-pane active" id="dashboard" style={{ display: 'grid', gap: '20px' }}>

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

        {/* Day Streak */}
        <div className="progress-stat-card">
          <div className="stat-header">
            <span className="stat-icon">🔥</span>
            <span className="stat-title">Day Streak</span>
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
