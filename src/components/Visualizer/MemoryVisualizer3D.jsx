import React, { useState, useEffect, useRef } from 'react';

// Predefined memory addresses
const ADDRESSES = ['0x1A2B', '0x3C4D', '0x5E6F', '0x7G8H', '0x9I0J', '0x2K3L', '0x4M5N', '0x6O7P', '0x8Q9R', '0x0S1T', '0x1V2W', '0x3X4Y', '0x5Z6A', '0x7B8C', '0x9D0E'];

const GRAPH_EDGES = [
  { u: '0x1A2B', v: '0x3C4D', weight: 4 }, // A - B
  { u: '0x1A2B', v: '0x5E6F', weight: 2 }, // A - C
  { u: '0x3C4D', v: '0x7G8H', weight: 5 }, // B - D
  { u: '0x5E6F', v: '0x7G8H', weight: 8 }, // C - D
];

// Multilingual Code Snippets mapped to algorithms and operational steps
const ALGO_CODE = {
  list: {
    insert: {
      cpp: [
        "void insertHead(Node*& head, int val) {",
        "  Node* temp = new Node(val);",
        "  temp->next = head;",
        "  head = temp;",
        "}"
      ],
      python: [
        "def insert_head(self, val):",
        "    temp = Node(val)",
        "    temp.next = self.head",
        "    self.head = temp"
      ],
      js: [
        "function insertHead(val) {",
        "  const temp = new Node(val);",
        "  temp.next = this.head;",
        "  this.head = temp;",
        "}"
      ],
      java: [
        "public void insertHead(int val) {",
        "  Node temp = new Node(val);",
        "  temp.next = head;",
        "  head = temp;",
        "}"
      ]
    },
    delete: {
      cpp: [
        "void deleteHead(Node*& head) {",
        "  if (!head) return;",
        "  Node* temp = head;",
        "  head = head->next;",
        "  delete temp;",
        "}"
      ],
      python: [
        "def delete_head(self):",
        "    if not self.head: return",
        "    temp = self.head",
        "    self.head = self.head.next",
        "    del temp"
      ],
      js: [
        "function deleteHead() {",
        "  if (!this.head) return;",
        "  const temp = this.head;",
        "  this.head = this.head.next;",
        "}"
      ],
      java: [
        "public void deleteHead() {",
        "  if (head == null) return;",
        "  Node temp = head;",
        "  head = head.next;",
        "}"
      ]
    }
  },
  doubly: {
    insert: {
      cpp: [
        "void insertHead(Node*& head, int val) {",
        "  Node* temp = new Node(val);",
        "  temp->next = head;",
        "  if (head) head->prev = temp;",
        "  head = temp;",
        "}"
      ],
      python: [
        "def insert_head(self, val):",
        "    temp = Node(val)",
        "    temp.next = self.head",
        "    if self.head: self.head.prev = temp",
        "    self.head = temp"
      ],
      js: [
        "function insertHead(val) {",
        "  const temp = new Node(val);",
        "  temp.next = this.head;",
        "  if (this.head) this.head.prev = temp;",
        "  this.head = temp;",
        "}"
      ],
      java: [
        "public void insertHead(int val) {",
        "  Node temp = new Node(val);",
        "  temp.next = head;",
        "  if (head != null) head.prev = temp;",
        "  head = temp;",
        "}"
      ]
    },
    delete: {
      cpp: [
        "void deleteHead(Node*& head) {",
        "  if (!head) return;",
        "  Node* temp = head;",
        "  head = head->next;",
        "  if (head) head->prev = nullptr;",
        "  delete temp;",
        "}"
      ],
      python: [
        "def delete_head(self):",
        "    if not self.head: return",
        "    temp = self.head",
        "    self.head = self.head.next",
        "    if self.head: self.head.prev = None",
        "    del temp"
      ],
      js: [
        "function deleteHead() {",
        "  if (!this.head) return;",
        "  const temp = this.head;",
        "  this.head = this.head.next;",
        "  if (this.head) this.head.prev = null;",
        "}"
      ],
      java: [
        "public void deleteHead() {",
        "  if (head == null) return;",
        "  Node temp = head;",
        "  head = head.next;",
        "  if (head != null) head.prev = null;",
        "}"
      ]
    }
  },
  stack: {
    push: {
      cpp: [
        "void push(int val) {",
        "  Node* temp = new Node(val);",
        "  temp->next = top;",
        "  top = temp;",
        "}"
      ],
      python: [
        "def push(self, val):",
        "    temp = Node(val)",
        "    temp.next = self.top",
        "    self.top = temp"
      ],
      js: [
        "push(val) {",
        "  const temp = new Node(val);",
        "  temp.next = this.top;",
        "  this.top = temp;",
        "}"
      ],
      java: [
        "public void push(int val) {",
        "  Node temp = new Node(val);",
        "  temp.next = top;",
        "  top = temp;",
        "}"
      ]
    },
    pop: {
      cpp: [
        "void pop() {",
        "  if (!top) return;",
        "  Node* temp = top;",
        "  top = top->next;",
        "  delete temp;",
        "}"
      ],
      python: [
        "def pop(self):",
        "    if not self.top: return",
        "    temp = self.top",
        "    self.top = self.top.next",
        "    del temp"
      ],
      js: [
        "pop() {",
        "  if (!this.top) return;",
        "  const temp = this.top;",
        "  this.top = this.top.next;",
        "}"
      ],
      java: [
        "public void pop() {",
        "  if (top == null) return;",
        "  Node temp = top;",
        "  top = top.next;",
        "}"
      ]
    }
  },
  queue: {
    enqueue: {
      cpp: [
        "void enqueue(int val) {",
        "  Node* temp = new Node(val);",
        "  if (!rear) { front = rear = temp; return; }",
        "  rear->next = temp;",
        "  rear = temp;",
        "}"
      ],
      python: [
        "def enqueue(self, val):",
        "    temp = Node(val)",
        "    if not self.rear:",
        "        self.front = self.rear = temp",
        "        return",
        "    self.rear.next = temp",
        "    self.rear = temp"
      ],
      js: [
        "enqueue(val) {",
        "  const temp = new Node(val);",
        "  if (!this.rear) { this.front = this.rear = temp; return; }",
        "  this.rear.next = temp;",
        "  this.rear = temp;",
        "}"
      ],
      java: [
        "public void enqueue(int val) {",
        "  Node temp = new Node(val);",
        "  if (rear == null) { front = rear = temp; return; }",
        "  rear.next = temp;",
        "  rear = temp;",
        "}"
      ]
    },
    dequeue: {
      cpp: [
        "void dequeue() {",
        "  if (!front) return;",
        "  Node* temp = front;",
        "  front = front->next;",
        "  if (!front) rear = nullptr;",
        "  delete temp;",
        "}"
      ],
      python: [
        "def dequeue(self):",
        "    if not self.front: return",
        "    temp = self.front",
        "    self.front = self.front.next",
        "    if not self.front: self.rear = None",
        "    del temp"
      ],
      js: [
        "dequeue() {",
        "  if (!this.front) return;",
        "  const temp = this.front;",
        "  this.front = this.front.next;",
        "  if (!this.front) this.rear = null;",
        "}"
      ],
      java: [
        "public void dequeue() {",
        "  if (front == null) return;",
        "  Node temp = front;",
        "  front = front.next;",
        "  if (front == null) rear = null;",
        "}"
      ]
    }
  },
  bst: {
    insert: {
      cpp: [
        "Node* insert(Node* root, int val) {",
        "  if (!root) return new Node(val);",
        "  if (val < root->val)",
        "    root->left = insert(root->left, val);",
        "  else",
        "    root->right = insert(root->right, val);",
        "  return root;",
        "}"
      ],
      python: [
        "def insert(self, root, val):",
        "    if not root: return Node(val)",
        "    if val < root.val:",
        "        root.left = self.insert(root.left, val)",
        "    else:",
        "        root.right = self.insert(root.right, val)",
        "    return root"
      ],
      js: [
        "insert(root, val) {",
        "  if (!root) return new TreeNode(val);",
        "  if (val < root.val)",
        "    root.left = this.insert(root.left, val);",
        "  else",
        "    root.right = this.insert(root.right, val);",
        "  return root;",
        "}"
      ],
      java: [
        "public Node insert(Node root, int val) {",
        "  if (root == null) return new Node(val);",
        "  if (val < root.val)",
        "    root.left = insert(root.left, val);",
        "  else",
        "    root.right = insert(root.right, val);",
        "  return root;",
        "}"
      ]
    },
    delete: {
      cpp: [
        "Node* remove(Node* root, int val) {",
        "  if (!root) return root;",
        "  if (val < root->val) root->left = remove(root->left, val);",
        "  else if (val > root->val) root->right = remove(root->right, val);",
        "  else {",
        "    if (!root->left) { Node* temp = root->right; delete root; return temp; }",
        "    if (!root->right) { Node* temp = root->left; delete root; return temp; }",
        "    Node* temp = minValueNode(root->right);",
        "    root->val = temp->val;",
        "    root->right = remove(root->right, temp->val);",
        "  }",
        "  return root;",
        "}"
      ],
      python: [
        "def remove(self, root, val):",
        "    if not root: return root",
        "    if val < root.val: root.left = self.remove(root.left, val)",
        "    elif val > root.val: root.right = self.remove(root.right, val)",
        "    else:",
        "        if not root.left: return root.right",
        "        if not root.right: return root.left",
        "        temp = self.minValueNode(root.right)",
        "        root.val = temp.val",
        "        root.right = self.remove(root.right, temp.val)",
        "    return root"
      ],
      js: [
        "remove(root, val) {",
        "  if (!root) return root;",
        "  if (val < root.val) root.left = this.remove(root.left, val);",
        "  else if (val > root.val) root.right = this.remove(root.right, val);",
        "  else {",
        "    if (!root.left) return root.right;",
        "    if (!root.right) return root.left;",
        "    let temp = this.minValueNode(root.right);",
        "    root.val = temp.val;",
        "    root.right = this.remove(root.right, temp.val);",
        "  }",
        "  return root;",
        "}"
      ],
      java: [
        "public Node remove(Node root, int val) {",
        "  if (root == null) return root;",
        "  if (val < root.val) root.left = remove(root.left, val);",
        "  else if (val > root.val) root.right = remove(root.right, val);",
        "  else {",
        "    if (root.left == null) return root.right;",
        "    if (root.right == null) return root.left;",
        "    Node temp = minValueNode(root.right);",
        "    root.val = temp.val;",
        "    root.right = remove(root.right, temp.val);",
        "  }",
        "  return root;",
        "}"
      ]
    },
    traverse: {
      cpp: [
        "void inorder(Node* root) {",
        "  if (!root) return;",
        "  inorder(root->left);",
        "  print(root->val);",
        "  inorder(root->right);",
        "}"
      ],
      python: [
        "def inorder(self, root):",
        "    if not root: return",
        "    self.inorder(root.left)",
        "    print(root.val)",
        "    self.inorder(root.right)"
      ],
      js: [
        "inorder(root) {",
        "  if (!root) return;",
        "  this.inorder(root.left);",
        "  console.log(root.val);",
        "  this.inorder(root.right);",
        "}"
      ],
      java: [
        "public void inorder(Node root) {",
        "  if (root == null) return;",
        "  inorder(root.left);",
        "  System.out.println(root.val);",
        "  inorder(root.right);",
        "}"
      ]
    }
  },
  avl: {
    insert: {
      cpp: [
        "Node* insert(Node* node, int val) {",
        "  if (!node) return new Node(val);",
        "  if (val < node->val) node->left = insert(node->left, val);",
        "  else node->right = insert(node->right, val);",
        "  int bf = getBalance(node);",
        "  if (bf > 1 && val < node->left->val) return rightRotate(node);",
        "  if (bf < -1 && val > node->right->val) return leftRotate(node);",
        "  if (bf > 1) { node->left = leftRotate(node->left); return rightRotate(node); }",
        "  if (bf < -1) { node->right = rightRotate(node->right); return leftRotate(node); }",
        "  return node;",
        "}"
      ],
      python: [
        "def insert(self, root, val):",
        "    if not root: return Node(val)",
        "    if val < root.val: root.left = self.insert(root.left, val)",
        "    else: root.right = self.insert(root.right, val)",
        "    bf = self.getBalance(root)",
        "    if bf > 1 and val < root.left.val: return self.rightRotate(root)",
        "    if bf < -1 and val > root.right.val: return self.leftRotate(root)",
        "    if bf > 1:",
        "        root.left = self.leftRotate(root.left); return self.rightRotate(root)",
        "    if bf < -1:",
        "        root.right = self.rightRotate(root.right); return self.leftRotate(root)",
        "    return root"
      ],
      js: [
        "insert(root, val) {",
        "  if (!root) return new TreeNode(val);",
        "  if (val < root.val) root.left = this.insert(root.left, val);",
        "  else root.right = this.insert(root.right, val);",
        "  let bf = this.getBalance(root);",
        "  if (bf > 1 && val < root.left.val) return this.rightRotate(root);",
        "  if (bf < -1 && val > root.right.val) return this.leftRotate(root);",
        "  if (bf > 1) { root.left = this.leftRotate(root.left); return this.rightRotate(root); }",
        "  if (bf < -1) { root.right = this.rightRotate(root.right); return this.leftRotate(root); }",
        "  return root;",
        "}"
      ],
      java: [
        "public Node insert(Node node, int val) {",
        "  if (node == null) return new Node(val);",
        "  if (val < node.val) node.left = insert(node.left, val);",
        "  else node.right = insert(node.right, val);",
        "  int bf = getBalance(node);",
        "  if (bf > 1 && val < node.left.val) return rightRotate(node);",
        "  if (bf < -1 && val > node.right.val) return leftRotate(node);",
        "  if (bf > 1) { node.left = leftRotate(node.left); return rightRotate(node); }",
        "  if (bf < -1) { node.right = rightRotate(node.right); return leftRotate(node); }",
        "  return node;",
        "}"
      ]
    }
  },
  heap: {
    insert: {
      cpp: [
        "void insert(int val) {",
        "  heap.push_back(val);",
        "  int i = heap.size() - 1;",
        "  while (i > 0 && heap[parent(i)] > heap[i]) {",
        "    swap(heap[parent(i)], heap[i]);",
        "    i = parent(i);",
        "  }",
        "}"
      ],
      python: [
        "def insert(self, val):",
        "    self.heap.append(val)",
        "    i = len(self.heap) - 1",
        "    while i > 0 and self.heap[self.parent(i)] > self.heap[i]:",
        "        self.swap(self.parent(i), i)",
        "        i = self.parent(i)"
      ],
      js: [
        "insert(val) {",
        "  this.heap.push(val);",
        "  let i = this.heap.length - 1;",
        "  while (i > 0 && this.heap[this.parent(i)] > this.heap[i]) {",
        "    this.swap(this.parent(i), i);",
        "    i = this.parent(i);",
        "  }",
        "}"
      ],
      java: [
        "public void insert(int val) {",
        "  heap.add(val);",
        "  int i = heap.size() - 1;",
        "  while (i > 0 && heap.get(parent(i)) > heap.get(i)) {",
        "    swap(parent(i), i);",
        "    i = parent(i);",
        "  }",
        "}"
      ]
    },
    extract: {
      cpp: [
        "int extractMin() {",
        "  int rootVal = heap[0];",
        "  heap[0] = heap.back(); heap.pop_back();",
        "  heapifyDown(0);",
        "  return rootVal;",
        "}"
      ],
      python: [
        "def extract_min(self):",
        "    root_val = self.heap[0]",
        "    self.heap[0] = self.heap.pop()",
        "    self.heapify_down(0)",
        "    return root_val"
      ],
      js: [
        "extractMin() {",
        "  const rootVal = this.heap[0];",
        "  this.heap[0] = this.heap.pop();",
        "  this.heapifyDown(0);",
        "  return rootVal;",
        "}"
      ],
      java: [
        "public int extractMin() {",
        "  int rootVal = heap.get(0);",
        "  heap.set(0, heap.remove(heap.size() - 1));",
        "  heapifyDown(0);",
        "  return rootVal;",
        "}"
      ]
    }
  },
  graph: {
    bfs: {
      cpp: [
        "void bfs(Node* start) {",
        "  queue<Node*> q; q.push(start);",
        "  visited[start] = true;",
        "  while (!q.empty()) {",
        "    Node* curr = q.front(); q.pop();",
        "    for (Node* nbr : curr->neighbors) {",
        "      if (!visited[nbr]) { visited[nbr] = true; q.push(nbr); }",
        "    }",
        "  }",
        "}"
      ],
      python: [
        "def bfs(self, start):",
        "    q = [start]",
        "    visited = {start}",
        "    while q:",
        "        curr = q.pop(0)",
        "        for nbr in curr.neighbors:",
        "            if nbr not in visited:",
        "                visited.add(nbr); q.append(nbr)"
      ],
      js: [
        "bfs(start) {",
        "  const q = [start];",
        "  const visited = new Set([start]);",
        "  while (q.length > 0) {",
        "    const curr = q.shift();",
        "    for (let nbr of curr.neighbors) {",
        "      if (!visited.has(nbr)) { visited.add(nbr); q.push(nbr); }",
        "    }",
        "  }",
        "}"
      ],
      java: [
        "public void bfs(Node start) {",
        "  Queue<Node> q = new LinkedList<>(); q.add(start);",
        "  Set<Node> visited = new HashSet<>(); visited.add(start);",
        "  while (!q.isEmpty()) {",
        "    Node curr = q.poll();",
        "    for (Node nbr : curr.neighbors) {",
        "      if (!visited.contains(nbr)) { visited.add(nbr); q.add(nbr); }",
        "    }",
        "  }",
        "}"
      ]
    }
  },
  array: {
    bubble: {
      cpp: [
        "void bubbleSort(int arr[], int n) {",
        "  for (int i = 0; i < n; i++) {",
        "    for (int j = 0; j < n - i - 1; j++) {",
        "      if (arr[j] > arr[j+1]) swap(arr[j], arr[j+1]);",
        "    }",
        "  }",
        "}"
      ],
      python: [
        "def bubble_sort(arr):",
        "    n = len(arr)",
        "    for i in range(n):",
        "        for j in range(n - i - 1):",
        "            if arr[j] > arr[j+1]:",
        "                arr[j], arr[j+1] = arr[j+1], arr[j]"
      ],
      js: [
        "function bubbleSort(arr) {",
        "  const n = arr.length;",
        "  for (let i = 0; i < n; i++) {",
        "    for (let j = 0; j < n - i - 1; j++) {",
        "      if (arr[j] > arr[j+1]) [arr[j], arr[j+1]] = [arr[j+1], arr[j]];",
        "    }",
        "  }",
        "}"
      ],
      java: [
        "public void bubbleSort(int[] arr) {",
        "  int n = arr.length;",
        "  for (int i = 0; i < n; i++) {",
        "    for (int j = 0; j < n - i - 1; j++) {",
        "      if (arr[j] > arr[j+1]) {",
        "        int temp = arr[j]; arr[j] = arr[j+1]; arr[j+1] = temp;",
        "      }",
        "    }",
        "  }",
        "}"
      ]
    }
  }
};

