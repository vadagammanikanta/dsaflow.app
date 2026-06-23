import React, { useState, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import ComplexityPlotter, { analyzeCodeComplexityLocally } from '../Visualizer/ComplexityPlotter';


const defaultVFS = [
  { id: 'root', type: 'folder', name: 'root', parentId: null },
  { id: 'basics', type: 'folder', name: 'Basics', parentId: 'root' },
  { id: 'cpp-basics', type: 'file', name: 'Cpp_Basics.py', content: 'print("Cpp Basics")', parentId: 'basics' },
  { id: 'hello-py', type: 'file', name: 'hello.py', content: 'print("hello")', parentId: 'root' },
  { id: 'io-java', type: 'file', name: 'Input_Output.java', content: 'public class Input_Output {\n  public static void main(String[] args) {\n    System.out.println("Hello");\n  }\n}', parentId: 'root' },
  { id: 'io-py', type: 'file', name: 'Input_Output.py', content: 'print("Hello")', parentId: 'root' },
  { id: 'main-js', type: 'file', name: 'main.js', content: 'console.log("Hello");', parentId: 'root' }
];

export default function WebIDE() {
  const [files, setFiles] = useState(() => {
    const saved = localStorage.getItem('dsaflow_vfs');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.length > 0) return parsed;
      } catch (e) {}
    }
    return defaultVFS;
  });

  const [activeFileId, setActiveFileId] = useState(() => {
    return localStorage.getItem('dsaflow_ide_active_file') || 'main-js';
  });

  const [expandedFolders, setExpandedFolders] = useState(() => {
    const defaultVal = ['basics'];
    const activeId = localStorage.getItem('dsaflow_ide_active_file') || 'main-js';
    let initialFiles = defaultVFS;
    const saved = localStorage.getItem('dsaflow_vfs');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.length > 0) initialFiles = parsed;
      } catch (e) {}
    }
    const fileObj = initialFiles.find(f => f.id === activeId);
    if (fileObj && fileObj.parentId && fileObj.parentId !== 'root') {
      if (!defaultVal.includes(fileObj.parentId)) {
        defaultVal.push(fileObj.parentId);
      }
    }
    return defaultVal;
  });

  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState('');
  
  // Custom execution state
  const [customInput, setCustomInput] = useState('');
  const [output, setOutput] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const [activeConsoleTab, setActiveConsoleTab] = useState('ide-custominput'); // 'ide-custominput', 'ide-output', or 'ide-complexity'

  // Complexity calculation state
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

  // Resize Panel State
  const [leftWidth, setLeftWidth] = useState(320);
  const [bottomHeight, setBottomHeight] = useState(250);
  const containerRef = useRef(null);

  const handleAnalyzeComplexity = async (codeToAnalyze = activeFile?.content) => {
    if (!codeToAnalyze) return;
    setIsAnalyzing(true);
    try {
      const response = await fetch('/api/complexity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: codeToAnalyze,
          language: getLanguageFromExtension(activeFile?.name),
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
      console.warn('[WebIDE] falling back to local complexity static rules:', err.message);
      const localResult = analyzeCodeComplexityLocally(codeToAnalyze, getLanguageFromExtension(activeFile?.name));
      setComplexityResult(localResult);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Derived state for the currently active file
  const activeFile = files.find(f => f.id === activeFileId && f.type === 'file');

  // Sync VFS to local storage
  const saveVFS = (newFiles) => {
    setFiles(newFiles);
    localStorage.setItem('dsaflow_vfs', JSON.stringify(newFiles));
  };

  // Sync active file ID to localStorage
  useEffect(() => {
    if (activeFileId) {
      localStorage.setItem('dsaflow_ide_active_file', activeFileId);
    } else {
      localStorage.removeItem('dsaflow_ide_active_file');
    }
  }, [activeFileId]);

  // Load from localStorage on mount and listen to custom open file event
  useEffect(() => {
    const handleOpenFile = (e) => {
      let activeVFS = files;
      const saved = localStorage.getItem('dsaflow_vfs');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setFiles(parsed);
          activeVFS = parsed;
        } catch (err) {}
      }
      if (e.detail && e.detail.id) {
        setActiveFileId(e.detail.id);
        localStorage.setItem('dsaflow_ide_active_file', e.detail.id);
        // If file has parent folder, auto-expand it
        const fileObj = activeVFS.find(f => f.id === e.detail.id);
        if (fileObj && fileObj.parentId && fileObj.parentId !== 'root') {
          setExpandedFolders(prev => prev.includes(fileObj.parentId) ? prev : [...prev, fileObj.parentId]);
        }
      }
    };
    window.addEventListener('ide_open_file', handleOpenFile);
    return () => window.removeEventListener('ide_open_file', handleOpenFile);
  }, [files]);

  // Drag handlers for horizontal resizing (left pane width)
  const handleMouseDownH = (e) => {
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = leftWidth;

    const handleMouseMove = (moveEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const containerWidth = containerRef.current ? containerRef.current.offsetWidth : window.innerWidth;
      const newWidth = Math.max(200, Math.min(containerWidth * 0.5, startWidth + deltaX));
      setLeftWidth(newWidth);
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  // Drag handlers for vertical resizing (bottom pane height)
  const handleMouseDownV = (e) => {
    e.preventDefault();
    const startY = e.clientY;
    const startHeight = bottomHeight;

    const handleMouseMove = (moveEvent) => {
      const deltaY = moveEvent.clientY - startY;
      const containerHeight = containerRef.current ? containerRef.current.offsetHeight : window.innerHeight;
      const newHeight = Math.max(100, Math.min(containerHeight * 0.7, startHeight - deltaY));
      setBottomHeight(newHeight);
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const getLanguageFromExtension = (filename) => {
    if (!filename) return 'plaintext';
    if (filename.endsWith('.js')) return 'javascript';
    if (filename.endsWith('.py')) return 'python';
    if (filename.endsWith('.java')) return 'java';
    if (filename.endsWith('.cpp') || filename.endsWith('.c')) return 'cpp';
    if (filename.endsWith('.go')) return 'go';
    if (filename.endsWith('.rs')) return 'rust';
    return 'plaintext';
  };

  const handleEditorChange = (newContent) => {
    const updated = files.map(file => 
      file.id === activeFileId ? { ...file, content: newContent } : file
    );
    saveVFS(updated);
  };

  const handleSave = () => {
    localStorage.setItem('dsaflow_vfs', JSON.stringify(files));
    alert('File saved successfully! 💾');
  };

  // Listen for Ctrl+S / Cmd+S to trigger save
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleSave();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [files]);

  // Code Execution API call
  const handleRunCode = async () => {
    if (!activeFile) return;
    
    setIsExecuting(true);
    setActiveConsoleTab('ide-output');
    setOutput('⏳ Compiling and Running...');
    
    // Save state
    localStorage.setItem('dsaflow_vfs', JSON.stringify(files));

    // Trigger complexity analysis in the background
    handleAnalyzeComplexity(activeFile.content);

    const payload = {
      language: getLanguageFromExtension(activeFile.name),
      code: activeFile.content,
      stdin: customInput
    };

    try {
      const response = await fetch('/api/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const result = await response.json();
      
      if (result.status === 'Success') {
        setOutput(result.output || 'Execution successful with no output.');
      } else if (result.status === 'Compilation Error') {
        setOutput(`❌ Compilation Error:\n\n${result.error || result.output || ''}`);
      } else if (result.status === 'Runtime Error') {
        setOutput(`⚠️ Runtime Error:\n\n${result.error || result.stderr || ''}`);
      } else {
        setOutput(`❌ ${result.error || result.status || 'Unknown error from compiler.'}`);
      }
    } catch (err) {
      setOutput(`❌ Could not reach the compiler.\n\nDetails: ${err.message}\n\nMake sure the dev server is running with: npm run dev`);
    } finally {
      setIsExecuting(false);
    }
  };

  // VFS File Actions
  const handleCreateFile = () => {
    const name = prompt('Enter filename (e.g. solution.js):');
    if (!name) return;
    
    const newFile = {
      id: Date.now().toString(),
      type: 'file',
      name: name,
      parentId: 'root',
      content: '// Write code here'
    };
    
    const updated = [...files, newFile];
    saveVFS(updated);
    setActiveFileId(newFile.id);
  };

  const handleCreateFolder = () => {
    const name = prompt('Enter folder name:');
    if (!name) return;
    
    const newFolder = {
      id: Date.now().toString(),
      type: 'folder',
      name: name,
      parentId: 'root'
    };
    
    const updated = [...files, newFolder];
    saveVFS(updated);
  };

  const handleDelete = (e, id) => {
    e.stopPropagation();
    if (!confirm('Are you sure you want to delete this?')) return;
    
    // Delete target file or folder, and also folder's contents
    const updated = files.filter(f => f.id !== id && f.parentId !== id);
    saveVFS(updated);
    
    if (activeFileId === id) {
      const remainingFiles = updated.filter(f => f.type === 'file');
      if (remainingFiles.length > 0) {
        setActiveFileId(remainingFiles[0].id);
      } else {
        setActiveFileId(null);
      }
    }
  };

  const toggleFolder = (id) => {
    setExpandedFolders(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  // Inline rename
  const startRename = (e, item) => {
    e.stopPropagation();
    setEditingId(item.id);
    setEditingName(item.name);
  };

  const finishRename = () => {
    if (!editingName.trim()) {
      setEditingId(null);
      return;
    }
    const updated = files.map(f => 
      f.id === editingId ? { ...f, name: editingName } : f
    );
    saveVFS(updated);
    setEditingId(null);
  };

  const handleRenameKeyDown = (e) => {
    if (e.key === 'Enter') finishRename();
    if (e.key === 'Escape') setEditingId(null);
  };

  const renderFileTreeItem = (item) => {
    const isFolder = item.type === 'folder';
    const isEditing = editingId === item.id;
    const isActive = activeFileId === item.id;

    if (isFolder) {
      const isExpanded = expandedFolders.includes(item.id);
      const childItems = files.filter(f => f.parentId === item.id);
      
      return (
        <div key={item.id} className="ide-folder">
          <div 
            className="ide-tree-item"
            onClick={() => toggleFolder(item.id)}
            onDoubleClick={(e) => startRename(e, item)}
          >
            <span className="ide-tree-icon">{isExpanded ? '📂' : '📁'}</span>
            {isEditing ? (
              <span className="ide-tree-item editing">
                <input 
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                  onBlur={finishRename}
                  onKeyDown={handleRenameKeyDown}
                  autoFocus
                  onClick={(e) => e.stopPropagation()}
                />
              </span>
            ) : (
              <span>{item.name}</span>
            )}
            <span 
              className="delete-btn" 
              onClick={(e) => handleDelete(e, item.id)}
              style={{ marginLeft: 'auto', opacity: 0.6, cursor: 'pointer' }}
            >
              ×
            </span>
          </div>
          {isExpanded && (
            <div className="ide-folder-contents">
              {childItems.map(child => renderFileTreeItem(child))}
            </div>
          )}
        </div>
      );
    } else {
      return (
        <div 
          key={item.id} 
          className={`ide-tree-item ${isActive ? 'active' : ''}`}
          onClick={() => setActiveFileId(item.id)}
          onDoubleClick={(e) => startRename(e, item)}
        >
          <span className="ide-tree-icon">📄</span>
          {isEditing ? (
            <span className="ide-tree-item editing">
              <input 
                value={editingName}
                onChange={(e) => setEditingName(e.target.value)}
                onBlur={finishRename}
                onKeyDown={handleRenameKeyDown}
                autoFocus
                onClick={(e) => e.stopPropagation()}
              />
            </span>
          ) : (
            <span>{item.name}</span>
          )}
          <span 
            className="delete-btn" 
            onClick={(e) => handleDelete(e, item.id)}
            style={{ marginLeft: 'auto', opacity: 0.6, cursor: 'pointer' }}
          >
            ×
          </span>
        </div>
      );
    }
  };

  const rootItems = files.filter(f => f.parentId === 'root' || f.parentId === null);

  return (
    <div className="arena-workspace" ref={containerRef}>
      
      {/* Left Pane: File Explorer */}
      <div className="arena-left-pane" style={{ width: `${leftWidth}px`, flex: '0 0 auto' }}>
        <div className="ide-explorer-header">
          <h3 style={{ fontSize: '0.9rem', margin: 0, color: 'var(--text-secondary)' }}>Explorer</h3>
          <div style={{ display: 'flex', gap: '4px' }}>
            <button 
              className="btn btn-secondary btn-icon" 
              onClick={handleCreateFile} 
              title="New File" 
              style={{ width: '26px', height: '26px', fontSize: '0.85rem' }}
            >
              📄
            </button>
            <button 
              className="btn btn-secondary btn-icon" 
              onClick={handleCreateFolder} 
              title="New Folder" 
              style={{ width: '26px', height: '26px', fontSize: '0.85rem' }}
            >
              📁
            </button>
          </div>
        </div>
        <div className="ide-file-tree" id="ide-file-tree" style={{ flexGrow: 1, overflowY: 'auto', padding: '12px 0' }}>
          {rootItems.map(item => renderFileTreeItem(item))}
        </div>
      </div>
      
      {/* Resize Handle 1 (Horizontal) */}
      <div 
        className="arena-resize-handle" 
        id="ide-handle-1"
        onMouseDown={handleMouseDownH}
      ></div>
      
      {/* Right Container: Editor + Console */}
      <div className="arena-right-container">
        
        {/* Top Right Pane: Code Editor */}
        <div className="arena-top-right-pane">
          <div className="editor-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span id="ide-current-filename" style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--text-primary)' }}>
                {activeFile ? `📄 ${activeFile.name}` : 'No file selected'}
              </span>
            </div>
            <div>
              <button 
                className="btn btn-secondary" 
                onClick={handleSave} 
                style={{ padding: '4px 10px', fontSize: '0.8rem', marginRight: '8px' }}
                disabled={!activeFile}
              >
                💾 Save
              </button>
              <button 
                className="btn btn-secondary" 
                onClick={(e) => handleDelete(e, activeFileId)} 
                style={{ padding: '4px 10px', fontSize: '0.8rem', color: 'var(--accent-rose)', borderColor: 'rgba(255, 23, 68, 0.2)' }}
                disabled={!activeFile}
              >
                🗑️ Delete
              </button>
            </div>
          </div>
          <div id="ide-editor-container" className="arena-editor-canvas">
            {activeFile ? (
              <Editor
                height="100%"
                theme="vs-dark"
                language={getLanguageFromExtension(activeFile.name)}
                value={activeFile.content}
                onChange={handleEditorChange}
                options={{ 
                  minimap: { enabled: false }, 
                  fontSize: 14,
                  fontFamily: 'var(--font-code)'
                }}
              />
            ) : (
              <div style={{ textAlign: 'center', paddingTop: '40px', color: 'var(--text-muted)' }}>
                Select or create a file from the explorer to start coding.
              </div>
            )}
          </div>
        </div>
        
        {/* Resize Handle 2 (Vertical) */}
        <div 
          className="arena-resize-handle-v" 
          id="ide-handle-2"
          onMouseDown={handleMouseDownV}
        ></div>
        
        {/* Bottom Right Pane: Console & Output */}
        <div className="arena-bottom-right-pane" style={{ height: `${bottomHeight}px` }}>
          <div className="console-tabs-header">
            <div className="console-tabs">
              <button 
                className={`console-tab ${activeConsoleTab === 'ide-custominput' ? 'active' : ''}`}
                onClick={() => setActiveConsoleTab('ide-custominput')}
              >
                ⌨️ Custom Input
              </button>
              <button 
                className={`console-tab ${activeConsoleTab === 'ide-output' ? 'active' : ''}`}
                onClick={() => setActiveConsoleTab('ide-output')}
              >
                💻 Output
              </button>
              <button 
                className={`console-tab ${activeConsoleTab === 'ide-complexity' ? 'active' : ''}`}
                onClick={() => {
                  setActiveConsoleTab('ide-complexity');
                  handleAnalyzeComplexity();
                }}
              >
                📊 Complexity
              </button>
            </div>
            <div className="console-actions">
              <button 
                className="btn btn-accent" 
                onClick={handleRunCode} 
                disabled={isExecuting || !activeFile}
                style={{ padding: '6px 16px', fontSize: '0.82rem' }}
              >
                {isExecuting ? '⏳ Running...' : '▶ Run Code'}
              </button>
            </div>
          </div>
          
          <div className="console-tab-body">
            {/* Custom Input Tab */}
            {activeConsoleTab === 'ide-custominput' && (
              <div className="console-tab-content active" id="ide-tab-custominput">
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  Provide stdin input parameters:
                </label>
                <textarea 
                  id="ide-custom-input-val" 
                  className="text-input console-textarea" 
                  placeholder="e.g. 5"
                  value={customInput}
                  onChange={e => setCustomInput(e.target.value)}
                />
              </div>
            )}
            
             {/* Output Tab */}
            {activeConsoleTab === 'ide-output' && (
              <div className="console-tab-content" id="ide-tab-output">
                <div id="ide-output-status" className="arena-status-badge">
                  {isExecuting ? '⏳ Executing...' : 'Execution result:'}
                </div>
                <div id="ide-output-val" className="console-output">
                  {output || 'Output will appear here...'}
                </div>
              </div>
            )}

            {/* Complexity Tab */}
            {activeConsoleTab === 'ide-complexity' && (
              <div className="console-tab-content active" id="ide-tab-complexity" style={{ display: 'flex', flexDirection: 'column', gap: '20px', paddingBottom: '20px' }}>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <div style={{
                    flex: '1 1 140px',
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid var(--border-glass)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}>
                    <div style={{ fontSize: '1.8rem' }}>⏱️</div>
                    <div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Time Complexity</div>
                      <div style={{ 
                        fontSize: '1.3rem', 
                        fontWeight: 800, 
                        color: 'var(--accent-cyan)',
                        fontFamily: 'var(--font-code)' 
                      }}>
                        {complexityResult.timeComplexity}
                      </div>
                    </div>
                  </div>

                  <div style={{
                    flex: '1 1 140px',
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid var(--border-glass)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}>
                    <div style={{ fontSize: '1.8rem' }}>💾</div>
                    <div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Space Complexity</div>
                      <div style={{ 
                        fontSize: '1.3rem', 
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
                      className="btn btn-secondary" 
                      onClick={() => handleAnalyzeComplexity()} 
                      disabled={isAnalyzing || !activeFile}
                      style={{ padding: '8px 16px', fontSize: '0.8rem', height: '100%' }}
                    >
                      {isAnalyzing ? '⏳ Analyzing...' : '🔄 Re-Analyze'}
                    </button>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '20px', flexDirection: 'row', flexWrap: 'wrap' }}>
                  <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <label style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                        Asymptotic Scaling Curves
                      </label>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                        Current N: <strong style={{ color: 'var(--accent-cyan)', fontFamily: 'var(--font-code)' }}>{inputN}</strong>
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
                        height: '6px',
                        borderRadius: '3px'
                      }}
                    />

                    <ComplexityPlotter activeComplexity={complexityResult.timeComplexity} n={inputN} />
                  </div>

                  <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                      <h4 style={{ fontSize: '0.86rem', margin: '0 0 6px 0', color: 'var(--text-primary)' }}>Analysis Summary</h4>
                      <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                        {complexityResult.explanation}
                      </p>
                    </div>

                    <div>
                      <h4 style={{ fontSize: '0.86rem', margin: '0 0 8px 0', color: 'var(--text-primary)' }}>Derivation Steps</h4>
                      <ul style={{ paddingLeft: '16px', margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {complexityResult.steps && complexityResult.steps.map((step, idx) => (
                          <li key={idx} style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
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
                        padding: '12px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4px'
                      }}>
                        <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--accent-orange)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span>💡</span> Optimization Suggestion
                        </div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                          {complexityResult.optimizedSuggestion}
                        </div>
                      </div>
                    )}

                    {!complexityResult.optimizedSuggestion && complexityResult.isOptimized && (
                      <div style={{
                        background: 'rgba(16, 185, 129, 0.05)',
                        border: '1px solid rgba(16, 185, 129, 0.2)',
                        borderRadius: 'var(--radius-sm)',
                        padding: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '0.78rem',
                        color: 'var(--accent-emerald)'
                      }}>
                        <span>✨</span> Your algorithm's time complexity is fully optimized!
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
  );
}
