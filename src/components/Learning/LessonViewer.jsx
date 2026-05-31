import React, { useEffect, useRef, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { DSAQuizEngine } from '../../../modules/learning/gemini-code-1780222651558';
import { resourceLibrary } from './resource_library';
import VideoEmbed from './VideoEmbed';
import PlacementIntelligence from './PlacementIntelligence';




// Mappings of standard problems to files in vineethm1627/SDE_Sheet_Striver repository
const STRIVER_CPP_MAPPINGS = {
  // Day 1
  "input output": "Day-01_Arrays/DNF_sort.cpp",
  "missing and repeating": "Day-01_Arrays/missing_repeating.cpp",
  "find the repeating and missing number": "Day-01_Arrays/missing_repeating.cpp",
  "duplicate number": "Day-01_Arrays/duplicate_number.cpp",
  "find the duplicate number": "Day-01_Arrays/duplicate_number.cpp",
  "merge sorted arrays": "Day-01_Arrays/merge_sorted_arrays.cpp",
  "merge two sorted arrays without extra space": "Day-01_Arrays/merge_sorted_arrays.cpp",
  "kadane's algorithm": "Day-01_Arrays/kadanes_algorithm.cpp",
  "maximum subarray": "Day-01_Arrays/kadanes_algorithm.cpp",
  "merge intervals": "Day-01_Arrays/merge_intervals.cpp",
  "merge overlapping subintervals": "Day-01_Arrays/merge_intervals.cpp",
  "dnf sort": "Day-01_Arrays/DNF_sort.cpp",
  "sort colors": "Day-01_Arrays/DNF_sort.cpp",
  // Day 2
  "best time to buy and sell stock": "Day-02_Arrays/buy_sell_stock_once.cpp",
  "count inversions": "Day-02_Arrays/count_inversions.cpp",
  "merge sort": "Day-02_Arrays/merge_sort.cpp",
  "next permutation": "Day-02_Arrays/next_permutation.cpp",
  "pascal's triangle": "Day-02_Arrays/pascal_triangle.cpp",
  "rotate matrix": "Day-02_Arrays/rotate_matrix.cpp",
  "rotate image": "Day-02_Arrays/rotate_matrix.cpp",
  "set matrix zeroes": "Day-02_Arrays/set_matrix_zeros.cpp",
  "set matrix zeros": "Day-02_Arrays/set_matrix_zeros.cpp",
  // Day 3
  "pow(x, n)": "Day-03_Arrays_Maths/binary_expo.cpp",
  "binary exponentiation": "Day-03_Arrays_Maths/binary_expo.cpp",
  "unique paths": "Day-03_Arrays_Maths/grid_unique_paths.cpp",
  "grid unique paths": "Day-03_Arrays_Maths/grid_unique_paths.cpp",
  "majority element": "Day-03_Arrays_Maths/majority_element_N2.cpp",
  "majority element ii": "Day-03_Arrays_Maths/majority_element_N3.cpp",
  "majority element-ii": "Day-03_Arrays_Maths/majority_element_N3.cpp",
  "reverse pairs": "Day-03_Arrays_Maths/reverse_pairs.cpp",
  "search a 2d matrix": "Day-03_Arrays_Maths/search_2D_rowColSorted.cpp",
  "search 2d matrix": "Day-03_Arrays_Maths/search_2D_rowColSorted.cpp",
  // Day 4
  "4sum": "Day-04_Hashing/Four_sum.cpp",
  "4 sum": "Day-04_Hashing/Four_sum.cpp",
  "longest consecutive sequence": "Day-04_Hashing/LongestConsecutiveSequence.cpp",
  "two sum": "Day-04_Hashing/Two_sum.cpp",
  "longest substring without repeating characters": "Day-04_Hashing/repeated_chars.cpp",
  "largest subarray with 0 sum": "Day-04_Hashing/subarray_zero_sum.cpp",
  "largest subarray with sum 0": "Day-04_Hashing/subarray_zero_sum.cpp",
  "subarray with given xor": "Day-04_Hashing/subarrays_xor.cpp",
  "count subarrays with given xor k": "Day-04_Hashing/subarrays_xor.cpp",
  // Day 5
  "add two numbers": "Day-05_LinkedList/add_2_numbers.cpp",
  "delete node in a linked list": "Day-05_LinkedList/delete_without_head.cpp",
  "merge two sorted lists": "Day-05_LinkedList/merge_sorted_list.cpp",
  "middle of the linked list": "Day-05_LinkedList/middle_list.cpp",
  "remove nth node from end of list": "Day-05_LinkedList/remove_nth_node.cpp",
  "reverse linked list": "Day-05_LinkedList/reverse_list_iterative.cpp",
  // Day 6
  "linked list cycle ii": "Day-06_LinkedList/cycle_start.cpp",
  "linked list cycle": "Day-06_LinkedList/detect_cycle_list.cpp",
  "flattening a linked list": "Day-06_LinkedList/flattening_list.cpp",
  "intersection of two linked lists": "Day-06_LinkedList/intersection_Y.cpp",
  "palindrome linked list": "Day-06_LinkedList/palindrome_list.cpp",
  "reverse nodes in k-group": "Day-06_LinkedList/reverse_groups_k.cpp",
  "rotate list": "Day-06_LinkedList/rotate_list.cpp",
  // Day 7
  "3sum": "Day-07_Two_Pointers/Three_sum.cpp",
  "3 sum": "Day-07_Two_Pointers/Three_sum.cpp",
  "copy list with random pointer": "Day-07_Two_Pointers/clone_list.cpp",
  "max consecutive ones": "Day-07_Two_Pointers/max_consecutive_ones.cpp",
  "remove duplicates from sorted array": "Day-07_Two_Pointers/remove_duplicates_sorted.cpp",
  "trapping rain water": "Day-07_Two_Pointers/trapping_rainwater.cpp"
};

// Rules-based dynamic path resolver for TheAlgorithms repositories
export function getDynamicGitHubPath(lessonTitle, categoryName, language) {
  const title = lessonTitle.toLowerCase().trim();
  const cat = categoryName.toLowerCase().trim();
  
  const snakeCase = (str) => str.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase().replace(/_+/g, '_').replace(/(^_|_$)/g, '');
  const pascalCase = (str) => str.replace(/[^a-zA-Z0-9]/g, ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
  
  const sc = snakeCase(title);
  const pc = pascalCase(title);

  // Special case: C++ files are pulled from vineethm1627/SDE_Sheet_Striver
  if (language === 'cpp' || language === 'cplusplus') {
    // 1. Direct match
    if (STRIVER_CPP_MAPPINGS[title]) {
      return STRIVER_CPP_MAPPINGS[title];
    }
    // 2. Substring match
    const matchKey = Object.keys(STRIVER_CPP_MAPPINGS).find(k => title.includes(k) || k.includes(title));
    if (matchKey) {
      return STRIVER_CPP_MAPPINGS[matchKey];
    }
    // 3. Category Fallbacks
    if (cat.includes('array')) return `Day-01_Arrays/${sc}.cpp`;
    if (cat.includes('linked list') || title.includes('linked list')) return `Day-05_LinkedList/${sc}.cpp`;
    if (cat.includes('stack') || cat.includes('queue')) return `Day-13_Stacks_Queues/${sc}.cpp`;
    if (cat.includes('tree') || cat.includes('bst')) return `Day-17_Binary_Tree/${sc}.cpp`;
    if (cat.includes('graph')) return `Day-23_Graph/${sc}.cpp`;
    if (cat.includes('greedy')) return `Day-08_Greedy/${sc}.cpp`;
    if (cat.includes('recursion')) return `Day-09_Recursion/${sc}.cpp`;
    if (cat.includes('backtracking')) return `Day-10_Backtracking/${sc}.cpp`;
    if (cat.includes('binary search')) return `Day-11_Binary_Search/${sc}.cpp`;
    if (cat.includes('bit manipulation')) return `Day-12_Bit_Manipulation/${sc}.cpp`;
    if (cat.includes('dynamic programming')) return `Day-25_Dynamic_Programming/${sc}.cpp`;
    
    return `Day-01_Arrays/${sc}.cpp`;
  }

  // 1. Sorting Algorithms (Other languages)
  if (cat.includes('sort') || title.includes('sort')) {
    let base = sc.replace('_sorting', '').replace('_sort', '');
    if (base === 'insertion') base = 'insertion_sort';
    else if (base === 'selection') base = 'selection_sort';
    else if (base === 'bubble') base = 'bubble_sort';
    else if (base === 'merge') base = 'merge_sort';
    else if (base === 'quick') base = 'quick_sort';
    else if (base === 'heap') base = 'heap_sort';
    else base = base + '_sort';

    const pBase = pascalCase(base.replace(/_/g, ' '));
    switch (language) {
      case 'python': return `sorts/${base}.py`;
      case 'java': return `src/main/java/com/thealgorithms/sorts/${pBase}.java`;
      case 'cpp': return `sorts/${base}.cpp`;
      case 'javascript': return `Sorts/${pBase}.js`;
    }
  }

  // 2. Searching & Binary Search
  if (cat.includes('search') || title.includes('search') || title.includes('binary search')) {
    let base = sc.replace('_searching', '').replace('_search', '');
    if (base === 'binary') base = 'binary_search';
    else if (base === 'linear') base = 'linear_search';
    else base = base + '_search';

    const pBase = pascalCase(base.replace(/_/g, ' '));
    switch (language) {
      case 'python': return `searches/${base}.py`;
      case 'java': return `src/main/java/com/thealgorithms/searches/${pBase}.java`;
      case 'cpp': return `search/${base}.cpp`;
      case 'javascript': return `Search/${pBase}.js`;
    }
  }

  // 3. Basic Maths & Numbers
  if (title.includes('prime') || title.includes('factorial') || title.includes('fibonacci') || title.includes('palindrome') || title.includes('armstrong') || title.includes('gcd') || title.includes('divisor') || title.includes('digit') || title.includes('math')) {
    let base = sc;
    if (title.includes('prime')) base = 'prime_check';
    else if (title.includes('factorial')) base = 'factorial';
    else if (title.includes('fibonacci')) base = 'fibonacci';
    else if (title.includes('palindrome')) base = 'palindrome';
    else if (title.includes('armstrong')) base = 'armstrong_numbers';
    else if (title.includes('gcd')) base = 'greatest_common_divisor';
    else if (title.includes('divisor')) base = 'divisors';
    else if (title.includes('digit')) base = 'count_digits';

    const pBase = pascalCase(base.replace(/_/g, ' '));
    switch (language) {
      case 'python': return `maths/${base}.py`;
      case 'java': return `src/main/java/com/thealgorithms/maths/${pBase}.java`;
      case 'cpp': return `maths/${base}.cpp`;
      case 'javascript': return `Maths/${pBase}.js`;
    }
  }

  // 4. Linked Lists
  if (cat.includes('linked list') || title.includes('linked list') || title.includes('node') || title.includes('middle of')) {
    switch (language) {
      case 'python': return `data_structures/linked_list/singly_linked_list.py`;
      case 'java': return `src/main/java/com/thealgorithms/datastructures/lists/SinglyLinkedList.java`;
      case 'cpp': return `data_structures/singly_linked_list.cpp`;
      case 'javascript': return `Data-Structures/Lists/SinglyLinkedList.js`;
    }
  }

  // 5. Trees & BST
  if (cat.includes('tree') || cat.includes('bst') || title.includes('tree') || title.includes('bst') || title.includes('inorder') || title.includes('preorder') || title.includes('postorder')) {
    let base = sc;
    if (title.includes('traversal')) base = 'binary_tree_traversals';
    const pBase = pascalCase(base.replace(/_/g, ' '));
    switch (language) {
      case 'python': return `data_structures/binary_tree/${base}.py`;
      case 'java': return `src/main/java/com/thealgorithms/datastructures/trees/${pBase}.java`;
      case 'cpp': return `data_structures/binary_search_tree.cpp`;
      case 'javascript': return `Data-Structures/Trees/${pBase}.js`;
    }
  }

  // 6. Graphs
  if (cat.includes('graph') || title.includes('graph') || title.includes('dijkstra') || title.includes('kruskal') || title.includes('prim') || title.includes('bfs') || title.includes('dfs')) {
    let base = sc;
    if (title.includes('dijkstra')) base = 'dijkstra';
    else if (title.includes('kruskal')) base = 'kruskal';
    else if (title.includes('prim')) base = 'prim';
    else if (title.includes('bfs')) base = 'bfs';
    else if (title.includes('dfs')) base = 'dfs';

    const pBase = pascalCase(base.replace(/_/g, ' '));
    switch (language) {
      case 'python': return `graphs/${base}.py`;
      case 'java': return `src/main/java/com/thealgorithms/graphs/${pBase}.java`;
      case 'cpp': return `graphs/${base}.cpp`;
      case 'javascript': return `Graphs/${pBase}.js`;
    }
  }

  // 7. Dynamic Programming & Backtracking
  if (cat.includes('dynamic programming') || cat.includes('dp') || title.includes('knapsack') || title.includes('coin change') || title.includes('lcs') || title.includes('subset sum') || title.includes('n-queens')) {
    let base = sc;
    if (title.includes('knapsack')) base = 'knapsack';
    else if (title.includes('coin change')) base = 'coin_change';
    else if (title.includes('n-queens')) base = 'n_queens';
    
    const pBase = pascalCase(base.replace(/_/g, ' '));
    switch (language) {
      case 'python': return `dynamic_programming/${base}.py`;
      case 'java': return `src/main/java/com/thealgorithms/dynamicprogramming/${pBase}.java`;
      case 'cpp': return `dynamic_programming/${base}.cpp`;
      case 'javascript': return `Dynamic-Programming/${pBase}.js`;
    }
  }

  // 8. Stacks & Queues
  if (cat.includes('stack') || cat.includes('queue') || title.includes('stack') || title.includes('queue')) {
    switch (language) {
      case 'python': return `data_structures/stacks/stack.py`;
      case 'java': return `src/main/java/com/thealgorithms/datastructures/stacks/Stack.java`;
      case 'cpp': return `data_structures/stack.cpp`;
      case 'javascript': return `Data-Structures/Stack/Stack.js`;
    }
  }

  // Default fallback prediction
  switch (language) {
    case 'python': return `maths/${sc}.py`;
    case 'java': return `src/main/java/com/thealgorithms/maths/${pc}.java`;
    case 'cpp': return `maths/${sc}.cpp`;
    case 'javascript': return `Maths/${pc}.js`;
  }
}

function InteractiveQuiz({ lesson }) {
  const { appState, markLessonCompleted } = useApp();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [answersHistory, setAnswersHistory] = useState([]);
  const [hoveredOpt, setHoveredOpt] = useState(null);
  const [results, setResults] = useState(null);

  const engine = useMemo(() => {
    return new DSAQuizEngine(lesson, (res) => {
      setResults(res);
    });
  }, [lesson]);

  const handleOptionClick = (optIdx) => {
    if (answered) return;
    const ansResult = engine.submitAnswer(optIdx);
    if (!ansResult) return;

    setAnswered(true);
    setSelectedOpt(optIdx);
    setScore(engine.score);

    const isCorrect = ansResult.isCorrect;
    const correctIdx = ansResult.correctIndex;
    
    setAnswersHistory(prev => [...prev, {
      questionIdx: currentIdx,
      selected: optIdx,
      correct: correctIdx,
      isCorrect
    }]);
  };

  const handleNext = () => {
    const hasNext = engine.next();
    if (hasNext) {
      setCurrentIdx(engine.currentIndex);
      setAnswered(false);
      setSelectedOpt(null);
      setHoveredOpt(null);
    } else {
      setQuizCompleted(true);
      markLessonCompleted(lesson.id);
    }
  };

  const handleRestart = () => {
    engine.reset();
    setCurrentIdx(0);
    setSelectedOpt(null);
    setAnswered(false);
    setScore(0);
    setQuizCompleted(false);
    setAnswersHistory([]);
    setHoveredOpt(null);
    setResults(null);
  };

  const currentQuestion = lesson.questions[currentIdx];
  const progressPercent = ((currentIdx) / lesson.questions.length) * 100;
  const scorePercent = (score / lesson.questions.length) * 100;

  if (quizCompleted) {
    return (
      <div className="card quiz-card-results" style={{ padding: '40px', maxWidth: '700px', margin: '0 auto', background: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border-glass)', textAlign: 'center' }}>
        <div style={{ fontSize: '4.5rem', marginBottom: '24px' }}>
          {scorePercent === 100 ? '🏆' : scorePercent >= 60 ? '🌟' : '📚'}
        </div>
        <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '8px' }}>
          Quiz Completed!
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '16px' }}>
          You scored <strong style={{ color: scorePercent >= 60 ? 'var(--accent-emerald)' : 'var(--accent-rose)', fontSize: '1.6rem' }}>{score}</strong> out of {lesson.questions.length}
        </p>
        {results?.feedback && (
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', marginBottom: '24px', fontWeight: '500', fontStyle: 'italic' }}>
            {results.feedback}
          </p>
        )}

        <div style={{ 
          background: 'rgba(255, 255, 255, 0.02)', 
          border: '1px solid var(--border-glass)', 
          borderRadius: '8px', 
          padding: '20px', 
          marginBottom: '32px',
          textAlign: 'left'
        }}>
          <h3 style={{ fontSize: '1rem', marginTop: 0, marginBottom: '16px', color: 'var(--text-primary)' }}>Performance Review:</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {lesson.questions.map((q, idx) => {
              const history = answersHistory.find(h => h.questionIdx === idx);
              const gotRight = history ? history.isCorrect : false;
              return (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.92rem' }}>
                  <span style={{ color: gotRight ? 'var(--accent-emerald)' : 'var(--accent-rose)', fontSize: '1.1rem', lineHeight: '1' }}>
                    {gotRight ? '✅' : '❌'}
                  </span>
                  <div>
                    <div style={{ color: 'var(--text-secondary)', fontWeight: '600' }}>Question {idx + 1}: {q.question}</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                      Correct answer: <span style={{ color: 'var(--accent-emerald)' }}>{q.options[q.answer]}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <button className="btn btn-secondary" onClick={handleRestart} style={{ padding: '10px 24px', fontWeight: 'bold' }}>
            🔄 Retake Quiz
          </button>
          <button className="btn btn-accent" onClick={() => window.location.reload()} style={{ padding: '10px 24px', fontWeight: 'bold' }}>
            🚀 Complete Phase
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="card quiz-card-active" style={{ padding: '36px', maxWidth: '700px', margin: '0 auto', background: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border-glass)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '1.8rem' }}>{lesson.icon}</span>
          <span style={{ color: 'var(--text-primary)', fontWeight: 'bold', fontSize: '1.1rem' }}>{lesson.title}</span>
        </div>
        <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: '600' }}>
          Question {currentIdx + 1} of {lesson.questions.length}
        </span>
      </div>

      <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.03)', borderRadius: '3px', marginBottom: '28px', overflow: 'hidden' }}>
        <div style={{ width: `${progressPercent}%`, height: '100%', background: 'var(--accent-rose)', transition: 'width 0.3s ease' }}></div>
      </div>

      <h2 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '24px', lineHeight: '1.4' }}>
        {currentQuestion.question}
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
        {currentQuestion.options.map((opt, idx) => {
          const isCorrect = idx === currentQuestion.answer;
          const isSelected = selectedOpt === idx;
          const isHovered = hoveredOpt === idx;
          let borderStyle = isHovered && !answered ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid var(--border-glass)';
          let bgStyle = isHovered && !answered ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.02)';
          let colorStyle = 'var(--text-secondary)';
          let prefixIcon = String.fromCharCode(65 + idx);

          if (answered) {
            if (isCorrect) {
              borderStyle = '1px solid var(--accent-emerald)';
              bgStyle = 'rgba(52, 211, 153, 0.06)';
              colorStyle = 'var(--accent-emerald)';
              prefixIcon = '✅';
            } else if (isSelected) {
              borderStyle = '1px solid var(--accent-rose)';
              bgStyle = 'rgba(244, 63, 94, 0.06)';
              colorStyle = 'var(--accent-rose)';
              prefixIcon = '❌';
            } else {
              bgStyle = 'rgba(255, 255, 255, 0.01)';
              colorStyle = 'rgba(255, 255, 255, 0.2)';
            }
          }

          return (
            <div
              key={idx}
              onClick={() => handleOptionClick(idx)}
              onMouseEnter={() => !answered && setHoveredOpt(idx)}
              onMouseLeave={() => !answered && setHoveredOpt(null)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '14px 18px',
                borderRadius: '8px',
                border: borderStyle,
                background: bgStyle,
                color: colorStyle,
                cursor: answered ? 'default' : 'pointer',
                transition: 'all 0.2s ease',
                fontWeight: isSelected || (answered && isCorrect) ? 'bold' : 'normal'
              }}
            >
              <span style={{ 
                width: '24px', 
                height: '24px', 
                borderRadius: '50%', 
                background: isSelected || (answered && isCorrect) ? 'transparent' : 'rgba(255,255,255,0.05)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                fontSize: '0.85rem',
                fontWeight: 'bold',
                flexShrink: 0
              }}>
                {prefixIcon}
              </span>
              <span style={{ fontSize: '0.95rem' }}>{opt}</span>
            </div>
          );
        })}
      </div>

      {answered && (
        <div style={{ 
          background: 'rgba(244, 63, 94, 0.03)', 
          border: '1px solid rgba(244, 63, 94, 0.1)', 
          borderRadius: '8px', 
          padding: '16px 20px', 
          marginBottom: '24px', 
          color: 'var(--text-secondary)', 
          fontSize: '0.9rem',
          lineHeight: '1.5'
        }}>
          <strong>Explanation:</strong> {currentQuestion.explanation}
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button
          className="btn btn-primary"
          disabled={!answered}
          onClick={handleNext}
          style={{ padding: '10px 24px', fontWeight: 'bold' }}
        >
          {currentIdx < lesson.questions.length - 1 ? 'Next Question ➡' : 'Finish Quiz 🏆'}
        </button>
      </div>
    </div>
  );
}

