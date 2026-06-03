import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { curriculum } from '../../../modules/learning/content_a2z';

export default function Dashboard() {
  const { appState, updateAppState } = useApp();
  const { trial } = useAuth();
  const navigate = useNavigate();

  // Filter lessons based on difficulty chip from sidebar
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
  
  // Dynamic or Default data for others
  const dayStreak = 0;
  const problemsSolved = 0;

  return (
    <section className="tab-pane active" id="dashboard" style={{ display: 'grid', gap: '20px' }}>
      
      {/* Welcome Hero Banner */}
      <div className="card welcome-hero">
        <div className="hero-badge">
          🚀 {isPremium ? 'Premium Account Active' : 'Placement Ready • Free Trial Active'}
        </div>
        <h1>Master DSA with <span className="gradient-text">dsa.flow</span></h1>
        
        {/* Motivational Quote */}
        <p className="hero-quote" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontStyle: 'italic', marginBottom: '16px' }}>
          "An algorithm must be seen to be believed." — Donald Knuth
        </p>

        <p>The most comprehensive, interactive DSA platform built for cracking FAANG, product-based &amp; service-based company interviews. Learn, visualize, and solve.</p>
        
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button className="btn btn-accent" onClick={() => navigate('/roadmap')}>
            🗺️ View Roadmap
          </button>
          <button className="btn btn-primary" onClick={() => navigate('/learn')}>
            📖 Start Learning
          </button>
          <button className="btn btn-secondary" onClick={() => navigate('/platforms')}>
            🌐 Platform Guides
          </button>
        </div>
      </div>

      {/* Personal Progress Stats Row */}
      <div className="progress-stats-row">
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
        
        <div className="progress-stat-card">
          <div className="stat-header">
            <span className="stat-icon">🔥</span>
            <span className="stat-title">Day Streak</span>
          </div>
          <div className="stat-value">{dayStreak}</div>
          <div className="stat-action" onClick={() => navigate('/learn')}>Start today ↗</div>
        </div>
        
        <div className="progress-stat-card">
          <div className="stat-header">
            <span className="stat-icon">💻</span>
            <span className="stat-title">Problems Solved</span>
          </div>
          <div className="stat-value">{problemsSolved}</div>
          <div className="difficulty-mini-bar">
            {problemsSolved > 0 ? (
              <>
                <div className="diff-segment easy" style={{ width: '50%' }} title="Easy"></div>
                <div className="diff-segment medium" style={{ width: '35%' }} title="Medium"></div>
                <div className="diff-segment hard" style={{ width: '15%' }} title="Hard"></div>
              </>
            ) : (
              <div style={{ width: '100%', background: 'var(--border-glass)' }}></div>
            )}
          </div>
        </div>
        
        <div className="progress-stat-card">
          <div className="stat-header">
            <span className="stat-icon">🎯</span>
            <span className="stat-title">Interview Readiness</span>
          </div>
          <div className="stat-value" style={{ fontSize: '1.2rem' }}>In Progress</div>
          <button className="btn btn-secondary stat-btn" style={{ padding: '4px 10px', fontSize: '0.75rem', marginTop: '6px' }}>Set a target date</button>
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
