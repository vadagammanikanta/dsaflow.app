// api/ai-chat.js — Groq-powered DSA AI Chat endpoint
// Requires GROQ_API_KEY environment variable set in Vercel

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Missing messages array in request body.' });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'GROQ_API_KEY environment variable is not configured.' });
  }

  // DSA-focused system prompt
  const systemPrompt = `You are dsa.flow AI — an elite DSA tutor built specifically for FAANG and product company placement preparation.

Your expertise covers:
- Data Structures: Arrays, Strings, Linked Lists, Stacks, Queues, Trees, Graphs, Heaps, Tries, Segment Trees
- Algorithms: Sorting, Searching, BFS/DFS, Dynamic Programming, Greedy, Backtracking, Divide & Conquer, Two Pointers, Sliding Window, Binary Search
- Patterns: 22 core coding patterns (Fast & Slow Pointers, Merge Intervals, Top K Elements, etc.)
- Complexity: Time and Space complexity analysis (Big O)
- Interview Prep: LeetCode, HackerRank, Codeforces, GFG problems

Rules:
1. Always explain the APPROACH and INTUITION before giving code
2. Always mention the Time and Space complexity of any solution
3. Prefer C++, Python, or Java code examples unless the user specifies otherwise
4. For DP problems, explain both memoization (top-down) and tabulation (bottom-up) approaches
5. If a user shares buggy code, identify the exact bug location and explain WHY it's wrong
6. Keep answers structured: Approach → Algorithm Steps → Code → Complexity
7. Be encouraging and supportive — students are preparing for high-stakes interviews
8. Never give just code without explanation — that defeats the purpose of learning`;

  try {
    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile', // Best free model on Groq for reasoning
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages
        ],
        temperature: 0.4,
        max_tokens: 2048,
        stream: false
      })
    });

    if (!groqRes.ok) {
      const errData = await groqRes.json();
      console.error('[ai-chat] Groq API error:', errData);
      return res.status(groqRes.status).json({
        error: errData?.error?.message || 'Groq API request failed.'
      });
    }

    const data = await groqRes.json();
    const reply = data.choices?.[0]?.message?.content || '';

    return res.status(200).json({
      reply,
      model: data.model,
      usage: data.usage
    });

  } catch (err) {
    console.error('[ai-chat] Fetch error:', err);
    return res.status(502).json({ error: `Failed to reach Groq API: ${err.message}` });
  }
}
