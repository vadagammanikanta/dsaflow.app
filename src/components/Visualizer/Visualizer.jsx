import React, { useState, useEffect, useRef } from 'react';
import { 
  initSorting, 
  setDelay as setSortingSpeed,
  play as playSort,
  pause as pauseSort,
  step as stepSort,
  generateRandomArray,
  isCurrentlyPlaying as isSortPlaying
} from '../../../modules/visualizers/sorting';
import { 
  initDS as initStructures,
  pushStack,
  popStack,
  enqueueQueue,
  dequeueQueue,
  insertHeadList,
  deleteHeadList,
  searchList
} from '../../../modules/visualizers/structures';
import { 
  initBST, 
  setBSTDelay as setBSTSpeed,
  playBST,
  pauseBST,
  stepBSTForward,
  isBSTPlaying,
  bstInsert,
  bstDelete,
  bstSearch
} from '../../../modules/visualizers/bst';
import { 
  initGraph, 
  setGraphDelay as setGraphSpeed,
  playGraph,
  pauseGraph,
  stepGraphForward,
  isGraphPlaying
} from '../../../modules/visualizers/graph';

export default function Visualizer() {
  const [source, setSource] = useState('visualgo'); // 'visualgo' by default, or 'native'
  const [visualgoAlgo, setVisualgoAlgo] = useState('sorting');
  const [theme, setTheme] = useState(() => {
    return document.documentElement.getAttribute('data-theme') || localStorage.getItem('dsaflow_theme') || 'dark';
  });
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          const newTheme = document.documentElement.getAttribute('data-theme') || 'dark';
          setTheme(newTheme);
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    return () => observer.disconnect();
  }, []);
  
  const initialized = useRef(false);

  useEffect(() => {
    if (source === 'native') {
      // Initialize the default native visualizer
      setTimeout(() => {
        const select = document.getElementById('visualizer-select');
        const speedSlider = document.getElementById('speed-slider');
        const title = document.getElementById('visualizer-title');
        const viewportContainer = document.getElementById('viewport');

        initSorting(viewportContainer);

        if (select) {
          const handleSelectChange = (e) => {
            const val = e.target.value;
            const opt = e.target.options[e.target.selectedIndex].text;
            if (title) title.textContent = opt;

            // Reset containers
            document.getElementById('array-container').innerHTML = '';
            document.getElementById('array-container').style.display = 'none';
            document.getElementById('struct-container').innerHTML = '';
            document.getElementById('struct-container').style.display = 'none';
            document.getElementById('tree-nodes').innerHTML = '';
            document.getElementById('tree-svg').innerHTML = '';
            document.getElementById('graph-nodes').innerHTML = '';
            document.getElementById('graph-svg').innerHTML = '';
            document.getElementById('ds-controls-group').style.display = 'none';
            
            const btnGen = document.getElementById('btn-generate');
            if (btnGen) btnGen.style.display = (val.startsWith('ds-') || val.startsWith('graph-')) ? 'none' : 'block';

            // Show play/pause and step buttons by default (structures hides them)
            const playPauseBtn = document.getElementById('btn-play-pause');
            const stepBtn = document.getElementById('btn-step');
            if (playPauseBtn) playPauseBtn.style.display = 'inline-flex';
            if (stepBtn) stepBtn.style.display = 'inline-flex';

            if (val.startsWith('sort-')) {
              document.getElementById('array-container').style.display = 'flex';
              initSorting(viewportContainer);
            } else if (val === 'ds-stack' || val === 'ds-queue' || val === 'ds-linkedlist') {
              document.getElementById('struct-container').style.display = 'flex';
              initStructures(viewportContainer, val);
            } else if (val === 'ds-bst') {
              initBST(viewportContainer);
              document.getElementById('ds-controls-group').style.display = 'flex';
              if (playPauseBtn) playPauseBtn.style.display = 'inline-flex';
              if (stepBtn) stepBtn.style.display = 'inline-flex';
              if (btnGen) btnGen.style.display = 'none';
              const searchBtn = document.getElementById('ds-btn-search');
              if (searchBtn) searchBtn.style.display = 'inline-flex';
            } else if (val.startsWith('graph-')) {
              if (playPauseBtn) playPauseBtn.style.display = 'inline-flex';
              if (stepBtn) stepBtn.style.display = 'inline-flex';
              if (btnGen) btnGen.style.display = 'none';
              initGraph(viewportContainer);
            }
          };

          select.addEventListener('change', handleSelectChange);
        }

        if (speedSlider) {
          const handleSpeedChange = (e) => {
            const val = parseInt(e.target.value);
            document.getElementById('speed-label').textContent = val + 'ms';
            setSortingSpeed(val);
            setBSTSpeed(val);
            setGraphSpeed(val);
          };
          speedSlider.addEventListener('input', handleSpeedChange);
        }

        // Bind Play/Pause
        const playPauseBtn = document.getElementById('btn-play-pause');
        const handlePlayPause = () => {
          const val = select ? select.value : 'sort-bubble';
          if (val.startsWith('sort-')) {
            if (isSortPlaying()) pauseSort();
            else playSort();
          } else if (val === 'ds-bst') {
            if (isBSTPlaying()) pauseBST();
            else playBST();
          } else if (val.startsWith('graph-')) {
            if (isGraphPlaying()) pauseGraph();
            else playGraph();
          }
        };
        if (playPauseBtn) playPauseBtn.addEventListener('click', handlePlayPause);

        // Bind Step
        const stepBtn = document.getElementById('btn-step');
        const handleStep = () => {
          const val = select ? select.value : 'sort-bubble';
          if (val.startsWith('sort-')) {
            stepSort();
          } else if (val === 'ds-bst') {
            stepBSTForward();
          } else if (val.startsWith('graph-')) {
            stepGraphForward();
          }
        };
        if (stepBtn) stepBtn.addEventListener('click', handleStep);

        // Bind Generate New Array
        const generateBtn = document.getElementById('btn-generate');
        const handleGenerate = () => {
          const val = select ? select.value : 'sort-bubble';
          if (val.startsWith('sort-')) {
            generateRandomArray();
          }
        };
        if (generateBtn) generateBtn.addEventListener('click', handleGenerate);

        // Bind DS Control - Insert
        const insertBtn = document.getElementById('ds-btn-insert');
        const handleInsert = () => {
          const val = select ? select.value : 'ds-stack';
          const inputEl = document.getElementById('ds-input-val');
          const num = parseInt(inputEl.value, 10);
          if (isNaN(num) || num < 0 || num > 99) {
            alert('Please enter a valid value between 0 and 99.');
            return;
          }
          if (val === 'ds-stack') pushStack(num);
          else if (val === 'ds-queue') enqueueQueue(num);
          else if (val === 'ds-linkedlist') insertHeadList(num);
          else if (val === 'ds-bst') bstInsert(num);
          inputEl.value = '';
        };
        if (insertBtn) insertBtn.addEventListener('click', handleInsert);

        // Bind DS Control - Remove
        const removeBtn = document.getElementById('ds-btn-remove');
        const handleRemove = () => {
          const val = select ? select.value : 'ds-stack';
          if (val === 'ds-stack') popStack();
          else if (val === 'ds-queue') dequeueQueue();
          else if (val === 'ds-linkedlist') deleteHeadList();
          else if (val === 'ds-bst') {
            const inputEl = document.getElementById('ds-input-val');
            const num = parseInt(inputEl.value, 10);
            if (isNaN(num)) {
              alert('Please enter the value to delete from the BST.');
              return;
            }
            bstDelete(num);
            inputEl.value = '';
          }
        };
        if (removeBtn) removeBtn.addEventListener('click', handleRemove);

        // Bind DS Control - Search
        const searchBtn = document.getElementById('ds-btn-search');
        const handleSearch = () => {
          const val = select ? select.value : 'ds-linkedlist';
          const inputEl = document.getElementById('ds-input-val');
          const num = parseInt(inputEl.value, 10);
          if (isNaN(num)) {
            alert('Please enter the search value.');
            return;
          }
          if (val === 'ds-linkedlist') searchList(num);
          else if (val === 'ds-bst') bstSearch(num);
          inputEl.value = '';
        };
        if (searchBtn) searchBtn.addEventListener('click', handleSearch);

      }, 50);
    }
  }, [source]);

  const handleVisualgoChange = (e) => {
    setVisualgoAlgo(e.target.value);
  };

  const visualgoMapping = {
    'sorting': 'Sorting Algorithms',
    'bitmask': 'Bitmask Operations',
    'list': 'Linked List, Stack, Queue',
    'bst': 'BST and AVL Tree',
    'heap': 'Binary Heap (Priority Queue)',
    'hashtable': 'Hash Table Lookup',
    'graphds': 'Graph Data Structures',
    'dfsbfs': 'Graph Traversal (DFS/BFS)',
    'mst': 'Minimum Spanning Tree',
    'sssp': 'Single-Source Shortest Paths',
    'recursion': 'Recursion Tree / Divide & Conquer',
    'convexhull': 'Computational Geometry',
    'segmenttree': 'Segment / Fenwick Tree',
    'ufds': 'Union-Find Disjoint Sets'
  };

  const workspaceHeight = isFullscreen ? 'calc(100vh - 120px)' : 'calc(100vh - var(--header-height) - 180px)';

  return (
    <div 
      className={`tab-pane active ${isFullscreen ? 'visualizer-fullscreen' : ''}`} 
      id="visualizer" 
      style={{ height: '100%', overflowY: isFullscreen ? 'hidden' : 'auto' }}
    >
      <style>{`
        .visualizer-fullscreen {
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          width: 100vw !important;
          height: 100vh !important;
          z-index: 99999 !important;
          background: var(--bg-app) !important;
          padding: 24px !important;
          display: flex !important;
          flex-direction: column !important;
          gap: 16px !important;
          box-sizing: border-box !important;
        }
        .visualizer-fullscreen .visualizer-workspace {
          height: calc(100% - 60px) !important;
        }
        .dsa-iframe {
          position: absolute;
          top: -76px;
          left: 0;
          width: 100%;
          border: none;
        }
        /* Breakpoints for dynamic iframe height to crop footer */
        @media (max-width: 639px) {
          .dsa-iframe {
            height: 5200px;
          }
        }
        @media (min-width: 640px) and (max-width: 1023px) {
          .dsa-iframe {
            height: 3800px;
          }
        }
        @media (min-width: 1024px) and (max-width: 1279px) {
          .dsa-iframe {
            height: 3500px;
          }
        }
        @media (min-width: 1280px) and (max-width: 1535px) {
          .dsa-iframe {
            height: 3350px;
          }
        }
        @media (min-width: 1536px) {
          .dsa-iframe {
            height: 3300px;
          }
        }
      `}</style>
      
      {/* Source Toggle Selector */}
      <div className="section-header" style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem' }}>Interactive Algorithm Visualizer</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginTop: '4px' }}>Analyze structures, execution flow and complex dry-runs.</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', background: 'var(--bg-input)', border: '1px solid var(--border-glass)', borderRadius: '50px', padding: '4px', gap: '4px' }}>
            <button 
              className="btn" 
              onClick={() => setSource('visualgo')} 
              style={{ 
                padding: '6px 16px', 
                fontSize: '0.8rem', 
                borderRadius: '50px',
                background: source === 'visualgo' ? 'var(--accent-purple)' : 'transparent',
                color: source === 'visualgo' ? '#fff' : 'var(--text-secondary)'
              }}
            >
              🌐 VisuAlgo (Enriched)
            </button>
            <button 
              className="btn" 
              onClick={() => setSource('native')} 
              style={{ 
                padding: '6px 16px', 
                fontSize: '0.8rem', 
                borderRadius: '50px',
                background: source === 'native' ? 'var(--accent-purple)' : 'transparent',
                color: source === 'native' ? '#fff' : 'var(--text-secondary)'
              }}
            >
              💻 dsaflow.app (Native)
            </button>
            <button 
              className="btn" 
              onClick={() => setSource('dsavisualizer')} 
              style={{ 
                padding: '6px 16px', 
                fontSize: '0.8rem', 
                borderRadius: '50px',
                background: source === 'dsavisualizer' ? 'var(--accent-purple)' : 'transparent',
                color: source === 'dsavisualizer' ? '#fff' : 'var(--text-secondary)'
              }}
            >
              🌐 DSA Visualizer
            </button>
          </div>
          
          <button 
            className="btn btn-secondary" 
            onClick={() => setIsFullscreen(!isFullscreen)} 
            style={{ 
              padding: '6px 16px', 
              fontSize: '0.8rem', 
              borderRadius: '50px',
              border: '1px solid var(--border-glass)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: isFullscreen ? 'var(--accent-purple)' : 'var(--bg-input)',
              color: isFullscreen ? '#fff' : 'var(--text-primary)'
            }}
          >
            {isFullscreen ? '🗗 Exit Full' : '🗖 Fullscreen'}
          </button>
        </div>
      </div>

      {source === 'visualgo' && (
        /* VisuAlgo Enriched Visualizer Section */
        <div className="visualizer-workspace" style={{ display: 'flex', flexDirection: 'column', gap: '16px', height: 'auto' }}>
          <div className="card" style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>
              Selected Algorithm: <span style={{ color: 'var(--accent-cyan)' }}>{visualgoMapping[visualgoAlgo]}</span>
            </div>
            <select 
              className="algorithm-selector" 
              value={visualgoAlgo} 
              onChange={handleVisualgoChange}
              style={{ minWidth: '220px' }}
            >
              <option value="sorting">Sorting Algorithms</option>
              <option value="bitmask">Bitmask Operations</option>
              <option value="list">Linked List (Stack/Queue/List)</option>
              <option value="bst">Binary Search Tree / AVL</option>
              <option value="heap">Binary Heap (Priority Queue)</option>
              <option value="hashtable">Hash Table Lookup</option>
              <option value="graphds">Graph Data Structures</option>
              <option value="dfsbfs">Graph Traversal (DFS/BFS)</option>
              <option value="mst">Minimum Spanning Tree (MST)</option>
              <option value="sssp">Single-Source Shortest Paths</option>
              <option value="recursion">Recursion / Divide &amp; Conquer</option>
              <option value="convexhull">Convex Hull (Geometry)</option>
              <option value="segmenttree">Segment / Fenwick Tree</option>
              <option value="ufds">Union-Find Disjoint Sets (UFDS)</option>
            </select>
          </div>
          
          <div style={{ border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', background: '#000' }}>
            <iframe 
              src={`https://visualgo.net/en/${visualgoAlgo}`} 
              style={{ 
                width: '100%', 
                height: workspaceHeight, 
                border: 'none'
              }}
              title="VisuAlgo Enriched"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />
          </div>
        </div>
      )}

      {source === 'native' && (
        /* Native Visualizer Section */
        <div className="visualizer-workspace" style={{ height: workspaceHeight }}>
          <div className="canvas-container">
            <div className="canvas-header">
              <h2 id="visualizer-title">Bubble Sort</h2>
              <select className="algorithm-selector" id="visualizer-select">
                <optgroup label="Sorting">
                  <option value="sort-bubble" defaultValue>Bubble Sort</option>
                  <option value="sort-selection">Selection Sort</option>
                  <option value="sort-insertion">Insertion Sort</option>
                  <option value="sort-merge">Merge Sort</option>
                  <option value="sort-quick">Quick Sort</option>
                </optgroup>
                <optgroup label="Data Structures">
                  <option value="ds-stack">Stack (LIFO)</option>
                  <option value="ds-queue">Queue (FIFO)</option>
                  <option value="ds-linkedlist">Singly Linked List</option>
                  <option value="ds-bst">Binary Search Tree</option>
                </optgroup>
                <optgroup label="Graph Algorithms">
                  <option value="graph-dijkstra">Dijkstra's Shortest Path</option>
                </optgroup>
              </select>
            </div>
            <div className="visualization-viewport" id="viewport">
              <div className="array-container" id="array-container"></div>
              <div className="struct-container" id="struct-container" style={{ display: 'none' }}></div>
              <svg className="tree-svg-container" id="tree-svg"></svg>
              <div className="tree-nodes-container" id="tree-nodes"></div>
              <svg className="graph-svg-container" id="graph-svg"></svg>
              <div className="graph-nodes-container" id="graph-nodes"></div>
            </div>
            <div className="card controls-card">
              <div className="input-group" id="ds-controls-group" style={{ display: 'none', marginBottom: 0 }}>
                <input type="number" className="text-input" id="ds-input-val" placeholder="Value 0-99" min="0" max="99" style={{ width: '110px' }} />
                <button className="btn btn-primary" id="ds-btn-insert">Insert/Push</button>
                <button className="btn btn-secondary" id="ds-btn-remove">Remove/Pop</button>
                <button className="btn btn-secondary" id="ds-btn-search" style={{ display: 'none' }}>Search</button>
              </div>
              <button className="btn btn-secondary" id="btn-generate">New Array</button>
              <button className="btn btn-primary btn-icon" id="btn-play-pause" title="Play">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              </button>
              <button className="btn btn-secondary btn-icon" id="btn-step" title="Step">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 4 15 12 5 20 5 4"/><line x1="19" y1="5" x2="19" y2="19"/></svg>
              </button>
              <div className="speed-control">
                <span>Speed:</span>
                <input type="range" id="speed-slider" min="50" max="1200" defaultValue="500" />
                <span id="speed-label">500ms</span>
              </div>
            </div>
          </div>
          <div className="visualizer-sidebar">
            <div className="card" style={{ padding: '20px' }}>
              <h3 style={{ marginBottom: '12px' }}>Complexity</h3>
              <div className="badge-group" style={{ marginBottom: '16px' }}>
                <span className="info-badge">Worst: <strong id="stat-worst-time">O(N²)</strong></span>
                <span className="info-badge">Best: <strong id="stat-best-time">O(N)</strong></span>
                <span className="info-badge">Space: <strong id="stat-space">O(1)</strong></span>
              </div>
              <p id="algorithm-description" style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}></p>
            </div>
            <div className="card" style={{ flexGrow: 1, padding: '20px', display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ marginBottom: '12px' }}>Pseudocode Trace</h3>
              <div style={{ flexGrow: 1, overflowY: 'auto', background: 'var(--code-bg)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-glass)', padding: '12px' }} id="pseudocode-container"></div>
            </div>
          </div>
        </div>
      )}

      {source === 'dsavisualizer' && (
        /* DSA Visualizer Section */
        <div className="visualizer-workspace" style={{ display: 'flex', flexDirection: 'column', gap: '16px', height: 'auto' }}>
          <div style={{ 
            position: 'relative', 
            width: '100%', 
            height: workspaceHeight, 
            overflowY: 'auto',
            overflowX: 'hidden',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-glass)',
            background: 'var(--bg-card)'
          }}>
            <iframe 
              src="https://www.dsavisualizer.in/visualizer" 
              scrolling="no"
              className="dsa-iframe"
              style={{ 
                position: 'absolute',
                top: '-76px', // Hide the top navigation bar
                left: '0',
                width: '100%', 
                border: 'none',
                colorScheme: theme === 'dark' ? 'dark' : 'light'
              }}
              title="DSA Visualizer"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />
          </div>
        </div>
      )}
    </div>
  );
}
