import { problems } from './problems.js';

let editor = null;
let activeProblem = null;
let selectedLanguage = 'javascript';
let isInitializing = false;

// Simple markdown-to-HTML parser for problem descriptions
function renderMarkdown(md) {
  if (!md) return '';
  return md
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/__(.*?)__/g, '<strong>$1</strong>')
    .replace(/`(.*?)`/g, '<code>$1</code>')
    .replace(/```([a-z]*)\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>')
    .replace(/\n/g, '<br>');
}

export function initArena() {
  const select = document.getElementById('arena-problem-select');
  if (!select) return;

  // 1. Populate problems selector dropdown
  if (select.children.length === 0) {
    problems.forEach(p => {
      const opt = document.createElement('option');
      opt.value = p.id;
      opt.textContent = `${p.title} (${p.difficulty})`;
      select.appendChild(opt);
    });
  }

  // 2. Select first problem by default
  if (!activeProblem) {
    loadProblem(problems[0].id);
  }

  // 3. Set up event listeners (once)
  if (!isInitializing) {
    isInitializing = true;
    setupResizeHandlers();
    setupConsoleTabHandlers();
    setupButtons();

    select.addEventListener('change', e => loadProblem(e.target.value));
    
    document.getElementById('arena-lang-select').addEventListener('change', e => {
      selectedLanguage = e.target.value;
      updateLanguageAndStarterCode();
    });
  }

  // 4. Load Monaco Editor (via CDN loader)
  initMonaco();
}

function loadProblem(problemId) {
  activeProblem = problems.find(p => p.id === problemId);
  if (!activeProblem) return;

  // Render markdown description
  const contentEl = document.getElementById('arena-problem-content');
  contentEl.innerHTML = renderMarkdown(activeProblem.content);

  // Render test cases list in console
  renderTestcasesList();

  // Load starter code
  updateLanguageAndStarterCode();
}

function renderTestcasesList() {
  const container = document.getElementById('arena-testcase-list');
  if (!container || !activeProblem) return;

  container.innerHTML = activeProblem.testCases
    .filter(tc => !tc.isHidden) // Only show public test cases
    .map((tc, idx) => `
      <div class="testcase-item">
        <div class="testcase-title">Case ${idx + 1}</div>
        <div style="font-size:0.8rem; color:var(--text-secondary); margin-bottom:4px;">Input:</div>
        <div class="testcase-io">${tc.input.replace(/\n/g, ' <br> ')}</div>
        <div style="font-size:0.8rem; color:var(--text-secondary); margin-bottom:4px;">Expected Output:</div>
        <div class="testcase-io">${tc.expectedOutput}</div>
      </div>
    `).join('');
}

function updateLanguageAndStarterCode() {
  if (!editor || !activeProblem) return;

  const code = activeProblem.starterCode[selectedLanguage] || '';
  editor.setValue(code);

  // Update Monaco language model syntax highlighting
  const model = editor.getModel();
  if (model) {
    const monacoLang = selectedLanguage === 'cpp' ? 'cpp' : selectedLanguage === 'java' ? 'java' : selectedLanguage === 'python' ? 'python' : 'javascript';
    monaco.editor.setModelLanguage(model, monacoLang);
  }
}

function initMonaco() {
  const container = document.getElementById('arena-editor-container');
  if (!container) return;

  if (editor) {
    // Monaco is already loaded, just adjust layout size
    setTimeout(() => editor.layout(), 100);
    return;
  }

  // If Monaco loader is loaded via CDN, configure and load it
  if (window.monaco) {
    createEditor();
  } else if (window.require) {
    window.require.config({ paths: { vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.39.0/min/vs' } });
    window.require(['vs/editor/editor.main'], () => {
      createEditor();
    });
  } else {
    // Fallback if load is slow
    container.innerHTML = '<div style="color:var(--text-muted); padding:20px;">Loading Monaco Editor from CDN...</div>';
    setTimeout(initMonaco, 500);
  }
}

function createEditor() {
  const container = document.getElementById('arena-editor-container');
  if (!container) return;
  container.innerHTML = ''; // clear loading text

  const initialCode = activeProblem ? activeProblem.starterCode[selectedLanguage] : '';
  const monacoLang = selectedLanguage === 'cpp' ? 'cpp' : selectedLanguage === 'java' ? 'java' : selectedLanguage === 'python' ? 'python' : 'javascript';

  editor = monaco.editor.create(container, {
    value: initialCode,
    language: monacoLang,
    theme: 'vs-dark',
    fontSize: 14,
    fontFamily: 'var(--font-code)',
    minimap: { enabled: false },
    automaticLayout: true,
    wordWrap: 'on',
    lineNumbersMinChars: 3,
    scrollbar: {
      verticalScrollbarSize: 8,
      horizontalScrollbarSize: 8
    }
  });

  // Re-layout on tab selection
  window.addEventListener('resize', () => editor.layout());
}

// ── RESIZER LOGIC ───────────────────────────────────────────────────
function setupResizeHandlers() {
  const handle1 = document.getElementById('arena-handle-1');
  const handle2 = document.getElementById('arena-handle-2');
  const workspace = document.querySelector('.arena-workspace');
  const leftPane = document.querySelector('.arena-left-pane');
  const rightContainer = document.querySelector('.arena-right-container');
  const topPane = document.querySelector('.arena-top-right-pane');
  const bottomPane = document.querySelector('.arena-bottom-right-pane');

  // Column resize (horizontal)
  handle1.addEventListener('mousedown', e => {
    e.preventDefault();
    handle1.classList.add('active');
    
    const onMouseMove = moveEvent => {
      const workspaceRect = workspace.getBoundingClientRect();
      const offsetLeft = moveEvent.clientX - workspaceRect.left;
      const pct = (offsetLeft / workspaceRect.width) * 100;
      
      if (pct > 20 && pct < 80) {
        leftPane.style.flex = `0 0 ${pct}%`;
        leftPane.style.maxWidth = `${pct}%`;
      }
    };
    
    const onMouseUp = () => {
      handle1.classList.remove('active');
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      if (editor) editor.layout();
    };
    
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  // Row resize (vertical)
  handle2.addEventListener('mousedown', e => {
    e.preventDefault();
    handle2.classList.add('active');
    
    const onMouseMove = moveEvent => {
      const containerRect = rightContainer.getBoundingClientRect();
      const offsetTop = moveEvent.clientY - containerRect.top;
      const height = containerRect.height - offsetTop;
      const pct = (height / containerRect.height) * 100;
      
      if (pct > 15 && pct < 80) {
        bottomPane.style.height = `${height}px`;
      }
    };
    
    const onMouseUp = () => {
      handle2.classList.remove('active');
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      if (editor) editor.layout();
    };
    
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
}

// ── CONSOLE TAB NAVIGATION ──────────────────────────────────────────
function setupConsoleTabHandlers() {
  const tabs = document.querySelectorAll('.console-tab');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      const target = tab.dataset.tab;
      document.getElementById('arena-tab-testcases').style.display = target === 'testcases' ? 'block' : 'none';
      document.getElementById('arena-tab-custominput').style.display = target === 'custominput' ? 'block' : 'none';
      document.getElementById('arena-tab-output').style.display = target === 'output' ? 'block' : 'none';
    });
  });
}

function switchConsoleTab(tabName) {
  const tab = document.querySelector(`.console-tab[data-tab="${tabName}"]`);
  if (tab) tab.click();
}

// ── RUN CODE & SUBMIT ───────────────────────────────────────────────
function setupButtons() {
  document.getElementById('btn-arena-reset').addEventListener('click', () => {
    if (confirm('Are you sure you want to reset your code to the default template?')) {
      updateLanguageAndStarterCode();
    }
  });

  document.getElementById('btn-arena-run').addEventListener('click', () => runCode(false));
  document.getElementById('btn-arena-submit').addEventListener('click', () => runCode(true));
  document.getElementById('btn-arena-ask-ai').addEventListener('click', askAiTutor);
}

async function runCode(isSubmit = false) {
  if (!editor || !activeProblem) return;

  const runBtn = document.getElementById('btn-arena-run');
  const submitBtn = document.getElementById('btn-arena-submit');
  const statusEl = document.getElementById('arena-output-status');
  const outputEl = document.getElementById('arena-output-val');

  runBtn.disabled = true;
  submitBtn.disabled = true;
  statusEl.className = 'arena-status-badge warning';
  statusEl.textContent = '⏳ Compiling and Running...';
  outputEl.textContent = '';
  
  switchConsoleTab('output');

  try {
    const userCode = editor.getValue();
    const testCasesToRun = isSubmit ? activeProblem.testCases : activeProblem.testCases.slice(0, 1);
    
    let totalCases = testCasesToRun.length;
    let passedCases = 0;
    let errorOccurred = false;

    // We execute each testcase sequentially against the Piston backend
    for (let i = 0; i < totalCases; i++) {
      const tc = testCasesToRun[i];
      const stdin = tc.input;
      
      // Concat user code with driver code
      const driver = activeProblem.drivers[selectedLanguage] || '';
      const fullCode = userCode + '\n' + driver;

      const res = await fetch('/api/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ language: selectedLanguage, code: fullCode, stdin })
      });

      if (!res.ok) {
        throw new Error(await res.text());
      }

      const runResult = await res.json();
      
      if (runResult.status !== 'Success') {
        // compilation or runtime error
        statusEl.className = 'arena-status-badge error';
        statusEl.textContent = `❌ ${runResult.status}`;
        outputEl.textContent = runResult.error || runResult.stderr || runResult.output;
        errorOccurred = true;
        break;
      }

      const actualOut = runResult.stdout.trim();
      const expectedOut = tc.expectedOutput.trim();

      if (actualOut === expectedOut) {
        passedCases++;
      } else {
        // Failed case details
        statusEl.className = 'arena-status-badge error';
        statusEl.textContent = `❌ Wrong Answer (Test Case ${i+1}/${totalCases})`;
        
        let printOutput = `Failed Test Case Input:\n${tc.input}\n\n`;
        printOutput += `Expected Output:\n${expectedOut}\n\n`;
        printOutput += `Actual Output:\n${actualOut}\n`;
        if (runResult.stderr) {
          printOutput += `\nStderr:\n${runResult.stderr}\n`;
        }
        
        outputEl.textContent = printOutput;
        errorOccurred = true;
        
        // Cache failed test case info on the editor container for Socratic AI reference
        const container = document.getElementById('arena-editor-container');
        container.dataset.failedInput = tc.input;
        container.dataset.failedExpected = expectedOut;
        container.dataset.failedActual = actualOut;
        break;
      }
    }

    if (!errorOccurred) {
      statusEl.className = 'arena-status-badge success';
      statusEl.textContent = isSubmit 
        ? `🏆 Accepted! Passed all ${passedCases}/${totalCases} test cases!`
        : `✅ Test Case Passed! (1/1)`;
      outputEl.textContent = isSubmit
        ? 'All test cases passed. Excellent job! Double-check time complexity optimizations.'
        : `Output:\n${activeProblem.testCases[0].expectedOutput}`;
        
      // Clean up failed case cache
      const container = document.getElementById('arena-editor-container');
      delete container.dataset.failedInput;
      delete container.dataset.failedExpected;
      delete container.dataset.failedActual;
    }

  } catch (err) {
    statusEl.className = 'arena-status-badge error';
    statusEl.textContent = '❌ System Error';
    outputEl.textContent = `Failed to execute: ${err.message}`;
  } finally {
    runBtn.disabled = false;
    submitBtn.disabled = false;
  }
}

// ── SOCRATIC AI TUTOR (Gemini Integration) ──────────────────────────
async function askAiTutor() {
  if (!editor || !activeProblem) return;

  const btn = document.getElementById('btn-arena-ask-ai');
  const chatWindow = document.getElementById('ai-chat-window');
  const chatMessages = document.getElementById('ai-chat-messages');

  btn.disabled = true;
  btn.textContent = '🤖 Thinking...';

  // Gather failed testcase details
  const editorContainer = document.getElementById('arena-editor-container');
  const failedInput = editorContainer.dataset.failedInput || activeProblem.testCases[0].input;
  const failedExpected = editorContainer.dataset.failedExpected || activeProblem.testCases[0].expectedOutput;
  const failedActual = editorContainer.dataset.failedActual || 'Not run / Compilation error';

  const userCode = editor.getValue();

  const prompt = `Here is my code and the test case I'm failing for the problem.

Problem: ${activeProblem.title}
Difficulty: ${activeProblem.difficulty}
Description:
${activeProblem.content}

My Code (${selectedLanguage}):
\`\`\`${selectedLanguage}
${userCode}
\`\`\`

Failed Test Case Input:
${failedInput}

Expected Output:
${failedExpected}

Actual Output/Error:
${failedActual}

Please help me debug this conceptually.`;

  const SOCRATIC_INSTRUCTION = `You are 'dsa.flow Socratic Guide', a world-class computer science interviewer and elite DSA tutor.
Your mission is to help the student debug and understand their code's logical errors, complexity issues, or missed edge cases.
Rules:
1. You are STRICTLY FORBIDDEN from generating corrected code, solutions, or refactored functions.
2. Under no circumstance should you write any code blocks that provide the direct fix.
3. Instead, explain the conceptual bug or logic flaw using Socratic questioning.
4. Ask 1-2 thought-provoking questions that guide the user to spot the mistake themselves.
5. Focus on the boundary conditions, index out-of-bounds, or wrong conditions they used.`;

  try {
    const response = await fetch('/api/gemini', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SOCRATIC_INSTRUCTION }] },
        contents: [
          {
            role: 'user',
            parts: [{ text: prompt }]
          }
        ],
        generationConfig: {
          temperature: 0.6,
          maxOutputTokens: 600,
        }
      })
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    const data = await response.json();
    const aiResponse = data.candidates[0].content.parts[0].text;

    // Open Chatbot overlay if closed
    if (chatWindow.style.display === 'none') {
      chatWindow.style.display = 'flex';
    }

    // Append AI tutor response directly to Chatbot messages list
    const tutorDiv = document.createElement('div');
    tutorDiv.className = 'chat-msg msg-ai';
    
    // Parse markdown briefly
    let formattedText = aiResponse
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/`(.*?)`/g, '<code>$1</code>');
    if (formattedText.includes('```')) {
      const parts = formattedText.split('```');
      formattedText = parts.map((p, i) => i % 2 !== 0 ? `<pre><code>${p.trim()}</code></pre>` : p).join('');
    }
    tutorDiv.innerHTML = `<strong>🎓 Socratic Tutor on "${activeProblem.title}":</strong><br>${formattedText}`;
    
    chatMessages.appendChild(tutorDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;

  } catch (err) {
    console.error("AI Tutor request failed:", err);
    alert("AI Tutor request failed: " + err.message);
  } finally {
    btn.disabled = false;
    btn.textContent = '🤖 Ask AI for Help';
  }
}
