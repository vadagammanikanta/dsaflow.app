// ═══════════════════════════════════════════════════════════════════
//  dsa.flow — AI Chatbot Module (Gemini)
// ═══════════════════════════════════════════════════════════════════

// ── SECURE VERCEL BACKEND ─────────────────────────────
// The API Key is now stored safely in Vercel Environment Variables.
// ─────────────────────────────────────────────────────────────────

const GEMINI_API_URL = '/api/gemini';

const SYSTEM_INSTRUCTION = `You are 'dsa.flow AI', an elite Data Structures and Algorithms tutor. 
Your goal is to help students learn DSA, prepare for technical interviews, and understand time/space complexity.
Rules:
1. ONLY answer questions related to computer science, programming, DSA, competitive programming, and technical interviews.
2. If the user asks about unrelated topics, politely decline and steer them back to DSA.
3. Be concise, encouraging, and use markdown for code snippets. Provide multiple code examples and resources if helpful.
4. **IMAGE GENERATION:** If the user asks you to generate a picture/image of something, you MUST output a markdown image linking to: 'https://image.pollinations.ai/prompt/{URL_ENCODED_PROMPT}?width=800&height=400&nologo=true'. Example: ![Binary Tree](https://image.pollinations.ai/prompt/a%20beautiful%20diagram%20of%20a%20binary%20tree?width=800&height=400&nologo=true)
5. **FILE ANALYSIS:** If the user uploads an image of code or a diagram, analyze it thoroughly and explain it as an expert.`;

let chatHistory = [];

export async function sendChatMessage(userMessage, fileData = null) {


  // Build the context array for Gemini
  const contents = [];
  
  // Add history (we only send text history for efficiency)
  for (const msg of chatHistory) {
    contents.push({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    });
  }

  // Add current message
  const currentParts = [];
  if (fileData) {
    currentParts.push({
      inlineData: {
        mimeType: fileData.mimeType,
        data: fileData.base64
      }
    });
  }
  if (userMessage) {
    currentParts.push({ text: userMessage });
  }

  contents.push({
    role: 'user',
    parts: currentParts
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
      const text = await response.text();
      let errorData;
      try {
        errorData = JSON.parse(text);
      } catch (e) {
        throw new Error(`Server Error: ${text.substring(0, 50)}...`);
      }
      console.error("Gemini API Error:", errorData);
      throw new Error(errorData.error?.message || errorData.error || "Failed to communicate with AI.");
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
