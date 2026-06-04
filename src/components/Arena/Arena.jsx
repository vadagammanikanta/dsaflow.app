import React, { useState, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { problems } from '../../../modules/arena/problems';
import { useApp } from '../../context/AppContext';

export default function Arena() {
  const { appState, updateAppState } = useApp();
  const [activeProblemId, setActiveProblemId] = useState(problems[0].id);
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState('testcases');
  const [customInput, setCustomInput] = useState('');
  const [explainResult, setExplainResult] = useState('');
  const [explainLoading, setExplainLoading] = useState(false);
  const [showExplain, setShowExplain] = useState(false);
  
  const activeProblem = problems.find(p => p.id === activeProblemId);
  const descRef = useRef(null);

  useEffect(() => {
    if (activeProblem) {
      setCode(activeProblem.starterCode[appState.selectedLanguage] || '');
      if (descRef.current) {
        descRef.current.innerHTML = activeProblem.content
          .replace(/^# (.*$)/gim, '<h1>$1</h1>')
          .replace(/^### (.*$)/gim, '<h3>$1</h3>')
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          .replace(/`(.*?)`/g, '<code>$1</code>')
          .replace(/\n/g, '<br>');
      }
    }
  }, [activeProblem, appState.selectedLanguage]);

  const handleRunCode = async () => {
    setIsRunning(true);
    const runTab = activeTab; // Capture current tab state
    setActiveTab('output');
    
    // Check if we are running a custom stdin input
    if (runTab === 'custominput' && customInput.trim().length > 0) {
      setOutput('⏳ Running with custom input...');
      try {
        const res = await fetch('/api/execute', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            language: appState.selectedLanguage,
            code: code,
            driver: activeProblem.drivers[appState.selectedLanguage],
            stdin: customInput
          })
        });
        
        const data = await res.json();
        
        if (data.success) {
          setOutput(`Custom Input Run: ✅ Success\n\nOutput:\n${data.output}`);
        } else {
          setOutput(`Custom Input Run: ❌ Error\n\n${data.error || data.stderr || ''}`);
        }
      } catch (err) {
        setOutput(`Execution failed: ${err.message}`);
      } finally {
        setIsRunning(false);
      }
      return;
    }

    // Default: Run standard test cases
    setOutput('⏳ Running test cases...');
    
    try {
      const results = [];
      const publicCases = activeProblem.testCases.filter(tc => !tc.isHidden);
      
      for (let i = 0; i < publicCases.length; i++) {
        const tc = publicCases[i];
        const res = await fetch('/api/execute', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            language: appState.selectedLanguage,
            code: code,
            driver: activeProblem.drivers[appState.selectedLanguage],
            stdin: tc.input
          })
        });
        
        const data = await res.json();
        
        if (!data.success) {
          results.push(`Test Case ${i+1}: ❌ Error\n${data.error || data.stderr || ''}`);
          continue;
        }

        const outStr = (data.output || '').trim();
        const expStr = tc.expectedOutput.trim();
        
        if (outStr === expStr) {
          results.push(`Test Case ${i+1}: ✅ Passed`);
        } else {
          results.push(`Test Case ${i+1}: ❌ Failed\n\nInput:\n${tc.input}\n\nExpected:\n${expStr}\n\nGot:\n${outStr}`);
        }
      }
      
      setOutput(results.join('\n\n════════════════════════════════\n\n'));
    } catch (err) {
      setOutput(`Execution failed: ${err.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  const handleExplainCode = async () => {
    setExplainLoading(true);
    setShowExplain(true);
    setExplainResult('');
    try {
      const res = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{
            role: 'user',
            content: `Explain this ${appState.selectedLanguage} code for the problem "${activeProblem.title}" in simple terms. Break it down step by step, explain the algorithm, and state the time and space complexity:\n\n\`\`\`${appState.selectedLanguage}\n${code}\n\`\`\``
          }]
        })
      });
      const data = await res.json();
      setExplainResult(data.reply || 'Could not explain code.');
    } catch (err) {
      setExplainResult('Error: ' + err.message);
    } finally {
      setExplainLoading(false);
    }
  };

  return (
    <div className="arena-workspace">
      
      {/* Left Pane: Problem Description */}
      <div className="arena-left-pane">
        <div className="problem-selector-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', flexWrap: 'wrap', gap: '6px' }}>
            <label style={{ fontWeight: 600, fontSize: '0.85rem' }}>Select Problem:</label>
            <span style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', background: 'rgba(0, 229, 255, 0.06)', padding: '2px 8px', borderRadius: '50px', border: '1px solid rgba(0, 229, 255, 0.18)', fontWeight: '600' }}>
              📢 All problems will be added soon!
            </span>
          </div>
          <select 
            className="algorithm-selector"
            value={activeProblemId}
            onChange={(e) => setActiveProblemId(e.target.value)}
            style={{ width: '100%' }}
          >
            {problems.map(p => (
              <option key={p.id} value={p.id}>
                {p.title} ({p.difficulty})
              </option>
            ))}
          </select>
        </div>
        <div 
          ref={descRef} 
          className="problem-content" 
          style={{ color: 'var(--text-secondary)', padding: '20px', overflowY: 'auto' }}
        />
      </div>

      {/* Resize Handle 1 (Horizontal) */}
      <div className="arena-resize-handle" id="arena-handle-1"></div>

      {/* Right Container: Editor & Output */}
      <div className="arena-right-container">
        
        {/* Top Right Pane: Code Editor */}
        <div className="arena-top-right-pane">
          <div className="editor-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <label style={{ fontWeight: 600, fontSize: '0.88rem' }}>Language:</label>
              <select 
                className="algorithm-selector"
                value={appState.selectedLanguage}
                onChange={(e) => updateAppState({ selectedLanguage: e.target.value })}
                style={{ padding: '4px 8px', fontSize: '0.85rem' }}
              >
                <option value="javascript">⚡ JavaScript</option>
                <option value="python">🐍 Python</option>
                <option value="cpp">⚙️ C++</option>
                <option value="java">☕ Java</option>
              </select>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button className="btn btn-secondary btn-sm" onClick={handleExplainCode} style={{ padding: '4px 10px', fontSize: '0.8rem', background: 'var(--accent-purple-glow)', borderColor: 'rgba(124,77,255,0.3)', color: 'var(--accent-purple)' }} disabled={!code.trim() || explainLoading}>
                🧠 Explain Code
              </button>
              <button 
                className="btn btn-secondary btn-sm" 
                onClick={() => setCode(activeProblem.starterCode[appState.selectedLanguage] || '')}
                style={{ padding: '4px 10px', fontSize: '0.8rem' }}
              >
                🔄 Reset
              </button>
            </div>
          </div>
          <div className="arena-editor-canvas">
            <Editor
              height="100%"
              theme="vs-dark"
              language={appState.selectedLanguage === 'cpp' ? 'cpp' : appState.selectedLanguage}
              value={code}
              onChange={val => setCode(val)}
              options={{ 
                minimap: { enabled: false }, 
                fontSize: 14, 
                fontFamily: 'var(--font-code)' 
              }}
            />
          </div>
        </div>

        {/* Resize Handle 2 (Vertical) */}
        <div className="arena-resize-handle-v" id="arena-handle-2"></div>

        {/* Bottom Right Pane: Console & Output */}
        <div className="arena-bottom-right-pane">
          <div className="console-tabs-header">
            <div className="console-tabs">
              <button 
                className={`console-tab ${activeTab === 'testcases' ? 'active' : ''}`}
                onClick={() => setActiveTab('testcases')}
              >
                📋 Test Cases
              </button>
              <button 
                className={`console-tab ${activeTab === 'custominput' ? 'active' : ''}`}
                onClick={() => setActiveTab('custominput')}
              >
                ⌨️ Custom Input
              </button>
              <button 
                className={`console-tab ${activeTab === 'output' ? 'active' : ''}`}
                onClick={() => setActiveTab('output')}
              >
                💻 Result
              </button>
            </div>
            <div className="console-actions">
              <button 
                className="btn btn-accent" 
                onClick={handleRunCode}
                disabled={isRunning}
                style={{ padding: '6px 16px', fontSize: '0.82rem' }}
              >
                {isRunning ? '⏳ Running...' : '▶ Run Code'}
              </button>
            </div>
          </div>

          <div className="console-tab-body">
            {/* Test Cases */}
            {activeTab === 'testcases' && (
              <div className="console-tab-content active" id="arena-tab-testcases">
                <div className="testcase-list">
                  {activeProblem?.testCases.filter(t => !t.isHidden).map((tc, idx) => (
                    <div key={idx} className="testcase-item">
                      <div className="testcase-title">Case {idx + 1}</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginBottom: '2px' }}>Input:</div>
                      <div className="testcase-io">{tc.input}</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginBottom: '2px' }}>Expected Output:</div>
                      <div className="testcase-io">{tc.expectedOutput}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Custom Input */}
            {activeTab === 'custominput' && (
              <div className="console-tab-content" id="arena-tab-custominput">
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  Provide stdin input parameters (one per line):
                </label>
                <textarea 
                  id="arena-custom-input-val" 
                  className="text-input console-textarea" 
                  placeholder="e.g.&#10;[2,7,11,15]&#10;9"
                  value={customInput}
                  onChange={e => setCustomInput(e.target.value)}
                />
              </div>
            )}

            {/* Output */}
            {activeTab === 'output' && (
              <div className="console-tab-content" id="arena-tab-output">
                <div id="arena-output-status" className="arena-status-badge">
                  {isRunning ? '⏳ Executing...' : 'Execution result:'}
                </div>
                <div id="arena-output-val" className="console-output">
                  {output || 'Run code to see execution result...'}
                </div>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Explain Code Modal */}
      {showExplain && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }} onClick={() => setShowExplain(false)}>
          <div style={{ background: '#0d1117', border: '1px solid rgba(124,77,255,0.3)', borderRadius: '20px', padding: '28px 28px 24px', maxWidth: '560px', width: '92%', maxHeight: '80vh', overflowY: 'auto', position: 'relative' }} onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowExplain(false)} style={{ position: 'absolute', top: '16px', right: '16px', background: 'rgba(255,255,255,0.05)', border: 'none', color: '#94a3b8', borderRadius: '8px', padding: '6px 10px', cursor: 'pointer' }}>✕</button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <span style={{ fontSize: '1.5rem' }}>🧠</span>
              <div>
                <h3 style={{ margin: 0, fontSize: '1rem', color: '#f1f5f9' }}>Code Explanation</h3>
                <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748b' }}>Powered by Groq AI</p>
              </div>
            </div>
            {explainLoading ? (
              <div style={{ textAlign: 'center', padding: '32px', color: '#94a3b8' }}>
                <div style={{ fontSize: '2rem', marginBottom: '12px', animation: 'spin 1s linear infinite', display: 'inline-block' }}>⏳</div>
                <p>Analyzing your code...</p>
              </div>
            ) : (
              <div style={{ color: '#cbd5e1', fontSize: '0.875rem', lineHeight: 1.7, whiteSpace: 'pre-wrap', fontFamily: 'var(--font-main)' }}>
                {explainResult}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
