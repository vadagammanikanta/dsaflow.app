let editor = null;
let activeFileId = null;
let isInitializing = false;
let vfs = [];

// Initialize VFS
function initVFS() {
  const saved = localStorage.getItem('dsaflow_vfs');
  if (saved) {
    vfs = JSON.parse(saved);
  } else {
    vfs = [
      { id: 'root', type: 'folder', name: 'root', parentId: null },
      { id: '1', type: 'file', name: 'main.js', parentId: 'root', content: 'console.log("Hello World!");\n' }
    ];
    saveVFS();
  }
}

function saveVFS() {
  localStorage.setItem('dsaflow_vfs', JSON.stringify(vfs));
}

function getChildren(folderId) {
  return vfs.filter(n => n.parentId === folderId).sort((a, b) => {
    if (a.type === b.type) return a.name.localeCompare(b.name);
    return a.type === 'folder' ? -1 : 1;
  });
}

function generateId() {
  return Date.now().toString() + Math.floor(Math.random() * 1000);
}

// Render the file tree recursively
function renderTree(folderId, container) {
  const children = getChildren(folderId);
  children.forEach(node => {
    const el = document.createElement('div');
    el.className = `ide-${node.type}`;
    
    const item = document.createElement('div');
    item.className = `ide-tree-item ${node.id === activeFileId ? 'active' : ''}`;
    
    const icon = document.createElement('span');
    icon.className = 'ide-tree-icon';
    if (node.type === 'folder') {
      icon.textContent = node.expanded ? '📂' : '📁';
    } else {
      icon.textContent = getFileIcon(node.name);
    }
    
    const nameSpan = document.createElement('span');
    nameSpan.textContent = node.name;
    nameSpan.style.flexGrow = '1';
    nameSpan.style.overflow = 'hidden';
    nameSpan.style.textOverflow = 'ellipsis';
    nameSpan.style.whiteSpace = 'nowrap';
    
    // Delete button (visible on hover or always small)
    const delBtn = document.createElement('button');
    delBtn.innerHTML = '✖';
    delBtn.style.background = 'none';
    delBtn.style.border = 'none';
    delBtn.style.color = 'var(--text-muted)';
    delBtn.style.cursor = 'pointer';
    delBtn.onclick = (e) => {
      e.stopPropagation();
      if (confirm(`Delete ${node.name}?`)) {
        deleteNode(node.id);
      }
    };
    
    item.appendChild(icon);
    item.appendChild(nameSpan);
    item.appendChild(delBtn);
    
    el.appendChild(item);
    
    if (node.type === 'folder') {
      const contents = document.createElement('div');
      contents.className = 'ide-folder-contents';
      contents.style.display = node.expanded ? 'block' : 'none';
      renderTree(node.id, contents);
      el.appendChild(contents);
      
      item.onclick = () => {
        node.expanded = !node.expanded;
        saveVFS();
        renderFileTree();
      };
    } else {
      item.onclick = () => {
        openFile(node.id);
      };
    }
    
    container.appendChild(el);
  });
}

function getFileIcon(filename) {
  if (filename.endsWith('.js')) return '⚡';
  if (filename.endsWith('.py')) return '🐍';
  if (filename.endsWith('.cpp') || filename.endsWith('.c')) return '⚙️';
  if (filename.endsWith('.java')) return '☕';
  if (filename.endsWith('.cs')) return '🔷';
  if (filename.endsWith('.go')) return '🐹';
  if (filename.endsWith('.rs')) return '🦀';
  if (filename.endsWith('.rb')) return '💎';
  if (filename.endsWith('.php')) return '🐘';
  if (filename.endsWith('.swift')) return '🦅';
  if (filename.endsWith('.kt')) return '🎯';
  return '📄';
}

function renderFileTree() {
  const container = document.getElementById('ide-file-tree');
  if (!container) return;
  container.innerHTML = '';
  renderTree('root', container);
}

function deleteNode(id) {
  // recursively delete
  const toDelete = [id];
  let i = 0;
  while (i < toDelete.length) {
    const cur = toDelete[i];
    const children = vfs.filter(n => n.parentId === cur);
    children.forEach(c => toDelete.push(c.id));
    i++;
  }
  vfs = vfs.filter(n => !toDelete.includes(n.id));
  if (toDelete.includes(activeFileId)) {
    activeFileId = null;
    if (editor) editor.setValue('');
    document.getElementById('ide-empty-state').style.display = 'block';
    document.getElementById('btn-ide-save').style.display = 'none';
    document.getElementById('btn-ide-run').disabled = true;
    document.getElementById('ide-current-filename').textContent = 'No file selected';
  }
  saveVFS();
  renderFileTree();
}

