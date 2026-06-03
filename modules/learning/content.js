// dsa.flow — Full Roadmap Curriculum & Quiz Database
// Covers: Big O, Arrays, Strings, Stacks, Queues, Linked Lists, Hash Tables,
//         Trees, Heaps, Tries, Graphs, Searching, Sorting, Recursion,
//         Backtracking, Dynamic Programming, Greedy, Divide & Conquer

export const curriculum = [
  /* ─── PHASE 1: FOUNDATIONS ─── */
  {
    id: "big-o",
    title: "Big O Notation",
    category: "Foundations",
    difficulty: "Beginner",
    icon: "📐",
    iconColor: "cyan",
    summary: "Analyze and compare algorithm efficiency. Understand time & space complexity fundamentals.",
    readTime: "5 mins",
    details: `
      <h2>Big O Notation</h2>
      <p>Big O notation describes the <strong>worst-case performance</strong> of an algorithm as input size N grows toward infinity. It lets us objectively compare different solutions without worrying about hardware specifics.</p>
      
      <h3>Key Rules</h3>
      <ul>
        <li><strong>Drop constants:</strong> O(2N) → O(N)</li>
        <li><strong>Drop lower-order terms:</strong> O(N² + N) → O(N²)</li>
        <li><strong>Worst-case matters most</strong> in interviews</li>
      </ul>

      <h3>Complexity Chart</h3>
      <table class="complexity-table">
        <thead><tr><th>Notation</th><th>Name</th><th>Rating</th><th>Example</th></tr></thead>
        <tbody>
          <tr><td><span class="complexity-badge complexity-green">O(1)</span></td><td>Constant</td><td>⭐⭐⭐⭐⭐</td><td>Array index access</td></tr>
          <tr><td><span class="complexity-badge complexity-green">O(log N)</span></td><td>Logarithmic</td><td>⭐⭐⭐⭐</td><td>Binary Search</td></tr>
          <tr><td><span class="complexity-badge complexity-green">O(N)</span></td><td>Linear</td><td>⭐⭐⭐</td><td>Linear scan</td></tr>
          <tr><td><span class="complexity-badge complexity-yellow">O(N log N)</span></td><td>Linearithmic</td><td>⭐⭐</td><td>Merge Sort</td></tr>
          <tr><td><span class="complexity-badge complexity-red">O(N²)</span></td><td>Quadratic</td><td>⭐</td><td>Bubble Sort</td></tr>
          <tr><td><span class="complexity-badge complexity-red">O(2ᴺ)</span></td><td>Exponential</td><td>💀</td><td>All subsets</td></tr>
          <tr><td><span class="complexity-badge complexity-red">O(N!)</span></td><td>Factorial</td><td>💀</td><td>All permutations</td></tr>
        </tbody>
      </table>
    `,
    code: {
      javascript: `// O(1) - Constant
const first = (arr) => arr[0];

// O(N) - Linear
const findMax = (arr) => {
  let max = arr[0];
  for (const n of arr) if (n > max) max = n;
  return max;
};

// O(N²) - Quadratic
const bubbleSort = (arr) => {
  for (let i = 0; i < arr.length; i++)
    for (let j = 0; j < arr.length - i - 1; j++)
      if (arr[j] > arr[j+1]) [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
  return arr;
};`,
      cpp: `// O(1) - Constant
int first(const vector<int>& arr) { return arr[0]; }

// O(N) - Linear
int findMax(const vector<int>& arr) {
    int maxVal = arr[0];
    for (int n : arr) if (n > maxVal) maxVal = n;
    return maxVal;
}

// O(N²) - Quadratic
void bubbleSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n-i-1; j++)
            if (arr[j] > arr[j+1]) swap(arr[j], arr[j+1]);
}`,
      java: `// O(1) - Constant
public int first(int[] arr) { return arr[0]; }

// O(N) - Linear
public int findMax(int[] arr) {
    int max = arr[0];
    for (int n : arr) if (n > max) max = n;
    return max;
}

// O(N²) - Quadratic
public void bubbleSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n-i-1; j++)
            if (arr[j] > arr[j+1]) {
                int t = arr[j]; arr[j] = arr[j+1]; arr[j+1] = t;
            }
}`,
      python: `# O(1) - Constant
def first(arr): return arr[0]

# O(N) - Linear
def find_max(arr):
    max_val = arr[0]
    for n in arr:
        if n > max_val: max_val = n
    return max_val

# O(N²) - Quadratic
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
    return arr`
    }
  },
  {
    id: "arrays",
    title: "Arrays",
    category: "Linear Structures",
    difficulty: "Beginner",
    icon: "📦",
    iconColor: "purple",
    summary: "Contiguous memory structures. Covers 1D, 2D arrays, Two-Pointer & Sliding Window interview patterns.",
    readTime: "7 mins",
    details: `
      <h2>Arrays</h2>
      <p>Arrays store elements in <strong>contiguous memory</strong>, enabling O(1) random access by index. They are the foundation for most other data structures and the most common data structure in interviews.</p>

      <h3>Time Complexities</h3>
      <table class="complexity-table">
        <thead><tr><th>Operation</th><th>Best</th><th>Worst</th></tr></thead>
        <tbody>
          <tr><td>Access by index</td><td><span class="complexity-badge complexity-green">O(1)</span></td><td><span class="complexity-badge complexity-green">O(1)</span></td></tr>
          <tr><td>Search (unsorted)</td><td><span class="complexity-badge complexity-green">O(1)</span></td><td><span class="complexity-badge complexity-yellow">O(N)</span></td></tr>
          <tr><td>Insert at end</td><td><span class="complexity-badge complexity-green">O(1)</span></td><td><span class="complexity-badge complexity-green">O(1)</span></td></tr>
          <tr><td>Insert at index</td><td><span class="complexity-badge complexity-yellow">O(N)</span></td><td><span class="complexity-badge complexity-yellow">O(N)</span></td></tr>
          <tr><td>Delete at index</td><td><span class="complexity-badge complexity-yellow">O(N)</span></td><td><span class="complexity-badge complexity-yellow">O(N)</span></td></tr>
        </tbody>
      </table>

      <h3>🎯 Interview Patterns</h3>
      <ul>
        <li><strong>Two Pointers:</strong> left=0, right=end — move inward. Reduces O(N²) to O(N).</li>
        <li><strong>Sliding Window:</strong> Move a fixed-size window across the array. Great for subarrays.</li>
        <li><strong>Prefix Sums:</strong> Precompute running sums for O(1) range-sum queries.</li>
        <li><strong>Kadane's Algorithm:</strong> O(N) maximum subarray sum.</li>
      </ul>
    `,
    code: {
      javascript: `// Two Sum (Hash Map approach) - O(N)
function twoSum(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) return [map.get(complement), i];
        map.set(nums[i], i);
    }
    return [];
}

// Sliding Window - Maximum sum subarray of size k
function maxSumSubarray(arr, k) {
    let windowSum = arr.slice(0, k).reduce((a, b) => a + b, 0);
    let maxSum = windowSum;
    for (let i = k; i < arr.length; i++) {
        windowSum += arr[i] - arr[i - k];
        maxSum = Math.max(maxSum, windowSum);
    }
    return maxSum;
}`,
      cpp: `#include <unordered_map>
#include <vector>
using namespace std;

// Two Sum - O(N)
vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int,int> mp;
    for (int i = 0; i < nums.size(); i++) {
        int comp = target - nums[i];
        if (mp.count(comp)) return {mp[comp], i};
        mp[nums[i]] = i;
    }
    return {};
}

// Sliding Window - Max sum subarray of size k
int maxSumSubarray(const vector<int>& arr, int k) {
    int wSum = 0, maxSum;
    for (int i = 0; i < k; i++) wSum += arr[i];
    maxSum = wSum;
    for (int i = k; i < arr.size(); i++) {
        wSum += arr[i] - arr[i-k];
        maxSum = max(maxSum, wSum);
    }
    return maxSum;
}`,
      java: `import java.util.*;

// Two Sum - O(N)
public int[] twoSum(int[] nums, int target) {
    Map<Integer,Integer> map = new HashMap<>();
    for (int i = 0; i < nums.length; i++) {
        int comp = target - nums[i];
        if (map.containsKey(comp)) return new int[]{map.get(comp), i};
        map.put(nums[i], i);
    }
    return new int[]{};
}

// Sliding Window - Max sum subarray of size k
public int maxSumSubarray(int[] arr, int k) {
    int wSum = 0, maxSum;
    for (int i = 0; i < k; i++) wSum += arr[i];
    maxSum = wSum;
    for (int i = k; i < arr.length; i++) {
        wSum += arr[i] - arr[i-k];
        maxSum = Math.max(maxSum, wSum);
    }
    return maxSum;
}`,
      python: `# Two Sum - O(N)
def two_sum(nums, target):
    seen = {}
    for i, n in enumerate(nums):
        comp = target - n
        if comp in seen:
            return [seen[comp], i]
        seen[n] = i
    return []

# Sliding Window - Max sum subarray of size k
def max_sum_subarray(arr, k):
    window_sum = sum(arr[:k])
    max_sum = window_sum
    for i in range(k, len(arr)):
        window_sum += arr[i] - arr[i-k]
        max_sum = max(max_sum, window_sum)
    return max_sum`
    }
  },
  {
    id: "strings",
    title: "Strings",
    category: "Linear Structures",
    difficulty: "Beginner",
    icon: "🔤",
    iconColor: "cyan",
    summary: "String manipulation, palindromes, anagrams, and common pattern techniques.",
    readTime: "6 mins",
    details: `
      <h2>Strings</h2>
      <p>Strings are sequences of characters. Most languages treat them as immutable arrays of chars. Key interview patterns include frequency maps, two pointers, and KMP string matching.</p>

      <h3>🎯 Interview Patterns</h3>
      <ul>
        <li><strong>Frequency Map / Character Count:</strong> Use a hash map of char → count for anagram problems.</li>
        <li><strong>Two Pointers:</strong> Palindrome check in O(N) with O(1) space.</li>
        <li><strong>Sliding Window:</strong> Longest substring without repeating chars.</li>
        <li><strong>StringBuilder:</strong> String concatenation in a loop should use mutable buffer.</li>
      </ul>
    `,
    code: {
      javascript: `// Check palindrome - O(N)
function isPalindrome(s) {
    let l = 0, r = s.length - 1;
    while (l < r) {
        if (s[l] !== s[r]) return false;
        l++; r--;
    }
    return true;
}

// Check anagram - O(N)
function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    const freq = {};
    for (const c of s) freq[c] = (freq[c] || 0) + 1;
    for (const c of t) {
        if (!freq[c]) return false;
        freq[c]--;
    }
    return true;
}`,
      cpp: `#include <string>
#include <unordered_map>
using namespace std;

bool isPalindrome(const string& s) {
    int l = 0, r = s.size() - 1;
    while (l < r) { if (s[l++] != s[r--]) return false; }
    return true;
}

bool isAnagram(const string& s, const string& t) {
    if (s.size() != t.size()) return false;
    unordered_map<char,int> freq;
    for (char c : s) freq[c]++;
    for (char c : t) { if (--freq[c] < 0) return false; }
    return true;
}`,
      java: `import java.util.*;

public boolean isPalindrome(String s) {
    int l = 0, r = s.length() - 1;
    while (l < r) {
        if (s.charAt(l) != s.charAt(r)) return false;
        l++; r--;
    }
    return true;
}

public boolean isAnagram(String s, String t) {
    if (s.length() != t.length()) return false;
    int[] freq = new int[26];
    for (char c : s.toCharArray()) freq[c - 'a']++;
    for (char c : t.toCharArray()) if (--freq[c - 'a'] < 0) return false;
    return true;
}`,
      python: `# Check palindrome - O(N)
def is_palindrome(s: str) -> bool:
    return s == s[::-1]

# Or Two-pointer approach:
def is_palindrome_2ptr(s: str) -> bool:
    l, r = 0, len(s) - 1
    while l < r:
        if s[l] != s[r]: return False
        l += 1; r -= 1
    return True

# Check anagram - O(N)
from collections import Counter
def is_anagram(s: str, t: str) -> bool:
    return Counter(s) == Counter(t)`
    }
  },
  {
    id: "stack-queue",
    title: "Stacks & Queues",
    category: "Linear Structures",
    difficulty: "Beginner",
    icon: "📚",
    iconColor: "emerald",
    summary: "LIFO (Stack) and FIFO (Queue) restricted-access linear structures used in DFS, BFS, and scheduling.",
    readTime: "7 mins",
    details: `
      <h2>Stacks & Queues</h2>
      <p><strong>Stack (LIFO):</strong> Used in function call stacks, undo/redo, DFS traversal, and parenthesis matching.</p>
      <p><strong>Queue (FIFO):</strong> Used in BFS traversal, task scheduling, and printer spooling.</p>
      <h3>Monotonic Stack (Advanced)</h3>
      <p>A stack that maintains elements in strictly increasing or decreasing order. Solves "Next Greater Element" problems in O(N).</p>
    `,
    code: {
      javascript: `// Valid Parentheses - classic stack problem
function isValid(s) {
    const stack = [], map = { ')': '(', ']': '[', '}': '{' };
    for (const c of s) {
        if ('([{'.includes(c)) stack.push(c);
        else if (stack.pop() !== map[c]) return false;
    }
    return stack.length === 0;
}

// BFS using Queue
function bfs(graph, start) {
    const visited = new Set([start]);
    const queue = [start];
    while (queue.length) {
        const node = queue.shift();
        for (const neighbor of graph[node] || []) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);
            }
        }
    }
}`,
      cpp: `#include <stack>
#include <queue>
#include <string>
using namespace std;

// Valid Parentheses
bool isValid(const string& s) {
    stack<char> st;
    for (char c : s) {
        if (c=='(' || c=='[' || c=='{') st.push(c);
        else {
            if (st.empty()) return false;
            char top = st.top(); st.pop();
            if ((c==')' && top!='(') || (c==']' && top!='[') || (c=='}' && top!='{'))
                return false;
        }
    }
    return st.empty();
}`,
      java: `import java.util.*;

// Valid Parentheses
public boolean isValid(String s) {
    Deque<Character> stack = new ArrayDeque<>();
    for (char c : s.toCharArray()) {
        if (c=='(' || c=='[' || c=='{') stack.push(c);
        else {
            if (stack.isEmpty()) return false;
            char top = stack.pop();
            if ((c==')' && top!='(') || (c==']' && top!='[') || (c=='}' && top!='{'))
                return false;
        }
    }
    return stack.isEmpty();
}`,
      python: `# Valid Parentheses - O(N)
def is_valid(s: str) -> bool:
    stack = []
    mapping = {')': '(', ']': '[', '}': '{'}
    for char in s:
        if char in '([{':
            stack.append(char)
        elif not stack or stack[-1] != mapping[char]:
            return False
        else:
            stack.pop()
    return len(stack) == 0`
    }
  },
  {
    id: "linked-list",
    title: "Linked Lists",
    category: "Linear Structures",
    difficulty: "Beginner",
    icon: "🔗",
    iconColor: "amber",
    summary: "Nodes linked by pointers. O(1) head insertion, O(N) access. Doubly and circular variations.",
    readTime: "8 mins",
    details: `
      <h2>Linked Lists</h2>
      <p>A Linked List consists of nodes, each storing a value and a pointer to the next node. Unlike arrays, they are not stored contiguously.</p>
      <h3>Types</h3>
      <ul>
        <li><strong>Singly Linked List:</strong> Each node points to the next.</li>
        <li><strong>Doubly Linked List:</strong> Each node points to both next and previous. Used in LRU Cache.</li>
        <li><strong>Circular Linked List:</strong> Last node points back to head. Used in round-robin scheduling.</li>
      </ul>
      <h3>🎯 Interview Patterns</h3>
      <ul>
        <li><strong>Fast & Slow Pointers (Floyd's):</strong> Detect cycle, find middle in O(N).</li>
        <li><strong>Reverse a linked list:</strong> Iteratively with 3 pointers.</li>
        <li><strong>Merge two sorted lists:</strong> Use dummy head technique.</li>
      </ul>
    `,
    code: {
      javascript: `class ListNode {
    constructor(val) { this.val = val; this.next = null; }
}

// Reverse Linked List - O(N), O(1) space
function reverseList(head) {
    let prev = null, curr = head;
    while (curr) {
        const next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
}

// Detect Cycle - Floyd's Two Pointer
function hasCycle(head) {
    let slow = head, fast = head;
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow === fast) return true;
    }
    return false;
}`,
      cpp: `struct ListNode { int val; ListNode* next; ListNode(int v): val(v), next(nullptr) {} };

// Reverse Linked List
ListNode* reverseList(ListNode* head) {
    ListNode* prev = nullptr;
    while (head) {
        ListNode* next = head->next;
        head->next = prev;
        prev = head;
        head = next;
    }
    return prev;
}

// Detect Cycle
bool hasCycle(ListNode* head) {
    ListNode* slow = head, *fast = head;
    while (fast && fast->next) {
        slow = slow->next; fast = fast->next->next;
        if (slow == fast) return true;
    }
    return false;
}`,
      java: `class ListNode { int val; ListNode next; ListNode(int v) { val = v; } }

// Reverse Linked List
public ListNode reverseList(ListNode head) {
    ListNode prev = null;
    while (head != null) {
        ListNode next = head.next;
        head.next = prev; prev = head; head = next;
    }
    return prev;
}

// Detect Cycle
public boolean hasCycle(ListNode head) {
    ListNode slow = head, fast = head;
    while (fast != null && fast.next != null) {
        slow = slow.next; fast = fast.next.next;
        if (slow == fast) return true;
    }
    return false;
}`,
      python: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val; self.next = next

# Reverse Linked List - O(N), O(1)
def reverseList(head):
    prev = None
    while head:
        nxt = head.next
        head.next = prev
        prev = head
        head = nxt
    return prev

# Detect Cycle - Floyd's
def hasCycle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow is fast: return True
    return False`
    }
  },
  {
    id: "hash-tables",
    title: "Hash Tables",
    category: "Linear Structures",
    difficulty: "Beginner",
    icon: "#️⃣",
    iconColor: "purple",
    summary: "O(1) average lookup using key hashing. Covers collision handling, HashMap, HashSet, and open addressing.",
    readTime: "7 mins",
    details: `
      <h2>Hash Tables</h2>
      <p>A Hash Table stores key-value pairs. A <strong>hash function</strong> maps each key to an array index in O(1) time. They are critical for interview problems involving fast lookup, counting, or grouping.</p>
      <h3>Collision Handling</h3>
      <ul>
        <li><strong>Chaining:</strong> Each bucket stores a linked list of entries with the same hash.</li>
        <li><strong>Open Addressing (Linear Probing):</strong> On collision, find the next available slot.</li>
      </ul>
      <h3>Time Complexity</h3>
      <ul>
        <li>Insert / Delete / Search: <strong>O(1) average</strong>, O(N) worst case</li>
        <li>Space: <strong>O(N)</strong></li>
      </ul>
    `,
    code: {
      javascript: `// Group Anagrams - classic HashMap problem
function groupAnagrams(strs) {
    const map = new Map();
    for (const s of strs) {
        const key = s.split('').sort().join('');
        if (!map.has(key)) map.set(key, []);
        map.get(key).push(s);
    }
    return [...map.values()];
}

// First non-repeating character
function firstUniqueChar(s) {
    const count = {};
    for (const c of s) count[c] = (count[c] || 0) + 1;
    for (let i = 0; i < s.length; i++)
        if (count[s[i]] === 1) return i;
    return -1;
}`,
      cpp: `#include <unordered_map>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

vector<vector<string>> groupAnagrams(vector<string>& strs) {
    unordered_map<string, vector<string>> mp;
    for (auto& s : strs) {
        string key = s; sort(key.begin(), key.end());
        mp[key].push_back(s);
    }
    vector<vector<string>> result;
    for (auto& [k, v] : mp) result.push_back(v);
    return result;
}`,
      java: `import java.util.*;

public List<List<String>> groupAnagrams(String[] strs) {
    Map<String, List<String>> map = new HashMap<>();
    for (String s : strs) {
        char[] ca = s.toCharArray(); Arrays.sort(ca);
        String key = new String(ca);
        map.computeIfAbsent(key, k -> new ArrayList<>()).add(s);
    }
    return new ArrayList<>(map.values());
}`,
      python: `from collections import defaultdict

def group_anagrams(strs):
    anagrams = defaultdict(list)
    for s in strs:
        key = tuple(sorted(s))
        anagrams[key].append(s)
    return list(anagrams.values())

def first_unique_char(s):
    from collections import Counter
    count = Counter(s)
    for i, c in enumerate(s):
        if count[c] == 1: return i
    return -1`
    }
  },
  {
    id: "trees-bst",
    title: "Trees & BST",
    category: "Non-Linear Structures",
    difficulty: "Intermediate",
    icon: "🌳",
    iconColor: "emerald",
    summary: "Binary trees, BST ordering property, tree traversals (inorder, preorder, postorder), and height/balance.",
    readTime: "9 mins",
    details: `
      <h2>Binary Trees & BST</h2>
      <p>A <strong>Binary Tree</strong> is a hierarchical structure where each node has at most two children.</p>
      <p>A <strong>BST</strong> enforces: all left descendants < node < all right descendants.</p>

      <h3>Tree Traversals</h3>
      <ul>
        <li><strong>Inorder (L-Root-R):</strong> Produces sorted output for BST.</li>
        <li><strong>Preorder (Root-L-R):</strong> Used for copying trees.</li>
        <li><strong>Postorder (L-R-Root):</strong> Used for deleting trees.</li>
        <li><strong>Level Order (BFS):</strong> Uses a queue, layer by layer.</li>
      </ul>

      <h3>Time Complexities (Balanced BST)</h3>
      <table class="complexity-table">
        <thead><tr><th>Operation</th><th>Average</th><th>Worst (Skewed)</th></tr></thead>
        <tbody>
          <tr><td>Search</td><td><span class="complexity-badge complexity-green">O(log N)</span></td><td><span class="complexity-badge complexity-red">O(N)</span></td></tr>
          <tr><td>Insert</td><td><span class="complexity-badge complexity-green">O(log N)</span></td><td><span class="complexity-badge complexity-red">O(N)</span></td></tr>
          <tr><td>Delete</td><td><span class="complexity-badge complexity-green">O(log N)</span></td><td><span class="complexity-badge complexity-red">O(N)</span></td></tr>
        </tbody>
      </table>
    `,
    code: {
      javascript: `class TreeNode {
    constructor(val) { this.val = val; this.left = this.right = null; }
}

// Inorder Traversal (recursive) - O(N)
function inorder(root, result = []) {
    if (!root) return result;
    inorder(root.left, result);
    result.push(root.val);
    inorder(root.right, result);
    return result;
}

// Maximum Depth of Binary Tree
function maxDepth(root) {
    if (!root) return 0;
    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}

// Level Order Traversal (BFS)
function levelOrder(root) {
    if (!root) return [];
    const result = [], queue = [root];
    while (queue.length) {
        const level = [], size = queue.length;
        for (let i = 0; i < size; i++) {
            const node = queue.shift();
            level.push(node.val);
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        result.push(level);
    }
    return result;
}`,
      cpp: `struct TreeNode { int val; TreeNode *left, *right; TreeNode(int v): val(v), left(nullptr), right(nullptr) {} };

void inorder(TreeNode* root, vector<int>& res) {
    if (!root) return;
    inorder(root->left, res);
    res.push_back(root->val);
    inorder(root->right, res);
}

int maxDepth(TreeNode* root) {
    if (!root) return 0;
    return 1 + max(maxDepth(root->left), maxDepth(root->right));
}`,
      java: `class TreeNode { int val; TreeNode left, right; TreeNode(int v) { val = v; } }

public List<Integer> inorder(TreeNode root) {
    List<Integer> res = new ArrayList<>();
    inorderHelper(root, res); return res;
}
private void inorderHelper(TreeNode node, List<Integer> res) {
    if (node == null) return;
    inorderHelper(node.left, res);
    res.add(node.val);
    inorderHelper(node.right, res);
}

public int maxDepth(TreeNode root) {
    if (root == null) return 0;
    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}`,
      python: `class TreeNode:
    def __init__(self, val=0):
        self.val = val; self.left = self.right = None

def inorder(root):
    if not root: return []
    return inorder(root.left) + [root.val] + inorder(root.right)

def max_depth(root):
    if not root: return 0
    return 1 + max(max_depth(root.left), max_depth(root.right))

from collections import deque
def level_order(root):
    if not root: return []
    result, queue = [], deque([root])
    while queue:
        level = []
        for _ in range(len(queue)):
            node = queue.popleft()
            level.append(node.val)
            if node.left: queue.append(node.left)
            if node.right: queue.append(node.right)
        result.append(level)
    return result`
    }
  },
  {
    id: "heaps",
    title: "Heaps / Priority Queues",
    category: "Non-Linear Structures",
    difficulty: "Intermediate",
    icon: "⛰️",
    iconColor: "amber",
    summary: "Binary heap property for O(log N) insert/delete. Min-Heap for kth smallest, Max-Heap for scheduling.",
    readTime: "8 mins",
    details: `
      <h2>Heaps & Priority Queues</h2>
      <p>A <strong>Heap</strong> is a complete binary tree satisfying the heap property:</p>
      <ul>
        <li><strong>Min-Heap:</strong> Parent ≤ both children. Root = minimum element.</li>
        <li><strong>Max-Heap:</strong> Parent ≥ both children. Root = maximum element.</li>
      </ul>
      <h3>Key Operations</h3>
      <ul>
        <li><strong>Insert (heapify up):</strong> O(log N)</li>
        <li><strong>Extract Min/Max:</strong> O(log N)</li>
        <li><strong>Peek Min/Max:</strong> O(1)</li>
        <li><strong>Build Heap from array:</strong> O(N)</li>
      </ul>
      <h3>Interview Use Cases</h3>
      <ul>
        <li>K-th largest/smallest element</li>
        <li>Merge K sorted lists</li>
        <li>Median from data stream</li>
        <li>Dijkstra's shortest path</li>
      </ul>
    `,
    code: {
      javascript: `// MinHeap implementation
class MinHeap {
    constructor() { this.heap = []; }
    push(val) {
        this.heap.push(val);
        this._bubbleUp(this.heap.length - 1);
    }
    pop() {
        const min = this.heap[0];
        const last = this.heap.pop();
        if (this.heap.length) { this.heap[0] = last; this._sinkDown(0); }
        return min;
    }
    peek() { return this.heap[0]; }
    _bubbleUp(i) {
        while (i > 0) {
            const p = Math.floor((i-1)/2);
            if (this.heap[p] > this.heap[i]) { [this.heap[p], this.heap[i]] = [this.heap[i], this.heap[p]]; i = p; }
            else break;
        }
    }
    _sinkDown(i) {
        const n = this.heap.length;
        while (true) {
            let min = i, l = 2*i+1, r = 2*i+2;
            if (l < n && this.heap[l] < this.heap[min]) min = l;
            if (r < n && this.heap[r] < this.heap[min]) min = r;
            if (min === i) break;
            [this.heap[min], this.heap[i]] = [this.heap[i], this.heap[min]]; i = min;
        }
    }
}`,
      cpp: `#include <queue>
#include <vector>
using namespace std;

// Kth Largest using Min-Heap
int findKthLargest(vector<int>& nums, int k) {
    priority_queue<int, vector<int>, greater<int>> minHeap;
    for (int n : nums) {
        minHeap.push(n);
        if (minHeap.size() > k) minHeap.pop();
    }
    return minHeap.top();
}`,
      java: `import java.util.*;

// Kth Largest using Min-Heap
public int findKthLargest(int[] nums, int k) {
    PriorityQueue<Integer> minHeap = new PriorityQueue<>();
    for (int n : nums) {
        minHeap.offer(n);
        if (minHeap.size() > k) minHeap.poll();
    }
    return minHeap.peek();
}`,
      python: `import heapq

# Kth largest using min-heap - O(N log K)
def find_kth_largest(nums, k):
    heap = []
    for n in nums:
        heapq.heappush(heap, n)
        if len(heap) > k:
            heapq.heappop(heap)
    return heap[0]

# Python uses min-heap; negate for max-heap
def find_k_smallest(nums, k):
    return heapq.nsmallest(k, nums)[-1]`
    }
  },
  {
    id: "tries",
    title: "Tries (Prefix Trees)",
    category: "Non-Linear Structures",
    difficulty: "Advanced",
    icon: "🔡",
    iconColor: "purple",
    summary: "Efficient string search structure. O(L) insert/search where L = word length. Used in autocomplete.",
    readTime: "8 mins",
    details: `
      <h2>Tries (Prefix Trees)</h2>
      <p>A Trie is a tree-like data structure used to efficiently store and search strings. Each node represents a character, and paths from root to a leaf represent a complete word.</p>
      <h3>Advantages</h3>
      <ul>
        <li>O(L) search time (L = word length), independent of total number of words</li>
        <li>Prefix searching is natural and efficient</li>
        <li>Used in spell checkers, search engines, IP routing</li>
      </ul>
      <h3>Operations</h3>
      <ul>
        <li><strong>Insert:</strong> O(L)</li>
        <li><strong>Search:</strong> O(L)</li>
        <li><strong>Starts-with (prefix):</strong> O(P) where P = prefix length</li>
      </ul>
    `,
    code: {
      javascript: `class TrieNode {
    constructor() { this.children = {}; this.isEnd = false; }
}

class Trie {
    constructor() { this.root = new TrieNode(); }
    
    insert(word) {
        let node = this.root;
        for (const c of word) {
            if (!node.children[c]) node.children[c] = new TrieNode();
            node = node.children[c];
        }
        node.isEnd = true;
    }
    
    search(word) {
        let node = this.root;
        for (const c of word) {
            if (!node.children[c]) return false;
            node = node.children[c];
        }
        return node.isEnd;
    }
    
    startsWith(prefix) {
        let node = this.root;
        for (const c of prefix) {
            if (!node.children[c]) return false;
            node = node.children[c];
        }
        return true;
    }
}`,
      cpp: `#include <unordered_map>
#include <string>
using namespace std;

struct TrieNode {
    unordered_map<char, TrieNode*> children;
    bool isEnd = false;
};

class Trie {
    TrieNode* root;
public:
    Trie() { root = new TrieNode(); }
    void insert(const string& word) {
        TrieNode* node = root;
        for (char c : word) {
            if (!node->children.count(c)) node->children[c] = new TrieNode();
            node = node->children[c];
        }
        node->isEnd = true;
    }
    bool search(const string& word) {
        TrieNode* node = root;
        for (char c : word) {
            if (!node->children.count(c)) return false;
            node = node->children[c];
        }
        return node->isEnd;
    }
};`,
      java: `import java.util.*;

class TrieNode { Map<Character,TrieNode> children = new HashMap<>(); boolean isEnd; }

class Trie {
    TrieNode root = new TrieNode();
    public void insert(String word) {
        TrieNode node = root;
        for (char c : word.toCharArray()) {
            node.children.putIfAbsent(c, new TrieNode());
            node = node.children.get(c);
        }
        node.isEnd = true;
    }
    public boolean search(String word) {
        TrieNode node = root;
        for (char c : word.toCharArray()) {
            if (!node.children.containsKey(c)) return false;
            node = node.children.get(c);
        }
        return node.isEnd;
    }
}`,
      python: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

class Trie:
    def __init__(self): self.root = TrieNode()
    
    def insert(self, word):
        node = self.root
        for c in word:
            if c not in node.children:
                node.children[c] = TrieNode()
            node = node.children[c]
        node.is_end = True
    
    def search(self, word):
        node = self.root
        for c in word:
            if c not in node.children: return False
            node = node.children[c]
        return node.is_end
    
    def starts_with(self, prefix):
        node = self.root
        for c in prefix:
            if c not in node.children: return False
            node = node.children[c]
        return True`
    }
  },
  {
    id: "searching",
    title: "Searching Algorithms",
    category: "Algorithms",
    difficulty: "Beginner",
    icon: "🔍",
    iconColor: "cyan",
    summary: "Linear search O(N) vs Binary Search O(log N). Binary search on rotated arrays and answer spaces.",
    readTime: "6 mins",
    details: `
      <h2>Searching Algorithms</h2>
      <p><strong>Linear Search:</strong> Scan each element one by one. O(N) time, O(1) space.</p>
      <p><strong>Binary Search:</strong> Requires sorted array. Repeatedly halves the search space. O(log N) time, O(1) space.</p>
      <h3>Binary Search Template</h3>
      <p>There are three variants based on whether you're looking for exact match, leftmost occurrence, or rightmost occurrence. Mastering the <code>lo ≤ hi</code> and <code>lo &lt; hi</code> templates is crucial.</p>
      <h3>Advanced Applications</h3>
      <ul>
        <li>Search in Rotated Sorted Array</li>
        <li>Binary Search on Answer Space (e.g., minimum days to complete tasks)</li>
        <li>Finding peak element</li>
      </ul>
    `,
    code: {
      javascript: `// Classic Binary Search - O(log N)
function binarySearch(arr, target) {
    let lo = 0, hi = arr.length - 1;
    while (lo <= hi) {
        const mid = lo + Math.floor((hi - lo) / 2);
        if (arr[mid] === target) return mid;
        else if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return -1;
}

// Search in Rotated Sorted Array
function searchRotated(nums, target) {
    let lo = 0, hi = nums.length - 1;
    while (lo <= hi) {
        const mid = lo + Math.floor((hi - lo) / 2);
        if (nums[mid] === target) return mid;
        if (nums[lo] <= nums[mid]) { // left half sorted
            if (nums[lo] <= target && target < nums[mid]) hi = mid - 1;
            else lo = mid + 1;
        } else { // right half sorted
            if (nums[mid] < target && target <= nums[hi]) lo = mid + 1;
            else hi = mid - 1;
        }
    }
    return -1;
}`,
      cpp: `int binarySearch(const vector<int>& arr, int target) {
    int lo = 0, hi = arr.size() - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return -1;
}`,
      java: `public int binarySearch(int[] arr, int target) {
    int lo = 0, hi = arr.length - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return -1;
}`,
      python: `# Classic Binary Search - O(log N)
def binary_search(arr, target):
    lo, hi = 0, len(arr) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if arr[mid] == target: return mid
        elif arr[mid] < target: lo = mid + 1
        else: hi = mid - 1
    return -1

# Python built-in
import bisect
def search_sorted(arr, target):
    idx = bisect.bisect_left(arr, target)
    return idx if idx < len(arr) and arr[idx] == target else -1`
    }
  },
  {
    id: "sorting-algos",
    title: "Sorting Algorithms",
    category: "Algorithms",
    difficulty: "Intermediate",
    icon: "📊",
    iconColor: "amber",
    summary: "O(N²) to O(N log N). Bubble, Selection, Insertion, Merge, Quick, Heap, Counting & Radix Sort.",
    readTime: "10 mins",
    details: `
      <h2>Sorting Algorithms</h2>
      <table class="complexity-table">
        <thead><tr><th>Algorithm</th><th>Best</th><th>Average</th><th>Worst</th><th>Space</th><th>Stable</th></tr></thead>
        <tbody>
          <tr><td>Bubble Sort</td><td>O(N)</td><td>O(N²)</td><td>O(N²)</td><td>O(1)</td><td>✅</td></tr>
          <tr><td>Selection Sort</td><td>O(N²)</td><td>O(N²)</td><td>O(N²)</td><td>O(1)</td><td>❌</td></tr>
          <tr><td>Insertion Sort</td><td>O(N)</td><td>O(N²)</td><td>O(N²)</td><td>O(1)</td><td>✅</td></tr>
          <tr><td>Merge Sort</td><td>O(N log N)</td><td>O(N log N)</td><td>O(N log N)</td><td>O(N)</td><td>✅</td></tr>
          <tr><td>Quick Sort</td><td>O(N log N)</td><td>O(N log N)</td><td>O(N²)</td><td>O(log N)</td><td>❌</td></tr>
          <tr><td>Heap Sort</td><td>O(N log N)</td><td>O(N log N)</td><td>O(N log N)</td><td>O(1)</td><td>❌</td></tr>
          <tr><td>Counting Sort</td><td>O(N+K)</td><td>O(N+K)</td><td>O(N+K)</td><td>O(K)</td><td>✅</td></tr>
        </tbody>
      </table>
    `,
    code: {
      javascript: `// Merge Sort - O(N log N) guaranteed
function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    return merge(left, right);
}
function merge(l, r) {
    const res = []; let i = 0, j = 0;
    while (i < l.length && j < r.length)
        res.push(l[i] <= r[j] ? l[i++] : r[j++]);
    return [...res, ...l.slice(i), ...r.slice(j)];
}`,
      cpp: `void merge(vector<int>& arr, int l, int m, int r) {
    vector<int> L(arr.begin()+l, arr.begin()+m+1);
    vector<int> R(arr.begin()+m+1, arr.begin()+r+1);
    int i=0, j=0, k=l;
    while (i<L.size()&&j<R.size()) arr[k++] = L[i]<=R[j] ? L[i++] : R[j++];
    while (i<L.size()) arr[k++]=L[i++];
    while (j<R.size()) arr[k++]=R[j++];
}`,
      java: `void mergeSort(int[] arr, int l, int r) {
    if (l >= r) return;
    int m = (l + r) / 2;
    mergeSort(arr, l, m);
    mergeSort(arr, m+1, r);
    merge(arr, l, m, r);
}`,
      python: `def merge_sort(arr):
    if len(arr) <= 1: return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)

def merge(l, r):
    result = []
    i = j = 0
    while i < len(l) and j < len(r):
        if l[i] <= r[j]: result.append(l[i]); i += 1
        else: result.append(r[j]); j += 1
    return result + l[i:] + r[j:]`
    }
  },
  {
    id: "recursion-backtracking",
    title: "Recursion & Backtracking",
    category: "Algorithms",
    difficulty: "Intermediate",
    icon: "🔄",
    iconColor: "purple",
    summary: "Build solutions incrementally and abandon invalid paths. Solve subsets, permutations, N-Queens, Sudoku.",
    readTime: "10 mins",
    details: `
      <h2>Recursion & Backtracking</h2>
      <p><strong>Backtracking</strong> is a recursive search that explores all possible choices and <em>backtracks</em> when a constraint is violated.</p>
      <h3>Standard Template</h3>
      <pre><code>function backtrack(state):
    if isGoal(state): addSolution(); return
    for each choice in choices(state):
        makeChoice(choice)
        backtrack(state)
        undoChoice(choice)  // ← BACKTRACK</code></pre>
      <h3>Classic Problems</h3>
      <ul>
        <li>Generate all subsets / power set</li>
        <li>Permutations and combinations</li>
        <li>N-Queens problem</li>
        <li>Sudoku solver</li>
        <li>Word search in a grid</li>
      </ul>
    `,
    code: {
      javascript: `// Generate all subsets (Power Set) - O(2^N)
function subsets(nums) {
    const result = [];
    function backtrack(start, current) {
        result.push([...current]);
        for (let i = start; i < nums.length; i++) {
            current.push(nums[i]);
            backtrack(i + 1, current);
            current.pop();  // backtrack
        }
    }
    backtrack(0, []);
    return result;
}

// All Permutations - O(N!)
function permute(nums) {
    const result = [];
    function backtrack(start) {
        if (start === nums.length) { result.push([...nums]); return; }
        for (let i = start; i < nums.length; i++) {
            [nums[start], nums[i]] = [nums[i], nums[start]];
            backtrack(start + 1);
            [nums[start], nums[i]] = [nums[i], nums[start]]; // undo
        }
    }
    backtrack(0);
    return result;
}`,
      cpp: `void subsetsHelper(vector<int>& nums, int start, vector<int>& curr, vector<vector<int>>& res) {
    res.push_back(curr);
    for (int i = start; i < nums.size(); i++) {
        curr.push_back(nums[i]);
        subsetsHelper(nums, i+1, curr, res);
        curr.pop_back(); // backtrack
    }
}
vector<vector<int>> subsets(vector<int>& nums) {
    vector<vector<int>> res; vector<int> curr;
    subsetsHelper(nums, 0, curr, res);
    return res;
}`,
      java: `public List<List<Integer>> subsets(int[] nums) {
    List<List<Integer>> result = new ArrayList<>();
    backtrack(nums, 0, new ArrayList<>(), result);
    return result;
}
private void backtrack(int[] nums, int start, List<Integer> curr, List<List<Integer>> result) {
    result.add(new ArrayList<>(curr));
    for (int i = start; i < nums.length; i++) {
        curr.add(nums[i]);
        backtrack(nums, i+1, curr, result);
        curr.remove(curr.size()-1); // backtrack
    }
}`,
      python: `def subsets(nums):
    result = []
    def backtrack(start, current):
        result.append(current[:])
        for i in range(start, len(nums)):
            current.append(nums[i])
            backtrack(i + 1, current)
            current.pop()  # backtrack
    backtrack(0, [])
    return result

def permute(nums):
    result = []
    def backtrack(start):
        if start == len(nums):
            result.append(nums[:])
            return
        for i in range(start, len(nums)):
            nums[start], nums[i] = nums[i], nums[start]
            backtrack(start + 1)
            nums[start], nums[i] = nums[i], nums[start]  # undo
    backtrack(0)
    return result`
    }
  },
  {
    id: "graphs",
    title: "Graph Algorithms",
    category: "Algorithms",
    difficulty: "Advanced",
    icon: "🕸️",
    iconColor: "cyan",
    summary: "Graph representations, BFS, DFS, Dijkstra, Bellman-Ford, Topological Sort, Union-Find, MST.",
    readTime: "12 mins",
    details: `
      <h2>Graph Algorithms</h2>
      <p>A <strong>Graph G(V, E)</strong> consists of Vertices (nodes) and Edges (connections). Graphs model networks, maps, social connections, and dependency systems.</p>

      <h3>Representations</h3>
      <ul>
        <li><strong>Adjacency Matrix:</strong> O(V²) space. O(1) edge lookup.</li>
        <li><strong>Adjacency List:</strong> O(V + E) space. Most common in interviews.</li>
      </ul>

      <h3>Key Algorithms</h3>
      <table class="complexity-table">
        <thead><tr><th>Algorithm</th><th>Time</th><th>Use Case</th></tr></thead>
        <tbody>
          <tr><td>BFS</td><td>O(V+E)</td><td>Shortest path (unweighted), level order</td></tr>
          <tr><td>DFS</td><td>O(V+E)</td><td>Cycle detection, connected components</td></tr>
          <tr><td>Dijkstra</td><td>O(E log V)</td><td>Shortest path (positive weights)</td></tr>
          <tr><td>Bellman-Ford</td><td>O(VE)</td><td>Shortest path (negative weights)</td></tr>
          <tr><td>Topological Sort</td><td>O(V+E)</td><td>Task scheduling, dependency ordering</td></tr>
          <tr><td>Kruskal / Prim</td><td>O(E log E)</td><td>Minimum Spanning Tree</td></tr>
        </tbody>
      </table>
    `,
    code: {
      javascript: `// BFS - O(V+E)
function bfs(adjList, start) {
    const visited = new Set([start]);
    const queue = [start], order = [];
    while (queue.length) {
        const node = queue.shift();
        order.push(node);
        for (const neighbor of adjList[node] || []) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor); queue.push(neighbor);
            }
        }
    }
    return order;
}

// Dijkstra's Shortest Path (using min-heap simulation)
function dijkstra(graph, start, n) {
    const dist = new Array(n).fill(Infinity);
    dist[start] = 0;
    const heap = [[0, start]]; // [distance, node]
    while (heap.length) {
        heap.sort((a,b) => a[0]-b[0]);
        const [d, u] = heap.shift();
        if (d > dist[u]) continue;
        for (const [v, w] of graph[u] || []) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                heap.push([dist[v], v]);
            }
        }
    }
    return dist;
}`,
      cpp: `#include <queue>
#include <vector>
using namespace std;

// Dijkstra's Algorithm
vector<int> dijkstra(const vector<vector<pair<int,int>>>& graph, int src) {
    int n = graph.size();
    vector<int> dist(n, INT_MAX);
    dist[src] = 0;
    priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> pq;
    pq.push({0, src});
    while (!pq.empty()) {
        auto [d, u] = pq.top(); pq.pop();
        if (d > dist[u]) continue;
        for (auto [v, w] : graph[u]) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                pq.push({dist[v], v});
            }
        }
    }
    return dist;
}`,
      java: `import java.util.*;

public int[] dijkstra(List<List<int[]>> graph, int src) {
    int n = graph.size();
    int[] dist = new int[n];
    Arrays.fill(dist, Integer.MAX_VALUE);
    dist[src] = 0;
    PriorityQueue<int[]> pq = new PriorityQueue<>((a,b) -> a[0]-b[0]);
    pq.offer(new int[]{0, src});
    while (!pq.isEmpty()) {
        int[] curr = pq.poll();
        int d = curr[0], u = curr[1];
        if (d > dist[u]) continue;
        for (int[] edge : graph.get(u)) {
            int v = edge[0], w = edge[1];
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                pq.offer(new int[]{dist[v], v});
            }
        }
    }
    return dist;
}`,
      python: `import heapq

# Dijkstra's Algorithm - O(E log V)
def dijkstra(graph, src, n):
    dist = [float('inf')] * n
    dist[src] = 0
    heap = [(0, src)]  # (distance, node)
    while heap:
        d, u = heapq.heappop(heap)
        if d > dist[u]: continue
        for v, w in graph.get(u, []):
            if dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                heapq.heappush(heap, (dist[v], v))
    return dist

# BFS - O(V+E)
from collections import deque
def bfs(adj, start):
    visited, queue, order = {start}, deque([start]), []
    while queue:
        node = queue.popleft(); order.append(node)
        for nb in adj.get(node, []):
            if nb not in visited:
                visited.add(nb); queue.append(nb)
    return order`
    }
  },
  {
    id: "dynamic-programming",
    title: "Dynamic Programming",
    category: "Algorithms",
    difficulty: "Advanced",
    icon: "🧩",
    iconColor: "amber",
    summary: "Memoization & tabulation to eliminate redundant recursion. Covers knapsack, LCS, coin change, LIS.",
    readTime: "13 mins",
    details: `
      <h2>Dynamic Programming</h2>
      <p>DP is an optimization that stores solutions to subproblems to avoid recomputation. A problem is solvable by DP if it has:</p>
      <ul>
        <li><strong>Overlapping Subproblems:</strong> Same subproblem is solved multiple times.</li>
        <li><strong>Optimal Substructure:</strong> Optimal solution built from optimal subsolutions.</li>
      </ul>
      <h3>Approaches</h3>
      <ul>
        <li><strong>Top-Down (Memoization):</strong> Recursive + cache. Intuitive to code.</li>
        <li><strong>Bottom-Up (Tabulation):</strong> Iterative. Better space efficiency.</li>
      </ul>
      <h3>Classic Problems</h3>
      <ul>
        <li>Fibonacci, Climbing Stairs</li>
        <li>0/1 Knapsack</li>
        <li>Longest Common Subsequence (LCS)</li>
        <li>Longest Increasing Subsequence (LIS)</li>
        <li>Coin Change</li>
        <li>Edit Distance</li>
      </ul>
    `,
    code: {
      javascript: `// Coin Change - O(amount * coins.length)
function coinChange(coins, amount) {
    const dp = new Array(amount + 1).fill(Infinity);
    dp[0] = 0;
    for (let i = 1; i <= amount; i++) {
        for (const coin of coins) {
            if (coin <= i) dp[i] = Math.min(dp[i], dp[i - coin] + 1);
        }
    }
    return dp[amount] === Infinity ? -1 : dp[amount];
}

// Longest Common Subsequence - O(M*N)
function lcs(s1, s2) {
    const m = s1.length, n = s2.length;
    const dp = Array.from({length: m+1}, () => new Array(n+1).fill(0));
    for (let i = 1; i <= m; i++)
        for (let j = 1; j <= n; j++)
            dp[i][j] = s1[i-1] === s2[j-1]
                ? dp[i-1][j-1] + 1
                : Math.max(dp[i-1][j], dp[i][j-1]);
    return dp[m][n];
}`,
      cpp: `#include <vector>
#include <algorithm>
using namespace std;

int coinChange(vector<int>& coins, int amount) {
    vector<int> dp(amount+1, INT_MAX);
    dp[0] = 0;
    for (int i = 1; i <= amount; i++)
        for (int coin : coins)
            if (coin <= i && dp[i-coin] != INT_MAX)
                dp[i] = min(dp[i], dp[i-coin]+1);
    return dp[amount] == INT_MAX ? -1 : dp[amount];
}

int lcs(const string& s1, const string& s2) {
    int m=s1.size(), n=s2.size();
    vector<vector<int>> dp(m+1, vector<int>(n+1, 0));
    for (int i=1;i<=m;i++) for (int j=1;j<=n;j++)
        dp[i][j] = s1[i-1]==s2[j-1] ? dp[i-1][j-1]+1 : max(dp[i-1][j], dp[i][j-1]);
    return dp[m][n];
}`,
      java: `public int coinChange(int[] coins, int amount) {
    int[] dp = new int[amount+1];
    Arrays.fill(dp, amount+1);
    dp[0] = 0;
    for (int i=1; i<=amount; i++)
        for (int coin : coins)
            if (coin <= i) dp[i] = Math.min(dp[i], dp[i-coin]+1);
    return dp[amount] > amount ? -1 : dp[amount];
}

public int lcs(String s1, String s2) {
    int m=s1.length(), n=s2.length();
    int[][] dp = new int[m+1][n+1];
    for (int i=1;i<=m;i++) for (int j=1;j<=n;j++)
        dp[i][j] = s1.charAt(i-1)==s2.charAt(j-1) ? dp[i-1][j-1]+1 : Math.max(dp[i-1][j],dp[i][j-1]);
    return dp[m][n];
}`,
      python: `# Coin Change - Bottom-up DP
def coin_change(coins, amount):
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    for i in range(1, amount + 1):
        for coin in coins:
            if coin <= i:
                dp[i] = min(dp[i], dp[i - coin] + 1)
    return dp[amount] if dp[amount] != float('inf') else -1

# Longest Common Subsequence
def lcs(s1, s2):
    m, n = len(s1), len(s2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if s1[i-1] == s2[j-1]: dp[i][j] = dp[i-1][j-1] + 1
            else: dp[i][j] = max(dp[i-1][j], dp[i][j-1])
    return dp[m][n]`
    }
  },
  {
    id: "greedy",
    title: "Greedy Algorithms",
    category: "Algorithms",
    difficulty: "Advanced",
    icon: "💰",
    iconColor: "emerald",
    summary: "Make the locally optimal choice at each step and prove it leads to a global optimum.",
    readTime: "8 mins",
    details: `
      <h2>Greedy Algorithms</h2>
      <p>A <strong>Greedy Algorithm</strong> builds a solution by always making the choice that looks best at the current moment, without reconsidering past choices.</p>
      <h3>When to Use Greedy</h3>
      <p>Greedy works when the problem has <strong>Greedy Choice Property</strong> — a global optimum can be reached by selecting local optima.</p>
      <h3>Classic Greedy Problems</h3>
      <ul>
        <li><strong>Activity Selection:</strong> Select max non-overlapping intervals (sort by end time)</li>
        <li><strong>Jump Game:</strong> Can you reach the last index?</li>
        <li><strong>Minimum Coins:</strong> (with canonical coin systems)</li>
        <li><strong>Huffman Encoding:</strong> Optimal prefix-free code</li>
        <li><strong>Prim's / Kruskal's MST</strong></li>
      </ul>
    `,
    code: {
      javascript: `// Jump Game - Greedy O(N)
function canJump(nums) {
    let maxReach = 0;
    for (let i = 0; i < nums.length; i++) {
        if (i > maxReach) return false;
        maxReach = Math.max(maxReach, i + nums[i]);
    }
    return true;
}

// Merge Intervals - Greedy O(N log N)
function merge(intervals) {
    intervals.sort((a, b) => a[0] - b[0]);
    const merged = [intervals[0]];
    for (const [start, end] of intervals.slice(1)) {
        const last = merged[merged.length - 1];
        if (start <= last[1]) last[1] = Math.max(last[1], end);
        else merged.push([start, end]);
    }
    return merged;
}`,
      cpp: `bool canJump(vector<int>& nums) {
    int maxReach = 0;
    for (int i = 0; i < nums.size(); i++) {
        if (i > maxReach) return false;
        maxReach = max(maxReach, i + nums[i]);
    }
    return true;
}`,
      java: `public boolean canJump(int[] nums) {
    int maxReach = 0;
    for (int i = 0; i < nums.length; i++) {
        if (i > maxReach) return false;
        maxReach = Math.max(maxReach, i + nums[i]);
    }
    return true;
}`,
      python: `# Jump Game - Greedy O(N)
def can_jump(nums):
    max_reach = 0
    for i, n in enumerate(nums):
        if i > max_reach: return False
        max_reach = max(max_reach, i + n)
    return True

# Merge Intervals - O(N log N)
def merge_intervals(intervals):
    intervals.sort(key=lambda x: x[0])
    merged = [intervals[0]]
    for start, end in intervals[1:]:
        if start <= merged[-1][1]:
            merged[-1][1] = max(merged[-1][1], end)
        else:
            merged.append([start, end])
    return merged`
    }
  },
  {
    id: "divide-conquer",
    title: "Divide & Conquer",
    category: "Algorithms",
    difficulty: "Advanced",
    icon: "⚔️",
    iconColor: "purple",
    summary: "Divide problem, conquer subproblems, combine results. Powers Merge Sort, Quick Sort, Binary Search.",
    readTime: "7 mins",
    details: `
      <h2>Divide & Conquer</h2>
      <p>A powerful paradigm that solves problems by recursively breaking them into smaller subproblems of the same type, solving them independently, and combining their solutions.</p>
      <h3>3 Steps</h3>
      <ol>
        <li><strong>Divide:</strong> Break the problem into smaller subproblems.</li>
        <li><strong>Conquer:</strong> Solve each subproblem recursively.</li>
        <li><strong>Combine:</strong> Merge the solutions.</li>
      </ol>
      <h3>Applications</h3>
      <ul>
        <li>Merge Sort, Quick Sort</li>
        <li>Binary Search</li>
        <li>Matrix Multiplication (Strassen's)</li>
        <li>Closest Pair of Points</li>
        <li>Fast Exponentiation (pow(x, n))</li>
      </ul>
    `,
    code: {
      javascript: `// Fast Power - O(log N)
function myPow(x, n) {
    if (n === 0) return 1;
    if (n < 0) { x = 1 / x; n = -n; }
    if (n % 2 === 0) {
        const half = myPow(x, n / 2);
        return half * half;
    }
    return x * myPow(x, n - 1);
}

// Count inversions using merge sort
function countInversions(arr) {
    let count = 0;
    function mergeSort(arr) {
        if (arr.length <= 1) return arr;
        const mid = Math.floor(arr.length / 2);
        const left = mergeSort(arr.slice(0, mid));
        const right = mergeSort(arr.slice(mid));
        return mergeCount(left, right);
    }
    function mergeCount(l, r) {
        const res = []; let i = 0, j = 0;
        while (i < l.length && j < r.length) {
            if (l[i] <= r[j]) res.push(l[i++]);
            else { count += l.length - i; res.push(r[j++]); }
        }
        return [...res, ...l.slice(i), ...r.slice(j)];
    }
    mergeSort(arr);
    return count;
}`,
      cpp: `long long power(long long x, long long n) {
    if (n == 0) return 1;
    if (n % 2 == 0) { long long half = power(x, n/2); return half*half; }
    return x * power(x, n-1);
}`,
      java: `public double myPow(double x, int n) {
    long N = n;
    if (N < 0) { x = 1/x; N = -N; }
    return fastPow(x, N);
}
private double fastPow(double x, long n) {
    if (n == 0) return 1;
    double half = fastPow(x, n/2);
    if (n % 2 == 0) return half*half;
    return half*half*x;
}`,
      python: `# Fast Power - O(log N)
def my_pow(x, n):
    if n == 0: return 1
    if n < 0: x, n = 1/x, -n
    if n % 2 == 0:
        half = my_pow(x, n // 2)
        return half * half
    return x * my_pow(x, n - 1)

# Built-in: x ** n or pow(x, n, mod)`
    }
  }
];

/* ─── ROADMAP PHASES ─── */
export const roadmapPhases = [
  {
    label: "Phase 1 — Foundations",
    nodes: ["big-o", "arrays", "strings"]
  },
  {
    label: "Phase 2 — Linear Data Structures",
    nodes: ["stack-queue", "linked-list", "hash-tables"]
  },
  {
    label: "Phase 3 — Non-Linear Data Structures",
    nodes: ["trees-bst", "heaps", "tries"]
  },
  {
    label: "Phase 4 — Core Algorithms",
    nodes: ["searching", "sorting-algos", "recursion-backtracking"]
  },
  {
    label: "Phase 5 — Advanced Topics",
    nodes: ["graphs", "dynamic-programming", "greedy", "divide-conquer"]
  }
];

/* ─── QUIZ QUESTIONS (15) ─── */
export const quizQuestions = [
  {
    question: "What is the time complexity of accessing an element in an array by index?",
    options: ["O(N)", "O(log N)", "O(1)", "O(N²)"],
    answer: 2,
    explanation: "Arrays store elements in contiguous memory. The address of any index is computed directly as base_address + index × element_size, making access **O(1)**."
  },
  {
    question: "Which data structure follows LIFO (Last In First Out)?",
    options: ["Queue", "Stack", "Linked List", "Heap"],
    answer: 1,
    explanation: "A **Stack** is LIFO — the last element pushed is the first one popped. Classic example: browser back button, function call stack."
  },
  {
    question: "What is the worst-case time complexity of Binary Search?",
    options: ["O(1)", "O(N)", "O(log N)", "O(N log N)"],
    answer: 2,
    explanation: "Binary Search halves the search space at each step. Starting with N elements, it takes at most log₂(N) comparisons — **O(log N)**."
  },
  {
    question: "Which sorting algorithm has a GUARANTEED O(N log N) worst case?",
    options: ["Quick Sort", "Heap Sort", "Bubble Sort", "Both Merge Sort and Heap Sort"],
    answer: 3,
    explanation: "**Merge Sort** and **Heap Sort** both guarantee O(N log N) in all cases. Quick Sort degrades to O(N²) in the worst case (e.g., already sorted array with naive pivot)."
  },
  {
    question: "In a Min-Heap, where is the smallest element always located?",
    options: ["Last node", "Root (top)", "Left child of root", "Rightmost node"],
    answer: 1,
    explanation: "By the **heap property**, the parent is always ≤ both children in a Min-Heap. The root must therefore be the minimum element — accessible in **O(1)**."
  },
  {
    question: "What is the average time complexity for search/insert/delete in a Hash Table?",
    options: ["O(log N)", "O(N)", "O(1)", "O(N log N)"],
    answer: 2,
    explanation: "Hash tables use a hash function to compute an index directly. In the average case with good hash distribution, operations are **O(1)**. The worst case is O(N) with many collisions."
  },
  {
    question: "Which algorithm is used to detect a cycle in a Linked List in O(N) time with O(1) space?",
    options: ["DFS with visited set", "Floyd's Cycle-Finding (Fast & Slow Pointers)", "Topological Sort", "Dijkstra's Algorithm"],
    answer: 1,
    explanation: "**Floyd's Cycle Detection** uses two pointers — one moving 1 step, the other 2 steps. If there's a cycle, they will eventually meet. This runs in O(N) time and O(1) space."
  },
  {
    question: "For an unbalanced (skewed) Binary Search Tree, what is the search time complexity?",
    options: ["O(1)", "O(log N)", "O(N)", "O(N log N)"],
    answer: 2,
    explanation: "A skewed BST (all nodes in a single chain) degenerates into a Linked List structure. Searching requires traversing every node in the worst case — **O(N)**."
  },
  {
    question: "What algorithm finds the shortest path in a graph with NON-NEGATIVE weighted edges?",
    options: ["BFS", "DFS", "Bellman-Ford", "Dijkstra's Algorithm"],
    answer: 3,
    explanation: "**Dijkstra's Algorithm** uses a min-priority queue to greedily extract the next closest unvisited node. It works correctly only for non-negative edge weights — O(E log V) with a binary heap."
  },
  {
    question: "Which technique optimizes a recursive solution by caching subproblem results?",
    options: ["Greedy Selection", "Memoization (Top-Down DP)", "Backtracking Pruning", "Divide & Conquer"],
    answer: 1,
    explanation: "**Memoization** is the top-down approach to Dynamic Programming — you write a natural recursive solution, then cache results in a table/hashmap to avoid re-computing overlapping subproblems."
  },
  {
    question: "What is the time complexity of inserting a word of length L into a Trie?",
    options: ["O(N)", "O(L)", "O(L × N)", "O(log N)"],
    answer: 1,
    explanation: "In a Trie, inserting a word visits exactly L nodes (one per character). Each step is O(1) alphabet lookup. Total: **O(L)**, independent of how many other words exist in the Trie."
  },
  {
    question: "The Two Pointers technique on arrays reduces which time complexity?",
    options: ["O(N) to O(log N)", "O(N³) to O(N²)", "O(N²) to O(N)", "O(N) to O(1)"],
    answer: 2,
    explanation: "Two Pointers eliminates a nested loop by using two index pointers moving toward each other or both in the same direction. It typically reduces solutions from **O(N²) to O(N)**."
  },
  {
    question: "What data structure is best for implementing an LRU (Least Recently Used) Cache?",
    options: ["Array + Binary Search", "Max-Heap + HashMap", "Doubly Linked List + HashMap", "Trie + Stack"],
    answer: 2,
    explanation: "LRU Cache requires O(1) get and O(1) put. A **HashMap** provides O(1) key lookup, and a **Doubly Linked List** allows O(1) insertion/deletion at head/tail. Combined, they form the optimal LRU structure."
  },
  {
    question: "In Backtracking, when we 'undo' a choice before returning from a branch, this step is called:",
    options: ["Pruning", "Memoization", "Base Case", "Backtracking (undoing)"],
    answer: 3,
    explanation: "After exploring a recursive branch, we **undo the choice** (restore state) to allow the next choice to be explored from a clean state. This 'undo' step is the defining characteristic of Backtracking."
  },
  {
    question: "Which sorting algorithm is preferred for sorting Linked Lists?",
    options: ["Quick Sort", "Bubble Sort", "Merge Sort", "Counting Sort"],
    answer: 2,
    explanation: "**Merge Sort** is preferred for Linked Lists because it doesn't require random access (unlike Quick Sort's partitioning). It naturally works by splitting lists and merging, achieving O(N log N) without extra O(N) space."
  },
  {
    question: "Which of the following time complexities represents the fastest algorithm for extremely large inputs?",
    options: ["O(N log N)", "O(N)", "O(log N)", "O(1)"],
    answer: 3,
    explanation: "**O(1)** (Constant Time) is the fastest because the execution time remains exactly the same regardless of how massive the input data gets."
  },
  {
    question: "What is the most efficient approach to find the maximum sum of a contiguous subarray of fixed size K?",
    options: ["Sliding Window", "Two Pointers", "Dynamic Programming", "Binary Search"],
    answer: 0,
    explanation: "The **Sliding Window** technique maintains a running sum of the K elements. By sliding the window and adding the new element while subtracting the old one, it solves the problem in O(N) time."
  },
  {
    question: "Which algorithm is highly optimal for finding a pattern string of length M inside a massive text of length N?",
    options: ["Depth First Search", "KMP (Knuth-Morris-Pratt)", "Floyd's Algorithm", "Kadane's Algorithm"],
    answer: 1,
    explanation: "The **KMP algorithm** preprocesses the pattern to create an LPS (Longest Prefix Suffix) array. This avoids unnecessary re-evaluations and finds the substring in O(N + M) time."
  },
  {
    question: "Which problem is ideally solved using a Monotonic Stack?",
    options: ["Reversing a Linked List", "Validating Anagrams", "Finding the Next Greater Element", "Shortest Path in a Maze"],
    answer: 2,
    explanation: "A **Monotonic Stack** maintains elements in strict increasing or decreasing order. It is the optimal structure to find the 'Next Greater Element' or 'Next Smaller Element' in O(N) time."
  },
  {
    question: "How can you find the exact middle node of a Singly Linked List in a single pass?",
    options: ["By hashing all nodes", "By using a stack", "Fast (2 steps) and Slow (1 step) pointers", "It is impossible in one pass"],
    answer: 2,
    explanation: "Using the **Fast & Slow pointer** technique: when the fast pointer (moving 2 nodes at a time) reaches the end of the list, the slow pointer (moving 1 node at a time) will be exactly at the middle."
  },
  {
    question: "What happens when two different keys map to the exact same hash index in a Hash Table?",
    options: ["The program crashes", "The original key gets overwritten", "A Collision occurs and must be handled", "The table size is automatically doubled"],
    answer: 2,
    explanation: "A **Collision** occurs. This is normal and is typically handled by either **Chaining** (keeping a linked list at that index) or **Open Addressing** (finding the next available slot)."
  },
  {
    question: "If you perform an Inorder traversal on a valid Binary Search Tree, what is special about the resulting output?",
    options: ["The elements will be in random order", "The elements will be sorted in descending order", "The elements will be sorted in ascending order", "The root will always be printed first"],
    answer: 2,
    explanation: "An **Inorder Traversal** (Left-Root-Right) naturally visits the nodes of a BST from smallest to largest, resulting in an array sorted in **ascending order**."
  },
  {
    question: "What is the theoretical time complexity to build a Heap from an unsorted array of N elements?",
    options: ["O(1)", "O(N)", "O(log N)", "O(N log N)"],
    answer: 1,
    explanation: "While inserting elements one by one takes O(N log N), the bottom-up **'Heapify'** algorithm mathematically converges to a strict **O(N)** time complexity to build the entire heap."
  },
  {
    question: "A Trie data structure is most commonly used for which real-world application?",
    options: ["Social network connections", "Shortest path routing", "Database indexing", "Auto-complete and spell-checking"],
    answer: 3,
    explanation: "**Tries** (Prefix Trees) store characters on paths. Because they allow you to instantly find all words sharing a common prefix, they are incredibly efficient for **auto-complete** features."
  },
  {
    question: "In a Graph, which traversal algorithm is guaranteed to find the shortest path (fewest edges) between two nodes in an unweighted graph?",
    options: ["Depth First Search (DFS)", "Breadth First Search (BFS)", "Kruskal's Algorithm", "Topological Sort"],
    answer: 1,
    explanation: "**BFS** explores the graph layer by layer, radiating outward from the start. This guarantees that the first time you reach a destination node, it is via the shortest path in terms of edges."
  },
  {
    question: "When is Binary Search applicable on a simple array?",
    options: ["Always", "Only when the array has unique elements", "Only when the array is sorted", "Only when the array size is a power of 2"],
    answer: 2,
    explanation: "Binary search works by comparing the target to the middle element and mathematically discarding half the search space. This logic only holds true if the array is **sorted**."
  },
  {
    question: "Which of these sorting algorithms natively utilizes a Divide and Conquer methodology?",
    options: ["Selection Sort", "Merge Sort", "Bubble Sort", "Insertion Sort"],
    answer: 1,
    explanation: "**Merge Sort** recursively *divides* the array in half until single elements remain, and then *conquers* by merging the sorted halves back together."
  },
  {
    question: "What is a 'Base Case' in a recursive function?",
    options: ["The most complex part of the function", "A memory cache to store results", "The condition under which the function stops calling itself", "A variable that tracks recursion depth"],
    answer: 2,
    explanation: "A **Base Case** is the escape hatch. Without a condition that stops the recursion from calling itself, it would run infinitely and result in a Stack Overflow error."
  },
  {
    question: "The 'Bottom-Up' approach to Dynamic Programming is also formally known as:",
    options: ["Memoization", "Tabulation", "Branch and Bound", "Recursion"],
    answer: 1,
    explanation: "**Tabulation** solves DP problems iteratively by filling up an array or table starting from the smallest base cases, moving 'bottom-up' to the final answer."
  },
  {
    question: "A Greedy Algorithm makes choices based exclusively on:",
    options: ["The locally optimal choice at that specific moment", "Exploring all possible future outcomes", "Random selection to average out performance", "Looking back at previous mistakes"],
    answer: 0,
    explanation: "**Greedy algorithms** pick the best immediate (local) choice without worrying about the future, hoping that these local maximums lead to a globally optimal solution (e.g., giving change with the largest coins first)."
  }
];
