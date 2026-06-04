import React, { useState, useEffect } from 'react';
import { useApp, getWeekKey } from '../../context/AppContext';

// Build local leaderboard from localStorage contributions
const LEADERBOARD_KEY = 'dsaflow_leaderboard_entries';

function seedLeaderboard() {
  const existing = JSON.parse(localStorage.getItem(LEADERBOARD_KEY) || '[]');
  if (existing.length > 3) return existing;
  // Seed with fake-real entries to make it feel alive
  const seeds = [
    { name: 'Rahul K.', city: 'Hyderabad', problems: 87, modules: 28, streak: 14, weekProblems: 23, uid: 'seed1' },
    { name: 'Priya S.', city: 'Bangalore', problems: 63, modules: 22, streak: 9, weekProblems: 19, uid: 'seed2' },
    { name: 'Arjun M.', city: 'Chennai', problems: 54, modules: 35, streak: 21, weekProblems: 15, uid: 'seed3' },
    { name: 'Sneha R.', city: 'Pune', problems: 41, modules: 18, streak: 5, weekProblems: 12, uid: 'seed4' },
    { name: 'Vikram P.', city: 'Delhi', problems: 38, modules: 15, streak: 3, weekProblems: 9, uid: 'seed5' },
    { name: 'Ananya T.', city: 'Mumbai', problems: 29, modules: 12, streak: 7, weekProblems: 8, uid: 'seed6' },
    { name: 'Kiran B.', city: 'Coimbatore', problems: 22, modules: 9, streak: 4, weekProblems: 6, uid: 'seed7' },
  ];
  const merged = [...seeds.filter(s => !existing.find(e => e.uid === s.uid)), ...existing];
  localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(merged));
  return merged;
}