export default function LessonViewer({ lesson }) {
  const { appState, markLessonCompleted } = useApp();
  const navigate = useNavigate();
  const contentRef = useRef(null);



  // Dynamically parse Time and Space complexity from the HTML curriculum details
  const complexities = useMemo(() => {
    if (!lesson || !lesson.details) return { time: null, space: null };
    
    let time = null;
    let space = null;

    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(lesson.details, 'text/html');
      
      const rows = doc.querySelectorAll('tr');
      rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        if (cells.length >= 2) {
          const label = cells[0].textContent.trim().toLowerCase();
          const value = cells[1].textContent.trim();
          if (label.includes('time complexity')) {
            time = value;
          } else if (label.includes('space complexity')) {
            space = value;
          }
        }
      });
    } catch (e) {
      console.warn("DOMParser failed, falling back to regex: ", e);
    }
    
    // Fallback regex in case DOMParser isn't available or fails
    if (!time) {
      const timeRegex = /<td>Time\s+Complexity<\/td>\s*<td>\s*<span[^>]*>([\s\S]*?)<\/span>\s*<\/td>/i;
      const timeMatch = lesson.details.match(timeRegex);
      time = timeMatch ? timeMatch[1].replace(/<[^>]*>/g, '').trim() : null;
    }
    if (!space) {
      const spaceRegex = /<td>Space\s+Complexity<\/td>\s*<td>\s*<span[^>]*>([\s\S]*?)<\/span>\s*<\/td>/i;
      const spaceMatch = lesson.details.match(spaceRegex);
      space = spaceMatch ? spaceMatch[1].replace(/<[^>]*>/g, '').trim() : null;
    }
    
    return { time, space };
  }, [lesson]);

  const resources = useMemo(() => {
    return lesson ? resourceLibrary[lesson.id] : null;
  }, [lesson]);

  const [activeInlineLang, setActiveInlineLang] = useState('javascript');


  useEffect(() => {
    // Also sync inline code language
    if (lesson?.code) {
      const inlineLangs = Object.keys(lesson.code);
      if (inlineLangs.includes(appState.selectedLanguage)) {
        setActiveInlineLang(appState.selectedLanguage);
      } else if (inlineLangs.length > 0) {
        setActiveInlineLang(inlineLangs[0]);
      }
    }
  }, [lesson, appState.selectedLanguage]);

  const getLanguageExtension = (lang) => {
    switch(lang) {
      case 'javascript': return 'js';
      case 'python': return 'py';
      case 'java': return 'java';
      case 'cpp': return 'cpp';
      case 'c': return 'c';
      case 'csharp': return 'cs';
      case 'go': return 'go';
      case 'rust': return 'rs';
      case 'ruby': return 'rb';
      case 'php': return 'php';
      case 'swift': return 'swift';
      case 'kotlin': return 'kt';
      default: return 'txt';
    }
  };

  const leetcodeUrl = useMemo(() => {
    if (!lesson || !lesson.details) return null;
    const match = lesson.details.match(/href="([^"]*leetcode\.com[^"]*)"/);
    return (match && !match[1].includes('$undefined')) ? match[1] : null;
  }, [lesson]);

  const handleSolveWithCompiler = () => {
    const ext = getLanguageExtension(appState.selectedLanguage);
    const filename = `${lesson.title.replace(/[^a-zA-Z0-9]/g, '_')}.${ext}`;
    
    // Create or find file in VFS
    const saved = localStorage.getItem('dsaflow_vfs');
    let vfs = saved ? JSON.parse(saved) : [
      { id: 'root', type: 'folder', name: 'root', parentId: null }
    ];
    
    let file = vfs.find(n => n.name === filename && n.type === 'file');
    const initialCode = lesson.code ? (lesson.code[appState.selectedLanguage] || '') : '';
    
    if (!file) {
      const id = Date.now().toString() + Math.floor(Math.random() * 1000);
      file = {
        id,
        type: 'file',
        name: filename,
        parentId: 'root',
        content: initialCode
      };
      vfs.push(file);
      localStorage.setItem('dsaflow_vfs', JSON.stringify(vfs));
    } else if (initialCode && file.content.trim() === '') {
      file.content = initialCode;
      localStorage.setItem('dsaflow_vfs', JSON.stringify(vfs));
    }

    // Mark as completed when they start solving
    markLessonCompleted(lesson.id);

    // Notify the IDE to open this file
    window.dispatchEvent(new CustomEvent('ide_open_file', { detail: { id: file.id } }));
    
    // Navigate to IDE
    navigate('/ide');
  };

  useEffect(() => {
    // Process markdown or HTML in lesson.details
    if (contentRef.current && lesson.details) {
      // Strip any inline LeetCode button div so we render it dynamically in React
      const cleanDetails = lesson.details.replace(/<div style="display:flex; gap:12px; margin-top:16px;">[\s\S]*?<\/div>/g, '');
      contentRef.current.innerHTML = cleanDetails;
    } else if (contentRef.current) {
      contentRef.current.innerHTML = `<p>${lesson.summary || ''}</p>`;
    }
  }, [lesson]);

  if (lesson && lesson.type === 'quiz') {
    return <InteractiveQuiz lesson={lesson} />;
  }

  return (
    <div className="card" style={{ padding: '30px', maxWidth: '800px', margin: '0 auto', background: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border-glass)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
        <div style={{ fontSize: '2.5rem' }}>{lesson.icon}</div>
        <div>
          <h1 style={{ fontSize: '1.8rem', color: 'var(--text-primary)', margin: '0 0 8px 0' }}>
            {lesson.title}
          </h1>
          <div style={{ display: 'flex', gap: '12px', fontSize: '0.9rem', flexWrap: 'wrap', rowGap: '6px' }}>
            <span style={{ 
              color: lesson.difficulty === 'Easy' ? 'var(--diff-easy)' : 
                     lesson.difficulty === 'Medium' ? 'var(--diff-medium)' : 'var(--diff-hard)',
              background: 'rgba(255,255,255,0.05)',
              padding: '2px 8px',
              borderRadius: '4px'
            }}>
              {lesson.difficulty}
            </span>
            <span style={{ color: 'var(--text-muted)' }}>{lesson.category}</span>
            {complexities.time && (
              <span style={{ 
                color: '#34d399',
                background: 'rgba(52, 211, 153, 0.08)',
                border: '1px solid rgba(52, 211, 153, 0.15)',
                padding: '2px 8px',
                borderRadius: '4px',
                fontFamily: 'monospace',
                fontWeight: '600'
              }}>
                ⏱️ Time: {complexities.time}
              </span>
            )}
            {complexities.space && (
              <span style={{ 
                color: '#fbbf24',
                background: 'rgba(251, 191, 36, 0.08)',
                border: '1px solid rgba(251, 191, 36, 0.15)',
                padding: '2px 8px',
                borderRadius: '4px',
                fontFamily: 'monospace',
                fontWeight: '600'
              }}>
                💾 Space: {complexities.space}
              </span>
            )}
          </div>
        </div>
      </div>

      <div style={{ padding: '20px 0', borderTop: '1px solid var(--border-glass)', borderBottom: '1px solid var(--border-glass)', marginBottom: '24px' }}>
        <div 
          ref={contentRef}
          className="lesson-markdown-content" 
          style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }} 
        />
      </div>

      {/* Inline Code Examples Section — shown when lesson has embedded code */}
      {lesson.code && Object.keys(lesson.code).length > 0 && (
        <div style={{ marginBottom: '24px', paddingBottom: '24px', borderBottom: '1px solid var(--border-glass)' }}>
          <h3 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>💻</span> Code Examples
          </h3>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '14px', flexWrap: 'wrap' }}>
            {Object.keys(lesson.code).map((lang) => (
              <button
                key={lang}
                onClick={() => setActiveInlineLang(lang)}
                className={`btn ${activeInlineLang === lang ? 'btn-accent' : 'btn-secondary'}`}
                style={{
                  padding: '6px 12px',
                  fontSize: '0.85rem',
                  borderRadius: '6px',
                  textTransform: 'capitalize',
                  fontWeight: activeInlineLang === lang ? 'bold' : 'normal'
                }}
              >
                {lang === 'cpp' ? 'C++' : lang === 'javascript' ? 'JavaScript' : lang.charAt(0).toUpperCase() + lang.slice(1)}
              </button>
            ))}
          </div>
          {lesson.code[activeInlineLang] && (
            <div 
              style={{
                borderRadius: '10px',
                overflow: 'hidden',
                border: '1px solid var(--border-glass)',
                background: 'var(--code-bg, #0f172a)'
              }}
            >
              <div 
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  padding: '8px 16px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderBottom: '1px solid var(--border-glass)'
                }}
              >
                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontFamily: 'var(--font-code)', textTransform: 'uppercase' }}>
                  {activeInlineLang === 'cpp' ? 'C++' : activeInlineLang === 'javascript' ? 'JavaScript' : activeInlineLang}
                </span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(lesson.code[activeInlineLang]);
                    alert('Code copied to clipboard! 📋');
                  }}
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid var(--border-glass)',
                    borderRadius: '4px',
                    color: 'var(--text-secondary)',
                    padding: '4px 8px',
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                    transition: 'background 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'}
                >
                  Copy Code
                </button>
              </div>
              <SyntaxHighlighter 
                language={activeInlineLang?.toLowerCase() === 'cpp' ? 'cpp' : activeInlineLang?.toLowerCase() === 'java' ? 'java' : activeInlineLang?.toLowerCase() === 'javascript' ? 'javascript' : 'python'} 
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  padding: '16px',
                  fontSize: '0.88rem',
                  lineHeight: '1.6',
                  background: 'transparent'
                }}
              >
                {lesson.code[activeInlineLang]}
              </SyntaxHighlighter>
            </div>
          )}
        </div>
      )}



      {/* Reference & Video Tutorials Section */}
      <div style={{ 
        paddingTop: '20px', 
        borderBottom: '1px solid var(--border-glass)', 
        marginBottom: '24px',
        paddingBottom: '20px'
      }}>
        <h3 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>📚</span> Video & Reference Tutorials
        </h3>

        {resources ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <VideoEmbed 
              youtubeId={resources.youtubeId} 
              title={`${lesson.title} by ${resources.creator}`} 
              creator={resources.creator} 
            />
            
            <div style={{
              padding: '16px 20px',
              background: 'var(--bg-secondary)',
              borderRadius: '12px',
              border: '1px solid var(--border-glass)',
              boxShadow: 'var(--shadow-neon)',
              transition: 'var(--transition)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              <h4 style={{
                margin: 0,
                fontSize: '0.95rem',
                fontWeight: '700',
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                borderBottom: '1px solid var(--border-glass)',
                paddingBottom: '10px'
              }}>
                <span>📖</span> Recommended Reading & Practice
              </h4>
              
              {/* Primary Link */}
              {resources.primaryLink && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700', letterSpacing: '0.05em' }}>Primary Reference</span>
                  <a 
                    href={resources.primaryLink.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      color: 'var(--accent-cyan)',
                      textDecoration: 'none',
                      fontWeight: '600',
                      fontSize: '0.9rem',
                      transition: 'var(--transition)',
                      alignSelf: 'flex-start'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--text-primary)';
                      e.currentTarget.style.textDecoration = 'underline';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--accent-cyan)';
                      e.currentTarget.style.textDecoration = 'none';
                    }}
                  >
                    {resources.primaryLink.title} ↗
                  </a>
                </div>
              )}

              {/* Additional Resources */}
              {resources.additionalResources && resources.additionalResources.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '4px' }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700', letterSpacing: '0.05em' }}>Additional Learning</span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {resources.additionalResources.map((res, i) => (
                      <a 
                        key={i}
                        href={res.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          color: 'var(--text-secondary)',
                          textDecoration: 'none',
                          fontSize: '0.88rem',
                          transition: 'var(--transition)',
                          alignSelf: 'flex-start'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = 'var(--accent-cyan)';
                          e.currentTarget.style.textDecoration = 'underline';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = 'var(--text-secondary)';
                          e.currentTarget.style.textDecoration = 'none';
                        }}
                      >
                        🔗 {res.title} ↗
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
            <a
              href={`https://www.youtube.com/results?search_query=Bro+Code+${encodeURIComponent(lesson.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                background: 'rgba(255, 0, 0, 0.05)',
                border: '1px solid rgba(255, 0, 0, 0.15)',
                color: '#ff4d4d',
                padding: '10px 16px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '0.9rem',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 0, 0, 0.12)';
                e.currentTarget.style.borderColor = 'rgba(255, 0, 0, 0.4)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 0, 0, 0.05)';
                e.currentTarget.style.borderColor = 'rgba(255, 0, 0, 0.15)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
                <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.508 9.388.508 9.388.508s7.518 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              Bro Code YouTube
            </a>

            <a
              href={lesson.youtube || `https://www.youtube.com/results?search_query=Striver+${encodeURIComponent(lesson.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                background: 'rgba(255, 69, 0, 0.05)',
                border: '1px solid rgba(255, 69, 0, 0.15)',
                color: '#ff6b35',
                padding: '10px 16px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '0.9rem',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 69, 0, 0.12)';
                e.currentTarget.style.borderColor = 'rgba(255, 69, 0, 0.4)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 69, 0, 0.05)';
                e.currentTarget.style.borderColor = 'rgba(255, 69, 0, 0.15)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
                <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.508 9.388.508 9.388.508s7.518 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              {lesson.youtube ? "Watch Striver's Video 🚀" : "Striver YouTube"}
            </a>

            <a
              href={`https://www.geeksforgeeks.org/search/?q=${encodeURIComponent(lesson.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                background: 'rgba(47, 133, 90, 0.06)',
                border: '1px solid rgba(47, 133, 90, 0.15)',
                color: '#34a853',
                padding: '10px 16px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '0.9rem',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(47, 133, 90, 0.12)';
                e.currentTarget.style.borderColor = 'rgba(47, 133, 90, 0.4)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(47, 133, 90, 0.06)';
                e.currentTarget.style.borderColor = 'rgba(47, 133, 90, 0.15)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2 2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
              Search on GFG
            </a>
          </div>
        )}
      </div>

      {resources?.placementRelevance && (
        <div style={{ marginBottom: '24px' }}>
          <PlacementIntelligence relevanceData={resources.placementRelevance} />
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>

        <button 
          onClick={() => markLessonCompleted(lesson.id)}
          className={`btn ${appState.completedLessons.includes(lesson.id) ? 'btn-secondary' : 'btn-accent'}`}
          style={{
            color: appState.completedLessons.includes(lesson.id) ? 'var(--accent-emerald)' : 'var(--text-primary)',
            fontWeight: '600'
          }}
        >
          {appState.completedLessons.includes(lesson.id) ? '✅ Completed' : '🎯 Mark as Complete'}
        </button>

        <div style={{ display: 'flex', gap: '10px' }}>
          {leetcodeUrl && (
            <a 
              href={leetcodeUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-secondary"
              style={{
                background: 'rgba(255, 234, 0, 0.08)',
                borderColor: 'rgba(255, 234, 0, 0.25)',
                color: 'var(--accent-amber)',
                fontWeight: 'bold',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              Solve on LeetCode 🚀
            </a>
          )}
          <button 
            onClick={handleSolveWithCompiler}
            className="btn btn-primary"
            style={{
              fontWeight: 'bold',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            Solve with Compiler 🚀
          </button>
        </div>
      </div>
    </div>
  );
}
