// Data Structures Visualizer Module for DSA Learning Hub

let viewport = null;
let structContainer = null;
let currentDS = 'ds-stack';

// Structures state
let stackData = [45, 12, 89];
let queueData = [23, 76, 54, 88];
let listData = [17, 39, 62, 95];

class BSTNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}
let bstRoot = null;

// Initialize some default BST nodes
function initDefaultBST() {
  bstRoot = new BSTNode(50);
  bstRoot.left = new BSTNode(30);
  bstRoot.right = new BSTNode(70);
  bstRoot.left.left = new BSTNode(20);
  bstRoot.left.right = new BSTNode(40);
  bstRoot.right.left = new BSTNode(60);
  bstRoot.right.right = new BSTNode(80);
}
initDefaultBST();

// Complexity mapping
export const dsComplexity = {
  "ds-stack": { worstTime: "Push/Pop: O(1)", bestTime: "Search: O(N)", space: "O(N)", desc: "A Stack is a LIFO (Last In First Out) structure. Elements are added and removed from the top only." },
  "ds-queue": { worstTime: "Enqueue/Dequeue: O(1)", bestTime: "Search: O(N)", space: "O(N)", desc: "A Queue is a FIFO (First In First Out) structure. Elements are enqueued at the back and dequeued from the front." },
  "ds-linkedlist": { worstTime: "Insert (Head): O(1)", bestTime: "Lookup: O(N)", space: "O(N)", desc: "A Singly Linked List is a linear collection of nodes where each node links to the next. Offers O(1) head insertion." },
  "ds-bst": { worstTime: "Search/Insert: O(log N)", bestTime: "Worst (unbalanced): O(N)", space: "O(N)", desc: "A Binary Search Tree orders children such that left < parent < right. Provides fast binary searches." }
};

// Pseudocode for data structures
const dsPseudocode = {
  "ds-stack": [
    "stack.push(val):",
    "  array.append(val)",
    "  top = val",
    "",
    "stack.pop():",
    "  if array.isEmpty: return null",
    "  return array.removeLast()"
  ],
  "ds-queue": [
    "queue.enqueue(val):",
    "  array.append(val)",
    "  rear = val",
    "",
    "queue.dequeue():",
    "  if array.isEmpty: return null",
    "  return array.removeFirst()"
  ],
  "ds-linkedlist": [
    "list.insertAtHead(val):",
    "  newNode = Node(val)",
    "  newNode.next = head",
    "  head = newNode",
    "",
    "list.deleteHead():",
    "  if head is null: return null",
    "  head = head.next"
  ],
  "ds-bst": [
    "bst.insert(node, val):",
    "  if node is null: return Node(val)",
    "  if val < node.val:",
    "    node.left = insert(node.left, val)",
    "  else:",
    "    node.right = insert(node.right, val)",
    "  return node"
  ]
};

export function initDS(viewportContainer, type) {
  viewport = viewportContainer;
  structContainer = document.getElementById('struct-container');
  currentDS = type;
  
  // Show inputs
  document.getElementById('ds-controls-group').style.display = 'flex';
  document.getElementById('btn-generate').style.display = 'none';
  document.getElementById('btn-play-pause').style.display = 'none';
  document.getElementById('btn-step').style.display = 'none';
  
  // Show search button only for BST and Linked List
  const searchBtn = document.getElementById('ds-btn-search');
  if (type === 'ds-bst' || type === 'ds-linkedlist') {
    searchBtn.style.display = 'inline-flex';
  } else {
    searchBtn.style.display = 'none';
  }

  // Load pseudocode
  loadDSPseudocode(type);
  
  renderDS();
}

function loadDSPseudocode(type) {
  const container = document.getElementById('pseudocode-container');
  container.innerHTML = '';
  const lines = dsPseudocode[type] || [];
  lines.forEach((lineText, idx) => {
    const lineDiv = document.createElement('div');
    lineDiv.className = 'pseudocode-line';
    lineDiv.id = `ds-pc-line-${idx}`;
    lineDiv.textContent = lineText;
    container.appendChild(lineDiv);
  });
}

function highlightDSPseudocodeLine(idx) {
  document.querySelectorAll('.pseudocode-line').forEach(el => el.classList.remove('active'));
  if (idx !== null) {
    const activeEl = document.getElementById(`ds-pc-line-${idx}`);
    if (activeEl) activeEl.classList.add('active');
  }
}