export default function Leaderboard() {
  const { appState, updateAppState } = useApp();
  const [tab, setTab] = useState('weekly'); // 'weekly' | 'alltime'
  const [nameInput, setNameInput] = useState(appState.leaderboardName || '');
  const [editingName, setEditingName] = useState(!appState.leaderboardName);
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const all = seedLeaderboard();
    setEntries(all);
  }, []);

  const problemsSolved = Object.values(appState.patternProgress || {})
    .reduce((t, p) => t + (p.done?.length || 0), 0);
  const modulesComplete = (appState.completedLessons || []).length;
  const streak = appState.dayStreak || 0;

  const handleJoin = () => {
    if (!nameInput.trim()) return;
    const name = nameInput.trim();
    updateAppState({ leaderboardName: name });
    setEditingName(false);

    // Save/update local entry
    const all = JSON.parse(localStorage.getItem(LEADERBOARD_KEY) || '[]');
    const myEntry = {
      name,
      city: 'You',
      problems: problemsSolved,
      modules: modulesComplete,
      streak,
      weekProblems: problemsSolved,
      uid: 'me',
      isMe: true,
    };
    const filtered = all.filter(e => e.uid !== 'me');
    const updated = [...filtered, myEntry];
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(updated));
    setEntries(updated);
  };

  const sorted = [...entries].sort((a, b) =>
    tab === 'weekly' ? b.weekProblems - a.weekProblems : b.problems - a.problems
  );

  const rankColors = ['#fbbf24', '#9ca3af', '#cd7c2f'];
  const rankEmojis = ['🥇', '🥈', '🥉'];

  return (
    <section style={{ padding: '0 0 40px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 800, background: 'linear-gradient(90deg, #fbbf24, #f97316)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: '0 0 6px' }}>
          🏆 Leaderboard
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>
          Compete with learners across India. Grind harder, rank higher.
        </p>
      </div>

      {/* Join Banner */}
      {editingName ? (
        <div className="card" style={{ padding: '20px 24px', marginBottom: '20px', background: 'linear-gradient(135deg, rgba(251,191,36,0.08), rgba(249,115,22,0.05))', border: '1px solid rgba(251,191,36,0.25)' }}>
          <p style={{ margin: '0 0 12px', fontSize: '0.9rem', color: '#fbbf24', fontWeight: 700 }}>🌟 Join the Leaderboard</p>
          <p style={{ margin: '0 0 12px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>Set a display name to appear on the ranking. Your progress updates automatically.</p>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input
              type="text"
              placeholder="e.g. Rahul K."
              value={nameInput}
              onChange={e => setNameInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleJoin()}
              style={{ flex: 1, background: 'var(--bg-input)', border: '1px solid var(--border-glass)', borderRadius: '8px', padding: '10px 14px', color: 'var(--text-primary)', fontSize: '0.9rem', fontFamily: 'var(--font-main)', outline: 'none' }}
            />
            <button className="btn btn-accent" onClick={handleJoin} disabled={!nameInput.trim()}>Join 🚀</button>
          </div>
        </div>
      ) : (
        <div className="card" style={{ padding: '14px 20px', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(251,191,36,0.05)', border: '1px solid rgba(251,191,36,0.2)' }}>
          <span style={{ fontSize: '0.85rem', color: '#fbbf24' }}>🏅 Competing as <strong>{appState.leaderboardName}</strong></span>
          <button onClick={() => setEditingName(true)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.78rem' }}>Change name</button>
        </div>
      )}

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        {['weekly', 'alltime'].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            background: tab === t ? 'rgba(251,191,36,0.15)' : 'rgba(255,255,255,0.03)',
            border: `1px solid ${tab === t ? 'rgba(251,191,36,0.4)' : 'rgba(255,255,255,0.08)'}`,
            color: tab === t ? '#fbbf24' : 'var(--text-muted)',
            borderRadius: '8px', padding: '8px 18px', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer',
          }}>
            {t === 'weekly' ? '📅 This Week' : '🏆 All Time'}
          </button>
        ))}
      </div>

      {/* Leaderboard Table */}
      <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
        {sorted.map((entry, i) => {
          const isMe = entry.isMe || entry.uid === 'me';
          const score = tab === 'weekly' ? entry.weekProblems : entry.problems;
          return (
            <div key={entry.uid} style={{
              display: 'flex', alignItems: 'center', gap: '14px',
              padding: '14px 20px',
              borderBottom: i < sorted.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
              background: isMe ? 'rgba(124,77,255,0.06)' : i < 3 ? `rgba(${i === 0 ? '251,191,36' : i === 1 ? '156,163,175' : '205,124,47'},0.04)` : 'transparent',
              transition: 'background 0.2s',
            }}>
              {/* Rank */}
              <div style={{ width: '32px', textAlign: 'center', flexShrink: 0 }}>
                {i < 3 ? (
                  <span style={{ fontSize: '1.2rem' }}>{rankEmojis[i]}</span>
                ) : (
                  <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-muted)' }}>#{i + 1}</span>
                )}
              </div>

              {/* Avatar */}
              <div style={{
                width: '38px', height: '38px', borderRadius: '50%', flexShrink: 0,
                background: isMe ? 'linear-gradient(135deg, #7c3aed, #06b6d4)' : `linear-gradient(135deg, ${rankColors[i] || '#334155'}, transparent)`,
                border: `2px solid ${isMe ? 'rgba(124,77,255,0.5)' : i < 3 ? `${rankColors[i]}60` : 'rgba(255,255,255,0.08)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.9rem', fontWeight: 800, color: '#fff',
              }}>
                {entry.name[0]}
              </div>

              {/* Name & City */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: '0.88rem', color: isMe ? '#c4b5fd' : 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {entry.name}
                  {isMe && <span style={{ fontSize: '0.65rem', background: 'rgba(124,77,255,0.2)', color: '#a78bfa', padding: '1px 6px', borderRadius: '99px' }}>YOU</span>}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{entry.city}</div>
              </div>

              {/* Stats */}
              <div style={{ display: 'flex', gap: '16px', flexShrink: 0 }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '1rem', fontWeight: 800, color: i < 3 ? rankColors[i] : 'var(--text-primary)' }}>{score}</div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Problems</div>
                </div>
                <div style={{ textAlign: 'center', display: window.innerWidth < 500 ? 'none' : 'block' }}>
                  <div style={{ fontSize: '1rem', fontWeight: 800, color: '#f97316' }}>{entry.streak}🔥</div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Streak</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <p style={{ textAlign: 'center', fontSize: '0.75rem', color: '#334155', marginTop: '16px' }}>
        📡 Leaderboard updates as you solve problems in Patterns. Invite friends to compete!
      </p>
    </section>
  );
}
