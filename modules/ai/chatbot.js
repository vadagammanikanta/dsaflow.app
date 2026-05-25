// ═══════════════════════════════════════════════════════════════════
//  dsa.flow — AI Chatbot Module (Gemini)
// ═══════════════════════════════════════════════════════════════════

// ── CONFIGURE YOUR GEMINI API KEY HERE ─────────────────────────────
const GEMINI_API_KEY = 'AIzaSyDFs_SdqiCY78V-PmonSH5Q_D3fBCllzAw'; // Real key provided by user
// ─────────────────────────────────────────────────────────────────

const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

const SYSTEM_INSTRUCTION = `You are 'dsa.flow AI', an elite Data Structures and Algorithms tutor. 
Your goal is to help students learn DSA, prepare for technical interviews, and understand time/space complexity.
Rules:
1. ONLY answer questions related to computer science, programming, DSA, competitive programming, and technical interviews.
2. If the user asks about unrelated topics (politics, general knowledge, etc.), politely decline and steer them back to DSA.
3. Be concise, encouraging, and use markdown for code snippets.
4. Explain things simply, as if you are a friendly senior engineer mentoring a junior.`;

let chatHistory = [];

export async function sendChatMessage(userMessage) {
  if (GEMINI_API_KEY === 'YOUR_GEMINI_API_KEY') {
    return "⚠️ **Demo Mode:** Please add your Gemini API Key in `modules/ai/chatbot.js` to enable the AI assistant.";
  }

  // Build the context array for Gemini
  const contents = [];
  
  // Add history
  for (const msg of chatHistory) {
    contents.push({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    });
  }

  // Add current message
  contents.push({
    role: 'user',
    parts: [{ text: userMessage }]
  });

  try {
    const response = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
        contents: contents,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 800,
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Gemini API Error:", errorData);
      throw new Error(errorData.error?.message || "Failed to communicate with AI.");
    }

    const data = await response.json();
    const aiResponse = data.candidates[0].content.parts[0].text;

    // Save to history
    chatHistory.push({ role: 'user', text: userMessage });
    chatHistory.push({ role: 'ai', text: aiResponse });

    // Keep history manageable
    if (chatHistory.length > 20) chatHistory = chatHistory.slice(-20);

    return aiResponse;

  } catch (error) {
    console.error("Chatbot Error:", error);
    return `❌ Error: ${error.message}`;
  }
}

export function clearChatHistory() {
  chatHistory = [];
}
