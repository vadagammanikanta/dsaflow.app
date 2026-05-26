import React, { useState, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';

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

  const [activeFileId, setActiveFileId] = useState('main-js');
  const [expandedFolders, setExpandedFolders] = useState(['basics']);
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState('');
  
  // Custom execution state
  const [customInput, setCustomInput] = useState('');
  const [output, setOutput] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const [activeConsoleTab, setActiveConsoleTab] = useState('ide-custominput'); // 'ide-custominput' or 'ide-output'

  // Derived state for the currently active file
  const activeFile = files.find(f => f.id === activeFileId && f.type === 'file');

  // Sync to local storage
  const saveVFS = (newFiles) => {
    setFiles(newFiles);
    localStorage.setItem('dsaflow_vfs', JSON.stringify(newFiles));
  };

  // Load from localStorage on mount and listen to custom open file event
  useEffect(() => {
    const handleOpenFile = (e) => {
      const saved = localStorage.getItem('dsaflow_vfs');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setFiles(parsed);
        } catch (err) {}
      }
      if (e.detail && e.detail.id) {
        setActiveFileId(e.detail.id);
        // If file has parent folder, auto-expand it
        const fileObj = files.find(f => f.id === e.detail.id);
        if (fileObj && fileObj.parentId && fileObj.parentId !== 'root') {
          setExpandedFolders(prev => prev.includes(fileObj.parentId) ? prev : [...prev, fileObj.parentId]);
        }
      }
    };
    window.addEventListener('ide_open_file', handleOpenFile);
    return () => window.removeEventListener('ide_open_file', handleOpenFile);
  }, [files]);

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
    <div className="arena-workspace">
      
      {/* Left Pane: File Explorer */}
      <div className="arena-left-pane">
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
      <div className="arena-resize-handle" id="ide-handle-1"></div>
      
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
        <div className="arena-resize-handle-v" id="ide-handle-2"></div>
        
        {/* Bottom Right Pane: Console & Output */}
        <div className="arena-bottom-right-pane">
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
          </div>
        </div>
        
      </div>
    </div>
  );
}