// Custom highlighting of code tokens
const CodeLine = ({ text, isHighlighted }) => {
  const keywords = ['const', 'let', 'var', 'function', 'class', 'def', 'if', 'else', 'elif', 'while', 'for', 'in', 'return', 'new', 'delete', 'Node', 'TreeNode', 'NULL', 'nullptr', 'None', 'self', 'public', 'private', 'void', 'int', 'struct', 'and', 'not', 'or'];
  
  const parts = text.split(/(\s+|\W)/);
  const rendered = parts.map((part, i) => {
    if (keywords.includes(part)) {
      return <span key={i} style={{ color: '#c792ea', fontWeight: 'bold' }}>{part}</span>;
    }
    if (part.startsWith('//') || part.startsWith('#')) {
      return <span key={i} style={{ color: 'rgba(255, 255, 255, 0.35)', fontStyle: 'italic' }}>{part}</span>;
    }
    if (!isNaN(part) && part.trim() !== '') {
      return <span key={i} style={{ color: '#f78c6c' }}>{part}</span>;
    }
    if (['{', '}', '(', ')', '[', ']', ';', ',', '.'].includes(part)) {
      return <span key={i} style={{ color: '#89ddff' }}>{part}</span>;
    }
    return <span key={i} style={{ color: '#eeffff' }}>{part}</span>;
  });

  return (
    <div style={{
      display: 'flex',
      background: isHighlighted ? 'rgba(124, 77, 255, 0.22)' : 'transparent',
      borderLeft: isHighlighted ? '4px solid #7c4dff' : '4px solid transparent',
      padding: '3px 12px',
      fontFamily: '"Fira Code", monospace, "Courier New"',
      fontSize: '0.78rem',
      lineHeight: '1.5',
      whiteSpace: 'pre',
      transition: 'background 0.15s, border-left 0.15s'
    }}>
      {rendered}
    </div>
  );
};

