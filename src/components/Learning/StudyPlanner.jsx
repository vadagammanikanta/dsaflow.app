import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { curriculum } from '../../../modules/learning/content_a2z';

export default function StudyPlanner() {
  const { appState, setInterviewDate } = useApp();
  const [pickedDate, setPickedDate] = useState(appState.interviewDate || '');
  const [saved, setSaved] = useState(!!appState.interviewDate);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const daysLeft = useMemo(() => {
    if (!appState.interviewDate) return null;
    return Math.max(0, Math.ceil((new Date(appState.interviewDate) - today) / 86400000));
  }, [appState.interviewDate]);

  const completedSet = new Set(appState.completedLessons || []);
  const remaining = curriculum.filter(l => !completedSet.has(l.id));

  const plan = useMemo(() => {
    if (!appState.interviewDate || !daysLeft) return [];
    const perDay = Math.max(1, Math.ceil(remaining.length / daysLeft));
    const days = [];
    let idx = 0;
    for (let d = 0; d < Math.min(daysLeft, 60) && idx < remaining.length; d++) {
      const date = new Date(today);
      date.setDate(today.getDate() + d);
      const dayLessons = remaining.slice(idx, idx + perDay);
      idx += perDay;
      days.push({ date, lessons: dayLessons });
    }
    return days;
  }, [appState.interviewDate, daysLeft, remaining]);

  const handleSave = () => {
    if (pickedDate) {
      setInterviewDate(pickedDate);
      setSaved(true);
    }
  };

  const formatDate = (d) => d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });
  const isToday = (d) => d.toDateString() === new Date().toDateString();

  const diffColors = { Beginner: '#10b981', Intermediate: '#f59e0b', Advanced: '#f43f5e' };

  return (
    <section style={{ padding: '0 0 40px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 800, background: 'linear-gradient(90deg, #a78bfa, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: '0 0 6px' }}>
          📅 Smart Study Planner
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>
          Enter your interview date — we'll auto-generate your day-by-day study schedule
        </p>
      </div>

      {/* Date Picker Card */}
      <div className="card" style={{ padding: '24px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '220px' }}>
          <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            🎯 Target Interview Date
          </label>
          <input
            type="date"
            value={pickedDate}
            min={new Date(Date.now() + 86400000).toISOString().slice(0, 10)}
            onChange={e => { setPickedDate(e.target.value); setSaved(false); }}
            style={{
              background: 'var(--bg-input)', border: '1px solid var(--border-glass)',
              borderRadius: '10px', padding: '10px 14px', color: 'var(--text-primary)',
              fontSize: '1rem', fontFamily: 'var(--font-main)', outline: 'none', width: '100%',
            }}
          />
        </div>
        <button className="btn btn-primary" style={{ padding: '12px 24px', fontSize: '0.9rem' }} onClick={handleSave} disabled={!pickedDate}>
          {saved ? '✅ Plan Generated!' : '📋 Generate Plan'}
        </button>
      </div>

      {/* Stats Row */}
      {appState.interviewDate && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px', marginBottom: '24px' }}>
          {[
            { icon: '📅', label: 'Days Left', value: daysLeft || '—', color: daysLeft < 7 ? '#f43f5e' : '#06b6d4' },
            { icon: '📚', label: 'Modules Left', value: remaining.length, color: '#a78bfa' },
            { icon: '✅', label: 'Completed', value: completedSet.size, color: '#10b981' },
            { icon: '⚡', label: 'Per Day', value: daysLeft ? Math.ceil(remaining.length / daysLeft) : '—', color: '#f59e0b' },
          ].map(s => (
            <div key={s.label} className="card" style={{ padding: '16px', textAlign: 'center' }}>
              <div style={{ fontSize: '1.4rem', marginBottom: '4px' }}>{s.icon}</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>{s.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Day-by-day Plan */}
      {plan.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {plan.map((day, i) => {
            const allDone = day.lessons.every(l => completedSet.has(l.id));
            return (
              <div
                key={i}
                className="card"
                style={{
                  padding: '16px 20px',
                  border: isToday(day.date)
                    ? '1px solid rgba(124,77,255,0.5)'
                    : allDone ? '1px solid rgba(16,185,129,0.3)' : '1px solid var(--border-glass)',
                  background: isToday(day.date)
                    ? 'rgba(124,77,255,0.06)'
                    : allDone ? 'rgba(16,185,129,0.04)' : undefined,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '36px', height: '36px', borderRadius: '10px', flexShrink: 0,
                      background: isToday(day.date) ? 'linear-gradient(135deg, #7c3aed, #06b6d4)' : allDone ? 'rgba(16,185,129,0.2)' : 'rgba(255,255,255,0.05)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.85rem', fontWeight: 700, color: isToday(day.date) ? '#fff' : allDone ? '#10b981' : 'var(--text-muted)',
                    }}>
                      {allDone ? '✓' : `D${i + 1}`}
                    </div>
                    <div>
                      <span style={{ fontWeight: 700, fontSize: '0.9rem', color: isToday(day.date) ? '#c4b5fd' : 'var(--text-primary)' }}>
                        {formatDate(day.date)}
                      </span>
                      {isToday(day.date) && <span style={{ marginLeft: '8px', fontSize: '0.7rem', background: 'rgba(124,77,255,0.2)', color: '#c4b5fd', padding: '2px 8px', borderRadius: '99px', fontWeight: 600 }}>TODAY</span>}
                    </div>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {day.lessons.length} module{day.lessons.length !== 1 ? 's' : ''}
                  </span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {day.lessons.map((lesson, j) => {
                    const done = completedSet.has(lesson.id);
                    return (
                      <div key={j} style={{
                        display: 'flex', alignItems: 'center', gap: '10px',
                        padding: '8px 12px', borderRadius: '8px',
                        background: done ? 'rgba(16,185,129,0.08)' : 'rgba(255,255,255,0.03)',
                        border: `1px solid ${done ? 'rgba(16,185,129,0.2)' : 'rgba(255,255,255,0.05)'}`,
                      }}>
                        <span style={{ fontSize: '1rem', flexShrink: 0 }}>{lesson.icon || '📖'}</span>
                        <span style={{ flex: 1, fontSize: '0.85rem', color: done ? '#10b981' : 'var(--text-primary)', textDecoration: done ? 'line-through' : 'none' }}>
                          {lesson.title}
                        </span>
                        <span style={{
                          fontSize: '0.7rem', fontWeight: 600,
                          color: diffColors[lesson.difficulty] || '#94a3b8',
                          background: `${diffColors[lesson.difficulty] || '#94a3b8'}18`,
                          padding: '2px 8px', borderRadius: '99px',
                          border: `1px solid ${diffColors[lesson.difficulty] || '#94a3b8'}30`,
                        }}>
                          {lesson.difficulty}
                        </span>
                        {done && <span style={{ fontSize: '0.8rem', color: '#10b981' }}>✓</span>}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      ) : !appState.interviewDate ? (
        <div className="card" style={{ padding: '48px', textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📅</div>
          <h3 style={{ color: 'var(--text-primary)', marginBottom: '8px' }}>Set Your Interview Date Above</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            We'll generate a personalized day-by-day study plan tailored to your timeline.
          </p>
        </div>
      ) : (
        <div className="card" style={{ padding: '32px', textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', marginBottom: '12px' }}>🎉</div>
          <h3 style={{ color: '#10b981' }}>All Modules Completed!</h3>
          <p style={{ color: 'var(--text-muted)' }}>You're fully prepared. Go ace that interview! 🚀</p>
        </div>
      )}
    </section>
  );
}