function createNewNode(type) {
  const name = prompt(`Enter ${type} name:`);
  if (!name) return;
  
  const id = generateId();
  vfs.push({
    id,
    type,
    name,
    parentId: 'root', // for simplicity, always create at root
    content: type === 'file' ? '' : undefined,
    expanded: type === 'folder' ? true : undefined
  });
  saveVFS();
  renderFileTree();
  if (type === 'file') {
    openFile(id);
  }
}

function openFile(id) {
  if (activeFileId && activeFileId !== id && editor) {
    saveActiveFile(); // auto-save previous file before switching
  }
  const file = vfs.find(n => n.id === id);
  if (!file || file.type !== 'file') return;
  
  activeFileId = id;
  document.getElementById('ide-current-filename').textContent = file.name;
  document.getElementById('ide-empty-state').style.display = 'none';
  document.getElementById('btn-ide-save').style.display = 'inline-block';
  document.getElementById('btn-ide-run').disabled = false;
  
  renderFileTree(); // to highlight active
  
  if (!editor) {
    initMonacoEditor(file);
  } else {
    editor.setValue(file.content || '');
    setEditorLanguage(file.name);
  }
}

function setEditorLanguage(filename) {
  if (!editor) return;
  const model = editor.getModel();
  if (!model) return;
  
  let lang = 'javascript';
  if (filename.endsWith('.py')) lang = 'python';
  else if (filename.endsWith('.cpp') || filename.endsWith('.c')) lang = 'cpp';
  else if (filename.endsWith('.java')) lang = 'java';
  else if (filename.endsWith('.cs')) lang = 'csharp';
  else if (filename.endsWith('.go')) lang = 'go';
  else if (filename.endsWith('.rs')) lang = 'rust';
  else if (filename.endsWith('.rb')) lang = 'ruby';
  else if (filename.endsWith('.php')) lang = 'php';
  else if (filename.endsWith('.swift')) lang = 'swift';
  else if (filename.endsWith('.kt')) lang = 'kotlin';
  
  monaco.editor.setModelLanguage(model, lang);
}

function initMonacoEditor(file) {
  const container = document.getElementById('ide-editor-container');
  if (!container) return;
  
  if (window.monaco) {
    createEditor(file, container);
  } else if (window.require) {
    window.require.config({ paths: { vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.39.0/min/vs' } });
    window.require(['vs/editor/editor.main'], () => {
      createEditor(file, container);
    });
  } else {
    setTimeout(() => initMonacoEditor(file), 500);
  }
}

function createEditor(file, container) {
  container.innerHTML = ''; // clear empty state
  editor = monaco.editor.create(container, {
    value: file.content || '',
    theme: 'vs-dark',
    fontSize: 14,
    fontFamily: 'var(--font-code)',
    minimap: { enabled: false },
    automaticLayout: true,
    wordWrap: 'on'
  });
  setEditorLanguage(file.name);
}

function saveActiveFile() {
  if (!activeFileId || !editor) return;
  const file = vfs.find(n => n.id === activeFileId);
  if (file) {
    file.content = editor.getValue();
    saveVFS();
    const btn = document.getElementById('btn-ide-save');
    btn.textContent = '✅ Saved';
    setTimeout(() => btn.textContent = '💾 Save', 2000);
  }
}

async function runCode() {
  if (!activeFileId || !editor) return;
  const file = vfs.find(n => n.id === activeFileId);
  if (!file) return;

  saveActiveFile(); // auto-save before run

  let lang = 'javascript';
  if (file.name.endsWith('.py')) lang = 'python';
  else if (file.name.endsWith('.cpp')) lang = 'cpp';
  else if (file.name.endsWith('.c')) lang = 'c';
  else if (file.name.endsWith('.java')) lang = 'java';
  else if (file.name.endsWith('.cs')) lang = 'csharp';
  else if (file.name.endsWith('.go')) lang = 'go';
  else if (file.name.endsWith('.rs')) lang = 'rust';
  else if (file.name.endsWith('.rb')) lang = 'ruby';
  else if (file.name.endsWith('.php')) lang = 'php';
  else if (file.name.endsWith('.swift')) lang = 'swift';
  else if (file.name.endsWith('.kt')) lang = 'kotlin';

  const runBtn = document.getElementById('btn-ide-run');
  const statusEl = document.getElementById('ide-output-status');
  const outputEl = document.getElementById('ide-output-val');
  const stdin = document.getElementById('ide-custom-input-val').value;

  runBtn.disabled = true;
  statusEl.className = 'arena-status-badge warning';
  statusEl.textContent = '⏳ Compiling and Running...';
  outputEl.textContent = '';
  
  // switch to output tab
  const tabs = document.querySelectorAll('.console-tab');
  tabs.forEach(t => {
    if (t.dataset.tab === 'ide-output') t.classList.add('active');
    else if (t.dataset.tab === 'ide-custominput') t.classList.remove('active');
  });
  document.getElementById('ide-tab-output').style.display = 'block';
  document.getElementById('ide-tab-custominput').style.display = 'none';

  try {
    const res = await fetch('/api/execute', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ language: lang, code: file.content, stdin })
    });

    if (!res.ok) throw new Error(await res.text());

    const runResult = await res.json();
    
    if (runResult.status !== 'Success') {
      statusEl.className = 'arena-status-badge error';
      statusEl.textContent = `❌ ${runResult.status}`;
      outputEl.textContent = runResult.error || runResult.stderr || runResult.output;
    } else {
      statusEl.className = 'arena-status-badge success';
      statusEl.textContent = `✅ Execution Successful`;
      outputEl.textContent = runResult.stdout || 'No output';
      if (runResult.stderr) {
        outputEl.textContent += '\n\n[stderr]\n' + runResult.stderr;
      }
    }
  } catch (err) {
    statusEl.className = 'arena-status-badge error';
    statusEl.textContent = '❌ System Error';
    outputEl.textContent = `Failed to execute: ${err.message}`;
  } finally {
    runBtn.disabled = false;
  }
}

