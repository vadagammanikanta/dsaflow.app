// dsa_curriculum_extended.js
// ═══════════════════════════════════════════════════════════════════════════
//  Premium DSA Curriculum — Extended Modules (Phases 5 & 6)
// ═══════════════════════════════════════════════════════════════════════════

export const curriculumExtended = [
  // ══════════════════════════════════════════════════════
  //  PHASE 5 — ADVANCED DATA STRUCTURES (5 concepts + quiz)
  // ══════════════════════════════════════════════════════

  {
    id: "disjoint-set",
    title: "Disjoint Set (Union-Find)",
    category: "Advanced Data Structures",
    phase: 5,
    difficulty: "Advanced",
    icon: "🔗",
    iconColor: "cyan",
    summary: "Manage merged sets with near O(1) operations using Path Compression and Union by Rank.",
    readTime: "8 mins",
    details: `
      <h2>Disjoint Set (Union-Find)</h2>
      <p>A Disjoint Set tracks a set of elements partitioned into a number of disjoint (non-overlapping) subsets. It is the absolute best data structure for dynamic connectivity problems, such as finding connected components in a network or detecting cycles in undirected graphs.</p>

      <h3>Two Core Operations</h3>
      <ul>
        <li><strong>Find:</strong> Determine which subset an element belongs to.</li>
        <li><strong>Union:</strong> Join two subsets into a single subset.</li>
      </ul>

      <h3>The Two Optimizations</h3>
      <table class="complexity-table">
        <thead><tr><th>Optimization</th><th>How it works</th><th>Impact</th></tr></thead>
        <tbody>
          <tr><td><strong>Path Compression</strong></td><td>During <code>Find</code>, make every visited node point directly to the root.</td><td>Flattens the tree.</td></tr>
          <tr><td><strong>Union by Rank/Size</strong></td><td>During <code>Union</code>, attach the smaller tree under the root of the larger tree.</td><td>Prevents the tree from becoming a linked list.</td></tr>
        </tbody>
      </table>

      <h3>🎯 Time Complexity</h3>
      <p>With both optimizations, operations take <strong>O(α(N))</strong> time, where α is the Inverse Ackermann function. For all practical values of N in the universe, α(N) ≤ 4, making it <strong>effectively O(1)</strong>.</p>
    `,
    code: {
      javascript: `class UnionFind {
  constructor(size) {
    this.parent = Array.from({ length: size }, (_, i) => i);
    this.rank = new Array(size).fill(1);
  }

  find(x) {
    if (this.parent[x] !== x) {
      // Path compression
      this.parent[x] = this.find(this.parent[x]); 
    }
    return this.parent[x];
  }

  union(x, y) {
    let rootX = this.find(x);
    let rootY = this.find(y);
    if (rootX === rootY) return false; // Already connected

    // Union by rank
    if (this.rank[rootX] > this.rank[rootY]) {
      this.parent[rootY] = rootX;
    } else if (this.rank[rootX] < this.rank[rootY]) {
      this.parent[rootX] = rootY;
    } else {
      this.parent[rootY] = rootX;
      this.rank[rootX]++;
    }
    return true;
  }
}`,
      cpp: `class UnionFind {
    vector<int> parent, rank;
public:
    UnionFind(int n) {
        parent.resize(n);
        rank.resize(n, 1);
        iota(parent.begin(), parent.end(), 0);
    }
    
    int find(int x) {
        if (parent[x] != x) {
            parent[x] = find(parent[x]); // Path compression
        }
        return parent[x];
    }
    
    bool unite(int x, int y) {
        int rootX = find(x);
        int rootY = find(y);
        if (rootX == rootY) return false;
        
        if (rank[rootX] > rank[rootY]) {
            parent[rootY] = rootX;
        } else if (rank[rootX] < rank[rootY]) {
            parent[rootX] = rootY;
        } else {
            parent[rootY] = rootX;
            rank[rootX]++;
        }
        return true;
    }
};`,
      java: `class UnionFind {
    private int[] parent;
    private int[] rank;

    public UnionFind(int size) {
        parent = new int[size];
        rank = new int[size];
        for (int i = 0; i < size; i++) {
            parent[i] = i;
            rank[i] = 1;
        }
    }

    public int find(int x) {
        if (parent[x] != x) {
            parent[x] = find(parent[x]); // Path compression
        }
        return parent[x];
    }

    public boolean union(int x, int y) {
        int rootX = find(x);
        int rootY = find(y);
        if (rootX == rootY) return false;

        if (rank[rootX] > rank[rootY]) {
            parent[rootY] = rootX;
        } else if (rank[rootX] < rank[rootY]) {
            parent[rootX] = rootY;
        } else {
            parent[rootY] = rootX;
            rank[rootX]++;
        }
        return true;
    }
}`,
      python: `class UnionFind:
    def __init__(self, size):
        self.parent = list(range(size))
        self.rank = [1] * size

    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])  # Path compression
        return self.parent[x]

    def union(self, x, y):
        root_x = self.find(x)
        root_y = self.find(y)
        if root_x == root_y:
            return False

        # Union by rank
        if self.rank[root_x] > self.rank[root_y]:
            self.parent[root_y] = root_x
        elif self.rank[root_x] < self.rank[root_y]:
            self.parent[root_x] = root_y
        else:
            self.parent[root_y] = root_x
            self.rank[root_x] += 1
        return True`
    }
  },
  {
    id: "segment-tree",
    title: "Segment Trees",
    category: "Advanced Data Structures",
    phase: 5,
    difficulty: "Advanced",
    icon: "📏",
    iconColor: "emerald",
    summary: "Perform fast O(log N) range queries (sum, min, max) and array updates simultaneously.",
    readTime: "10 mins",
    details: `
      <h2>Segment Trees</h2>
      <p>When you need to answer range queries (like "what is the sum from index L to R?") AND update elements frequently, Prefix Sum arrays fail because updates take O(N). Segment Trees solve this by offering <strong>O(log N) for both updates and queries</strong>.</p>

      <h3>How it Works</h3>
      <p>A Segment Tree is a binary tree where the root represents the entire array range <code>[0, N-1]</code>. Each child represents half of the parent's range. The leaves represent single elements.</p>

      <table class="complexity-table">
        <thead><tr><th>Operation</th><th>Time</th><th>Space</th></tr></thead>
        <tbody>
          <tr><td>Build Tree</td><td><span class="complexity-badge complexity-green">O(N)</span></td><td><span class="complexity-badge complexity-yellow">O(4N)</span></td></tr>
          <tr><td>Point Update</td><td><span class="complexity-badge complexity-green">O(log N)</span></td><td>O(1)</td></tr>
          <tr><td>Range Query</td><td><span class="complexity-badge complexity-green">O(log N)</span></td><td>O(1)</td></tr>
        </tbody>
      </table>

      <h3>🎯 Key Interview Insight</h3>
      <p>Segment Trees are overkill if there are no updates (use Prefix Sums or Sparse Tables). They are ideal for dynamic Range Minimum Queries (RMQ) or Range Sum Queries.</p>
    `,
    code: {
      javascript: `class SegmentTree {
  constructor(arr) {
    this.n = arr.length;
    this.tree = new Array(4 * this.n);
    this.build(arr, 0, 0, this.n - 1);
  }

  build(arr, node, start, end) {
    if (start === end) {
      this.tree[node] = arr[start];
    } else {
      const mid = (start + end) >> 1;
      this.build(arr, 2 * node + 1, start, mid);
      this.build(arr, 2 * node + 2, mid + 1, end);
      this.tree[node] = this.tree[2 * node + 1] + this.tree[2 * node + 2];
    }
  }

  update(index, val, node = 0, start = 0, end = this.n - 1) {
    if (start === end) {
      this.tree[node] = val;
    } else {
      const mid = (start + end) >> 1;
      if (index <= mid) this.update(index, val, 2 * node + 1, start, mid);
      else this.update(index, val, 2 * node + 2, mid + 1, end);
      this.tree[node] = this.tree[2 * node + 1] + this.tree[2 * node + 2];
    }
  }

  query(L, R, node = 0, start = 0, end = this.n - 1) {
    if (R < start || L > end) return 0; // Completely outside
    if (L <= start && end <= R) return this.tree[node]; // Completely inside
    const mid = (start + end) >> 1;
    const leftSum = this.query(L, R, 2 * node + 1, start, mid);
    const rightSum = this.query(L, R, 2 * node + 2, mid + 1, end);
    return leftSum + rightSum;
  }
}`,
      cpp: `class SegmentTree {
    vector<int> tree;
    int n;

    void build(vector<int>& arr, int node, int start, int end) {
        if (start == end) {
            tree[node] = arr[start];
        } else {
            int mid = start + (end - start) / 2;
            build(arr, 2 * node + 1, start, mid);
            build(arr, 2 * node + 2, mid + 1, end);
            tree[node] = tree[2 * node + 1] + tree[2 * node + 2];
        }
    }

public:
    SegmentTree(vector<int>& arr) {
        n = arr.size();
        tree.resize(4 * n);
        build(arr, 0, 0, n - 1);
    }

    void update(int node, int start, int end, int idx, int val) {
        if (start == end) {
            tree[node] = val;
        } else {
            int mid = start + (end - start) / 2;
            if (start <= idx && idx <= mid) {
                update(2 * node + 1, start, mid, idx, val);
            } else {
                update(2 * node + 2, mid + 1, end, idx, val);
            }
            tree[node] = tree[2 * node + 1] + tree[2 * node + 2];
        }
    }

    int query(int node, int start, int end, int l, int r) {
        if (r < start || end < l) return 0;
        if (l <= start && end <= r) return tree[node];
        int mid = start + (end - start) / 2;
        return query(2 * node + 1, start, mid, l, r) + 
               query(2 * node + 2, mid + 1, end, l, r);
    }
};`,
      java: `class SegmentTree {
    private int[] tree;
    private int n;

    public SegmentTree(int[] arr) {
        n = arr.length;
        tree = new int[4 * n];
        build(arr, 0, 0, n - 1);
    }

    private void build(int[] arr, int node, int start, int end) {
        if (start == end) {
            tree[node] = arr[start];
        } else {
            int mid = start + (end - start) / 2;
            build(arr, 2 * node + 1, start, mid);
            build(arr, 2 * node + 2, mid + 1, end);
            tree[node] = tree[2 * node + 1] + tree[2 * node + 2];
        }
    }

    public void update(int index, int val, int node, int start, int end) {
        if (start == end) {
            tree[node] = val;
        } else {
            int mid = start + (end - start) / 2;
            if (index <= mid) update(index, val, 2 * node + 1, start, mid);
            else update(index, val, 2 * node + 2, mid + 1, end);
            tree[node] = tree[2 * node + 1] + tree[2 * node + 2];
        }
    }

    public int query(int L, int R, int node, int start, int end) {
        if (R < start || L > end) return 0;
        if (L <= start && end <= R) return tree[node];
        int mid = start + (end - start) / 2;
        return query(L, R, 2 * node + 1, start, mid) + query(L, R, 2 * node + 2, mid + 1, end);
    }
}`,
      python: `class SegmentTree:
    def __init__(self, arr):
        self.n = len(arr)
        self.tree = [0] * (4 * self.n)
        self.build(arr, 0, 0, self.n - 1)

    def build(self, arr, node, start, end):
        if start == end:
            self.tree[node] = arr[start]
        else:
            mid = (start + end) // 2
            self.build(arr, 2 * node + 1, start, mid)
            self.build(arr, 2 * node + 2, mid + 1, end)
            self.tree[node] = self.tree[2 * node + 1] + self.tree[2 * node + 2]

    def update(self, index, val, node=0, start=0, end=None):
        if end is None: end = self.n - 1
        if start == end:
            self.tree[node] = val
        else:
            mid = (start + end) // 2
            if start <= index <= mid:
                self.update(index, val, 2 * node + 1, start, mid)
            else:
                self.update(index, val, 2 * node + 2, mid + 1, end)
            self.tree[node] = self.tree[2 * node + 1] + self.tree[2 * node + 2]

    def query(self, L, R, node=0, start=0, end=None):
        if end is None: end = self.n - 1
        if R < start or L > end:
            return 0
        if L <= start and end <= R:
            return self.tree[node]
        mid = (start + end) // 2
        return self.query(L, R, 2 * node + 1, start, mid) + \
               self.query(L, R, 2 * node + 2, mid + 1, end)`
    }
  },
  {
    id: "fenwick-tree",
    title: "Fenwick Tree (BIT)",
    category: "Advanced Data Structures",
    phase: 5,
    difficulty: "Advanced",
    icon: "🌲",
    iconColor: "emerald",
    summary: "Binary Indexed Tree for computing prefix sums and updates in an incredibly tight memory footprint.",
    readTime: "7 mins",
    details: `
      <h2>Fenwick Tree (Binary Indexed Tree)</h2>
      <p>A Fenwick Tree solves the exact same problem as a Segment Tree (Range Queries + Updates), but it takes substantially less code and strictly <strong>O(N) memory</strong> instead of O(4N).</p>

      <h3>The Bitwise Magic</h3>
      <p>The core concept is isolating the lowest set bit using Two's Complement: <code>index & (-index)</code>. This tells us the size of the range the current node is responsible for.</p>
      <ul>
        <li><strong>Update:</strong> Add <code>index & (-index)</code> to move <em>up</em> the tree, updating all ranges that contain the index.</li>
        <li><strong>Query:</strong> Subtract <code>index & (-index)</code> to move <em>down</em> the tree, summing up pre-calculated sub-ranges.</li>
      </ul>
      <p>Note: Fenwick Trees are inherently <strong>1-indexed</strong>.</p>
    `,
    code: {
      javascript: `class FenwickTree {
  constructor(size) {
    this.tree = new Array(size + 1).fill(0); // 1-indexed
  }

  // Add 'delta' to element at 'i' (1-indexed)
  update(i, delta) {
    while (i < this.tree.length) {
      this.tree[i] += delta;
      i += i & (-i);
    }
  }

  // Sum from 1 to i
  query(i) {
    let sum = 0;
    while (i > 0) {
      sum += this.tree[i];
      i -= i & (-i);
    }
    return sum;
  }

  rangeSum(left, right) {
    return this.query(right) - this.query(left - 1);
  }
}`,
      cpp: `class FenwickTree {
    vector<int> tree;
public:
    FenwickTree(int size) {
        tree.assign(size + 1, 0); // 1-indexed
    }

    void update(int i, int delta) {
        while (i < tree.size()) {
            tree[i] += delta;
            i += i & (-i);
        }
    }

    int query(int i) {
        int sum = 0;
        while (i > 0) {
            sum += tree[i];
            i -= i & (-i);
        }
        return sum;
    }
};`,
      java: `class FenwickTree {
    private int[] tree;

    public FenwickTree(int size) {
        tree = new int[size + 1]; // 1-indexed
    }

    public void update(int i, int delta) {
        while (i < tree.length) {
            tree[i] += delta;
            i += i & (-i);
        }
    }

    public int query(int i) {
        int sum = 0;
        while (i > 0) {
            sum += tree[i];
            i -= i & (-i);
        }
        return sum;
    }
}`,
      python: `class FenwickTree:
    def __init__(self, size):
        self.tree = [0] * (size + 1) # 1-indexed

    def update(self, i, delta):
        while i < len(self.tree):
            self.tree[i] += delta
            i += i & (-i)

    def query(self, i):
        total = 0
        while i > 0:
            total += self.tree[i]
            i -= i & (-i)
        return total

    def range_sum(self, left, right):
        return self.query(right) - self.query(left - 1)`
    }
  },
  {
    id: "lru-cache",
    title: "LRU Cache Design",
    category: "Advanced Data Structures",
    phase: 5,
    difficulty: "Advanced",
    icon: "💾",
    iconColor: "purple",
    summary: "Combine a Doubly Linked List with a HashMap to achieve O(1) Get and Put operations.",
    readTime: "9 mins",
    details: `
      <h2>LRU Cache (Least Recently Used)</h2>
      <p>An LRU cache evicts the least recently accessed item when it reaches capacity. It is one of the most frequently asked system design and DS questions in elite interviews.</p>

      <h3>The Dual-Structure Architecture</h3>
      <table class="complexity-table">
        <thead><tr><th>Data Structure</th><th>Purpose</th><th>Complexity</th></tr></thead>
        <tbody>
          <tr><td><strong>HashMap</strong></td><td>Map the <code>key</code> to the physical Node address in memory.</td><td>O(1) lookup</td></tr>
          <tr><td><strong>Doubly Linked List</strong></td><td>Maintain the chronological access order (Head = MRU, Tail = LRU).</td><td>O(1) removal/insertion</td></tr>
        </tbody>
      </table>

      <h3>Key Algorithm</h3>
      <ul>
        <li><strong>Get:</strong> If key exists, move the node to the front (Most Recently Used), return value.</li>
        <li><strong>Put:</strong> If key exists, update value and move to front. If new, insert at front. If over capacity, remove node at the tail and delete from map.</li>
      </ul>
    `,
    code: {
      javascript: `class Node {
  constructor(key, val) {
    this.key = key;
    this.val = val;
    this.prev = null;
    this.next = null;
  }
}

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
    this.head = new Node(-1, -1); // Dummy head
    this.tail = new Node(-1, -1); // Dummy tail
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  _removeNode(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
  }

  _addNodeToHead(node) {
    node.next = this.head.next;
    node.prev = this.head;
    this.head.next.prev = node;
    this.head.next = node;
  }

  get(key) {
    if (!this.cache.has(key)) return -1;
    let node = this.cache.get(key);
    this._removeNode(node);
    this._addNodeToHead(node);
    return node.val;
  }

  put(key, value) {
    if (this.cache.has(key)) {
      let node = this.cache.get(key);
      node.val = value;
      this._removeNode(node);
      this._addNodeToHead(node);
    } else {
      if (this.cache.size === this.capacity) {
        let lruNode = this.tail.prev;
        this.cache.delete(lruNode.key);
        this._removeNode(lruNode);
      }
      let newNode = new Node(key, value);
      this.cache.set(key, newNode);
      this._addNodeToHead(newNode);
    }
  }
}`,
      cpp: `struct Node {
    int key, val;
    Node *prev, *next;
    Node(int k, int v) : key(k), val(v), prev(nullptr), next(nullptr) {}
};

class LRUCache {
    int capacity;
    unordered_map<int, Node*> cache;
    Node *head, *tail;

    void removeNode(Node* node) {
        node->prev->next = node->next;
        node->next->prev = node->prev;
    }

    void addToHead(Node* node) {
        node->next = head->next;
        node->prev = head;
        head->next->prev = node;
        head->next = node;
    }

public:
    LRUCache(int cap) {
        capacity = cap;
        head = new Node(-1, -1);
        tail = new Node(-1, -1);
        head->next = tail;
        tail->prev = head;
    }

    int get(int key) {
        if (cache.find(key) == cache.end()) return -1;
        Node* resNode = cache[key];
        removeNode(resNode);
        addToHead(resNode);
        return resNode->val;
    }

    void put(int key, int value) {
        if (cache.find(key) != cache.end()) {
            Node* existingNode = cache[key];
            existingNode->val = value;
            removeNode(existingNode);
            addToHead(existingNode);
        } else {
            if (cache.size() == capacity) {
                Node* lru = tail->prev;
                cache.erase(lru->key);
                removeNode(lru);
                delete lru;
            }
            Node* newNode = new Node(key, value);
            cache[key] = newNode;
            addToHead(newNode);
        }
    }
};`,
      java: `class LRUCache {
    class Node {
        int key, val;
        Node prev, next;
        Node(int key, int val) { this.key = key; this.val = val; }
    }

    private int capacity;
    private Map<Integer, Node> cache;
    private Node head, tail;

    public LRUCache(int capacity) {
        this.capacity = capacity;
        cache = new HashMap<>();
        head = new Node(-1, -1);
        tail = new Node(-1, -1);
        head.next = tail;
        tail.prev = head;
    }

    private void removeNode(Node node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    private void addToHead(Node node) {
        node.next = head.next;
        node.prev = head;
        head.next.prev = node;
        head.next = node;
    }

    public int get(int key) {
        if (!cache.containsKey(key)) return -1;
        Node node = cache.get(key);
        removeNode(node);
        addToHead(node);
        return node.val;
    }

    public void put(int key, int value) {
        if (cache.containsKey(key)) {
            Node node = cache.get(key);
            node.val = value;
            removeNode(node);
            addToHead(node);
        } else {
            if (cache.size() == capacity) {
                Node lru = tail.prev;
                cache.remove(lru.key);
                removeNode(lru);
            }
            Node newNode = new Node(key, value);
            cache.put(key, newNode);
            addToHead(newNode);
        }
    }
}`,
      python: `class Node:
    def __init__(self, key, val):
        self.key = key
        self.val = val
        self.prev = None
        self.next = None

class LRUCache:
    def __init__(self, capacity: int):
        self.cap = capacity
        self.cache = {}
        self.head = Node(-1, -1)
        self.tail = Node(-1, -1)
        self.head.next = self.tail
        self.tail.prev = self.head

    def _remove(self, node):
        node.prev.next = node.next
        node.next.prev = node.prev

    def _add_to_head(self, node):
        node.next = self.head.next
        node.prev = self.head
        self.head.next.prev = node
        self.head.next = node

    def get(self, key: int) -> int:
        if key not in self.cache:
            return -1
        node = self.cache[key]
        self._remove(node)
        self._add_to_head(node)
        return node.val

    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            node = self.cache[key]
            node.val = value
            self._remove(node)
            self._add_to_head(node)
        else:
            if len(self.cache) == self.cap:
                lru = self.tail.prev
                del self.cache[lru.key]
                self._remove(lru)
            new_node = Node(key, value)
            self.cache[key] = new_node
            self._add_to_head(new_node)`
    }
  },
  {
    id: "bitwise-trie",
    title: "Bitwise Tries (Max XOR)",
    category: "Advanced Data Structures",
    phase: 5,
    difficulty: "Advanced",
    icon: "🔠",
    iconColor: "purple",
    summary: "Using Tries to store binary representations of numbers to solve Maximum XOR array problems.",
    readTime: "7 mins",
    details: `
      <h2>Bitwise Tries</h2>
      <p>Standard Tries store characters (a-z). A Bitwise Trie stores the bits (0 and 1) of integers from Most Significant Bit (MSB) to Least Significant Bit (LSB). It is specifically used to solve variations of the <strong>"Maximum XOR of Two Numbers in an Array"</strong> problem.</p>

      <h3>The XOR Logic</h3>
      <p>XOR evaluates to 1 if the bits are different. To maximize XOR, we traverse the Trie and greedily try to pick the <strong>opposite bit</strong> of our current number's bit.</p>

      <table class="complexity-table">
        <thead><tr><th>Operation</th><th>Time Complexity</th></tr></thead>
        <tbody>
          <tr><td>Insert Number</td><td><span class="complexity-badge complexity-green">O(32)</span> = O(1)</td></tr>
          <tr><td>Find Max XOR</td><td><span class="complexity-badge complexity-green">O(32)</span> = O(1)</td></tr>
        </tbody>
      </table>
    `,
    code: {
      javascript: `class TrieNode {
  constructor() {
    this.children = [null, null];
  }
}

class BitwiseTrie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(num) {
    let node = this.root;
    for (let i = 31; i >= 0; i--) {
      let bit = (num >> i) & 1;
      if (!node.children[bit]) {
        node.children[bit] = new TrieNode();
      }
      node = node.children[bit];
    }
  }

  getMaxXor(num) {
    let node = this.root;
    let maxXor = 0;
    for (let i = 31; i >= 0; i--) {
      let bit = (num >> i) & 1;
      let opposite = 1 - bit;
      if (node.children[opposite]) {
        maxXor = maxXor | (1 << i);
        node = node.children[opposite];
      } else {
        node = node.children[bit];
      }
    }
    return maxXor;
  }
}`,
      cpp: `struct TrieNode {
    TrieNode* child[2] = {nullptr, nullptr};
};

class BitwiseTrie {
    TrieNode* root;
public:
    BitwiseTrie() { root = new TrieNode(); }
    
    void insert(int num) {
        TrieNode* node = root;
        for (int i = 31; i >= 0; i--) {
            int bit = (num >> i) & 1;
            if (!node->child[bit]) node->child[bit] = new TrieNode();
            node = node->child[bit];
        }
    }
    
    int getMaxXor(int num) {
        TrieNode* node = root;
        int maxXor = 0;
        for (int i = 31; i >= 0; i--) {
            int bit = (num >> i) & 1;
            if (node->child[1 - bit]) {
                maxXor |= (1 << i);
                node = node->child[1 - bit];
            } else {
                node = node->child[bit];
            }
        }
        return maxXor;
    }
};`,
      java: `class TrieNode {
    TrieNode[] children = new TrieNode[2];
}

class BitwiseTrie {
    private TrieNode root = new TrieNode();
    
    public void insert(int num) {
        TrieNode node = root;
        for (int i = 31; i >= 0; i--) {
            int bit = (num >> i) & 1;
            if (node.children[bit] == null) {
                node.children[bit] = new TrieNode();
            }
            node = node.children[bit];
        }
    }
    
    public int getMaxXor(int num) {
        TrieNode node = root;
        int maxXor = 0;
        for (int i = 31; i >= 0; i--) {
            int bit = (num >> i) & 1;
            int opposite = 1 - bit;
            if (node.children[opposite] != null) {
                maxXor |= (1 << i);
                node = node.children[opposite];
            } else {
                node = node.children[bit];
            }
        }
        return maxXor;
    }
}`,
      python: `class TrieNode:
    def __init__(self):
        self.children = {}

class BitwiseTrie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, num):
        node = self.root
        for i in range(31, -1, -1):
            bit = (num >> i) & 1
            if bit not in node.children:
                node.children[bit] = TrieNode()
            node = node.children[bit]

    def get_max_xor(self, num):
        node = self.root
        max_xor = 0
        for i in range(31, -1, -1):
            bit = (num >> i) & 1
            opposite = 1 - bit
            if opposite in node.children:
                max_xor |= (1 << i)
                node = node.children[opposite]
            else:
                node = node.children[bit]
        return max_xor`
    }
  },

  // ── PHASE 5 QUIZ ──
  {
    id: "quiz-phase5",
    type: "quiz",
    phase: 5,
    title: "Phase 5 Quiz — Advanced Data Structures",
    category: "Assessment",
    icon: "🧪",
    iconColor: "purple",
    questions: [
      {
        question: "Which two optimizations make Disjoint Sets (Union-Find) operate in nearly O(1) time?",
        options: [
          "Memoization and Tabulation",
          "Path Compression and Union by Rank",
          "Binary Jumping and Range Minimums",
          "Hashing and Probing"
        ],
        answer: 1,
        explanation: "Path Compression flattens the tree during the 'find' operation, and Union by Rank ensures smaller trees are appended to the roots of larger trees, keeping height minimal."
      },
      {
        question: "What is the key advantage of a Fenwick Tree (BIT) over a Segment Tree?",
        options: [
          "It can handle updates to strings.",
          "It uses O(N) memory instead of O(4N) and is much simpler to code.",
          "It supports O(1) range queries.",
          "It works natively with floating-point indices."
        ],
        answer: 1,
        explanation: "While both trees offer O(log N) updates and queries, Fenwick Trees are constructed directly inside an array of size N+1, making them highly memory-efficient and easy to implement."
      },
      {
        question: "In an LRU Cache, why is a Doubly Linked List paired with a Hash Map?",
        options: [
          "To allow sorting of keys alphabetically.",
          "Because Hash Maps alone cannot store custom objects.",
          "To achieve O(1) lookup (Hash Map) and O(1) removal/movement of the oldest or newest accessed element (DLL).",
          "To prevent Hash Map collisions."
        ],
        answer: 2,
        explanation: "A Hash Map provides instant access to the Node, while a DLL allows us to sever and reconnect pointers instantly in O(1) time to move that node to the 'Most Recently Used' position."
      },
      {
        question: "In a Bitwise Trie, what is the maximum depth of the tree for 32-bit integers?",
        options: ["N (number of elements)", "32", "log N", "256"],
        answer: 1,
        explanation: "A Bitwise Trie evaluates elements bit-by-bit from MSB to LSB. Since a 32-bit integer has exactly 32 bits, the trie will never exceed a depth of 32."
      },
      {
        question: "What does the operation `x & (-x)` yield in Binary Indexed Trees?",
        options: [
          "The largest power of 2 less than x.",
          "The inverted binary string.",
          "The lowest set bit (rightmost 1-bit) of x.",
          "Zero."
        ],
        answer: 2,
        explanation: "Due to Two's Complement arithmetic, `-x` flips all bits of `x` and adds 1. When bitwise AND-ed with `x`, it perfectly isolates the lowest set bit. This calculates the range segment size in a BIT."
      }
    ]
  },

  // ══════════════════════════════════════════════════════
  //  PHASE 6 — ADVANCED GRAPH ALGORITHMS (5 concepts + quiz)
  // ══════════════════════════════════════════════════════

  {
    id: "dijkstra-algo",
    title: "Dijkstra's Algorithm",
    category: "Advanced Graphs",
    phase: 6,
    difficulty: "Advanced",
    icon: "🗺️",
    iconColor: "cyan",
    summary: "Find the shortest path from a single source node to all other nodes in a graph with non-negative weights.",
    readTime: "8 mins",
    details: `
      <h2>Dijkstra's Algorithm</h2>
      <p>Dijkstra's is a greedy algorithm that uses a Min-Heap (Priority Queue) to consistently explore the closest unvisited node. It works strictly on graphs with <strong>non-negative edge weights</strong>.</p>

      <h3>How it Works</h3>
      <ol>
        <li>Initialize a <code>dist</code> array with infinity, set <code>dist[source] = 0</code>.</li>
        <li>Push <code>(0, source)</code> into a Min-Heap.</li>
        <li>Extract the node with the minimum distance.</li>
        <li>For each neighbor, if <code>curr_dist + edge_weight < dist[neighbor]</code>, update the distance and push it to the heap.</li>
      </ol>

      <table class="complexity-table">
        <thead><tr><th>Time Complexity</th><th>Space Complexity</th></tr></thead>
        <tbody>
          <tr><td><span class="complexity-badge complexity-green">O((V + E) log V)</span></td><td><span class="complexity-badge complexity-yellow">O(V)</span></td></tr>
        </tbody>
      </table>
    `,
    code: {
      javascript: `function dijkstra(graph, V, src) {
  const dist = new Array(V).fill(Infinity);
  dist[src] = 0;
  
  // Using array as a naive priority queue for illustration
  // In production, use a proper MinHeap class
  const pq = [[0, src]]; // [distance, node]

  while (pq.length > 0) {
    pq.sort((a, b) => a[0] - b[0]); // Extract Min
    const [d, u] = pq.shift();

    if (d > dist[u]) continue; // Optimization

    for (const [v, weight] of (graph[u] || [])) {
      if (dist[u] + weight < dist[v]) {
        dist[v] = dist[u] + weight;
        pq.push([dist[v], v]);
      }
    }
  }
  return dist;
}`,
      cpp: `vector<int> dijkstra(int V, vector<vector<pair<int, int>>>& adj, int src) {
    vector<int> dist(V, INT_MAX);
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
    
    dist[src] = 0;
    pq.push({0, src});
    
    while(!pq.empty()) {
        int d = pq.top().first;
        int u = pq.top().second;
        pq.pop();
        
        if (d > dist[u]) continue;
        
        for(auto& edge : adj[u]) {
            int v = edge.first;
            int weight = edge.second;
            
            if (dist[u] + weight < dist[v]) {
                dist[v] = dist[u] + weight;
                pq.push({dist[v], v});
            }
        }
    }
    return dist;
}`,
      java: `public int[] dijkstra(int V, List<List<int[]>> adj, int src) {
    int[] dist = new int[V];
    Arrays.fill(dist, Integer.MAX_VALUE);
    PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[0] - b[0]);
    
    dist[src] = 0;
    pq.offer(new int[]{0, src});
    
    while (!pq.isEmpty()) {
        int[] curr = pq.poll();
        int d = curr[0];
        int u = curr[1];
        
        if (d > dist[u]) continue;
        
        for (int[] edge : adj.get(u)) {
            int v = edge[0];
            int weight = edge[1];
            if (dist[u] + weight < dist[v]) {
                dist[v] = dist[u] + weight;
                pq.offer(new int[]{dist[v], v});
            }
        }
    }
    return dist;
}`,
      python: `import heapq

def dijkstra(V, adj, src):
    dist = [float('inf')] * V
    dist[src] = 0
    pq = [(0, src)]
    
    while pq:
        d, u = heapq.heappop(pq)
        
        if d > dist[u]:
            continue
            
        for v, weight in adj[u]:
            if dist[u] + weight < dist[v]:
                dist[v] = dist[u] + weight
                heapq.heappush(pq, (dist[v], v))
                
    return dist`
    }
  },
  {
    id: "bellman-ford",
    title: "Bellman-Ford Algorithm",
    category: "Advanced Graphs",
    phase: 6,
    difficulty: "Advanced",
    icon: "📉",
    iconColor: "rose",
    summary: "Find shortest paths with negative weights and detect negative weight cycles.",
    readTime: "7 mins",
    details: `
      <h2>Bellman-Ford Algorithm</h2>
      <p>While Dijkstra's is fast, it breaks on graphs containing negative edge weights. Bellman-Ford resolves this via Dynamic Programming. It relaxes all edges <code>V - 1</code> times.</p>

      <h3>Detecting Negative Cycles</h3>
      <p>If there is a negative weight cycle, you could infinitely reduce the distance. To detect this, Bellman-Ford relaxes all edges one final time (the V-th time). If any distance updates during this pass, a negative cycle exists!</p>

      <table class="complexity-table">
        <thead><tr><th>Time Complexity</th><th>Space Complexity</th></tr></thead>
        <tbody>
          <tr><td><span class="complexity-badge complexity-red">O(V × E)</span></td><td><span class="complexity-badge complexity-yellow">O(V)</span></td></tr>
        </tbody>
      </table>
    `,
    code: {
      javascript: `// edges = [[u, v, weight], ...]
function bellmanFord(V, edges, src) {
  const dist = new Array(V).fill(1e8);
  dist[src] = 0;

  // Relax all edges V-1 times
  for (let i = 0; i < V - 1; i++) {
    for (const [u, v, w] of edges) {
      if (dist[u] !== 1e8 && dist[u] + w < dist[v]) {
        dist[v] = dist[u] + w;
      }
    }
  }

  // Final check for negative cycles
  for (const [u, v, w] of edges) {
    if (dist[u] !== 1e8 && dist[u] + w < dist[v]) {
      return [-1]; // Negative cycle detected
    }
  }
  return dist;
}`,
      cpp: `vector<int> bellmanFord(int V, vector<vector<int>>& edges, int src) {
    vector<int> dist(V, 1e8);
    dist[src] = 0;
    
    for (int i = 0; i < V - 1; i++) {
        for (auto& edge : edges) {
            int u = edge[0];
            int v = edge[1];
            int w = edge[2];
            if (dist[u] != 1e8 && dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
            }
        }
    }
    
    for (auto& edge : edges) {
        int u = edge[0], v = edge[1], w = edge[2];
        if (dist[u] != 1e8 && dist[u] + w < dist[v]) {
            return {-1}; // Cycle detected
        }
    }
    return dist;
}`,
      java: `public int[] bellmanFord(int V, int[][] edges, int src) {
    int[] dist = new int[V];
    Arrays.fill(dist, (int)1e8);
    dist[src] = 0;
    
    for (int i = 0; i < V - 1; i++) {
        for (int[] edge : edges) {
            int u = edge[0], v = edge[1], w = edge[2];
            if (dist[u] != 1e8 && dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
            }
        }
    }
    
    for (int[] edge : edges) {
        int u = edge[0], v = edge[1], w = edge[2];
        if (dist[u] != 1e8 && dist[u] + w < dist[v]) {
            return new int[]{-1};
        }
    }
    return dist;
}`,
      python: `def bellman_ford(V, edges, src):
    dist = [int(1e8)] * V
    dist[src] = 0
    
    for _ in range(V - 1):
        for u, v, w in edges:
            if dist[u] != int(1e8) and dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                
    # Detect negative cycle
    for u, v, w in edges:
        if dist[u] != int(1e8) and dist[u] + w < dist[v]:
            return [-1]
            
    return dist`
    }
  },
  {
    id: "floyd-warshall",
    title: "Floyd-Warshall Algorithm",
    category: "Advanced Graphs",
    phase: 6,
    difficulty: "Advanced",
    icon: "🗺️",
    iconColor: "rose",
    summary: "Find the shortest paths between ALL pairs of vertices using a matrix DP approach.",
    readTime: "6 mins",
    details: `
      <h2>Floyd-Warshall Algorithm</h2>
      <p>Instead of single-source, Floyd-Warshall finds the shortest path between <strong>every possible pair of nodes</strong>. It operates using an adjacency matrix and relies heavily on Dynamic Programming.</p>

      <h3>Core Idea</h3>
      <p>Can we shorten the path from <code>i</code> to <code>j</code> by routing it through an intermediate node <code>k</code>? We test this for every combination of i, j, and k.</p>

      <table class="complexity-table">
        <thead><tr><th>Time Complexity</th><th>Space Complexity</th></tr></thead>
        <tbody>
          <tr><td><span class="complexity-badge complexity-red">O(V³)</span></td><td><span class="complexity-badge complexity-red">O(V²)</span></td></tr>
        </tbody>
      </table>
    `,
    code: {
      javascript: `function floydWarshall(matrix, V) {
  // matrix[i][j] contains initial weights, Infinity for no edge
  for (let k = 0; k < V; k++) {
    for (let i = 0; i < V; i++) {
      for (let j = 0; j < V; j++) {
        if (matrix[i][k] !== Infinity && matrix[k][j] !== Infinity) {
          matrix[i][j] = Math.min(matrix[i][j], matrix[i][k] + matrix[k][j]);
        }
      }
    }
  }
}`,
      cpp: `void floydWarshall(vector<vector<int>>& matrix) {
    int n = matrix.size();
    for (int k = 0; k < n; k++) {
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (matrix[i][k] != 1e9 && matrix[k][j] != 1e9) {
                    matrix[i][j] = min(matrix[i][j], matrix[i][k] + matrix[k][j]);
                }
            }
        }
    }
}`,
      java: `public void floydWarshall(int[][] matrix) {
    int n = matrix.length;
    for (int k = 0; k < n; k++) {
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (matrix[i][k] != (int)1e9 && matrix[k][j] != (int)1e9) {
                    matrix[i][j] = Math.min(matrix[i][j], matrix[i][k] + matrix[k][j]);
                }
            }
        }
    }
}`,
      python: `def floyd_warshall(matrix):
    n = len(matrix)
    for k in range(n):
        for i in range(n):
            for j in range(n):
                if matrix[i][k] != float('inf') and matrix[k][j] != float('inf'):
                    matrix[i][j] = min(matrix[i][j], matrix[i][k] + matrix[k][j])`
    }
  },
  {
    id: "kruskal-mst",
    title: "Kruskal's Algorithm (MST)",
    category: "Advanced Graphs",
    phase: 6,
    difficulty: "Advanced",
    icon: "🌲",
    iconColor: "emerald",
    summary: "Generate a Minimum Spanning Tree by sorting edges and leveraging the Disjoint Set (Union-Find).",
    readTime: "7 mins",
    details: `
      <h2>Kruskal's Algorithm</h2>
      <p>A Minimum Spanning Tree (MST) connects all nodes in an undirected, weighted graph with the minimum total edge weight, without forming any cycles.</p>

      <h3>The Greedy Approach</h3>
      <ol>
        <li>Sort all edges by weight in ascending order.</li>
        <li>Iterate through the edges. Check if adding the edge forms a cycle using a <strong>Disjoint Set (Union-Find)</strong>.</li>
        <li>If no cycle is formed (they belong to different subsets), include the edge in the MST and <code>Union</code> them.</li>
      </ol>
      <p>Time Complexity is dominated by the sorting step: <strong>O(E log E)</strong>.</p>
    `,
    code: {
      javascript: `// Relies on the UnionFind class from Phase 5
function kruskalMST(V, edges) {
  // Sort edges by weight
  edges.sort((a, b) => a[2] - b[2]); 
  const uf = new UnionFind(V);
  let mstWeight = 0;

  for (const [u, v, weight] of edges) {
    if (uf.union(u, v)) {
      mstWeight += weight;
    }
  }
  return mstWeight;
}`,
      cpp: `// Assumes DisjointSet class exists
int kruskalMST(int V, vector<vector<int>>& edges) {
    sort(edges.begin(), edges.end(), [](const vector<int>& a, const vector<int>& b) {
        return a[2] < b[2];
    });
    
    DisjointSet ds(V);
    int mstWeight = 0;
    
    for (auto& edge : edges) {
        if (ds.unite(edge[0], edge[1])) {
            mstWeight += edge[2];
        }
    }
    return mstWeight;
}`,
      java: `// Assumes UnionFind class exists
public int kruskalMST(int V, int[][] edges) {
    Arrays.sort(edges, (a, b) -> a[2] - b[2]);
    UnionFind uf = new UnionFind(V);
    int mstWeight = 0;
    
    for (int[] edge : edges) {
        if (uf.union(edge[0], edge[1])) {
            mstWeight += edge[2];
        }
    }
    return mstWeight;
}`,
      python: `# Assumes UnionFind class exists
def kruskal_mst(V, edges):
    edges.sort(key=lambda x: x[2])
    uf = UnionFind(V)
    mst_weight = 0
    
    for u, v, weight in edges:
        if uf.union(u, v):
            mst_weight += weight
            
    return mst_weight`
    }
  },
  {
    id: "prim-mst",
    title: "Prim's Algorithm (MST)",
    category: "Advanced Graphs",
    phase: 6,
    difficulty: "Advanced",
    icon: "🌲",
    iconColor: "emerald",
    summary: "Generate a Minimum Spanning Tree using a Node-based Greedy approach with a Min-Heap.",
    readTime: "7 mins",
    details: `
      <h2>Prim's Algorithm</h2>
      <p>While Kruskal's sorts edges, Prim's builds the MST node-by-node starting from a single arbitrary root, much like Dijkstra's.</p>

      <h3>How it Works</h3>
      <ol>
        <li>Keep a <code>visited</code> array and a Min-Heap that stores <code>(weight, node)</code>.</li>
        <li>Start at node 0. Push <code>(0, 0)</code> into the heap.</li>
        <li>Pop the minimum weight node. If it's visited, ignore it.</li>
        <li>Mark as visited, add the weight to the MST total, and push all its unvisited neighbors to the heap.</li>
      </ol>
      <p>Time Complexity: <strong>O(E log V)</strong>.</p>
    `,
    code: {
      javascript: `function primMST(V, adj) {
  const pq = [[0, 0]]; // [weight, node]
  const visited = new Array(V).fill(false);
  let sum = 0;

  while (pq.length > 0) {
    pq.sort((a, b) => a[0] - b[0]);
    const [wt, node] = pq.shift();

    if (visited[node]) continue;
    visited[node] = true;
    sum += wt;

    for (const [adjNode, edgeWt] of (adj[node] || [])) {
      if (!visited[adjNode]) {
        pq.push([edgeWt, adjNode]);
      }
    }
  }
  return sum;
}`,
      cpp: `int primMST(int V, vector<vector<pair<int, int>>>& adj) {
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
    vector<bool> visited(V, false);
    int sum = 0;
    
    pq.push({0, 0});
    
    while (!pq.empty()) {
        int wt = pq.top().first;
        int node = pq.top().second;
        pq.pop();
        
        if (visited[node]) continue;
        visited[node] = true;
        sum += wt;
        
        for (auto& neighbor : adj[node]) {
            int adjNode = neighbor.first;
            int edgeWt = neighbor.second;
            if (!visited[adjNode]) {
                pq.push({edgeWt, adjNode});
            }
        }
    }
    return sum;
}`,
      java: `public int primMST(int V, List<List<int[]>> adj) {
    PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[0] - b[0]);
    boolean[] visited = new boolean[V];
    int sum = 0;
    
    pq.offer(new int[]{0, 0}); // weight, node
    
    while (!pq.isEmpty()) {
        int[] curr = pq.poll();
        int wt = curr[0];
        int node = curr[1];
        
        if (visited[node]) continue;
        visited[node] = true;
        sum += wt;
        
        for (int[] neighbor : adj.get(node)) {
            int adjNode = neighbor[0];
            int edgeWt = neighbor[1];
            if (!visited[adjNode]) {
                pq.offer(new int[]{edgeWt, adjNode});
            }
        }
    }
    return sum;
}`,
      python: `import heapq

def prim_mst(V, adj):
    pq = [(0, 0)] # weight, node
    visited = [False] * V
    mst_sum = 0
    
    while pq:
        wt, node = heapq.heappop(pq)
        
        if visited[node]: continue
        visited[node] = True
        mst_sum += wt
        
        for adjNode, edgeWt in adj[node]:
            if not visited[adjNode]:
                heapq.heappush(pq, (edgeWt, adjNode))
                
    return mst_sum`
    }
  },

  // ── PHASE 6 QUIZ ──
  {
    id: "quiz-phase6",
    type: "quiz",
    phase: 6,
    title: "Phase 6 Quiz — Advanced Graphs & MST",
    category: "Assessment",
    icon: "🧪",
    iconColor: "rose",
    questions: [
      {
        question: "Why does Dijkstra's Algorithm fail on graphs with negative edge weights?",
        options: [
          "Min-Heaps cannot store negative numbers.",
          "It marks nodes as permanently visited the first time they are popped, ignoring paths that might become shorter later via negative edges.",
          "It causes an infinite loop automatically.",
          "It does not fail, it just takes longer."
        ],
        answer: 1,
        explanation: "Dijkstra is greedy. Once it extracts a node, it assumes it has definitively found the shortest path to that node. Negative edges destroy this assumption."
      },
      {
        question: "What is the primary visual difference between Prim's and Kruskal's algorithms during execution?",
        options: [
          "Prim's builds multiple separate trees that merge; Kruskal's grows a single tree outward from the root.",
          "Kruskal's builds multiple separate trees (a forest) that eventually merge; Prim's grows a single connected tree outward from a root.",
          "Prim's relies on a Disjoint Set; Kruskal's relies on a Min-Heap.",
          "There is no visual difference."
        ],
        answer: 1,
        explanation: "Kruskal's iterates over sorted edges globally, connecting disconnected components. Prim's expands like a puddle of water from one central node, always adding to a single contiguous tree."
      },
      {
        question: "Bellman-Ford detects negative weight cycles by doing what?",
        options: [
          "Using a DFS back-edge check.",
          "Counting the number of total edges.",
          "Running the V-1 edge relaxation loop one extra time (the V-th time) to see if distances still update.",
          "Using a Disjoint Set."
        ],
        answer: 2,
        explanation: "In a graph of V nodes, a simple shortest path has at most V-1 edges. If we can still find a shorter path on the V-th iteration, it mathematically proves a negative cycle exists."
      },
      {
        question: "Floyd-Warshall is best used for which scenario?",
        options: [
          "Finding the single shortest path on a massive, sparse graph.",
          "Finding the Minimum Spanning Tree of a network.",
          "Finding the shortest path between all pairs of nodes in a dense matrix.",
          "Topological sorting."
        ],
        answer: 2,
        explanation: "Floyd-Warshall solves the All-Pairs Shortest Path problem. It computes O(V³) operations, making it suitable for dense graphs modeled with an Adjacency Matrix."
      },
      {
        question: "In Kruskal's Algorithm, what data structure guarantees we don't accidentally create a cycle?",
        options: [
          "Stack",
          "Adjacency Matrix",
          "Disjoint Set (Union-Find)",
          "Binary Indexed Tree"
        ],
        answer: 2,
        explanation: "Before adding an edge (u, v) to the MST, we check if `find(u) == find(v)`. If they belong to the same subset, connecting them would create a cycle. Disjoint Sets do this in near O(1) time."
      }
    ]
  }
];

// Combine new phases into your master index for UI Sidebars
export const extendedRoadmapPhases = [
  { label: "Phase 5: Advanced Data Structures", phaseId: 5 },
  { label: "Phase 6: Advanced Graph Algorithms", phaseId: 6 }
];