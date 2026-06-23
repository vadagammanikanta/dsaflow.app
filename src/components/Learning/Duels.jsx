import React, { useState, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import ComplexityPlotter, { analyzeCodeComplexityLocally } from '../Visualizer/ComplexityPlotter';
import { problems } from '../../../modules/arena/problems';

export default function Duels() {
  const { user } = useAuth();
  const { appState, updateAppState } = useApp();
  
  const [duelState, setDuelState] = useState('lobby'); // 'lobby', 'matching', 'active', 'finished'
  const [matchId, setMatchId] = useState(null);
  const [opponent, setOpponent] = useState(null);
  const [problem, setProblem] = useState(null);
  const [myProgress, setMyProgress] = useState(0);
  const [opProgress, setOpProgress] = useState(0);
  const [winner, setWinner] = useState(null);
  const [code, setCode] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState('');
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes match
  
  // Complexity State hooks
  const [activeTab, setActiveTab] = useState('output'); // 'output' or 'complexity'
  const [complexityResult, setComplexityResult] = useState({
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    explanation: 'Run code or trigger analysis to calculate algorithmic scaling curves.',
    steps: [
      'Enter your algorithm in the Monaco editor canvas.',
      'The static analyzer traces loops and recursive splits to map its performance curves.'
    ],
    isOptimized: true,
    optimizedSuggestion: ''
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [inputN, setInputN] = useState(50);

  const handleAnalyzeComplexity = async (codeToAnalyze = code) => {
    if (!codeToAnalyze) return;
    setIsAnalyzing(true);
    try {
      const response = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: codeToAnalyze,
          language: appState.selectedLanguage,
          customApiKey: localStorage.getItem('dsaflow_groq_key') || ''
        })
      });
      if (!response.ok) {
        throw new Error(`API returned status ${response.status}`);
      }
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setComplexityResult(data);
    } catch (err) {
      console.warn('[Duels] falling back to local complexity static rules:', err.message);
      const localResult = analyzeCodeComplexityLocally(codeToAnalyze, appState.selectedLanguage);
      setComplexityResult(localResult);
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  const dbRef = useRef(null);
  const unsubscribeRef = useRef(null);
  const timerRef = useRef(null);
  const isP1Ref = useRef(false);

  useEffect(() => {
    // Try to get Firestore db reference
    if (typeof firebase !== 'undefined' && firebase.apps.length) {
      dbRef.current = firebase.firestore();
    }
    
    return () => {
      cleanupDuel();
    };
  }, []);

  const cleanupDuel = () => {
    if (unsubscribeRef.current) unsubscribeRef.current();
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleTimeout = () => {
    setDuelState('finished');
    setWinner('Timeout');
    if (dbRef.current && matchId) {
      dbRef.current.collection('duels').doc(matchId).update({
        status: 'finished',
        winner: 'Timeout'
      }).catch(err => console.error(err));
    }
  };

  const findMatch = async () => {
    setDuelState('matching');
    setOpponent(null);
    setProblem(null);
    setMyProgress(0);
    setOpProgress(0);
    setWinner(null);
    setTimeLeft(600);

    if (!dbRef.current) {
      // Fallback local simulation if Firebase is not configured
      setTimeout(() => {
        simulateMatch();
      }, 3000);
      return;
    }

    try {
      // 1. Query for open duels where status is 'waiting'
      const duelsCol = dbRef.current.collection('duels');
      const q = await duelsCol.where('status', '==', 'waiting').limit(1).get();

      if (!q.empty) {
        // Join existing duel
        const doc = q.docs[0];
        const matchData = doc.data();
        const selectedProblem = problems[Math.floor(Math.random() * problems.length)];
        
        isP1Ref.current = false;
        setMatchId(doc.id);
        setOpponent(matchData.player1);
        setProblem(selectedProblem);
        setCode(selectedProblem.starterCode[appState.selectedLanguage] || '');

        await duelsCol.doc(doc.id).update({
          player2: { uid: user.uid, name: user.name || 'Anonymous' },
          problemId: selectedProblem.id,
          status: 'active',
          startedAt: Date.now()
        });

        subscribeToMatch(doc.id);
      } else {
        // Create new duel
        isP1Ref.current = true;
        const newDocRef = duelsCol.doc();
        const newMatchId = newDocRef.id;
        setMatchId(newMatchId);

        await newDocRef.set({
          status: 'waiting',
          player1: { uid: user.uid, name: user.name || 'Anonymous' },
          player2: null,
          problemId: null,
          p1Passed: 0,
          p2Passed: 0,
          totalCases: 0,
          winner: null,
          createdAt: Date.now()
        });

        subscribeToMatch(newMatchId);
      }
    } catch (e) {
      console.error(e);
      alert('Error searching for match. Starting local simulation...');
      simulateMatch();
    }
  };

  const subscribeToMatch = (id) => {
    if (!dbRef.current) return;
    cleanupDuel();

    unsubscribeRef.current = dbRef.current.collection('duels').doc(id).onSnapshot(doc => {
      if (!doc.exists) return;
      const data = doc.data();

      // Check for opponent match join
      if (data.status === 'active') {
        setDuelState('active');
        startTimer();

        if (isP1Ref.current) {
          setOpponent(data.player2);
          const activeProb = problems.find(p => p.id === data.problemId) || problems[0];
          setProblem(activeProb);
          setCode(activeProb.starterCode[appState.selectedLanguage] || '');
        } else {
          setOpponent(data.player1);
        }

        setMyProgress(isP1Ref.current ? data.p1Passed : data.p2Passed);
        setOpProgress(isP1Ref.current ? data.p2Passed : data.p1Passed);
      }

      // Check for scores update
      if (data.status === 'active') {
        setMyProgress(isP1Ref.current ? data.p1Passed : data.p2Passed);
        setOpProgress(isP1Ref.current ? data.p2Passed : data.p1Passed);
      }

      // Check for match completion
      if (data.status === 'finished') {
        setDuelState('finished');
        setWinner(data.winner);
        cleanupDuel();
      }
    });
  };

  // Mock Offline Simulator for quick demo and fallback safety
  const simulateMatch = () => {
    setDuelState('active');
    isP1Ref.current = true;
    const selectedProblem = problems[Math.floor(Math.random() * problems.length)];
    setProblem(selectedProblem);
    setCode(selectedProblem.starterCode[appState.selectedLanguage] || '');
    setOpponent({ name: 'GoogleSDE_Pro' });
    startTimer();

    // Mock progress of opponent interval
    let opPassed = 0;
    const total = selectedProblem.testCases.length;
    const interval = setInterval(() => {
      if (opPassed < total - 1 && Math.random() > 0.4) {
        opPassed += 1;
        setOpProgress(opPassed);
      } else if (opPassed === total - 1 && Math.random() > 0.8) {
        // Opponent wins if user is slow
        opPassed += 1;
        setOpProgress(opPassed);
        setWinner('GoogleSDE_Pro');
        setDuelState('finished');
        clearInterval(interval);
      }
    }, 12000);

    timerRef.current = interval;
  };

  const handleRunCode = async () => {
    if (!problem || isRunning) return;
    setIsRunning(true);
    setOutput('⏳ Executing code against live SDE test cases...');
    
    // Trigger complexity analysis in background
    handleAnalyzeComplexity(code);

    try {
      const publicCases = problem.testCases;
      let passedCount = 0;

      for (let i = 0; i < publicCases.length; i++) {
        const tc = publicCases[i];
        const res = await fetch('/api/execute', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            language: appState.selectedLanguage,
            code: code,
            driver: problem.drivers[appState.selectedLanguage],
            stdin: tc.input
          })
        });

        const data = await res.json();
        if (data.success && (data.output || '').trim() === tc.expectedOutput.trim()) {
          passedCount++;
        }
      }

      setMyProgress(passedCount);
      setOutput(`Result: Solved ${passedCount} / ${publicCases.length} Test Cases`);

      // Update Firestore Realtime Progress
      if (dbRef.current && matchId) {
        const updatePayload = isP1Ref.current
          ? { p1Passed: passedCount }
          : { p2Passed: passedCount };

        if (passedCount === publicCases.length) {
          // Solved all cases — Declare win!
          await dbRef.current.collection('duels').doc(matchId).update({
            ...updatePayload,
            status: 'finished',
            winner: user.name || 'Anonymous'
          });
        } else {
          await dbRef.current.collection('duels').doc(matchId).update(updatePayload);
        }
      } else {
        // Simulation mode logic
        if (passedCount === publicCases.length) {
          setWinner('You');
          setDuelState('finished');
          if (timerRef.current) clearInterval(timerRef.current);
        }
      }
    } catch (e) {
      setOutput(`Error running test cases: ${e.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  const leaveQueue = async () => {
    cleanupDuel();
    if (dbRef.current && matchId && isP1Ref.current && duelState === 'matching') {
      try {
        await dbRef.current.collection('duels').doc(matchId).delete();
      } catch(e){}
    }
    setDuelState('lobby');
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div style={{ padding: '24px', height: 'calc(100vh - var(--header-height) - 100px)', display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
      
      {/* 1. MATCHMAKING LOBBY */}
      {duelState === 'lobby' && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexGrow: 1, gap: '20px' }}>
          <div style={{ fontSize: '3rem' }}>⚔️</div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: 0 }}>SDE 1v1 Coding Duels</h2>
          <p style={{ color: 'var(--text-secondary)', textAlign: 'center', maxWidth: '450px', fontSize: '0.9rem', lineHeight: '1.6', margin: 0 }}>
            Enter the matchmaking queue to duel with a peer live. Complete the coding puzzle faster with all test cases passed to climb the rank list!
          </p>
          <button className="btn btn-primary" onClick={findMatch} style={{ padding: '12px 32px', fontSize: '1rem', borderRadius: '50px' }}>
            🚀 Find Match
          </button>
        </div>
      )}

      {/* 2. MATCHMAKING MATCHING QUEUE */}
      {duelState === 'matching' && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexGrow: 1, gap: '24px' }}>
          <div style={{ width: '48px', height: '48px', border: '4px solid var(--border-glass)', borderTop: '4px solid var(--accent-cyan)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
          <div>
            <h3 style={{ fontSize: '1.2rem', margin: '0 0 6px 0', textAlign: 'center' }}>Searching for active peer...</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', margin: 0, textAlign: 'center' }}>This usually takes a few seconds.</p>
          </div>
          <button className="btn btn-secondary btn-sm" onClick={leaveQueue}>
            Cancel Queue
          </button>
        </div>
      )}

      {/* 3. ACTIVE DUEL WINDOW */}
      {duelState === 'active' && problem && (
        <div style={{ display: 'flex', flexGrow: 1, gap: '20px', minHeight: 0 }}>
          
          {/* Left panel: Info & Problem */}
          <div style={{ width: '380px', display: 'flex', flexDirection: 'column', gap: '16px', flexShrink: 0, minHeight: 0 }}>
            {/* Live match board */}
            <div className="card" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--accent-rose)', fontWeight: 'bold' }}>🔴 LIVE DUEL</span>
                <span style={{ fontFamily: 'monospace', fontSize: '1.1rem', color: 'var(--accent-cyan)', fontWeight: 'bold' }}>⏱️ {formatTime(timeLeft)}</span>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {/* Me Progress */}
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-glass)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 600, marginBottom: '6px' }}>
                    <span>You</span>
                    <span style={{ color: 'var(--accent-cyan)' }}>{myProgress} / {problem.testCases.length} solved</span>
                  </div>
                  <div style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '50px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', background: 'var(--accent-cyan)', width: `${(myProgress / problem.testCases.length) * 100}%`, transition: 'width 0.3s ease' }} />
                  </div>
                </div>
                {/* Opponent Progress */}
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-glass)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 600, marginBottom: '6px' }}>
                    <span>{opponent?.name || 'Opponent'}</span>
                    <span style={{ color: 'var(--accent-rose)' }}>{opProgress} / {problem.testCases.length} solved</span>
                  </div>
                  <div style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '50px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', background: 'var(--accent-rose)', width: `${(opProgress / problem.testCases.length) * 100}%`, transition: 'width 0.3s ease' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Problem card */}
            <div className="card" style={{ padding: '20px', flexGrow: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{problem.title}</h3>
                <span style={{ fontSize: '0.72rem', background: 'rgba(0, 229, 255, 0.08)', border: '1px solid rgba(0, 229, 255, 0.2)', color: 'var(--accent-cyan)', padding: '2px 8px', borderRadius: '50px' }}>
                  {problem.difficulty}
                </span>
              </div>
              <div 
                style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6', overflowY: 'auto', flexGrow: 1 }}
                dangerouslySetInnerHTML={{ 
                  __html: problem.content
                    .replace(/^# (.*$)/gim, '<h4>$1</h4>')
                    .replace(/^### (.*$)/gim, '<h5>$1</h5>')
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    .replace(/`(.*?)`/g, '<code>$1</code>')
                    .replace(/\n/g, '<br>')
                }}
              />
            </div>
          </div>

          {/* Right panel: Editor & Console */}
          <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '16px', minWidth: 0 }}>
            {/* Editor Canvas */}
            <div className="card" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: '#0a0b16' }}>
              <div style={{ padding: '8px 16px', borderBottom: '1px solid var(--border-glass)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.2)' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Language: <strong>{appState.selectedLanguage}</strong></span>
                <button className="btn btn-accent btn-sm" onClick={handleRunCode} disabled={isRunning}>
                  {isRunning ? '⏳ Submitting...' : '▶ Submit Code'}
                </button>
              </div>
              <div style={{ flexGrow: 1 }}>
                <Editor
                  height="100%"
                  theme="vs-dark"
                  language={appState.selectedLanguage === 'cpp' ? 'cpp' : appState.selectedLanguage}
                  value={code}
                  onChange={val => setCode(val)}
                  options={{ minimap: { enabled: false }, fontSize: 14, fontFamily: 'var(--font-code)' }}
                />
              </div>
            </div>

            {/* Console Output & Complexity Card */}
            <div className="card" style={{ height: '260px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-glass)', background: 'rgba(0,0,0,0.1)' }}>
                <div style={{ display: 'flex' }}>
                  <button 
                    className={`console-tab ${activeTab === 'output' ? 'active' : ''}`}
                    onClick={() => setActiveTab('output')}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: '10px 16px',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      color: activeTab === 'output' ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                      cursor: 'pointer',
                      borderBottom: activeTab === 'output' ? '2px solid var(--accent-cyan)' : '2px solid transparent'
                    }}
                  >
                    💻 Output
                  </button>
                  <button 
                    className={`console-tab ${activeTab === 'complexity' ? 'active' : ''}`}
                    onClick={() => {
                      setActiveTab('complexity');
                      handleAnalyzeComplexity();
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: '10px 16px',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      color: activeTab === 'complexity' ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                      cursor: 'pointer',
                      borderBottom: activeTab === 'complexity' ? '2px solid var(--accent-cyan)' : '2px solid transparent'
                    }}
                  >
                    📊 Complexity
                  </button>
                </div>
              </div>

              <div style={{ flexGrow: 1, padding: '16px', overflowY: 'auto' }}>
                {activeTab === 'output' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Console Output</div>
                    <div style={{ fontFamily: 'monospace', fontSize: '0.82rem', color: 'var(--text-secondary)', whiteSpace: 'pre-wrap' }}>
                      {output || 'Run or submit code to check live results...'}
                    </div>
                  </div>
                )}

                {activeTab === 'complexity' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                      <div style={{
                        flex: '1 1 120px',
                        background: 'rgba(255, 255, 255, 0.02)',
                        border: '1px solid var(--border-glass)',
                        borderRadius: 'var(--radius-sm)',
                        padding: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                      }}>
                        <div style={{ fontSize: '1.5rem' }}>⏱️</div>
                        <div>
                          <div style={{ fontSize: '0.68rem', color: 'var(--text-secondary)' }}>Time Complexity</div>
                          <div style={{ 
                            fontSize: '1.1rem', 
                            fontWeight: 800, 
                            color: 'var(--accent-cyan)',
                            fontFamily: 'var(--font-code)' 
                          }}>
                            {complexityResult.timeComplexity}
                          </div>
                        </div>
                      </div>

                      <div style={{
                        flex: '1 1 120px',
                        background: 'rgba(255, 255, 255, 0.02)',
                        border: '1px solid var(--border-glass)',
                        borderRadius: 'var(--radius-sm)',
                        padding: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                      }}>
                        <div style={{ fontSize: '1.5rem' }}>💾</div>
                        <div>
                          <div style={{ fontSize: '0.68rem', color: 'var(--text-secondary)' }}>Space Complexity</div>
                          <div style={{ 
                            fontSize: '1.1rem', 
                            fontWeight: 800, 
                            color: 'var(--accent-purple)',
                            fontFamily: 'var(--font-code)' 
                          }}>
                            {complexityResult.spaceComplexity}
                          </div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <button 
                          className="btn btn-secondary btn-sm" 
                          onClick={() => handleAnalyzeComplexity()} 
                          disabled={isAnalyzing || !code}
                          style={{ padding: '6px 12px', fontSize: '0.75rem' }}
                        >
                          {isAnalyzing ? '⏳' : '🔄 Re-Analyze'}
                        </button>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '20px', flexDirection: 'row', flexWrap: 'wrap' }}>
                      <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                            Scaling Curves
                          </label>
                          <span style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>
                            N: <strong style={{ color: 'var(--accent-cyan)', fontFamily: 'var(--font-code)' }}>{inputN}</strong>
                          </span>
                        </div>

                        <input 
                          type="range"
                          min="1"
                          max="100"
                          value={inputN}
                          onChange={e => setInputN(parseInt(e.target.value))}
                          style={{ 
                            width: '100%', 
                            accentColor: 'var(--accent-cyan)', 
                            cursor: 'pointer',
                            background: 'rgba(255,255,255,0.06)',
                            height: '5px',
                            borderRadius: '3px'
                          }}
                        />

                        <ComplexityPlotter activeComplexity={complexityResult.timeComplexity} n={inputN} />
                      </div>

                      <div style={{ flex: '1 1 200px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div>
                          <h4 style={{ fontSize: '0.8rem', margin: '0 0 4px 0', color: 'var(--text-primary)' }}>Analysis Summary</h4>
                          <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.45 }}>
                            {complexityResult.explanation}
                          </p>
                        </div>

                        <div>
                          <h4 style={{ fontSize: '0.8rem', margin: '0 0 6px 0', color: 'var(--text-primary)' }}>Derivation Steps</h4>
                          <ul style={{ paddingLeft: '14px', margin: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            {complexityResult.steps && complexityResult.steps.map((step, idx) => (
                              <li key={idx} style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.35 }}>
                                {step}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {complexityResult.optimizedSuggestion && (
                          <div style={{
                            background: 'rgba(255, 109, 0, 0.05)',
                            border: '1px solid rgba(255, 109, 0, 0.2)',
                            borderRadius: 'var(--radius-sm)',
                            padding: '10px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '3px'
                          }}>
                            <div style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--accent-orange)' }}>
                              💡 Optimization Tip
                            </div>
                            <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', lineHeight: 1.35 }}>
                              {complexityResult.optimizedSuggestion}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      )}

      {/* 4. FINISHED STATE SCREEN */}
      {duelState === 'finished' && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexGrow: 1, gap: '20px' }}>
          <div style={{ fontSize: '3.5rem' }}>{winner === 'You' || winner === user?.name ? '🏆' : '💀'}</div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: 0 }}>
            {winner === 'You' || winner === user?.name ? 'Victory! You Won!' : 'Defeat! Opponent Won!'}
          </h2>
          <p style={{ color: 'var(--text-secondary)', textAlign: 'center', maxWidth: '350px', fontSize: '0.85rem' }}>
            Winner: <strong>{winner}</strong>
          </p>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="btn btn-primary" onClick={findMatch} style={{ padding: '8px 24px', borderRadius: '50px' }}>
              Find Another Match
            </button>
            <button className="btn btn-secondary" onClick={() => setDuelState('lobby')} style={{ padding: '8px 24px', borderRadius: '50px' }}>
              Back to Lobby
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