export function initIDE() {
  if (isInitializing) return;
  isInitializing = true;
  
  initVFS();
  renderFileTree();
  
  document.getElementById('btn-ide-new-file').addEventListener('click', () => createNewNode('file'));
  document.getElementById('btn-ide-new-folder').addEventListener('click', () => createNewNode('folder'));
  document.getElementById('btn-ide-save').addEventListener('click', saveActiveFile);
  document.getElementById('btn-ide-run').addEventListener('click', runCode);
  
  // Setup tabs
  const tabs = document.querySelectorAll('#ide .console-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const target = tab.dataset.tab;
      document.getElementById('ide-tab-custominput').style.display = target === 'ide-custominput' ? 'block' : 'none';
      document.getElementById('ide-tab-output').style.display = target === 'ide-output' ? 'block' : 'none';
    });
  });

  // Setup resizers (similar to arena)
  const handle1 = document.getElementById('ide-handle-1');
  const handle2 = document.getElementById('ide-handle-2');
  const workspace = document.querySelector('#ide .arena-workspace');
  const leftPane = document.querySelector('#ide .arena-left-pane');
  const rightContainer = document.querySelector('#ide .arena-right-container');
  const bottomPane = document.querySelector('#ide .arena-bottom-right-pane');

  if (handle1) {
    handle1.addEventListener('mousedown', e => {
      e.preventDefault();
      const onMouseMove = moveEvent => {
        const workspaceRect = workspace.getBoundingClientRect();
        const offsetLeft = moveEvent.clientX - workspaceRect.left;
        const pct = (offsetLeft / workspaceRect.width) * 100;
        if (pct > 15 && pct < 50) {
          leftPane.style.flex = `0 0 ${pct}%`;
          leftPane.style.maxWidth = `${pct}%`;
        }
      };
      const onMouseUp = () => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        if (editor) editor.layout();
      };
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  }

  if (handle2) {
    handle2.addEventListener('mousedown', e => {
      e.preventDefault();
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
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        if (editor) editor.layout();
      };
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  }
}

// API to open a file programmatically from learning modules
export function openInIDE(filename, initialCode) {
  initVFS(); // ensure vfs is loaded
  let file = vfs.find(n => n.name === filename && n.type === 'file');
  if (!file) {
    const id = generateId();
    file = {
      id,
      type: 'file',
      name: filename,
      parentId: 'root',
      content: initialCode || ''
    };
    vfs.push(file);
    saveVFS();
  } else if (initialCode && file.content.trim() === '') {
    // only overwrite if it's currently empty
    file.content = initialCode;
    saveVFS();
  }
  
  // switch to IDE tab in UI
  document.getElementById('nav-ide').click();
  
  // Wait a small tick to ensure DOM is visible before creating editor
  setTimeout(() => {
    openFile(file.id);
  }, 50);
}