export default function MemoryVisualizer3D({ isFullscreen }) {
  // Navigation & Structure States
  const [structure, setStructure] = useState('list');
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

  // Code Panel States
  const [selectedLang, setSelectedLang] = useState('cpp');
  const [activeOperation, setActiveOperation] = useState('insert');
  const [autoRotate, setAutoRotate] = useState(false);

  // Logical Structures reference for persistent custom operations
  const listModel = useRef([]);
  const doublyModel = useRef([]);
  const stackModel = useRef([]);
  const queueModel = useRef([]);
  const bstModel = useRef(null);
  const avlModel = useRef(null);
  const heapModel = useRef([]);

  // Drag Interaction References
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const timerRef = useRef(null);

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

  // Camera Orbit / Auto-Rotation Effect
  useEffect(() => {
    let animId;
    if (autoRotate && !isDraggingRef.current) {
      const tick = () => {
        setRotation(prev => ({ ...prev, y: prev.y + 0.18 }));
        animId = requestAnimationFrame(tick);
      };
      animId = requestAnimationFrame(tick);
    }
    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, [autoRotate]);

  // Default initial data structure states
  useEffect(() => {
    resetToInitial();
    return () => stopPlayback();
  }, [structure]);

  const setActiveAddress = (addr) => {
    setFrames(prev => prev.map((f, idx) => idx === frameIndex ? { ...f, activeAddr: addr } : f));
  };

  // ────────────────────────────────────────────────────────────────
  // DYNAMIC LAYOUT COORDINATE GENERATORS
  // ────────────────────────────────────────────────────────────────
  const layoutList = (nodes) => {
    const n = Math.max(1, nodes.length);
    return nodes.map((node, i) => ({
      ...node,
      x: 18 + i * (65 / n),
      y: 50
    }));
  };

  const layoutStack = (nodes) => {
    return nodes.map((node, i) => ({
      ...node,
      x: 50,
      y: 20 + i * 16
    }));
  };

  const layoutQueue = (nodes) => {
    const n = Math.max(1, nodes.length);
    return nodes.map((node, i) => ({
      ...node,
      x: 18 + i * (65 / n),
      y: 50
    }));
  };

  const computeTreeLayout = (node, x = 50, y = 18, dx = 22, depth = 0) => {
    if (!node) return [];
    const current = {
      addr: node.addr,
      val: node.val,
      left: node.left ? node.left.addr : 'NULL',
      right: node.right ? node.right.addr : 'NULL',
      x: x,
      y: y,
      delay: depth * 0.15
    };
    const leftNodes = computeTreeLayout(node.left, x - dx, y + 18, dx * 0.5, depth + 1);
    const rightNodes = computeTreeLayout(node.right, x + dx, y + 18, dx * 0.5, depth + 1);
    return [current, ...leftNodes, ...rightNodes];
  };

  const layoutHeapArray = (arr) => {
    return arr.map((val, i) => {
      const addr = ADDRESSES[i % ADDRESSES.length];
      const d = Math.floor(Math.log2(i + 1));
      const pos = i - (Math.pow(2, d) - 1);
      const num = Math.pow(2, d);
      const x = 50 + (pos - (num - 1) / 2) * (70 / Math.max(1, num));
      const y = 18 + d * 18;
      
      const leftIdx = 2 * i + 1;
      const rightIdx = 2 * i + 2;
      
      return {
        addr: addr,
        val: val,
        left: leftIdx < arr.length ? ADDRESSES[leftIdx % ADDRESSES.length] : 'NULL',
        right: rightIdx < arr.length ? ADDRESSES[rightIdx % ADDRESSES.length] : 'NULL',
        x: x,
        y: y,
        delay: d * 0.15
      };
    });
  };

  // ────────────────────────────────────────────────────────────────
  // INITIALIZATIONS FOR VARIOUS DATA STRUCTURES
  // ────────────────────────────────────────────────────────────────
  const resetToInitial = () => {
    stopPlayback();
    setActiveOperation('insert');
    let initialHeap = [];
    let initialStack = {};
    let desc = '';

    if (structure === 'list') {
      listModel.current = [
        { addr: '0x1A2B', val: 15, next: '0x3C4D', delay: 0 },
        { addr: '0x3C4D', val: 30, next: '0x5E6F', delay: 0.2 },
        { addr: '0x5E6F', val: 45, next: 'NULL', delay: 0.4 }
      ];
      initialHeap = layoutList(listModel.current);
      initialStack = { root: '0x1A2B' };
      desc = 'Initialized Singly Linked List in memory heap workspace.';
    } else if (structure === 'doubly') {
      doublyModel.current = [
        { addr: '0x1A2B', val: 10, prev: 'NULL', next: '0x3C4D', delay: 0 },
        { addr: '0x3C4D', val: 20, prev: '0x1A2B', next: '0x5E6F', delay: 0.2 },
        { addr: '0x5E6F', val: 30, prev: '0x3C4D', next: 'NULL', delay: 0.4 }
      ];
      initialHeap = layoutList(doublyModel.current);
      initialStack = { head: '0x1A2B', tail: '0x5E6F' };
      desc = 'Initialized Doubly Linked List with forward and backward heap pointer parameters.';
    } else if (structure === 'stack') {
      stackModel.current = [
        { addr: '0x1A2B', val: 99, next: '0x3C4D', delay: 0 },
        { addr: '0x3C4D', val: 88, next: '0x5E6F', delay: 0.2 },
        { addr: '0x5E6F', val: 77, next: 'NULL', delay: 0.4 }
      ];
      initialHeap = layoutStack(stackModel.current);
      initialStack = { top: '0x1A2B' };
      desc = 'Initialized Last-In-First-Out (LIFO) Stack segment.';
    } else if (structure === 'queue') {
      queueModel.current = [
        { addr: '0x1A2B', val: 5, next: '0x3C4D', delay: 0 },
        { addr: '0x3C4D', val: 10, next: '0x5E6F', delay: 0.2 },
        { addr: '0x5E6F', val: 15, next: 'NULL', delay: 0.4 }
      ];
      initialHeap = layoutQueue(queueModel.current);
      initialStack = { front: '0x1A2B', rear: '0x5E6F' };
      desc = 'Initialized First-In-First-Out (FIFO) Queue.';
    } else if (structure === 'bst') {
      bstModel.current = {
        val: 50, addr: '0x1A2B',
        left: { val: 30, addr: '0x3C4D', left: null, right: null },
        right: { val: 70, addr: '0x5E6F', left: null, right: null }
      };
      initialHeap = computeTreeLayout(bstModel.current);
      initialStack = { root: '0x1A2B' };
      desc = 'Initialized Binary Search Tree (BST). Nodes satisfy left < root < right.';
    } else if (structure === 'avl') {
      avlModel.current = {
        val: 50, addr: '0x1A2B',
        left: { val: 30, addr: '0x3C4D', left: null, right: null },
        right: { val: 70, addr: '0x5E6F', left: null, right: null }
      };
      initialHeap = computeTreeLayout(avlModel.current);
      initialStack = { root: '0x1A2B' };
      desc = 'Initialized AVL Tree. Balanced factor is evaluated at heights difference [-1, 1].';
    } else if (structure === 'heap') {
      heapModel.current = [10, 20, 15, 40, 30];
      initialHeap = layoutHeapArray(heapModel.current);
      initialStack = { root: '0x1A2B' };
      desc = 'Initialized Binary Min-Heap layout matching parent-child array mappings.';
    } else if (structure === 'graph') {
      initialHeap = [
        { addr: '0x1A2B', val: 'A', neighbors: ['0x3C4D', '0x5E6F'], x: 30, y: 30, delay: 0 },
        { addr: '0x3C4D', val: 'B', neighbors: ['0x1A2B', '0x7G8H'], x: 70, y: 30, delay: 0.3 },
        { addr: '0x5E6F', val: 'C', neighbors: ['0x1A2B', '0x7G8H'], x: 30, y: 70, delay: 0.6 },
        { addr: '0x7G8H', val: 'D', neighbors: ['0x3C4D', '0x5E6F'], x: 70, y: 70, delay: 0.9 }
      ];
      initialStack = { start: '0x1A2B' };
      desc = 'Initialized Graph node mesh mapping bidirectional neighbors.';
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
      explanation: desc,
      activeLine: -1
    };
    setFrames([firstFrame]);
    setFrameIndex(0);
  };

  // ────────────────────────────────────────────────────────────────
  // STEP FRAME GENERATORS FOR ALL DYNAMIC ACTIONS
  // ────────────────────────────────────────────────────────────────
  
  // Singly Linked List operations
  const runListInsertHead = (val) => {
    setActiveOperation('insert');
    const nextAddr = ADDRESSES[Math.floor(Math.random() * ADDRESSES.length)];
    const baseHeap = [...listModel.current];
    const baseStack = { root: baseHeap[0]?.addr || 'NULL' };

    const steps = [];
    
    // Step 0: Allocate node
    const tempNode = { addr: nextAddr, val, next: 'NULL', delay: 0 };
    const step0Heap = [tempNode, ...baseHeap].map((node, idx) => ({
      ...node,
      x: idx === 0 ? 15 : 20 + idx * 20,
      y: idx === 0 ? 25 : 50
    }));
    steps.push({
      heap: step0Heap,
      stack: { ...baseStack, temp: nextAddr },
      activeAddr: nextAddr,
      visited: [],
      explanation: `Step 1: Allocated new heap node block at ${nextAddr} for value ${val}. Set stack pointer variable 'temp' to point to it.`,
      activeLine: 1
    });

    // Step 1: temp.next = head
    const headAddr = baseStack.root;
    const step1Heap = step0Heap.map((node, idx) => {
      if (idx === 0) return { ...node, next: headAddr };
      return node;
    });
    steps.push({
      heap: step1Heap,
      stack: { ...baseStack, temp: nextAddr },
      activeAddr: nextAddr,
      visited: [],
      explanation: `Step 2: Connected temp.next (pointer inside node ${nextAddr}) to point to current head node (${headAddr}).`,
      activeLine: 2
    });

    // Step 2: head = temp, slide positions
    const newModel = [ { addr: nextAddr, val, next: headAddr }, ...baseHeap ];
    listModel.current = newModel;
    const finalHeap = layoutList(newModel);
    
    steps.push({
      heap: finalHeap,
      stack: { root: nextAddr },
      activeAddr: nextAddr,
      visited: [],
      explanation: `Step 3: Pointed stack root pointer ('root') to the new node at ${nextAddr}. Head insertion completed.`,
      activeLine: 3
    });

    setFrames(steps);
    setFrameIndex(0);
    setIsPlaying(true);
  };

  const runListDeleteHead = () => {
    setActiveOperation('delete');
    const baseHeap = [...listModel.current];
    if (baseHeap.length === 0) return;

    const steps = [];
    const targetNode = baseHeap[0];

    // Step 0: temp = root
    const step0Heap = layoutList(baseHeap);
    steps.push({
      heap: step0Heap,
      stack: { root: targetNode.addr, temp: targetNode.addr },
      activeAddr: targetNode.addr,
      visited: [],
      explanation: `Step 1: Pointed stack temporary pointer 'temp' to head node at ${targetNode.addr}.`,
      activeLine: 2
    });

    // Step 1: root = root.next
    const nextRoot = targetNode.next;
    steps.push({
      heap: step0Heap,
      stack: { root: nextRoot, temp: targetNode.addr },
      activeAddr: targetNode.addr,
      visited: [],
      explanation: `Step 2: Relocated stack root pointer to the next node in the list (${nextRoot}).`,
      activeLine: 3
    });

    // Step 2: free(temp)
    const remaining = baseHeap.slice(1);
    listModel.current = remaining;
    const finalHeap = layoutList(remaining);
    steps.push({
      heap: finalHeap,
      stack: { root: nextRoot },
      activeAddr: null,
      visited: [],
      explanation: `Step 3: Deallocated block at address ${targetNode.addr} (memory freed).`,
      activeLine: 4
    });

    setFrames(steps);
    setFrameIndex(0);
    setIsPlaying(true);
  };

  // Doubly Linked List Operations
  const runDoublyInsertHead = (val) => {
    setActiveOperation('insert');
    const nextAddr = ADDRESSES[Math.floor(Math.random() * ADDRESSES.length)];
    const baseHeap = [...doublyModel.current];
    const headAddr = baseHeap[0]?.addr || 'NULL';

    const steps = [];

    // Step 0: Allocate
    const tempNode = { addr: nextAddr, val, prev: 'NULL', next: 'NULL', delay: 0 };
    const step0Heap = [tempNode, ...baseHeap].map((node, idx) => ({
      ...node,
      x: idx === 0 ? 15 : 20 + idx * 20,
      y: idx === 0 ? 25 : 50
    }));
    steps.push({
      heap: step0Heap,
      stack: { head: headAddr, tail: baseHeap[baseHeap.length-1]?.addr || 'NULL', temp: nextAddr },
      activeAddr: nextAddr,
      visited: [],
      explanation: `Step 1: Allocated Doubly Node block at ${nextAddr} with 'prev' and 'next' field pointers initialized to NULL.`,
      activeLine: 1
    });

    // Step 1: temp.next = head
    const step1Heap = step0Heap.map((node, idx) => {
      if (idx === 0) return { ...node, next: headAddr };
      return node;
    });
    steps.push({
      heap: step1Heap,
      stack: { head: headAddr, tail: baseHeap[baseHeap.length-1]?.addr || 'NULL', temp: nextAddr },
      activeAddr: nextAddr,
      visited: [],
      explanation: `Step 2: Linked forward pointer temp.next of the new block to current head node (${headAddr}).`,
      activeLine: 2
    });

    // Step 2: head.prev = temp
    let step2Heap = step1Heap.map((node) => {
      if (node.addr === headAddr) return { ...node, prev: nextAddr };
      return node;
    });
    steps.push({
      heap: step2Heap,
      stack: { head: headAddr, tail: baseHeap[baseHeap.length-1]?.addr || 'NULL', temp: nextAddr },
      activeAddr: headAddr,
      visited: [],
      explanation: `Step 3: Linked backward pointer (head.prev) of old head node to point back to the new node at ${nextAddr}.`,
      activeLine: 3
    });

    // Step 3: head = temp
    const newModel = [ { addr: nextAddr, val, prev: 'NULL', next: headAddr }, ...baseHeap.map(n => n.addr === headAddr ? { ...n, prev: nextAddr } : n) ];
    doublyModel.current = newModel;
    const finalHeap = layoutList(newModel);
    steps.push({
      heap: finalHeap,
      stack: { head: nextAddr, tail: baseHeap[baseHeap.length-1]?.addr || nextAddr },
      activeAddr: nextAddr,
      visited: [],
      explanation: `Step 4: Shifted stack head reference pointer to new node ${nextAddr}. Bidirectional linking completed.`,
      activeLine: 4
    });

    setFrames(steps);
    setFrameIndex(0);
    setIsPlaying(true);
  };

  // Stack Push
  const runStackPush = (val) => {
    setActiveOperation('push');
    const nextAddr = ADDRESSES[Math.floor(Math.random() * ADDRESSES.length)];
    const baseHeap = [...stackModel.current];
    
    const steps = [];
    
    // Allocate temp node
    const tempNode = { addr: nextAddr, val, next: 'NULL', delay: 0 };
    const tempLayout = [tempNode, ...baseHeap].map((node, idx) => ({
      ...node,
      x: idx === 0 ? 15 : 50,
      y: idx === 0 ? 25 : 20 + (idx - 1) * 15
    }));
    steps.push({
      heap: tempLayout,
      stack: { top: baseHeap[0]?.addr || 'NULL', temp: nextAddr },
      activeAddr: nextAddr,
      visited: [],
      explanation: `Step 1: Allocated new Stack element at address ${nextAddr} for value ${val}. Set temp pointer to it.`,
      activeLine: 1
    });

    // temp.next = top
    const linkedLayout = tempLayout.map((node, idx) => {
      if (idx === 0) return { ...node, next: baseHeap[0]?.addr || 'NULL' };
      return node;
    });
    steps.push({
      heap: linkedLayout,
      stack: { top: baseHeap[0]?.addr || 'NULL', temp: nextAddr },
      activeAddr: nextAddr,
      visited: [],
      explanation: `Step 2: Linked new node's next pointer to the current top (${baseHeap[0]?.addr || 'NULL'}).`,
      activeLine: 2
    });

    // top = temp
    const finalHeap = [tempNode, ...baseHeap].map((node, idx) => ({
      ...node,
      next: idx === 0 ? (baseHeap[0]?.addr || 'NULL') : node.next,
      x: 50,
      y: 20 + idx * 15
    }));
    stackModel.current = [ { addr: nextAddr, val, next: baseHeap[0]?.addr || 'NULL' }, ...baseHeap ];
    
    steps.push({
      heap: finalHeap,
      stack: { top: nextAddr },
      activeAddr: nextAddr,
      visited: [],
      explanation: `Step 3: Pointed top reference variable to the new node. Push completed.`,
      activeLine: 3
    });

    setFrames(steps);
    setFrameIndex(0);
    setIsPlaying(true);
  };

  // Stack Pop
  const runStackPop = () => {
    setActiveOperation('pop');
    const baseHeap = [...stackModel.current];
    if (baseHeap.length === 0) return;
    
    const steps = [];
    const poppedNode = baseHeap[0];
    
    // temp = top
    const initialLayout = layoutStack(baseHeap);
    steps.push({
      heap: initialLayout,
      stack: { top: poppedNode.addr, temp: poppedNode.addr },
      activeAddr: poppedNode.addr,
      visited: [],
      explanation: `Step 1: Pointed temp variable to top node at ${poppedNode.addr} to remember it.`,
      activeLine: 2
    });

    // top = top.next
    const nextTop = poppedNode.next;
    steps.push({
      heap: initialLayout,
      stack: { top: nextTop, temp: poppedNode.addr },
      activeAddr: poppedNode.addr,
      visited: [],
      explanation: `Step 2: Relocated top pointer to the next lower element in stack (${nextTop}).`,
      activeLine: 3
    });

    // delete temp
    const remaining = baseHeap.slice(1);
    stackModel.current = remaining;
    const finalLayout = layoutStack(remaining);
    steps.push({
      heap: finalLayout,
      stack: { top: nextTop },
      activeAddr: null,
      visited: [],
      explanation: `Step 3: Freed/Deallocated top node at address ${poppedNode.addr}.`,
      activeLine: 4
    });

    setFrames(steps);
    setFrameIndex(0);
    setIsPlaying(true);
  };

  // Queue Enqueue
  const runQueueEnqueue = (val) => {
    setActiveOperation('enqueue');
    const nextAddr = ADDRESSES[Math.floor(Math.random() * ADDRESSES.length)];
    const baseHeap = [...queueModel.current];
    const steps = [];
    
    // Allocate temp node
    const tempNode = { addr: nextAddr, val, next: 'NULL', delay: 0 };
    const tempLayout = [...baseHeap, tempNode].map((node, idx) => ({
      ...node,
      x: idx === baseHeap.length ? 85 : 20 + idx * 15,
      y: idx === baseHeap.length ? 25 : 50
    }));
    
    steps.push({
      heap: tempLayout,
      stack: { front: baseHeap[0]?.addr || 'NULL', rear: baseHeap[baseHeap.length - 1]?.addr || 'NULL', temp: nextAddr },
      activeAddr: nextAddr,
      visited: [],
      explanation: `Step 1: Allocated new queue element at address ${nextAddr} for value ${val}. Created temp pointer.`,
      activeLine: 1
    });

    if (!baseHeap.length) {
      const finalQueue = [{ addr: nextAddr, val, next: 'NULL' }];
      queueModel.current = finalQueue;
      const finalLayout = layoutQueue(finalQueue);
      steps.push({
        heap: finalLayout,
        stack: { front: nextAddr, rear: nextAddr },
        activeAddr: nextAddr,
        visited: [],
        explanation: `Step 2: Queue was empty, so both front and rear pointers point to new node at ${nextAddr}.`,
        activeLine: 2
      });
      
      setFrames(steps);
      setFrameIndex(0);
      setIsPlaying(true);
      return;
    }

    // Link rear.next = temp
    const linkedLayout = tempLayout.map((node, idx) => {
      if (idx === baseHeap.length - 1) {
        return { ...node, next: nextAddr };
      }
      return node;
    });
    steps.push({
      heap: linkedLayout,
      stack: { front: baseHeap[0]?.addr || 'NULL', rear: baseHeap[baseHeap.length - 1]?.addr || 'NULL', temp: nextAddr },
      activeAddr: baseHeap[baseHeap.length - 1]?.addr || null,
      visited: [],
      explanation: `Step 3: Pointed current rear node's next link (${baseHeap[baseHeap.length - 1]?.addr || 'NULL'}) to new node.`,
      activeLine: 4
    });

    // Shift rear = temp
    const finalQueue = [...baseHeap, { addr: nextAddr, val, next: 'NULL' }];
    queueModel.current = finalQueue;
    const finalLayout = layoutQueue(finalQueue);
    steps.push({
      heap: finalLayout,
      stack: { front: finalQueue[0]?.addr || 'NULL', rear: nextAddr },
      activeAddr: nextAddr,
      visited: [],
      explanation: `Step 4: Updated rear reference to point to ${nextAddr}. Enqueue completed.`,
      activeLine: 5
    });

    setFrames(steps);
    setFrameIndex(0);
    setIsPlaying(true);
  };

  // Queue Dequeue
  const runQueueDequeue = () => {
    setActiveOperation('dequeue');
    const baseHeap = [...queueModel.current];
    if (baseHeap.length === 0) return;
    
    const steps = [];
    const poppedNode = baseHeap[0];
    
    // temp = front
    const initialLayout = layoutQueue(baseHeap);
    steps.push({
      heap: initialLayout,
      stack: { front: poppedNode.addr, rear: baseHeap[baseHeap.length - 1]?.addr, temp: poppedNode.addr },
      activeAddr: poppedNode.addr,
      visited: [],
      explanation: `Step 1: Pointed temp variable to front node at ${poppedNode.addr} to remember it.`,
      activeLine: 2
    });

    // front = front.next
    const nextFront = poppedNode.next;
    steps.push({
      heap: initialLayout,
      stack: { front: nextFront, rear: nextFront === 'NULL' ? 'NULL' : baseHeap[baseHeap.length - 1]?.addr, temp: poppedNode.addr },
      activeAddr: poppedNode.addr,
      visited: [],
      explanation: `Step 2: Moved front pointer to the next element in queue (${nextFront}).`,
      activeLine: 3
    });

    // delete temp
    const remaining = baseHeap.slice(1);
    queueModel.current = remaining;
    const finalLayout = layoutQueue(remaining);
    steps.push({
      heap: finalLayout,
      stack: { front: nextFront, rear: remaining.length === 0 ? 'NULL' : remaining[remaining.length - 1]?.addr },
      activeAddr: null,
      visited: [],
      explanation: `Step 3: Freed/Deallocated front node at address ${poppedNode.addr}.`,
      activeLine: 5
    });

    setFrames(steps);
    setFrameIndex(0);
    setIsPlaying(true);
  };

  // BST Traversal (In-Order)
  const runBSTInOrder = () => {
    setActiveOperation('traverse');
    const baseHeap = frames[0]?.heap || [];
    const baseStack = { root: bstModel.current ? bstModel.current.addr : 'NULL' };
    if (!bstModel.current) return;

    const steps = [];
    const visited = [];

    function traverse(node) {
      if (!node) return;
      
      // Highlight checking left node
      steps.push({
        heap: computeTreeLayout(bstModel.current),
        stack: { ...baseStack, curr: node.addr },
        activeAddr: node.addr,
        visited: [...visited],
        explanation: `Recursively traversing Left subtree of node ${node.val} (${node.addr}).`,
        activeLine: 2
      });

      traverse(node.left);

      // Visit current node
      visited.push(node.addr);
      steps.push({
        heap: computeTreeLayout(bstModel.current),
        stack: { ...baseStack, curr: node.addr },
        activeAddr: node.addr,
        visited: [...visited],
        explanation: `Visiting node value ${node.val} (${node.addr}). Stored to output list.`,
        activeLine: 3
      });

      // Highlight checking right node
      steps.push({
        heap: computeTreeLayout(bstModel.current),
        stack: { ...baseStack, curr: node.addr },
        activeAddr: node.addr,
        visited: [...visited],
        explanation: `Recursively traversing Right subtree of node ${node.val} (${node.addr}).`,
        activeLine: 4
      });

      traverse(node.right);
    }

    traverse(bstModel.current);

    // Final state
    steps.push({
      heap: computeTreeLayout(bstModel.current),
      stack: baseStack,
      activeAddr: null,
      visited: [...visited],
      explanation: `In-Order traversal complete. Traversal order: ${visited.map(addr => {
        const found = computeTreeLayout(bstModel.current).find(n => n.addr === addr);
        return found ? found.val : '';
      }).join(', ')}`,
      activeLine: -1
    });

    setFrames(steps);
    setFrameIndex(0);
    setIsPlaying(true);
  };

  // BST Dynamic Insertion Frame Generator
  const generateBSTInsertFrames = (treeRoot, newVal) => {
    const steps = [];
    const nextAddr = ADDRESSES[Math.floor(Math.random() * ADDRESSES.length)];
    const path = [];
    
    const cloneTree = (node) => {
      if (!node) return null;
      return { val: node.val, addr: node.addr, left: cloneTree(node.left), right: cloneTree(node.right) };
    };
    
    let rootCopy = cloneTree(treeRoot);
    
    const getHeapLayout = (root, tempNode) => {
      const layout = computeTreeLayout(root);
      if (tempNode) layout.push(tempNode);
      return layout;
    };

    const tempNode = { addr: nextAddr, val: newVal, left: 'NULL', right: 'NULL', x: 15, y: 80, delay: 0 };
    
    steps.push({
      heap: getHeapLayout(rootCopy, tempNode),
      stack: { root: rootCopy ? rootCopy.addr : 'NULL', temp: nextAddr },
      activeAddr: nextAddr,
      visited: [],
      explanation: `Step 1: Allocated new BST node at heap block ${nextAddr} for value ${newVal}. Stored in 'temp'.`,
      activeLine: 1
    });

    if (!rootCopy) {
      rootCopy = { val: newVal, addr: nextAddr, left: null, right: null };
      steps.push({
        heap: getHeapLayout(rootCopy),
        stack: { root: nextAddr },
        activeAddr: nextAddr,
        visited: [],
        explanation: `Step 2: Tree was empty. New node becomes root pointer.`,
        activeLine: 1
      });
      return { newRoot: rootCopy, steps };
    }

    let curr = rootCopy;
    let parent = null;
    while (curr) {
      path.push(curr.addr);
      steps.push({
        heap: getHeapLayout(rootCopy, tempNode),
        stack: { root: rootCopy.addr, curr: curr.addr, temp: nextAddr },
        activeAddr: curr.addr,
        visited: [...path],
        explanation: `Comparing ${newVal} with node ${curr.val} at ${curr.addr}.`,
        activeLine: 2
      });

      parent = curr;
      if (newVal < curr.val) {
        curr = curr.left;
        if (!curr) {
          parent.left = { val: newVal, addr: nextAddr, left: null, right: null };
          break;
        }
      } else {
        curr = curr.right;
        if (!curr) {
          parent.right = { val: newVal, addr: nextAddr, left: null, right: null };
          break;
        }
      }
    }

    steps.push({
      heap: getHeapLayout(rootCopy, { ...tempNode, x: parent.x + (newVal < parent.val ? -10 : 10), y: parent.y + 15 }),
      stack: { root: rootCopy.addr, curr: parent.addr, temp: nextAddr },
      activeAddr: nextAddr,
      visited: [...path],
      explanation: `Step 3: Pointed parent node ${parent.val}'s ${newVal < parent.val ? 'left' : 'right'} link to new node ${nextAddr}.`,
      activeLine: 3
    });

    steps.push({
      heap: getHeapLayout(rootCopy),
      stack: { root: rootCopy.addr },
      activeAddr: null,
      visited: [...path, nextAddr],
      explanation: `BST Insertion of ${newVal} completed successfully!`,
      activeLine: 7
    });

    return { newRoot: rootCopy, steps };
  };

  // BST Dynamic Deletion Frame Generator
  const runBSTDelete = (val) => {
    setActiveOperation('delete');
    if (!bstModel.current) return;
    
    const steps = [];
    const path = [];
    
    const cloneTree = (node) => {
      if (!node) return null;
      return { val: node.val, addr: node.addr, left: cloneTree(node.left), right: cloneTree(node.right) };
    };

    let rootCopy = cloneTree(bstModel.current);
    const getHeapLayout = (root) => computeTreeLayout(root);

    let curr = rootCopy;
    let parent = null;
    let found = false;

    while (curr) {
      path.push(curr.addr);
      steps.push({
        heap: getHeapLayout(rootCopy),
        stack: { root: rootCopy.addr, curr: curr.addr },
        activeAddr: curr.addr,
        visited: [...path],
        explanation: `Searching for value ${val}. Comparing with node ${curr.val} at ${curr.addr}.`,
        activeLine: 2
      });

      if (val === curr.val) {
        found = true;
        break;
      }

      parent = curr;
      if (val < curr.val) {
        curr = curr.left;
      } else {
        curr = curr.right;
      }
    }

    if (!found) {
      steps.push({
        heap: getHeapLayout(rootCopy),
        stack: { root: rootCopy.addr },
        activeAddr: null,
        visited: [...path],
        explanation: `Value ${val} not found in BST. Deletion aborted.`,
        activeLine: 1
      });
      setFrames(steps);
      setFrameIndex(0);
      setIsPlaying(true);
      return;
    }

    steps.push({
      heap: getHeapLayout(rootCopy),
      stack: { root: rootCopy.addr, curr: curr.addr, temp: curr.addr },
      activeAddr: curr.addr,
      visited: [...path],
      explanation: `Found target node ${curr.val} at address ${curr.addr}. Beginning deletion.`,
      activeLine: 4
    });

    // Case 1: Leaf node
    if (!curr.left && !curr.right) {
      steps.push({
        heap: getHeapLayout(rootCopy),
        stack: { root: rootCopy.addr, temp: curr.addr },
        activeAddr: curr.addr,
        visited: [...path],
        explanation: `Node ${curr.val} is a leaf. Disconnecting from parent directly.`,
        activeLine: 5
      });

      if (!parent) rootCopy = null;
      else if (parent.left === curr) parent.left = null;
      else parent.right = null;

      steps.push({
        heap: getHeapLayout(rootCopy),
        stack: { root: rootCopy ? rootCopy.addr : 'NULL' },
        activeAddr: null,
        visited: [...path.slice(0, -1)],
        explanation: `Node deleted. Memory freed.`,
        activeLine: 6
      });
    }
    // Case 2: One child (right)
    else if (!curr.left) {
      steps.push({
        heap: getHeapLayout(rootCopy),
        stack: { root: rootCopy.addr, temp: curr.addr },
        activeAddr: curr.addr,
        visited: [...path],
        explanation: `Node ${curr.val} has only right child. Replacing node with its right child.`,
        activeLine: 5
      });

      if (!parent) rootCopy = curr.right;
      else if (parent.left === curr) parent.left = curr.right;
      else parent.right = curr.right;

      steps.push({
        heap: getHeapLayout(rootCopy),
        stack: { root: rootCopy.addr },
        activeAddr: null,
        visited: [...path.slice(0, -1)],
        explanation: `Subtree connected. Deleted node ${val}.`,
        activeLine: 5
      });
    }
    // Case 2b: One child (left)
    else if (!curr.right) {
      steps.push({
        heap: getHeapLayout(rootCopy),
        stack: { root: rootCopy.addr, temp: curr.addr },
        activeAddr: curr.addr,
        visited: [...path],
        explanation: `Node ${curr.val} has only left child. Replacing node with its left child.`,
        activeLine: 6
      });

      if (!parent) rootCopy = curr.left;
      else if (parent.left === curr) parent.left = curr.left;
      else parent.right = curr.left;

      steps.push({
        heap: getHeapLayout(rootCopy),
        stack: { root: rootCopy.addr },
        activeAddr: null,
        visited: [...path.slice(0, -1)],
        explanation: `Subtree connected. Deleted node ${val}.`,
        activeLine: 6
      });
    }
    // Case 3: Two children
    else {
      let successor = curr.right;
      let succParent = curr;
      const succPath = [successor.addr];

      steps.push({
        heap: getHeapLayout(rootCopy),
        stack: { root: rootCopy.addr, curr: successor.addr },
        activeAddr: successor.addr,
        visited: [...path, ...succPath],
        explanation: `Node has two children. Finding in-order successor (min in right subtree). Started at right child ${successor.val}.`,
        activeLine: 7
      });

      while (successor.left) {
        succParent = successor;
        successor = successor.left;
        succPath.push(successor.addr);
        steps.push({
          heap: getHeapLayout(rootCopy),
          stack: { root: rootCopy.addr, curr: successor.addr },
          activeAddr: successor.addr,
          visited: [...path, ...succPath],
          explanation: `Moving left: found smaller node ${successor.val} at ${successor.addr}.`,
          activeLine: 7
        });
      }

      steps.push({
        heap: getHeapLayout(rootCopy),
        stack: { root: rootCopy.addr, curr: curr.addr, temp: successor.addr },
        activeAddr: successor.addr,
        visited: [...path, ...succPath],
        explanation: `Found successor ${successor.val}. Copying value ${successor.val} to current node to replace it.`,
        activeLine: 8
      });

      curr.val = successor.val;

      steps.push({
        heap: getHeapLayout(rootCopy),
        stack: { root: rootCopy.addr, curr: curr.addr },
        activeAddr: curr.addr,
        visited: [...path],
        explanation: `Value copied. Now deleting successor node ${successor.val} in right subtree.`,
        activeLine: 9
      });

      if (succParent.left === successor) succParent.left = successor.right;
      else succParent.right = successor.right;

      steps.push({
        heap: getHeapLayout(rootCopy),
        stack: { root: rootCopy.addr },
        activeAddr: null,
        visited: [],
        explanation: `Successor deleted. Node deletion complete!`,
        activeLine: 10
      });
    }

    bstModel.current = rootCopy;
    setFrames(steps);
    setFrameIndex(0);
    setIsPlaying(true);
  };

  // AVL Insertion and Balancing
  const runAVLInsert = (val) => {
    setActiveOperation('insert');
    const nextAddr = ADDRESSES[Math.floor(Math.random() * ADDRESSES.length)];
    const steps = [];
    const path = [];

    const cloneTree = (node) => {
      if (!node) return null;
      return { val: node.val, addr: node.addr, left: cloneTree(node.left), right: cloneTree(node.right) };
    };

    let rootCopy = cloneTree(avlModel.current);

    const getHeapLayout = (root, tempNode) => {
      const layout = computeTreeLayout(root);
      if (tempNode) layout.push(tempNode);
      return layout;
    };

    const tempNode = { addr: nextAddr, val, left: 'NULL', right: 'NULL', x: 15, y: 80, delay: 0 };

    steps.push({
      heap: getHeapLayout(rootCopy, tempNode),
      stack: { root: rootCopy ? rootCopy.addr : 'NULL', temp: nextAddr },
      activeAddr: nextAddr,
      visited: [],
      explanation: `Step 1: Allocated new AVL node at heap block ${nextAddr} for value ${val}.`,
      activeLine: 1
    });

    if (!rootCopy) {
      rootCopy = { val, addr: nextAddr, left: null, right: null };
      steps.push({
        heap: getHeapLayout(rootCopy),
        stack: { root: nextAddr },
        activeAddr: nextAddr,
        visited: [],
        explanation: `Tree was empty. New node becomes root of AVL Tree.`,
        activeLine: 1
      });
      avlModel.current = rootCopy;
      setFrames(steps);
      setFrameIndex(0);
      setIsPlaying(true);
      return;
    }

    let curr = rootCopy;
    let parent = null;
    while (curr) {
      path.push(curr.addr);
      steps.push({
        heap: getHeapLayout(rootCopy, tempNode),
        stack: { root: rootCopy.addr, curr: curr.addr, temp: nextAddr },
        activeAddr: curr.addr,
        visited: [...path],
        explanation: `Searching insertion point: comparing ${val} with ${curr.val} at ${curr.addr}.`,
        activeLine: 2
      });

      parent = curr;
      if (val < curr.val) {
        curr = curr.left;
        if (!curr) {
          parent.left = { val, addr: nextAddr, left: null, right: null };
          break;
        }
      } else {
        curr = curr.right;
        if (!curr) {
          parent.right = { val, addr: nextAddr, left: null, right: null };
          break;
        }
      }
    }

    steps.push({
      heap: getHeapLayout(rootCopy, { ...tempNode, x: parent.x + (val < parent.val ? -10 : 10), y: parent.y + 15 }),
      stack: { root: rootCopy.addr, curr: parent.addr, temp: nextAddr },
      activeAddr: nextAddr,
      visited: [...path],
      explanation: `Linked new node under parent ${parent.val}. Checking balances recursively up the path.`,
      activeLine: 3
    });

    const insertAndBalance = (node, pathStack) => {
      if (!node) return { node: { val, addr: nextAddr, left: null, right: null }, rotated: false };
      
      let res;
      if (val < node.val) {
        res = insertAndBalance(node.left, pathStack);
        node.left = res.node;
      } else {
        res = insertAndBalance(node.right, pathStack);
        node.right = res.node;
      }

      const bf = getBalanceFactor(node);
      
      steps.push({
        heap: getHeapLayout(rootCopy),
        stack: { root: rootCopy.addr, curr: node.addr },
        activeAddr: node.addr,
        visited: [...pathStack],
        explanation: `Checking balance factor of node ${node.val} (${node.addr}). Balance factor = ${bf}.`,
        activeLine: 4
      });

      // Left Heavy
      if (bf > 1) {
        if (val < node.left.val) {
          steps.push({
            heap: getHeapLayout(rootCopy),
            stack: { root: rootCopy.addr, critical: node.addr },
            activeAddr: node.addr,
            visited: [],
            explanation: `Imbalance detected at ${node.val} (bf=${bf}, Left-Left). Performing Right Rotation on ${node.val}.`,
            activeLine: 5
          });
          const rotated = rightRotate(node);
          return { node: rotated, rotated: true };
        } else {
          steps.push({
            heap: getHeapLayout(rootCopy),
            stack: { root: rootCopy.addr, critical: node.addr },
            activeAddr: node.left.addr,
            visited: [],
            explanation: `Imbalance detected at ${node.val} (bf=${bf}, Left-Right). First, Left Rotating child node ${node.left.val}.`,
            activeLine: 8
          });
          node.left = leftRotate(node.left);
          
          steps.push({
            heap: getHeapLayout(rootCopy),
            stack: { root: rootCopy.addr, critical: node.addr },
            activeAddr: node.addr,
            visited: [],
            explanation: `Now, Right Rotating critical node ${node.val}.`,
            activeLine: 8
          });
          const rotated = rightRotate(node);
          return { node: rotated, rotated: true };
        }
      }

      // Right Heavy
      if (bf < -1) {
        if (val > node.right.val) {
          steps.push({
            heap: getHeapLayout(rootCopy),
            stack: { root: rootCopy.addr, critical: node.addr },
            activeAddr: node.addr,
            visited: [],
            explanation: `Imbalance detected at ${node.val} (bf=${bf}, Right-Right). Performing Left Rotation on ${node.val}.`,
            activeLine: 6
          });
          const rotated = leftRotate(node);
          return { node: rotated, rotated: true };
        } else {
          steps.push({
            heap: getHeapLayout(rootCopy),
            stack: { root: rootCopy.addr, critical: node.addr },
            activeAddr: node.right.addr,
            visited: [],
            explanation: `Imbalance detected at ${node.val} (bf=${bf}, Right-Left). First, Right Rotating child node ${node.right.val}.`,
            activeLine: 9
          });
          node.right = rightRotate(node.right);
          
          steps.push({
            heap: getHeapLayout(rootCopy),
            stack: { root: rootCopy.addr, critical: node.addr },
            activeAddr: node.addr,
            visited: [],
            explanation: `Now, Left Rotating critical node ${node.val}.`,
            activeLine: 9
          });
          const rotated = leftRotate(node);
          return { node: rotated, rotated: true };
        }
      }

      return { node, rotated: false };
    };

    const rightRotate = (y) => {
      const x = y.left;
      const T2 = x.right;
      x.right = y;
      y.left = T2;
      
      if (y === rootCopy) rootCopy = x;
      return x;
    };

    const leftRotate = (x) => {
      const y = x.right;
      const T2 = y.left;
      y.left = x;
      x.right = T2;
      
      if (x === rootCopy) rootCopy = y;
      return y;
    };

    const finalTreeResult = insertAndBalance(rootCopy, path);
    rootCopy = finalTreeResult.node;

    steps.push({
      heap: getHeapLayout(rootCopy),
      stack: { root: rootCopy.addr },
      activeAddr: null,
      visited: [],
      explanation: `AVL Insertion and balancing complete for value ${val}!`,
      activeLine: 10
    });

    avlModel.current = rootCopy;
    setFrames(steps);
    setFrameIndex(0);
    setIsPlaying(true);
  };

  // Min-Heap Insertion (Heapify Up)
  const runHeapInsert = (val) => {
    setActiveOperation('insert');
    const steps = [];
    const arr = [...heapModel.current];
    
    arr.push(val);
    const getLayout = (tempArr) => layoutHeapArray(tempArr);
    
    steps.push({
      heap: getLayout(arr),
      stack: { root: ADDRESSES[0], size: arr.length, temp: ADDRESSES[(arr.length - 1) % ADDRESSES.length] },
      activeAddr: ADDRESSES[(arr.length - 1) % ADDRESSES.length],
      visited: [],
      explanation: `Step 1: Stored value ${val} at index ${arr.length - 1} (end of heap array).`,
      activeLine: 1
    });

    let i = arr.length - 1;
    while (i > 0) {
      const p = Math.floor((i - 1) / 2);
      steps.push({
        heap: getLayout(arr),
        stack: { root: ADDRESSES[0], parent: ADDRESSES[p % ADDRESSES.length], child: ADDRESSES[i % ADDRESSES.length] },
        activeAddr: ADDRESSES[i % ADDRESSES.length],
        visited: [ADDRESSES[p % ADDRESSES.length]],
        explanation: `Heapify Up: Comparing child index ${i} (${arr[i]}) with parent index ${p} (${arr[p]}).`,
        activeLine: 3
      });

      if (arr[p] > arr[i]) {
        const temp = arr[p];
        arr[p] = arr[i];
        arr[i] = temp;
        
        steps.push({
          heap: getLayout(arr),
          stack: { root: ADDRESSES[0], parent: ADDRESSES[p % ADDRESSES.length], child: ADDRESSES[i % ADDRESSES.length] },
          activeAddr: ADDRESSES[p % ADDRESSES.length],
          visited: [ADDRESSES[i % ADDRESSES.length]],
          explanation: `Swap: Parent ${arr[i]} > child ${arr[p]}. Swapped values.`,
          activeLine: 4
        });
        i = p;
      } else {
        break;
      }
    }

    steps.push({
      heap: getLayout(arr),
      stack: { root: ADDRESSES[0] },
      activeAddr: null,
      visited: [],
      explanation: `Min-Heap Insertion complete. Node satisfies min-heap property.`,
      activeLine: 6
    });

    heapModel.current = arr;
    setFrames(steps);
    setFrameIndex(0);
    setIsPlaying(true);
  };

  // Min-Heap Extract-Min (Heapify Down)
  const runHeapExtractMin = () => {
    setActiveOperation('extract');
    const steps = [];
    const arr = [...heapModel.current];
    if (arr.length === 0) return;

    const rootVal = arr[0];
    const getLayout = (tempArr) => layoutHeapArray(tempArr);

    steps.push({
      heap: getLayout(arr),
      stack: { root: ADDRESSES[0], extract: ADDRESSES[0] },
      activeAddr: ADDRESSES[0],
      visited: [],
      explanation: `Step 1: Extracted minimum root value ${rootVal} from index 0.`,
      activeLine: 1
    });

    if (arr.length === 1) {
      arr.pop();
      steps.push({
        heap: getLayout(arr),
        stack: {},
        activeAddr: null,
        visited: [],
        explanation: `Heap is now empty.`,
        activeLine: 2
      });
      heapModel.current = arr;
      setFrames(steps);
      setFrameIndex(0);
      setIsPlaying(true);
      return;
    }

    const lastVal = arr.pop();
    arr[0] = lastVal;

    steps.push({
      heap: getLayout(arr),
      stack: { root: ADDRESSES[0] },
      activeAddr: ADDRESSES[0],
      visited: [],
      explanation: `Step 2: Replaced root with last element ${lastVal}. Stored at index 0.`,
      activeLine: 2
    });

    let i = 0;
    while (true) {
      let left = 2 * i + 1;
      let right = 2 * i + 2;
      let smallest = i;

      if (left < arr.length && arr[left] < arr[smallest]) smallest = left;
      if (right < arr.length && arr[right] < arr[smallest]) smallest = right;

      if (smallest !== i) {
        steps.push({
          heap: getLayout(arr),
          stack: { root: ADDRESSES[0], parent: ADDRESSES[i % ADDRESSES.length], child: ADDRESSES[smallest % ADDRESSES.length] },
          activeAddr: ADDRESSES[i % ADDRESSES.length],
          visited: [ADDRESSES[smallest % ADDRESSES.length]],
          explanation: `Heapify Down: Comparing node ${i} (${arr[i]}) with children. Smallest child is index ${smallest} (${arr[smallest]}).`,
          activeLine: 3
        });

        const temp = arr[i];
        arr[i] = arr[smallest];
        arr[smallest] = temp;

        steps.push({
          heap: getLayout(arr),
          stack: { root: ADDRESSES[0], parent: ADDRESSES[i % ADDRESSES.length], child: ADDRESSES[smallest % ADDRESSES.length] },
          activeAddr: ADDRESSES[smallest % ADDRESSES.length],
          visited: [ADDRESSES[i % ADDRESSES.length]],
          explanation: `Swap: Swapped values at index ${i} and ${smallest}.`,
          activeLine: 3
        });
        i = smallest;
      } else {
        break;
      }
    }

    steps.push({
      heap: getLayout(arr),
      stack: { root: ADDRESSES[0] },
      activeAddr: null,
      visited: [],
      explanation: `Min-Heap Extract-Min and Heapify-Down complete! Returning root value ${rootVal}.`,
      activeLine: 4
    });

    heapModel.current = arr;
    setFrames(steps);
    setFrameIndex(0);
    setIsPlaying(true);
  };

  // Graph BFS Traversal
  const runGraphBFS = () => {
    setActiveOperation('bfs');
    const baseHeap = frames[0]?.heap || [];
    const baseStack = { start: baseHeap[0]?.addr };
    if (baseHeap.length === 0) return;

    const steps = [];
    const visited = [];
    const queue = [baseStack.start];
    
    steps.push({
      heap: baseHeap,
      stack: { ...baseStack, queue: baseHeap[0]?.val },
      activeAddr: baseStack.start,
      visited: [],
      explanation: `BFS: Initialized queue with start node A (${baseStack.start}).`,
      activeLine: 1
    });

    visited.push(baseStack.start);
    steps.push({
      heap: baseHeap,
      stack: { ...baseStack, queue: baseHeap[0]?.val },
      activeAddr: baseStack.start,
      visited: [...visited],
      explanation: `BFS: Marked start node A visited.`,
      activeLine: 2
    });

    while (queue.length > 0) {
      const currAddr = queue.shift();
      const currNode = baseHeap.find(n => n.addr === currAddr);
      if (!currNode) continue;

      steps.push({
        heap: baseHeap,
        stack: { ...baseStack, queue: queue.map(a => baseHeap.find(n => n.addr === a)?.val).join(', ') || 'empty', curr: currAddr },
        activeAddr: currAddr,
        visited: [...visited],
        explanation: `BFS: Dequeued current node ${currNode.val} (${currAddr}).`,
        activeLine: 4
      });

      const neighbors = currNode.neighbors || [];
      for (let i = 0; i < neighbors.length; i++) {
        const nbrAddr = neighbors[i];
        const nbrNode = baseHeap.find(n => n.addr === nbrAddr);
        if (nbrNode) {
          if (!visited.includes(nbrAddr)) {
            visited.push(nbrAddr);
            queue.push(nbrAddr);
            steps.push({
              heap: baseHeap,
              stack: { ...baseStack, queue: queue.map(a => baseHeap.find(n => n.addr === a)?.val).join(', '), curr: currAddr },
              activeAddr: nbrAddr,
              visited: [...visited],
              explanation: `BFS: Unvisited neighbor ${nbrNode.val} (${nbrAddr}) found. Marked visited and enqueued.`,
              activeLine: 6
            });
          }
        }
      }
    }

    steps.push({
      heap: baseHeap,
      stack: { start: baseStack.start },
      activeAddr: null,
      visited: [...visited],
      explanation: `BFS complete. Traversal order: ${visited.map(addr => baseHeap.find(n => n.addr === addr)?.val).join(' ➔ ')}`,
      activeLine: 9
    });

    setFrames(steps);
    setFrameIndex(0);
    setIsPlaying(true);
  };

  // Sorting Algorithms Trace Generator
  const runSortingAlgo = (algo) => {
    stopPlayback();
    setActiveOperation(algo);
    const baseHeap = frames[0]?.heap || [];
    const baseStack = frames[0]?.stack || {};
    
    const arr = baseHeap.map(n => n.val);
    const addrs = baseHeap.map(n => n.addr);
    
    const steps = [];
    
    const pushSortFrame = (currArr, activeIndices = [], explanation = '', activeLine = -1) => {
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
        explanation: explanation,
        activeLine: activeLine
      });
    };
    
    pushSortFrame([...arr], [], `Starting ${algo} sort on array [${arr.join(', ')}].`, 0);
    
    if (algo === 'bubble') {
      const tempArr = [...arr];
      const n = tempArr.length;
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - i - 1; j++) {
          pushSortFrame([...tempArr], [j, j + 1], `Comparing index ${j} (${tempArr[j]}) and index ${j+1} (${tempArr[j+1]})`, 2);
          if (tempArr[j] > tempArr[j + 1]) {
            const temp = tempArr[j];
            tempArr[j] = tempArr[j + 1];
            tempArr[j + 1] = temp;
            pushSortFrame([...tempArr], [j, j + 1], `Swap: ${tempArr[j+1]} > ${tempArr[j]}. Swapped elements.`, 3);
          }
        }
      }
      pushSortFrame([...tempArr], [], `Bubble Sort complete! Final sorted array: [${tempArr.join(', ')}].`, 5);
    }

    setFrames(steps);
    setFrameIndex(0);
    setIsPlaying(true);
  };

  const handleExecuteAction = (type) => {
    const num = parseInt(inputVal, 10);
    setInputVal('');

    if (type === 'insert') {
      if (isNaN(num)) return alert('Enter a numeric value.');
      if (structure === 'list') runListInsertHead(num);
      else if (structure === 'doubly') runDoublyInsertHead(num);
      else if (structure === 'stack') runStackPush(num);
      else if (structure === 'queue') runQueueEnqueue(num);
      else if (structure === 'bst') {
        const { newRoot, steps } = generateBSTInsertFrames(bstModel.current, num);
        bstModel.current = newRoot;
        setFrames(steps);
        setFrameIndex(0);
        setIsPlaying(true);
      }
      else if (structure === 'avl') runAVLInsert(num);
      else if (structure === 'heap') runHeapInsert(num);
    } else if (type === 'delete') {
      if (structure === 'list') runListDeleteHead();
      else if (structure === 'doubly') runListDeleteHead(); 
      else if (structure === 'stack') runStackPop();
      else if (structure === 'queue') runQueueDequeue();
      else if (structure === 'bst') {
        if (isNaN(num)) return alert('Enter the value to delete.');
        runBSTDelete(num);
      }
      else if (structure === 'avl') {
        alert('AVL Deletion is not supported. Please use balancing insert operations.');
      }
      else if (structure === 'heap') runHeapExtractMin();
    } else if (type === 'traverse') {
      if (structure === 'bst') runBSTInOrder();
      else if (structure === 'graph') runGraphBFS();
    }
  };

  const currentFrame = frames[frameIndex] || { heap: [], stack: {}, activeAddr: null, visited: [], explanation: '', activeLine: -1 };

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

  // Resolve active code array for selected operation / language
  const codeLines = (() => {
    const structOps = ALGO_CODE[structure];
    if (!structOps) return [];
    
    // Resolve which operational code to show (e.g. insert, push, enqueue, bfs, bubble)
    let opKey = activeOperation;
    if (structure === 'stack') opKey = activeOperation === 'insert' ? 'push' : 'pop';
    if (structure === 'queue') opKey = activeOperation === 'insert' ? 'enqueue' : 'dequeue';
    if (structure === 'bst' && activeOperation === 'insert') opKey = 'insert';
    if (structure === 'bst' && activeOperation === 'delete') opKey = 'delete';
    if (structure === 'bst' && activeOperation === 'traverse') opKey = 'traverse';
    if (structure === 'graph') opKey = 'bfs';
    if (structure === 'array') opKey = 'bubble';
    
    const op = structOps[opKey];
    if (!op) return [];
    return op[selectedLang] || [];
  })();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', height: isFullscreen ? 'calc(100vh - 120px)' : 'calc(100vh - var(--header-height) - 180px)', overflow: 'hidden' }}>
      
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
          transition: left 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), top 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .orbit-canvas-space {
          cursor: grab;
        }
        .orbit-canvas-space:active {
          cursor: grabbing;
        }
        .playback-btn {
          background: var(--bg-input);
          border: 1px solid var(--border-glass);
          color: var(--text-primary);
          border-radius: 8px;
          padding: 6px 14px;
          cursor: pointer;
          font-size: 0.8rem;
          transition: all 0.2s;
        }
        .playback-btn:hover:not(:disabled) {
          background: var(--accent-purple);
          color: #fff;
          box-shadow: 0 0 10px rgba(124, 77, 255, 0.4);
        }
        .playback-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
        .lang-tab {
          padding: 4px 10px;
          cursor: pointer;
          border-radius: 4px;
          border: 1px solid transparent;
          font-size: 0.72rem;
          color: var(--text-secondary);
          transition: all 0.2s;
        }
        .lang-tab:hover {
          color: var(--text-primary);
        }
        .lang-tab.active {
          background: var(--accent-purple-glow);
          border-color: var(--accent-purple);
          color: var(--text-primary);
        }
        .control-input-group {
          background: rgba(255,255,255,0.02);
          border: 1px solid var(--border-glass);
          border-radius: 8px;
          padding: 10px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        @media (max-width: 1200px) {
          .visualizer-grid {
            flex-direction: column !important;
            height: auto !important;
            overflow-y: auto !important;
          }
          .controls-panel, .code-panel, .canvas-panel {
            width: 100% !important;
            height: auto !important;
            flex-shrink: 0 !important;
          }
          .canvas-panel {
            height: 480px !important;
          }
        }
      `}</style>

      {/* Main Workspace Layout */}
      <div className="visualizer-grid" style={{ display: 'flex', flexGrow: 1, gap: '14px', overflow: 'hidden', minHeight: 0 }}>
        
        {/* Panel 1: Controls Sidebar */}
        <div className="controls-panel" style={{ width: '280px', display: 'flex', flexDirection: 'column', gap: '12px', flexShrink: 0 }}>
          <div className="card" style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h3 style={{ margin: 0, fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>🧊</span> DSA Hub Selector
            </h3>

            <select 
              className="algorithm-selector" 
              value={structure} 
              onChange={e => setStructure(e.target.value)}
              style={{ width: '100%', fontSize: '0.8rem', padding: '6px' }}
            >
              <option value="list">Singly Linked List</option>
              <option value="doubly">Doubly Linked List</option>
              <option value="stack">Stack (LIFO)</option>
              <option value="queue">Queue (FIFO)</option>
              <option value="bst">Binary Search Tree</option>
              <option value="avl">AVL Tree (Balanced)</option>
              <option value="heap">Binary Min-Heap</option>
              <option value="graph">Graph Mesh (BFS)</option>
              <option value="array">Array (Bubble Sort)</option>
            </select>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px solid var(--border-glass)', paddingTop: '10px', marginTop: '2px', width: '100%' }}>
              {structure === 'array' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
                  <button className="btn btn-primary btn-sm" style={{ width: '100%' }} onClick={() => runSortingAlgo('bubble')}>
                    Run Bubble Sort
                  </button>
                </div>
              )}

              {structure === 'graph' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
                  <button className="btn btn-primary btn-sm" style={{ width: '100%' }} onClick={() => runGraphBFS()}>
                    Run BFS Traversal
                  </button>
                </div>
              )}

              {structure === 'bst' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <input 
                      type="number"
                      className="text-input"
                      placeholder="Val"
                      value={inputVal}
                      onChange={e => setInputVal(e.target.value)}
                      style={{ width: '60px', padding: '5px', fontSize: '0.8rem' }}
                    />
                    <button className="btn btn-primary btn-sm" style={{ flexGrow: 1 }} onClick={() => handleExecuteAction('insert')}>Insert</button>
                    <button className="btn btn-secondary btn-sm" style={{ flexGrow: 1 }} onClick={() => handleExecuteAction('delete')}>Delete</button>
                  </div>
                  <button className="btn btn-secondary btn-sm" style={{ width: '100%', fontSize: '0.75rem', padding: '4px' }} onClick={() => handleExecuteAction('traverse')}>
                    Run In-Order traversal
                  </button>
                </div>
              )}

              {structure === 'avl' && (
                <div style={{ display: 'flex', gap: '6px' }}>
                  <input 
                    type="number"
                    className="text-input"
                    placeholder="Val"
                    value={inputVal}
                    onChange={e => setInputVal(e.target.value)}
                    style={{ width: '60px', padding: '5px', fontSize: '0.8rem' }}
                  />
                  <button className="btn btn-primary btn-sm" style={{ flexGrow: 1 }} onClick={() => handleExecuteAction('insert')}>Insert & Balance</button>
                </div>
              )}

              {['list', 'doubly', 'stack', 'queue', 'heap'].includes(structure) && (
                <div style={{ display: 'flex', gap: '6px', width: '100%' }}>
                  <input 
                    type="number"
                    className="text-input"
                    placeholder="Val"
                    value={inputVal}
                    onChange={e => setInputVal(e.target.value)}
                    style={{ width: '60px', padding: '5px', fontSize: '0.8rem' }}
                  />
                  <button className="btn btn-primary btn-sm" style={{ flexGrow: 1 }} onClick={() => handleExecuteAction('insert')}>
                    {structure === 'heap' ? 'Insert' : 'Insert/Push'}
                  </button>
                  <button className="btn btn-secondary btn-sm" style={{ flexGrow: 1 }} onClick={() => handleExecuteAction('delete')}>
                    {structure === 'heap' ? 'Extract Min' : 'Delete/Pop'}
                  </button>
                </div>
              )}
            </div>

            {/* 3D Camera Controls */}
            <div style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Auto-Orbit View:</span>
                <input 
                  type="checkbox" 
                  checked={autoRotate} 
                  onChange={e => setAutoRotate(e.target.checked)} 
                  style={{ width: '14px', height: '14px', cursor: 'pointer' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                <span>Zoom Level:</span>
                <span>{zoom.toFixed(2)}x</span>
              </div>
              <input type="range" min="0.5" max="1.5" step="0.05" value={zoom} onChange={e => setZoom(parseFloat(e.target.value))} style={{ cursor: 'pointer' }} />
              
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                <span>Camera Height:</span>
                <span>{rotation.x}°</span>
              </div>
              <input type="range" min="-10" max="65" value={rotation.x} onChange={e => setRotation(prev => ({ ...prev, x: parseInt(e.target.value) }))} style={{ cursor: 'pointer' }} />

              <button className="btn btn-secondary btn-sm" style={{ fontSize: '0.72rem', padding: '4px' }} onClick={() => { setRotation({ x: 20, y: -10 }); setZoom(1.0); setPerspective(1200); setAutoRotate(false); }}>
                Reset Camera
              </button>
            </div>
          </div>

          {/* Playback Controls Card */}
          <div className="card" style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <h3 style={{ margin: 0, fontSize: '0.86rem', color: 'var(--accent-cyan)' }}>⏳ Trace Playback</h3>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '6px' }}>
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

            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textAlign: 'center' }}>
              Frame {frameIndex + 1} of {frames.length}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', borderTop: '1px solid var(--border-glass)', paddingTop: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                <span>Speed:</span>
                <span>{delay}ms</span>
              </div>
              <input type="range" min="200" max="2000" step="100" value={delay} onChange={e => setDelay(parseInt(e.target.value))} style={{ cursor: 'pointer' }} />
            </div>
          </div>

          {/* Explanation panel */}
          <div className="card" style={{ padding: '14px', flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '6px', overflowY: 'auto' }}>
            <h3 style={{ margin: 0, fontSize: '0.82rem', color: 'var(--accent-purple)' }}>📢 Step Logic Description</h3>
            <p style={{ margin: 0, fontSize: '0.76rem', color: 'var(--text-secondary)', lineHeight: '1.45' }}>
              {currentFrame.explanation}
            </p>
          </div>
        </div>

        {/* Panel 2: Large Center 3D Pointer Viewport */}
        <div 
          className="card orbit-canvas-space canvas-panel"
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          style={{ flex: 1, minWidth: 0, background: 'var(--bg-primary)', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', userSelect: 'none' }}
        >
          <div style={{ padding: '10px 14px', borderBottom: '1px solid var(--border-glass)', zIndex: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-header)', backdropFilter: 'blur(6px)' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Perspective: <strong>3D Pointer Heap Grid</strong></span>
            <span style={{ fontSize: '0.74rem', color: 'var(--accent-cyan)', fontWeight: '500' }}>🖱️ Left-Click & Drag to Rotate Plane</span>
          </div>

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
                width: '92%',
                height: '84%',
                background: 'radial-gradient(circle, var(--accent-purple-glow) 1px, transparent 1px)',
                backgroundSize: '24px 24px',
                border: '1.5px solid var(--border-glass)',
                borderRadius: '24px',
                transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${zoom})`,
                transformStyle: 'preserve-3d',
                boxShadow: '0 25px 60px rgba(0,0,0,0.65)',
                transition: isDraggingRef.current ? 'none' : 'transform 0.4s cubic-bezier(0.1, 0.8, 0.3, 1)'
              }}
            >
              {/* Stack segment (Left) */}
              <div 
                style={{
                  position: 'absolute',
                  left: '2%',
                  top: '8%',
                  bottom: '8%',
                  width: '165px',
                  background: 'rgba(255, 255, 255, 0.005)',
                  borderRight: '1px dashed var(--border-glass)',
                  padding: '10px',
                  boxSizing: 'border-box',
                  transform: 'translateZ(10px)',
                  transformStyle: 'preserve-3d'
                }}
              >
                <div style={{ color: 'var(--accent-cyan)', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold', marginBottom: '14px' }}>
                  📥 Stack segment
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {Object.entries(currentFrame.stack).map(([key, val]) => (
                    <div 
                      key={key} 
                      style={{ 
                        background: 'var(--bg-secondary)', 
                        border: '1px solid var(--border-glass)', 
                        borderRadius: '8px', 
                        padding: '6px 10px',
                        fontSize: '0.74rem',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
                        transform: 'translateZ(15px)',
                        backdropFilter: 'blur(4px)'
                      }}
                    >
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.6rem' }}>variable</div>
                      <div style={{ fontWeight: 'bold', color: 'var(--accent-purple)' }}>{key}</div>
                      <div style={{ fontFamily: 'monospace', color: 'var(--text-secondary)', fontSize: '0.7rem', marginTop: '2px', wordBreak: 'break-all' }}>
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
                  left: '180px', 
                  right: 0, 
                  top: 0, 
                  bottom: 0,
                  transformStyle: 'preserve-3d'
                }}
              >
                <div style={{ position: 'absolute', left: '16px', top: '12px', color: 'var(--accent-purple)', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold' }}>
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
                    <marker id="arrow" viewBox="0 0 10 10" refX="22" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                      <path d="M0,0 L10,5 L0,10 z" fill="var(--accent-cyan)" />
                    </marker>
                    <marker id="arrow-stack" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                      <path d="M0,0 L10,5 L0,10 z" fill="var(--accent-purple)" />
                    </marker>
                    <marker id="arrow-prev" viewBox="0 0 10 10" refX="22" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
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
                        targets.push({ type: 'next', addr: node.next, color: 'var(--accent-cyan)', offset: -2 });
                      }
                      if (node.prev && node.prev !== 'NULL') {
                        targets.push({ type: 'prev', addr: node.prev, color: 'var(--accent-rose)', offset: 2 });
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
                            strokeWidth="2.2"
                            className="neon-flow-line"
                            markerEnd={target.type === 'prev' ? "url(#arrow-prev)" : "url(#arrow)"}
                            style={{ 
                              opacity: 0.85, 
                              filter: `drop-shadow(0 0 5px ${target.color})`,
                            }}
                          />
                          {weightEdge && (
                            <text
                              x={`${(parseFloat(node.x) + parseFloat(targetNode.x)) / 2}%`}
                              y={`${(parseFloat(node.y) + parseFloat(targetNode.y)) / 2 - 2}%`}
                              fill="var(--accent-rose)"
                              fontSize="0.7rem"
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
                        strokeWidth="2.2"
                        markerEnd="url(#arrow-stack)"
                        style={{ 
                          opacity: 0.65,
                          filter: 'drop-shadow(0 0 4px var(--accent-purple))',
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
                  let glowStyle = '0 8px 20px rgba(0,0,0,0.5)';
                  
                  if (isActive) {
                    borderStyle = '2.5px solid var(--accent-cyan)';
                    glowStyle = '0 0 20px rgba(0, 229, 255, 0.6)';
                  } else if (isVisited) {
                    borderStyle = '2.5px solid var(--accent-emerald)';
                    glowStyle = '0 0 20px rgba(0, 230, 118, 0.4)';
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
                        background: 'var(--bg-secondary)',
                        border: borderStyle,
                        boxShadow: glowStyle,
                        borderRadius: '12px',
                        padding: '10px 12px',
                        color: 'var(--text-primary)',
                        cursor: 'pointer',
                        zIndex: 5,
                        width: '120px',
                        backdropFilter: 'blur(8px)',
                        transformStyle: 'preserve-3d',
                        transition: 'border 0.2s, box-shadow 0.2s, left 0.4s cubic-bezier(0.2,0.8,0.2,1), top 0.4s cubic-bezier(0.2,0.8,0.2,1)'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.58rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                        <span>addr</span>
                        <span style={{ fontFamily: 'monospace' }}>{node.addr}</span>
                      </div>

                      <div style={{ fontSize: '1.1rem', fontWeight: 'bold', textAlign: 'center', margin: '2px 0', color: 'var(--accent-purple)' }}>
                        {node.val}
                      </div>

                      {/* Display child field linkages */}
                      <div style={{ fontSize: '0.58rem', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '4px', marginTop: '4px', display: 'flex', flexDirection: 'column', gap: '2px', fontFamily: 'monospace' }}>
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

        {/* Panel 3: Side-by-side Code Execution Panel */}
        <div className="code-panel" style={{ width: '320px', display: 'flex', flexDirection: 'column', gap: '12px', flexShrink: 0 }}>
          <div className="card" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '10px', padding: '14px', overflow: 'hidden' }}>
            <h3 style={{ margin: 0, fontSize: '0.86rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>💻</span> Code Execution Panel
            </h3>

            {/* Language Switcher Tabs */}
            <div style={{ display: 'flex', gap: '4px', background: 'var(--bg-input)', padding: '3px', borderRadius: '6px', border: '1px solid var(--border-glass)' }}>
              {['cpp', 'python', 'js', 'java'].map((lang) => (
                <button
                  key={lang}
                  className={`lang-tab ${selectedLang === lang ? 'active' : ''}`}
                  onClick={() => setSelectedLang(lang)}
                  style={{
                    flexGrow: 1,
                    background: 'transparent',
                    border: 'none',
                    padding: '4px 6px',
                    fontSize: '0.7rem',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  {lang === 'cpp' ? 'C++' : lang === 'js' ? 'JS' : lang === 'python' ? 'Python' : 'Java'}
                </button>
              ))}
            </div>

            {/* Highlighted Code Display Container */}
            <div style={{
              flexGrow: 1,
              background: 'var(--code-bg)',
              border: '1px solid var(--border-glass)',
              borderRadius: '8px',
              padding: '12px 0',
              overflowY: 'auto',
              fontFamily: '"Fira Code", monospace',
              fontSize: '0.78rem'
            }}>
              {codeLines.length > 0 ? (
                codeLines.map((lineText, idx) => (
                  <CodeLine
                    key={idx}
                    text={lineText}
                    isHighlighted={idx === currentFrame.activeLine}
                  />
                ))
              ) : (
                <div style={{ padding: '16px', color: 'var(--text-muted)', fontSize: '0.74rem', fontStyle: 'italic', textAlign: 'center' }}>
                  No code snippet available for the current algorithm step.
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
