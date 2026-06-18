import React, { useState, useEffect, useRef } from 'react';

// Predefined memory addresses
const ADDRESSES = ['0x1A2B', '0x3C4D', '0x5E6F', '0x7G8H', '0x9I0J', '0x2K3L', '0x4M5N', '0x6O7P', '0x8Q9R', '0x0S1T', '0x1V2W', '0x3X4Y'];

const GRAPH_EDGES = [
  { u: '0x1A2B', v: '0x3C4D', weight: 4 }, // A - B
  { u: '0x1A2B', v: '0x5E6F', weight: 2 }, // A - C
  { u: '0x3C4D', v: '0x7G8H', weight: 5 }, // B - D
  { u: '0x5E6F', v: '0x7G8H', weight: 8 }, // C - D
];

export default function MemoryVisualizer3D({ isFullscreen }) {
  // Navigation & Structure States
  const [structure, setStructure] = useState('list'); // 'list', 'doubly', 'stack', 'queue', 'bst', 'heap', 'graph'
  const [inputVal, setInputVal] = useState('');
  
  // Playback Control States
  const [frames, setFrames] = useState([]);
  const [frameIndex, setFrameIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [delay, setDelay] = useState(800);

  // 3D Perspective States
  const [rotation, setRotation] = useState({ x: 20, y: -10 });
  const [zoom, setZoom] = useState(1);
  const [perspective, setPerspective] = useState(1200);

  const setActiveAddress = (addr) => {
    setFrames(prev => prev.map((f, idx) => idx === frameIndex ? { ...f, activeAddr: addr } : f));
  };

  // Drag Interaction References
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const timerRef = useRef(null);

  // Default initial data structure states
  useEffect(() => {
    resetToInitial();
    return () => stopPlayback();
  }, [structure]);

  // Auto playback effect
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setFrameIndex(prev => {
          if (prev >= frames.length - 1) {
            setIsPlaying(false);
            clearInterval(timerRef.current);
            return prev;
          }
          return prev + 1;
        });
      }, delay);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, frames, delay]);

  const stopPlayback = () => {
    setIsPlaying(false);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  // ────────────────────────────────────────────────────────────────
  // INITIALIZATIONS FOR VARIOUS DATA STRUCTURES
  // ────────────────────────────────────────────────────────────────
  const resetToInitial = () => {
    stopPlayback();
    let initialHeap = [];
    let initialStack = {};
    let desc = '';

    if (structure === 'list') {
      initialHeap = [
        { addr: '0x1A2B', val: 15, next: '0x3C4D', x: 20, y: 50, delay: 0 },
        { addr: '0x3C4D', val: 30, next: '0x5E6F', x: 50, y: 50, delay: 0.4 },
        { addr: '0x5E6F', val: 45, next: 'NULL', x: 80, y: 50, delay: 0.8 }
      ];
      initialStack = { root: '0x1A2B', curr: 'NULL' };
      desc = 'Initialized Singly Linked List with 3 nodes.';
    } else if (structure === 'doubly') {
      initialHeap = [
        { addr: '0x1A2B', val: 10, prev: 'NULL', next: '0x3C4D', x: 20, y: 50, delay: 0 },
        { addr: '0x3C4D', val: 20, prev: '0x1A2B', next: '0x5E6F', x: 50, y: 50, delay: 0.4 },
        { addr: '0x5E6F', val: 30, prev: '0x3C4D', next: 'NULL', x: 80, y: 50, delay: 0.8 }
      ];
      initialStack = { head: '0x1A2B', tail: '0x5E6F' };
      desc = 'Initialized Doubly Linked List with bidirectional pointer parameters.';
    } else if (structure === 'stack') {
      initialHeap = [
        { addr: '0x1A2B', val: 99, next: '0x3C4D', x: 50, y: 30, delay: 0 },
        { addr: '0x3C4D', val: 88, next: '0x5E6F', x: 50, y: 50, delay: 0.4 },
        { addr: '0x5E6F', val: 77, next: 'NULL', x: 50, y: 70, delay: 0.8 }
      ];
      initialStack = { top: '0x1A2B' };
      desc = 'Initialized LIFO Stack. The stack grows downwards in memory heap layout.';
    } else if (structure === 'queue') {
      initialHeap = [
        { addr: '0x1A2B', val: 5, next: '0x3C4D', x: 20, y: 50, delay: 0 },
        { addr: '0x3C4D', val: 10, next: '0x5E6F', x: 50, y: 50, delay: 0.4 },
        { addr: '0x5E6F', val: 15, next: 'NULL', x: 80, y: 50, delay: 0.8 }
      ];
      initialStack = { front: '0x1A2B', rear: '0x5E6F' };
      desc = 'Initialized FIFO Queue. Nodes exit from the Front and enter from the Rear.';
    } else if (structure === 'bst') {
      initialHeap = [
        { addr: '0x1A2B', val: 50, left: '0x3C4D', right: '0x5E6F', x: 50, y: 20, delay: 0 },
        { addr: '0x3C4D', val: 30, left: 'NULL', right: 'NULL', x: 25, y: 60, delay: 0.4 },
        { addr: '0x5E6F', val: 70, left: 'NULL', right: 'NULL', x: 75, y: 60, delay: 0.8 }
      ];
      initialStack = { root: '0x1A2B' };
      desc = 'Initialized Binary Search Tree (BST) showing left/right child pointers.';
    } else if (structure === 'heap') {
      initialHeap = [
        { addr: '0x1A2B', val: 10, left: '0x3C4D', right: '0x5E6F', x: 50, y: 20, delay: 0 },
        { addr: '0x3C4D', val: 20, left: '0x7G8H', right: '0x9I0J', x: 25, y: 50, delay: 0.4 },
        { addr: '0x5E6F', val: 15, left: 'NULL', right: 'NULL', x: 75, y: 50, delay: 0.8 },
        { addr: '0x7G8H', val: 40, left: 'NULL', right: 'NULL', x: 12, y: 80, delay: 1.2 },
        { addr: '0x9I0J', val: 30, left: 'NULL', right: 'NULL', x: 38, y: 80, delay: 1.6 }
      ];
      initialStack = { root: '0x1A2B' };
      desc = 'Initialized Binary Min-Heap layout matching array indices parent-child mapping.';
    } else if (structure === 'graph') {
      initialHeap = [
        { addr: '0x1A2B', val: 'A', neighbors: ['0x3C4D', '0x5E6F'], x: 30, y: 30, delay: 0 },
        { addr: '0x3C4D', val: 'B', neighbors: ['0x1A2B', '0x7G8H'], x: 70, y: 30, delay: 0.3 },
        { addr: '0x5E6F', val: 'C', neighbors: ['0x1A2B', '0x7G8H'], x: 30, y: 70, delay: 0.6 },
        { addr: '0x7G8H', val: 'D', neighbors: ['0x3C4D', '0x5E6F'], x: 70, y: 70, delay: 0.9 }
      ];
      initialStack = { start: '0x1A2B' };
      desc = 'Initialized Graph node mesh mapping bidirectional neighbors.';
    } else if (structure === 'avl') {
      initialHeap = [
        { addr: '0x1A2B', val: 50, left: '0x3C4D', right: '0x5E6F', x: 50, y: 20, delay: 0 },
        { addr: '0x3C4D', val: 30, left: 'NULL', right: 'NULL', x: 25, y: 45, delay: 0.4 },
        { addr: '0x5E6F', val: 70, left: '0x7G8H', right: '0x9I0J', x: 75, y: 45, delay: 0.8 },
        { addr: '0x7G8H', val: 60, left: 'NULL', right: 'NULL', x: 65, y: 70, delay: 1.2 },
        { addr: '0x9I0J', val: 80, left: 'NULL', right: 'NULL', x: 85, y: 70, delay: 1.6 }
      ];
      initialStack = { root: '0x1A2B' };
      desc = 'Initialized AVL Tree structure. AVL trees maintain a balance factor of height(left) - height(right) within [-1, 1] bounds.';
    } else if (structure === 'array') {
      initialHeap = [
        { addr: '0x1A2B', val: 45, next: '0x3C4D', x: 15, y: 50, delay: 0 },
        { addr: '0x3C4D', val: 12, next: '0x5E6F', x: 30, y: 50, delay: 0.2 },
        { addr: '0x5E6F', val: 85, next: '0x7G8H', x: 45, y: 50, delay: 0.4 },
        { addr: '0x7G8H', val: 32, next: '0x9I0J', x: 60, y: 50, delay: 0.6 },
        { addr: '0x9I0J', val: 10, next: '0x2K3L', x: 75, y: 50, delay: 0.8 },
        { addr: '0x2K3L', val: 64, next: 'NULL', x: 90, y: 50, delay: 1.0 }
      ];
      initialStack = { arr: '0x1A2B' };
      desc = 'Initialized Array of 6 elements in heap memory. Elements are stored in contiguous memory blocks.';
    }

    const firstFrame = {
      heap: initialHeap,
      stack: initialStack,
      activeAddr: null,
      visited: [],
      explanation: desc
    };
    setFrames([firstFrame]);
    setFrameIndex(0);
  };

  // ────────────────────────────────────────────────────────────────
  // STEP FRAME GENERATORS FOR ALL CONCEPTS
  // ────────────────────────────────────────────────────────────────
  
  // Singly Linked List operations
  const runListInsertHead = (val) => {
    const nextAddr = ADDRESSES[Math.floor(Math.random() * ADDRESSES.length)];
    const baseHeap = frames[frameIndex]?.heap || [];
    const baseStack = frames[frameIndex]?.stack || {};

    const steps = [];
    
    // Step 0: Allocate node
    const tempNode = { addr: nextAddr, val, next: 'NULL', x: 15, y: 25, delay: 0 };
    steps.push({
      heap: [tempNode, ...baseHeap],
      stack: { ...baseStack, temp: nextAddr },
      activeAddr: nextAddr,
      visited: [],
      explanation: `Step 1: Allocated new heap block at ${nextAddr} for value ${val}. Created stack pointer variable 'temp' to point to it.`
    });

    // Step 1: temp.next = root
    const updatedTemp = { ...tempNode, next: baseStack.root || 'NULL' };
    steps.push({
      heap: [updatedTemp, ...baseHeap],
      stack: { ...baseStack, temp: nextAddr },
      activeAddr: nextAddr,
      visited: [],
      explanation: `Step 2: Pointed temp.next (pointer reference inside node ${nextAddr}) to current head node (${baseStack.root || 'NULL'}).`
    });

    // Step 2: root = temp, slide positions
    const slidedHeap = [updatedTemp, ...baseHeap].map((node, idx) => ({
      ...node,
      x: 20 + idx * 22,
      y: 50
    }));
    steps.push({
      heap: slidedHeap,
      stack: { root: nextAddr, curr: 'NULL' },
      activeAddr: nextAddr,
      visited: [],
      explanation: `Step 3: Pointed stack root pointer ('root') to the new node at ${nextAddr}. Completed Insertion.`
    });

    setFrames(steps);
    setFrameIndex(0);
    setIsPlaying(true);
  };

  const runListDeleteHead = () => {
    const baseHeap = frames[frameIndex]?.heap || [];
    const baseStack = frames[frameIndex]?.stack || {};
    if (baseHeap.length === 0) return;

    const steps = [];
    const targetNode = baseHeap[0];

    // Step 0: temp = root
    steps.push({
      heap: [...baseHeap],
      stack: { ...baseStack, temp: targetNode.addr },
      activeAddr: targetNode.addr,
      visited: [],
      explanation: `Step 1: Pointed stack temporary pointer 'temp' to head node at ${targetNode.addr} to prevent memory leaks.`
    });

    // Step 1: root = root.next
    const nextRoot = targetNode.next;
    steps.push({
      heap: [...baseHeap],
      stack: { root: nextRoot, temp: targetNode.addr },
      activeAddr: targetNode.addr,
      visited: [],
      explanation: `Step 2: Relocated stack root pointer 'root' to the next node in the list (${nextRoot}).`
    });

    // Step 2: free(temp)
    const slidedHeap = baseHeap.slice(1).map((node, idx) => ({
      ...node,
      x: 20 + idx * 22,
      y: 50
    }));
    steps.push({
      heap: slidedHeap,
      stack: { root: nextRoot },
      activeAddr: null,
      visited: [],
      explanation: `Step 3: Deallocated block at address ${targetNode.addr} (garbage collected / freed).`
    });

    setFrames(steps);
    setFrameIndex(0);
    setIsPlaying(true);
  };

  // Doubly Linked List Operations
  const runDoublyInsertHead = (val) => {
    const nextAddr = ADDRESSES[Math.floor(Math.random() * ADDRESSES.length)];
    const baseHeap = frames[frameIndex]?.heap || [];
    const baseStack = frames[frameIndex]?.stack || {};

    const steps = [];

    // Step 0: Allocate
    const tempNode = { addr: nextAddr, val, prev: 'NULL', next: 'NULL', x: 15, y: 25, delay: 0 };
    steps.push({
      heap: [tempNode, ...baseHeap],
      stack: { ...baseStack, temp: nextAddr },
      activeAddr: nextAddr,
      visited: [],
      explanation: `Step 1: Allocated Doubly Node block at ${nextAddr} with 'prev' and 'next' field pointers initialized to NULL.`
    });

    // Step 1: temp.next = head
    const headAddr = baseStack.head || 'NULL';
    const tempNodeStep1 = { ...tempNode, next: headAddr };
    steps.push({
      heap: [tempNodeStep1, ...baseHeap.slice(0)],
      stack: { ...baseStack, temp: nextAddr },
      activeAddr: nextAddr,
      visited: [],
      explanation: `Step 2: Linked forward pointer temp.next of the new block to current head node (${headAddr}).`
    });

    // Step 2: head.prev = temp
    let finalHeap = [tempNodeStep1, ...baseHeap];
    if (headAddr !== 'NULL') {
      finalHeap = finalHeap.map(n => n.addr === headAddr ? { ...n, prev: nextAddr } : n);
    }
    steps.push({
      heap: finalHeap,
      stack: { ...baseStack, temp: nextAddr },
      activeAddr: headAddr,
      visited: [],
      explanation: `Step 3: Linked backward pointer (head.prev) of the old head node to point to the new node at ${nextAddr}.`
    });

    // Step 3: head = temp
    const slidedHeap = finalHeap.map((n, idx) => ({ ...n, x: 20 + idx * 22, y: 50 }));
    steps.push({
      heap: slidedHeap,
      stack: { head: nextAddr, tail: baseStack.tail || nextAddr },
      activeAddr: nextAddr,
      visited: [],
      explanation: `Step 4: Shifted stack head reference pointer to new node ${nextAddr}. Bidirectional linking completed.`
    });

    setFrames(steps);
    setFrameIndex(0);
    setIsPlaying(true);
  };

  // Stack Push
  const runStackPush = (val) => {
    const nextAddr = ADDRESSES[Math.floor(Math.random() * ADDRESSES.length)];
    const baseHeap = frames[frameIndex]?.heap || [];
    const baseStack = frames[frameIndex]?.stack || {};

    const steps = [];

    // Step 0: Allocate
    const tempNode = { addr: nextAddr, val, next: 'NULL', x: 15, y: 30, delay: 0 };
    steps.push({
      heap: [tempNode, ...baseHeap],
      stack: { ...baseStack, temp: nextAddr },
      activeAddr: nextAddr,
      visited: [],
      explanation: `Step 1: Allocated new Stack element at address ${nextAddr}. pointed stack 'temp' reference to it.`
    });

    // Step 1: temp.next = top
    const topAddr = baseStack.top || 'NULL';
    const tempNodeStep1 = { ...tempNode, next: topAddr };
    steps.push({
      heap: [tempNodeStep1, ...baseHeap],
      stack: { ...baseStack, temp: nextAddr },
      activeAddr: nextAddr,
      visited: [],
      explanation: `Step 2: Linked temp.next to current top block (${topAddr}).`
    });

    // Step 2: top = temp, relocate coordinates
    const rearrangedHeap = [tempNodeStep1, ...baseHeap].map((n, idx) => ({
      ...n,
      x: 50,
      y: 30 + idx * 15
    }));
    steps.push({
      heap: rearrangedHeap,
      stack: { top: nextAddr },
      activeAddr: nextAddr,
      visited: [],
      explanation: `Step 3: Pointed top reference stack variable to ${nextAddr}. Value pushed onto Stack LIFO.`
    });

    setFrames(steps);
    setFrameIndex(0);
    setIsPlaying(true);
  };

  // Stack Pop
  const runStackPop = () => {
    const baseHeap = frames[frameIndex]?.heap || [];
    const baseStack = frames[frameIndex]?.stack || {};
    if (baseHeap.length === 0) return;

    const steps = [];
    const poppedNode = baseHeap[0];

    // Step 0: temp = top
    steps.push({
      heap: [...baseHeap],
      stack: { ...baseStack, temp: poppedNode.addr },
      activeAddr: poppedNode.addr,
      visited: [],
      explanation: `Step 1: Marked the top node at ${poppedNode.addr} with stack temporary pointer 'temp'.`
    });

    // Step 1: top = top.next
    const nextTop = poppedNode.next;
    steps.push({
      heap: [...baseHeap],
      stack: { top: nextTop, temp: poppedNode.addr },
      activeAddr: poppedNode.addr,
      visited: [],
      explanation: `Step 2: Relocated top stack pointer to the next lower element in stack (${nextTop}).`
    });

    // Step 2: free(temp)
    const rearrangedHeap = baseHeap.slice(1).map((n, idx) => ({
      ...n,
      x: 50,
      y: 30 + idx * 15
    }));
    steps.push({
      heap: rearrangedHeap,
      stack: { top: nextTop },
      activeAddr: null,
      visited: [],
      explanation: `Step 3: Deallocated block at address ${poppedNode.addr} (popped value ${poppedNode.val}).`
    });

    setFrames(steps);
    setFrameIndex(0);
    setIsPlaying(true);
  };

  // Queue Enqueue
  const runQueueEnqueue = (val) => {
    const nextAddr = ADDRESSES[Math.floor(Math.random() * ADDRESSES.length)];
    const baseHeap = frames[frameIndex]?.heap || [];
    const baseStack = frames[frameIndex]?.stack || {};

    const steps = [];

    // Step 0: Allocate
    const tempNode = { addr: nextAddr, val, next: 'NULL', x: 85, y: 20, delay: 0 };
    steps.push({
      heap: [...baseHeap, tempNode],
      stack: { ...baseStack, temp: nextAddr },
      activeAddr: nextAddr,
      visited: [],
      explanation: `Step 1: Allocated new element at address ${nextAddr} in the Heap. Stored reference to it in stack variable 'temp'.`
    });

    // Step 1: rear.next = temp
    const rearAddr = baseStack.rear || 'NULL';
    let updatedHeap = [...baseHeap, tempNode];
    if (rearAddr !== 'NULL') {
      updatedHeap = updatedHeap.map(n => n.addr === rearAddr ? { ...n, next: nextAddr } : n);
    }
    steps.push({
      heap: updatedHeap,
      stack: { ...baseStack, temp: nextAddr },
      activeAddr: rearAddr,
      visited: [],
      explanation: `Step 2: Connected the current Rear node's next pointer (${rearAddr}) to point to the new node at ${nextAddr}.`
    });

    // Step 2: rear = temp
    const finalStack = {
      front: baseStack.front === 'NULL' || !baseStack.front ? nextAddr : baseStack.front,
      rear: nextAddr
    };
    const slidedHeap = updatedHeap.map((n, idx) => ({
      ...n,
      x: 20 + idx * 22,
      y: 50
    }));
    steps.push({
      heap: slidedHeap,
      stack: finalStack,
      activeAddr: nextAddr,
      visited: [],
      explanation: `Step 3: Shifted stack rear pointer to ${nextAddr}. Item successfully enqueued (FIFO rear).`
    });

    setFrames(steps);
    setFrameIndex(0);
    setIsPlaying(true);
  };

  // Queue Dequeue
  const runQueueDequeue = () => {
    const baseHeap = frames[frameIndex]?.heap || [];
    const baseStack = frames[frameIndex]?.stack || {};
    if (baseHeap.length === 0) return;

    const steps = [];
    const targetNode = baseHeap[0];

    // Step 0: temp = front
    steps.push({
      heap: [...baseHeap],
      stack: { ...baseStack, temp: targetNode.addr },
      activeAddr: targetNode.addr,
      visited: [],
      explanation: `Step 1: Set stack pointer 'temp' to point to front node at ${targetNode.addr}.`
    });

    // Step 1: front = front.next
    const nextFront = targetNode.next;
    const isNowEmpty = nextFront === 'NULL';
    steps.push({
      heap: [...baseHeap],
      stack: { front: nextFront, rear: isNowEmpty ? 'NULL' : baseStack.rear, temp: targetNode.addr },
      activeAddr: targetNode.addr,
      visited: [],
      explanation: `Step 2: Advanced stack front pointer to next node (${nextFront}).`
    });

    // Step 2: free(temp)
    const slidedHeap = baseHeap.slice(1).map((n, idx) => ({
      ...n,
      x: 20 + idx * 22,
      y: 50
    }));
    steps.push({
      heap: slidedHeap,
      stack: { front: nextFront, rear: isNowEmpty ? 'NULL' : baseStack.rear },
      activeAddr: null,
      visited: [],
      explanation: `Step 3: Deallocated head block at address ${targetNode.addr} (dequeued value ${targetNode.val}).`
    });

    setFrames(steps);
    setFrameIndex(0);
    setIsPlaying(true);
  };

  // BST Traversal (In-Order)
  const runBSTInOrder = () => {
    const baseHeap = frames[frameIndex]?.heap || [];
    const baseStack = frames[frameIndex]?.stack || {};
    if (baseHeap.length === 0) return;

    const steps = [];
    const visited = [];

    // Helper function for in-order trace
    function traverse(nodeAddr) {
      if (nodeAddr === 'NULL' || !nodeAddr) return;
      const node = baseHeap.find(n => n.addr === nodeAddr);
      if (!node) return;

      // Highlight checking left node
      steps.push({
        heap: [...baseHeap],
        stack: { ...baseStack, curr: nodeAddr },
        activeAddr: nodeAddr,
        visited: [...visited],
        explanation: `In-Order: Traversing Left subtree of node ${node.val} (${nodeAddr}).`
      });

      traverse(node.left);

      // Visit current node
      visited.push(nodeAddr);
      steps.push({
        heap: [...baseHeap],
        stack: { ...baseStack, curr: nodeAddr },
        activeAddr: nodeAddr,
        visited: [...visited],
        explanation: `In-Order: Visited node value ${node.val} (${nodeAddr}). Added to output list.`
      });

      // Highlight checking right node
      steps.push({
        heap: [...baseHeap],
        stack: { ...baseStack, curr: nodeAddr },
        activeAddr: nodeAddr,
        visited: [...visited],
        explanation: `In-Order: Traversing Right subtree of node ${node.val} (${nodeAddr}).`
      });

      traverse(node.right);
    }

    traverse(baseStack.root);

    // Final state
    steps.push({
      heap: [...baseHeap],
      stack: { root: baseStack.root },
      activeAddr: null,
      visited: [...visited],
      explanation: `In-Order traversal complete. Visited order: ${visited.map(addr => baseHeap.find(n => n.addr === addr)?.val).join(', ')}`
    });

    setFrames(steps);
    setFrameIndex(0);
    setIsPlaying(true);
  };

  // Graph BFS Traversal
  const runGraphBFS = () => {
    const baseHeap = frames[frameIndex]?.heap || [];
    const baseStack = frames[frameIndex]?.stack || {};
    if (baseHeap.length === 0) return;

    const steps = [];
    const visited = [];
    const queue = [baseStack.start];
    
    steps.push({
      heap: [...baseHeap],
      stack: { ...baseStack, queue: [...queue].join(', ') },
      activeAddr: null,
      visited: [...visited],
      explanation: `BFS: Initialized empty visited list. Added start node A (${baseStack.start}) to Queue.`
    });

    while (queue.length > 0) {
      const currAddr = queue.shift();
      const currNode = baseHeap.find(n => n.addr === currAddr);
      if (!currNode) continue;

      visited.push(currAddr);
      steps.push({
        heap: [...baseHeap],
        stack: { ...baseStack, queue: [...queue].join(', '), curr: currAddr },
        activeAddr: currAddr,
        visited: [...visited],
        explanation: `BFS: Dequeued node ${currNode.val} (${currAddr}). Added to visited list.`
      });

      // Scan neighbors
      const neighbors = currNode.neighbors || [];
      for (let i = 0; i < neighbors.length; i++) {
        const nbrAddr = neighbors[i];
        const nbrNode = baseHeap.find(n => n.addr === nbrAddr);
        if (nbrNode && !visited.includes(nbrAddr) && !queue.includes(nbrAddr)) {
          queue.push(nbrAddr);
          steps.push({
            heap: [...baseHeap],
            stack: { ...baseStack, queue: [...queue].join(', '), curr: currAddr },
            activeAddr: nbrAddr,
            visited: [...visited],
            explanation: `BFS: Found unvisited neighbor ${nbrNode.val} (${nbrAddr}). Enqueued it.`
          });
        }
      }
    }

    steps.push({
      heap: [...baseHeap],
      stack: { start: baseStack.start },
      activeAddr: null,
      visited: [...visited],
      explanation: `BFS complete. Nodes visited: ${visited.map(addr => baseHeap.find(n => n.addr === addr)?.val).join(' ➔ ')}`
    });

    setFrames(steps);
    setFrameIndex(0);
    setIsPlaying(true);
  };

  // Sorting Algorithms Trace Generator
  const runSortingAlgo = (algo) => {
    stopPlayback();
    const baseHeap = frames[0]?.heap || [];
    const baseStack = frames[0]?.stack || {};
    
    const arr = baseHeap.map(n => n.val);
    const addrs = baseHeap.map(n => n.addr);
    
    const steps = [];
    
    const pushSortFrame = (currArr, activeIndices = [], explanation = '') => {
      const newHeap = baseHeap.map((node, idx) => ({
        ...node,
        val: currArr[idx]
      }));
      
      let visited = [];
      activeIndices.forEach(idx => {
        if (addrs[idx]) visited.push(addrs[idx]);
      });
      
      steps.push({
        heap: newHeap,
        stack: baseStack,
        activeAddr: activeIndices[0] !== undefined ? addrs[activeIndices[0]] : null,
        visited: visited,
        explanation: explanation
      });
    };
    
    pushSortFrame([...arr], [], `Starting ${algo} sort on array [${arr.join(', ')}].`);
    
    if (algo === 'bubble') {
      const tempArr = [...arr];
      const n = tempArr.length;
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - i - 1; j++) {
          pushSortFrame([...tempArr], [j, j + 1], `Comparing index ${j} (${tempArr[j]}) and index ${j+1} (${tempArr[j+1]})`);
          if (tempArr[j] > tempArr[j + 1]) {
            const temp = tempArr[j];
            tempArr[j] = tempArr[j + 1];
            tempArr[j + 1] = temp;
            pushSortFrame([...tempArr], [j, j + 1], `Swap: ${tempArr[j+1]} > ${tempArr[j]}. Swapped to [${tempArr.join(', ')}].`);
          }
        }
      }
      pushSortFrame([...tempArr], [], `Bubble Sort complete! Final sorted array: [${tempArr.join(', ')}].`);
    } else if (algo === 'selection') {
      const tempArr = [...arr];
      const n = tempArr.length;
      for (let i = 0; i < n - 1; i++) {
        let minIdx = i;
        pushSortFrame([...tempArr], [i], `Setting index ${i} (${tempArr[i]}) as current minimum.`);
        for (let j = i + 1; j < n; j++) {
          pushSortFrame([...tempArr], [j, minIdx], `Comparing index ${j} (${tempArr[j]}) with minimum (${tempArr[minIdx]}).`);
          if (tempArr[j] < tempArr[minIdx]) {
            minIdx = j;
            pushSortFrame([...tempArr], [minIdx], `Found new minimum element: ${tempArr[minIdx]} at index ${minIdx}.`);
          }
        }
        if (minIdx !== i) {
          const temp = tempArr[i];
          tempArr[i] = tempArr[minIdx];
          tempArr[minIdx] = temp;
          pushSortFrame([...tempArr], [i, minIdx], `Swapping index ${i} with minimum at index ${minIdx}. Array: [${tempArr.join(', ')}].`);
        }
      }
      pushSortFrame([...tempArr], [], `Selection Sort complete! Final sorted array: [${tempArr.join(', ')}].`);
    } else if (algo === 'insertion') {
      const tempArr = [...arr];
      const n = tempArr.length;
      for (let i = 1; i < n; i++) {
        let key = tempArr[i];
        let j = i - 1;
        pushSortFrame([...tempArr], [i], `Selecting key element ${key} at index ${i}.`);
        while (j >= 0 && tempArr[j] > key) {
          pushSortFrame([...tempArr], [j, j + 1], `Comparing ${tempArr[j]} at index ${j} with key ${key}. Shifting ${tempArr[j]} right.`);
          tempArr[j + 1] = tempArr[j];
          pushSortFrame([...tempArr], [j, j + 1], `Shifted ${tempArr[j]} to index ${j+1}.`);
          j--;
        }
        tempArr[j + 1] = key;
        pushSortFrame([...tempArr], [j + 1], `Inserted key ${key} at index ${j+1}. Array: [${tempArr.join(', ')}].`);
      }
      pushSortFrame([...tempArr], [], `Insertion Sort complete! Final sorted array: [${tempArr.join(', ')}].`);
    } else if (algo === 'quick') {
      const tempArr = [...arr];
      const quickSortHelper = function* (l, h) {
        if (l < h) {
          const pIdx = yield* partition(l, h);
          yield* quickSortHelper(l, pIdx - 1);
          yield* quickSortHelper(pIdx + 1, h);
        }
      };
      const partition = function* (l, h) {
        const pivot = tempArr[h];
        pushSortFrame([...tempArr], [h], `Choosing pivot element ${pivot} at index ${h}.`);
        let i = l - 1;
        for (let j = l; j < h; j++) {
          pushSortFrame([...tempArr], [j, h], `Comparing index ${j} (${tempArr[j]}) with pivot ${pivot}.`);
          if (tempArr[j] < pivot) {
            i++;
            const temp = tempArr[i];
            tempArr[i] = tempArr[j];
            tempArr[j] = temp;
            pushSortFrame([...tempArr], [i, j], `Swap index ${i} (${tempArr[i]}) and index ${j} (${tempArr[j]}).`);
          }
        }
        const temp = tempArr[i + 1];
        tempArr[i + 1] = tempArr[h];
        tempArr[h] = temp;
        pushSortFrame([...tempArr], [i + 1, h], `Placing pivot at its correct sorted position ${i+1}. Array: [${tempArr.join(', ')}].`);
        return i + 1;
      };
      
      const gen = quickSortHelper(0, tempArr.length - 1);
      let res = gen.next();
      while (!res.done) {
        res = gen.next();
      }
      pushSortFrame([...tempArr], [], `Quick Sort complete! Final sorted array: [${tempArr.join(', ')}].`);
    } else if (algo === 'merge') {
      const tempArr = [...arr];
      const mergeSortHelper = function* (l, r) {
        if (l < r) {
          const m = Math.floor((l + r) / 2);
          yield* mergeSortHelper(l, m);
          yield* mergeSortHelper(m + 1, r);
          yield* merge(l, m, r);
        }
      };
      const merge = function* (l, m, r) {
        const n1 = m - l + 1;
        const n2 = r - m;
        const L = [];
        const R = [];
        for (let idx = 0; idx < n1; idx++) L.push(tempArr[l + idx]);
        for (let idx = 0; idx < n2; idx++) R.push(tempArr[m + 1 + idx]);
        
        let idx1 = 0, idx2 = 0, k = l;
        while (idx1 < n1 && idx2 < n2) {
          pushSortFrame([...tempArr], [l + idx1, m + 1 + idx2], `Merging: comparing L[${idx1}] (${L[idx1]}) and R[${idx2}] (${R[idx2]}).`);
          if (L[idx1] <= R[idx2]) {
            tempArr[k] = L[idx1];
            idx1++;
          } else {
            tempArr[k] = R[idx2];
            idx2++;
          }
          pushSortFrame([...tempArr], [k], `Merged element ${tempArr[k]} at index ${k}.`);
          k++;
        }
        while (idx1 < n1) {
          tempArr[k] = L[idx1];
          pushSortFrame([...tempArr], [k], `Copy remaining element ${L[idx1]} from Left sub-array to index ${k}.`);
          idx1++;
          k++;
        }
        while (idx2 < n2) {
          tempArr[k] = R[idx2];
          pushSortFrame([...tempArr], [k], `Copy remaining element ${R[idx2]} from Right sub-array to index ${k}.`);
          idx2++;
          k++;
        }
      };
      const gen = mergeSortHelper(0, tempArr.length - 1);
      let res = gen.next();
      while (!res.done) {
        res = gen.next();
      }
      pushSortFrame([...tempArr], [], `Merge Sort complete! Final sorted array: [${tempArr.join(', ')}].`);
    }

    setFrames(steps);
    setFrameIndex(0);
    setIsPlaying(true);
  };

  // Graph Advanced Algorithms (BFS, DFS, Dijkstra)
  const runGraphAlgo = (algo) => {
    stopPlayback();
    const baseHeap = frames[0]?.heap || [];
    const baseStack = frames[0]?.stack || {};
    const steps = [];

    if (algo === 'bfs') {
      const queue = [];
      const visited = [];
      const startNode = baseHeap[0]?.addr;
      
      queue.push(startNode);
      visited.push(startNode);
      
      steps.push({
        heap: baseHeap,
        stack: { ...baseStack, queue: startNode },
        activeAddr: startNode,
        visited: [...visited],
        explanation: `BFS initialized at start node ${baseHeap.find(n => n.addr === startNode)?.val}. Added to Queue.`
      });

      while (queue.length > 0) {
        const curr = queue.shift();
        const currVal = baseHeap.find(n => n.addr === curr)?.val;
        
        steps.push({
          heap: baseHeap,
          stack: { ...baseStack, queue: queue.join(', ') || 'empty', current: curr },
          activeAddr: curr,
          visited: [...visited],
          explanation: `Dequeued node ${currVal}. Exploring unvisited neighbors.`
        });

        const neighbors = baseHeap.find(n => n.addr === curr)?.neighbors || [];
        for (let nbr of neighbors) {
          if (!visited.includes(nbr)) {
            visited.push(nbr);
            queue.push(nbr);
            
            steps.push({
              heap: baseHeap,
              stack: { ...baseStack, queue: queue.join(', '), current: curr },
              activeAddr: nbr,
              visited: [...visited],
              explanation: `Found unvisited neighbor ${baseHeap.find(n => n.addr === nbr)?.val}. Enqueued it.`
            });
          }
        }
      }
      steps.push({
        heap: baseHeap,
        stack: baseStack,
        activeAddr: null,
        visited: [...visited],
        explanation: `BFS Complete! Traversal order: ${visited.map(addr => baseHeap.find(n => n.addr === addr)?.val).join(' ➔ ')}`
      });
    } else if (algo === 'dfs') {
      const stack = [];
      const visited = [];
      const startNode = baseHeap[0]?.addr;
      
      stack.push(startNode);
      
      steps.push({
        heap: baseHeap,
        stack: { ...baseStack, stack: startNode },
        activeAddr: startNode,
        visited: [...visited],
        explanation: `DFS initialized at start node ${baseHeap.find(n => n.addr === startNode)?.val}. Pushed start node to Stack.`
      });

      while (stack.length > 0) {
        const curr = stack.pop();
        const currVal = baseHeap.find(n => n.addr === curr)?.val;
        
        if (!visited.includes(curr)) {
          visited.push(curr);
          
          steps.push({
            heap: baseHeap,
            stack: { ...baseStack, stack: stack.join(', ') || 'empty', current: curr },
            activeAddr: curr,
            visited: [...visited],
            explanation: `Popped node ${currVal} from Stack. Marked it visited and pushing unvisited neighbors.`
          });

          const neighbors = baseHeap.find(n => n.addr === curr)?.neighbors || [];
          for (let i = neighbors.length - 1; i >= 0; i--) {
            const nbr = neighbors[i];
            if (!visited.includes(nbr)) {
              stack.push(nbr);
              
              steps.push({
                heap: baseHeap,
                stack: { ...baseStack, stack: stack.join(', '), current: curr },
                activeAddr: nbr,
                visited: [...visited],
                explanation: `Push unvisited neighbor ${baseHeap.find(n => n.addr === nbr)?.val} to Stack.`
              });
            }
          }
        }
      }
      steps.push({
        heap: baseHeap,
        stack: baseStack,
        activeAddr: null,
        visited: [...visited],
        explanation: `DFS Complete! Traversal order: ${visited.map(addr => baseHeap.find(n => n.addr === addr)?.val).join(' ➔ ')}`
      });
    } else if (algo === 'dijkstra') {
      const dist = {};
      const visited = [];
      const startNode = baseHeap[0]?.addr;
      
      baseHeap.forEach(node => {
        dist[node.addr] = Infinity;
      });
      dist[startNode] = 0;

      const pushDijkstraFrame = (activeNode, activeNbr = null, explanation = '') => {
        steps.push({
          heap: baseHeap,
          stack: { ...baseStack, current: activeNode, visiting: activeNbr },
          activeAddr: activeNode,
          visited: [...visited],
          dist: { ...dist },
          explanation: explanation
        });
      };

      pushDijkstraFrame(startNode, null, `Dijkstra initialized. Set dist[${baseHeap.find(n => n.addr === startNode)?.val}] = 0, all other nodes = ∞.`);

      while (visited.length < baseHeap.length) {
        let u = null;
        let minDist = Infinity;
        for (let node of baseHeap) {
          if (!visited.includes(node.addr) && dist[node.addr] < minDist) {
            minDist = dist[node.addr];
            u = node.addr;
          }
        }

        if (u === null) break;

        const uVal = baseHeap.find(n => n.addr === u)?.val;
        pushDijkstraFrame(u, null, `Selected unvisited node ${uVal} with minimum distance ${minDist}.`);
        
        visited.push(u);
        pushDijkstraFrame(u, null, `Marked node ${uVal} as visited.`);

        const neighbors = baseHeap.find(n => n.addr === u)?.neighbors || [];
        for (let nbr of neighbors) {
          if (!visited.includes(nbr)) {
            const edge = GRAPH_EDGES.find(
              ge => (ge.u === u && ge.v === nbr) || (ge.u === nbr && ge.v === u)
            );
            const weight = edge ? edge.weight : 1;
            const alt = dist[u] + weight;
            const nbrVal = baseHeap.find(n => n.addr === nbr)?.val;
            
            pushDijkstraFrame(u, nbr, `Evaluating neighbor ${nbrVal}. Distance is dist[${uVal}] (${dist[u]}) + weight (${weight}) = ${alt}.`);
            
            if (alt < dist[nbr]) {
              dist[nbr] = alt;
              pushDijkstraFrame(u, nbr, `Found shorter path to ${nbrVal}! Updated dist[${nbrVal}] = ${alt}.`);
            }
          }
        }
      }
      steps.push({
        heap: baseHeap,
        stack: baseStack,
        activeAddr: null,
        visited: [...visited],
        dist: { ...dist },
        explanation: `Dijkstra complete! Shortest distances from A: ${visited.map(addr => `${baseHeap.find(n => n.addr === addr)?.val}: ${dist[addr]}`).join(', ')}`
      });
    }

    setFrames(steps);
    setFrameIndex(0);
    setIsPlaying(true);
  };

  // AVL Tree Self-Balancing Rotation Trace Generator
  const runAVLBalance = () => {
    stopPlayback();
    const steps = [];
    
    const initialAVLHeap = [
      { addr: '0x1A2B', val: 50, left: '0x3C4D', right: '0x5E6F', x: 50, y: 20, delay: 0 },
      { addr: '0x3C4D', val: 30, left: 'NULL', right: 'NULL', x: 25, y: 45, delay: 0.4 },
      { addr: '0x5E6F', val: 70, left: '0x7G8H', right: '0x9I0J', x: 75, y: 45, delay: 0.8 },
      { addr: '0x7G8H', val: 60, left: 'NULL', right: 'NULL', x: 65, y: 70, delay: 1.2 },
      { addr: '0x9I0J', val: 80, left: 'NULL', right: 'NULL', x: 85, y: 70, delay: 1.6 }
    ];

    steps.push({
      heap: initialAVLHeap,
      stack: { root: '0x1A2B' },
      activeAddr: null,
      visited: [],
      explanation: 'AVL Tree before insertion. Balanced. We will insert a new element (90).'
    });

    const insertedAVLHeap = [
      ...initialAVLHeap,
      { addr: '0x2K3L', val: 90, left: 'NULL', right: 'NULL', x: 92, y: 85, delay: 0 }
    ];
    insertedAVLHeap[4] = { ...insertedAVLHeap[4], right: '0x2K3L' };

    steps.push({
      heap: insertedAVLHeap,
      stack: { root: '0x1A2B', inserted: '0x2K3L' },
      activeAddr: '0x2K3L',
      visited: [],
      explanation: 'Inserted node 90 at address 0x2K3L. Re-evaluating balance factors upwards.'
    });

    steps.push({
      heap: insertedAVLHeap,
      stack: { root: '0x1A2B', critical: '0x5E6F' },
      activeAddr: '0x5E6F',
      visited: ['0x9I0J', '0x2K3L'],
      explanation: 'Unbalance detected at node 70 (0x5E6F)! Balance Factor is -2 (Right-Right heavy). Triggering a Left Rotation.'
    });

    const rotatedAVLHeap = [
      { addr: '0x1A2B', val: 50, left: '0x3C4D', right: '0x9I0J', x: 50, y: 20, delay: 0 },
      { addr: '0x3C4D', val: 30, left: 'NULL', right: 'NULL', x: 25, y: 45, delay: 0.4 },
      { addr: '0x5E6F', val: 70, left: '0x7G8H', right: 'NULL', x: 65, y: 70, delay: 0.8 },
      { addr: '0x7G8H', val: 60, left: 'NULL', right: 'NULL', x: 55, y: 85, delay: 1.2 },
      { addr: '0x9I0J', val: 80, left: '0x5E6F', right: '0x2K3L', x: 75, y: 45, delay: 1.6 },
      { addr: '0x2K3L', val: 90, left: 'NULL', right: 'NULL', x: 85, y: 70, delay: 0 }
    ];

    steps.push({
      heap: rotatedAVLHeap,
      stack: { root: '0x1A2B', rotated: '0x9I0J' },
      activeAddr: '0x9I0J',
      visited: [],
      explanation: 'Left rotation complete! Node 80 (0x9I0J) is now the parent of 70 (0x5E6F) and 90 (0x2K3L). Tree is balanced.'
    });

    setFrames(steps);
    setFrameIndex(0);
    setIsPlaying(true);
  };

  // Execute custom operation
  const handleExecuteAction = (type) => {
    const num = parseInt(inputVal, 10);
    setInputVal('');

    if (type === 'insert') {
      if (isNaN(num)) return alert('Enter a numeric value.');
      if (structure === 'list') runListInsertHead(num);
      else if (structure === 'doubly') runDoublyInsertHead(num);
      else if (structure === 'stack') runStackPush(num);
      else if (structure === 'queue') runQueueEnqueue(num);
    } else if (type === 'delete') {
      if (structure === 'list') runListDeleteHead();
      else if (structure === 'doubly') runListDeleteHead(); // delete head works same
      else if (structure === 'stack') runStackPop();
      else if (structure === 'queue') runQueueDequeue();
    } else if (type === 'traverse') {
      if (structure === 'bst') runBSTInOrder();
      else if (structure === 'graph') runGraphBFS();
    }
  };

  const currentFrame = frames[frameIndex] || { heap: [], stack: {}, activeAddr: null, visited: [], explanation: '' };

  const handleDragStart = (e) => {
    isDraggingRef.current = true;
    dragStartRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleDragMove = (e) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    setRotation(prev => ({
      x: Math.min(Math.max(prev.x - dy * 0.35, -15), 65),
      y: prev.y + dx * 0.35
    }));
    dragStartRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleDragEnd = () => {
    isDraggingRef.current = false;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', height: isFullscreen ? 'calc(100vh - 120px)' : 'calc(100vh - var(--header-height) - 180px)', overflow: 'hidden' }}>
      
      {/* Dynamic styles for animated pointer flows and node bobbing effects */}
      <style>{`
        @keyframes flowPulse {
          from { stroke-dashoffset: 24; }
          to { stroke-dashoffset: 0; }
        }
        .neon-flow-line {
          stroke-dasharray: 6, 6;
          animation: flowPulse 0.8s linear infinite;
        }
        @keyframes bounceBob {
          0%, 100% { transform: translate(-50%, -50%) translateZ(24px) translateY(0px); }
          50% { transform: translate(-50%, -50%) translateZ(24px) translateY(-5px); }
        }
        .bounce-floating-node {
          animation: bounceBob 3.2s ease-in-out infinite;
        }
        .orbit-canvas-space {
          cursor: grab;
        }
        .orbit-canvas-space:active {
          cursor: grabbing;
        }
        .playback-btn {
          background: rgba(255,255,255,0.04);
          border: 1px solid var(--border-glass);
          color: #fff;
          border-radius: 6px;
          padding: 6px 12px;
          cursor: pointer;
          font-size: 0.8rem;
          transition: all 0.2s;
        }
        .playback-btn:hover {
          background: var(--accent-purple);
        }
        .playback-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
      `}</style>

      {/* Main Workspace Grid */}
      <div style={{ display: 'flex', flexGrow: 1, gap: '16px', overflow: 'hidden', minHeight: 0 }}>
        
        {/* Left Side Parameters Pane */}
        <div style={{ width: '325px', display: 'flex', flexDirection: 'column', gap: '16px', flexShrink: 0 }}>
          <div className="card" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h3 style={{ margin: 0, fontSize: '0.92rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>🧊</span> DSA Hub Selector
            </h3>

            {/* Select Data Structure concept */}
            <select 
              className="algorithm-selector" 
              value={structure} 
              onChange={e => setStructure(e.target.value)}
              style={{ width: '100%', fontSize: '0.82rem' }}
            >
              <option value="list">Singly Linked List</option>
              <option value="doubly">Doubly Linked List</option>
              <option value="stack">Stack (LIFO)</option>
              <option value="queue">Queue (FIFO)</option>
              <option value="bst">Binary Search Tree</option>
              <option value="avl">AVL Tree (Balanced)</option>
              <option value="heap">Binary Min-Heap</option>
              <option value="graph">Graph Mesh (BFS/DFS/Dijkstra)</option>
              <option value="array">Array (Sorting Algorithms)</option>
            </select>

            {/* Operations Interface */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px solid var(--border-glass)', paddingTop: '12px', marginTop: '4px', width: '100%' }}>
              {structure === 'array' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Select Sorting Algorithm:</div>
                  <select 
                    className="algorithm-selector" 
                    id="sorting-algo-select"
                    style={{ width: '100%', fontSize: '0.78rem', padding: '6px' }}
                  >
                    <option value="bubble">Bubble Sort</option>
                    <option value="selection">Selection Sort</option>
                    <option value="insertion">Insertion Sort</option>
                    <option value="merge">Merge Sort</option>
                    <option value="quick">Quick Sort</option>
                  </select>
                  <button className="btn btn-primary btn-sm" style={{ width: '100%' }} onClick={() => {
                    const algo = document.getElementById('sorting-algo-select')?.value || 'bubble';
                    runSortingAlgo(algo);
                  }}>
                    Run Sort Animation
                  </button>
                </div>
              )}

              {structure === 'graph' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Select Graph Algorithm:</div>
                  <select 
                    className="algorithm-selector" 
                    id="graph-algo-select"
                    style={{ width: '100%', fontSize: '0.78rem', padding: '6px' }}
                  >
                    <option value="bfs">BFS Traversal</option>
                    <option value="dfs">DFS Traversal</option>
                    <option value="dijkstra">Dijkstra's Shortest Path</option>
                  </select>
                  <button className="btn btn-primary btn-sm" style={{ width: '100%' }} onClick={() => {
                    const algo = document.getElementById('graph-algo-select')?.value || 'bfs';
                    runGraphAlgo(algo);
                  }}>
                    Run Graph Algorithm
                  </button>
                </div>
              )}

              {structure === 'avl' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
                  <button className="btn btn-primary btn-sm" style={{ width: '100%' }} onClick={() => runAVLBalance()}>
                    Animate Self-Balancing (AVL)
                  </button>
                </div>
              )}

              {structure === 'bst' && (
                <div style={{ display: 'flex', gap: '8px', width: '100%' }}>
                  <input 
                    type="number"
                    className="text-input"
                    placeholder="Val"
                    value={inputVal}
                    onChange={e => setInputVal(e.target.value)}
                    style={{ width: '60px', padding: '6px', fontSize: '0.8rem' }}
                  />
                  <button className="btn btn-primary btn-sm" style={{ flexGrow: 1 }} onClick={() => handleExecuteAction('insert')}>Insert</button>
                  <button className="btn btn-secondary btn-sm" style={{ flexGrow: 1 }} onClick={() => handleExecuteAction('traverse')}>In-Order Walk</button>
                </div>
              )}

              {['list', 'doubly', 'stack', 'queue', 'heap'].includes(structure) && (
                <div style={{ display: 'flex', gap: '8px', width: '100%' }}>
                  <input 
                    type="number"
                    className="text-input"
                    placeholder="Val"
                    value={inputVal}
                    onChange={e => setInputVal(e.target.value)}
                    style={{ width: '60px', padding: '6px', fontSize: '0.8rem' }}
                  />
                  <button className="btn btn-primary btn-sm" style={{ flexGrow: 1 }} onClick={() => handleExecuteAction('insert')}>
                    {structure === 'heap' ? 'Insert/Heapify' : 'Insert/Push'}
                  </button>
                  <button className="btn btn-secondary btn-sm" style={{ flexGrow: 1 }} onClick={() => handleExecuteAction('delete')}>
                    {structure === 'heap' ? 'Extract Min' : 'Delete/Pop'}
                  </button>
                </div>
              )}
            </div>

            {/* 3D Camera Controls */}
            <div style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                <span>Zoom Level:</span>
                <span>{zoom.toFixed(2)}x</span>
              </div>
              <input type="range" min="0.5" max="1.5" step="0.05" value={zoom} onChange={e => setZoom(parseFloat(e.target.value))} />
              
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                <span>Camera Height:</span>
                <span>{rotation.x}°</span>
              </div>
              <input type="range" min="-10" max="65" value={rotation.x} onChange={e => setRotation(prev => ({ ...prev, x: parseInt(e.target.value) }))} />

              <button className="btn btn-secondary btn-sm" style={{ fontSize: '0.72rem', padding: '4px' }} onClick={() => { setRotation({ x: 20, y: -10 }); setZoom(1.0); setPerspective(1200); }}>
                Reset View Direction
              </button>
            </div>
          </div>

          {/* Stepper / Playback Controller */}
          <div className="card" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h3 style={{ margin: 0, fontSize: '0.9rem', color: 'var(--accent-cyan)' }}>⏳ Trace Playback</h3>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
              <button className="playback-btn" disabled={frameIndex === 0} onClick={() => setFrameIndex(prev => prev - 1)}>
                ◀ Step
              </button>
              <button className="playback-btn" onClick={() => setIsPlaying(!isPlaying)} style={{ flexGrow: 1, fontWeight: 'bold' }}>
                {isPlaying ? '⏸ Pause' : '▶ Auto-Play'}
              </button>
              <button className="playback-btn" disabled={frameIndex >= frames.length - 1} onClick={() => setFrameIndex(prev => prev + 1)}>
                Step ▶
              </button>
            </div>

            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center' }}>
              Frame {frameIndex + 1} of {frames.length}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', borderTop: '1px solid var(--border-glass)', paddingTop: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                <span>Playback Speed:</span>
                <span>{delay}ms</span>
              </div>
              <input type="range" min="300" max="2000" step="100" value={delay} onChange={e => setDelay(parseInt(e.target.value))} />
            </div>
          </div>

          {/* Live Explanation logs panel */}
          <div className="card" style={{ padding: '16px', flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '8px', overflowY: 'auto' }}>
            <h3 style={{ margin: 0, fontSize: '0.85rem', color: 'var(--accent-purple)' }}>📢 Step Logic Description</h3>
            <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
              {currentFrame.explanation}
            </p>
          </div>
        </div>

        {/* Right Side Tilted 3D Pointer canvas */}
        <div 
          className="card orbit-canvas-space"
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          style={{ flexGrow: 1, background: '#070810', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', userSelect: 'none' }}
        >
          {/* Header instructions */}
          <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-glass)', zIndex: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(7,8,16,0.85)', backdropFilter: 'blur(6px)' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Perspective: <strong>3D Pointer Heap Grid</strong></span>
            <span style={{ fontSize: '0.78rem', color: 'var(--accent-cyan)', fontWeight: '500' }}>🖱️ Left-Click & Drag to Rotate Plane</span>
          </div>

          {/* 3D viewport canvas */}
          <div 
            style={{ 
              flexGrow: 1, 
              position: 'relative', 
              perspective: `${perspective}px`, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              overflow: 'hidden'
            }}
          >
            {/* 3D Tilted Grid wrapper */}
            <div 
              style={{
                position: 'absolute',
                width: '90%',
                height: '80%',
                background: 'radial-gradient(circle, rgba(124, 77, 255, 0.05) 1.5px, transparent 1.5px)',
                backgroundSize: '28px 28px',
                border: '1.5px solid rgba(255, 255, 255, 0.04)',
                borderRadius: '24px',
                transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${zoom})`,
                transformStyle: 'preserve-3d',
                boxShadow: '0 25px 60px rgba(0,0,0,0.7)',
                transition: isDraggingRef.current ? 'none' : 'transform 0.4s cubic-bezier(0.1, 0.8, 0.3, 1)'
              }}
            >
              {/* Stack segment (Left) */}
              <div 
                style={{
                  position: 'absolute',
                  left: '2%',
                  top: '10%',
                  bottom: '10%',
                  width: '180px',
                  background: 'rgba(255, 255, 255, 0.01)',
                  borderRight: '1px dashed rgba(255,255,255,0.08)',
                  padding: '12px',
                  boxSizing: 'border-box',
                  transform: 'translateZ(10px)',
                  transformStyle: 'preserve-3d'
                }}
              >
                <div style={{ color: 'var(--accent-cyan)', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold', marginBottom: '16px' }}>
                  📥 Stack segment
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {Object.entries(currentFrame.stack).map(([key, val]) => (
                    <div 
                      key={key} 
                      style={{ 
                        background: 'rgba(255,255,255,0.03)', 
                        border: '1px solid var(--border-glass)', 
                        borderRadius: '6px', 
                        padding: '8px 10px',
                        fontSize: '0.78rem',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.35)',
                        transform: 'translateZ(15px)'
                      }}
                    >
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.62rem' }}>variable</div>
                      <div style={{ fontWeight: 'bold', color: 'var(--accent-purple)' }}>{key}</div>
                      <div style={{ fontFamily: 'monospace', color: 'var(--text-secondary)', fontSize: '0.72rem', marginTop: '4px', wordBreak: 'break-all' }}>
                        ptr: <span style={{ color: '#fff' }}>{val}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Heap segment (Right) */}
              <div 
                style={{ 
                  position: 'absolute', 
                  left: '200px', 
                  right: 0, 
                  top: 0, 
                  bottom: 0,
                  transformStyle: 'preserve-3d'
                }}
              >
                <div style={{ position: 'absolute', left: '16px', top: '12px', color: 'var(--accent-purple)', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold' }}>
                  📦 Heap Segment (Free Space)
                </div>

                {/* SVG Connections Canvas */}
                <svg 
                  style={{ 
                    position: 'absolute', 
                    top: 0, 
                    left: 0, 
                    width: '100%', 
                    height: '100%', 
                    pointerEvents: 'none', 
                    zIndex: 0,
                    overflow: 'visible'
                  }}
                >
                  <defs>
                    <marker id="arrow" viewBox="0 0 10 10" refX="24" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M0,0 L10,5 L0,10 z" fill="var(--accent-cyan)" />
                    </marker>
                    <marker id="arrow-stack" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M0,0 L10,5 L0,10 z" fill="var(--accent-purple)" />
                    </marker>
                    <marker id="arrow-prev" viewBox="0 0 10 10" refX="24" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M0,0 L10,5 L0,10 z" fill="var(--accent-rose)" />
                    </marker>
                  </defs>

                  {/* Draw edges between heap nodes */}
                  {currentFrame.heap.map(node => {
                    const targets = [];
                    
                    if ((structure === 'list' || structure === 'array') && node.next !== 'NULL') {
                      targets.push({ type: 'next', addr: node.next, color: 'var(--accent-cyan)' });
                    } else if (structure === 'doubly') {
                      if (node.next && node.next !== 'NULL') {
                        targets.push({ type: 'next', addr: node.next, color: 'var(--accent-cyan)', offset: -3 });
                      }
                      if (node.prev && node.prev !== 'NULL') {
                        targets.push({ type: 'prev', addr: node.prev, color: 'var(--accent-rose)', offset: 3 });
                      }
                    } else if (structure === 'stack' && node.next !== 'NULL') {
                      targets.push({ type: 'next', addr: node.next, color: 'var(--accent-cyan)' });
                    } else if (structure === 'queue' && node.next !== 'NULL') {
                      targets.push({ type: 'next', addr: node.next, color: 'var(--accent-cyan)' });
                    } else if (structure === 'bst' || structure === 'avl' || structure === 'heap') {
                      if (node.left && node.left !== 'NULL') targets.push({ type: 'left', addr: node.left, color: 'var(--accent-cyan)' });
                      if (node.right && node.right !== 'NULL') targets.push({ type: 'right', addr: node.right, color: 'var(--accent-cyan)' });
                    } else if (structure === 'graph' && node.neighbors) {
                      node.neighbors.forEach(nbr => {
                        targets.push({ type: 'neighbor', addr: nbr, color: 'var(--accent-cyan)' });
                      });
                    }

                    return targets.map((target, idx) => {
                      const targetNode = currentFrame.heap.find(n => n.addr === target.addr);
                      if (!targetNode) return null;

                      const off = target.offset || 0;
                      const x1 = `${node.x}%`;
                      const y1 = `${node.y + off}%`;
                      const x2 = `${targetNode.x}%`;
                      const y2 = `${targetNode.y + off}%`;

                      const weightEdge = structure === 'graph' && GRAPH_EDGES.find(
                        ge => (ge.u === node.addr && ge.v === target.addr) || 
                              (ge.u === target.addr && ge.v === node.addr)
                      );

                      return (
                        <g key={`${node.addr}-${target.addr}-${idx}`}>
                          <line 
                            x1={x1}
                            y1={y1}
                            x2={x2}
                            y2={y2}
                            stroke={target.color}
                            strokeWidth="2.5"
                            className="neon-flow-line"
                            markerEnd={target.type === 'prev' ? "url(#arrow-prev)" : "url(#arrow)"}
                            style={{ 
                              opacity: 0.85, 
                              filter: `drop-shadow(0 0 6px ${target.color})`,
                            }}
                          />
                          {weightEdge && (
                            <text
                              x={`${(parseFloat(node.x) + parseFloat(targetNode.x)) / 2}%`}
                              y={`${(parseFloat(node.y) + parseFloat(targetNode.y)) / 2 - 2}%`}
                              fill="var(--accent-rose)"
                              fontSize="0.75rem"
                              fontWeight="bold"
                              textAnchor="middle"
                              style={{ filter: 'drop-shadow(0 0 2px #000)' }}
                            >
                              {weightEdge.weight}
                            </text>
                          )}
                        </g>
                      );
                    });
                  })}

                  {/* Draw pointer lines from stack variables to heap nodes */}
                  {Object.entries(currentFrame.stack).map(([key, val], idx) => {
                    const targetNode = currentFrame.heap.find(n => n.addr === val);
                    if (!targetNode) return null;

                    const x1 = '0%';
                    const y1 = `${20 + idx * 22}%`;
                    const x2 = `${targetNode.x}%`;
                    const y2 = `${targetNode.y}%`;

                    return (
                      <line 
                        key={`stack-${key}`}
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke="var(--accent-purple)"
                        strokeWidth="2.5"
                        markerEnd="url(#arrow-stack)"
                        style={{ 
                          opacity: 0.65,
                          filter: 'drop-shadow(0 0 5px var(--accent-purple))',
                        }}
                      />
                    );
                  })}
                </svg>

                {/* Floating Heap Blocks */}
                {currentFrame.heap.map(node => {
                  const isActive = currentFrame.activeAddr === node.addr;
                  const isVisited = currentFrame.visited.includes(node.addr);
                  
                  let borderStyle = '1px solid var(--border-glass)';
                  let glowStyle = '0 10px 24px rgba(0,0,0,0.5)';
                  
                  if (isActive) {
                    borderStyle = '2px solid var(--accent-cyan)';
                    glowStyle = '0 0 24px rgba(0, 229, 255, 0.6)';
                  } else if (isVisited) {
                    borderStyle = '2.5px solid var(--accent-emerald)';
                    glowStyle = '0 0 24px rgba(0, 230, 118, 0.4)';
                  }

                  return (
                    <div 
                      key={node.addr}
                      onClick={() => setActiveAddress(node.addr)}
                      className="bounce-floating-node"
                      style={{
                        position: 'absolute',
                        left: `${node.x}%`,
                        top: `${node.y}%`,
                        animationDelay: `${node.delay || 0}s`,
                        background: 'rgba(10, 11, 22, 0.88)',
                        border: borderStyle,
                        boxShadow: glowStyle,
                        borderRadius: '10px',
                        padding: '12px 14px',
                        color: '#fff',
                        cursor: 'pointer',
                        zIndex: 5,
                        width: '130px',
                        backdropFilter: 'blur(10px)',
                        transformStyle: 'preserve-3d',
                        transition: 'border 0.2s, box-shadow 0.2s'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.62rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                        <span>addr</span>
                        <span style={{ fontFamily: 'monospace' }}>{node.addr}</span>
                      </div>

                      <div style={{ fontSize: '1.2rem', fontWeight: 'bold', textAlign: 'center', margin: '4px 0', color: 'var(--accent-purple)' }}>
                        {node.val}
                      </div>

                      {/* Display child field linkages */}
                      <div style={{ fontSize: '0.62rem', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '6px', marginTop: '4px', display: 'flex', flexDirection: 'column', gap: '2px', fontFamily: 'monospace' }}>
                        {['list', 'array'].includes(structure) && (
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: 'var(--text-muted)' }}>next:</span>
                            <span style={{ color: node.next === 'NULL' ? 'var(--accent-rose)' : 'var(--accent-cyan)' }}>{node.next}</span>
                          </div>
                        )}
                        {structure === 'doubly' && (
                          <>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                              <span style={{ color: 'var(--text-muted)' }}>prev:</span>
                              <span style={{ color: node.prev === 'NULL' ? 'var(--accent-rose)' : 'var(--accent-rose)' }}>{node.prev}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                              <span style={{ color: 'var(--text-muted)' }}>next:</span>
                              <span style={{ color: node.next === 'NULL' ? 'var(--accent-rose)' : 'var(--accent-cyan)' }}>{node.next}</span>
                            </div>
                          </>
                        )}
                        {structure === 'stack' && (
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: 'var(--text-muted)' }}>next:</span>
                            <span style={{ color: node.next === 'NULL' ? 'var(--accent-rose)' : 'var(--accent-cyan)' }}>{node.next}</span>
                          </div>
                        )}
                        {structure === 'queue' && (
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: 'var(--text-muted)' }}>next:</span>
                            <span style={{ color: node.next === 'NULL' ? 'var(--accent-rose)' : 'var(--accent-cyan)' }}>{node.next}</span>
                          </div>
                        )}
                        {['bst', 'avl', 'heap'].includes(structure) && (
                          <>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                              <span style={{ color: 'var(--text-muted)' }}>left:</span>
                              <span style={{ color: node.left === 'NULL' ? 'var(--accent-rose)' : 'var(--accent-cyan)' }}>{node.left}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                              <span style={{ color: 'var(--text-muted)' }}>right:</span>
                              <span style={{ color: node.right === 'NULL' ? 'var(--accent-rose)' : 'var(--accent-cyan)' }}>{node.right}</span>
                            </div>
                          </>
                        )}
                        {structure === 'graph' && (
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: 'var(--text-muted)' }}>nbrs:</span>
                            <span style={{ color: 'var(--accent-cyan)' }}>{(node.neighbors || []).slice(0,2).join(',')}</span>
                          </div>
                        )}
                        {currentFrame.dist && currentFrame.dist[node.addr] !== undefined && (
                          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--accent-cyan)', fontWeight: 'bold', borderTop: '1px dashed rgba(255,255,255,0.06)', paddingTop: '4px', marginTop: '2px' }}>
                            <span>dist:</span>
                            <span>{currentFrame.dist[node.addr] === Infinity ? '∞' : currentFrame.dist[node.addr]}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
