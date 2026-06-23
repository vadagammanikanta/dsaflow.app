// api/ai-chat.js — Groq-powered DSA AI Chat & Complexity Analyzer endpoint
// Requires GROQ_API_KEY environment variable.
// Dynamically routes using the user-provided custom Groq API key if sent in the body.

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { messages, code, language, customApiKey, systemOverride } = req.body;

  let activeMessages = messages;
  let temperature = 0.4;
  let isComplexityAnalysis = false;

  if (code) {
    isComplexityAnalysis = true;
    temperature = 0.1; // Low temperature for deterministic JSON complexity reports
    
    const complexitySystemPrompt = `You are a strict, elite algorithm complexity analysis system.
Analyze the provided code and return a JSON object with details of its Time and Space complexity.
Analyze loops, nested loops, recursion depth, auxiliary space, storage structures, and language-specific overhead.
Return a clean, valid JSON block.
Do NOT wrap the JSON block in any other text, markdown blocks, or explanation. Only return the raw JSON text.

The JSON schema must exactly be:
{
  "timeComplexity": "O(N)", // Must be one of: O(1), O(log N), O(N), O(N log N), O(N^2), O(2^N), O(N!)
  "spaceComplexity": "O(1)", // Must be one of: O(1), O(log N), O(N), O(N^2), etc.
  "explanation": "A concise paragraph explaining the overall complexities and reasons.",
  "steps": [
    "First step of explanation",
    "Second step..."
  ],
  "isOptimized": true,
  "optimizedSuggestion": "If isOptimized is false, provide a quick design tip on how to optimize it. Otherwise empty string."
}`;

    const userPrompt = `Language: ${language || 'unknown'}
Code to analyze:
\`\`\`
${code}
\`\`\``;

    activeMessages = [
      { role: 'system', content: complexitySystemPrompt },
      { role: 'user', content: userPrompt }
    ];
  } else {
    // Regular AI Chat Mode
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Missing messages array in request body.' });
    }

    const systemPrompt = `You are dsaflow.app AI — an elite DSA tutor built specifically for FAANG and product company placement preparation.
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

    const activeSystemPrompt = systemOverride || systemPrompt;
    activeMessages = [
      { role: 'system', content: activeSystemPrompt },
      ...messages
    ];
  }

  const apiKey = (customApiKey && customApiKey.trim().length > 0) ? customApiKey.trim() : process.env.GROQ_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'GROQ_API_KEY environment variable is not configured.' });
  }

  try {
    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: activeMessages,
        temperature: temperature,
        max_tokens: isComplexityAnalysis ? 1500 : 2048,
        stream: false
      })
    });

    if (!groqRes.ok) {
      const rawText = await groqRes.text();
      console.error('[ai-chat] Groq API error response:', rawText);
      return res.status(groqRes.status).json({ error: `Groq API Error: ${rawText}` });
    }

    const data = await groqRes.json();
    let reply = data.choices?.[0]?.message?.content || '';

    if (isComplexityAnalysis) {
      reply = reply.trim();
      if (reply.startsWith('```')) {
        reply = reply.replace(/^```json\s*/i, '').replace(/```$/, '').trim();
      }

      // Try parsing to verify valid JSON
      try {
        const parsedResult = JSON.parse(reply);
        return res.status(200).json(parsedResult);
      } catch (parseErr) {
        console.warn('[ai-chat-complexity] AI returned invalid JSON. Content was:', reply);
        return res.status(500).json({ 
          error: 'AI did not return valid JSON.', 
          rawContent: reply 
        });
      }
    }

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