// Main DS Render Dispatcher
export function renderDS() {
  if (structContainer) structContainer.innerHTML = '';
  // Clear SVG lines
  const svg = document.getElementById('tree-svg');
  if (svg) svg.innerHTML = '';
  const treeNodes = document.getElementById('tree-nodes');
  if (treeNodes) treeNodes.innerHTML = '';

  if (currentDS === 'ds-stack') {
    renderStack();
  } else if (currentDS === 'ds-queue') {
    renderQueue();
  } else if (currentDS === 'ds-linkedlist') {
    renderLinkedList();
  }
}

function getDelay() {
  return parseInt(document.getElementById('speed-slider').value, 10);
}

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/* =========================================================================
   STACK OPERATIONS
   ========================================================================= */
function renderStack(highlightIndex = null) {
  if (!structContainer) return;
  structContainer.innerHTML = '';
  
  // Outer stack barrel
  const barrel = document.createElement('div');
  barrel.style.width = '180px';
  barrel.style.height = '85%';
  barrel.style.border = '3px dashed var(--border-glass)';
  barrel.style.borderTop = 'none';
  barrel.style.borderRadius = '0 0 var(--radius-lg) var(--radius-lg)';
  barrel.style.display = 'flex';
  barrel.style.flexDirection = 'column-reverse';
  barrel.style.alignItems = 'center';
  barrel.style.justifyContent = 'flex-start';
  barrel.style.padding = '12px';
  barrel.style.gap = '8px';
  barrel.style.background = 'rgba(255, 255, 255, 0.02)';
  
  stackData.forEach((val, idx) => {
    const element = document.createElement('div');
    element.className = 'struct-node';
    element.style.borderRadius = 'var(--radius-md)';
    element.style.width = '100%';
    element.style.height = '48px';
    element.textContent = val;
    
    if (idx === stackData.length - 1) {
      element.classList.add('active');
      const ptr = document.createElement('span');
      ptr.className = 'struct-node-pointer';
      ptr.textContent = 'TOP';
      element.appendChild(ptr);
    }
    
    if (idx === highlightIndex) {
      element.classList.add('highlight');
    }
    
    barrel.appendChild(element);
  });
  
  structContainer.appendChild(barrel);
}

export async function pushStack(val) {
  if (stackData.length >= 6) {
    alert("Stack Overflow! Maximum visualization capacity reached.");
    return;
  }
  highlightDSPseudocodeLine(0);
  await sleep(getDelay() / 2);
  stackData.push(val);
  highlightDSPseudocodeLine(1);
  renderStack(stackData.length - 1);
  await sleep(getDelay());
  highlightDSPseudocodeLine(2);
  renderStack();
}

export async function popStack() {
  if (stackData.length === 0) {
    alert("Stack Underflow!");
    return;
  }
  highlightDSPseudocodeLine(4);
  await sleep(getDelay() / 2);
  highlightDSPseudocodeLine(5);
  renderStack(stackData.length - 1);
  await sleep(getDelay());
  stackData.pop();
  highlightDSPseudocodeLine(6);
  renderStack();
}

/* =========================================================================
   QUEUE OPERATIONS
   ========================================================================= */
function renderQueue(highlightIndex = null) {
  if (!structContainer) return;
  structContainer.innerHTML = '';
  
  const lineContainer = document.createElement('div');
  lineContainer.className = 'linear-container';
  
  queueData.forEach((val, idx) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'node-wrapper';
    
    const node = document.createElement('div');
    node.className = 'struct-node';
    node.textContent = val;
    
    // Front pointer
    if (idx === 0) {
      node.style.borderColor = 'var(--accent-cyan)';
      const ptr = document.createElement('span');
      ptr.className = 'struct-node-pointer';
      ptr.textContent = 'FRONT';
      node.appendChild(ptr);
    }
    // Rear pointer
    if (idx === queueData.length - 1 && queueData.length > 1) {
      node.style.borderColor = 'var(--accent-purple)';
      const ptr = document.createElement('span');
      ptr.className = 'struct-node-pointer';
      ptr.textContent = 'REAR';
      node.appendChild(ptr);
    } else if (idx === queueData.length - 1 && queueData.length === 1) {
      // Single element is both FRONT and REAR
      const ptr = node.querySelector('.struct-node-pointer');
      if (ptr) ptr.textContent = 'FRONT / REAR';
    }
    
    if (idx === highlightIndex) {
      node.classList.add('highlight');
    }
    
    wrapper.appendChild(node);
    
    // Add arrow if not last
    if (idx < queueData.length - 1) {
      const arrow = document.createElement('div');
      arrow.className = 'struct-arrow';
      wrapper.appendChild(arrow);
    }
    
    lineContainer.appendChild(wrapper);
  });
  
  structContainer.appendChild(lineContainer);
}

