import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import './patterns.css';

// ═══════════════════════════════════════════════════════════
//  DATA — All 20 Grokking Patterns with full problem lists
//  Source: github.com/dipjul/Grokking-the-Coding-Interview
// ═══════════════════════════════════════════════════════════
const PATTERNS = [
  {
    id: 1,
    name: 'Sliding Window',
    icon: '🪟',
    color: '#06b6d4',
    gradient: 'linear-gradient(135deg, #0e7490, #06b6d4)',
    difficulty: 'Beginner',
    description: 'Used when dealing with contiguous subarrays or substrings. Maintain a window that slides across the data structure.',
    useCases: ['Max sum subarray', 'Longest substring', 'String permutations'],
    problems: [
      { name: 'Maximum Sum Subarray of Size K', difficulty: 'Easy', leetcode: 'https://leetcode.com/problems/maximum-average-subarray-i/' },
      { name: 'Smallest Subarray with Given Sum', difficulty: 'Easy', leetcode: 'https://leetcode.com/problems/minimum-size-subarray-sum/' },
      { name: 'Longest Substring with K Distinct Characters', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/longest-substring-with-at-most-k-distinct-characters/' },
      { name: 'Fruits into Baskets', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/fruit-into-baskets/' },
      { name: 'No-repeat Substring', difficulty: 'Hard', leetcode: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/' },
      { name: 'Longest Substring with Same Letters after Replacement', difficulty: 'Hard', leetcode: 'https://leetcode.com/problems/longest-repeating-character-replacement/' },
      { name: 'Longest Subarray with Ones after Replacement', difficulty: 'Hard', leetcode: 'https://leetcode.com/problems/max-consecutive-ones-iii/' },
      { name: 'Permutation in a String', difficulty: 'Hard', leetcode: 'https://leetcode.com/problems/permutation-in-string/' },
      { name: 'String Anagrams', difficulty: 'Hard', leetcode: 'https://leetcode.com/problems/find-all-anagrams-in-a-string/' },
      { name: 'Smallest Window containing Substring', difficulty: 'Hard', leetcode: 'https://leetcode.com/problems/minimum-window-substring/' },
      { name: 'Words Concatenation', difficulty: 'Hard', leetcode: 'https://leetcode.com/problems/substring-with-concatenation-of-all-words/' },
    ]
  },
  {
    id: 2,
    name: 'Two Pointers',
    icon: '👆',
    color: '#a78bfa',
    gradient: 'linear-gradient(135deg, #7c3aed, #a78bfa)',
    difficulty: 'Beginner',
    description: 'Use two pointers to iterate through a data structure — usually from both ends or at different speeds.',
    useCases: ['Sorted array problems', 'Pair finding', 'In-place manipulation'],
    problems: [
      { name: 'Pair with Target Sum', difficulty: 'Easy', leetcode: 'https://leetcode.com/problems/two-sum/' },
      { name: 'Remove Duplicates', difficulty: 'Easy', leetcode: 'https://leetcode.com/problems/remove-duplicates-from-sorted-array/' },
      { name: 'Squaring a Sorted Array', difficulty: 'Easy', leetcode: 'https://leetcode.com/problems/squares-of-a-sorted-array/' },
      { name: 'Triplet Sum to Zero', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/3sum/' },
      { name: 'Triplet Sum Close to Target', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/3sum-closest/' },
      { name: 'Triplets with Smaller Sum', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/3sum-smaller/' },
      { name: 'Subarrays with Product Less than Target', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/subarray-product-less-than-k/' },
      { name: 'Dutch National Flag Problem', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/sort-colors/' },
      { name: 'Quadruple Sum to Target', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/4sum/' },
      { name: 'Comparing Strings with Backspaces', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/backspace-string-compare/' },
      { name: 'Minimum Window Sort', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/shortest-unsorted-continuous-subarray/' },
    ]
  },
  {
    id: 3,
    name: 'Fast & Slow Pointers',
    icon: '🐢',
    color: '#34d399',
    gradient: 'linear-gradient(135deg, #065f46, #34d399)',
    difficulty: 'Beginner',
    description: "Floyd's Cycle Detection. Two pointers move at different speeds to detect cycles in linked lists or arrays.",
    useCases: ['Cycle detection', 'Finding middle', 'Palindrome check'],
    problems: [
      { name: 'LinkedList Cycle', difficulty: 'Easy', leetcode: 'https://leetcode.com/problems/linked-list-cycle/' },
      { name: 'Start of LinkedList Cycle', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/linked-list-cycle-ii/' },
      { name: 'Happy Number', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/happy-number/' },
      { name: 'Middle of the LinkedList', difficulty: 'Easy', leetcode: 'https://leetcode.com/problems/middle-of-the-linked-list/' },
      { name: 'Palindrome LinkedList', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/palindrome-linked-list/' },
      { name: 'Rearrange a LinkedList', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/reorder-list/' },
      { name: 'Cycle in a Circular Array', difficulty: 'Hard', leetcode: 'https://leetcode.com/problems/circular-array-loop/' },
    ]
  },
  {
    id: 4,
    name: 'Merge Intervals',
    icon: '🔗',
    color: '#fb923c',
    gradient: 'linear-gradient(135deg, #c2410c, #fb923c)',
    difficulty: 'Intermediate',
    description: 'Handle overlapping intervals efficiently. Sort by start time, then merge or check for conflicts.',
    useCases: ['Schedule problems', 'Interval merging', 'Meeting rooms'],
    problems: [
      { name: 'Merge Intervals', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/merge-intervals/' },
      { name: 'Insert Interval', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/insert-interval/' },
      { name: 'Intervals Intersection', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/interval-list-intersections/' },
      { name: 'Conflicting Appointments', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/meeting-rooms/' },
      { name: 'Minimum Meeting Rooms', difficulty: 'Hard', leetcode: 'https://leetcode.com/problems/meeting-rooms-ii/' },
      { name: 'Maximum CPU Load', difficulty: 'Hard', leetcode: 'https://leetcode.com/problems/maximum-cpu-load/' },
      { name: 'Employee Free Time', difficulty: 'Hard', leetcode: 'https://leetcode.com/problems/employee-free-time/' },
    ]
  },
  {
    id: 5,
    name: 'Cyclic Sort',
    icon: '🔄',
    color: '#f472b6',
    gradient: 'linear-gradient(135deg, #be185d, #f472b6)',
    difficulty: 'Beginner',
    description: 'When array contains numbers in range [1, N]. Place each number at its correct index in O(n) time.',
    useCases: ['Missing number', 'Find duplicates', 'Array of range 1 to N'],
    problems: [
      { name: 'Cyclic Sort', difficulty: 'Easy', leetcode: 'https://leetcode.com/problems/first-missing-positive/' },
      { name: 'Find the Missing Number', difficulty: 'Easy', leetcode: 'https://leetcode.com/problems/missing-number/' },
      { name: 'Find all Missing Numbers', difficulty: 'Easy', leetcode: 'https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array/' },
      { name: 'Find the Duplicate Number', difficulty: 'Easy', leetcode: 'https://leetcode.com/problems/find-the-duplicate-number/' },
      { name: 'Find all Duplicates', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/find-all-duplicates-in-an-array/' },
      { name: 'Find the Corrupt Pair', difficulty: 'Easy', leetcode: 'https://leetcode.com/problems/set-mismatch/' },
      { name: 'First K Missing Positive Numbers', difficulty: 'Hard', leetcode: 'https://leetcode.com/problems/kth-missing-positive-number/' },
    ]
  },
  {
    id: 6,
    name: 'In-place Reversal of Linked List',
    icon: '↩️',
    color: '#38bdf8',
    gradient: 'linear-gradient(135deg, #075985, #38bdf8)',
    difficulty: 'Intermediate',
    description: 'Reverse a linked list or sub-list in-place using pointer manipulation without extra space.',
    useCases: ['Reverse a list', 'Reverse sub-list', 'K-group reversal'],
    problems: [
      { name: 'Reverse a LinkedList', difficulty: 'Easy', leetcode: 'https://leetcode.com/problems/reverse-linked-list/' },
      { name: 'Reverse a Sub-list', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/reverse-linked-list-ii/' },
      { name: 'Reverse every K-element Sub-list', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/reverse-nodes-in-k-group/' },
      { name: 'Reverse alternating K-element Sub-list', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/reverse-alternating-k-element-sublist/' },
      { name: 'Rotate a LinkedList', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/rotate-list/' },
    ]
  },
  {
    id: 7,
    name: 'Tree Breadth First Search',
    icon: '🌳',
    color: '#4ade80',
    gradient: 'linear-gradient(135deg, #166534, #4ade80)',
    difficulty: 'Intermediate',
    description: 'Level-by-level traversal of a tree using a queue. Process all nodes at current depth before going deeper.',
    useCases: ['Level order traversal', 'Zigzag traversal', 'Connect level nodes'],
    problems: [
      { name: 'Binary Tree Level Order Traversal', difficulty: 'Easy', leetcode: 'https://leetcode.com/problems/binary-tree-level-order-traversal/' },
      { name: 'Reverse Level Order Traversal', difficulty: 'Easy', leetcode: 'https://leetcode.com/problems/binary-tree-level-order-traversal-ii/' },
      { name: 'Zigzag Traversal', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/' },
      { name: 'Level Averages in a Binary Tree', difficulty: 'Easy', leetcode: 'https://leetcode.com/problems/average-of-levels-in-binary-tree/' },
      { name: 'Minimum Depth of Binary Tree', difficulty: 'Easy', leetcode: 'https://leetcode.com/problems/minimum-depth-of-binary-tree/' },
      { name: 'Level Order Successor', difficulty: 'Easy', leetcode: 'https://leetcode.com/problems/binary-tree-level-order-traversal/' },
      { name: 'Connect Level Order Siblings', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/populating-next-right-pointers-in-each-node/' },
      { name: 'Connect All Level Order Siblings', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/populating-next-right-pointers-in-each-node-ii/' },
      { name: 'Right View of a Binary Tree', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/binary-tree-right-side-view/' },
    ]
  },
  {
    id: 8,
    name: 'Tree Depth First Search',
    icon: '🌲',
    color: '#a3e635',
    gradient: 'linear-gradient(135deg, #3f6212, #a3e635)',
    difficulty: 'Intermediate',
    description: 'Depth-first traversal using recursion or a stack. Explore each branch completely before backtracking.',
    useCases: ['Path finding', 'Root-to-leaf sum', 'Path with sequence'],
    problems: [
      { name: 'Binary Tree Path Sum', difficulty: 'Easy', leetcode: 'https://leetcode.com/problems/path-sum/' },
      { name: 'All Paths for a Sum', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/path-sum-ii/' },
      { name: 'Sum of Path Numbers', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/sum-root-to-leaf-numbers/' },
      { name: 'Path with Given Sequence', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/check-if-a-string-is-a-valid-sequence-from-root-to-leaves-path-in-a-binary-tree/' },
      { name: 'Count Paths for a Sum', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/path-sum-iii/' },
      { name: 'Tree Diameter', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/diameter-of-binary-tree/' },
      { name: 'Path with Maximum Sum', difficulty: 'Hard', leetcode: 'https://leetcode.com/problems/binary-tree-maximum-path-sum/' },
    ]
  },
  {
    id: 9,
    name: 'Two Heaps',
    icon: '⚖️',
    color: '#e879f9',
    gradient: 'linear-gradient(135deg, #86198f, #e879f9)',
    difficulty: 'Advanced',
    description: 'Maintain two heaps (min + max) to efficiently find medians or partition data into two groups.',
    useCases: ['Find median', 'Scheduling', 'Sliding window median'],
    problems: [
      { name: 'Find the Median of a Number Stream', difficulty: 'Hard', leetcode: 'https://leetcode.com/problems/find-median-from-data-stream/' },
      { name: 'Sliding Window Median', difficulty: 'Hard', leetcode: 'https://leetcode.com/problems/sliding-window-median/' },
      { name: 'Maximize Capital', difficulty: 'Hard', leetcode: 'https://leetcode.com/problems/ipo/' },
      { name: 'Next Interval', difficulty: 'Hard', leetcode: 'https://leetcode.com/problems/find-right-interval/' },
    ]
  },
  {
    id: 10,
    name: 'Subsets',
    icon: '🎭',
    color: '#fbbf24',
    gradient: 'linear-gradient(135deg, #92400e, #fbbf24)',
    difficulty: 'Intermediate',
    description: 'Generate all subsets/combinations using BFS or recursion. Build solutions incrementally.',
    useCases: ['Powerset', 'Permutations', 'String combinations'],
    problems: [
      { name: 'Subsets', difficulty: 'Easy', leetcode: 'https://leetcode.com/problems/subsets/' },
      { name: 'Subsets with Duplicates', difficulty: 'Easy', leetcode: 'https://leetcode.com/problems/subsets-ii/' },
      { name: 'Permutations', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/permutations/' },
      { name: 'String Permutations by Changing Case', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/letter-case-permutation/' },
      { name: 'Balanced Parentheses', difficulty: 'Hard', leetcode: 'https://leetcode.com/problems/generate-parentheses/' },
      { name: 'Unique Generalized Abbreviations', difficulty: 'Hard', leetcode: 'https://leetcode.com/problems/generalized-abbreviation/' },
      { name: 'Evaluate Expression', difficulty: 'Hard', leetcode: 'https://leetcode.com/problems/different-ways-to-add-parentheses/' },
      { name: 'Structurally Unique Binary Search Trees', difficulty: 'Hard', leetcode: 'https://leetcode.com/problems/unique-binary-search-trees-ii/' },
      { name: 'Count of Structurally Unique Binary Search Trees', difficulty: 'Hard', leetcode: 'https://leetcode.com/problems/unique-binary-search-trees/' },
    ]
  },
  {
    id: 11,
    name: 'Modified Binary Search',
    icon: '🔍',
    color: '#67e8f9',
    gradient: 'linear-gradient(135deg, #0e7490, #67e8f9)',
    difficulty: 'Intermediate',
    description: 'Adapt classic binary search for rotated arrays, unknown-size arrays, or bitonic arrays.',
    useCases: ['Rotated array', 'Find target', 'Bitonic array'],
    problems: [
      { name: 'Order-agnostic Binary Search', difficulty: 'Easy', leetcode: 'https://leetcode.com/problems/binary-search/' },
      { name: 'Ceiling of a Number', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/search-insert-position/' },
      { name: 'Next Letter', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/find-smallest-letter-greater-than-target/' },
      { name: 'Number Range', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/' },
      { name: 'Search in a Sorted Infinite Array', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/search-in-a-sorted-array-of-unknown-size/' },
      { name: 'Minimum Difference Element', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/minimum-absolute-difference-in-bst/' },
      { name: 'Bitonic Array Maximum', difficulty: 'Easy', leetcode: 'https://leetcode.com/problems/peak-index-in-a-mountain-array/' },
      { name: 'Search Bitonic Array', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/find-in-mountain-array/' },
      { name: 'Search in Rotated Array', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/search-in-rotated-sorted-array/' },
      { name: 'Rotation Count', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/' },
    ]
  },
  {
    id: 12,
    name: 'Bitwise XOR',
    icon: '⚡',
    color: '#facc15',
    gradient: 'linear-gradient(135deg, #713f12, #facc15)',
    difficulty: 'Advanced',
    description: 'XOR tricks: duplicate removal, missing number, and bit manipulation in O(n) time and O(1) space.',
    useCases: ['Find missing', 'Flip bits', 'Non-repeating number'],
    problems: [
      { name: 'Single Number', difficulty: 'Easy', leetcode: 'https://leetcode.com/problems/single-number/' },
      { name: 'Two Single Numbers', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/single-number-iii/' },
      { name: 'Complement of Base 10 Number', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/complement-of-base-10-integer/' },
      { name: "Flip and Invert an Image", difficulty: 'Easy', leetcode: 'https://leetcode.com/problems/flipping-an-image/' },
    ]
  },
  {
    id: 13,
    name: 'Top K Elements',
    icon: '🏆',
    color: '#f97316',
    gradient: 'linear-gradient(135deg, #7c2d12, #f97316)',
    difficulty: 'Intermediate',
    description: "Use a heap of size K to find top/bottom K elements without sorting the entire array.",
    useCases: ['Kth largest', 'K closest points', 'Top K frequent'],
    problems: [
      { name: 'Top K Numbers', difficulty: 'Easy', leetcode: 'https://leetcode.com/problems/kth-largest-element-in-a-stream/' },
      { name: 'Kth Smallest Number', difficulty: 'Easy', leetcode: 'https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/' },
      { name: 'K Closest Points to the Origin', difficulty: 'Easy', leetcode: 'https://leetcode.com/problems/k-closest-points-to-origin/' },
      { name: 'Connect Ropes', difficulty: 'Easy', leetcode: 'https://leetcode.com/problems/minimum-cost-to-connect-sticks/' },
      { name: 'Top K Frequent Numbers', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/top-k-frequent-elements/' },
      { name: 'Frequency Sort', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/sort-characters-by-frequency/' },
      { name: 'Kth Largest Number in a Stream', difficulty: 'Easy', leetcode: 'https://leetcode.com/problems/kth-largest-element-in-a-stream/' },
      { name: 'K Closest Numbers', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/find-k-closest-elements/' },
      { name: 'Maximum Distinct Elements', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/least-number-of-unique-integers-after-k-removals/' },
      { name: 'Sum of Elements Between k1 & k2 Smallest', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/find-k-closest-elements/' },
      { name: 'Rearrange String', difficulty: 'Hard', leetcode: 'https://leetcode.com/problems/reorganize-string/' },
      { name: 'Rearrange String K Distance Apart', difficulty: 'Hard', leetcode: 'https://leetcode.com/problems/task-scheduler/' },
      { name: 'Scheduling Tasks', difficulty: 'Hard', leetcode: 'https://leetcode.com/problems/task-scheduler/' },
      { name: 'Frequency Stack', difficulty: 'Hard', leetcode: 'https://leetcode.com/problems/maximum-frequency-stack/' },
    ]
  },
  {
    id: 14,
    name: 'K-way Merge',
    icon: '🌀',
    color: '#818cf8',
    gradient: 'linear-gradient(135deg, #3730a3, #818cf8)',
    difficulty: 'Advanced',
    description: 'Merge K sorted arrays/lists efficiently using a min-heap to always pick the smallest element.',
    useCases: ['Merge K sorted', 'Kth smallest from M sorted', 'Smallest range'],
    problems: [
      { name: 'Merge K Sorted Lists', difficulty: 'Hard', leetcode: 'https://leetcode.com/problems/merge-k-sorted-lists/' },
      { name: 'Kth Smallest Number in M Sorted Lists', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/' },
      { name: 'Kth Smallest Number in a Sorted Matrix', difficulty: 'Hard', leetcode: 'https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/' },
      { name: 'Smallest Number Range', difficulty: 'Hard', leetcode: 'https://leetcode.com/problems/smallest-range-covering-elements-from-k-lists/' },
      { name: 'K Pairs with Largest Sums', difficulty: 'Hard', leetcode: 'https://leetcode.com/problems/find-k-pairs-with-smallest-sums/' },
    ]
  },
  {
    id: 15,
    name: '0/1 Knapsack (DP)',
    icon: '🎒',
    color: '#2dd4bf',
    gradient: 'linear-gradient(135deg, #0f766e, #2dd4bf)',
    difficulty: 'Advanced',
    description: 'Classic dynamic programming: either take an item or leave it. Build bottom-up DP table.',
    useCases: ['Subset sum', 'Partition equal subset', 'Count of subset sum'],
    problems: [
      { name: '0/1 Knapsack', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/ones-and-zeroes/' },
      { name: 'Equal Subset Sum Partition', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/partition-equal-subset-sum/' },
      { name: 'Subset Sum', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/partition-equal-subset-sum/' },
      { name: 'Minimum Subset Sum Difference', difficulty: 'Hard', leetcode: 'https://leetcode.com/problems/last-stone-weight-ii/' },
      { name: 'Count of Subset Sum', difficulty: 'Hard', leetcode: 'https://leetcode.com/problems/target-sum/' },
      { name: 'Target Sum', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/target-sum/' },
    ]
  },
  {
    id: 16,
    name: 'Topological Sort',
    icon: '📊',
    color: '#f43f5e',
    gradient: 'linear-gradient(135deg, #9f1239, #f43f5e)',
    difficulty: 'Advanced',
    description: 'Order nodes in a DAG based on dependencies using BFS (Kahn\'s algorithm) or DFS.',
    useCases: ['Course scheduling', 'Build order', 'Alien dictionary'],
    problems: [
      { name: 'Topological Sort', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/course-schedule-ii/' },
      { name: 'Tasks Scheduling', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/course-schedule/' },
      { name: 'Tasks Scheduling Order', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/course-schedule-ii/' },
      { name: 'All Tasks Scheduling Orders', difficulty: 'Hard', leetcode: 'https://leetcode.com/problems/course-schedule-ii/' },
      { name: 'Alien Dictionary', difficulty: 'Hard', leetcode: 'https://leetcode.com/problems/alien-dictionary/' },
      { name: 'Reconstructing a Sequence', difficulty: 'Hard', leetcode: 'https://leetcode.com/problems/sequence-reconstruction/' },
      { name: 'Minimum Height Trees', difficulty: 'Hard', leetcode: 'https://leetcode.com/problems/minimum-height-trees/' },
    ]
  },
  {
    id: 17,
    name: 'Backtracking',
    icon: '🔙',
    color: '#c084fc',
    gradient: 'linear-gradient(135deg, #6b21a8, #c084fc)',
    difficulty: 'Advanced',
    description: 'Explore all possibilities by trying each option, then "undo" and try the next one.',
    useCases: ['N-Queens', 'Sudoku', 'Word search'],
    problems: [
      { name: 'Combination Sum', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/combination-sum/' },
      { name: 'Word Search', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/word-search/' },
      { name: 'N-Queens', difficulty: 'Hard', leetcode: 'https://leetcode.com/problems/n-queens/' },
      { name: 'Sudoku Solver', difficulty: 'Hard', leetcode: 'https://leetcode.com/problems/sudoku-solver/' },
      { name: 'Restore IP Addresses', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/restore-ip-addresses/' },
      { name: 'Letter Combinations of a Phone Number', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/letter-combinations-of-a-phone-number/' },
    ]
  },
  {
    id: 18,
    name: 'Monotonic Stack',
    icon: '📚',
    color: '#fb7185',
    gradient: 'linear-gradient(135deg, #9f1239, #fb7185)',
    difficulty: 'Intermediate',
    description: 'Maintain a stack in increasing or decreasing order to find next greater/smaller elements in O(n).',
    useCases: ['Next greater element', 'Stock span', 'Largest rectangle'],
    problems: [
      { name: 'Next Greater Element I', difficulty: 'Easy', leetcode: 'https://leetcode.com/problems/next-greater-element-i/' },
      { name: 'Daily Temperatures', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/daily-temperatures/' },
      { name: 'Largest Rectangle in Histogram', difficulty: 'Hard', leetcode: 'https://leetcode.com/problems/largest-rectangle-in-histogram/' },
      { name: 'Trapping Rain Water', difficulty: 'Hard', leetcode: 'https://leetcode.com/problems/trapping-rain-water/' },
      { name: 'Sum of Subarray Minimums', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/sum-of-subarray-minimums/' },
      { name: 'Online Stock Span', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/online-stock-span/' },
    ]
  },
  {
    id: 19,
    name: 'Union Find (DSU)',
    icon: '🧩',
    color: '#86efac',
    gradient: 'linear-gradient(135deg, #14532d, #86efac)',
    difficulty: 'Intermediate',
    description: 'Disjoint Set Union for grouping elements and efficiently checking connectivity between nodes.',
    useCases: ['Connected components', 'Redundant connections', 'Accounts merge'],
    problems: [
      { name: 'Number of Provinces', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/number-of-provinces/' },
      { name: 'Redundant Connection', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/redundant-connection/' },
      { name: 'Number of Operations to Make Network Connected', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/number-of-operations-to-make-network-connected/' },
      { name: 'Most Stones Removed with Same Row or Column', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/most-stones-removed-with-same-row-or-column/' },
      { name: 'Accounts Merge', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/accounts-merge/' },
      { name: 'Number of Islands II', difficulty: 'Hard', leetcode: 'https://leetcode.com/problems/number-of-islands-ii/' },
    ]
  },
  {
    id: 20,
    name: 'Tries',
    icon: '🌐',
    color: '#93c5fd',
    gradient: 'linear-gradient(135deg, #1e3a5f, #93c5fd)',
    difficulty: 'Advanced',
    description: 'Prefix tree data structure for efficient string storage and retrieval. O(L) insert/search where L = word length.',
    useCases: ['Autocomplete', 'Word search', 'Longest prefix'],
    problems: [
      { name: 'Implement Trie', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/implement-trie-prefix-tree/' },
      { name: 'Design Add and Search Words Data Structure', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/design-add-and-search-words-data-structure/' },
      { name: 'Extra Characters in a String', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/extra-characters-in-a-string/' },
      { name: 'Word Search II', difficulty: 'Hard', leetcode: 'https://leetcode.com/problems/word-search-ii/' },
      { name: 'Maximum XOR of Two Numbers in an Array', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/' },
    ]
  },
  {
    id: 21,
    name: 'Graph BFS & DFS',
    icon: '🗺️',
    color: '#f59e0b',
    gradient: 'linear-gradient(135deg, #92400e, #f59e0b)',
    difficulty: 'Intermediate',
    description: 'Explore graphs using BFS (queue, shortest path) or DFS (recursion/stack, connected components). The single most asked pattern in FAANG rounds.',
    useCases: ['Shortest path', 'Connected components', 'Island problems', 'Flood fill'],
    problems: [
      { name: 'Number of Islands', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/number-of-islands/' },
      { name: 'Clone Graph', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/clone-graph/' },
      { name: 'Max Area of Island', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/max-area-of-island/' },
      { name: 'Pacific Atlantic Water Flow', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/pacific-atlantic-water-flow/' },
      { name: 'Surrounded Regions', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/surrounded-regions/' },
      { name: 'Rotting Oranges', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/rotting-oranges/' },
      { name: 'Walls and Gates', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/walls-and-gates/' },
      { name: 'Course Schedule (Cycle Detection)', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/course-schedule/' },
      { name: 'Number of Connected Components in Undirected Graph', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/' },
      { name: 'Graph Valid Tree', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/graph-valid-tree/' },
      { name: 'Word Ladder (BFS Shortest Path)', difficulty: 'Hard', leetcode: 'https://leetcode.com/problems/word-ladder/' },
      { name: 'Shortest Path in Binary Matrix', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/shortest-path-in-binary-matrix/' },
      { name: 'Open the Lock', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/open-the-lock/' },
      { name: "Dijkstra's — Network Delay Time", difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/network-delay-time/' },
      { name: 'Cheapest Flights Within K Stops', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/cheapest-flights-within-k-stops/' },
    ]
  },
  {
    id: 22,
    name: 'Unbounded Knapsack (DP)',
    icon: '♾️',
    color: '#10b981',
    gradient: 'linear-gradient(135deg, #064e3b, #10b981)',
    difficulty: 'Advanced',
    description: 'Like 0/1 Knapsack but items can be used unlimited times. Builds on basic DP with a subtle state transition change.',
    useCases: ['Coin change', 'Rod cutting', 'Ribbon cutting', 'Max ribbon cut'],
    problems: [
      { name: 'Unbounded Knapsack', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/coin-change-ii/' },
      { name: 'Coin Change (Min Coins)', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/coin-change/' },
      { name: 'Coin Change II (Number of Ways)', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/coin-change-ii/' },
      { name: 'Minimum Cost for Cutting Ribbon', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/minimum-cost-to-cut-a-stick/' },
      { name: 'Rod Cutting Problem', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/minimum-cost-to-cut-a-stick/' },
      { name: 'Maximum Ribbon Cut', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/coin-change-ii/' },
      { name: 'Word Break', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/word-break/' },
      { name: 'Integer Break', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/integer-break/' },
      { name: 'Perfect Squares', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/perfect-squares/' },
    ]
  },
  {
    id: 23,
    name: 'DP — Longest Common Subsequence',
    icon: '🔀',
    color: '#6366f1',
    gradient: 'linear-gradient(135deg, #312e81, #6366f1)',
    difficulty: 'Advanced',
    description: 'Classic 2D DP for comparing two sequences. Build a table where each cell represents optimal solution for subproblems.',
    useCases: ['Edit distance', 'Diff tools', 'DNA sequencing', 'Shortest common supersequence'],
    problems: [
      { name: 'Longest Common Subsequence', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/longest-common-subsequence/' },
      { name: 'Longest Common Substring', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/maximum-length-of-repeated-subarray/' },
      { name: 'Minimum Deletions & Insertions to Transform a String', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/delete-operation-for-two-strings/' },
      { name: 'Edit Distance', difficulty: 'Hard', leetcode: 'https://leetcode.com/problems/edit-distance/' },
      { name: 'Strings Interleaving', difficulty: 'Hard', leetcode: 'https://leetcode.com/problems/interleaving-string/' },
      { name: 'Longest Increasing Subsequence', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/longest-increasing-subsequence/' },
      { name: 'Maximum Sum Increasing Subsequence', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/maximum-sum-increasing-subsequence/' },
      { name: 'Shortest Common Supersequence', difficulty: 'Hard', leetcode: 'https://leetcode.com/problems/shortest-common-supersequence/' },
      { name: 'Minimum Deletions to Make a Sequence Sorted', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/longest-increasing-subsequence/' },
    ]
  },
  {
    id: 24,
    name: 'DP — Palindromes',
    icon: '🪞',
    color: '#ec4899',
    gradient: 'linear-gradient(135deg, #831843, #ec4899)',
    difficulty: 'Advanced',
    description: 'Find palindromic substrings/subsequences using interval DP or expanding around centers.',
    useCases: ['Palindrome partitioning', 'Min cuts', 'Palindromic subsequence'],
    problems: [
      { name: 'Longest Palindromic Subsequence', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/longest-palindromic-subsequence/' },
      { name: 'Longest Palindromic Substring', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/longest-palindromic-substring/' },
      { name: 'Count of Palindromic Substrings', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/palindromic-substrings/' },
      { name: 'Minimum Deletions to Make Palindrome', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/minimum-number-of-moves-to-make-palindrome/' },
      { name: 'Palindrome Partitioning II (Min Cuts)', difficulty: 'Hard', leetcode: 'https://leetcode.com/problems/palindrome-partitioning-ii/' },
      { name: 'Palindrome Partitioning (All ways)', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/palindrome-partitioning/' },
      { name: 'Minimum Insertions to Make String Palindrome', difficulty: 'Hard', leetcode: 'https://leetcode.com/problems/minimum-insertion-steps-to-make-a-string-palindrome/' },
    ]
  },
  {
    id: 25,
    name: 'Greedy Algorithms',
    icon: '💰',
    color: '#84cc16',
    gradient: 'linear-gradient(135deg, #365314, #84cc16)',
    difficulty: 'Intermediate',
    description: 'Make the locally optimal choice at each step. No backtracking — trust that local greedy leads to global optimum.',
    useCases: ['Activity selection', 'Jump game', 'Gas station', 'Interval scheduling'],
    problems: [
      { name: 'Jump Game', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/jump-game/' },
      { name: 'Jump Game II (Min Jumps)', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/jump-game-ii/' },
      { name: 'Gas Station', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/gas-station/' },
      { name: 'Hand of Straights', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/hand-of-straights/' },
      { name: 'Merge Triplets to Form Target Triplet', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/merge-triplets-to-form-target-triplet/' },
      { name: 'Partition Labels', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/partition-labels/' },
      { name: 'Valid Parenthesis String', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/valid-parenthesis-string/' },
      { name: 'Minimum Number of Arrows to Burst Balloons', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/' },
      { name: 'Non-overlapping Intervals', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/non-overlapping-intervals/' },
      { name: 'Assign Cookies', difficulty: 'Easy', leetcode: 'https://leetcode.com/problems/assign-cookies/' },
      { name: 'Lemonade Change', difficulty: 'Easy', leetcode: 'https://leetcode.com/problems/lemonade-change/' },
      { name: 'Task Scheduler', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/task-scheduler/' },
    ]
  },
  {
    id: 26,
    name: 'Matrix / Grid Traversal',
    icon: '🔲',
    color: '#22d3ee',
    gradient: 'linear-gradient(135deg, #164e63, #22d3ee)',
    difficulty: 'Intermediate',
    description: 'Treat a 2D matrix as a graph and traverse it using BFS or DFS. Identify connected regions, find shortest paths, or simulate movement.',
    useCases: ['Flood fill', 'Shortest path in grid', 'Island counting', 'Matrix rotation'],
    problems: [
      { name: 'Flood Fill', difficulty: 'Easy', leetcode: 'https://leetcode.com/problems/flood-fill/' },
      { name: 'Number of Islands', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/number-of-islands/' },
      { name: 'Rotting Oranges', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/rotting-oranges/' },
      { name: 'Walls and Gates', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/walls-and-gates/' },
      { name: 'Spiral Matrix', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/spiral-matrix/' },
      { name: 'Rotate Image', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/rotate-image/' },
      { name: 'Set Matrix Zeroes', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/set-matrix-zeroes/' },
      { name: 'Word Search in Grid', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/word-search/' },
      { name: 'Unique Paths', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/unique-paths/' },
      { name: 'Minimum Path Sum', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/minimum-path-sum/' },
      { name: 'Dungeon Game', difficulty: 'Hard', leetcode: 'https://leetcode.com/problems/dungeon-game/' },
      { name: 'Maximal Square', difficulty: 'Medium', leetcode: 'https://leetcode.com/problems/maximal-square/' },
      { name: 'Maximal Rectangle', difficulty: 'Hard', leetcode: 'https://leetcode.com/problems/maximal-rectangle/' },
    ]
  },
];

const DIFF_COLOR = { Easy: '#4ade80', Medium: '#fbbf24', Hard: '#f87171' };
const DIFF_BG = { Easy: 'rgba(74, 222, 128, 0.15)', Medium: 'rgba(251, 191, 36, 0.15)', Hard: 'rgba(248, 113, 113, 0.15)' };

export default function Patterns() {
  const { appState, togglePatternProblem } = useApp();
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState('');
  const [filterDiff, setFilterDiff] = useState('All');

  // Total problems solved across ALL patterns
  const totalSolved = Object.values(appState.patternProgress || {})
    .reduce((sum, p) => sum + (p.done?.length || 0), 0);
  const totalProblems = PATTERNS.reduce((s, p) => s + p.problems.length, 0);

  const filtered = useMemo(() => {
    return PATTERNS.filter(p => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase());
      const matchDiff = filterDiff === 'All' || p.difficulty === filterDiff;
      return matchSearch && matchDiff;
    });
  }, [search, filterDiff]);

  const active = selected !== null ? PATTERNS.find(p => p.id === selected) : null;

  return (
    <div className="patterns-page">
      {/* Hero Header */}
      <div className="patterns-hero">
        <div className="patterns-hero-glow" />
        <div className="patterns-hero-content">
          <div className="patterns-hero-badge">
            <span>📖</span> Grokking the Coding Interview
          </div>
          <h1 className="patterns-hero-title">
            26 Coding <span className="patterns-gradient-text">Patterns</span>
          </h1>
          <p className="patterns-hero-sub">
            Master the algorithmic patterns behind every FAANG interview question. Identify the pattern → Apply the template → Solve any variation.
          </p>
          <div className="patterns-hero-stats">
            <div className="ph-stat"><span>{PATTERNS.length}</span> Patterns</div>
            <div className="ph-stat"><span>{totalProblems}</span> Problems</div>
            <div className="ph-stat"><span style={{ color: totalSolved > 0 ? '#4ade80' : undefined }}>{totalSolved}</span> Solved</div>
            <div className="ph-stat"><span>3</span> Difficulty Levels</div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="patterns-controls">
        <div className="patterns-search-wrap">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input
            className="patterns-search"
            placeholder="Search patterns..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="patterns-filter-group">
          {['All', 'Beginner', 'Intermediate', 'Advanced'].map(d => (
            <button
              key={d}
              className={`patterns-filter-btn ${filterDiff === d ? 'active' : ''}`}
              onClick={() => setFilterDiff(d)}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Main Layout: Grid + Detail Pane */}
      <div className="patterns-layout">
        {/* Pattern Cards Grid */}
        <div className="patterns-grid">
          {filtered.map(p => {
            const doneCnt = (appState.patternProgress?.[p.id]?.done || []).length;
            const pct = Math.round((doneCnt / p.problems.length) * 100);
            return (
            <div
              key={p.id}
              className={`pattern-card ${selected === p.id ? 'active' : ''}`}
              onClick={() => setSelected(selected === p.id ? null : p.id)}
              style={{ '--pattern-color': p.color, '--pattern-gradient': p.gradient }}
            >
              <div className="pattern-card-glow" />
              <div className="pattern-card-header">
                <div className="pattern-card-icon">{p.icon}</div>
                <div className="pattern-card-meta">
                  <span className={`pattern-diff-badge ${p.difficulty.toLowerCase()}`}>{p.difficulty}</span>
                  <span className="pattern-problem-count">{p.problems.length} problems</span>
                </div>
              </div>
              <div className="pattern-card-num">#{p.id.toString().padStart(2, '0')}</div>
              <h3 className="pattern-card-title">{p.name}</h3>
              <p className="pattern-card-desc">{p.description}</p>
              <div className="pattern-use-cases">
                {p.useCases.map((u, i) => (
                  <span key={i} className="pattern-use-tag">{u}</span>
                ))}
              </div>
              {/* Mini progress bar */}
              {doneCnt > 0 && (
                <div style={{ margin: '8px 0 4px', height: '3px', background: 'var(--border-glass)', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{ width: `${pct}%`, height: '100%', background: p.color, transition: 'width 0.3s' }} />
                </div>
              )}
              <div className="pattern-card-footer">
                <span className="pattern-view-btn">{selected === p.id ? 'Close ↑' : 'View Problems →'}</span>
                {doneCnt > 0 && (
                  <span style={{ fontSize: '0.7rem', color: '#4ade80', marginLeft: 'auto' }}>
                    ✓ {doneCnt}/{p.problems.length}
                  </span>
                )}
              </div>
            </div>
          );
          })}
          {filtered.length === 0 && (
            <div className="patterns-empty">
              <span>🔎</span>
              <p>No patterns match "{search}"</p>
            </div>
          )}
        </div>

        {/* Sticky Detail Pane */}
        {active && (
          <div className="patterns-detail-pane" style={{ '--pattern-color': active.color, '--pattern-gradient': active.gradient }}>
            <div className="detail-pane-header">
              <div className="detail-pane-icon">{active.icon}</div>
              <div>
                <span className="detail-pane-num">Pattern #{active.id}</span>
                <h2 className="detail-pane-title">{active.name}</h2>
              </div>
              <button className="detail-pane-close" onClick={() => setSelected(null)}>✕</button>
            </div>
            <p className="detail-pane-desc">{active.description}</p>

            <div className="detail-section-label">🎯 When to use</div>
            <div className="detail-use-cases">
              {active.useCases.map((u, i) => <span key={i} className="detail-use-tag">{u}</span>)}
            </div>

            <div className="detail-section-label" style={{ marginTop: '20px' }}>
              📋 Problem List ({active.problems.length})
              {(() => {
                const doneCnt = (appState.patternProgress?.[active.id]?.done || []).length;
                return doneCnt > 0
                  ? <span style={{ marginLeft: '8px', color: '#4ade80', fontSize: '0.75rem', fontWeight: 600 }}>✓ {doneCnt} done</span>
                  : null;
              })()}
            </div>
            <div className="detail-problem-list">
              {active.problems.map((prob, i) => {
                const isDone = (appState.patternProgress?.[active.id]?.done || []).includes(i);
                return (
                  <div key={i} className="detail-problem-item" style={{ opacity: isDone ? 0.75 : 1 }}>
                    {/* Checkbox — stops link navigation */}
                    <button
                      onClick={e => { e.stopPropagation(); togglePatternProblem(active.id, i); }}
                      style={{
                        width: '18px', height: '18px', borderRadius: '4px', border: `2px solid ${isDone ? '#4ade80' : 'var(--border-glass)'}`,
                        background: isDone ? '#4ade80' : 'transparent', cursor: 'pointer', flexShrink: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px',
                        color: '#000', transition: 'all 0.15s', padding: 0
                      }}
                      title={isDone ? 'Mark as unsolved' : 'Mark as solved'}
                    >
                      {isDone ? '✓' : ''}
                    </button>
                    <span className="detail-problem-num">{String(i + 1).padStart(2, '0')}</span>
                    <a
                      href={prob.leetcode}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="detail-problem-name"
                      style={{ textDecoration: isDone ? 'line-through' : 'none', flex: 1, color: 'inherit' }}
                    >
                      {prob.name}
                    </a>
                    <span
                      className="detail-problem-diff"
                      style={{ color: DIFF_COLOR[prob.difficulty], background: DIFF_BG[prob.difficulty] }}
                    >
                      {prob.difficulty}
                    </span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="detail-problem-arrow"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                  </div>
                );
              })}
            </div>


          </div>
        )}
      </div>
    </div>
  );
}
