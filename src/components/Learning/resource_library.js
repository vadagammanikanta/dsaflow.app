export const resourceLibrary = {
  "language-syntax": {
    youtubeId: "zOjov-2OZ0E",
    creator: "Programming with Mosh",
    primaryLink: {
      title: "Python for Beginners – Official Docs",
      url: "https://docs.python.org/3/tutorial/index.html"
    },
    additionalResources: [
      {
        title: "Java Syntax – W3Schools",
        url: "https://www.w3schools.com/java/java_syntax.asp"
      },
      {
        title: "C++ Language Tutorial – cppreference",
        url: "https://en.cppreference.com/w/cpp/language"
      }
    ],
    placementRelevance: {
      patterns: ["Choosing idiomatic constructs for the interview language", "Proper use of built-in data types and type coercion", "String manipulation without library shortcuts", "Clean variable naming and code readability under pressure"],
      realWorldApp: "Every production codebase at Google enforces strict language-style guides (e.g., Google Java Style Guide); interviewers judge syntax fluency as a proxy for day-one productivity.",
      targetCompanies: ["Google", "Infosys", "TCS", "Wipro"],
      interviewTip: "Pick ONE language and master its standard library cold — knowing that Python's `collections.defaultdict` or Java's `ArrayDeque` exists saves precious minutes and signals seniority."
    }
  },
  "control-structures": {
    youtubeId: "DWRcSXMQ7Nk",
    creator: "Abdul Bari",
    primaryLink: {
      title: "Control Flow – Python Docs",
      url: "https://docs.python.org/3/tutorial/controlflow.html"
    },
    additionalResources: [
      {
        title: "Loops & Iteration – GeeksforGeeks",
        url: "https://www.geeksforgeeks.org/loops-in-python/"
      }
    ],
    placementRelevance: {
      patterns: ["Nested loop optimization to reduce O(n²) to O(n)", "Early termination with break/return for pruning", "Loop invariant reasoning for correctness proofs", "Two-pointer and sliding window via loop control"],
      realWorldApp: "Compiler optimization passes (e.g., LLVM loop unrolling) directly exploit control structure patterns to vectorize inner loops for CPU SIMD pipelines.",
      targetCompanies: ["Amazon", "Accenture", "Capgemini", "Microsoft"],
      interviewTip: "When a nested loop feels inevitable, pause and ask: 'Can a hash map or a sorted structure eliminate the inner loop?' — that mental reflex separates average from excellent candidates."
    }
  },
  functions: {
    youtubeId: "u-OmVr_fT4s",
    creator: "Programming with Mosh",
    primaryLink: {
      title: "Functions – MDN Web Docs",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions"
    },
    additionalResources: [
      {
        title: "Pure Functions & Side Effects – GeeksforGeeks",
        url: "https://www.geeksforgeeks.org/pure-functions-in-javascript/"
      },
      {
        title: "Python Functions – Real Python",
        url: "https://realpython.com/defining-your-own-python-function/"
      }
    ],
    placementRelevance: {
      patterns: ["Helper function decomposition for cleaner interview code", "Pass-by-value vs pass-by-reference bugs in Java/C++", "Higher-order functions and callbacks (map/filter/reduce)", "Memoization wrappers around pure functions"],
      realWorldApp: "AWS Lambda's entire serverless model is architected around stateless function units — each invocation is a pure function call, making function design a core cloud-engineering skill.",
      targetCompanies: ["Amazon", "Flipkart", "Uber", "Adobe"],
      interviewTip: "Always extract repeated logic into a named helper during the interview — it shows software engineering maturity, makes debugging easier, and shrinks your main function to readable size."
    }
  },
  "oop-basics": {
    youtubeId: "SiBw7os-_zI",
    creator: "Programming with Mosh",
    primaryLink: {
      title: "OOP Concepts – GeeksforGeeks",
      url: "https://www.geeksforgeeks.org/object-oriented-programming-oops-concept-in-java/"
    },
    additionalResources: [
      {
        title: "SOLID Principles – DigitalOcean",
        url: "https://www.digitalocean.com/community/conceptual-articles/s-o-l-i-d-the-first-five-principles-of-object-oriented-design"
      }
    ],
    placementRelevance: {
      patterns: ["Encapsulation via private fields + getter/setter", "Polymorphism for extensible design (Strategy pattern)", "Abstract classes vs interfaces trade-offs", "Inheritance hierarchies in system design questions"],
      realWorldApp: "Spotify's backend uses OOP polymorphism to handle diverse audio codecs — a single `AudioStream` interface dispatches to MP3, AAC, or OGG concrete implementations without changing client code.",
      targetCompanies: ["Microsoft", "Oracle", "SAP", "Goldman Sachs"],
      interviewTip: "In LLD rounds, always start by identifying nouns (classes) and verbs (methods) from the problem statement — this converts vague requirements into a clean class diagram within 3 minutes."
    }
  },
  "recursion-intro": {
    youtubeId: "IJDJ0kBx2LM",
    creator: "Abdul Bari",
    primaryLink: {
      title: "Recursion – GeeksforGeeks",
      url: "https://www.geeksforgeeks.org/recursion/"
    },
    additionalResources: [
      {
        title: "Recursion – Visualgo",
        url: "https://visualgo.net/en/recursion"
      },
      {
        title: "Recursion Problems – LeetCode Explore",
        url: "https://leetcode.com/explore/learn/card/recursion-i/"
      }
    ],
    placementRelevance: {
      patterns: ["Identifying base case + recursive case", "Tail recursion and stack overflow prevention", "Tree-shaped recursion (Fibonacci, permutations)", "Converting recursion to iteration using explicit stack"],
      realWorldApp: "Git's object model recursively traverses commit DAGs to compute merge bases — the same recursive tree-walk pattern used in interview tree problems powers version control at scale.",
      targetCompanies: ["Google", "Amazon", "Atlassian", "Paytm"],
      interviewTip: "Draw the recursion tree on paper before coding — it exposes overlapping subproblems (DP opportunities) and reveals the exact base cases, preventing 80% of bugs before you write a line."
    }
  },
  "big-o": {
    youtubeId: "v4cd1O4zkGw",
    creator: "HackerRank",
    primaryLink: {
      title: "Big-O Cheat Sheet",
      url: "https://www.bigocheatsheet.com/"
    },
    additionalResources: [
      {
        title: "Time Complexity – GeeksforGeeks",
        url: "https://www.geeksforgeeks.org/understanding-time-complexity-simple-examples/"
      },
      {
        title: "Complexity Analysis – CP-Algorithms",
        url: "https://cp-algorithms.com/algebra/complexity.html"
      }
    ],
    placementRelevance: {
      patterns: ["Amortized analysis for dynamic arrays", "Best/average/worst-case distinction", "Recognizing log n from halving patterns", "Space-time trade-off articulation"],
      realWorldApp: "Netflix's recommendation engine explicitly profiles algorithm complexity before deployment — a switch from O(n²) collaborative filtering to O(n log n) ANN search cut latency by 10× for 200M users.",
      targetCompanies: ["Google", "Facebook/Meta", "Amazon", "Razorpay"],
      interviewTip: "Proactively state the time and space complexity of your solution before the interviewer asks — it signals analytical thinking and often pre-empts follow-up 'can you do better?' challenges."
    }
  },
  "asymptotic-notation": {
    youtubeId: "0oDAlKUs_BY",
    creator: "Abdul Bari",
    primaryLink: {
      title: "Asymptotic Analysis – GeeksforGeeks",
      url: "https://www.geeksforgeeks.org/analysis-of-algorithms-set-3asymptotic-notations/"
    },
    additionalResources: [
      {
        title: "Big-O, Big-Θ, Big-Ω – Khan Academy",
        url: "https://www.khanacademy.org/computing/computer-science/algorithms/asymptotic-notation/a/asymptotic-notation"
      }
    ],
    placementRelevance: {
      patterns: ["Theta vs Big-O vs Omega distinctions", "Tight bound derivation for sorting algorithms", "Recurrence relation solving (Master Theorem)", "Proving lower bounds for comparison-based sorts"],
      realWorldApp: "Database query planners (PostgreSQL's EXPLAIN ANALYZE) use asymptotic reasoning to choose between index scans O(log n) and sequential scans O(n) at query compile time.",
      targetCompanies: ["Google", "Microsoft", "Codeforces-heavy firms", "DE Shaw"],
      interviewTip: "When asked about complexity, always clarify your variable — O(n) where n is 'number of nodes' vs 'input string length' changes the entire analysis; interviewers reward this precision."
    }
  },
  arrays: {
    youtubeId: "n73iM4S9rZI",
    creator: "NeetCode",
    primaryLink: {
      title: "Arrays – LeetCode Explore Card",
      url: "https://leetcode.com/explore/learn/card/fun-with-arrays/"
    },
    additionalResources: [
      {
        title: "Array Data Structure – GeeksforGeeks",
        url: "https://www.geeksforgeeks.org/array-data-structure/"
      },
      {
        title: "Arrays – Visualgo",
        url: "https://visualgo.net/en/array"
      }
    ],
    placementRelevance: {
      patterns: ["Two-pointer technique (sorted arrays, palindromes)", "Sliding window (max subarray, minimum window substring)", "Prefix sum for range query O(1)", "Kadane's algorithm for maximum subarray", "Dutch National Flag / 3-way partition"],
      realWorldApp: "Google Docs stores document content as a gap buffer — a specialized array variant that makes O(1) insertions at the cursor position for real-time collaborative editing.",
      targetCompanies: ["Amazon", "Google", "Microsoft", "Walmart Labs"],
      interviewTip: "Before touching a 2D array problem, always clarify: 'Is in-place modification allowed?' — this single question determines whether you need O(1) or O(n) extra space and unlocks the optimal approach."
    }
  },
  strings: {
    youtubeId: "9UtInBqnCgA",
    creator: "NeetCode",
    primaryLink: {
      title: "Strings – LeetCode Explore Card",
      url: "https://leetcode.com/explore/learn/card/array-and-string/"
    },
    additionalResources: [
      {
        title: "KMP Algorithm – CP-Algorithms",
        url: "https://cp-algorithms.com/string/prefix-function.html"
      },
      {
        title: "String Hashing – CP-Algorithms",
        url: "https://cp-algorithms.com/string/string-hashing.html"
      }
    ],
    placementRelevance: {
      patterns: ["Sliding window for substring problems", "Character frequency map (anagram detection)", "KMP / Z-algorithm for pattern matching", "Rabin-Karp rolling hash", "Palindrome expansion from center"],
      realWorldApp: "Cloudflare's WAF uses Aho-Corasick (multi-pattern string matching) to simultaneously scan HTTP payloads against thousands of attack signatures at line rate on every request.",
      targetCompanies: ["Google", "Goldman Sachs", "Adobe", "PhonePe"],
      interviewTip: "Immutability trap: in Java, concatenating strings in a loop is O(n²) — always use StringBuilder. Mention this upfront; it demonstrates production-level language awareness."
    }
  },
  searching: {
    youtubeId: "s4DPM8ct1pI",
    creator: "NeetCode",
    primaryLink: {
      title: "Binary Search – LeetCode Explore Card",
      url: "https://leetcode.com/explore/learn/card/binary-search/"
    },
    additionalResources: [
      {
        title: "Binary Search – CP-Algorithms",
        url: "https://cp-algorithms.com/num_methods/binary_search.html"
      },
      {
        title: "Search Algorithms – GeeksforGeeks",
        url: "https://www.geeksforgeeks.org/searching-algorithms/"
      }
    ],
    placementRelevance: {
      patterns: ["Binary search on answer space (not just sorted array)", "Finding leftmost / rightmost boundary (lo=mid+1 variants)", "Ternary search for unimodal functions", "Exponential search for unbounded arrays", "Binary search on floating-point values"],
      realWorldApp: "Git's `git bisect` command uses binary search over commit history to identify the exact commit that introduced a bug — reducing O(n) manual testing to O(log n) steps.",
      targetCompanies: ["Google", "Amazon", "Uber", "Zomato"],
      interviewTip: "The hardest part of binary search is the loop condition and mid update — always use `lo + (hi - lo) / 2` to prevent integer overflow, and decide `lo=mid+1` vs `lo=mid` based on which invariant you're maintaining."
    }
  },
  "stack-queue": {
    youtubeId: "kU8Y3aK6uLg",
    creator: "Take U Forward (Striver)",
    primaryLink: {
      title: "Stack & Queue – LeetCode Explore Card",
      url: "https://leetcode.com/explore/learn/card/queue-stack/"
    },
    additionalResources: [
      {
        title: "Stack – Visualgo",
        url: "https://visualgo.net/en/list"
      },
      {
        title: "Monotonic Stack – GeeksforGeeks",
        url: "https://www.geeksforgeeks.org/introduction-to-monotonic-stack-data-structure-and-algorithm-tutorials/"
      }
    ],
    placementRelevance: {
      patterns: ["Monotonic stack (next greater element, largest rectangle)", "Stack-based DFS simulation", "Balanced parentheses validation", "BFS using queue for level-order traversal", "Min-stack with O(1) getMin"],
      realWorldApp: "JavaScript's call stack and the browser's event queue are literal implementations of Stack and Queue — understanding them explains how async/await, setTimeout, and Promise microtasks are scheduled.",
      targetCompanies: ["Amazon", "Microsoft", "Flipkart", "Swiggy"],
      interviewTip: "Any time a problem mentions 'nearest', 'next', or 'previous' larger/smaller element, immediately reach for a monotonic stack — it's the single most underutilized pattern in interviews."
    }
  },
  "linked-list": {
    youtubeId: "Hj_rA0dhr2I",
    creator: "NeetCode",
    primaryLink: {
      title: "Linked List – LeetCode Explore Card",
      url: "https://leetcode.com/explore/learn/card/linked-list/"
    },
    additionalResources: [
      {
        title: "Linked List – Visualgo",
        url: "https://visualgo.net/en/list"
      },
      {
        title: "Floyd's Cycle Detection – GeeksforGeeks",
        url: "https://www.geeksforgeeks.org/floyds-cycle-finding-algorithm/"
      }
    ],
    placementRelevance: {
      patterns: ["Fast & slow pointer (cycle detection, middle node)", "Dummy node technique for cleaner edge cases", "In-place reversal (reverse k-group)", "Merge two sorted lists", "Skip list fundamentals"],
      realWorldApp: "Linux kernel's task scheduler uses a circular doubly linked list to maintain the run queue of processes — O(1) insertion and removal make it ideal for real-time task switching.",
      targetCompanies: ["Amazon", "Microsoft", "Adobe", "Ola"],
      interviewTip: "Draw the before/after pointer diagram FIRST for any reversal or merge problem — pointer manipulation bugs are 100% visual; coding without a diagram is why candidates fail these cold."
    }
  },
  "hash-tables": {
    youtubeId: "cNcy3J4x62M",
    creator: "NeetCode",
    primaryLink: {
      title: "Hash Table – LeetCode Explore Card",
      url: "https://leetcode.com/explore/learn/card/hash-table/"
    },
    additionalResources: [
      {
        title: "Hashing – Visualgo",
        url: "https://visualgo.net/en/hashtable"
      },
      {
        title: "Hash Functions – CP-Algorithms",
        url: "https://cp-algorithms.com/string/string-hashing.html"
      }
    ],
    placementRelevance: {
      patterns: ["Complement lookup (Two Sum pattern)", "Frequency counting for anagrams/duplicates", "Rolling hash for substring matching", "Consistent hashing for distributed systems", "Collision resolution: chaining vs open addressing"],
      realWorldApp: "Redis's core data engine is a hash table — its O(1) average-case GET/SET at millions of QPS underpins session management, caching, and rate-limiting across nearly every major web platform.",
      targetCompanies: ["Google", "Amazon", "Razorpay", "CRED"],
      interviewTip: "When you see O(n²) brute force with nested loops, the hash map is almost always the path to O(n) — train yourself to ask 'what complement or lookup am I repeating?' to find it instantly."
    }
  },
  heaps: {
    youtubeId: "HqPJF2L5h9U",
    creator: "NeetCode",
    primaryLink: {
      title: "Heaps – GeeksforGeeks",
      url: "https://www.geeksforgeeks.org/heap-data-structure/"
    },
    additionalResources: [
      {
        title: "Priority Queue – CP-Algorithms",
        url: "https://cp-algorithms.com/data_structures/heap.html"
      },
      {
        title: "Heap – Visualgo",
        url: "https://visualgo.net/en/heap"
      }
    ],
    placementRelevance: {
      patterns: ["Top-K elements (min-heap of size K)", "Merge K sorted lists using min-heap", "Median of data stream (two heaps)", "Heap-based Dijkstra's shortest path", "Heap sort in-place"],
      realWorldApp: "Apache Kafka's consumer group coordinator uses a priority queue to schedule partition rebalances — ensuring the broker with the least load gets the next partition assignment in O(log n).",
      targetCompanies: ["Amazon", "LinkedIn", "Twitter/X", "Juspay"],
      interviewTip: "The 'K-th' anything in an interview is almost always a heap problem — min-heap gives you the K largest, max-heap gives you the K smallest; knowing which to use instantly is what separates good from great."
    }
  },
  matrices: {
    youtubeId: "fMSJlpNu_aU",
    creator: "NeetCode",
    primaryLink: {
      title: "Matrix Problems – LeetCode",
      url: "https://leetcode.com/tag/matrix/"
    },
    additionalResources: [
      {
        title: "Matrix Chain Multiplication – GeeksforGeeks",
        url: "https://www.geeksforgeeks.org/matrix-chain-multiplication-dp-8/"
      }
    ],
    placementRelevance: {
      patterns: ["BFS/DFS on grid (number of islands)", "In-place rotation (90-degree matrix rotation)", "Spiral order traversal", "Dynamic programming on 2D grid", "Sparse matrix representation"],
      realWorldApp: "Google Maps represents city road networks as sparse adjacency matrices — BFS on this matrix computes shortest walking routes in O(V+E), powering turn-by-turn navigation for billions of users.",
      targetCompanies: ["Google", "Amazon", "Microsoft", "Zomato"],
      interviewTip: "For in-place matrix transformations, always derive the index mapping formula on paper first (e.g., `matrix[col][n-1-row] = matrix[row][col]` for 90° rotation) — guessing the formula during coding wastes irreplaceable time."
    }
  },
  "trees-bst": {
    youtubeId: "yR5Xn3_4-zI",
    creator: "Take U Forward (Striver)",
    primaryLink: {
      title: "Binary Search Tree – LeetCode Explore Card",
      url: "https://leetcode.com/explore/learn/card/introduction-to-data-structure-binary-search-tree/"
    },
    additionalResources: [
      {
        title: "BST – Visualgo",
        url: "https://visualgo.net/en/bst"
      },
      {
        title: "Trees – GeeksforGeeks",
        url: "https://www.geeksforgeeks.org/binary-tree-data-structure/"
      }
    ],
    placementRelevance: {
      patterns: ["Inorder traversal gives sorted output in BST", "LCA (Lowest Common Ancestor) in BST vs general tree", "BST validation using min/max bounds", "Kth smallest / largest in BST", "Convert sorted array to balanced BST"],
      realWorldApp: "MySQL's InnoDB engine stores table indexes as B+ Trees (generalization of BST) — every SELECT with a WHERE clause on an indexed column is a BST search delivering O(log n) row retrieval.",
      targetCompanies: ["Google", "Amazon", "Oracle", "PhonePe"],
      interviewTip: "For any BST problem, write out the inorder traversal property first ('left < root < right') — 70% of BST interview questions are solved by exploiting this sorted-order property."
    }
  },
  "tree-traversal": {
    youtubeId: "BHB0B1jFKQc",
    creator: "Take U Forward (Striver)",
    primaryLink: {
      title: "Binary Tree – LeetCode Explore Card",
      url: "https://leetcode.com/explore/learn/card/data-structure-tree/"
    },
    additionalResources: [
      {
        title: "Tree Traversals – Visualgo",
        url: "https://visualgo.net/en/bst"
      },
      {
        title: "Morris Traversal – GeeksforGeeks",
        url: "https://www.geeksforgeeks.org/inorder-tree-traversal-without-recursion-and-without-stack/"
      }
    ],
    placementRelevance: {
      patterns: ["Iterative DFS using explicit stack", "Level-order BFS with queue", "Morris traversal for O(1) space inorder", "Vertical order / diagonal traversal", "Serialize and deserialize binary tree"],
      realWorldApp: "React's Virtual DOM reconciliation uses post-order DFS to compare old and new tree nodes bottom-up — ensuring child components are diffed before parents during every render cycle.",
      targetCompanies: ["Facebook/Meta", "Amazon", "Flipkart", "Atlassian"],
      interviewTip: "Master the iterative DFS stack-based traversal cold — many companies specifically ask for iterative solutions to avoid stack overflow on skewed trees with 10^5 nodes."
    }
  },
  "avl-trees": {
    youtubeId: "jDM6_TnYIqE",
    creator: "Abdul Bari",
    primaryLink: {
      title: "AVL Tree – GeeksforGeeks",
      url: "https://www.geeksforgeeks.org/avl-tree-set-1-insertion/"
    },
    additionalResources: [
      {
        title: "AVL Tree – Visualgo",
        url: "https://visualgo.net/en/bst"
      },
      {
        title: "Red-Black vs AVL – CP-Algorithms",
        url: "https://cp-algorithms.com/data_structures/treap.html"
      }
    ],
    placementRelevance: {
      patterns: ["Balance factor calculation and rotation types", "Left-Left, Left-Right, Right-Right, Right-Left rotations", "Height-balanced BST invariant proof", "Comparison with Red-Black Tree trade-offs", "Self-balancing for sorted data insertions"],
      realWorldApp: "Java's `TreeMap` and `TreeSet` are implemented as Red-Black Trees (a relaxed AVL variant) — every sorted map operation in backend Java services (Spring Boot, etc.) relies on these rotations.",
      targetCompanies: ["Google", "Microsoft", "DE Shaw", "Tower Research"],
      interviewTip: "You rarely implement AVL from scratch in interviews — the real test is explaining WHY self-balancing matters: 'Without it, inserting sorted data degrades BST to O(n) — AVL guarantees O(log n) always.'"
    }
  },
  tries: {
    youtubeId: "oobqoCJlHA0",
    creator: "NeetCode",
    primaryLink: {
      title: "Trie – LeetCode Explore Card",
      url: "https://leetcode.com/explore/learn/card/trie/"
    },
    additionalResources: [
      {
        title: "Trie – GeeksforGeeks",
        url: "https://www.geeksforgeeks.org/trie-insert-and-search/"
      },
      {
        title: "Trie – Visualgo",
        url: "https://visualgo.net/en/suffixtree"
      }
    ],
    placementRelevance: {
      patterns: ["Autocomplete / prefix search in O(L)", "Word search in board (Trie + DFS)", "Maximum XOR pair using binary trie", "Count words with given prefix", "Replace words with root using Trie"],
      realWorldApp: "Google Search's autocomplete feature uses a Trie (combined with frequency ranking) to surface the top-10 query completions in under 100ms for 8.5 billion daily searches.",
      targetCompanies: ["Google", "Amazon", "Microsoft", "MakeMyTrip"],
      interviewTip: "Implement Trie with a TrieNode class using a `children` array of size 26 and a boolean `isEnd` — this clean structure lets you insert, search, and startsWith in O(L) and is exactly what interviewers expect."
    }
  },
  graphs: {
    youtubeId: "EgI5nU9etnU",
    creator: "Take U Forward (Striver)",
    primaryLink: {
      title: "Graph Theory – CP-Algorithms",
      url: "https://cp-algorithms.com/graph/breadth-first-search.html"
    },
    additionalResources: [
      {
        title: "Graph – Visualgo",
        url: "https://visualgo.net/en/graphds"
      },
      {
        title: "Graph Algorithms – GeeksforGeeks",
        url: "https://www.geeksforgeeks.org/graph-data-structure-and-algorithms/"
      }
    ],
    placementRelevance: {
      patterns: ["BFS for shortest path in unweighted graphs", "DFS for connected components, cycle detection", "Topological sort (Kahn's BFS + DFS approaches)", "Bipartite graph check", "Graph coloring and scheduling problems"],
      realWorldApp: "LinkedIn's 'People You May Know' feature runs BFS on a social graph of 900M+ nodes — friends-of-friends within 2 hops are ranked by mutual connection count and surfaced as recommendations.",
      targetCompanies: ["LinkedIn", "Facebook/Meta", "Google", "Uber"],
      interviewTip: "Always clarify the graph representation first ('Are we given an adjacency list or matrix? Is it directed? Are there weights?') — this 30-second clarification shapes the entire solution approach."
    }
  },
  "dynamic-programming": {
    youtubeId: "oBt53YbR9Kk",
    creator: "freeCodeCamp (Alvin Zablan)",
    primaryLink: {
      title: "DP Patterns – LeetCode Discuss",
      url: "https://leetcode.com/discuss/general-discussion/458695/dynamic-programming-patterns"
    },
    additionalResources: [
      {
        title: "DP – AtCoder Educational DP Contest",
        url: "https://atcoder.jp/contests/dp/tasks"
      },
      {
        title: "DP Introduction – CP-Algorithms",
        url: "https://cp-algorithms.com/dynamic_programming/intro-to-dp.html"
      }
    ],
    placementRelevance: {
      patterns: ["Memoization (top-down) vs tabulation (bottom-up)", "1D/2D DP on strings (LCS, Edit Distance)", "Knapsack variants (0/1, unbounded, partition)", "DP on trees and intervals", "State compression with bitmask DP", "DP on Directed Acyclic Graphs (DAGs) to find optimal paths using topological sort sequencing"],
      realWorldApp: "Google's spell-checker uses Edit Distance (Levenshtein) DP to find the closest dictionary word to a misspelling — the same O(mn) table computation suggested in every 'Did you mean?' prompt.",
      targetCompanies: ["Google", "Amazon", "Goldman Sachs", "DE Shaw"],
      interviewTip: "When dealing with small input sizes (N ≤ 20), always consider bitmask DP to represent visited state subsets using integer bitwise operations."
    }
  },
  greedy: {
    youtubeId: "bC7o8P_Ste4",
    creator: "Abdul Bari",
    primaryLink: {
      title: "Greedy Algorithms – GeeksforGeeks",
      url: "https://www.geeksforgeeks.org/greedy-algorithms/"
    },
    additionalResources: [
      {
        title: "Greedy – CP-Algorithms",
        url: "https://cp-algorithms.com/greedy/index.html"
      }
    ],
    placementRelevance: {
      patterns: ["Activity selection / interval scheduling", "Huffman encoding for optimal prefix codes", "Jump Game reachability", "Minimum number of platforms/rooms", "Prove greedy choice property before coding"],
      realWorldApp: "Akamai's CDN uses a greedy algorithm for request routing — it greedily assigns each incoming HTTP request to the nearest edge server with available capacity, minimizing latency globally.",
      targetCompanies: ["Amazon", "Adobe", "Salesforce", "ShareChat"],
      interviewTip: "Greedy is the hardest paradigm to verify — always explicitly prove the greedy choice is safe: 'If I take the locally optimal action now, can a future state be worse than any alternative?' Voicing this impresses interviewers."
    }
  },
  "recursion-backtracking": {
    youtubeId: "DKCbsiDBN6c",
    creator: "Take U Forward (Striver)",
    primaryLink: {
      title: "Backtracking – LeetCode Explore",
      url: "https://leetcode.com/explore/learn/card/recursion-ii/"
    },
    additionalResources: [
      {
        title: "Backtracking – GeeksforGeeks",
        url: "https://www.geeksforgeeks.org/backtracking-algorithms/"
      },
      {
        title: "Backtracking – CP-Algorithms",
        url: "https://cp-algorithms.com/combinatorics/generating_combinations.html"
      }
    ],
    placementRelevance: {
      patterns: ["Permutations and combinations generation", "N-Queens and Sudoku solver", "Subsets and power set enumeration", "Pruning with constraints (early termination)", "Word search in 2D grid"],
      realWorldApp: "Compiler register allocation uses backtracking-based graph coloring — it tries assigning CPU registers to variables and backtracks when conflicts arise, a direct analogue of the N-Queens problem.",
      targetCompanies: ["Google", "Amazon", "Booking.com", "Hotstar"],
      interviewTip: "The backtracking template is always: choose → recurse → unchoose. Write this skeleton first with placeholder comments — it ensures you never forget to undo state, which is the source of 90% of backtracking bugs."
    }
  },
  "bit-manipulation": {
    youtubeId: "NLKQEOgBAnw",
    creator: "NeetCode",
    primaryLink: {
      title: "Bit Manipulation – LeetCode Explore",
      url: "https://leetcode.com/explore/learn/card/graph/620/introduction-to-disjoint-sets/"
    },
    additionalResources: [
      {
        title: "Bit Tricks – CP-Algorithms",
        url: "https://cp-algorithms.com/algebra/bit-manipulation.html"
      },
      {
        title: "Bitwise Operators – GeeksforGeeks",
        url: "https://www.geeksforgeeks.org/bitwise-operators-in-c-cpp/"
      }
    ],
    placementRelevance: {
      patterns: ["XOR for finding single/missing number", "Bitmask DP for subset enumeration", "Brian Kernighan's algorithm (count set bits)", "Power of 2 check: `n & (n-1) == 0`", "Bit shifting for fast multiplication/division"],
      realWorldApp: "Redis uses bitfields and bit arrays to store feature flags for millions of users — each user's permissions are packed into a single 64-bit integer, reducing memory from MBs to KBs at scale.",
      targetCompanies: ["Qualcomm", "Intel", "Google", "Tower Research Capital"],
      interviewTip: "Memorize five core tricks cold: `x^x=0`, `x^0=x`, `x & (x-1)` clears lowest set bit, `x & (-x)` isolates lowest set bit, `~x = -(x+1)`. These solve 80% of bit manipulation interview questions directly."
    }
  },
  "divide-conquer": {
    youtubeId: "2Rr2tW9zvRg",
    creator: "Abdul Bari",
    primaryLink: {
      title: "Divide & Conquer – GeeksforGeeks",
      url: "https://www.geeksforgeeks.org/divide-and-conquer/"
    },
    additionalResources: [
      {
        title: "Merge Sort & D&C – Visualgo",
        url: "https://visualgo.net/en/sorting"
      },
      {
        title: "D&C – CP-Algorithms",
        url: "https://cp-algorithms.com/algebra/fft.html"
      }
    ],
    placementRelevance: {
      patterns: ["Merge sort for inversion count", "Quick select for Kth largest O(n) average", "Binary search as D&C on sorted space", "Karatsuba multiplication", "Closest pair of points"],
      realWorldApp: "MapReduce (used by Google, Hadoop) is a direct implementation of Divide & Conquer at distributed scale — split data across nodes (divide), process locally (conquer), merge results (combine).",
      targetCompanies: ["Google", "Amazon", "Microsoft", "Myntra"],
      interviewTip: "Always apply the Master Theorem when analyzing D&C recurrences: T(n) = aT(n/b) + f(n). Knowing which case applies (log vs polynomial vs n log n) lets you state complexity instantly without derivation."
    }
  },
  "disjoint-set": {
    youtubeId: "aBxjDBC4M1U",
    creator: "WilliamFiset",
    primaryLink: {
      title: "Disjoint Set Union – CP-Algorithms",
      url: "https://cp-algorithms.com/data_structures/disjoint_set_union.html"
    },
    additionalResources: [
      {
        title: "Union-Find – GeeksforGeeks",
        url: "https://www.geeksforgeeks.org/union-find/"
      },
      {
        title: "DSU – LeetCode Explore",
        url: "https://leetcode.com/explore/learn/card/graph/618/disjoint-set/"
      }
    ],
    placementRelevance: {
      patterns: ["Union by rank + path compression for O(α(n))", "Cycle detection in undirected graphs", "Kruskal's MST implementation", "Dynamic connectivity queries", "Number of connected components"],
      realWorldApp: "Perforce (version control used in game development at EA, Ubisoft) uses Union-Find to track file merge conflicts — grouping files into connected change sets across parallel branches.",
      targetCompanies: ["Google", "Amazon", "Codeforces-heavy firms", "Games studios (Unity/EA)"],
      interviewTip: "Always implement both optimizations together — union by rank AND path compression. Either alone gives O(log n); combined they give the near-constant O(α(n)). Stating this distinction impresses senior interviewers."
    }
  },
  "segment-tree": {
    youtubeId: "ZBHKZF5w4YU",
    creator: "WilliamFiset",
    primaryLink: {
      title: "Segment Tree – CP-Algorithms",
      url: "https://cp-algorithms.com/data_structures/segment_tree.html"
    },
    additionalResources: [
      {
        title: "Segment Tree – GeeksforGeeks",
        url: "https://www.geeksforgeeks.org/segment-tree-set-1-sum-of-given-range/"
      },
      {
        title: "Segment Tree – Visualgo",
        url: "https://visualgo.net/en/segmenttree"
      }
    ],
    placementRelevance: {
      patterns: ["Range sum / min / max queries in O(log n)", "Lazy propagation for range updates", "Point update + range query", "Persistent segment trees for historical queries", "Merge sort tree for frequency in range"],
      realWorldApp: "Financial trading platforms (Bloomberg Terminal) use segment trees to answer range aggregate queries ('max price in last 30 minutes') on tick data streams in microseconds for algorithmic trading.",
      targetCompanies: ["DE Shaw", "Tower Research", "Google", "Directi"],
      interviewTip: "Start with the recursive build + query template (it's cleaner to explain) and only add lazy propagation when the interviewer asks about range updates — attempting lazy upfront without being asked often leads to bugs under pressure."
    }
  },
  "fenwick-tree": {
    youtubeId: "uSFzHCZ4E-8",
    creator: "WilliamFiset",
    primaryLink: {
      title: "Fenwick Tree – CP-Algorithms",
      url: "https://cp-algorithms.com/data_structures/fenwick.html"
    },
    additionalResources: [
      {
        title: "BIT – GeeksforGeeks",
        url: "https://www.geeksforgeeks.org/binary-indexed-tree-or-fenwick-tree-2/"
      },
      {
        title: "Fenwick Tree – Visualgo",
        url: "https://visualgo.net/en/fenwicktree"
      }
    ],
    placementRelevance: {
      patterns: ["Prefix sum with point updates in O(log n)", "Count inversions using BIT", "Range sum queries on 2D BIT", "Order statistics (rank of elements)", "BIT vs Segment Tree trade-off explanation"],
      realWorldApp: "Online leaderboard systems (Codeforces, LeetCode) use Fenwick Trees to maintain real-time rank computation — updating a user's score and retrieving their global rank both run in O(log n) over millions of entries.",
      targetCompanies: ["Codeforces-heavy firms", "Directi", "Tower Research", "DE Shaw"],
      interviewTip: "The BIT update and query operations are both based on `i += i & (-i)` and `i -= i & (-i)` — memorize these two 3-line functions verbatim; the entire data structure is just these two operations."
    }
  },
  "lru-cache": {
    youtubeId: "7ABFKPK2hD4",
    creator: "NeetCode",
    primaryLink: {
      title: "LRU Cache – LeetCode Problem",
      url: "https://leetcode.com/problems/lru-cache/"
    },
    additionalResources: [
      {
        title: "LRU Cache Design – GeeksforGeeks",
        url: "https://www.geeksforgeeks.org/lru-cache-implementation/"
      },
      {
        title: "Cache Replacement Policies – Wikipedia",
        url: "https://en.wikipedia.org/wiki/Cache_replacement_policies"
      }
    ],
    placementRelevance: {
      patterns: ["HashMap + Doubly Linked List for O(1) get/put", "Sentinel/dummy head and tail nodes", "LFU cache as extension", "Cache eviction policy design", "Thread-safe LRU with locks"],
      realWorldApp: "Memcached (used by Facebook, YouTube) implements LRU eviction at the slab level — when memory is full, the least recently accessed item is evicted first, keeping hot data in sub-millisecond memory.",
      targetCompanies: ["Amazon", "Google", "Facebook/Meta", "Uber"],
      interviewTip: "The LRU Cache is the #1 system-design-meets-coding hybrid question — always explain the intuition first: 'HashMap gives O(1) lookup; doubly linked list gives O(1) removal and reordering.' Then code."
    }
  },
  "bitwise-trie": {
    youtubeId: "A3ZZHoJnGP8",
    creator: "NeetCode",
    primaryLink: {
      title: "Maximum XOR – LeetCode",
      url: "https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/"
    },
    additionalResources: [
      {
        title: "Bitwise Trie – GeeksforGeeks",
        url: "https://www.geeksforgeeks.org/maximum-xor-of-two-numbers-in-an-array/"
      }
    ],
    placementRelevance: {
      patterns: ["Maximum XOR of two numbers in O(32n)", "Maximum XOR with element from array", "IP routing via longest prefix match", "Binary number insertion bit by bit", "Combining bitmask DP with trie"],
      realWorldApp: "Internet routers use binary tries for longest prefix matching in IP routing tables — each 32-bit IP address is traversed bit-by-bit in the trie to find the best forwarding rule in O(32) time.",
      targetCompanies: ["Google", "Cisco", "Juniper Networks", "DE Shaw"],
      interviewTip: "A bitwise trie always has depth 32 (for integers) — inserting and querying are both O(32) = O(1). When you see 'maximum XOR', this is always the intended optimal solution over O(n²) brute force."
    }
  },
  "dijkstra-algo": {
    youtubeId: "V6H1qAeB-l4",
    creator: "WilliamFiset",
    primaryLink: {
      title: "Dijkstra – CP-Algorithms",
      url: "https://cp-algorithms.com/graph/dijkstra.html"
    },
    additionalResources: [
      {
        title: "Dijkstra – Visualgo",
        url: "https://visualgo.net/en/sssp"
      },
      {
        title: "Dijkstra – GeeksforGeeks",
        url: "https://www.geeksforgeeks.org/dijkstras-shortest-path-algorithm-greedy-algo-7/"
      }
    ],
    placementRelevance: {
      patterns: ["Priority queue-based implementation O((V+E) log V)", "Modified Dijkstra for K-stops constraint", "Bidirectional Dijkstra for performance", "Dijkstra on state-space graphs", "Why Dijkstra fails on negative edges"],
      realWorldApp: "Google Maps uses a highly optimized variant of Dijkstra (with contraction hierarchies) to compute driving routes — preprocessing road networks enables sub-second shortest-path queries across entire continents.",
      targetCompanies: ["Google", "Uber", "Ola", "HERE Technologies"],
      interviewTip: "When a graph has 'costs' or 'weights' and asks for shortest path, Dijkstra is the go-to — but immediately ask 'are there negative weights?' If yes, pivot to Bellman-Ford. This distinction is often the trap."
    }
  },
  "bellman-ford": {
    youtubeId: "obWXjtg0L64",
    creator: "Take U Forward (Striver)",
    primaryLink: {
      title: "Bellman-Ford – CP-Algorithms",
      url: "https://cp-algorithms.com/graph/bellman_ford.html"
    },
    additionalResources: [
      {
        title: "Bellman-Ford – GeeksforGeeks",
        url: "https://www.geeksforgeeks.org/bellman-ford-algorithm-dp-23/"
      },
      {
        title: "Bellman-Ford – Visualgo",
        url: "https://visualgo.net/en/sssp"
      }
    ],
    placementRelevance: {
      patterns: ["V-1 edge relaxations for correctness", "Negative cycle detection on Vth iteration", "SPFA (queue-optimized Bellman-Ford)", "Arbitrage detection in currency exchange", "Difference constraints system solving"],
      realWorldApp: "Financial arbitrage detection systems on trading platforms use Bellman-Ford on currency exchange rate graphs — a negative cycle indicates a profitable arbitrage loop (e.g., USD→EUR→GBP→USD).",
      targetCompanies: ["Goldman Sachs", "Citadel", "Google", "PayPal"],
      interviewTip: "Bellman-Ford is O(VE) — far slower than Dijkstra's O((V+E)logV). Always justify its use: 'I need Bellman-Ford because the graph has negative edge weights / I need to detect negative cycles.'"
    }
  },
  "floyd-warshall": {
    youtubeId: "4OQeCuLYj-4",
    creator: "WilliamFiset",
    primaryLink: {
      title: "Floyd-Warshall – CP-Algorithms",
      url: "https://cp-algorithms.com/graph/all-pair-shortest-path-floyd-warshall.html"
    },
    additionalResources: [
      {
        title: "Floyd-Warshall – GeeksforGeeks",
        url: "https://www.geeksforgeeks.org/floyd-warshall-algorithm-dp-16/"
      }
    ],
    placementRelevance: {
      patterns: ["All-pairs shortest path in O(V³)", "Transitive closure of a directed graph", "Negative cycle detection via diagonal", "Optimal routing table computation", "DP formulation: dp[i][j][k] → dp[i][j]"],
      realWorldApp: "Network routing protocols like OSPF use Floyd-Warshall to precompute all-pairs shortest paths in autonomous systems — every router knows the optimal next hop to every other router before traffic arrives.",
      targetCompanies: ["Cisco", "Google", "Microsoft", "Juniper Networks"],
      interviewTip: "Floyd-Warshall is only practical for dense graphs with V ≤ 500 (V³ = 125M ops). Always state this constraint — using it on a sparse graph with V=10⁵ is a critical error that signals lack of complexity awareness."
    }
  },
  "kruskal-mst": {
    youtubeId: "JZBQLXgSGfs",
    creator: "WilliamFiset",
    primaryLink: {
      title: "Kruskal's MST – CP-Algorithms",
      url: "https://cp-algorithms.com/graph/mst_kruskal.html"
    },
    additionalResources: [
      {
        title: "Kruskal's – GeeksforGeeks",
        url: "https://www.geeksforgeeks.org/kruskals-minimum-spanning-tree-algorithm-greedy-algo-2/"
      },
      {
        title: "MST – Visualgo",
        url: "https://visualgo.net/en/mst"
      }
    ],
    placementRelevance: {
      patterns: ["Sort edges + Union-Find cycle detection", "MST for network design problems", "Maximum spanning tree (negate weights)", "Minimum cost to connect all points", "Kruskal vs Prim for sparse vs dense graphs"],
      realWorldApp: "Electrical grid optimization at companies like Siemens uses Kruskal's MST to design power distribution networks — minimizing total cable cost while ensuring all substations are connected.",
      targetCompanies: ["Microsoft", "Google", "Siemens", "Amazon"],
      interviewTip: "Kruskal's runs in O(E log E) — dominated by sorting edges. It's better than Prim's for sparse graphs. State this trade-off explicitly: 'I chose Kruskal's because E << V²; for dense graphs I'd use Prim's with a heap.'"
    }
  },
  "prim-mst": {
    youtubeId: "cplfcGZmX7I",
    creator: "WilliamFiset",
    primaryLink: {
      title: "Prim's MST – CP-Algorithms",
      url: "https://cp-algorithms.com/graph/mst_prim.html"
    },
    additionalResources: [
      {
        title: "Prim's – GeeksforGeeks",
        url: "https://www.geeksforgeeks.org/prims-minimum-spanning-tree-mst-greedy-algo-5/"
      },
      {
        title: "MST – Visualgo",
        url: "https://visualgo.net/en/mst"
      }
    ],
    placementRelevance: {
      patterns: ["Greedy vertex expansion with priority queue O((V+E) log V)", "Dense graph MST with adjacency matrix O(V²)", "Comparing Prim's vs Kruskal's trade-offs", "Minimum cost to connect all cities", "Online MST construction (dynamic edge addition)"],
      realWorldApp: "Telecommunication companies (Jio, Airtel) use Prim's algorithm to plan fiber optic cable layouts — the MST minimizes total trench-digging cost while ensuring every cell tower is connected to the backbone.",
      targetCompanies: ["Amazon", "Microsoft", "Google", "Ericsson"],
      interviewTip: "Prim's is conceptually identical to Dijkstra — replace 'shortest distance from source' with 'minimum edge weight to the MST'. If you can code Dijkstra, you can code Prim's in under 2 minutes of adaptation."
    }
  }
};
