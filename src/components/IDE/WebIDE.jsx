import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';

export default function WebIDE() {
  // 1. The Virtual File System (State)
  const [files, setFiles] = useState([
    { id: '1', name: 'main.js', content: 'console.log("Hello");', language: 'javascript' },
    { id: '2', name: 'Input_Output.py', content: 'print("Hello")', language: 'python' }
  ]);
  const [activeFileId, setActiveFileId] = useState('1');
  
  // Custom execution state
  const [customInput, setCustomInput] = useState('');
  const [output, setOutput] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);

  // Derived state for the currently active file
  const activeFile = files.find(f => f.id === activeFileId);

  // Load from localStorage on mount and listen to custom event
  useEffect(() => {
    const loadVFS = () => {
      const saved = localStorage.getItem('dsaflow_vfs');
      if (saved) setFiles(JSON.parse(saved));
    };
    
    loadVFS();

    const handleOpenFile = (e) => {
      loadVFS();
      if (e.detail && e.detail.id) {
        setActiveFileId(e.detail.id);
      }
    };

    window.addEventListener('ide_open_file', handleOpenFile);
    return () => window.removeEventListener('ide_open_file', handleOpenFile);
  }, []);

  // 2. Dynamic Editor Binding Helper
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

  // 3. The Handle Change & Save Logic
  const handleEditorChange = (newContent) => {
    // Update only the active file's content in the array
    setFiles(prevFiles => prevFiles.map(file => 
      file.id === activeFileId ? { ...file, content: newContent } : file
    ));
  };

  const handleSave = () => {
    localStorage.setItem('dsaflow_vfs', JSON.stringify(files));
    // Optional: Show a toast notification here
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

  // 4. The Run Code Payload (Execution)
  const handleRunCode = async () => {
    if (!activeFile) return;
    
    setIsExecuting(true);
    setOutput('⏳ Compiling and Running...');
    handleSave(); // Force auto-save before execution

    // Prepare exact JSON payload for backend execution API
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
      } else {
        setOutput(`Error: ${result.status}\n\n${result.error || result.stderr}`);
      }
    } catch (err) {
      setOutput('Failed to connect to execution engine.');
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'sans-serif' }}>
      
      {/* Sidebar: File Explorer */}
      <div style={{ width: '250px', background: '#1e1e1e', color: '#ccc', padding: '10px' }}>
        <h3 style={{ color: '#fff', fontSize: '0.9rem', textTransform: 'uppercase' }}>Explorer</h3>
        <div style={{ marginTop: '15px' }}>
          {files.map(file => (
            <div 
              key={file.id} 
              onClick={() => setActiveFileId(file.id)}
              style={{
                padding: '8px 12px', 
                cursor: 'pointer',
                borderRadius: '4px',
                marginBottom: '4px',
                background: file.id === activeFileId ? 'rgba(0, 229, 255, 0.1)' : 'transparent',
                color: file.id === activeFileId ? '#00e5ff' : 'inherit',
                borderLeft: file.id === activeFileId ? '2px solid #00e5ff' : '2px solid transparent'
              }}
            >
              📄 {file.name}
            </div>
          ))}
        </div>
      </div>

      {/* Main Editor Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#1e1e1e' }}>
        
        {/* Toolbar */}
        <div style={{ padding: '10px 20px', background: '#252526', display: 'flex', gap: '10px', alignItems: 'center' }}>
          <span style={{ color: '#fff', marginRight: 'auto', fontWeight: 'bold' }}>
            {activeFile ? activeFile.name : 'No file selected'}
          </span>
          <button 
            onClick={handleSave}
            style={{ background: '#333', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}
          >
            💾 Save
          </button>
          <button 
            onClick={handleRunCode} 
            disabled={isExecuting || !activeFile}
            style={{ background: '#00e5ff', color: '#000', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            {isExecuting ? '⏳ Running...' : '▶️ Run Code'}
          </button>
        </div>

        {/* Monaco Editor */}
        <div style={{ flex: 2 }}>
          {activeFile ? (
            <Editor
              height="100%"
              theme="vs-dark"
              language={getLanguageFromExtension(activeFile.name)}
              value={activeFile.content}
              onChange={handleEditorChange}
              options={{ minimap: { enabled: false }, fontSize: 14 }}
            />
          ) : (
            <div style={{ color: '#666', padding: '40px', textAlign: 'center' }}>
              Select a file from the explorer to start coding.
            </div>
          )}
        </div>

        {/* Terminal / Output Area */}
        <div style={{ flex: 1, borderTop: '1px solid #333', display: 'flex' }}>
          <div style={{ flex: 1, padding: '15px', borderRight: '1px solid #333' }}>
            <h4 style={{ color: '#ccc', marginTop: 0, marginBottom: '10px' }}>Custom Input</h4>
            <textarea 
              value={customInput} 
              onChange={e => setCustomInput(e.target.value)}
              placeholder="Enter stdin here..."
              style={{ width: '100%', height: 'calc(100% - 30px)', background: '#1e1e1e', color: '#fff', border: '1px solid #444', padding: '10px', borderRadius: '4px', resize: 'none' }}
            />
          </div>
          <div style={{ flex: 1, padding: '15px' }}>
            <h4 style={{ color: '#ccc', marginTop: 0, marginBottom: '10px' }}>Output</h4>
            <pre style={{ height: 'calc(100% - 30px)', margin: 0, background: '#1e1e1e', color: '#00e5ff', border: '1px solid #444', padding: '10px', borderRadius: '4px', overflow: 'auto', whiteSpace: 'pre-wrap' }}>
              {output || 'Output will appear here...'}
            </pre>
          </div>
        </div>

      </div>
    </div>
  );
}
