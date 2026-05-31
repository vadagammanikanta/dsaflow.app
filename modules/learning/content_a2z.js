export const curriculum = [

  // ══════════════════════════════════════════════════════
  //  PHASE 0 — PROGRAMMING FUNDAMENTALS (5 concepts + quiz)
  // ══════════════════════════════════════════════════════

  {
    id: "language-syntax",
    title: "Language Syntax & Data Types",
    category: "Fundamentals",
    phase: 0,
    difficulty: "Beginner",
    icon: "📝",
    iconColor: "cyan",
    summary: "Variables, primitive data types, type casting, and operators — the bedrock of every program.",
    readTime: "6 mins",
    details: `
      <h2>Language Syntax & Data Types</h2>
      <p>Before learning algorithms, you must understand how a programming language stores and processes data. Every variable has a <strong>type</strong> that determines how many bytes of memory it occupies and which operations are valid on it.</p>

      <h3>Primitive Data Types</h3>
      <table class="complexity-table">
        <thead><tr><th>Type</th><th>Size</th><th>Range (approx)</th><th>Example</th></tr></thead>
        <tbody>
          <tr><td><code>int</code></td><td>4 bytes</td><td>−2.1B to +2.1B</td><td>age = 25</td></tr>
          <tr><td><code>long</code></td><td>8 bytes</td><td>−9.2 × 10¹⁸ to +9.2 × 10¹⁸</td><td>population = 8_000_000_000</td></tr>
          <tr><td><code>float</code></td><td>4 bytes</td><td>±3.4 × 10³⁸ (7 sig. digits)</td><td>pi ≈ 3.1415927</td></tr>
          <tr><td><code>double</code></td><td>8 bytes</td><td>±1.8 × 10³⁰⁸ (15 sig. digits)</td><td>precise_pi = 3.141592653589793</td></tr>
          <tr><td><code>boolean</code></td><td>1 bit</td><td>true / false</td><td>isActive = true</td></tr>
          <tr><td><code>char</code></td><td>1-2 bytes</td><td>ASCII / Unicode character</td><td>grade = 'A'</td></tr>
          <tr><td><code>String</code></td><td>Variable</td><td>Sequence of chars</td><td>name = "Alice"</td></tr>
        </tbody>
      </table>

      <h3>Operators</h3>
      <ul>
        <li><strong>Arithmetic:</strong> <code>+  -  *  /  %  **</code> (power)</li>
        <li><strong>Comparison:</strong> <code>==  !=  &lt;  &gt;  &lt;=  &gt;=</code> → returns boolean</li>
        <li><strong>Logical:</strong> <code>&amp;&amp;  ||  !</code> → short-circuit evaluation</li>
        <li><strong>Bitwise:</strong> <code>&amp;  |  ^  ~  &lt;&lt;  &gt;&gt;</code> → operate on binary representation</li>
        <li><strong>Assignment:</strong> <code>=  +=  -=  *=  /=  %=</code></li>
      </ul>

      <h3>⚠️ Interview Traps</h3>
      <ul>
        <li><strong>Integer Overflow:</strong> <code>int max = 2147483647; max + 1</code> overflows to a negative number. Use <code>long</code> for large sums.</li>
        <li><strong>Integer Division:</strong> <code>5 / 2 = 2</code> (not 2.5) in most languages. Cast to float: <code>(float)5 / 2</code>.</li>
        <li><strong>Floating Point Precision:</strong> <code>0.1 + 0.2 ≠ 0.3</code> in binary. Never compare floats with <code>==</code>.</li>
        <li><strong>String vs char comparison:</strong> <code>'a' == "a"</code> is false in Java (primitive vs object).</li>
      </ul>
    `,
    code: {
      javascript: `// JavaScript is dynamically typed
let age = 25;             // number (int-like)
let price = 9.99;         // number (float-like)
let name = "Alice";       // string
let active = true;        // boolean
let nothing = null;       // null
let undef;                // undefined

// Type coercion trap: always use ===
console.log(1 == "1");   // true  (loose)
console.log(1 === "1");  // false (strict) ← use this

// Bitwise tricks (useful in DSA)
const isPowerOfTwo = n => n > 0 && (n & (n - 1)) === 0;
console.log(isPowerOfTwo(16)); // true
console.log(isPowerOfTwo(15)); // false

// Integer overflow guard
const MAX_INT = 2 ** 31 - 1;     // 2147483647
const safeAdd = (a, b) => BigInt(a) + BigInt(b); // use BigInt for huge numbers`,

      cpp: `#include <iostream>
#include <climits>
using namespace std;

int main() {
    int    a  = 2147483647;   // INT_MAX
    long   b  = 9999999999L;  // 10 digits — use long
    float  c  = 3.14f;
    double d  = 3.14159265358979;
    bool   e  = true;
    char   f  = 'A';

    // Overflow demo
    cout << a + 1 << endl; // -2147483648 (overflow!) 
    cout << (long)a + 1 << endl; // correct: 2147483648

    // Integer division
    cout << 5 / 2 << endl;         // 2
    cout << 5 / 2.0 << endl;       // 2.5

    // Bitwise
    int x = 12;  // 1100 in binary
    cout << (x >> 1) << endl; // 6  (right shift = divide by 2)
    cout << (x << 1) << endl; // 24 (left shift  = multiply by 2)
    return 0;
}`,

      java: `public class DataTypes {
    public static void main(String[] args) {
        int    a = Integer.MAX_VALUE; // 2147483647
        long   b = 10_000_000_000L;  // use L suffix!
        float  c = 3.14f;            // use f suffix!
        double d = 3.141592653589793;
        boolean e = true;
        char   f  = 'A';             // char is unsigned 16-bit in Java
        String s  = "Hello";

        // Overflow trap
        System.out.println(a + 1); // -2147483648 (overflow!)
        System.out.println((long)a + 1); // 2147483648 (safe)

        // String vs char
        System.out.println(f == 'A');    // true
        System.out.println(s.equals("Hello")); // true (never use == for Strings)

        // Useful constants
        System.out.println(Integer.MAX_VALUE); // 2147483647
        System.out.println(Integer.MIN_VALUE); // -2147483648
    }
}`,

      python: `# Python has arbitrary-precision integers — no overflow!
a = 10 ** 100   # valid: a googol
b = 3.14        # float (64-bit double internally)
c = True        # bool (subclass of int: True==1, False==0)
d = 'A'         # str (single character is still a str)
e = "Hello"     # str

# Type checking
print(type(a))  # <class 'int'>
print(type(b))  # <class 'float'>

# Integer division
print(5 // 2)   # 2   (floor division)
print(5 / 2)    # 2.5 (true division always)
print(-7 // 2)  # -4  (floors toward negative infinity!)

# Bitwise operations
x = 12           # 1100 in binary
print(x >> 1)    # 6
print(x << 1)    # 24
print(x & 3)     # 0  (12 & 3 = 1100 & 0011 = 0000)
print(x | 3)     # 15 (12 | 3 = 1100 | 0011 = 1111)

# Float precision trap
print(0.1 + 0.2)         # 0.30000000000000004
print(0.1 + 0.2 == 0.3)  # False!
print(abs(0.1+0.2 - 0.3) < 1e-9)  # True — correct comparison`
    }
  },

  {
    id: "control-structures",
    title: "Control Structures",
    category: "Fundamentals",
    phase: 0,
    difficulty: "Beginner",
    icon: "🔀",
    iconColor: "emerald",
    summary: "If/else, switch, for loops, while loops — directing program flow and mastering iteration patterns.",
    readTime: "7 mins",
    details: `
      <h2>Control Structures</h2>
      <p>Control structures determine the <strong>order in which statements execute</strong>. Mastering them is essential because every algorithm — from binary search to dynamic programming — is built from conditionals and loops.</p>

      <h3>Conditional Statements</h3>
      <ul>
        <li><strong>if / else if / else:</strong> Evaluates conditions in order; only one branch executes.</li>
        <li><strong>switch / match:</strong> Efficient multi-way branching when comparing one variable to many constants. Often compiles to a jump table — O(1) branching.</li>
        <li><strong>Ternary:</strong> <code>condition ? valueIfTrue : valueIfFalse</code> — compact but don't over-nest.</li>
      </ul>

      <h3>Loops & Their Complexities</h3>
      <table class="complexity-table">
        <thead><tr><th>Pattern</th><th>Iterations</th><th>Time</th><th>Use-case</th></tr></thead>
        <tbody>
          <tr><td>Single for loop</td><td>N</td><td><span class="complexity-badge complexity-yellow">O(N)</span></td><td>Linear scan, array traversal</td></tr>
          <tr><td>Nested for loop</td><td>N × M</td><td><span class="complexity-badge complexity-red">O(N²)</span></td><td>2D grid, brute force pairs</td></tr>
          <tr><td>Halving while loop</td><td>log N</td><td><span class="complexity-badge complexity-green">O(log N)</span></td><td>Binary search, divide & conquer</td></tr>
          <tr><td>Nested halving</td><td>N log N</td><td><span class="complexity-badge complexity-yellow">O(N log N)</span></td><td>Merge sort inner workings</td></tr>
        </tbody>
      </table>

      <h3>Loop Control Keywords</h3>
      <ul>
        <li><strong>break:</strong> Immediately exits the innermost loop.</li>
        <li><strong>continue:</strong> Skips the rest of the current iteration and jumps to the next.</li>
        <li><strong>return:</strong> Exits the entire function (useful to short-circuit inside a nested loop).</li>
      </ul>

      <h3>🎯 Interview Patterns Built on Loops</h3>
      <ul>
        <li><strong>Linear scan:</strong> <code>for i in range(n)</code> — find element, count, sum</li>
        <li><strong>Two-pointer convergence:</strong> <code>l=0, r=n-1; while l&lt;r</code></li>
        <li><strong>Sliding window:</strong> <code>for r in range(n): while invalid: l++</code></li>
        <li><strong>Floyd's cycle:</strong> <code>slow=fast=head; while fast &amp;&amp; fast.next</code></li>
      </ul>
    `,
    code: {
      javascript: `// ── Conditionals ──────────────────────────────
function classify(n) {
  if (n < 0) return "negative";
  else if (n === 0) return "zero";
  else if (n % 2 === 0) return "positive even";
  else return "positive odd";
}

// Short-circuit evaluation
const name = null;
const display = name || "Anonymous"; // "Anonymous"
const upper = name && name.toUpperCase(); // null (safe!)

// ── Loops ──────────────────────────────────────
// O(N): linear scan
for (let i = 0; i < n; i++) { /* ... */ }

// O(N²): all pairs
for (let i = 0; i < n; i++)
  for (let j = i + 1; j < n; j++) { /* ... */ }

// O(log N): halving
let lo = 0, hi = n - 1;
while (lo <= hi) {
  const mid = lo + Math.floor((hi - lo) / 2);
  // lo + (hi-lo)/2 avoids integer overflow vs (lo+hi)/2
  if (condition) hi = mid - 1;
  else lo = mid + 1;
}

// Loop control
for (let i = 0; i < n; i++) {
  if (arr[i] < 0) continue;  // skip negatives
  if (arr[i] === target) break; // found — stop
}`,

      cpp: `#include <iostream>
using namespace std;

int main() {
    // Switch (faster than if-chain for known constants)
    int day = 3;
    switch (day) {
        case 1: cout << "Monday"; break;
        case 2: cout << "Tuesday"; break;
        case 3: cout << "Wednesday"; break;
        default: cout << "Other"; break;
    }

    // Range-based for loop (C++11+)
    int arr[] = {1, 2, 3, 4, 5};
    for (int x : arr) cout << x << " ";

    // While halving — O(log N)
    int n = 1024;
    int steps = 0;
    while (n > 1) { n /= 2; steps++; }
    cout << steps; // 10 = log2(1024)

    // Nested loop with early exit
    bool found = false;
    for (int i = 0; i < 5 && !found; i++)
        for (int j = 0; j < 5 && !found; j++)
            if (arr[i] == 3) found = true;

    return 0;
}`,

      java: `public class ControlStructures {
    public static void main(String[] args) {
        // Enhanced switch (Java 14+)
        int month = 4;
        int days = switch (month) {
            case 1, 3, 5, 7, 8, 10, 12 -> 31;
            case 4, 6, 9, 11            -> 30;
            case 2                      -> 28; // simplify
            default                     -> throw new IllegalArgumentException();
        };
        System.out.println(days); // 30

        // For-each (enhanced for loop)
        int[] arr = {1, 2, 3, 4, 5};
        int sum = 0;
        for (int x : arr) sum += x;

        // Labeled break — exit nested loop from inner loop
        outer:
        for (int i = 0; i < 5; i++) {
            for (int j = 0; j < 5; j++) {
                if (i + j == 6) break outer; // exits both loops
            }
        }

        // do-while — always executes at least once
        int count = 0;
        do { count++; } while (count < 5);
        System.out.println(count); // 5
    }
}`,

      python: `# ── Conditionals ──────────────────────────────
x = 15
result = "big" if x > 10 else "small"  # ternary

# match statement (Python 3.10+)
command = "quit"
match command:
    case "quit":  print("Quitting...")
    case "start": print("Starting...")
    case _:       print("Unknown command")

# ── Loops ──────────────────────────────────────
# enumerate — get index and value
fruits = ["apple", "banana", "cherry"]
for i, fruit in enumerate(fruits):
    print(f"{i}: {fruit}")

# zip — iterate two lists together
keys   = ["a", "b", "c"]
values = [1,    2,   3  ]
for k, v in zip(keys, values):
    print(f"{k} → {v}")

# while halving — O(log N)
n = 1024
steps = 0
while n > 1:
    n //= 2
    steps += 1
print(steps)  # 10

# for-else — else runs if loop completed without break
for i in range(10):
    if i == 5:
        break
else:
    print("No break occurred")  # won't print (break at 5)`
    }
  },

  {
    id: "functions",
    title: "Functions & Scope",
    category: "Fundamentals",
    phase: 0,
    difficulty: "Beginner",
    icon: "⚙️",
    iconColor: "purple",
    summary: "Reusable code blocks. Parameters, return values, pass-by-value vs reference, closures, and scope rules.",
    readTime: "7 mins",
    details: `
      <h2>Functions & Scope</h2>
      <p>A function is a <strong>named, reusable block of code</strong> that performs a specific task. Understanding how data flows in and out of functions (especially pass-by-value vs reference) is critical in DSA, where you often modify arrays or objects in place.</p>

      <h3>Pass-by-Value vs Pass-by-Reference</h3>
      <table class="complexity-table">
        <thead><tr><th>What's passed</th><th>Behavior</th><th>Examples</th></tr></thead>
        <tbody>
          <tr><td>Primitive (int, float, bool, char)</td><td>Pass-by-value — copy is made, original unchanged</td><td>int, double, boolean</td></tr>
          <tr><td>Object / Array / Collection</td><td>Pass-by-reference — changes inside function affect original</td><td>int[], ArrayList, dict, list</td></tr>
          <tr><td>String (Java)</td><td>Immutable — effectively pass-by-value even though it's an object</td><td>String in Java/Python</td></tr>
        </tbody>
      </table>

      <h3>Scope Rules</h3>
      <ul>
        <li><strong>Global scope:</strong> Accessible everywhere. Avoid mutating global state in algorithms — causes bugs in recursive calls.</li>
        <li><strong>Local scope:</strong> Variables declared inside a function. Destroyed when the function returns.</li>
        <li><strong>Block scope (C++/Java/JS with let/const):</strong> Variables declared inside <code>{}</code> are not accessible outside.</li>
        <li><strong>Closure (JS/Python):</strong> An inner function that "captures" variables from its outer function's scope.</li>
      </ul>

      <h3>🎯 DSA-Specific Function Patterns</h3>
      <ul>
        <li><strong>Helper/Wrapper pattern:</strong> Public function sets up state; private recursive helper does the work.</li>
        <li><strong>In-place mutation:</strong> Modify array parameter directly instead of returning a new one to save O(N) space.</li>
        <li><strong>Accumulator parameter:</strong> Pass a running result to recursive calls to enable tail recursion.</li>
        <li><strong>Function pointers / lambda:</strong> Pass custom comparators to sorting functions.</li>
      </ul>
    `,
    code: {
      javascript: `// ── Pass-by-value vs reference ──────────────────
function addOne(x)  { x += 1; }           // primitives: no effect
function pushItem(arr, val) { arr.push(val); } // arrays: mutated!

let num = 5;
addOne(num);
console.log(num); // 5 — unchanged

let arr = [1, 2];
pushItem(arr, 3);
console.log(arr); // [1, 2, 3] — changed!

// ── Closures ────────────────────────────────────
function makeCounter() {
  let count = 0;               // captured by closure
  return () => ++count;        // inner function closes over count
}
const counter = makeCounter();
console.log(counter()); // 1
console.log(counter()); // 2

// ── DSA Wrapper Pattern ──────────────────────────
function longestPath(root) {           // public API
  let maxLen = 0;
  function dfs(node) {                 // private helper
    if (!node) return 0;
    const left  = dfs(node.left);
    const right = dfs(node.right);
    maxLen = Math.max(maxLen, left + right);
    return 1 + Math.max(left, right);
  }
  dfs(root);
  return maxLen;
}

// ── Higher-order functions ──────────────────────
const nums = [3, 1, 4, 1, 5, 9];
nums.sort((a, b) => a - b);         // custom comparator
const evens = nums.filter(n => n % 2 === 0);
const doubled = nums.map(n => n * 2);
const sum = nums.reduce((acc, n) => acc + n, 0);`,

      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

// Pass-by-value vs pass-by-reference
void byValue(int x)  { x = 99; }           // original unchanged
void byRef(int& x)   { x = 99; }           // original changed!
void byPtr(int* x)   { *x = 99; }          // pointer — also changes

// In-place array modification
void reverseArray(vector<int>& arr) {       // & means reference
    int l = 0, r = arr.size() - 1;
    while (l < r) swap(arr[l++], arr[r--]);
}

// Lambda (C++11) — inline anonymous function
auto compare = [](int a, int b) { return a > b; }; // descending sort
vector<int> v = {5, 2, 8, 1, 9};
sort(v.begin(), v.end(), compare);

// Accumulator pattern
int factorial(int n, int acc = 1) {
    return n <= 1 ? acc : factorial(n - 1, n * acc);
}

int main() {
    int x = 5;
    byValue(x); cout << x; // 5
    byRef(x);   cout << x; // 99
    return 0;
}`,

      java: `import java.util.Arrays;
import java.util.Comparator;

public class Functions {

    // Pass-by-value (primitives)
    static void addOne(int x) { x++; }  // no effect

    // Pass-by-reference (arrays / objects)
    static void reverseArray(int[] arr) {
        int l = 0, r = arr.length - 1;
        while (l < r) {
            int tmp = arr[l]; arr[l] = arr[r]; arr[r] = tmp;
            l++; r--;
        }
    }

    // Wrapper + recursive helper pattern
    public static int diameter(TreeNode root) {
        int[] maxDia = {0};       // effectively final — captured by lambda
        dfs(root, maxDia);
        return maxDia[0];
    }
    private static int dfs(TreeNode node, int[] maxDia) {
        if (node == null) return 0;
        int l = dfs(node.left, maxDia);
        int r = dfs(node.right, maxDia);
        maxDia[0] = Math.max(maxDia[0], l + r);
        return 1 + Math.max(l, r);
    }

    public static void main(String[] args) {
        // Lambda comparator (Java 8+)
        Integer[] nums = {5, 2, 8, 1};
        Arrays.sort(nums, (a, b) -> b - a); // descending
        System.out.println(Arrays.toString(nums)); // [8, 5, 2, 1]
    }
}`,

      python: `# ── Default & keyword arguments ──────────────────
def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"

print(greet("Alice"))             # Hello, Alice!
print(greet("Bob", "Hi"))         # Hi, Bob!

# ── *args and **kwargs ───────────────────────────
def total(*args):
    return sum(args)
print(total(1, 2, 3, 4, 5))      # 15

# ── Pass-by-reference for mutable types ──────────
def append_item(lst, item):
    lst.append(item)              # mutates original

nums = [1, 2, 3]
append_item(nums, 4)
print(nums)                       # [1, 2, 3, 4]

# ── Closures ─────────────────────────────────────
def make_adder(n):
    def add(x):                   # captures n from outer scope
        return x + n
    return add

add5 = make_adder(5)
print(add5(3))  # 8

# ── Lambda & higher-order ─────────────────────────
nums = [3, 1, 4, 1, 5, 9]
nums.sort(key=lambda x: -x)      # descending
evens   = list(filter(lambda x: x % 2 == 0, nums))
doubled = list(map(lambda x: x * 2, nums))
total   = sum(nums)

# ── Wrapper pattern ───────────────────────────────
def longest_path(root):
    max_len = [0]                 # list to allow mutation inside closure
    def dfs(node):
        if not node: return 0
        l, r = dfs(node.left), dfs(node.right)
        max_len[0] = max(max_len[0], l + r)
        return 1 + max(l, r)
    dfs(root)
    return max_len[0]`
    }
  },

  {
    id: "oop-basics",
    title: "OOP Basics",
    category: "Fundamentals",
    phase: 0,
    difficulty: "Intermediate",
    icon: "🏗️",
    iconColor: "amber",
    summary: "Classes, Objects, Constructors, Inheritance, Polymorphism — the foundation for implementing linked lists, trees, and graphs.",
    readTime: "8 mins",
    details: `
      <h2>Object-Oriented Programming</h2>
      <p>Almost every data structure — Linked List, Tree, Graph — requires defining a <strong>Node class</strong>. OOP concepts allow you to model real-world entities and build these structures cleanly.</p>

      <h3>The Four Pillars of OOP</h3>
      <ul>
        <li><strong>Encapsulation:</strong> Bundling data (fields) and behavior (methods) into one unit. Hide internal state — expose only what's necessary.</li>
        <li><strong>Inheritance:</strong> A child class inherits fields and methods from a parent. Promotes code reuse. Example: <code>BSTNode extends TreeNode</code>.</li>
        <li><strong>Polymorphism:</strong> One interface, many implementations. Method overriding lets a subclass provide its own version of a parent's method.</li>
        <li><strong>Abstraction:</strong> Hiding complexity. Expose a simple interface; hide the implementation details.</li>
      </ul>

      <h3>DSA Nodes — The Building Block</h3>
      <table class="complexity-table">
        <thead><tr><th>Structure</th><th>Node fields needed</th></tr></thead>
        <tbody>
          <tr><td>Singly Linked List</td><td><code>val</code>, <code>next</code></td></tr>
          <tr><td>Doubly Linked List</td><td><code>val</code>, <code>next</code>, <code>prev</code></td></tr>
          <tr><td>Binary Tree</td><td><code>val</code>, <code>left</code>, <code>right</code></td></tr>
          <tr><td>N-ary Tree / Trie</td><td><code>val</code>, <code>children[]</code> or <code>children{}</code></td></tr>
          <tr><td>Graph (adj. list)</td><td><code>id</code>, <code>neighbors[]</code></td></tr>
        </tbody>
      </table>

      <h3>🎯 Key Interview Insight</h3>
      <p>In coding interviews, you're <em>given</em> the Node class. Your job is to write algorithms that traverse or manipulate these nodes. Understanding constructors and <code>null</code>/<code>None</code> checks is critical to avoid NullPointerExceptions.</p>
    `,
    code: {
      javascript: `// ── Node Classes ────────────────────────────────
class ListNode {
  constructor(val = 0, next = null) {
    this.val  = val;
    this.next = next;
  }
}

class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val   = val;
    this.left  = left;
    this.right = right;
  }
}

// ── Inheritance ─────────────────────────────────
class Animal {
  constructor(name) { this.name = name; }
  speak() { return \`\${this.name} makes a sound.\`; }
}

class Dog extends Animal {
  speak() { return \`\${this.name} barks.\`; } // override
}

const d = new Dog("Rex");
console.log(d.speak()); // "Rex barks."

// ── Building a Linked List ───────────────────────
function buildList(values) {
  const dummy = new ListNode(0);
  let curr = dummy;
  for (const v of values) {
    curr.next = new ListNode(v);
    curr = curr.next;
  }
  return dummy.next;
}

const list = buildList([1, 2, 3, 4, 5]);
// 1 → 2 → 3 → 4 → 5 → null`,

      cpp: `#include <iostream>
using namespace std;

// Singly Linked List Node
struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
    ListNode(int x, ListNode* n) : val(x), next(n) {}
};

// Binary Tree Node
struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

// Inheritance: BalancedNode extends TreeNode
struct BalancedNode : public TreeNode {
    int height;
    BalancedNode(int x) : TreeNode(x), height(1) {}
};

// Virtual (polymorphism)
class Shape {
public:
    virtual double area() = 0; // pure virtual = abstract
};

class Circle : public Shape {
    double r;
public:
    Circle(double r) : r(r) {}
    double area() override { return 3.14159 * r * r; }
};`,

      java: `// Canonical LeetCode node definitions
class ListNode {
    int val;
    ListNode next;
    ListNode() {}
    ListNode(int val) { this.val = val; }
    ListNode(int val, ListNode next) { this.val = val; this.next = next; }
}

class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode() {}
    TreeNode(int val) { this.val = val; }
    TreeNode(int val, TreeNode left, TreeNode right) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

// Inheritance & Polymorphism
abstract class Shape {
    abstract double area(); // must be overridden
    void describe() { System.out.println("Area: " + area()); }
}

class Rectangle extends Shape {
    double w, h;
    Rectangle(double w, double h) { this.w = w; this.h = h; }
    @Override double area() { return w * h; }
}

// Generic Stack (type-safe)
class Stack<T> {
    private java.util.LinkedList<T> list = new java.util.LinkedList<>();
    void push(T item) { list.addFirst(item); }
    T    pop()        { return list.removeFirst(); }
    T    peek()       { return list.getFirst(); }
    boolean isEmpty() { return list.isEmpty(); }
}`,

      python: `# ── Node Definitions (match LeetCode exactly) ────
class ListNode:
    def __init__(self, val=0, next=None):
        self.val  = val
        self.next = next

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val   = val
        self.left  = left
        self.right = right

# ── Inheritance ────────────────────────────────── 
class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        return f"{self.name} makes a sound."

class Dog(Animal):
    def speak(self):                      # method overriding
        return f"{self.name} barks."

class Cat(Animal):
    def speak(self):
        return f"{self.name} meows."

animals = [Dog("Rex"), Cat("Whiskers")]
for a in animals:
    print(a.speak())                      # polymorphism!

# ── Build linked list from array ──────────────────
def build_list(values):
    dummy = ListNode(0)
    curr  = dummy
    for v in values:
        curr.next = ListNode(v)
        curr = curr.next
    return dummy.next

head = build_list([1, 2, 3, 4, 5])

# ── Dataclasses (Python 3.7+) ────────────────────
from dataclasses import dataclass

@dataclass
class Point:
    x: float
    y: float
    def distance(self, other):
        return ((self.x - other.x)**2 + (self.y - other.y)**2) ** 0.5`
    }
  },

  {
    id: "recursion-intro",
    title: "Recursion & the Call Stack",
    category: "Fundamentals",
    phase: 0,
    difficulty: "Intermediate",
    icon: "🔄",
    iconColor: "rose",
    summary: "How recursion works, the call stack, base cases, recursive thinking, and the risk of stack overflow.",
    readTime: "8 mins",
    details: `
      <h2>Recursion & the Call Stack</h2>
      <p>Recursion is a function calling itself with a <strong>smaller version of the same problem</strong> until it reaches a base case. It's the backbone of tree traversals, graph DFS, divide & conquer, and dynamic programming.</p>

      <h3>The Two Laws of Recursion</h3>
      <ul>
        <li><strong>1. Base Case:</strong> A condition that stops the recursion. Without it → infinite recursion → Stack Overflow.</li>
        <li><strong>2. Recursive Case:</strong> The function calls itself with a simpler/smaller input, moving closer to the base case.</li>
      </ul>

      <h3>How the Call Stack Works</h3>
      <p>Every function call pushes a <strong>stack frame</strong> onto the call stack. The frame stores local variables and the return address. When a function returns, its frame is popped. With deep recursion, the stack can overflow.</p>

      <h3>Recursion vs Iteration</h3>
      <table class="complexity-table">
        <thead><tr><th>Property</th><th>Recursion</th><th>Iteration</th></tr></thead>
        <tbody>
          <tr><td>Code readability</td><td>Often cleaner for trees/graphs</td><td>Better for flat loops</td></tr>
          <tr><td>Space complexity</td><td>O(depth) call stack overhead</td><td>O(1) typically</td></tr>
          <tr><td>Stack overflow risk</td><td>Yes (deep input)</td><td>No</td></tr>
          <tr><td>Performance</td><td>Slightly slower (function call overhead)</td><td>Faster</td></tr>
        </tbody>
      </table>

      <h3>🎯 Recognizing Recursive Structure</h3>
      <ul>
        <li>Problem can be split into <strong>identical subproblems</strong> on smaller input.</li>
        <li>Trees: "process root, then recurse on left and right subtrees"</li>
        <li>Graphs: "visit node, mark visited, recurse on unvisited neighbors"</li>
        <li>Backtracking: "try choice, recurse, undo choice"</li>
      </ul>
    `,
    code: {
      javascript: `// ── Factorial ──────────────────────────────────
function factorial(n) {
  if (n <= 1) return 1;         // base case
  return n * factorial(n - 1); // recursive case
}
// factorial(5) → 5 * factorial(4) → 5*4*3*2*1 = 120

// ── Fibonacci (naïve O(2^N) — shows overlapping subproblems)
function fib(n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
}

// ── Binary Search (recursive) ───────────────────
function binarySearch(arr, target, lo = 0, hi = arr.length - 1) {
  if (lo > hi) return -1;                     // base case: not found
  const mid = lo + Math.floor((hi - lo) / 2);
  if (arr[mid] === target) return mid;        // base case: found
  if (arr[mid] < target)  return binarySearch(arr, target, mid + 1, hi);
  return binarySearch(arr, target, lo, mid - 1);
}

// ── Tree Traversal (classic recursion) ──────────
function inorder(root, result = []) {
  if (!root) return result;    // base case: null node
  inorder(root.left, result);
  result.push(root.val);
  inorder(root.right, result);
  return result;
}

// ── Power of Two (recursive) ─────────────────────
function isPowerOfTwo(n) {
  if (n < 1) return false;   // base case: negative/zero
  if (n === 1) return true;  // base case: 1 = 2^0
  if (n % 2 !== 0) return false;
  return isPowerOfTwo(n / 2);
}`,

      cpp: `#include <iostream>
#include <vector>
using namespace std;

// Factorial — O(N) time, O(N) space (call stack)
long long factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

// Merge Sort — classic divide & conquer
void merge(vector<int>& arr, int l, int m, int r) {
    vector<int> left(arr.begin()+l, arr.begin()+m+1);
    vector<int> right(arr.begin()+m+1, arr.begin()+r+1);
    int i=0, j=0, k=l;
    while (i<left.size() && j<right.size())
        arr[k++] = (left[i]<=right[j]) ? left[i++] : right[j++];
    while (i<left.size())  arr[k++] = left[i++];
    while (j<right.size()) arr[k++] = right[j++];
}

void mergeSort(vector<int>& arr, int l, int r) {
    if (l >= r) return;           // base case
    int m = l + (r - l) / 2;
    mergeSort(arr, l, m);
    mergeSort(arr, m+1, r);
    merge(arr, l, m, r);
}

// Tail-recursive sum (some compilers optimize this)
int sumTail(int n, int acc = 0) {
    if (n == 0) return acc;
    return sumTail(n - 1, acc + n);
}`,

      java: `public class Recursion {

    // Fibonacci with memoization (top-down DP)
    static int[] memo = new int[101];

    static int fib(int n) {
        if (n <= 1) return n;
        if (memo[n] != 0) return memo[n];       // use cached result
        memo[n] = fib(n - 1) + fib(n - 2);     // cache before return
        return memo[n];
    }

    // Power function — O(log N) via fast exponentiation
    static double pow(double base, int exp) {
        if (exp == 0) return 1;                 // base case
        if (exp < 0) return 1.0 / pow(base, -exp);
        double half = pow(base, exp / 2);
        if (exp % 2 == 0) return half * half;   // even exponent
        return base * half * half;              // odd exponent
    }

    // Count total nodes in a binary tree — O(N)
    static int countNodes(TreeNode root) {
        if (root == null) return 0;
        return 1 + countNodes(root.left) + countNodes(root.right);
    }

    public static void main(String[] args) {
        System.out.println(fib(10));  // 55
        System.out.println(pow(2, 10)); // 1024.0
    }
}`,

      python: `import sys
sys.setrecursionlimit(10000)  # default is 1000 — increase for deep recursion

# ── Factorial ──────────────────────────────────
def factorial(n):
    if n <= 1: return 1           # base case
    return n * factorial(n - 1)  # recursive case

# ── Fibonacci (with memoization) ────────────────
from functools import lru_cache

@lru_cache(maxsize=None)          # Python's built-in memoization!
def fib(n):
    if n <= 1: return n
    return fib(n - 1) + fib(n - 2)

print(fib(50))  # instant — 12586269025

# ── Flatten nested list ──────────────────────────
def flatten(lst):
    result = []
    for item in lst:
        if isinstance(item, list):
            result.extend(flatten(item))  # recurse on sublists
        else:
            result.append(item)
    return result

print(flatten([1, [2, [3, 4], 5], 6]))  # [1, 2, 3, 4, 5, 6]

# ── Tower of Hanoi ────────────────────────────── 
def hanoi(n, source, dest, auxiliary):
    if n == 1:
        print(f"Move disk 1 from {source} to {dest}")
        return
    hanoi(n-1, source, auxiliary, dest)
    print(f"Move disk {n} from {source} to {dest}")
    hanoi(n-1, auxiliary, dest, source)

hanoi(3, 'A', 'C', 'B')  # 7 moves for 3 disks`
    }
  },

  // ── PHASE 0 QUIZ ──
  {
    id: "quiz-phase0",
    type: "quiz",
    phase: 0,
    difficulty: "Intermediate",
    title: "Phase 0 Quiz — Programming Fundamentals",
    category: "Fundamentals",
    icon: "🧪",
    iconColor: "cyan",
    questions: [
      {
        question: "What happens when you add 1 to Integer.MAX_VALUE (2147483647) in Java without casting?",
        options: ["Throws an exception", "Returns 2147483648", "Returns -2147483648 (integer overflow)", "Returns null"],
        answer: 2,
        explanation: "Java integers are 32-bit signed. Adding 1 to MAX_VALUE wraps around to MIN_VALUE (-2147483648). This is called integer overflow. Always cast to long: (long)Integer.MAX_VALUE + 1 = 2147483648."
      },
      {
        question: "In most languages, what is the result of 5 / 2 when both operands are integers?",
        options: ["2.5", "3", "2", "Compiler error"],
        answer: 2,
        explanation: "Integer division truncates the decimal part. 5 / 2 = 2 (not 2.5). To get 2.5, at least one operand must be a float: 5.0 / 2 or (double)5 / 2 in Java/C++, or use 5 / 2.0 in Python."
      },
      {
        question: "When you pass an array to a function in Java or JavaScript, what happens?",
        options: ["A copy of the array is made; the original is unchanged", "The function receives a reference; changes inside the function affect the original", "The array is converted to a string first", "Arrays cannot be passed to functions"],
        answer: 1,
        explanation: "Arrays and objects are passed by reference (or reference-by-value). The function receives a reference pointing to the same memory. Mutations inside the function (arr[0] = 99) affect the original array."
      },
      {
        question: "What is a Base Case in recursion?",
        options: ["The first call to the recursive function", "The condition that stops the recursion and returns a direct answer", "The function that calls itself the most times", "The default parameter value"],
        answer: 1,
        explanation: "A base case is the stopping condition. Without it, the function calls itself infinitely, eventually causing a StackOverflowError. Example: factorial(0) = 1 is the base case for the factorial function."
      },
      {
        question: "Which of these is the correct way to compare strings for equality in Java?",
        options: ['s1 == s2', 's1.equals(s2)', 's1 === s2', 'strcmp(s1, s2) == 0'],
        answer: 1,
        explanation: "In Java, == on String objects compares references (memory addresses), not content. Two different String objects with the same value have different addresses. Always use s1.equals(s2) to compare content."
      }
    ]
  },

  // ══════════════════════════════════════════════════════
  //  PHASE 1 — ALGORITHMIC COMPLEXITY (5 concepts + quiz)
  // ══════════════════════════════════════════════════════

  {
    id: "big-o",
    title: "Big O Notation",
    category: "Complexity",
    phase: 1,
    difficulty: "Beginner",
    icon: "📐",
    iconColor: "cyan",
    summary: "Measure algorithm efficiency with Big-O. Learn to read, analyze, and compare time & space complexities.",
    readTime: "8 mins",
    details: `
      <h2>Big O Notation</h2>
      <p>Big O describes the <strong>rate of growth</strong> of an algorithm's resource usage (time or space) as the input size N grows toward infinity. It ignores constants and focuses on the dominant term — giving us a language to objectively compare solutions.</p>

      <h3>Simplification Rules</h3>
      <ul>
        <li><strong>Drop constants:</strong> O(3N) → O(N). Hardware differences dwarf constant factors.</li>
        <li><strong>Drop lower-order terms:</strong> O(N² + N + 100) → O(N²). At large N, N² dominates.</li>
        <li><strong>Different inputs → different variables:</strong> Two separate loops over arrays A and B → O(A + B), not O(N).</li>
        <li><strong>Nested loops multiply:</strong> Loop inside loop → O(N × M). If both are N → O(N²).</li>
      </ul>

      <h3>Complexity Hierarchy (fastest to slowest)</h3>
      <table class="complexity-table">
        <thead><tr><th>Big O</th><th>Name</th><th>N=100</th><th>N=1000</th><th>Example</th></tr></thead>
        <tbody>
          <tr><td><span class="complexity-badge complexity-green">O(1)</span></td><td>Constant</td><td>1</td><td>1</td><td>Array access, hash lookup</td></tr>
          <tr><td><span class="complexity-badge complexity-green">O(log N)</span></td><td>Logarithmic</td><td>7</td><td>10</td><td>Binary search</td></tr>
          <tr><td><span class="complexity-badge complexity-green">O(N)</span></td><td>Linear</td><td>100</td><td>1,000</td><td>Linear scan</td></tr>
          <tr><td><span class="complexity-badge complexity-yellow">O(N log N)</span></td><td>Linearithmic</td><td>664</td><td>10,000</td><td>Merge sort, Heap sort</td></tr>
          <tr><td><span class="complexity-badge complexity-red">O(N²)</span></td><td>Quadratic</td><td>10,000</td><td>1,000,000</td><td>Bubble sort, brute-force pairs</td></tr>
          <tr><td><span class="complexity-badge complexity-red">O(2ᴺ)</span></td><td>Exponential</td><td>1.27×10³⁰</td><td>—</td><td>All subsets</td></tr>
          <tr><td><span class="complexity-badge complexity-red">O(N!)</span></td><td>Factorial</td><td>9.33×10¹⁵⁷</td><td>—</td><td>All permutations</td></tr>
        </tbody>
      </table>

      <h3>Space Complexity</h3>
      <ul>
        <li><strong>O(1) extra space:</strong> Only a few variables (in-place algorithms like two-pointer).</li>
        <li><strong>O(N) extra space:</strong> An array, stack, or recursion stack proportional to input.</li>
        <li><strong>O(N²) extra space:</strong> A 2D DP table for an N×N problem.</li>
        <li><strong>Note:</strong> The input itself is not counted in space complexity — only auxiliary memory you allocate.</li>
      </ul>

      <h3>🎯 How to Analyze Any Algorithm</h3>
      <ol>
        <li>Count the most deeply nested loop → that's usually the dominant term.</li>
        <li>Does the loop variable halve each iteration? → logarithmic.</li>
        <li>Does a recursive function split the problem into halves? → O(N log N) (Master Theorem).</li>
        <li>Does a recursive function branch into k subproblems without memoization? → often O(kᴺ).</li>
      </ol>
    `,
    code: {
      javascript: `// O(1) — constant time
const getFirst = arr => arr[0];
const hashLookup = (map, key) => map.get(key);

// O(log N) — logarithmic (binary search)
function binarySearch(arr, target) {
  let lo = 0, hi = arr.length - 1;
  while (lo <= hi) {
    const mid = lo + ((hi - lo) >> 1); // bit shift = fast floor div by 2
    if (arr[mid] === target) return mid;
    else if (arr[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}

// O(N) — linear
const findMax = arr => arr.reduce((m, x) => x > m ? x : m, -Infinity);

// O(N log N) — Merge Sort
function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = arr.length >> 1;
  const left  = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}
function merge(l, r) {
  const res = []; let i = 0, j = 0;
  while (i < l.length && j < r.length)
    res.push(l[i] <= r[j] ? l[i++] : r[j++]);
  return [...res, ...l.slice(i), ...r.slice(j)];
}

// O(N²) — nested loops (brute force pairs)
function hasDuplicate(arr) {
  for (let i = 0; i < arr.length; i++)
    for (let j = i + 1; j < arr.length; j++)
      if (arr[i] === arr[j]) return true;
  return false;
}
// ↑ Can be reduced to O(N) with a HashSet!

// O(2^N) — subsets
function allSubsets(arr) {
  if (!arr.length) return [[]];
  const [first, ...rest] = arr;
  const withoutFirst = allSubsets(rest);
  const withFirst = withoutFirst.map(s => [first, ...s]);
  return [...withoutFirst, ...withFirst];
}`,

      cpp: `#include <vector>
#include <algorithm>
using namespace std;

// Analyze: what is the Big O of this?
int mystery(vector<int>& arr, int n) {
    // Outer: N times
    for (int i = 0; i < n; i++) {
        // Inner: starts at i+1 (triangle pattern)
        for (int j = i + 1; j < n; j++) {
            // O(1) work
            if (arr[i] > arr[j]) swap(arr[i], arr[j]);
        }
    }
    return arr[0]; // Answer: O(N²) — selection sort!
}

// O(log N) — counting divisions
int countBits(int n) { // how many bits to represent n?
    int count = 0;
    while (n > 0) { n >>= 1; count++; } // n halves each time
    return count; // O(log N)
}

// Amortized O(1) — dynamic array resize
// std::vector doubles capacity when full
// N pushbacks: N total copies (geometric series) → O(1) amortized`,

      java: `import java.util.*;

public class BigOAnalysis {

    // Determine Big O before running!
    static int example1(int[] arr) {    // O(N)
        int sum = 0;
        for (int x : arr) sum += x;    // one loop over N elements
        return sum;
    }

    static boolean example2(int[] arr) { // O(N²)
        for (int i = 0; i < arr.length; i++)
            for (int j = 0; j < arr.length; j++)
                if (i != j && arr[i] == arr[j]) return true;
        return false;
    }

    // O(N) with HashSet — the optimized version
    static boolean hasDuplicate(int[] arr) {
        Set<Integer> seen = new HashSet<>();
        for (int x : arr) {
            if (!seen.add(x)) return true; // add returns false if duplicate
        }
        return false;
    }

    // Recursion analysis using Recurrence Relations
    // T(N) = 2*T(N/2) + O(N) → O(N log N) by Master Theorem
    static int[] sort(int[] arr) {
        if (arr.length <= 1) return arr;
        int mid = arr.length / 2;
        int[] left  = sort(Arrays.copyOfRange(arr, 0, mid));
        int[] right = sort(Arrays.copyOfRange(arr, mid, arr.length));
        return merge(left, right);
    }
    // (merge implementation omitted for brevity)
}`,

      python: `# ── Analyzing Time Complexity ────────────────────

# O(1) — hash table operations
freq = {}
freq['a'] = freq.get('a', 0) + 1  # O(1) average

# O(log N) — each iteration halves n
def count_digits_log(n):
    count = 0
    while n > 0:
        n //= 10
        count += 1
    return count  # O(log N)

# O(N log N) — sorted() uses Timsort
arr = [5, 2, 8, 1, 9, 3]
sorted_arr = sorted(arr)  # O(N log N) built-in

# O(N²) trap — string concatenation in loop!
# WRONG: O(N²) because strings are immutable
result = ""
for char in arr:
    result += str(char)   # creates new string each time!

# CORRECT: O(N) — use join
result = "".join(str(x) for x in arr)  # O(N)

# O(2^N) — all subsets
def subsets(nums):
    result = [[]]
    for num in nums:
        result += [curr + [num] for curr in result]
    return result

# Space complexity examples:
# O(1) extra: in-place two-pointer
# O(N) extra: creating output array, recursion stack depth N
# O(N²) extra: 2D DP table for LCS or Edit Distance`
    }
  },

  {
    id: "asymptotic-notation",
    title: "Asymptotic Notation (Big-Θ, Big-Ω)",
    category: "Complexity",
    phase: 1,
    difficulty: "Beginner",
    icon: "📈",
    iconColor: "emerald",
    summary: "Big-O (worst-case), Big-Omega (best-case), and Big-Theta (tight bound) — the full complexity picture.",
    readTime: "5 mins",
    details: `
      <h2>Asymptotic Notation</h2>
      <p>Big-O alone is not the full story. Three notations together give a complete analysis of any algorithm's behavior:</p>

      <h3>The Three Notations</h3>
      <table class="complexity-table">
        <thead><tr><th>Notation</th><th>Bound</th><th>Meaning</th><th>Interview relevance</th></tr></thead>
        <tbody>
          <tr><td><strong>O (Big-O)</strong></td><td>Upper bound</td><td>Algorithm runs <em>no worse than</em> this in worst-case</td><td>⭐⭐⭐⭐⭐ Most commonly used</td></tr>
          <tr><td><strong>Ω (Big-Omega)</strong></td><td>Lower bound</td><td>Algorithm runs <em>at least this well</em> in best-case</td><td>⭐⭐ Useful for proving optimality</td></tr>
          <tr><td><strong>Θ (Big-Theta)</strong></td><td>Tight bound</td><td>Algorithm runs <em>exactly this</em> — both upper and lower match</td><td>⭐⭐⭐ Most precise</td></tr>
        </tbody>
      </table>

      <h3>Practical Examples</h3>
      <table class="complexity-table">
        <thead><tr><th>Algorithm</th><th>Best (Ω)</th><th>Average (Θ)</th><th>Worst (O)</th></tr></thead>
        <tbody>
          <tr><td>Linear Search</td><td>Ω(1) — found at index 0</td><td>Θ(N/2) → Θ(N)</td><td>O(N) — last element or not found</td></tr>
          <tr><td>Binary Search</td><td>Ω(1) — found at midpoint</td><td>Θ(log N)</td><td>O(log N)</td></tr>
          <tr><td>Bubble Sort</td><td>Ω(N) — already sorted (optimized)</td><td>Θ(N²)</td><td>O(N²)</td></tr>
          <tr><td>Merge Sort</td><td>Ω(N log N)</td><td>Θ(N log N)</td><td>O(N log N) ← always!</td></tr>
          <tr><td>Quick Sort</td><td>Ω(N log N)</td><td>Θ(N log N)</td><td>O(N²) — sorted array with bad pivot</td></tr>
          <tr><td>Hash Table Lookup</td><td>Ω(1)</td><td>Θ(1)</td><td>O(N) — all keys collide</td></tr>
        </tbody>
      </table>

      <h3>Why Worst-Case Matters in Interviews</h3>
      <p>In system design, you must plan for worst-case. If an API endpoint can theoretically take O(N²) time, a malicious user can craft an input that exhausts your server. Always quote worst-case Big-O in interviews unless asked otherwise.</p>
    `,
    code: {
      javascript: `// Demonstrating best vs worst case
function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i; // best case: i=0 → O(1)
  }
  return -1; // worst case: O(N)
}

// Quick Sort — average O(N log N), worst O(N²)
function quickSort(arr, lo = 0, hi = arr.length - 1) {
  if (lo >= hi) return;
  // Randomized pivot → avoids worst case on sorted input
  const randIdx = lo + Math.floor(Math.random() * (hi - lo + 1));
  [arr[randIdx], arr[hi]] = [arr[hi], arr[randIdx]]; // swap to end
  
  const pivot = arr[hi];
  let p = lo;
  for (let i = lo; i < hi; i++) {
    if (arr[i] <= pivot) [arr[p++], arr[i]] = [arr[i], arr[p]];
  }
  [arr[p], arr[hi]] = [arr[hi], arr[p]];
  
  quickSort(arr, lo, p - 1);
  quickSort(arr, p + 1, hi);
}

// Insertion Sort — Ω(N) best case (already sorted)
function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;
    // If already sorted → inner while never runs → O(N) total
    while (j >= 0 && arr[j] > key) { arr[j + 1] = arr[j]; j--; }
    arr[j + 1] = key;
  }
  return arr;
}`,
      cpp: `// Bubble Sort with early-exit optimization
// Best case: O(N) when already sorted
// Worst case: O(N²) when reverse sorted
void bubbleSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        bool swapped = false;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j+1]) {
                swap(arr[j], arr[j+1]);
                swapped = true;
            }
        }
        if (!swapped) break; // already sorted — Ω(N) best case!
    }
}`,
      java: `// Sorting algorithm complexity summary
import java.util.Arrays;
import java.util.Random;

public class SortingComplexity {
    static Random rng = new Random();

    // Randomized Quick Sort — O(N log N) expected, avoids O(N²) worst case
    static void quickSort(int[] arr, int lo, int hi) {
        if (lo >= hi) return;
        int pivotIdx = lo + rng.nextInt(hi - lo + 1); // random pivot
        swap(arr, pivotIdx, hi);
        int p = partition(arr, lo, hi);
        quickSort(arr, lo, p - 1);
        quickSort(arr, p + 1, hi);
    }
    static int partition(int[] arr, int lo, int hi) {
        int pivot = arr[hi], p = lo;
        for (int i = lo; i < hi; i++)
            if (arr[i] <= pivot) swap(arr, p++, i);
        swap(arr, p, hi);
        return p;
    }
    static void swap(int[] arr, int i, int j) {
        int t = arr[i]; arr[i] = arr[j]; arr[j] = t;
    }
}`,
      python: `# Demonstrating how input affects complexity

import random
import time

def insertion_sort(arr):
    # Best case: already sorted → O(N)
    # Worst case: reverse sorted → O(N²)
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr

# Best case: already sorted
arr_sorted = list(range(1000))
start = time.time()
insertion_sort(arr_sorted)
print(f"Sorted input: {time.time()-start:.4f}s")   # very fast (Ω(N))

# Worst case: reverse sorted
arr_reversed = list(range(1000, 0, -1))
start = time.time()
insertion_sort(arr_reversed)
print(f"Reversed input: {time.time()-start:.4f}s") # much slower (O(N²))

# Key takeaway: always quote worst-case in interviews
# unless the algorithm is provably Θ (same in all cases) like Merge Sort`
    }
  },

  {
    id: "arrays",
    title: "Arrays",
    category: "Linear Structures",
    phase: 1,
    difficulty: "Beginner",
    icon: "📦",
    iconColor: "purple",
    summary: "Contiguous memory, random access, two-pointer, sliding window, prefix sums, Kadane's algorithm.",
    readTime: "9 mins",
    details: `
      <h2>Arrays</h2>
      <p>An array stores elements in <strong>contiguous memory</strong>, allowing O(1) random access by index. The address of <code>arr[i]</code> is computed as <code>base_address + i × element_size</code>, making index access instant.</p>

      <h3>Time Complexities</h3>
      <table class="complexity-table">
        <thead><tr><th>Operation</th><th>Time</th><th>Why</th></tr></thead>
        <tbody>
          <tr><td>Access arr[i]</td><td><span class="complexity-badge complexity-green">O(1)</span></td><td>Direct address calculation</td></tr>
          <tr><td>Update arr[i]</td><td><span class="complexity-badge complexity-green">O(1)</span></td><td>Direct address write</td></tr>
          <tr><td>Search (unsorted)</td><td><span class="complexity-badge complexity-yellow">O(N)</span></td><td>Must check each element</td></tr>
          <tr><td>Search (sorted)</td><td><span class="complexity-badge complexity-green">O(log N)</span></td><td>Binary search</td></tr>
          <tr><td>Insert at end</td><td><span class="complexity-badge complexity-green">O(1)</span> amortized</td><td>Dynamic array doubling</td></tr>
          <tr><td>Insert at index i</td><td><span class="complexity-badge complexity-yellow">O(N)</span></td><td>Must shift N-i elements right</td></tr>
          <tr><td>Delete at index i</td><td><span class="complexity-badge complexity-yellow">O(N)</span></td><td>Must shift N-i elements left</td></tr>
        </tbody>
      </table>

      <h3>🎯 Must-Know Array Patterns</h3>
      <ul>
        <li><strong>Two Pointers (opposite ends):</strong> Reduce O(N²) brute force to O(N). Requires sorted array for many problems.</li>
        <li><strong>Two Pointers (same direction / fast-slow):</strong> Remove duplicates, cycle detection.</li>
        <li><strong>Sliding Window:</strong> Fixed or variable-size window. Problems: max sum subarray of size k, longest substring without repeating chars.</li>
        <li><strong>Prefix Sums:</strong> Precompute prefix[i] = sum(arr[0..i-1]). Range sum query becomes O(1): sum(l,r) = prefix[r+1] - prefix[l].</li>
        <li><strong>Kadane's Algorithm:</strong> Maximum subarray sum in O(N). Key insight: extend previous subarray only if it's positive.</li>
      </ul>
    `,
    code: {
      javascript: `// ── Prefix Sums — O(N) build, O(1) query ──────────
function buildPrefix(arr) {
  const prefix = new Array(arr.length + 1).fill(0);
  for (let i = 0; i < arr.length; i++)
    prefix[i + 1] = prefix[i] + arr[i];
  return prefix;
}
function rangeSum(prefix, l, r) {
  return prefix[r + 1] - prefix[l]; // inclusive [l, r]
}

// ── Kadane's Algorithm — Max Subarray Sum O(N) ────
function maxSubarraySum(arr) {
  let maxSum = arr[0], currSum = arr[0];
  for (let i = 1; i < arr.length; i++) {
    // Extend current subarray or start fresh at arr[i]
    currSum = Math.max(arr[i], currSum + arr[i]);
    maxSum  = Math.max(maxSum, currSum);
  }
  return maxSum;
}

// ── Sliding Window — max sum of k elements ────────
function maxSumKWindow(arr, k) {
  let windowSum = arr.slice(0, k).reduce((a, b) => a + b, 0);
  let maxSum = windowSum;
  for (let i = k; i < arr.length; i++) {
    windowSum += arr[i] - arr[i - k]; // add right, remove left
    maxSum = Math.max(maxSum, windowSum);
  }
  return maxSum;
}

// ── Two Pointer — Two Sum II (sorted array) ───────
function twoSumSorted(arr, target) {
  let l = 0, r = arr.length - 1;
  while (l < r) {
    const sum = arr[l] + arr[r];
    if (sum === target) return [l + 1, r + 1]; // 1-indexed
    else if (sum < target) l++;
    else r--;
  }
  return [];
}

// ── Two Pointer — remove duplicates in-place ──────
function removeDuplicates(arr) {
  if (!arr.length) return 0;
  let slow = 0;
  for (let fast = 1; fast < arr.length; fast++) {
    if (arr[fast] !== arr[slow]) arr[++slow] = arr[fast];
  }
  return slow + 1; // length of unique subarray
}`,

      cpp: `#include <vector>
#include <algorithm>
#include <numeric>
using namespace std;

// Prefix Sum for O(1) range queries
class NumArray {
    vector<int> prefix;
public:
    NumArray(vector<int>& nums) {
        prefix.resize(nums.size() + 1, 0);
        for (int i = 0; i < nums.size(); i++)
            prefix[i+1] = prefix[i] + nums[i];
    }
    int sumRange(int l, int r) { return prefix[r+1] - prefix[l]; }
};

// Kadane's Algorithm
int maxSubArray(vector<int>& nums) {
    int maxSum = nums[0], currSum = nums[0];
    for (int i = 1; i < nums.size(); i++) {
        currSum = max(nums[i], currSum + nums[i]);
        maxSum  = max(maxSum, currSum);
    }
    return maxSum;
}

// Dutch National Flag (3-way partition) — O(N), O(1)
// Sort array containing only 0s, 1s, 2s
void sortColors(vector<int>& arr) {
    int lo = 0, mid = 0, hi = arr.size() - 1;
    while (mid <= hi) {
        if      (arr[mid] == 0) swap(arr[lo++], arr[mid++]);
        else if (arr[mid] == 1) mid++;
        else                    swap(arr[mid],  arr[hi--]);
    }
}`,

      java: `import java.util.*;

public class ArrayPatterns {

    // Two Sum (unsorted) — O(N) with HashMap
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement))
                return new int[]{map.get(complement), i};
            map.put(nums[i], i);
        }
        return new int[]{};
    }

    // Sliding Window — Longest subarray with sum ≤ k
    public int longestSubarraySum(int[] arr, int k) {
        int l = 0, sum = 0, maxLen = 0;
        for (int r = 0; r < arr.length; r++) {
            sum += arr[r];
            while (sum > k) sum -= arr[l++]; // shrink window
            maxLen = Math.max(maxLen, r - l + 1);
        }
        return maxLen;
    }

    // Product except self — O(N), O(1) extra space
    public int[] productExceptSelf(int[] nums) {
        int n = nums.length;
        int[] result = new int[n];
        result[0] = 1;
        // Left pass: result[i] = product of all nums[j] where j < i
        for (int i = 1; i < n; i++) result[i] = result[i-1] * nums[i-1];
        // Right pass: multiply by product of all nums[j] where j > i
        int right = 1;
        for (int i = n-1; i >= 0; i--) {
            result[i] *= right;
            right *= nums[i];
        }
        return result;
    }
}`,

      python: `from typing import List

# ── Prefix Sum ────────────────────────────────────
def build_prefix(arr: List[int]) -> List[int]:
    prefix = [0] * (len(arr) + 1)
    for i, x in enumerate(arr):
        prefix[i+1] = prefix[i] + x
    return prefix

def range_sum(prefix, l, r):  # inclusive [l, r]
    return prefix[r+1] - prefix[l]

# ── Kadane's Algorithm ────────────────────────────
def max_subarray(nums: List[int]) -> int:
    max_sum = curr_sum = nums[0]
    for x in nums[1:]:
        curr_sum = max(x, curr_sum + x)
        max_sum  = max(max_sum, curr_sum)
    return max_sum

# ── Two Pointer — Container with Most Water ───────
def max_water(height: List[int]) -> int:
    l, r = 0, len(height) - 1
    max_vol = 0
    while l < r:
        vol = (r - l) * min(height[l], height[r])
        max_vol = max(max_vol, vol)
        if height[l] < height[r]: l += 1
        else: r -= 1
    return max_vol

# ── Sliding Window — Longest substring no repeats ─
def length_of_longest_substring(s: str) -> int:
    char_idx = {}
    l = max_len = 0
    for r, ch in enumerate(s):
        if ch in char_idx and char_idx[ch] >= l:
            l = char_idx[ch] + 1  # shrink window from left
        char_idx[ch] = r
        max_len = max(max_len, r - l + 1)
    return max_len

# ── Rotate array in-place — O(N) time, O(1) space ─
def rotate(nums: List[int], k: int) -> None:
    n = len(nums)
    k %= n
    nums.reverse()          # reverse all
    nums[:k] = nums[:k][::-1]  # reverse first k
    nums[k:]  = nums[k:][::-1] # reverse rest`
    }
  },

  {
    id: "strings",
    title: "Strings",
    category: "Linear Structures",
    phase: 1,
    difficulty: "Beginner",
    icon: "🔤",
    iconColor: "rose",
    summary: "String immutability, character arrays, hashing, sliding window, two-pointer, and pattern matching fundamentals.",
    readTime: "8 mins",
    details: `
      <h2>Strings</h2>
      <p>A string is a <strong>sequence of characters</strong>. In most languages, strings are <strong>immutable</strong> — you cannot change individual characters. Every "modification" creates a new string, which has crucial performance implications.</p>

      <h3>Immutability & String Building</h3>
      <ul>
        <li>Concatenating inside a loop: <code>s += char</code> → O(N²) total because each concatenation copies the entire string.</li>
        <li>Correct approach: Use a <strong>StringBuilder</strong> (Java), <strong>list + join</strong> (Python), or char array (C++) for O(N) building.</li>
      </ul>

      <h3>String Time Complexities</h3>
      <table class="complexity-table">
        <thead><tr><th>Operation</th><th>Time</th><th>Note</th></tr></thead>
        <tbody>
          <tr><td>Access char at index</td><td><span class="complexity-badge complexity-green">O(1)</span></td><td>Strings indexed like arrays</td></tr>
          <tr><td>Length</td><td><span class="complexity-badge complexity-green">O(1)</span></td><td>Cached in modern languages</td></tr>
          <tr><td>Concatenation</td><td><span class="complexity-badge complexity-yellow">O(N)</span></td><td>Creates new string each time</td></tr>
          <tr><td>Substring</td><td><span class="complexity-badge complexity-yellow">O(K)</span></td><td>K = length of substring</td></tr>
          <tr><td>String comparison</td><td><span class="complexity-badge complexity-yellow">O(N)</span></td><td>Compares char by char</td></tr>
          <tr><td>Naive pattern search</td><td><span class="complexity-badge complexity-red">O(N×M)</span></td><td>N = text length, M = pattern</td></tr>
          <tr><td>KMP / Rabin-Karp</td><td><span class="complexity-badge complexity-yellow">O(N+M)</span></td><td>Advanced pattern matching</td></tr>
        </tbody>
      </table>

      <h3>🎯 Key String Interview Patterns</h3>
      <ul>
        <li><strong>Frequency array (ASCII trick):</strong> <code>int[26]</code> for lowercase letters. O(1) space.</li>
        <li><strong>HashMap for frequency:</strong> For arbitrary characters (Unicode).</li>
        <li><strong>Two Pointers:</strong> Valid palindrome, reverse words.</li>
        <li><strong>Sliding Window:</strong> Longest substring without repeats, minimum window substring.</li>
        <li><strong>String parsing:</strong> Split by delimiter, trim whitespace, atoi (string to integer).</li>
      </ul>
    `,
    code: {
      javascript: `// ── String Building — O(N) not O(N²) ────────────
// WRONG: O(N²)
let bad = "";
for (const ch of "hello world") bad += ch;

// CORRECT: O(N)
const chars = [];
for (const ch of "hello world") chars.push(ch);
const good = chars.join("");

// ── Frequency counting ────────────────────────────
function charFrequency(s) {
  const freq = {};
  for (const c of s) freq[c] = (freq[c] || 0) + 1;
  return freq;
}

// ── Valid Anagram — O(N) ──────────────────────────
function isAnagram(s, t) {
  if (s.length !== t.length) return false;
  const count = new Array(26).fill(0);
  for (let i = 0; i < s.length; i++) {
    count[s.charCodeAt(i) - 97]++;
    count[t.charCodeAt(i) - 97]--;
  }
  return count.every(c => c === 0);
}

// ── Valid Palindrome — two pointer O(N) ──────────
function isPalindrome(s) {
  const clean = s.toLowerCase().replace(/[^a-z0-9]/g, '');
  let l = 0, r = clean.length - 1;
  while (l < r) {
    if (clean[l] !== clean[r]) return false;
    l++; r--;
  }
  return true;
}

// ── atoi (string → integer) ───────────────────────
function myAtoi(s) {
  let i = 0, sign = 1, result = 0;
  while (i < s.length && s[i] === ' ') i++;     // skip spaces
  if (s[i] === '-' || s[i] === '+') sign = s[i++] === '-' ? -1 : 1;
  while (i < s.length && s[i] >= '0' && s[i] <= '9') {
    result = result * 10 + (s.charCodeAt(i++) - 48);
    if (result * sign > 2 ** 31 - 1) return 2 ** 31 - 1;
    if (result * sign < -(2 ** 31)) return -(2 ** 31);
  }
  return result * sign;
}`,

      cpp: `#include <string>
#include <unordered_map>
#include <algorithm>
using namespace std;

// Check anagram using frequency array O(N)
bool isAnagram(string s, string t) {
    if (s.size() != t.size()) return false;
    int freq[26] = {};
    for (char c : s) freq[c - 'a']++;
    for (char c : t) if (--freq[c - 'a'] < 0) return false;
    return true;
}

// Longest palindromic substring — O(N²) expand around center
string longestPalindrome(string s) {
    int n = s.size(), start = 0, maxLen = 1;
    auto expand = [&](int l, int r) {
        while (l >= 0 && r < n && s[l] == s[r]) { l--; r++; }
        if (r - l - 1 > maxLen) { maxLen = r-l-1; start = l+1; }
    };
    for (int i = 0; i < n; i++) {
        expand(i, i);     // odd length
        expand(i, i+1);   // even length
    }
    return s.substr(start, maxLen);
}

// StringBuilder equivalent: using string reserve
string buildString(int n) {
    string result;
    result.reserve(n);  // preallocate — avoids O(N²) reallocations
    for (int i = 0; i < n; i++) result += 'a';
    return result;
}`,

      java: `import java.util.*;

public class StringPatterns {

    // StringBuilder — O(N) string building
    public String reverseWords(String s) {
        String[] words = s.trim().split("\\\\s+");
        StringBuilder sb = new StringBuilder();
        for (int i = words.length - 1; i >= 0; i--) {
            sb.append(words[i]);
            if (i > 0) sb.append(' ');
        }
        return sb.toString();
    }

    // Minimum Window Substring — O(N)
    public String minWindow(String s, String t) {
        int[] need = new int[128], have = new int[128];
        for (char c : t.toCharArray()) need[c]++;
        int formed = 0, required = (int) t.chars().distinct().count();
        int l = 0, minLen = Integer.MAX_VALUE, minL = 0;
        for (int r = 0; r < s.length(); r++) {
            char rc = s.charAt(r);
            have[rc]++;
            if (need[rc] > 0 && have[rc] == need[rc]) formed++;
            while (formed == required) {
                if (r - l + 1 < minLen) { minLen = r - l + 1; minL = l; }
                char lc = s.charAt(l++);
                if (need[lc] > 0 && --have[lc] < need[lc]) formed--;
            }
        }
        return minLen == Integer.MAX_VALUE ? "" : s.substring(minL, minL + minLen);
    }

    // Group Anagrams — O(N * K log K) where K = avg string length
    public List<List<String>> groupAnagrams(String[] strs) {
        Map<String, List<String>> map = new HashMap<>();
        for (String s : strs) {
            char[] chars = s.toCharArray();
            Arrays.sort(chars);
            String key = new String(chars);
            map.computeIfAbsent(key, k -> new ArrayList<>()).add(s);
        }
        return new ArrayList<>(map.values());
    }
}`,

      python: `# ── String Building — join is O(N), + is O(N²) ────
# WRONG
result = ""
for i in range(1000):
    result += "a"   # O(N²) total!

# CORRECT
parts = []
for i in range(1000):
    parts.append("a")
result = "".join(parts)  # O(N)

# ── Group Anagrams ────────────────────────────────
from collections import defaultdict

def group_anagrams(strs):
    groups = defaultdict(list)
    for s in strs:
        key = tuple(sorted(s))  # sorted chars as key
        groups[key].append(s)
    return list(groups.values())

# ── Sliding window — min window substring ─────────
from collections import Counter

def min_window(s: str, t: str) -> str:
    if not t: return ""
    need = Counter(t)
    have, required = {}, len(need)
    formed = 0
    l, min_len, min_l = 0, float('inf'), 0
    for r, ch in enumerate(s):
        have[ch] = have.get(ch, 0) + 1
        if ch in need and have[ch] == need[ch]:
            formed += 1
        while formed == required:
            if r - l + 1 < min_len:
                min_len = r - l + 1
                min_l = l
            lch = s[l]; l += 1
            have[lch] -= 1
            if lch in need and have[lch] < need[lch]:
                formed -= 1
    return "" if min_len == float('inf') else s[min_l:min_l+min_len]

# ── KMP Pattern Search — O(N+M) ──────────────────
def kmp_search(text: str, pattern: str) -> list:
    n, m = len(text), len(pattern)
    if m == 0: return []
    # Build failure function
    fail = [0] * m
    j = 0
    for i in range(1, m):
        while j > 0 and pattern[i] != pattern[j]: j = fail[j-1]
        if pattern[i] == pattern[j]: j += 1
        fail[i] = j
    # Search
    j, results = 0, []
    for i in range(n):
        while j > 0 and text[i] != pattern[j]: j = fail[j-1]
        if text[i] == pattern[j]: j += 1
        if j == m:
            results.append(i - m + 1)
            j = fail[j-1]
    return results`
    }
  },

  {
    id: "searching",
    title: "Searching Algorithms",
    category: "Algorithms",
    phase: 1,
    difficulty: "Beginner",
    icon: "🔍",
    iconColor: "amber",
    summary: "Linear Search O(N), Binary Search O(log N), Jump Search, Exponential Search, and Ternary Search.",
    readTime: "7 mins",
    details: `
      <h2>Searching Algorithms</h2>
      <p>Searching is finding the position of a target value within a collection. The choice of algorithm depends on whether the data is <strong>sorted</strong> and the size of the dataset.</p>

      <h3>Algorithm Comparison</h3>
      <table class="complexity-table">
        <thead><tr><th>Algorithm</th><th>Best</th><th>Average</th><th>Worst</th><th>Space</th><th>Requires Sorted?</th></tr></thead>
        <tbody>
          <tr><td>Linear Search</td><td><span class="complexity-badge complexity-green">O(1)</span></td><td><span class="complexity-badge complexity-yellow">O(N)</span></td><td><span class="complexity-badge complexity-yellow">O(N)</span></td><td>O(1)</td><td>No</td></tr>
          <tr><td>Binary Search</td><td><span class="complexity-badge complexity-green">O(1)</span></td><td><span class="complexity-badge complexity-green">O(log N)</span></td><td><span class="complexity-badge complexity-green">O(log N)</span></td><td>O(1)</td><td>Yes ✓</td></tr>
          <tr><td>Jump Search</td><td><span class="complexity-badge complexity-green">O(1)</span></td><td><span class="complexity-badge complexity-green">O(√N)</span></td><td><span class="complexity-badge complexity-green">O(√N)</span></td><td>O(1)</td><td>Yes ✓</td></tr>
          <tr><td>Interpolation Search</td><td><span class="complexity-badge complexity-green">O(1)</span></td><td><span class="complexity-badge complexity-green">O(log log N)</span></td><td><span class="complexity-badge complexity-yellow">O(N)</span></td><td>O(1)</td><td>Yes + Uniform ✓</td></tr>
        </tbody>
      </table>

      <h3>Binary Search Deep Dive</h3>
      <p>Binary search is not just for sorted arrays. It can be applied to any <strong>monotonic function</strong>:</p>
      <ul>
        <li><strong>Classic:</strong> Target in sorted array.</li>
        <li><strong>Search space reduction:</strong> Rotated sorted array, find peak element.</li>
        <li><strong>Binary search on answer:</strong> "Find minimum maximum" problems — binary search the answer, check feasibility in O(N).</li>
        <li><strong>Boundary finding:</strong> First/last occurrence of a value. Use left-biased or right-biased templates.</li>
      </ul>

      <h3>⚠️ Common Binary Search Bug</h3>
      <p>Never use <code>mid = (lo + hi) / 2</code> — can overflow when lo and hi are large integers. Always use <code>mid = lo + (hi - lo) / 2</code>.</p>
    `,
    code: {
      javascript: `// ── Linear Search — O(N) ─────────────────────────
function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++)
    if (arr[i] === target) return i;
  return -1;
}

// ── Binary Search Templates ───────────────────────

// Template 1: Find exact target
function binarySearch(arr, target) {
  let lo = 0, hi = arr.length - 1;
  while (lo <= hi) {
    const mid = lo + ((hi - lo) >> 1); // safe midpoint
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}

// Template 2: First occurrence (left boundary)
function firstOccurrence(arr, target) {
  let lo = 0, hi = arr.length - 1, result = -1;
  while (lo <= hi) {
    const mid = lo + ((hi - lo) >> 1);
    if (arr[mid] === target) { result = mid; hi = mid - 1; } // keep searching left
    else if (arr[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return result;
}

// Template 3: Last occurrence (right boundary)
function lastOccurrence(arr, target) {
  let lo = 0, hi = arr.length - 1, result = -1;
  while (lo <= hi) {
    const mid = lo + ((hi - lo) >> 1);
    if (arr[mid] === target) { result = mid; lo = mid + 1; } // keep searching right
    else if (arr[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return result;
}

// ── Binary Search on Answer — Koko Eating Bananas ─
// Find minimum speed k such that all bananas eaten in H hours
function minEatingSpeed(piles, H) {
  let lo = 1, hi = Math.max(...piles);
  while (lo < hi) {
    const mid = lo + ((hi - lo) >> 1);
    const hoursNeeded = piles.reduce((sum, p) => sum + Math.ceil(p / mid), 0);
    if (hoursNeeded <= H) hi = mid;   // feasible — try slower
    else lo = mid + 1;                // too slow — go faster
  }
  return lo;
}`,

      cpp: `#include <vector>
#include <algorithm>
using namespace std;

// Standard binary search
int binarySearch(vector<int>& arr, int target) {
    int lo = 0, hi = arr.size() - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return -1;
}

// STL binary search functions (use these in competition!)
// lower_bound: first position where arr[pos] >= target
// upper_bound: first position where arr[pos] > target
void stlExamples(vector<int>& arr, int target) {
    auto lb = lower_bound(arr.begin(), arr.end(), target);
    auto ub = upper_bound(arr.begin(), arr.end(), target);
    int count = ub - lb;  // frequency of target
    int idx   = lb - arr.begin();  // index of first occurrence
}

// Search in rotated sorted array — O(log N)
int searchRotated(vector<int>& arr, int target) {
    int lo = 0, hi = arr.size() - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return mid;
        // Left half is sorted
        if (arr[lo] <= arr[mid]) {
            if (arr[lo] <= target && target < arr[mid]) hi = mid - 1;
            else lo = mid + 1;
        } else { // Right half is sorted
            if (arr[mid] < target && target <= arr[hi]) lo = mid + 1;
            else hi = mid - 1;
        }
    }
    return -1;
}`,

      java: `import java.util.Arrays;

public class SearchAlgorithms {

    // Binary Search — classic
    public int binarySearch(int[] arr, int target) {
        int lo = 0, hi = arr.length - 1;
        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2;
            if (arr[mid] == target) return mid;
            if (arr[mid] < target) lo = mid + 1;
            else hi = mid - 1;
        }
        return -1;
    }

    // Find Peak Element — O(log N)
    // A peak is any element greater than its neighbors
    public int findPeakElement(int[] nums) {
        int lo = 0, hi = nums.length - 1;
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (nums[mid] > nums[mid + 1]) hi = mid;   // peak is left (or mid)
            else lo = mid + 1;                          // peak is right
        }
        return lo;
    }

    // Sqrt(x) — binary search on answer
    public int mySqrt(int x) {
        if (x < 2) return x;
        long lo = 1, hi = x / 2;
        while (lo <= hi) {
            long mid = lo + (hi - lo) / 2;
            if (mid * mid == x) return (int)mid;
            if (mid * mid < x)  lo = mid + 1;
            else                hi = mid - 1;
        }
        return (int)hi; // floor of square root
    }

    // Java built-in — use in interviews!
    // Arrays.binarySearch(arr, target) — returns index or -(insertionPoint)-1
}`,

      python: `import bisect

# ── Linear Search ─────────────────────────────────
def linear_search(arr, target):
    for i, x in enumerate(arr):
        if x == target: return i
    return -1

# ── Binary Search ─────────────────────────────────
def binary_search(arr, target):
    lo, hi = 0, len(arr) - 1
    while lo <= hi:
        mid = lo + (hi - lo) // 2
        if arr[mid] == target: return mid
        if arr[mid] < target:  lo = mid + 1
        else:                  hi = mid - 1
    return -1

# ── Python built-in: bisect module ────────────────
arr = [1, 3, 3, 5, 7, 9]
# bisect_left: leftmost position to insert target (first occurrence)
idx = bisect.bisect_left(arr, 3)   # → 1 (first 3)
# bisect_right: rightmost position to insert target
idx = bisect.bisect_right(arr, 3)  # → 3 (after last 3)
# Count occurrences in O(log N)
count = bisect.bisect_right(arr, 3) - bisect.bisect_left(arr, 3)  # 2

# ── Binary Search on Answer ─────────────────────── 
def min_eating_speed(piles, h):
    import math
    lo, hi = 1, max(piles)
    while lo < hi:
        mid = (lo + hi) // 2
        hours = sum(math.ceil(p / mid) for p in piles)
        if hours <= h: hi = mid       # feasible — try slower
        else:          lo = mid + 1   # too slow
    return lo

# ── Search in rotated sorted array ────────────────
def search_rotated(arr, target):
    lo, hi = 0, len(arr) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if arr[mid] == target: return mid
        if arr[lo] <= arr[mid]:  # left half sorted
            if arr[lo] <= target < arr[mid]: hi = mid - 1
            else:                            lo = mid + 1
        else:                    # right half sorted
            if arr[mid] < target <= arr[hi]: lo = mid + 1
            else:                            hi = mid - 1
    return -1`
    }
  },

  // ── PHASE 1 QUIZ ──
  {
    id: "quiz-phase1",
    type: "quiz",
    phase: 1,
    difficulty: "Intermediate",
    title: "Phase 1 Quiz — Complexity & Arrays",
    category: "Complexity",
    icon: "🧪",
    iconColor: "emerald",
    questions: [
      {
        question: "What is the Big O of the following code?\nfor (int i = 0; i < n; i++)\n  for (int j = i; j < n; j++) { ... }",
        options: ["O(N)", "O(N log N)", "O(N²)", "O(2N)"],
        answer: 2,
        explanation: "The inner loop runs N + (N-1) + ... + 1 = N(N+1)/2 times. Drop constants → O(N²). This is the classic triangular nested loop pattern."
      },
      {
        question: "Binary Search requires the array to be:",
        options: ["Of size at least 10", "Sorted in ascending order", "Containing only integers", "Stored in a hash table"],
        answer: 1,
        explanation: "Binary Search relies on the sorted property to eliminate half the search space at each step. The array must be sorted — the element type doesn't matter as long as elements are comparable."
      },
      {
        question: "What is Kadane's Algorithm used for?",
        options: ["Finding the shortest path in a graph", "Sorting an array in O(N log N)", "Finding the maximum sum contiguous subarray in O(N)", "Counting inversions in an array"],
        answer: 2,
        explanation: "Kadane's algorithm finds the maximum sum subarray in O(N) time and O(1) space. At each index, it decides whether to extend the current subarray (add current element) or start fresh (just the current element)."
      },
      {
        question: "What is the safest way to compute the midpoint in binary search to avoid integer overflow?",
        options: ["mid = (lo + hi) / 2", "mid = lo + (hi - lo) / 2", "mid = hi - (hi - lo) / 2", "mid = lo * hi / 2"],
        answer: 1,
        explanation: "When lo and hi are both close to Integer.MAX_VALUE, lo + hi overflows. lo + (hi - lo) / 2 is mathematically identical but safe because (hi - lo) is always a small positive number."
      },
      {
        question: "What does a Prefix Sum array allow you to compute in O(1) time?",
        options: ["The minimum element in any subarray", "The sum of any subarray [l, r]", "The sorted order of the array", "Whether the array has duplicates"],
        answer: 1,
        explanation: "A prefix sum array prefix[i] = sum(arr[0..i-1]). The sum of any subarray [l, r] is prefix[r+1] - prefix[l], which is O(1). The prefix array is built in O(N) and answers unlimited range queries in O(1) each."
      }
    ]
  },

  // ══════════════════════════════════════════════════════
  //  PHASE 2 — LINEAR DATA STRUCTURES (5 concepts + quiz)
  // ══════════════════════════════════════════════════════

  {
    id: "stack-queue",
    title: "Stack & Queue",
    category: "Linear Structures",
    phase: 2,
    difficulty: "Beginner",
    icon: "📚",
    iconColor: "emerald",
    summary: "LIFO Stack and FIFO Queue — operations, implementations (array & linked list), monotonic stack/queue, and deque.",
    readTime: "8 mins",
    details: `
      <h2>Stack & Queue</h2>
      <p>Stacks and Queues are <strong>abstract data types</strong> that restrict how elements are inserted and removed, making them perfect for modeling real-world sequential processes.</p>

      <h3>Stack — LIFO (Last In, First Out)</h3>
      <table class="complexity-table">
        <thead><tr><th>Operation</th><th>Time</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>push(x)</td><td><span class="complexity-badge complexity-green">O(1)</span></td><td>Add element to top</td></tr>
          <tr><td>pop()</td><td><span class="complexity-badge complexity-green">O(1)</span></td><td>Remove & return top element</td></tr>
          <tr><td>peek()</td><td><span class="complexity-badge complexity-green">O(1)</span></td><td>View top without removing</td></tr>
          <tr><td>isEmpty()</td><td><span class="complexity-badge complexity-green">O(1)</span></td><td>Check if empty</td></tr>
        </tbody>
      </table>

      <h3>Queue — FIFO (First In, First Out)</h3>
      <table class="complexity-table">
        <thead><tr><th>Operation</th><th>Time</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>enqueue(x)</td><td><span class="complexity-badge complexity-green">O(1)</span></td><td>Add element to back</td></tr>
          <tr><td>dequeue()</td><td><span class="complexity-badge complexity-green">O(1)</span></td><td>Remove & return front element</td></tr>
          <tr><td>front()</td><td><span class="complexity-badge complexity-green">O(1)</span></td><td>View front without removing</td></tr>
        </tbody>
      </table>

      <h3>🎯 Real-World Applications</h3>
      <ul>
        <li><strong>Stack:</strong> Undo/redo, browser back button, call stack, balanced parentheses, DFS (iterative), expression evaluation.</li>
        <li><strong>Queue:</strong> BFS, job scheduling, message queues (Kafka, RabbitMQ), printer queue, CPU scheduling.</li>
        <li><strong>Monotonic Stack:</strong> Next Greater Element, Largest Rectangle in Histogram.</li>
        <li><strong>Deque (Double-ended Queue):</strong> Sliding window maximum, implement both stack and queue.</li>
      </ul>
    `,
    code: {
      javascript: `// ── Stack Implementation ──────────────────────────
class Stack {
  constructor() { this._data = []; }
  push(x)     { this._data.push(x); }
  pop()       { return this._data.pop(); }
  peek()      { return this._data.at(-1); }
  isEmpty()   { return this._data.length === 0; }
  get size()  { return this._data.length; }
}

// ── Valid Parentheses — Classic Stack Problem ─────
function isValid(s) {
  const stack = [];
  const pairs = { ')': '(', ']': '[', '}': '{' };
  for (const ch of s) {
    if ('([{'.includes(ch)) stack.push(ch);
    else if (stack.pop() !== pairs[ch]) return false;
  }
  return stack.length === 0;
}

// ── Monotonic Stack — Next Greater Element O(N) ───
function nextGreaterElement(nums) {
  const result = new Array(nums.length).fill(-1);
  const stack = []; // stores indices
  for (let i = 0; i < nums.length; i++) {
    while (stack.length && nums[stack.at(-1)] < nums[i]) {
      result[stack.pop()] = nums[i]; // found the next greater
    }
    stack.push(i);
  }
  return result;
}

// ── Queue with Two Stacks — O(1) amortized ────────
class MyQueue {
  constructor() {
    this._inbox  = [];  // for push
    this._outbox = [];  // for pop/peek
  }
  push(x)   { this._inbox.push(x); }
  _transfer() {
    if (!this._outbox.length)
      while (this._inbox.length) this._outbox.push(this._inbox.pop());
  }
  pop()  { this._transfer(); return this._outbox.pop(); }
  peek() { this._transfer(); return this._outbox.at(-1); }
  isEmpty() { return !this._inbox.length && !this._outbox.length; }
}

// ── BFS with Queue ─────────────────────────────────
function bfs(root) {
  if (!root) return [];
  const result = [], queue = [root];
  while (queue.length) {
    const levelSize = queue.length;
    const level = [];
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      level.push(node.val);
      if (node.left)  queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    result.push(level);
  }
  return result;
}`,

      cpp: `#include <stack>
#include <queue>
#include <deque>
#include <vector>
using namespace std;

// STL Stack
stack<int> st;
st.push(1); st.push(2); st.push(3);
cout << st.top();   // 3
st.pop();
cout << st.size();  // 2

// STL Queue
queue<int> q;
q.push(1); q.push(2); q.push(3);
cout << q.front();  // 1
q.pop();

// Monotonic Stack — Largest Rectangle in Histogram O(N)
int largestRectangle(vector<int>& heights) {
    stack<int> stk;
    int maxArea = 0;
    heights.push_back(0); // sentinel
    for (int i = 0; i < heights.size(); i++) {
        while (!stk.empty() && heights[stk.top()] > heights[i]) {
            int h = heights[stk.top()]; stk.pop();
            int w = stk.empty() ? i : i - stk.top() - 1;
            maxArea = max(maxArea, h * w);
        }
        stk.push(i);
    }
    return maxArea;
}

// Sliding Window Maximum — Deque O(N)
vector<int> maxSlidingWindow(vector<int>& nums, int k) {
    deque<int> dq; // stores indices, front = max
    vector<int> result;
    for (int i = 0; i < nums.size(); i++) {
        if (!dq.empty() && dq.front() <= i - k) dq.pop_front(); // out of window
        while (!dq.empty() && nums[dq.back()] < nums[i]) dq.pop_back();
        dq.push_back(i);
        if (i >= k - 1) result.push_back(nums[dq.front()]);
    }
    return result;
}`,

      java: `import java.util.*;

public class StackQueuePatterns {

    // Min Stack — O(1) getMin() at all times
    class MinStack {
        Deque<int[]> stack = new ArrayDeque<>(); // [value, currentMin]
        void push(int val) {
            int min = stack.isEmpty() ? val : Math.min(val, stack.peek()[1]);
            stack.push(new int[]{val, min});
        }
        void pop()     { stack.pop(); }
        int top()      { return stack.peek()[0]; }
        int getMin()   { return stack.peek()[1]; }
    }

    // BFS Level Order Traversal
    public List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> result = new ArrayList<>();
        if (root == null) return result;
        Queue<TreeNode> q = new LinkedList<>();
        q.offer(root);
        while (!q.isEmpty()) {
            int size = q.size();
            List<Integer> level = new ArrayList<>();
            for (int i = 0; i < size; i++) {
                TreeNode node = q.poll();
                level.add(node.val);
                if (node.left  != null) q.offer(node.left);
                if (node.right != null) q.offer(node.right);
            }
            result.add(level);
        }
        return result;
    }

    // Daily Temperatures — Monotonic Stack
    public int[] dailyTemperatures(int[] T) {
        int[] result = new int[T.length];
        Deque<Integer> stack = new ArrayDeque<>(); // store indices
        for (int i = 0; i < T.length; i++) {
            while (!stack.isEmpty() && T[stack.peek()] < T[i]) {
                int idx = stack.pop();
                result[idx] = i - idx;
            }
            stack.push(i);
        }
        return result;
    }
}`,

      python: `from collections import deque

# ── Stack using list (O(1) push/pop at end) ────────
stack = []
stack.append(1)   # push
stack.append(2)
stack.append(3)
top = stack[-1]   # peek
stack.pop()       # pop → 3

# ── Queue using deque (O(1) append/popleft) ────────
queue = deque()
queue.append(1)   # enqueue
queue.append(2)
queue.append(3)
front = queue[0]  # peek front
queue.popleft()   # dequeue → 1

# ── Evaluate Reverse Polish Notation ──────────────
def eval_rpn(tokens):
    stack = []
    ops = {
        '+': lambda a, b: a + b,
        '-': lambda a, b: a - b,
        '*': lambda a, b: a * b,
        '/': lambda a, b: int(a / b)  # truncate toward zero
    }
    for t in tokens:
        if t in ops:
            b, a = stack.pop(), stack.pop()
            stack.append(ops[t](a, b))
        else:
            stack.append(int(t))
    return stack[0]

print(eval_rpn(["2","1","+","3","*"]))  # (2+1)*3 = 9

# ── Sliding Window Maximum — deque O(N) ───────────
def max_sliding_window(nums, k):
    dq = deque()    # indices, front = max
    result = []
    for i, x in enumerate(nums):
        while dq and dq[0] <= i - k: dq.popleft()  # expired
        while dq and nums[dq[-1]] < x: dq.pop()     # smaller — useless
        dq.append(i)
        if i >= k - 1: result.append(nums[dq[0]])
    return result`
    }
  },

  {
    id: "linked-list",
    title: "Linked Lists",
    category: "Linear Structures",
    phase: 2,
    difficulty: "Intermediate",
    icon: "🔗",
    iconColor: "cyan",
    summary: "Singly & Doubly Linked Lists. Reversal, cycle detection, merge, fast-slow pointer — all critical interview patterns.",
    readTime: "9 mins",
    details: `
      <h2>Linked Lists</h2>
      <p>A linked list is a sequence of <strong>Nodes</strong> where each node stores a value and a pointer to the next node. Unlike arrays, nodes are scattered in memory — there's no index-based O(1) access.</p>

      <h3>Types</h3>
      <ul>
        <li><strong>Singly Linked List:</strong> Each node has <code>val</code> and <code>next</code>. Traversal in one direction only.</li>
        <li><strong>Doubly Linked List:</strong> Each node also has <code>prev</code>. Enables O(1) deletion if you have the node reference.</li>
        <li><strong>Circular:</strong> Last node points back to head. Used in round-robin scheduling.</li>
      </ul>

      <h3>Time Complexities</h3>
      <table class="complexity-table">
        <thead><tr><th>Operation</th><th>Singly LL</th><th>Doubly LL</th><th>Array</th></tr></thead>
        <tbody>
          <tr><td>Access by index</td><td><span class="complexity-badge complexity-yellow">O(N)</span></td><td><span class="complexity-badge complexity-yellow">O(N)</span></td><td><span class="complexity-badge complexity-green">O(1)</span></td></tr>
          <tr><td>Insert at head</td><td><span class="complexity-badge complexity-green">O(1)</span></td><td><span class="complexity-badge complexity-green">O(1)</span></td><td><span class="complexity-badge complexity-yellow">O(N)</span></td></tr>
          <tr><td>Insert at tail</td><td>O(1) with tail ptr</td><td><span class="complexity-badge complexity-green">O(1)</span></td><td><span class="complexity-badge complexity-green">O(1)</span> amort.</td></tr>
          <tr><td>Delete (with reference)</td><td><span class="complexity-badge complexity-yellow">O(N)</span> (find prev)</td><td><span class="complexity-badge complexity-green">O(1)</span></td><td><span class="complexity-badge complexity-yellow">O(N)</span></td></tr>
          <tr><td>Search</td><td><span class="complexity-badge complexity-yellow">O(N)</span></td><td><span class="complexity-badge complexity-yellow">O(N)</span></td><td><span class="complexity-badge complexity-yellow">O(N)</span></td></tr>
        </tbody>
      </table>

      <h3>🎯 Must-Know Patterns</h3>
      <ul>
        <li><strong>Dummy node:</strong> Add a dummy head to simplify edge cases (empty list, inserting at head).</li>
        <li><strong>Fast & Slow Pointers:</strong> Floyd's cycle detection, find middle, Nth from end.</li>
        <li><strong>Reversal:</strong> Reverse the entire list or a sublist — requires tracking prev, curr, next.</li>
        <li><strong>Merge:</strong> Merge two sorted lists without extra space.</li>
        <li><strong>Runner technique:</strong> Two pointers at different speeds.</li>
      </ul>
    `,
    code: {
      javascript: `class ListNode {
  constructor(val = 0, next = null) { this.val = val; this.next = next; }
}

// ── Reverse Linked List — O(N) ────────────────────
function reverseList(head) {
  let prev = null, curr = head;
  while (curr) {
    const next = curr.next; // save next
    curr.next = prev;       // reverse pointer
    prev = curr;            // advance prev
    curr = next;            // advance curr
  }
  return prev; // new head
}

// ── Floyd's Cycle Detection ────────────────────────
function hasCycle(head) {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true; // meeting point
  }
  return false;
}

// ── Find Middle (slow/fast pointer) ──────────────
function findMiddle(head) {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow; // middle node
}

// ── Merge Two Sorted Lists — O(N+M) ──────────────
function mergeTwoLists(l1, l2) {
  const dummy = new ListNode(0);
  let curr = dummy;
  while (l1 && l2) {
    if (l1.val <= l2.val) { curr.next = l1; l1 = l1.next; }
    else                  { curr.next = l2; l2 = l2.next; }
    curr = curr.next;
  }
  curr.next = l1 || l2; // attach remaining
  return dummy.next;
}

// ── Remove Nth From End — one pass ───────────────
function removeNthFromEnd(head, n) {
  const dummy = new ListNode(0, head);
  let fast = dummy, slow = dummy;
  for (let i = 0; i <= n; i++) fast = fast.next;
  while (fast) { fast = fast.next; slow = slow.next; }
  slow.next = slow.next.next; // skip the nth node
  return dummy.next;
}`,

      cpp: `struct ListNode {
    int val; ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};

// Reverse in-place
ListNode* reverseList(ListNode* head) {
    ListNode* prev = nullptr, *curr = head;
    while (curr) {
        ListNode* next = curr->next;
        curr->next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
}

// LRU Cache using Doubly Linked List + HashMap — O(1) both operations
#include <unordered_map>
class LRUCache {
    struct Node { int key, val; Node *prev, *next; };
    int cap;
    unordered_map<int, Node*> map;
    Node *head, *tail; // dummy nodes
    void remove(Node* n) { n->prev->next = n->next; n->next->prev = n->prev; }
    void insertFront(Node* n) { n->next = head->next; n->prev = head; head->next->prev = n; head->next = n; }
public:
    LRUCache(int capacity) : cap(capacity) {
        head = new Node(); tail = new Node();
        head->next = tail; tail->prev = head;
    }
    int get(int key) {
        if (!map.count(key)) return -1;
        remove(map[key]); insertFront(map[key]);
        return map[key]->val;
    }
    void put(int key, int value) {
        if (map.count(key)) remove(map[key]);
        else if (map.size() == cap) { auto lru = tail->prev; remove(lru); map.erase(lru->key); delete lru; }
        Node* n = new Node{key, value};
        insertFront(n); map[key] = n;
    }
};`,

      java: `public class LinkedListPatterns {

    // Detect start of cycle (Floyd's extended)
    public ListNode detectCycle(ListNode head) {
        ListNode slow = head, fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) { // cycle exists
                slow = head;     // reset slow to head
                while (slow != fast) { slow = slow.next; fast = fast.next; }
                return slow;     // cycle start node
            }
        }
        return null;
    }

    // Reorder List: L0→L1→…→Ln → L0→Ln→L1→Ln-1→…
    public void reorderList(ListNode head) {
        // 1. Find middle
        ListNode slow = head, fast = head;
        while (fast.next != null && fast.next.next != null) {
            slow = slow.next; fast = fast.next.next;
        }
        // 2. Reverse second half
        ListNode prev = null, curr = slow.next;
        slow.next = null; // split
        while (curr != null) {
            ListNode next = curr.next; curr.next = prev; prev = curr; curr = next;
        }
        // 3. Merge two halves
        ListNode first = head, second = prev;
        while (second != null) {
            ListNode tmp1 = first.next, tmp2 = second.next;
            first.next = second;
            second.next = tmp1;
            first = tmp1; second = tmp2;
        }
    }
}`,

      python: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

# ── Reverse Linked List ────────────────────────────
def reverse_list(head):
    prev, curr = None, head
    while curr:
        nxt = curr.next
        curr.next = prev
        prev, curr = curr, nxt
    return prev

# ── Find Middle ────────────────────────────────────
def find_middle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    return slow

# ── Palindrome Linked List — O(N) time, O(1) space ─
def is_palindrome(head):
    # Find middle
    slow = fast = head
    while fast and fast.next:
        slow = slow.next; fast = fast.next.next
    # Reverse second half
    prev, curr = None, slow
    while curr:
        nxt = curr.next; curr.next = prev; prev, curr = curr, nxt
    # Compare
    left, right = head, prev
    while right:
        if left.val != right.val: return False
        left = left.next; right = right.next
    return True

# ── Merge K Sorted Lists — O(N log K) ─────────────
import heapq

def merge_k_lists(lists):
    heap = []
    for i, node in enumerate(lists):
        if node: heapq.heappush(heap, (node.val, i, node))
    dummy = curr = ListNode(0)
    while heap:
        val, i, node = heapq.heappop(heap)
        curr.next = node; curr = curr.next
        if node.next: heapq.heappush(heap, (node.next.val, i, node.next))
    return dummy.next`
    }
  },

  {
    id: "hash-tables",
    title: "Hash Tables",
    category: "Linear Structures",
    phase: 2,
    difficulty: "Intermediate",
    icon: "🗂️",
    iconColor: "amber",
    summary: "O(1) average-case operations. Hash functions, collision handling (chaining & open addressing), and interview patterns.",
    readTime: "8 mins",
    details: `
      <h2>Hash Tables</h2>
      <p>A hash table maps <strong>keys to values</strong> using a hash function that converts the key into an array index. This enables O(1) average-case insert, search, and delete — making it the most powerful tool for trading space for time in interviews.</p>

      <h3>How It Works</h3>
      <ol>
        <li><strong>Hash Function:</strong> Converts key to integer: <code>hash(key) % capacity</code> → array index.</li>
        <li><strong>Collision:</strong> Two keys map to same index. Must be resolved.</li>
        <li><strong>Load Factor (λ = n/m):</strong> n = items, m = buckets. When λ > 0.75, resize and rehash → O(N) amortized over all insertions.</li>
      </ol>

      <h3>Collision Resolution</h3>
      <table class="complexity-table">
        <thead><tr><th>Method</th><th>Description</th><th>Best For</th></tr></thead>
        <tbody>
          <tr><td>Chaining</td><td>Each bucket holds a linked list of all colliding items</td><td>High load factors</td></tr>
          <tr><td>Open Addressing (Linear Probe)</td><td>Find next empty slot linearly</td><td>Cache-friendly, lower load</td></tr>
          <tr><td>Quadratic Probing</td><td>Probe at i², 2i², 3i²... offsets</td><td>Reduces clustering</td></tr>
          <tr><td>Double Hashing</td><td>Use second hash function for step size</td><td>Minimal clustering</td></tr>
        </tbody>
      </table>

      <h3>Time Complexity</h3>
      <table class="complexity-table">
        <thead><tr><th>Operation</th><th>Average</th><th>Worst Case</th></tr></thead>
        <tbody>
          <tr><td>Insert</td><td><span class="complexity-badge complexity-green">O(1)</span></td><td><span class="complexity-badge complexity-yellow">O(N)</span></td></tr>
          <tr><td>Search</td><td><span class="complexity-badge complexity-green">O(1)</span></td><td><span class="complexity-badge complexity-yellow">O(N)</span></td></tr>
          <tr><td>Delete</td><td><span class="complexity-badge complexity-green">O(1)</span></td><td><span class="complexity-badge complexity-yellow">O(N)</span></td></tr>
        </tbody>
      </table>

      <h3>🎯 Killer Interview Pattern: HashMap as Set/Counter</h3>
      <ul>
        <li><strong>Frequency counter:</strong> Count occurrences of each element → enables anagram checks, Top-K elements.</li>
        <li><strong>Complement lookup:</strong> Two Sum — store seen values; for each x, check if (target - x) exists.</li>
        <li><strong>Deduplication:</strong> HashSet for O(1) existence check instead of O(N) array scan.</li>
        <li><strong>Group by key:</strong> Group anagrams, isomorphic strings.</li>
      </ul>
    `,
    code: {
      javascript: `// ── HashMap patterns ──────────────────────────────

// Two Sum — O(N)
function twoSum(nums, target) {
  const seen = new Map(); // value → index
  for (let i = 0; i < nums.length; i++) {
    const comp = target - nums[i];
    if (seen.has(comp)) return [seen.get(comp), i];
    seen.set(nums[i], i);
  }
}

// Top K Frequent Elements — O(N log K)
function topKFrequent(nums, k) {
  const freq = new Map();
  for (const n of nums) freq.set(n, (freq.get(n) || 0) + 1);
  
  // Bucket sort approach — O(N)!
  const buckets = Array.from({ length: nums.length + 1 }, () => []);
  for (const [num, count] of freq) buckets[count].push(num);
  
  const result = [];
  for (let i = buckets.length - 1; i >= 0 && result.length < k; i--)
    result.push(...buckets[i]);
  return result.slice(0, k);
}

// Longest Consecutive Sequence — O(N)
function longestConsecutive(nums) {
  const numSet = new Set(nums);
  let maxLen = 0;
  for (const n of numSet) {
    if (!numSet.has(n - 1)) { // start of sequence
      let curr = n, len = 1;
      while (numSet.has(curr + 1)) { curr++; len++; }
      maxLen = Math.max(maxLen, len);
    }
  }
  return maxLen;
}

// LRU Cache — O(1) get & put ─────────────────────
class LRUCache {
  constructor(capacity) {
    this.cap = capacity;
    this.map = new Map(); // insertion-ordered in JS
  }
  get(key) {
    if (!this.map.has(key)) return -1;
    const val = this.map.get(key);
    this.map.delete(key); this.map.set(key, val); // move to end (MRU)
    return val;
  }
  put(key, value) {
    if (this.map.has(key)) this.map.delete(key);
    else if (this.map.size >= this.cap) this.map.delete(this.map.keys().next().value); // evict LRU (first key)
    this.map.set(key, value);
  }
}`,

      cpp: `#include <unordered_map>
#include <unordered_set>
#include <vector>
using namespace std;

// Group Anagrams — O(N * K log K)
vector<vector<string>> groupAnagrams(vector<string>& strs) {
    unordered_map<string, vector<string>> mp;
    for (const string& s : strs) {
        string key = s;
        sort(key.begin(), key.end());
        mp[key].push_back(s);
    }
    vector<vector<string>> result;
    for (auto& [key, group] : mp) result.push_back(group);
    return result;
}

// Custom Hash for pairs (needed for unordered_map with pair keys)
struct PairHash {
    size_t operator()(const pair<int,int>& p) const {
        return hash<long long>()(((long long)p.first << 32) | p.second);
    }
};
unordered_map<pair<int,int>, int, PairHash> pairMap;

// Word Frequency Counter
unordered_map<string, int> wordCount(vector<string>& words) {
    unordered_map<string, int> freq;
    for (const string& w : words) freq[w]++;
    return freq;
}`,

      java: `import java.util.*;

public class HashTablePatterns {

    // Subarray Sum Equals K — O(N) using prefix sum + hashmap
    public int subarraySum(int[] nums, int k) {
        Map<Integer, Integer> prefixCount = new HashMap<>();
        prefixCount.put(0, 1); // empty subarray with sum 0
        int count = 0, prefixSum = 0;
        for (int x : nums) {
            prefixSum += x;
            // If (prefixSum - k) exists as a previous prefix sum,
            // then the subarray between them sums to k
            count += prefixCount.getOrDefault(prefixSum - k, 0);
            prefixCount.merge(prefixSum, 1, Integer::sum);
        }
        return count;
    }

    // 4Sum II (4 arrays, each element from diff array) — O(N²)
    public int fourSumCount(int[] A, int[] B, int[] C, int[] D) {
        Map<Integer, Integer> ab = new HashMap<>();
        for (int a : A) for (int b : B)
            ab.merge(a + b, 1, Integer::sum);
        int count = 0;
        for (int c : C) for (int d : D)
            count += ab.getOrDefault(-(c + d), 0);
        return count;
    }

    // Isomorphic Strings — O(N)
    public boolean isIsomorphic(String s, String t) {
        Map<Character, Character> sToT = new HashMap<>(), tToS = new HashMap<>();
        for (int i = 0; i < s.length(); i++) {
            char sc = s.charAt(i), tc = t.charAt(i);
            if (sToT.containsKey(sc) && sToT.get(sc) != tc) return false;
            if (tToS.containsKey(tc) && tToS.get(tc) != sc) return false;
            sToT.put(sc, tc); tToS.put(tc, sc);
        }
        return true;
    }
}`,

      python: `from collections import defaultdict, Counter

# ── Two Sum variations ────────────────────────────
def two_sum(nums, target):
    seen = {}  # value → index
    for i, x in enumerate(nums):
        comp = target - x
        if comp in seen: return [seen[comp], i]
        seen[x] = i

# ── Subarray Sum = K — O(N) ───────────────────────
def subarray_sum(nums, k):
    count = 0
    prefix = 0
    prefix_count = {0: 1}  # prefix_sum → frequency
    for x in nums:
        prefix += x
        count += prefix_count.get(prefix - k, 0)
        prefix_count[prefix] = prefix_count.get(prefix, 0) + 1
    return count

# ── Top K Frequent Words — O(N log K) ─────────────
import heapq

def top_k_frequent_words(words, k):
    freq = Counter(words)
    # Min-heap of size k: (-freq, word) so most frequent stays at top
    heap = [(-count, word) for word, count in freq.items()]
    heapq.heapify(heap)
    return [heapq.heappop(heap)[1] for _ in range(k)]

# ── Default dict tricks ────────────────────────────
# Graph as adjacency list
graph = defaultdict(list)
graph['A'].append('B')
graph['A'].append('C')

# Frequency counter shortcut
freq = Counter("anagram")  # {'a': 3, 'n': 1, 'g': 1, 'r': 1, 'm': 1}
print(freq.most_common(2)) # [('a', 3), ('n', 1)]

# ── Consistent Hashing Simulation ─────────────────
# (Simplified — real implementation uses sorted ring)
class ConsistentHash:
    def __init__(self, nodes):
        self.ring = {hash(node) % 100: node for node in nodes}
    def get_node(self, key):
        h = hash(key) % 100
        for ring_hash in sorted(self.ring):
            if ring_hash >= h: return self.ring[ring_hash]
        return self.ring[min(self.ring)]  # wrap around`
    }
  },

  {
    id: "heaps",
    title: "Heaps (Priority Queues)",
    category: "Non-Linear Structures",
    phase: 2,
    difficulty: "Intermediate",
    icon: "⛰️",
    iconColor: "purple",
    summary: "Min-Heap and Max-Heap. Heapify, heap operations, heapsort, and Top-K problems — all in O(log N).",
    readTime: "8 mins",
    details: `
      <h2>Heaps (Priority Queues)</h2>
      <p>A heap is a <strong>complete binary tree</strong> stored as an array that satisfies the <strong>heap property</strong>: in a Max-Heap, every parent ≥ its children; in a Min-Heap, every parent ≤ its children. The root is always the max or min element.</p>

      <h3>Heap as Array</h3>
      <p>Given a node at index <code>i</code> (0-indexed):</p>
      <ul>
        <li><strong>Parent:</strong> <code>(i - 1) / 2</code></li>
        <li><strong>Left child:</strong> <code>2i + 1</code></li>
        <li><strong>Right child:</strong> <code>2i + 2</code></li>
      </ul>

      <h3>Time Complexities</h3>
      <table class="complexity-table">
        <thead><tr><th>Operation</th><th>Time</th><th>Why</th></tr></thead>
        <tbody>
          <tr><td>Insert (push)</td><td><span class="complexity-badge complexity-green">O(log N)</span></td><td>Bubble up: at most height = log N swaps</td></tr>
          <tr><td>Extract min/max (pop)</td><td><span class="complexity-badge complexity-green">O(log N)</span></td><td>Bubble down: at most height = log N swaps</td></tr>
          <tr><td>Peek min/max</td><td><span class="complexity-badge complexity-green">O(1)</span></td><td>Root is always at index 0</td></tr>
          <tr><td>Build heap (heapify)</td><td><span class="complexity-badge complexity-yellow">O(N)</span></td><td>Floyd's heapify — mathematical proof</td></tr>
          <tr><td>Heap Sort</td><td><span class="complexity-badge complexity-yellow">O(N log N)</span></td><td>N extractions × O(log N) each</td></tr>
        </tbody>
      </table>

      <h3>🎯 When to Use a Heap</h3>
      <ul>
        <li><strong>Top K elements:</strong> Keep a min-heap of size K. O(N log K) — much better than O(N log N) sort when K ≪ N.</li>
        <li><strong>Kth largest/smallest:</strong> Min-heap of size K — peek at root for Kth largest.</li>
        <li><strong>Merge K sorted lists:</strong> Always extract the smallest current element → O(N log K).</li>
        <li><strong>Dijkstra's Algorithm:</strong> Min-heap stores (distance, node) → always process closest unvisited node.</li>
        <li><strong>Median of a stream:</strong> Use two heaps — max-heap for lower half, min-heap for upper half.</li>
      </ul>
    `,
    code: {
      javascript: `// ── Min-Heap Implementation ────────────────────────
class MinHeap {
  constructor() { this.heap = []; }

  _parent(i) { return (i - 1) >> 1; }
  _left(i)   { return 2 * i + 1; }
  _right(i)  { return 2 * i + 2; }
  _swap(i, j) { [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]]; }

  push(val) {
    this.heap.push(val);
    this._bubbleUp(this.heap.length - 1);
  }
  pop() {
    if (this.heap.length === 1) return this.heap.pop();
    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this._bubbleDown(0);
    return min;
  }
  peek() { return this.heap[0]; }
  size() { return this.heap.length; }

  _bubbleUp(i) {
    while (i > 0 && this.heap[this._parent(i)] > this.heap[i]) {
      this._swap(i, this._parent(i));
      i = this._parent(i);
    }
  }
  _bubbleDown(i) {
    const n = this.heap.length;
    let smallest = i;
    const l = this._left(i), r = this._right(i);
    if (l < n && this.heap[l] < this.heap[smallest]) smallest = l;
    if (r < n && this.heap[r] < this.heap[smallest]) smallest = r;
    if (smallest !== i) { this._swap(i, smallest); this._bubbleDown(smallest); }
  }
}

// ── Find Kth Largest — O(N log K) ─────────────────
function findKthLargest(nums, k) {
  const minHeap = new MinHeap();
  for (const n of nums) {
    minHeap.push(n);
    if (minHeap.size() > k) minHeap.pop(); // keep only K largest
  }
  return minHeap.peek(); // root = Kth largest
}

// ── Median from Data Stream ────────────────────────
class MedianFinder {
  constructor() {
    this.lo = new MaxHeap(); // lower half
    this.hi = new MinHeap(); // upper half
  }
  addNum(num) {
    this.lo.push(num);
    this.hi.push(this.lo.pop()); // balance: always push lo's max to hi
    if (this.lo.size() < this.hi.size()) this.lo.push(this.hi.pop());
  }
  findMedian() {
    return this.lo.size() > this.hi.size()
      ? this.lo.peek()
      : (this.lo.peek() + this.hi.peek()) / 2;
  }
}`,

      cpp: `#include <queue>
#include <vector>
#include <functional>
using namespace std;

// STL Priority Queue
// Max-Heap (default)
priority_queue<int> maxHeap;
maxHeap.push(3); maxHeap.push(1); maxHeap.push(4);
cout << maxHeap.top(); // 4

// Min-Heap
priority_queue<int, vector<int>, greater<int>> minHeap;
minHeap.push(3); minHeap.push(1); minHeap.push(4);
cout << minHeap.top(); // 1

// Kth Largest Element
int findKthLargest(vector<int>& nums, int k) {
    priority_queue<int, vector<int>, greater<int>> pq; // min-heap
    for (int n : nums) {
        pq.push(n);
        if (pq.size() > k) pq.pop();
    }
    return pq.top();
}

// Merge K Sorted Arrays — O(N log K)
vector<int> mergeKSortedArrays(vector<vector<int>>& arrays) {
    // (value, array_index, element_index)
    priority_queue<tuple<int,int,int>, vector<tuple<int,int,int>>, greater<>> pq;
    for (int i = 0; i < arrays.size(); i++)
        if (!arrays[i].empty()) pq.push({arrays[i][0], i, 0});
    vector<int> result;
    while (!pq.empty()) {
        auto [val, i, j] = pq.top(); pq.pop();
        result.push_back(val);
        if (j + 1 < arrays[i].size()) pq.push({arrays[i][j+1], i, j+1});
    }
    return result;
}`,

      java: `import java.util.*;

public class HeapPatterns {

    // Top K Frequent Elements using Min-Heap — O(N log K)
    public int[] topKFrequent(int[] nums, int k) {
        Map<Integer, Integer> freq = new HashMap<>();
        for (int n : nums) freq.merge(n, 1, Integer::sum);

        // Min-heap by frequency (keeps K most frequent)
        PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[1] - b[1]);
        for (var entry : freq.entrySet()) {
            pq.offer(new int[]{entry.getKey(), entry.getValue()});
            if (pq.size() > k) pq.poll(); // evict least frequent
        }

        int[] result = new int[k];
        for (int i = k - 1; i >= 0; i--) result[i] = pq.poll()[0];
        return result;
    }

    // Task Scheduler — O(N log N)
    public int leastInterval(char[] tasks, int n) {
        int[] freq = new int[26];
        for (char c : tasks) freq[c - 'A']++;
        PriorityQueue<Integer> pq = new PriorityQueue<>(Collections.reverseOrder());
        for (int f : freq) if (f > 0) pq.offer(f);

        int time = 0;
        Queue<int[]> cooldown = new LinkedList<>(); // [freq, availableTime]
        while (!pq.isEmpty() || !cooldown.isEmpty()) {
            if (!cooldown.isEmpty() && cooldown.peek()[1] <= time)
                pq.offer(cooldown.poll()[0]);
            if (!pq.isEmpty()) {
                int f = pq.poll() - 1;
                if (f > 0) cooldown.offer(new int[]{f, time + n + 1});
            }
            time++;
        }
        return time;
    }
}`,

      python: `import heapq  # Python's heapq is a MIN-heap

# ── Basic heap operations ──────────────────────────
heap = []
heapq.heappush(heap, 3)
heapq.heappush(heap, 1)
heapq.heappush(heap, 4)
print(heap[0])           # 1 — peek min
print(heapq.heappop(heap))  # 1 — extract min

# ── Max-heap trick: negate values ─────────────────
max_heap = []
for x in [3, 1, 4, 1, 5, 9]:
    heapq.heappush(max_heap, -x)   # push negated
max_val = -heapq.heappop(max_heap) # negate when popping → 9

# ── heapify — build heap in O(N) ─────────────────
arr = [5, 2, 8, 1, 9]
heapq.heapify(arr)    # in-place, O(N)
print(arr[0])         # 1

# ── Kth Largest — O(N log K) ──────────────────────
def kth_largest(nums, k):
    return heapq.nlargest(k, nums)[-1]   # built-in — O(N log K)
    # OR: maintain min-heap of size k manually

# ── Merge K Sorted Lists — O(N log K) ─────────────
def merge_k_sorted(lists):
    heap = []
    for i, node in enumerate(lists):
        if node: heapq.heappush(heap, (node.val, i, node))
    dummy = curr = ListNode(0)
    while heap:
        val, i, node = heapq.heappop(heap)
        curr.next = node; curr = curr.next
        if node.next: heapq.heappush(heap, (node.next.val, i, node.next))
    return dummy.next

# ── Median of Data Stream ─────────────────────────
class MedianFinder:
    def __init__(self):
        self.lo = []  # max-heap (negate): lower half
        self.hi = []  # min-heap: upper half

    def add_num(self, num):
        heapq.heappush(self.lo, -num)
        heapq.heappush(self.hi, -heapq.heappop(self.lo))  # balance
        if len(self.lo) < len(self.hi):
            heapq.heappush(self.lo, -heapq.heappop(self.hi))

    def find_median(self):
        if len(self.lo) > len(self.hi): return -self.lo[0]
        return (-self.lo[0] + self.hi[0]) / 2`
    }
  },

    {
    id: "matrices",
    title: "Matrix & 2D Arrays",
    category: "Linear Structures",
    phase: 2,
    difficulty: "Intermediate",
    icon: "🔲",
    iconColor: "cyan",
    summary: "Multi-dimensional arrays, layout in memory (row-major vs column-major), spiral traversal, transpose, and rotation.",
    readTime: "7 mins",
    details: `
      <h2>Matrix & 2D Arrays</h2>
      <p>A matrix or 2D array is a grid of values. In computer memory, matrices are flattened into a 1D sequence using either <strong>Row-Major Order</strong> (row by row) or <strong>Column-Major Order</strong> (col by col). Row-major is standard in C, C++, Java, and JS.</p>

      <h3>Addressing Formula (Row-Major)</h3>
      <p>Address of <code>matrix[r][c]</code> = <code>base + (r × num_cols + c) × element_size</code>. This explains why random index access remains O(1) in a grid.</p>

      <h3>Matrix Operations</h3>
      <table class="complexity-table">
        <thead><tr><th>Operation</th><th>Time</th><th>Space (Auxiliary)</th><th>Why</th></tr></thead>
        <tbody>
          <tr><td>Transpose</td><td>O(R × C)</td><td>O(1) in-place if square</td><td>Swap element[i][j] with element[j][i]</td></tr>
          <tr><td>Rotate 90° (in-place)</td><td>O(R × C)</td><td>O(1)</td><td>Transpose + reverse each row</td></tr>
          <tr><td>Spiral Traversal</td><td>O(R × C)</td><td>O(1)</td><td>Traverse boundaries with 4 pointers</td></tr>
          <tr><td>Search in row-col sorted</td><td>O(R + C)</td><td>O(1)</td><td>Binary-like search from top-right corner</td></tr>
        </tbody>
      </table>

      <h3>🎯 Visualizing Spiral Print Boundaries</h3>
      <p>Maintain four pointers: <code>top</code> (row 0), <code>bottom</code> (row R-1), <code>left</code> (col 0), <code>right</code> (col C-1). Print edges in loop, then shrink bounds: <code>top++</code>, <code>right--</code>, <code>bottom--</code>, <code>left++</code>.</p>
    `,
    code: {
      javascript: `// ── Rotate Matrix 90 deg clockwise in-place ────────
function rotate(matrix) {
  const n = matrix.length;
  // 1. Transpose
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
    }
  }
  // 2. Reverse each row
  for (let i = 0; i < n; i++) matrix[i].reverse();
}

// ── Spiral Traversal O(R * C) ─────────────────────
function spiralOrder(matrix) {
  if (!matrix.length) return [];
  const result = [];
  let top = 0, bottom = matrix.length - 1;
  let left = 0, right = matrix[0].length - 1;

  while (top <= bottom && left <= right) {
    for (let i = left; i <= right; i++) result.push(matrix[top][i]);
    top++;
    for (let i = top; i <= bottom; i++) result.push(matrix[i][right]);
    right--;
    if (top <= bottom) {
      for (let i = right; i >= left; i--) result.push(matrix[bottom][i]);
      bottom--;
    }
    if (left <= right) {
      for (let i = bottom; i >= top; i--) result.push(matrix[i][left]);
      left++;
    }
  }
  return result;
}

// ── Search a 2D sorted matrix O(R + C) ────────────
function searchMatrix(matrix, target) {
  let r = 0, c = matrix[0].length - 1; // start top-right
  while (r < matrix.length && c >= 0) {
    if (matrix[r][c] === target) return true;
    if (matrix[r][c] > target) c--;
    else r++;
  }
  return false;
}`,
      cpp: `#include <vector>
#include <algorithm>
using namespace std;

// In-place rotation
void rotate(vector<vector<int>>& matrix) {
    int n = matrix.size();
    // Transpose
    for (int i = 0; i < n; i++)
        for (int j = i + 1; j < n; j++)
            swap(matrix[i][j], matrix[j][i]);
    // Reverse rows
    for (int i = 0; i < n; i++)
        reverse(matrix[i].begin(), matrix[i].end());
}

// Spiral Traversal
vector<int> spiralOrder(vector<vector<int>>& matrix) {
    if (matrix.empty()) return {};
    vector<int> result;
    int top = 0, bottom = matrix.size() - 1;
    int left = 0, right = matrix[0].size() - 1;
    while (top <= bottom && left <= right) {
        for (int i = left; i <= right; i++) result.push_back(matrix[top][i]);
        top++;
        for (int i = top; i <= bottom; i++) result.push_back(matrix[i][right]);
        right--;
        if (top <= bottom) {
            for (int i = right; i >= left; i--) result.push_back(matrix[bottom][i]);
            bottom--;
        }
        if (left <= right) {
            for (int i = bottom; i >= top; i--) result.push_back(matrix[i][left]);
            left++;
        }
    }
    return result;
}`,
      java: `import java.util.*;

public class MatrixPatterns {
    // Search 2D sorted matrix (LeetCode 240) - O(R + C)
    public boolean searchMatrix(int[][] matrix, int target) {
        int r = 0, c = matrix[0].length - 1; // top-right
        while (r < matrix.length && c >= 0) {
            if (matrix[r][c] == target) return true;
            if (matrix[r][c] > target) c--;
            else r++;
        }
        return false;
    }

    // Transpose in-place (square matrix only)
    public void transpose(int[][] matrix) {
        int n = matrix.length;
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                int temp = matrix[i][j];
                matrix[i][j] = matrix[j][i];
                matrix[j][i] = temp;
            }
        }
    }
}`,
      python: `# Rotate image 90 degrees clockwise (in-place)
def rotate(matrix):
    n = len(matrix)
    # Transpose
    for i in range(n):
        for j in range(i+1, n):
            matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]
    # Reverse rows
    for row in matrix:
        row.reverse()

# Spiral order
def spiral_order(matrix):
    if not matrix: return []
    result = []
    top, bottom = 0, len(matrix) - 1
    left, right = 0, len(matrix[0]) - 1
    while top <= bottom and left <= right:
        for i in range(left, right + 1): result.append(matrix[top][i])
        top += 1
        for i in range(top, bottom + 1): result.append(matrix[i][right])
        right -= 1
        if top <= bottom:
            for i in range(right, left - 1, -1): result.append(matrix[bottom][i])
            bottom -= 1
        if left <= right:
            for i in range(bottom, top - 1, -1): result.append(matrix[i][left])
            left += 1
    return result`
    }
  },

  // ── PHASE 2 QUIZ ──
  {
    id: "quiz-phase2",
    type: "quiz",
    phase: 2,
    difficulty: "Intermediate",
    title: "Phase 2 Quiz — Linear Data Structures",
    category: "Linear Structures",
    icon: "🧪",
    iconColor: "purple",
    questions: [
      {
        question: "Which data structure is best for implementing an undo/redo feature in a text editor?",
        options: ["Queue", "Stack", "Heap", "Hash Table"],
        answer: 1,
        explanation: "A Stack (LIFO) is perfect for undo/redo. Each action is pushed onto the undo stack. When you press Ctrl+Z, pop the undo stack and push to the redo stack. This mirrors the LIFO access pattern naturally."
      },
      {
        question: "Floyd's Cycle Detection uses two pointers moving at speeds 1 and 2. Why does the fast pointer eventually meet the slow one if there's a cycle?",
        options: ["They both start at the same node", "The fast pointer laps the slow pointer — the distance between them decreases by 1 each step inside the cycle", "The fast pointer jumps to the start of the cycle automatically", "Both pointers reverse direction when they hit the tail"],
        answer: 1,
        explanation: "Once both pointers are inside the cycle, the fast pointer gains 1 node per step relative to the slow pointer. This means the gap between them decreases by 1 per round until they collide. It's like a circular race track where the faster runner always laps the slower one."
      },
      {
        question: "What is the worst-case time complexity of a HashMap lookup?",
        options: ["O(1)", "O(log N)", "O(N)", "O(N²)"],
        answer: 2,
        explanation: "In the worst case, all N keys hash to the same bucket (pathological hash collisions), turning the bucket into a linked list of length N. Search then degrades to O(N). With a good hash function and load factor < 0.75, this is practically O(1)."
      },
      {
        question: "You need to find the Kth largest element from a stream of N numbers (K << N). Which approach gives the best time complexity?",
        options: ["Sort the entire array: O(N log N)", "Use a Min-Heap of size K: O(N log K)", "Use a Max-Heap: O(K)", "Binary search the sorted array: O(log N)"],
        answer: 1,
        explanation: "A Min-Heap of size K maintains the K largest seen elements. For each of the N numbers, push to heap O(log K), then pop if size > K O(log K). Total: O(N log K). Since K << N, this is far better than O(N log N) sorting."
      },
      {
        question: "Why is inserting at the head of a Linked List O(1) while inserting at an array's front is O(N)?",
        options: ["Linked lists have smaller nodes than arrays", "Arrays require shifting all existing elements right by one position; linked lists only need pointer updates", "Arrays don't support insert at front", "Linked lists use hash-based indexing"],
        answer: 1,
        explanation: "Arrays store elements in contiguous memory. Inserting at position 0 requires shifting N elements one position right — O(N). A linked list only needs to create a new node, set its next to the old head, and update the head pointer — three O(1) pointer operations."
      }
    ]
  },

  // ══════════════════════════════════════════════════════
  //  PHASE 3 — TREES (5 concepts + quiz)
  // ══════════════════════════════════════════════════════

  {
    id: "trees-bst",
    title: "Trees & Binary Search Trees",
    category: "Trees",
    phase: 3,
    difficulty: "Intermediate",
    icon: "🌳",
    iconColor: "emerald",
    summary: "Tree terminology, BST property, insert/search/delete, balanced vs unbalanced, and core traversals.",
    readTime: "9 mins",
    details: `
      <h2>Trees & Binary Search Trees</h2>
      <p>A tree is a hierarchical, non-linear data structure with a <strong>root</strong> node and subtrees of children. There are no cycles. Trees model file systems, DOM, organization charts, and are the backbone of databases (B-Trees) and language compilers (AST).</p>

      <h3>Key Terminology</h3>
      <ul>
        <li><strong>Root:</strong> Topmost node with no parent.</li>
        <li><strong>Leaf:</strong> Node with no children.</li>
        <li><strong>Height:</strong> Longest path from node to a leaf. Full tree: O(log N). Skewed tree: O(N).</li>
        <li><strong>Depth:</strong> Distance from root to the node.</li>
        <li><strong>Degree:</strong> Number of children. Binary tree: max degree = 2.</li>
      </ul>

      <h3>BST Property</h3>
      <p>For every node N: <strong>all nodes in left subtree < N < all nodes in right subtree</strong>. This gives O(log N) average search.</p>

      <h3>BST Time Complexities</h3>
      <table class="complexity-table">
        <thead><tr><th>Operation</th><th>Average (balanced)</th><th>Worst (skewed)</th></tr></thead>
        <tbody>
          <tr><td>Search</td><td><span class="complexity-badge complexity-green">O(log N)</span></td><td><span class="complexity-badge complexity-yellow">O(N)</span></td></tr>
          <tr><td>Insert</td><td><span class="complexity-badge complexity-green">O(log N)</span></td><td><span class="complexity-badge complexity-yellow">O(N)</span></td></tr>
          <tr><td>Delete</td><td><span class="complexity-badge complexity-green">O(log N)</span></td><td><span class="complexity-badge complexity-yellow">O(N)</span></td></tr>
          <tr><td>In-order traversal</td><td><span class="complexity-badge complexity-yellow">O(N)</span></td><td><span class="complexity-badge complexity-yellow">O(N)</span></td></tr>
        </tbody>
      </table>

      <h3>BST Delete — 3 Cases</h3>
      <ul>
        <li><strong>Case 1 — Leaf:</strong> Simply remove the node.</li>
        <li><strong>Case 2 — One child:</strong> Replace node with its child.</li>
        <li><strong>Case 3 — Two children:</strong> Replace with inorder successor (smallest node in right subtree), then delete the successor.</li>
      </ul>
    `,
    code: {
      javascript: `class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val; this.left = left; this.right = right;
  }
}

// ── BST Insert — O(log N) average ─────────────────
function insert(root, val) {
  if (!root) return new TreeNode(val);
  if (val < root.val) root.left  = insert(root.left, val);
  else if (val > root.val) root.right = insert(root.right, val);
  return root; // val === root.val: duplicate, don't insert
}

// ── BST Search ────────────────────────────────────
function search(root, val) {
  if (!root || root.val === val) return root;
  return val < root.val ? search(root.left, val) : search(root.right, val);
}

// ── BST Delete ────────────────────────────────────
function deleteNode(root, val) {
  if (!root) return null;
  if (val < root.val)      root.left  = deleteNode(root.left, val);
  else if (val > root.val) root.right = deleteNode(root.right, val);
  else {
    if (!root.left)  return root.right; // case 1 & 2
    if (!root.right) return root.left;
    // Case 3: two children — find inorder successor
    let successor = root.right;
    while (successor.left) successor = successor.left;
    root.val = successor.val;           // copy successor's value
    root.right = deleteNode(root.right, successor.val); // delete successor
  }
  return root;
}

// ── Validate BST — O(N) ───────────────────────────
function isValidBST(root, min = -Infinity, max = Infinity) {
  if (!root) return true;
  if (root.val <= min || root.val >= max) return false;
  return isValidBST(root.left, min, root.val) &&
         isValidBST(root.right, root.val, max);
}

// ── Lowest Common Ancestor — O(N) ────────────────
function lowestCommonAncestor(root, p, q) {
  if (!root || root === p || root === q) return root;
  const left  = lowestCommonAncestor(root.left,  p, q);
  const right = lowestCommonAncestor(root.right, p, q);
  if (left && right) return root; // p in left subtree, q in right
  return left || right;
}`,

      cpp: `struct TreeNode {
    int val; TreeNode *left, *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

// Validate BST using range check
bool isValidBST(TreeNode* root, long min = LONG_MIN, long max = LONG_MAX) {
    if (!root) return true;
    if (root->val <= min || root->val >= max) return false;
    return isValidBST(root->left, min, root->val) &&
           isValidBST(root->right, root->val, max);
}

// Kth Smallest in BST — O(N) inorder
int kthSmallest(TreeNode* root, int k) {
    int count = 0, result = -1;
    function<void(TreeNode*)> inorder = [&](TreeNode* node) {
        if (!node || count >= k) return;
        inorder(node->left);
        if (++count == k) result = node->val;
        inorder(node->right);
    };
    inorder(root);
    return result;
}

// Max Depth — O(N)
int maxDepth(TreeNode* root) {
    if (!root) return 0;
    return 1 + max(maxDepth(root->left), maxDepth(root->right));
}`,

      java: `public class BSTOperations {

    // Inorder successor in BST
    public TreeNode inorderSuccessor(TreeNode root, TreeNode p) {
        TreeNode successor = null;
        while (root != null) {
            if (p.val < root.val) { successor = root; root = root.left; }
            else root = root.right;
        }
        return successor;
    }

    // Count nodes in complete binary tree — O(log²N)
    public int countNodes(TreeNode root) {
        if (root == null) return 0;
        int leftH = 0, rightH = 0;
        TreeNode l = root, r = root;
        while (l != null) { l = l.left;  leftH++;  }
        while (r != null) { r = r.right; rightH++; }
        if (leftH == rightH) return (1 << leftH) - 1; // full tree = 2^h - 1
        return 1 + countNodes(root.left) + countNodes(root.right);
    }

    // Serialize / Deserialize Binary Tree
    public String serialize(TreeNode root) {
        if (root == null) return "null";
        return root.val + "," + serialize(root.left) + "," + serialize(root.right);
    }
    private int idx = 0;
    public TreeNode deserialize(String data) {
        String[] nodes = data.split(",");
        return buildTree(nodes);
    }
    private TreeNode buildTree(String[] nodes) {
        if (nodes[idx].equals("null")) { idx++; return null; }
        TreeNode node = new TreeNode(Integer.parseInt(nodes[idx++]));
        node.left  = buildTree(nodes);
        node.right = buildTree(nodes);
        return node;
    }
}`,

      python: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val; self.left = left; self.right = right

# ── BST Insert & Search ────────────────────────────
def insert(root, val):
    if not root: return TreeNode(val)
    if val < root.val:   root.left  = insert(root.left,  val)
    elif val > root.val: root.right = insert(root.right, val)
    return root

def search(root, val):
    if not root or root.val == val: return root
    return search(root.left, val) if val < root.val else search(root.right, val)

# ── Path Sum II — find all root-to-leaf paths with target sum ──
def path_sum(root, target):
    result = []
    def dfs(node, remaining, path):
        if not node: return
        path.append(node.val)
        if not node.left and not node.right and remaining == node.val:
            result.append(path[:])  # found a valid path
        dfs(node.left,  remaining - node.val, path)
        dfs(node.right, remaining - node.val, path)
        path.pop()  # backtrack
    dfs(root, target, [])
    return result

# ── Right side view — BFS level order ─────────────
from collections import deque

def right_side_view(root):
    if not root: return []
    result, queue = [], deque([root])
    while queue:
        level_size = len(queue)
        for i in range(level_size):
            node = queue.popleft()
            if i == level_size - 1:  # rightmost node at each level
                result.append(node.val)
            if node.left:  queue.append(node.left)
            if node.right: queue.append(node.right)
    return result`
    }
  },

  {
    id: "tree-traversal",
    title: "Tree Traversals",
    category: "Trees",
    phase: 3,
    difficulty: "Beginner",
    icon: "🛤️",
    iconColor: "cyan",
    summary: "DFS (Inorder, Preorder, Postorder) and BFS (Level Order) — recursive and iterative implementations.",
    readTime: "7 mins",
    details: `
      <h2>Tree Traversals</h2>
      <p>Tree traversal means visiting every node exactly once. The order in which nodes are visited gives different traversals, each useful for different problems.</p>

      <h3>DFS Traversals (Depth First Search)</h3>
      <table class="complexity-table">
        <thead><tr><th>Traversal</th><th>Order</th><th>Primary Use</th></tr></thead>
        <tbody>
          <tr><td><strong>Inorder (L→Root→R)</strong></td><td>Left subtree, root, right subtree</td><td>Get BST elements in sorted order</td></tr>
          <tr><td><strong>Preorder (Root→L→R)</strong></td><td>Root, left subtree, right subtree</td><td>Copy/serialize a tree; prefix expressions</td></tr>
          <tr><td><strong>Postorder (L→R→Root)</strong></td><td>Left subtree, right subtree, root</td><td>Delete a tree; postfix expressions; directory sizes</td></tr>
        </tbody>
      </table>

      <h3>BFS / Level Order Traversal</h3>
      <p>Uses a Queue. Visits nodes layer by layer — all nodes at depth d before depth d+1. Used for: shortest path in unweighted graph, minimum depth of binary tree, connect level-order neighbors, zigzag traversal.</p>

      <h3>All traversals: Time O(N), Space O(H)</h3>
      <p>Where H = height of tree. O(log N) for balanced, O(N) for skewed. BFS uses O(W) where W = max width (can be O(N/2) at lowest level of complete tree).</p>
    `,
    code: {
      javascript: `// ── Recursive DFS Traversals ──────────────────────
const inorder   = (r, res=[]) => { if (!r) return res; inorder(r.left,res); res.push(r.val); inorder(r.right,res); return res; };
const preorder  = (r, res=[]) => { if (!r) return res; res.push(r.val); preorder(r.left,res); preorder(r.right,res); return res; };
const postorder = (r, res=[]) => { if (!r) return res; postorder(r.left,res); postorder(r.right,res); res.push(r.val); return res; };

// ── Iterative Inorder — Stack ──────────────────────
function inorderIterative(root) {
  const result = [], stack = [];
  let curr = root;
  while (curr || stack.length) {
    while (curr) { stack.push(curr); curr = curr.left; }
    curr = stack.pop();
    result.push(curr.val);
    curr = curr.right;
  }
  return result;
}

// ── Iterative Preorder — Stack ─────────────────────
function preorderIterative(root) {
  if (!root) return [];
  const result = [], stack = [root];
  while (stack.length) {
    const node = stack.pop();
    result.push(node.val);
    if (node.right) stack.push(node.right); // right first (LIFO)
    if (node.left)  stack.push(node.left);
  }
  return result;
}

// ── BFS Level Order ────────────────────────────────
function levelOrder(root) {
  if (!root) return [];
  const result = [], queue = [root];
  while (queue.length) {
    const level = [], size = queue.length;
    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      level.push(node.val);
      if (node.left)  queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    result.push(level);
  }
  return result;
}

// ── Zigzag Level Order ────────────────────────────
function zigzagLevelOrder(root) {
  if (!root) return [];
  const result = [], queue = [root];
  let leftToRight = true;
  while (queue.length) {
    const size = queue.length;
    const level = new Array(size);
    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      const idx = leftToRight ? i : size - 1 - i;
      level[idx] = node.val;
      if (node.left)  queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    result.push(level);
    leftToRight = !leftToRight;
  }
  return result;
}`,

      cpp: `#include <vector>
#include <stack>
#include <queue>
using namespace std;

// Morris Traversal — O(N) time, O(1) space! (no stack, no recursion)
vector<int> morrisInorder(TreeNode* root) {
    vector<int> result;
    TreeNode* curr = root;
    while (curr) {
        if (!curr->left) {
            result.push_back(curr->val);
            curr = curr->right;
        } else {
            // Find inorder predecessor
            TreeNode* pred = curr->left;
            while (pred->right && pred->right != curr) pred = pred->right;
            if (!pred->right) {          // thread not set
                pred->right = curr;      // create thread
                curr = curr->left;
            } else {                     // thread exists — we've been here
                pred->right = nullptr;   // remove thread
                result.push_back(curr->val);
                curr = curr->right;
            }
        }
    }
    return result;
}

// Level Order with level index
vector<vector<int>> levelOrder(TreeNode* root) {
    if (!root) return {};
    vector<vector<int>> result;
    queue<TreeNode*> q;
    q.push(root);
    while (!q.empty()) {
        int size = q.size();
        vector<int> level;
        while (size--) {
            auto node = q.front(); q.pop();
            level.push_back(node->val);
            if (node->left)  q.push(node->left);
            if (node->right) q.push(node->right);
        }
        result.push_back(level);
    }
    return result;
}`,

      java: `import java.util.*;

public class TreeTraversals {

    // Iterative Postorder — tricky! Use two stacks or reverse preorder
    public List<Integer> postorderIterative(TreeNode root) {
        LinkedList<Integer> result = new LinkedList<>(); // use addFirst for reverse
        if (root == null) return result;
        Deque<TreeNode> stack = new ArrayDeque<>();
        stack.push(root);
        while (!stack.isEmpty()) {
            TreeNode node = stack.pop();
            result.addFirst(node.val);         // prepend → correct postorder
            if (node.left  != null) stack.push(node.left);
            if (node.right != null) stack.push(node.right);
        }
        return result;
    }

    // Vertical Order Traversal — O(N log N)
    public List<List<Integer>> verticalTraversal(TreeNode root) {
        TreeMap<Integer, TreeMap<Integer, List<Integer>>> map = new TreeMap<>();
        dfs(root, 0, 0, map);
        List<List<Integer>> result = new ArrayList<>();
        for (var colEntry : map.values()) {
            List<Integer> col = new ArrayList<>();
            for (var rowEntry : colEntry.values()) {
                Collections.sort(rowEntry);
                col.addAll(rowEntry);
            }
            result.add(col);
        }
        return result;
    }
    private void dfs(TreeNode node, int col, int row, TreeMap<Integer, TreeMap<Integer, List<Integer>>> map) {
        if (node == null) return;
        map.computeIfAbsent(col, k -> new TreeMap<>()).computeIfAbsent(row, k -> new ArrayList<>()).add(node.val);
        dfs(node.left,  col - 1, row + 1, map);
        dfs(node.right, col + 1, row + 1, map);
    }
}`,

      python: `from collections import deque

# ── All DFS traversals (recursive + iterative) ─────
def inorder(root):
    return inorder(root.left) + [root.val] + inorder(root.right) if root else []

def preorder(root):
    return [root.val] + preorder(root.left) + preorder(root.right) if root else []

def postorder(root):
    return postorder(root.left) + postorder(root.right) + [root.val] if root else []

# Iterative inorder (classic interview question)
def inorder_iterative(root):
    result, stack, curr = [], [], root
    while curr or stack:
        while curr:
            stack.append(curr)
            curr = curr.left
        curr = stack.pop()
        result.append(curr.val)
        curr = curr.right
    return result

# ── BFS level order ────────────────────────────────
def level_order(root):
    if not root: return []
    result, queue = [], deque([root])
    while queue:
        level = []
        for _ in range(len(queue)):
            node = queue.popleft()
            level.append(node.val)
            if node.left:  queue.append(node.left)
            if node.right: queue.append(node.right)
        result.append(level)
    return result

# ── Check if two trees are identical ──────────────
def is_same_tree(p, q):
    if not p and not q: return True
    if not p or not q or p.val != q.val: return False
    return is_same_tree(p.left, q.left) and is_same_tree(p.right, q.right)

# ── Diameter of binary tree — O(N) ────────────────
def diameter_of_binary_tree(root):
    max_dia = [0]
    def depth(node):
        if not node: return 0
        l, r = depth(node.left), depth(node.right)
        max_dia[0] = max(max_dia[0], l + r)
        return 1 + max(l, r)
    depth(root)
    return max_dia[0]`
    }
  },

  {
    id: "avl-trees",
    title: "AVL Trees & Balancing",
    category: "Trees",
    phase: 3,
    difficulty: "Advanced",
    icon: "⚖️",
    iconColor: "rose",
    summary: "Self-balancing BST. Balance factor, rotations (LL, RR, LR, RL), and why AVL guarantees O(log N) always.",
    readTime: "8 mins",
    details: `
      <h2>AVL Trees</h2>
      <p>A standard BST degrades to O(N) when elements are inserted in sorted order (becomes a chain). AVL Trees fix this by <strong>automatically rebalancing</strong> after every insertion or deletion, guaranteeing O(log N) in all cases.</p>

      <h3>Balance Factor</h3>
      <p><strong>Balance Factor (BF) = height(left subtree) - height(right subtree)</strong></p>
      <p>An AVL Tree maintains |BF| ≤ 1 for every node. When |BF| > 1, one or more rotations are performed to restore balance.</p>

      <h3>Four Rotation Cases</h3>
      <table class="complexity-table">
        <thead><tr><th>Case</th><th>Imbalance</th><th>Fix</th><th>Rotations</th></tr></thead>
        <tbody>
          <tr><td>Left-Left (LL)</td><td>Left heavy, left child is left heavy</td><td>Single Right Rotation</td><td>1</td></tr>
          <tr><td>Right-Right (RR)</td><td>Right heavy, right child is right heavy</td><td>Single Left Rotation</td><td>1</td></tr>
          <tr><td>Left-Right (LR)</td><td>Left heavy, left child is right heavy</td><td>Left Rotate child, then Right Rotate root</td><td>2</td></tr>
          <tr><td>Right-Left (RL)</td><td>Right heavy, right child is left heavy</td><td>Right Rotate child, then Left Rotate root</td><td>2</td></tr>
        </tbody>
      </table>

      <h3>AVL vs Red-Black Trees</h3>
      <table class="complexity-table">
        <thead><tr><th>Property</th><th>AVL Tree</th><th>Red-Black Tree</th></tr></thead>
        <tbody>
          <tr><td>Height guarantee</td><td>Stricter: 1.44 log N</td><td>Looser: 2 log N</td></tr>
          <tr><td>Search speed</td><td>Faster (more balanced)</td><td>Slightly slower</td></tr>
          <tr><td>Insert/Delete</td><td>More rotations needed</td><td>Fewer rotations</td></tr>
          <tr><td>Used in</td><td>Read-heavy workloads</td><td>Java TreeMap, C++ std::map</td></tr>
        </tbody>
      </table>
    `,
    code: {
      javascript: `class AVLNode {
  constructor(val) {
    this.val = val; this.left = this.right = null; this.height = 1;
  }
}

class AVLTree {
  _height(n) { return n ? n.height : 0; }
  _bf(n)     { return n ? this._height(n.left) - this._height(n.right) : 0; }
  _updateH(n){ n.height = 1 + Math.max(this._height(n.left), this._height(n.right)); }

  _rotateRight(y) {
    const x = y.left, T2 = x.right;
    x.right = y; y.left = T2;
    this._updateH(y); this._updateH(x);
    return x; // new root
  }
  _rotateLeft(x) {
    const y = x.right, T2 = y.left;
    y.left = x; x.right = T2;
    this._updateH(x); this._updateH(y);
    return y;
  }

  insert(node, val) {
    // 1. Standard BST insert
    if (!node) return new AVLNode(val);
    if      (val < node.val) node.left  = this.insert(node.left,  val);
    else if (val > node.val) node.right = this.insert(node.right, val);
    else return node; // duplicate

    // 2. Update height
    this._updateH(node);

    // 3. Get balance factor and rotate if needed
    const bf = this._bf(node);

    if (bf > 1 && val < node.left.val)  return this._rotateRight(node);        // LL
    if (bf < -1 && val > node.right.val) return this._rotateLeft(node);        // RR
    if (bf > 1 && val > node.left.val)  {                                       // LR
      node.left = this._rotateLeft(node.left);
      return this._rotateRight(node);
    }
    if (bf < -1 && val < node.right.val) {                                     // RL
      node.right = this._rotateRight(node.right);
      return this._rotateLeft(node);
    }
    return node;
  }
}`,

      cpp: `struct AVLNode {
    int val, height;
    AVLNode *left, *right;
    AVLNode(int v) : val(v), height(1), left(nullptr), right(nullptr) {}
};

int height(AVLNode* n) { return n ? n->height : 0; }
int bf(AVLNode* n)     { return n ? height(n->left) - height(n->right) : 0; }
void updateH(AVLNode* n){ if(n) n->height = 1 + max(height(n->left), height(n->right)); }

AVLNode* rotateRight(AVLNode* y) {
    AVLNode* x = y->left, *T2 = x->right;
    x->right = y; y->left = T2;
    updateH(y); updateH(x);
    return x;
}
AVLNode* rotateLeft(AVLNode* x) {
    AVLNode* y = x->right, *T2 = y->left;
    y->left = x; x->right = T2;
    updateH(x); updateH(y);
    return y;
}

AVLNode* insert(AVLNode* node, int val) {
    if (!node) return new AVLNode(val);
    if (val < node->val)      node->left  = insert(node->left,  val);
    else if (val > node->val) node->right = insert(node->right, val);
    else return node;

    updateH(node);
    int balance = bf(node);

    if (balance > 1  && val < node->left->val)  return rotateRight(node);
    if (balance < -1 && val > node->right->val) return rotateLeft(node);
    if (balance > 1  && val > node->left->val)  { node->left = rotateLeft(node->left); return rotateRight(node); }
    if (balance < -1 && val < node->right->val) { node->right = rotateRight(node->right); return rotateLeft(node); }
    return node;
}`,
      java: `// Java's TreeMap uses Red-Black Tree internally
// Equivalent O(log N) guarantees, but fewer rotations
import java.util.*;

TreeMap<Integer, Integer> map = new TreeMap<>();
map.put(3, "three"); // O(log N)
map.get(3);          // O(log N)
map.firstKey();      // O(log N) — BST min
map.lastKey();       // O(log N) — BST max
map.floorKey(5);     // largest key <= 5
map.ceilingKey(5);   // smallest key >= 5

// TreeSet — ordered set backed by Red-Black Tree
TreeSet<Integer> set = new TreeSet<>(Arrays.asList(5,2,8,1,9));
set.first();         // 1 — min
set.last();          // 9 — max
set.floor(6);        // 5 — largest <= 6
set.ceiling(6);      // 8 — smallest >= 6
set.subSet(2, 8);    // [2, 5] — range view`,
      python: `# Python's sortedcontainers library provides SortedList
# (backed by a balanced BST internally)
# pip install sortedcontainers

from sortedcontainers import SortedList, SortedDict

sl = SortedList([3, 1, 4, 1, 5, 9, 2, 6])
sl.add(7)
print(sl)            # [1, 1, 2, 3, 4, 5, 6, 7, 9]
sl.irange(2, 6)      # range view: [2, 3, 4, 5, 6] — O(log N)
sl.index(5)          # 5 — O(log N)
sl.discard(4)

# SortedDict
sd = SortedDict({'b': 2, 'a': 1, 'c': 3})
sd.peekitem(0)       # ('a', 1) — smallest key
sd.peekitem(-1)      # ('c', 3) — largest key

# ── AVL height vs unbalanced BST ─────────────────
# AVL: inserting [1, 2, 3, 4, 5] in sorted order
# Unbalanced BST height = 5 (chain)
# AVL height = 3 (automatically rebalanced)
# AVL guarantees height ≤ 1.44 * log2(N+2)`
    }
  },

  {
    id: "tries",
    title: "Tries (Prefix Trees)",
    category: "Trees",
    phase: 3,
    difficulty: "Intermediate",
    icon: "🔠",
    iconColor: "purple",
    summary: "Character-by-character search tree for strings. O(L) insert/search where L = word length. Auto-complete, spell check.",
    readTime: "7 mins",
    details: `
      <h2>Tries (Prefix Trees)</h2>
      <p>A Trie is a tree where each node represents a character. A word is stored by tracing a path from root to a marked leaf, where each edge represents one character. All words sharing a prefix share the same initial path.</p>

      <h3>Why Not a Hash Table for Strings?</h3>
      <ul>
        <li>A Trie finds all words with a given prefix in O(L + K) where K = results. A hash table cannot.</li>
        <li>Lexicographic (sorted) iteration is natural in a Trie.</li>
        <li>No hash collisions.</li>
        <li>Space can be worse for sparse datasets, but shared prefixes save space for large dictionaries.</li>
      </ul>

      <h3>Time Complexities</h3>
      <table class="complexity-table">
        <thead><tr><th>Operation</th><th>Time</th><th>Where L = word length</th></tr></thead>
        <tbody>
          <tr><td>Insert word</td><td><span class="complexity-badge complexity-green">O(L)</span></td><td>Visit/create one node per character</td></tr>
          <tr><td>Search word</td><td><span class="complexity-badge complexity-green">O(L)</span></td><td>Traverse L characters</td></tr>
          <tr><td>Starts-with prefix</td><td><span class="complexity-badge complexity-green">O(L)</span></td><td>Same — no need to reach leaf</td></tr>
          <tr><td>Delete word</td><td><span class="complexity-badge complexity-green">O(L)</span></td><td>Unmark isEnd; prune empty branches</td></tr>
          <tr><td>Space</td><td>O(ALPHABET × N × L)</td><td>26 pointers per node in worst case</td></tr>
        </tbody>
      </table>

      <h3>🎯 Applications</h3>
      <ul>
        <li><strong>Auto-complete:</strong> Type a prefix → Trie returns all words with that prefix.</li>
        <li><strong>Spell checker:</strong> Verify if a word is in the dictionary in O(L).</li>
        <li><strong>IP routing:</strong> Longest prefix matching in network routers.</li>
        <li><strong>Word search:</strong> Find all dictionary words in a 2D board (Boggle).</li>
      </ul>
    `,
    code: {
      javascript: `class TrieNode {
  constructor() {
    this.children = {}; // char → TrieNode
    this.isEnd = false;
    this.count = 0;     // words passing through this node
  }
}

class Trie {
  constructor() { this.root = new TrieNode(); }

  insert(word) {
    let node = this.root;
    for (const ch of word) {
      if (!node.children[ch]) node.children[ch] = new TrieNode();
      node = node.children[ch];
      node.count++;
    }
    node.isEnd = true;
  }

  search(word) {
    let node = this.root;
    for (const ch of word) {
      if (!node.children[ch]) return false;
      node = node.children[ch];
    }
    return node.isEnd;
  }

  startsWith(prefix) {
    let node = this.root;
    for (const ch of prefix) {
      if (!node.children[ch]) return false;
      node = node.children[ch];
    }
    return true;
  }

  // Auto-complete: all words with given prefix
  autocomplete(prefix) {
    let node = this.root;
    for (const ch of prefix) {
      if (!node.children[ch]) return [];
      node = node.children[ch];
    }
    const results = [];
    this._dfs(node, prefix, results);
    return results;
  }
  _dfs(node, currentWord, results) {
    if (node.isEnd) results.push(currentWord);
    for (const [ch, child] of Object.entries(node.children))
      this._dfs(child, currentWord + ch, results);
  }
}

// Word Search II (Boggle) — O(M × N × 4^L) using Trie to prune
function findWords(board, words) {
  const trie = new Trie();
  words.forEach(w => trie.insert(w));
  const result = new Set();
  const [rows, cols] = [board.length, board[0].length];

  function dfs(r, c, node, word) {
    if (r < 0 || r >= rows || c < 0 || c >= cols || board[r][c] === '#') return;
    const ch = board[r][c];
    const nextNode = node.children[ch];
    if (!nextNode) return; // prune: no words with this prefix
    word += ch;
    if (nextNode.isEnd) result.add(word);
    board[r][c] = '#'; // mark visited
    for (const [dr, dc] of [[0,1],[0,-1],[1,0],[-1,0]])
      dfs(r+dr, c+dc, nextNode, word);
    board[r][c] = ch; // restore
  }

  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++)
      dfs(r, c, trie.root, '');
  return [...result];
}`,

      cpp: `struct TrieNode {
    TrieNode* children[26] = {};
    bool isEnd = false;
};

class Trie {
    TrieNode* root = new TrieNode();
public:
    void insert(const string& word) {
        TrieNode* node = root;
        for (char c : word) {
            int i = c - 'a';
            if (!node->children[i]) node->children[i] = new TrieNode();
            node = node->children[i];
        }
        node->isEnd = true;
    }
    bool search(const string& word) {
        TrieNode* node = root;
        for (char c : word) {
            if (!node->children[c-'a']) return false;
            node = node->children[c-'a'];
        }
        return node->isEnd;
    }
    bool startsWith(const string& prefix) {
        TrieNode* node = root;
        for (char c : prefix) {
            if (!node->children[c-'a']) return false;
            node = node->children[c-'a'];
        }
        return true;
    }
};`,
      java: `class Trie {
    private TrieNode root = new TrieNode();

    static class TrieNode {
        TrieNode[] children = new TrieNode[26];
        boolean isEnd = false;
    }

    public void insert(String word) {
        TrieNode node = root;
        for (char c : word.toCharArray()) {
            int i = c - 'a';
            if (node.children[i] == null) node.children[i] = new TrieNode();
            node = node.children[i];
        }
        node.isEnd = true;
    }

    public boolean search(String word) {
        TrieNode node = root;
        for (char c : word.toCharArray()) {
            if (node.children[c - 'a'] == null) return false;
            node = node.children[c - 'a'];
        }
        return node.isEnd;
    }

    // Design Add and Search Words (supports '.' wildcard)
    public boolean searchWithWildcard(String word) {
        return dfs(word, 0, root);
    }
    private boolean dfs(String word, int i, TrieNode node) {
        if (i == word.length()) return node.isEnd;
        char c = word.charAt(i);
        if (c == '.') {
            for (TrieNode child : node.children)
                if (child != null && dfs(word, i + 1, child)) return true;
            return false;
        }
        return node.children[c - 'a'] != null && dfs(word, i + 1, node.children[c - 'a']);
    }
}`,
      python: `class TrieNode:
    def __init__(self):
        self.children = {}  # char → TrieNode
        self.is_end   = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word: str) -> None:
        node = self.root
        for ch in word:
            if ch not in node.children:
                node.children[ch] = TrieNode()
            node = node.children[ch]
        node.is_end = True

    def search(self, word: str) -> bool:
        node = self.root
        for ch in word:
            if ch not in node.children: return False
            node = node.children[ch]
        return node.is_end

    def starts_with(self, prefix: str) -> bool:
        node = self.root
        for ch in prefix:
            if ch not in node.children: return False
            node = node.children[ch]
        return True

    def autocomplete(self, prefix: str) -> list:
        node = self.root
        for ch in prefix:
            if ch not in node.children: return []
            node = node.children[ch]
        results = []
        def dfs(n, word):
            if n.is_end: results.append(word)
            for ch, child in n.children.items(): dfs(child, word + ch)
        dfs(node, prefix)
        return results

# Test
trie = Trie()
for w in ["apple", "app", "application", "apply", "banana"]:
    trie.insert(w)
print(trie.autocomplete("app"))  # ['app', 'apple', 'application', 'apply']`
    }
  },

  {
    id: "graphs",
    title: "Graphs & Graph Traversals",
    category: "Graphs",
    phase: 3,
    difficulty: "Intermediate",
    icon: "🕸️",
    iconColor: "amber",
    summary: "Graph representations, BFS, DFS, topological sort, cycle detection — the most powerful and interview-heavy data structure.",
    readTime: "10 mins",
    details: `
      <h2>Graphs</h2>
      <p>A graph G = (V, E) is a set of vertices (nodes) connected by edges. Graphs model networks, maps, social connections, dependency systems, and are used in some of the most important algorithms in computer science.</p>

      <h3>Graph Types</h3>
      <ul>
        <li><strong>Directed (Digraph):</strong> Edges have direction. A→B does not imply B→A. (Twitter followers, course prerequisites)</li>
        <li><strong>Undirected:</strong> Edges are bidirectional. (Facebook friends, road networks)</li>
        <li><strong>Weighted:</strong> Edges have a numerical weight/cost. (Road distances, network latency)</li>
        <li><strong>DAG (Directed Acyclic Graph):</strong> No cycles. Used in build systems, dependency resolution, DP.</li>
      </ul>

      <h3>Representations</h3>
      <table class="complexity-table">
        <thead><tr><th>Method</th><th>Space</th><th>Edge lookup</th><th>Neighbors</th><th>Best for</th></tr></thead>
        <tbody>
          <tr><td>Adjacency List</td><td>O(V + E)</td><td>O(degree)</td><td>O(degree)</td><td>Sparse graphs (most real-world)</td></tr>
          <tr><td>Adjacency Matrix</td><td>O(V²)</td><td>O(1)</td><td>O(V)</td><td>Dense graphs, quick edge lookup</td></tr>
          <tr><td>Edge List</td><td>O(E)</td><td>O(E)</td><td>O(E)</td><td>Kruskal's MST algorithm</td></tr>
        </tbody>
      </table>

      <h3>Core Traversals</h3>
      <ul>
        <li><strong>BFS (Queue):</strong> O(V+E). Shortest path (unweighted), level-by-level exploration, bipartite check.</li>
        <li><strong>DFS (Stack/Recursion):</strong> O(V+E). Cycle detection, topological sort, connected components, path finding.</li>
      </ul>

      <h3>🎯 Topological Sort</h3>
      <p>Ordering of vertices in a DAG such that for every directed edge u→v, u comes before v. Used for: build systems, course scheduling, dependency resolution. Two algorithms: Kahn's (BFS-based) and DFS-based.</p>
    `,
    code: {
      javascript: `// ── Graph Representations ─────────────────────────
// Adjacency List (most common in interviews)
const graph = {
  0: [1, 2],
  1: [0, 3],
  2: [0, 3],
  3: [1, 2, 4],
  4: [3]
};

// ── BFS — O(V+E) ──────────────────────────────────
function bfs(graph, start) {
  const visited = new Set([start]);
  const queue   = [start];
  const order   = [];
  while (queue.length) {
    const node = queue.shift();
    order.push(node);
    for (const neighbor of (graph[node] || [])) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
  return order;
}

// ── DFS — O(V+E) ──────────────────────────────────
function dfs(graph, start, visited = new Set()) {
  visited.add(start);
  for (const neighbor of (graph[start] || []))
    if (!visited.has(neighbor)) dfs(graph, neighbor, visited);
  return [...visited];
}

// ── Number of Islands — DFS on 2D grid ───────────
function numIslands(grid) {
  let count = 0;
  const dfs = (r, c) => {
    if (r < 0 || r >= grid.length || c < 0 || c >= grid[0].length || grid[r][c] !== '1') return;
    grid[r][c] = '0'; // mark visited (in-place)
    dfs(r+1,c); dfs(r-1,c); dfs(r,c+1); dfs(r,c-1);
  };
  for (let r = 0; r < grid.length; r++)
    for (let c = 0; c < grid[0].length; c++)
      if (grid[r][c] === '1') { dfs(r, c); count++; }
  return count;
}

// ── Topological Sort — Kahn's BFS-based ──────────
function topoSort(numCourses, prerequisites) {
  const adj = Array.from({length: numCourses}, () => []);
  const inDegree = new Array(numCourses).fill(0);
  for (const [a, b] of prerequisites) { adj[b].push(a); inDegree[a]++; }

  const queue = [];
  for (let i = 0; i < numCourses; i++) if (inDegree[i] === 0) queue.push(i);

  const order = [];
  while (queue.length) {
    const node = queue.shift();
    order.push(node);
    for (const next of adj[node]) if (--inDegree[next] === 0) queue.push(next);
  }
  return order.length === numCourses ? order : []; // empty = cycle detected
}`,

      cpp: `#include <vector>
#include <queue>
#include <unordered_set>
using namespace std;

// BFS — Shortest path in unweighted graph
vector<int> shortestPath(vector<vector<int>>& adj, int src, int dst, int V) {
    vector<int> dist(V, -1), parent(V, -1);
    queue<int> q;
    dist[src] = 0; q.push(src);
    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (int v : adj[u]) {
            if (dist[v] == -1) {
                dist[v] = dist[u] + 1;
                parent[v] = u;
                q.push(v);
            }
        }
    }
    // Reconstruct path
    vector<int> path;
    for (int v = dst; v != -1; v = parent[v]) path.push_back(v);
    reverse(path.begin(), path.end());
    return path;
}

// Cycle detection in directed graph — DFS with 3 colors
// 0 = unvisited, 1 = in current path, 2 = fully processed
bool hasCycleDFS(vector<vector<int>>& adj, int u, vector<int>& color) {
    color[u] = 1; // gray = in current DFS path
    for (int v : adj[u]) {
        if (color[v] == 1) return true;  // back edge = cycle!
        if (color[v] == 0 && hasCycleDFS(adj, v, color)) return true;
    }
    color[u] = 2; // black = done
    return false;
}`,

      java: `import java.util.*;

public class GraphAlgorithms {

    // Clone Graph — BFS
    public Node cloneGraph(Node node) {
        if (node == null) return null;
        Map<Node, Node> map = new HashMap<>();
        Queue<Node> q = new LinkedList<>();
        q.offer(node);
        map.put(node, new Node(node.val));
        while (!q.isEmpty()) {
            Node curr = q.poll();
            for (Node neighbor : curr.neighbors) {
                if (!map.containsKey(neighbor)) {
                    map.put(neighbor, new Node(neighbor.val));
                    q.offer(neighbor);
                }
                map.get(curr).neighbors.add(map.get(neighbor));
            }
        }
        return map.get(node);
    }

    // Course Schedule II — Topological Sort
    public int[] findOrder(int numCourses, int[][] prerequisites) {
        int[] inDegree = new int[numCourses];
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < numCourses; i++) adj.add(new ArrayList<>());
        for (int[] pre : prerequisites) { adj.get(pre[1]).add(pre[0]); inDegree[pre[0]]++; }

        Queue<Integer> q = new LinkedList<>();
        for (int i = 0; i < numCourses; i++) if (inDegree[i] == 0) q.offer(i);

        int[] order = new int[numCourses];
        int idx = 0;
        while (!q.isEmpty()) {
            int course = q.poll();
            order[idx++] = course;
            for (int next : adj.get(course)) if (--inDegree[next] == 0) q.offer(next);
        }
        return idx == numCourses ? order : new int[]{};
    }
}`,

      python: `from collections import deque, defaultdict

# ── BFS shortest path in unweighted graph ─────────
def bfs_shortest(graph, start, end):
    if start == end: return [start]
    visited = {start}
    queue   = deque([(start, [start])])
    while queue:
        node, path = queue.popleft()
        for neighbor in graph.get(node, []):
            if neighbor == end:
                return path + [neighbor]
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append((neighbor, path + [neighbor]))
    return []  # no path found

# ── DFS with cycle detection (directed graph) ─────
def has_cycle(graph, n):
    # 0=unvisited, 1=in path, 2=done
    color = [0] * n
    def dfs(u):
        color[u] = 1
        for v in graph.get(u, []):
            if color[v] == 1: return True    # back edge = cycle
            if color[v] == 0 and dfs(v): return True
        color[u] = 2
        return False
    return any(dfs(i) for i in range(n) if color[i] == 0)

# ── Topological Sort (Kahn's Algorithm) ───────────
def topo_sort(n, edges):
    adj = defaultdict(list)
    in_degree = [0] * n
    for u, v in edges:
        adj[u].append(v)
        in_degree[v] += 1
    queue  = deque(i for i in range(n) if in_degree[i] == 0)
    result = []
    while queue:
        node = queue.popleft()
        result.append(node)
        for neighbor in adj[node]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)
    return result if len(result) == n else []  # empty = cycle

# ── Union-Find (Disjoint Set) ─────────────────────
class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank   = [0] * n

    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])  # path compression
        return self.parent[x]

    def union(self, x, y) -> bool:
        px, py = self.find(x), self.find(y)
        if px == py: return False   # already connected (would form cycle)
        if self.rank[px] < self.rank[py]: px, py = py, px
        self.parent[py] = px
        if self.rank[px] == self.rank[py]: self.rank[px] += 1
        return True`
    }
  },

  // ── PHASE 3 QUIZ ──
  {
    id: "quiz-phase3",
    type: "quiz",
    phase: 3,
    difficulty: "Intermediate",
    title: "Phase 3 Quiz — Trees & Graphs",
    category: "Trees",
    icon: "🧪",
    iconColor: "amber",
    questions: [
      {
        question: "In-order traversal of a Binary Search Tree produces elements in what order?",
        options: ["Reverse sorted (descending)", "Random order", "Sorted (ascending)", "Breadth-first order"],
        answer: 2,
        explanation: "In-order traversal visits Left → Root → Right. For a BST, since all elements in the left subtree are smaller than root, and all in right subtree are larger, in-order traversal always yields elements in sorted (ascending) order."
      },
      {
        question: "What is the time complexity to insert a word of length L into a Trie?",
        options: ["O(N) where N = total words in trie", "O(L)", "O(L × 26)", "O(log N)"],
        answer: 1,
        explanation: "Inserting into a Trie visits exactly L nodes — one per character. Each step is O(1) (array or hash lookup). The total is O(L), independent of how many other words exist in the Trie."
      },
      {
        question: "What is the main difference between BFS and DFS in graph traversal?",
        options: ["BFS uses a Stack; DFS uses a Queue", "BFS finds shortest paths in unweighted graphs; DFS does not guarantee shortest path", "DFS is always faster than BFS", "BFS can only be used on trees, not graphs"],
        answer: 1,
        explanation: "BFS explores level by level (using a Queue), guaranteeing the shortest path (fewest edges) in unweighted graphs. DFS goes as deep as possible first (using a Stack/recursion) and does not guarantee shortest path — it finds A path, not necessarily the shortest."
      },
      {
        question: "What does Topological Sort require about the graph?",
        options: ["The graph must be undirected", "The graph must be a DAG (Directed Acyclic Graph)", "The graph must be fully connected", "All edges must have equal weight"],
        answer: 1,
        explanation: "Topological sort is only possible on a DAG (Directed Acyclic Graph). If there's a cycle, no valid topological ordering exists — you'd need X before Y, but also Y before X. This is why Kahn's algorithm returns empty if it can't process all nodes (cycle detected)."
      },
      {
        question: "An AVL tree is always preferred over a regular BST because:",
        options: ["AVL trees use less memory", "AVL trees guarantee O(log N) for all operations by maintaining balance, while BST degrades to O(N) for sorted input", "AVL trees support faster deletion", "AVL trees don't need a comparator function"],
        answer: 1,
        explanation: "A regular BST can degrade to a linked list (height N) when elements are inserted in sorted order, making all operations O(N). An AVL tree maintains the invariant that |balance_factor| ≤ 1 for every node through rotations, guaranteeing height ≤ 1.44 log N and all operations in O(log N)."
      }
    ]
  },

  // ══════════════════════════════════════════════════════
  //  PHASE 4 — ADVANCED ALGORITHMS (5 concepts + quiz)
  // ══════════════════════════════════════════════════════

  {
    id: "dynamic-programming",
    title: "Dynamic Programming",
    category: "Advanced Algorithms",
    phase: 4,
    difficulty: "Advanced",
    icon: "🧩",
    iconColor: "rose",
    summary: "Memoization (top-down) and tabulation (bottom-up). Identify overlapping subproblems and optimal substructure.",
    readTime: "12 mins",
    details: `
      <h2>Dynamic Programming</h2>
      <p>DP solves problems by breaking them into <strong>overlapping subproblems</strong> and storing their results to avoid redundant computation. The key insight: if the naive recursive solution recomputes the same subproblem multiple times, DP can reduce exponential time to polynomial.</p>

      <h3>Two Prerequisites for DP</h3>
      <ul>
        <li><strong>Optimal Substructure:</strong> An optimal solution to the problem contains optimal solutions to subproblems.</li>
        <li><strong>Overlapping Subproblems:</strong> The same subproblems appear multiple times. (If they don't overlap → Divide & Conquer, not DP.)</li>
      </ul>

      <h3>Top-Down vs Bottom-Up</h3>
      <table class="complexity-table">
        <thead><tr><th>Approach</th><th>Method</th><th>Pros</th><th>Cons</th></tr></thead>
        <tbody>
          <tr><td><strong>Top-Down (Memoization)</strong></td><td>Recursive + cache</td><td>Natural, only computes needed subproblems</td><td>Stack overflow risk, function call overhead</td></tr>
          <tr><td><strong>Bottom-Up (Tabulation)</strong></td><td>Iterative + table</td><td>No recursion, often space-optimizable</td><td>Must determine computation order</td></tr>
        </tbody>
      </table>

      <h3>Classic DP Problem Categories</h3>
      <ul>
        <li><strong>1D DP:</strong> Fibonacci, Climbing Stairs, House Robber, Jump Game</li>
        <li><strong>Grid DP:</strong> Unique Paths, Minimum Path Sum, Dungeon Game</li>
        <li><strong>Interval DP:</strong> Matrix Chain Multiplication, Burst Balloons</li>
        <li><strong>Knapsack:</strong> 0/1 Knapsack, Coin Change, Partition Equal Subset Sum</li>
        <li><strong>String DP:</strong> Longest Common Subsequence, Edit Distance, Palindromic Substrings</li>
        <li><strong>State Machine DP:</strong> Stock Buy/Sell with Cooldown</li>
      </ul>

      <h3>🎯 DP Problem-Solving Framework</h3>
      <ol>
        <li><strong>Define the state:</strong> What does dp[i] (or dp[i][j]) represent?</li>
        <li><strong>Write the recurrence:</strong> How does dp[i] relate to smaller states?</li>
        <li><strong>Identify base cases.</strong></li>
        <li><strong>Determine iteration order</strong> (ensure dependencies computed first).</li>
        <li><strong>Optimize space</strong> if possible (rolling array technique).</li>
      </ol>
    `,
    code: {
      javascript: `// ── Framework: House Robber — 1D DP ──────────────
// State: dp[i] = max money robbing houses 0..i
// Recurrence: dp[i] = max(dp[i-1], dp[i-2] + nums[i])
// Base: dp[0] = nums[0], dp[1] = max(nums[0], nums[1])
function rob(nums) {
  if (nums.length === 1) return nums[0];
  let prev2 = nums[0], prev1 = Math.max(nums[0], nums[1]);
  for (let i = 2; i < nums.length; i++) {
    [prev2, prev1] = [prev1, Math.max(prev1, prev2 + nums[i])];
  }
  return prev1; // O(N) time, O(1) space (space-optimized!)
}

// ── Coin Change — Unbounded Knapsack ─────────────
// State: dp[i] = min coins to make amount i
// Recurrence: dp[i] = min(dp[i], dp[i-coin]+1) for each coin
function coinChange(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (const coin of coins)
    for (let i = coin; i <= amount; i++)
      dp[i] = Math.min(dp[i], dp[i - coin] + 1);
  return dp[amount] === Infinity ? -1 : dp[amount];
}

// ── Longest Common Subsequence — 2D DP ───────────
// State: dp[i][j] = LCS of s1[0..i-1] and s2[0..j-1]
function lcs(s1, s2) {
  const m = s1.length, n = s2.length;
  const dp = Array.from({length: m+1}, () => new Array(n+1).fill(0));
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      dp[i][j] = s1[i-1] === s2[j-1]
        ? dp[i-1][j-1] + 1
        : Math.max(dp[i-1][j], dp[i][j-1]);
  return dp[m][n];
}

// ── Edit Distance — 2D DP ─────────────────────────
function editDistance(word1, word2) {
  const m = word1.length, n = word2.length;
  const dp = Array.from({length: m+1}, (_, i) => Array.from({length: n+1}, (_, j) => i+j));
  // Explanation: dp[i][0]=i (delete all), dp[0][j]=j (insert all)
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      dp[i][j] = word1[i-1] === word2[j-1]
        ? dp[i-1][j-1]                                              // match: free
        : 1 + Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]);    // del/ins/replace
  return dp[m][n];
}

// ── 0/1 Knapsack ──────────────────────────────────
function knapsack(weights, values, W) {
  const n = weights.length;
  const dp = new Array(W + 1).fill(0); // space-optimized: 1D array!
  for (let i = 0; i < n; i++)
    for (let w = W; w >= weights[i]; w--) // iterate RIGHT to LEFT (0/1 = use each item once)
      dp[w] = Math.max(dp[w], dp[w - weights[i]] + values[i]);
  return dp[W];
}`,

      cpp: `// Longest Increasing Subsequence — O(N log N) with patience sorting
#include <vector>
#include <algorithm>
using namespace std;

int lis(vector<int>& nums) {
    vector<int> tails; // tails[i] = smallest tail of IS of length i+1
    for (int x : nums) {
        auto it = lower_bound(tails.begin(), tails.end(), x);
        if (it == tails.end()) tails.push_back(x); // extend LIS
        else *it = x;                                // replace with smaller tail
    }
    return tails.size();
}

// Unique Paths — Grid DP — O(M*N) space, O(N) optimized
int uniquePaths(int m, int n) {
    vector<int> dp(n, 1); // first row all 1s
    for (int i = 1; i < m; i++)
        for (int j = 1; j < n; j++)
            dp[j] += dp[j-1]; // dp[j] = from above, dp[j-1] = from left
    return dp[n-1];
}

// Stock Buy/Sell — State Machine DP
// States: held (own stock), sold (cooldown), rest (ready to buy)
int maxProfit(vector<int>& prices) {
    int held = INT_MIN, sold = 0, rest = 0;
    for (int p : prices) {
        int prevSold = sold;
        sold = held + p;              // sell
        held = max(held, rest - p);   // buy (from rest, not sold cooldown)
        rest = max(rest, prevSold);   // cooldown over
    }
    return max(sold, rest);
}`,

      java: `import java.util.*;

public class DynamicProgramming {

    // Partition Equal Subset Sum — 0/1 Knapsack variant
    public boolean canPartition(int[] nums) {
        int total = Arrays.stream(nums).sum();
        if (total % 2 != 0) return false;
        int target = total / 2;
        boolean[] dp = new boolean[target + 1];
        dp[0] = true;
        for (int num : nums)
            for (int j = target; j >= num; j--)  // right to left (0/1 knapsack)
                dp[j] |= dp[j - num];
        return dp[target];
    }

    // Longest Palindromic Subsequence — LCS with reversed string
    public int longestPalindromeSubseq(String s) {
        String rev = new StringBuilder(s).reverse().toString();
        return lcs(s, rev);
    }
    private int lcs(String s1, String s2) {
        int m = s1.length(), n = s2.length();
        int[][] dp = new int[m+1][n+1];
        for (int i = 1; i <= m; i++)
            for (int j = 1; j <= n; j++)
                dp[i][j] = s1.charAt(i-1) == s2.charAt(j-1)
                    ? dp[i-1][j-1] + 1
                    : Math.max(dp[i-1][j], dp[i][j-1]);
        return dp[m][n];
    }

    // Jump Game II — BFS / Greedy DP — O(N)
    public int jump(int[] nums) {
        int jumps = 0, curEnd = 0, farthest = 0;
        for (int i = 0; i < nums.length - 1; i++) {
            farthest = Math.max(farthest, i + nums[i]);
            if (i == curEnd) { jumps++; curEnd = farthest; }
        }
        return jumps;
    }
}`,

      python: `from functools import lru_cache

# ── Top-Down (Memoization) with @lru_cache ─────────
@lru_cache(maxsize=None)
def fib(n):
    if n <= 1: return n
    return fib(n-1) + fib(n-2)

# ── Coin Change (Bottom-Up) ────────────────────────
def coin_change(coins, amount):
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    for coin in coins:
        for i in range(coin, amount + 1):
            dp[i] = min(dp[i], dp[i - coin] + 1)
    return dp[amount] if dp[amount] != float('inf') else -1

# ── LCS (Space-Optimized to O(N)) ─────────────────
def lcs(s1, s2):
    m, n = len(s1), len(s2)
    # Only keep two rows
    prev = [0] * (n + 1)
    for i in range(1, m + 1):
        curr = [0] * (n + 1)
        for j in range(1, n + 1):
            if s1[i-1] == s2[j-1]: curr[j] = prev[j-1] + 1
            else:                   curr[j] = max(prev[j], curr[j-1])
        prev = curr
    return prev[n]

# ── Word Break — DP + Set lookup ─────────────────
def word_break(s, word_dict):
    word_set = set(word_dict)
    n = len(s)
    dp = [False] * (n + 1)
    dp[0] = True              # empty string is always valid
    for i in range(1, n + 1):
        for j in range(i):
            if dp[j] and s[j:i] in word_set:
                dp[i] = True
                break         # no need to check more j values
    return dp[n]

# ── Burst Balloons — Interval DP ──────────────────
def max_coins(nums):
    nums = [1] + nums + [1]   # add boundary balloons
    n = len(nums)
    # dp[l][r] = max coins from bursting all balloons between l and r (exclusive)
    dp = [[0] * n for _ in range(n)]
    for length in range(2, n):
        for left in range(0, n - length):
            right = left + length
            for k in range(left + 1, right):
                dp[left][right] = max(dp[left][right],
                    nums[left] * nums[k] * nums[right] + dp[left][k] + dp[k][right])
    return dp[0][n-1]`
    }
  },

  {
    id: "greedy",
    title: "Greedy Algorithms",
    category: "Advanced Algorithms",
    phase: 4,
    difficulty: "Intermediate",
    icon: "🤑",
    iconColor: "amber",
    summary: "Make locally optimal choices at each step. When greedy works (provably) vs when DP is needed.",
    readTime: "7 mins",
    details: `
      <h2>Greedy Algorithms</h2>
      <p>A greedy algorithm makes the <strong>locally optimal choice</strong> at each step, hoping this leads to a global optimum. Greedy is simpler and faster than DP, but only works when a greedy choice is provably safe — meaning it never invalidates a future optimal choice.</p>

      <h3>Greedy vs Dynamic Programming</h3>
      <table class="complexity-table">
        <thead><tr><th>Property</th><th>Greedy</th><th>Dynamic Programming</th></tr></thead>
        <tbody>
          <tr><td>Choice</td><td>One greedy choice per step, no backtracking</td><td>Considers all possible choices</td></tr>
          <tr><td>When optimal?</td><td>When greedy choice property holds (provable)</td><td>Always (for overlapping subproblems)</td></tr>
          <tr><td>Speed</td><td>Usually O(N log N) or O(N)</td><td>Usually O(N²) or O(N×M)</td></tr>
          <tr><td>Example (same problem)</td><td>Coin change with standard denominations</td><td>Coin change with arbitrary denominations</td></tr>
        </tbody>
      </table>

      <h3>Classic Greedy Problems</h3>
      <ul>
        <li><strong>Activity Selection:</strong> Choose max non-overlapping activities (sort by end time).</li>
        <li><strong>Fractional Knapsack:</strong> Take items by value/weight ratio (sort descending).</li>
        <li><strong>Huffman Coding:</strong> Optimal prefix-free code (repeatedly merge two smallest frequencies).</li>
        <li><strong>Jump Game:</strong> Can you reach the end? Track max reachable index.</li>
        <li><strong>Task Scheduler:</strong> Minimize CPU idle time.</li>
        <li><strong>Interval Merging:</strong> Sort by start, merge overlapping intervals.</li>
      </ul>

      <h3>🎯 How to Recognize a Greedy Problem</h3>
      <ul>
        <li>Can you sort the input and make one scan?</li>
        <li>Does making the "best" local choice now leave the remaining problem in an identical substructure?</li>
        <li>Exchange argument: if you swap the greedy choice for any other, does the result get worse or equal?</li>
      </ul>
    `,
    code: {
      javascript: `// ── Merge Intervals — O(N log N) ─────────────────
function merge(intervals) {
  intervals.sort((a, b) => a[0] - b[0]); // sort by start time
  const merged = [intervals[0]];
  for (const [start, end] of intervals.slice(1)) {
    const last = merged.at(-1);
    if (start <= last[1]) last[1] = Math.max(last[1], end); // overlap: extend
    else merged.push([start, end]);                          // no overlap: new interval
  }
  return merged;
}

// ── Jump Game II — min jumps ────────────────────
function jump(nums) {
  let jumps = 0, curEnd = 0, farthest = 0;
  for (let i = 0; i < nums.length - 1; i++) {
    farthest = Math.max(farthest, i + nums[i]);
    if (i === curEnd) { // reached boundary of current jump
      jumps++;
      curEnd = farthest;
    }
  }
  return jumps;
}

// ── Meeting Rooms II — min rooms needed ──────────
// Sort by start; use min-heap of end times
function minMeetingRooms(intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  const endTimes = []; // min-heap (simulated with sorted array)
  let rooms = 0;
  for (const [start, end] of intervals) {
    if (endTimes.length && endTimes[0] <= start) {
      endTimes.shift(); // reuse a room (its meeting ended)
    } else {
      rooms++; // need a new room
    }
    // Insert end time in sorted order
    const pos = endTimes.findIndex(t => t > end);
    endTimes.splice(pos === -1 ? endTimes.length : pos, 0, end);
  }
  return rooms;
}

// ── Gas Station — Greedy O(N) ─────────────────────
function canCompleteCircuit(gas, cost) {
  let totalTank = 0, currTank = 0, start = 0;
  for (let i = 0; i < gas.length; i++) {
    const diff = gas[i] - cost[i];
    totalTank += diff;
    currTank  += diff;
    if (currTank < 0) { // can't reach next station from current start
      start = i + 1;   // try starting from next station
      currTank = 0;
    }
  }
  return totalTank >= 0 ? start : -1; // negative total = impossible
}`,

      cpp: `#include <vector>
#include <algorithm>
using namespace std;

// Fractional Knapsack — O(N log N)
double fractionalKnapsack(vector<int>& wt, vector<int>& val, int W) {
    int n = wt.size();
    vector<pair<double, int>> items(n);
    for (int i = 0; i < n; i++) items[i] = {(double)val[i]/wt[i], i};
    sort(items.rbegin(), items.rend()); // sort by value/weight descending

    double totalVal = 0;
    for (auto [ratio, i] : items) {
        if (W >= wt[i]) { totalVal += val[i]; W -= wt[i]; }
        else { totalVal += ratio * W; break; } // take fraction
    }
    return totalVal;
}

// Non-overlapping intervals — min removals
int eraseOverlapIntervals(vector<vector<int>>& intervals) {
    sort(intervals.begin(), intervals.end(), [](const auto& a, const auto& b){
        return a[1] < b[1]; // sort by END time (activity selection)
    });
    int count = 0, prevEnd = INT_MIN;
    for (auto& iv : intervals) {
        if (iv[0] >= prevEnd) prevEnd = iv[1]; // no overlap: keep
        else count++;                           // overlap: remove
    }
    return count;
}`,

      java: `import java.util.*;

public class GreedyAlgorithms {

    // Task Scheduler — O(N)
    public int leastInterval(char[] tasks, int n) {
        int[] freq = new int[26];
        for (char c : tasks) freq[c - 'A']++;
        int maxFreq = Arrays.stream(freq).max().getAsInt();
        int maxCount = (int) Arrays.stream(freq).filter(f -> f == maxFreq).count();
        // Formula: (maxFreq-1)*(n+1) + maxCount, but at least tasks.length
        return Math.max(tasks.length, (maxFreq - 1) * (n + 1) + maxCount);
    }

    // Assign Cookies — O(N log N)
    public int findContentChildren(int[] g, int[] s) {
        Arrays.sort(g); Arrays.sort(s);
        int child = 0, cookie = 0;
        while (child < g.length && cookie < s.length) {
            if (s[cookie] >= g[child]) child++; // cookie satisfies this child
            cookie++;
        }
        return child;
    }

    // Queue Reconstruction by Height — O(N²)
    public int[][] reconstructQueue(int[][] people) {
        // Sort: taller people first; among same height, fewer k first
        Arrays.sort(people, (a, b) -> a[0] != b[0] ? b[0] - a[0] : a[1] - b[1]);
        List<int[]> result = new ArrayList<>();
        for (int[] p : people) result.add(p[1], p); // insert at position k
        return result.toArray(new int[0][]);
    }
}`,

      python: `# ── Merge Intervals ────────────────────────────────
def merge(intervals):
    intervals.sort(key=lambda x: x[0])
    merged = [intervals[0]]
    for start, end in intervals[1:]:
        if start <= merged[-1][1]:
            merged[-1][1] = max(merged[-1][1], end)
        else:
            merged.append([start, end])
    return merged

# ── Huffman Coding — O(N log N) ───────────────────
import heapq

def huffman(freq_map):
    heap = [[freq, [char, ""]] for char, freq in freq_map.items()]
    heapq.heapify(heap)
    while len(heap) > 1:
        lo = heapq.heappop(heap)
        hi = heapq.heappop(heap)
        for pair in lo[1:]: pair[1] = '0' + pair[1]
        for pair in hi[1:]: pair[1] = '1' + pair[1]
        heapq.heappush(heap, [lo[0] + hi[0]] + lo[1:] + hi[1:])
    return sorted(heapq.heappop(heap)[1:], key=lambda p: len(p[1]))

codes = huffman({'a': 5, 'b': 2, 'c': 1, 'd': 3})
for char, code in codes:
    print(f"{char}: {code}")

# ── Jump Game — O(N) greedy ────────────────────────
def can_jump(nums):
    max_reach = 0
    for i, jump in enumerate(nums):
        if i > max_reach: return False    # unreachable
        max_reach = max(max_reach, i + jump)
    return True

# ── Candy (Two-pass greedy) ───────────────────────
def candy(ratings):
    n = len(ratings)
    candies = [1] * n
    # Left pass: more than left neighbor
    for i in range(1, n):
        if ratings[i] > ratings[i-1]:
            candies[i] = candies[i-1] + 1
    # Right pass: more than right neighbor (take max)
    for i in range(n-2, -1, -1):
        if ratings[i] > ratings[i+1]:
            candies[i] = max(candies[i], candies[i+1] + 1)
    return sum(candies)`
    }
  },

  {
    id: "recursion-backtracking",
    title: "Backtracking",
    category: "Advanced Algorithms",
    phase: 4,
    difficulty: "Intermediate",
    icon: "🔙",
    iconColor: "purple",
    summary: "Systematic exploration of all possibilities with intelligent pruning. N-Queens, Sudoku, Subsets, Permutations.",
    readTime: "9 mins",
    details: `
      <h2>Backtracking</h2>
      <p>Backtracking is a refined brute force that incrementally builds candidates and <strong>abandons a candidate</strong> (backtracks) as soon as it determines the candidate cannot lead to a valid solution. It's DFS + pruning.</p>

      <h3>Backtracking Template</h3>
      <pre>
function backtrack(state, choices):
  if state is a complete solution:
    add to results
    return
  
  for each choice in choices:
    if choice is valid:
      make choice (modify state)
      backtrack(updated_state, remaining_choices)
      undo choice (restore state)  ← THIS is backtracking!
      </pre>

      <h3>Common Backtracking Problems</h3>
      <table class="complexity-table">
        <thead><tr><th>Problem</th><th>Time Complexity</th><th>State</th></tr></thead>
        <tbody>
          <tr><td>All Subsets (2^N)</td><td>O(N × 2^N)</td><td>Include/exclude each element</td></tr>
          <tr><td>All Permutations</td><td>O(N × N!)</td><td>Swap elements; mark used</td></tr>
          <tr><td>N-Queens</td><td>O(N!)</td><td>Place queen per row; check diagonals</td></tr>
          <tr><td>Sudoku Solver</td><td>O(9^81) worst, much better with pruning</td><td>Fill each empty cell</td></tr>
          <tr><td>Word Search</td><td>O(M×N × 4^L)</td><td>DFS from each cell; mark visited</td></tr>
          <tr><td>Combination Sum</td><td>O(N^(T/min))</td><td>Include/skip each number</td></tr>
        </tbody>
      </table>

      <h3>🎯 Pruning Strategies</h3>
      <ul>
        <li><strong>Constraint propagation:</strong> Update remaining choices after each decision (Sudoku).</li>
          <li><strong>Pruning:</strong> Stop exploring paths that already exceed restrictions (Combination Sum).</li>
        </ul>
      `,
      code: {
        javascript: `// ── N-Queens Solver ────────────────────────────────
function solveNQueens(n) {
  const result = [];
  const cols = new Set(), diag1 = new Set(), diag2 = new Set();
  const board = Array.from({ length: n }, () => new Array(n).fill('.'));

  function backtrack(r) {
    if (r === n) {
      result.push(board.map(row => row.join('')));
      return;
    }
    for (let c = 0; c < n; c++) {
      if (cols.has(c) || diag1.has(r - c) || diag2.has(r + c)) continue;
      cols.add(c); diag1.add(r - c); diag2.add(r + c);
      board[r][c] = 'Q';
      backtrack(r + 1);
      board[r][c] = '.';
      cols.delete(c); diag1.delete(r - c); diag2.delete(r + c);
    }
  }
  backtrack(0);
  return result;
}

// ── Permutations — O(N * N!) ───────────────────────
function permute(nums) {
  const result = [];
  function backtrack(start) {
    if (start === nums.length) {
      result.push([...nums]);
      return;
    }
    for (let i = start; i < nums.length; i++) {
      [nums[start], nums[i]] = [nums[i], nums[start]]; // swap
      backtrack(start + 1);
      [nums[start], nums[i]] = [nums[i], nums[start]]; // backtrack swap
    }
  }
  backtrack(0);
  return result;
}`,
        cpp: `#include <vector>
#include <string>
#include <unordered_set>
using namespace std;

// N-Queens
class NQueens {
    vector<vector<string>> result;
    unordered_set<int> cols, diag1, diag2;
    void backtrack(int r, int n, vector<string>& board) {
        if (r == n) { result.push_back(board); return; }
        for (int c = 0; c < n; c++) {
            if (cols.count(c) || diag1.count(r - c) || diag2.count(r + c)) continue;
            cols.insert(c); diag1.insert(r - c); diag2.insert(r + c);
            board[r][c] = 'Q';
            backtrack(r + 1, n, board);
            board[r][c] = '.';
            cols.erase(c); diag1.erase(r - c); diag2.erase(r + c);
        }
    }
public:
    vector<vector<string>> solveNQueens(int n) {
        vector<string> board(n, string(n, '.'));
        backtrack(0, n, board);
        return result;
    }
};

// Permutations
void backtrack(int start, vector<int>& nums, vector<vector<int>>& result) {
    if (start == nums.size()) { result.push_back(nums); return; }
    for (int i = start; i < nums.size(); i++) {
        swap(nums[start], nums[i]);
        backtrack(start + 1, nums, result);
        swap(nums[start], nums[i]); // backtrack
    }
}`,
        java: `import java.util.*;

public class Backtracking {
    // Permutations
    public List<List<Integer>> permute(int[] nums) {
        List<List<Integer>> result = new ArrayList<>();
        backtrack(0, nums, result);
        return result;
    }
    private void backtrack(int start, int[] nums, List<List<Integer>> result) {
        if (start == nums.length) {
            List<Integer> list = new ArrayList<>();
            for (int x : nums) list.add(x);
            result.add(list);
            return;
        }
        for (int i = start; i < nums.length; i++) {
            swap(nums, start, i);
            backtrack(start + 1, nums, result);
            swap(nums, start, i); // backtrack
        }
    }
    private void swap(int[] nums, int i, int j) {
        int t = nums[i]; nums[i] = nums[j]; nums[j] = t;
    }
}`,
        python: `# Permutations — O(N * N!)
def permute(nums):
    result = []
    def backtrack(start):
        if start == len(nums):
            result.append(nums[:])
            return
        for i in range(start, len(nums)):
            nums[start], nums[i] = nums[i], nums[start] # swap
            backtrack(start + 1)
            nums[start], nums[i] = nums[i], nums[start] # backtrack
    backtrack(0)
    return result

# N-Queens
def solve_n_queens(n):
    result = []
    cols, diag1, diag2 = set(), set(), set()
    board = [['.'] * n for _ in range(n)]
    def backtrack(r):
      if r == n:
        result.append(["".join(row) for row in board])
        return
      for c in range(n):
        if c in cols or (r - c) in diag1 or (r + c) in diag2: continue
        cols.add(c); diag1.add(r - c); diag2.add(r + c)
        board[r][c] = 'Q'
        backtrack(r + 1)
        board[r][c] = '.'
        cols.remove(c); diag1.remove(r - c); diag2.remove(r + c)
    backtrack(0)
    return result`
      }
    },

  {
    id: "bit-manipulation",
    title: "Bit Manipulation",
    category: "Advanced Algorithms",
    phase: 4,
    difficulty: "Intermediate",
    icon: "🔢",
    iconColor: "emerald",
    summary: "Operate on binary digits directly. Bitwise tricks, power of two checks, count set bits, and subsets via bitmasks.",
    readTime: "7 mins",
    details: `
      <h2>Bit Manipulation</h2>
      <p>Bit manipulation operates on integer variables at the level of their individual bits rather than their numerical values. It is extremely fast (running in single CPU cycles) and is a favorite topic for optimization and system level interviews.</p>

      <h3>Core Bitwise Operators</h3>
      <ul>
        <li><strong>AND (<code>&</code>):</strong> Returns 1 if both bits are 1. Useful for clearing bits or checking if odd: <code>(n & 1) === 1</code>.</li>
        <li><strong>OR (<code>|</code>):</strong> Returns 1 if at least one bit is 1. Useful for setting bits.</li>
        <li><strong>XOR (<code>^</code>):</strong> Returns 1 if bits are different. Properties: <code>x ^ 0 = x</code>, <code>x ^ x = 0</code>. Perfect for finding the single non-repeating number.</li>
        <li><strong>NOT (<code>~</code>):</strong> Inverts all bits. Two's complement representation: <code>~x = -x - 1</code>.</li>
        <li><strong>Shifts (<code>&lt;&lt;</code>, <code>&gt;&gt;</code>):</strong> <code>x &lt;&lt; 1</code> multiplies by 2; <code>x &gt;&gt; 1</code> divides by 2.</li>
      </ul>

      <h3>💡 Essential Bitwise Tricks</h3>
      <ul>
        <li><strong>Check Power of Two:</strong> <code>n &gt; 0 && (n & (n - 1)) === 0</code>. Why? Powers of two have exactly one 1 bit. Subtracting 1 flips all bits after it.</li>
        <li><strong>Clear Least Significant Set Bit:</strong> <code>n & (n - 1)</code>. This trick allows counting set bits in O(set_bits) time (Brian Kernighan's Algorithm).</li>
        <li><strong>Get Lowest Set Bit:</strong> <code>n & -n</code>. Useful in Fenwick Trees.</li>
      </ul>
    `,
    code: {
      javascript: `// Brian Kernighan's Algorithm — Count Set Bits O(bits)
function countSetBits(n) {
  let count = 0;
  while (n > 0) {
    n = n & (n - 1); // clears lowest set bit
    count++;
  }
  return count;
}

// Find single number among duplicates O(N) time, O(1) space
function singleNumber(nums) {
  let xor = 0;
  for (const x of nums) xor ^= x;
  return xor;
}

// Subsets using bitmasking O(2^N)
function subsets(nums) {
  const n = nums.length;
  const total = 1 << n; // 2^n
  const result = [];
  for (let mask = 0; mask < total; mask++) {
    const current = [];
    for (let i = 0; i < n; i++) {
      if ((mask & (1 << i)) !== 0) {
        current.push(nums[i]);
      }
    }
    result.push(current);
  }
  return result;
}`,
      cpp: `#include <vector>
using namespace std;

// Brian Kernighan's
int countSetBits(int n) {
    int count = 0;
    while (n > 0) {
        n &= (n - 1);
        count++;
    }
    return count;
}

// Subsets using bitmask
vector<vector<int>> subsets(vector<int>& nums) {
    int n = nums.size();
    int total = 1 << n;
    vector<vector<int>> result;
    for (int mask = 0; mask < total; mask++) {
        vector<int> current;
        for (int i = 0; i < n; i++) {
            if ((mask & (1 << i)) != 0) {
                current.push_back(nums[i]);
            }
        }
        result.push_back(current);
    }
    return result;
}`,
      java: `public class BitwisePatterns {
    // Count set bits
    public int countSetBits(int n) {
        int count = 0;
        while (n > 0) {
            n = n & (n - 1);
            count++;
        }
        return count;
    }

    // Power of two check
    public boolean isPowerOfTwo(int n) {
        return n > 0 && (n & (n - 1)) == 0;
    }
}`,
      python: `# Brian Kernighan
def count_set_bits(n):
    count = 0
    while n > 0:
        n &= (n - 1)
        count += 1
    return count

# Subsets via bitmasking
def subsets(nums):
    n = len(nums)
    result = []
    for mask in range(1 << n):
        result.append([nums[i] for i in range(n) if (mask & (1 << i)) != 0])
    return result`
    }
  },

  {
    id: "range-queries",
    title: "Range Query Algorithms",
    category: "Advanced Algorithms",
    phase: 4,
    difficulty: "Advanced",
    icon: "📊",
    iconColor: "rose",
    summary: "Prefix sums, Segment Trees, and Fenwick Trees (Binary Indexed Trees) for efficient range sum/min/max queries and updates.",
    readTime: "9 mins",
    details: `
      <h2>Range Query Algorithms</h2>
      <p>Range queries involve finding aggregates (sum, minimum, maximum, GCD) over a range <code>[L, R]</code> of an array. If the array is static, prefix sums solve it in O(1) query. However, if the array undergoes **dynamic updates**, we need advanced structures like Segment Trees or Fenwick Trees to achieve logarithmic bounds for both updates and queries.</p>

      <h3>Comparison Grid</h3>
      <table class="complexity-table">
        <thead><tr><th>Structure</th><th>Query Time</th><th>Update Time</th><th>Space</th><th>Supports Min/Max?</th></tr></thead>
        <tbody>
          <tr><td>Prefix Sums</td><td><span class="complexity-badge complexity-green">O(1)</span></td><td><span class="complexity-badge complexity-red">O(N)</span></td><td>O(N)</td><td>No (Sum only)</td></tr>
          <tr><td>Segment Tree</td><td><span class="complexity-badge complexity-green">O(log N)</span></td><td><span class="complexity-badge complexity-green">O(log N)</span></td><td>O(4N)</td><td>Yes ✓ (Any associative operation)</td></tr>
          <tr><td>Fenwick Tree (B.I.T)</td><td><span class="complexity-badge complexity-green">O(log N)</span></td><td><span class="complexity-badge complexity-green">O(log N)</span></td><td>O(N)</td><td>No (Sum/Cumulative only)</td></tr>
        </tbody>
      </table>

      <h3>Segment Tree Architecture</h3>
      <p>A Segment Tree is a binary tree where each node represent an interval. The root represents the whole array <code>[0, N-1]</code>. A parent interval <code>[L, R]</code> is split into left child <code>[L, mid]</code> and right child <code>[mid+1, R]</code>. Since it's a complete binary tree, it can be represented compactly as a flat array of size <code>4N</code>.</p>
    `,
    code: {
      javascript: `// ── Segment Tree (Range Sum Query & Point Update) ──
class SegmentTree {
  constructor(arr) {
    this.n = arr.length;
    this.tree = new Array(4 * this.n).fill(0);
    if (this.n > 0) this.build(arr, 0, 0, this.n - 1);
  }

  build(arr, node, start, end) {
    if (start === end) {
      this.tree[node] = arr[start];
      return;
    }
    const mid = start + ((end - start) >> 1);
    this.build(arr, 2 * node + 1, start, mid);
    this.build(arr, 2 * node + 2, mid + 1, end);
    this.tree[node] = this.tree[2 * node + 1] + this.tree[2 * node + 2];
  }

  update(node, start, end, idx, val) {
    if (start === end) {
      this.tree[node] = val;
      return;
    }
    const mid = start + ((end - start) >> 1);
    if (idx <= mid) this.update(2 * node + 1, start, mid, idx, val);
    else this.update(2 * node + 2, mid + 1, end, idx, val);
    this.tree[node] = this.tree[2 * node + 1] + this.tree[2 * node + 2];
  }

  query(node, start, end, l, r) {
    if (r < start || end < l) return 0; // out of range
    if (l <= start && end <= r) return this.tree[node]; // fully inside
    const mid = start + ((end - start) >> 1);
    const leftSum = this.query(2 * node + 1, start, mid, l, r);
    const rightSum = this.query(2 * node + 2, mid + 1, end, l, r);
    return leftSum + rightSum;
  }
}`,
      cpp: `#include <vector>
using namespace std;

class SegmentTree {
    int n;
    vector<int> tree;
    void build(vector<int>& arr, int node, int start, int end) {
        if (start == end) { tree[node] = arr[start]; return; }
        int mid = start + (end - start) / 2;
        build(arr, 2*node, start, mid);
        build(arr, 2*node+1, mid+1, end);
        tree[node] = tree[2*node] + tree[2*node+1];
    }
public:
    SegmentTree(vector<int>& arr) {
        n = arr.size();
        tree.resize(4 * n, 0);
        build(arr, 1, 0, n - 1);
    }
    void update(int node, int start, int end, int idx, int val) {
        if (start == end) { tree[node] = val; return; }
        int mid = start + (end - start) / 2;
        if (idx <= mid) update(2*node, start, mid, idx, val);
        else update(2*node+1, mid+1, end, idx, val);
        tree[node] = tree[2*node] + tree[2*node+1];
    }
    int query(int node, int start, int end, int l, int r) {
        if (r < start || end < l) return 0;
        if (l <= start && end <= r) return tree[node];
        int mid = start + (end - start) / 2;
        return query(2*node, start, mid, l, r) + query(2*node+1, mid+1, end, l, r);
    }
};`,
      java: `public class SegmentTree {
    int[] tree;
    int n;
    public SegmentTree(int[] arr) {
        this.n = arr.length;
        this.tree = new int[4 * n];
        build(arr, 0, 0, n - 1);
    }
    private void build(int[] arr, int node, int start, int end) {
        if (start == end) { tree[node] = arr[start]; return; }
        int mid = start + (end - start) / 2;
        build(arr, 2 * node + 1, start, mid);
        build(arr, 2 * node + 2, mid + 1, end);
        tree[node] = tree[2 * node + 1] + tree[2 * node + 2];
    }
    public int query(int node, int start, int end, int l, int r) {
        if (r < start || end < l) return 0;
        if (l <= start && end <= r) return tree[node];
        int mid = start + (end - start) / 2;
        return query(2 * node + 1, start, mid, l, r) + query(2 * node + 2, mid + 1, end, l, r);
    }
}`,
      python: `class SegmentTree:
    def __init__(self, arr):
        self.n = len(arr)
        self.tree = [0] * (4 * self.n)
        if self.n > 0: self._build(arr, 0, 0, self.n - 1)

    def _build(self, arr, node, start, end):
        if start == end:
            self.tree[node] = arr[start]
            return
        mid = (start + end) // 2
        self._build(arr, 2 * node + 1, start, mid)
        self._build(arr, 2 * node + 2, mid + 1, end)
        self.tree[node] = self.tree[2 * node + 1] + self.tree[2 * node + 2]

    def query(self, node, start, end, l, r):
        if r < start or end < l: return 0
        if l <= start and end <= r: return self.tree[node]
        mid = (start + end) // 2
        return self.query(2 * node + 1, start, mid, l, r) + self.query(2 * node + 2, mid + 1, end, l, r)`
    }
  },
  {
    id: "quiz-phase4",
    type: "quiz",
    phase: 4,
    difficulty: "Intermediate",
    title: "Phase 4 Quiz — Advanced Algorithms & Techniques",
    category: "Advanced Algorithms",
    difficulty: "Intermediate",
    icon: "🧪",
    iconColor: "rose",
    questions: [
      {
        question: "What are the two core prerequisites for a problem to be solvable via Dynamic Programming?",
        options: [
          "Linear structures and constant boundary queries",
          "Optimal substructure and overlapping subproblems",
          "Greedy choice property and fast pointer recursion",
          "Dividing search space and logarithmic execution times"
        ],
        answer: 1,
        explanation: "Dynamic Programming requires: 1) Optimal Substructure (an optimal solution to the problem contains optimal solutions to its subproblems) and 2) Overlapping Subproblems (the same subproblems are solved repeatedly). Without overlapping subproblems, standard divide-and-conquer is sufficient."
      },
      {
        question: "In what scenario is a Greedy algorithm guaranteed to produce the globally optimal solution?",
        options: [
          "When the problem has overlapping subproblems and sublist sorting",
          "When the greedy choice property and optimal substructure can be mathematically proven for all inputs",
          "When the time complexity of recursion is exactly O(2^N)",
          "For any knapsack problems regardless of weight capacities"
        ],
        answer: 1,
        explanation: "Greedy algorithms only produce global optimums if you can prove that making a locally optimal choice never invalidates the path to the global optimum (Greedy Choice Property) and the problem has Optimal Substructure."
      },
      {
        question: "What is the purpose of 'pruning' in backtracking algorithms?",
        options: [
          "To format the output as string arrays",
          "To bypass compiling intermediate structures",
          "To stop traversing branches of the state space tree as soon as they are determined to be invalid",
          "To clear set bits in O(1) CPU cycles"
        ],
        answer: 2,
        explanation: "Pruning is DFS constraint propagation. It cuts off branches in the search recursion tree early as soon as constraints are violated (e.g. current path sum exceeds target, or queen placement conflicts), saving immense CPU execution cycles."
      },
      {
        question: "Which of these operations clears the lowest set bit in an integer 'n'?",
        options: ["n = n & ~1", "n = n & (n - 1)", "n = n | (n - 1)", "n = n ^ -n"],
        answer: 1,
        explanation: "n & (n - 1) subtracts 1 from n, which flips all bits after the lowest set bit (including the lowest set bit itself) and leaves other bits unchanged. Doing a bitwise AND between n and n-1 clears that lowest set bit."
      },
      {
        question: "What is the space complexity of a Segment Tree constructed for an array of size N?",
        options: ["O(N)", "O(log N)", "O(N²)", "O(2^N)"],
        answer: 0,
        explanation: "A Segment Tree constructed for N elements requires a tree represented as an array of size 4N. 4N is mathematically O(N) linear space."
      }
    ]
  },

  // ══════════════════════════════════════════════════════
  //  PHASE 5 & PHASE 6 EXTENDED MODULES
  // ══════════════════════════════════════════════════════

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
    difficulty: "Intermediate",
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
    difficulty: "Intermediate",
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

export const roadmapPhases = [
  {
    "label": "Phase 0 — Programming Fundamentals",
    "nodes": ["language-syntax", "control-structures", "functions", "oop-basics", "recursion-intro", "quiz-phase0"]
  },
  {
    "label": "Phase 1 — Algorithmic Complexity",
    "nodes": ["big-o", "asymptotic-notation", "arrays", "strings", "searching", "quiz-phase1"]
  },
  {
    "label": "Phase 2 — Linear Data Structures",
    "nodes": ["stack-queue", "linked-list", "hash-tables", "heaps", "matrices", "quiz-phase2"]
  },
  {
    "label": "Phase 3 — Non-Linear Data Structures (Trees & Graphs)",
    "nodes": ["trees-bst", "tree-traversal", "avl-trees", "tries", "graphs", "quiz-phase3"]
  },
  {
    "label": "Phase 4 — Advanced Algorithms & Techniques",
    "nodes": ["dynamic-programming", "greedy", "recursion-backtracking", "bit-manipulation", "range-queries", "quiz-phase4"]
  },
  {
    "label": "Phase 5 — Advanced Data Structures",
    "nodes": ["disjoint-set", "segment-tree", "fenwick-tree", "lru-cache", "bitwise-trie", "quiz-phase5"]
  },
  {
    "label": "Phase 6 — Advanced Graph Algorithms",
    "nodes": ["dijkstra-algo", "bellman-ford", "floyd-warshall", "kruskal-mst", "prim-mst", "quiz-phase6"]
  }
];

export const githubAlgorithmMappings = {};