export async function enqueueQueue(val) {
  if (queueData.length >= 7) {
    alert("Queue Full! Maximum visualization capacity reached.");
    return;
  }
  highlightDSPseudocodeLine(0);
  await sleep(getDelay() / 2);
  queueData.push(val);
  highlightDSPseudocodeLine(1);
  renderQueue(queueData.length - 1);
  await sleep(getDelay());
  highlightDSPseudocodeLine(2);
  renderQueue();
}

export async function dequeueQueue() {
  if (queueData.length === 0) {
    alert("Queue Empty!");
    return;
  }
  highlightDSPseudocodeLine(4);
  await sleep(getDelay() / 2);
  highlightDSPseudocodeLine(5);
  renderQueue(0);
  await sleep(getDelay());
  queueData.shift();
  highlightDSPseudocodeLine(6);
  renderQueue();
}

/* =========================================================================
   LINKED LIST OPERATIONS
   ========================================================================= */
function renderLinkedList(activeIndices = {}, animateArrowIndex = null) {
  if (!structContainer) return;
  structContainer.innerHTML = '';
  
  const listContainer = document.createElement('div');
  listContainer.className = 'linear-container';
  
  listData.forEach((val, idx) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'node-wrapper';
    
    const node = document.createElement('div');
    node.className = 'struct-node';
    node.textContent = val;
    
    if (idx === 0) {
      const ptr = document.createElement('span');
      ptr.className = 'struct-node-pointer';
      ptr.textContent = 'HEAD';
      node.appendChild(ptr);
    }
    
    if (activeIndices[idx]) {
      node.classList.add(activeIndices[idx]);
    }
    
    wrapper.appendChild(node);
    
    // Add sequential arrow
    const arrow = document.createElement('div');
    arrow.className = 'struct-arrow';
    if (animateArrowIndex === idx) {
      arrow.classList.add('active');
    }
    wrapper.appendChild(arrow);
    
    // Null marker for the last element
    if (idx === listData.length - 1) {
      const nullNode = document.createElement('div');
      nullNode.className = 'struct-node';
      nullNode.style.border = '1px dashed var(--text-muted)';
      nullNode.style.color = 'var(--text-muted)';
      nullNode.style.width = '36px';
      nullNode.style.height = '36px';
      nullNode.textContent = 'Ø';
      wrapper.appendChild(nullNode);
    }
    
    listContainer.appendChild(wrapper);
  });
  
  structContainer.appendChild(listContainer);
}

export async function insertHeadList(val) {
  if (listData.length >= 6) {
    alert("List size limit reached!");
    return;
  }
  highlightDSPseudocodeLine(0);
  await sleep(getDelay() / 2);
  highlightDSPseudocodeLine(1);
  // Animate adding node
  listData.unshift(val);
  highlightDSPseudocodeLine(2);
  renderLinkedList({ 0: 'highlight' });
  await sleep(getDelay());
  highlightDSPseudocodeLine(3);
  renderLinkedList();
}

export async function deleteHeadList() {
  if (listData.length === 0) {
    alert("List is empty!");
    return;
  }
  highlightDSPseudocodeLine(5);
  await sleep(getDelay() / 2);
  highlightDSPseudocodeLine(6);
  renderLinkedList({ 0: 'highlight' });
  await sleep(getDelay());
  listData.shift();
  highlightDSPseudocodeLine(7);
  renderLinkedList();
}

export async function searchList(val) {
  if (listData.length === 0) {
    alert("List is empty!");
    return;
  }
  let found = false;
  for (let i = 0; i < listData.length; i++) {
    renderLinkedList({ [i]: 'active' });
    await sleep(getDelay());
    
    if (listData[i] === val) {
      renderLinkedList({ [i]: 'success' });
      found = true;
      break;
    }
  }
  if (!found) {
    alert(`Value ${val} not found in the list.`);
    renderLinkedList();
  }
}

