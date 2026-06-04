import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Custom Vite plugin to handle code execution locally in dev mode via Wandbox
function localCompilerPlugin() {
  return {
    name: 'local-compiler-plugin',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === '/api/execute' && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => body += chunk);
          req.on('end', async () => {
            try {
              const payload = JSON.parse(body);
              const { language, code, driver, stdin } = payload;
              
              const COMPILER_MAP = {
                'javascript': 'nodejs-20.17.0',
                'js': 'nodejs-20.17.0',
                'python': 'cpython-3.12.7',
                'py': 'cpython-3.12.7',
                'cpp': 'gcc-13.2.0',
                'c++': 'gcc-13.2.0',
                'java': 'openjdk-jdk-22+36',
                'c': 'gcc-13.2.0-c',
                'csharp': 'mono-head',
                'cs': 'mono-head',
                'go': 'go-head',
                'rust': 'rust-head',
                'rs': 'rust-head',
                'ruby': 'ruby-head',
                'rb': 'ruby-head',
                'php': 'php-head',
                'swift': 'swift-head',
                'kotlin': 'kotlin-head',
                'kt': 'kotlin-head'
              };

              const normalizedKey = (language || '').toLowerCase();
              const compiler = COMPILER_MAP[normalizedKey];
              if (!compiler) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ error: `Unsupported language: ${language}` }));
              }

              let fullContent = code;
              if (driver && driver.trim().length > 0) {
                fullContent = code + "\n\n" + driver;
              }

              const wandboxPayload = {
                compiler: compiler,
                code: fullContent,
                stdin: stdin || ""
              };

              // Wandbox Java requires the public class to be named "prog".
              if (normalizedKey === 'java') {
                wandboxPayload.code = wandboxPayload.code.replace(/public\s+class\s+(\w+)/g, 'public class prog');
              }

              let data = null;
              let attempts = 3;
              let lastErr = null;

              for (let attempt = 1; attempt <= attempts; attempt++) {
                try {
                  const wandboxRes = await fetch('https://wandbox.org/api/compile.json', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(wandboxPayload)
                  });

                  if (!wandboxRes.ok) {
                    throw new Error(`Upstream compilation service returned status ${wandboxRes.status}`);
                  }

                  data = await wandboxRes.json();

                  const isTransientError = data.program_error && (
                    data.program_error.includes("OCI runtime error") || 
                    data.program_error.includes("Resource temporarily unavailable") || 
                    data.status === "126"
                  );

                  if (isTransientError && attempt < attempts) {
                    console.warn(`[Local Compiler] Wandbox transient error (attempt ${attempt}/${attempts}):`, data.program_error);
                    await new Promise(resolve => setTimeout(resolve, 500));
                    continue;
                  }

                  break;
                } catch (err) {
                  lastErr = err;
                  if (attempt === attempts) {
                    console.error("[Local Compiler] Exhausted all retry attempts:", err);
                    res.writeHead(502, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ error: `Upstream compiler error: ${err.message}` }));
                  }
                  console.warn(`[Local Compiler] Connection attempt ${attempt}/${attempts} failed, retrying...`, err.message);
                  await new Promise(resolve => setTimeout(resolve, 500));
                }
              }

              // Check for compilation errors
              const hasCompileError = data.compiler_error && data.compiler_error.trim().length > 0;
              if (hasCompileError) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({
                  success: false,
                  status: 'Compilation Error',
                  output: data.compiler_error || '',
                  error: data.compiler_error || 'Compilation failed',
                  stderr: data.compiler_error || ''
                }));
              }

              const success = data.status === '0';
              res.writeHead(200, { 'Content-Type': 'application/json' });
              return res.end(JSON.stringify({
                success: success,
                status: success ? 'Success' : 'Runtime Error',
                output: data.program_output || data.program_message || '',
                stdout: data.program_output || '',
                stderr: data.program_error || '',
                error: success ? '' : (data.program_error || 'Process exited with non-zero status')
              }));

            } catch (err) {
              res.writeHead(500, { 'Content-Type': 'application/json' });
              return res.end(JSON.stringify({ error: `Internal local execution error: ${err.message}` }));
            }
          });
        } else if (req.url === '/api/send-email' && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => body += chunk);
          req.on('end', async () => {
            try {
              const payload = JSON.parse(body);
              const { email, name, whatsapp, paymentId, type } = payload;
              const isWelcome = type === 'welcome';
              console.log("=========================================");
              console.log("📨 [LOCAL MAIL TRIGGERED]");
              if (isWelcome) {
                console.log(`To New Member (${email}): "Welcome to dsaflow.app! Onboarding started."`);
                console.log(`To Admin (dsaflow@outlook.com): "New User Registered: ${name} - WhatsApp: ${whatsapp}"`);
              } else {
                console.log(`To Upgraded Member (${email}): "Welcome to dsaflow.app Premium!"`);
                console.log(`To Admin (dsaflow@outlook.com): "New Premium Member: ${name} - WhatsApp: ${whatsapp} - Payment ID: ${paymentId}"`);
              }
              res.writeHead(200, { 'Content-Type': 'application/json' });
              return res.end(JSON.stringify({ success: true, message: 'Local email simulated' }));
            } catch (err) {
              res.writeHead(500, { 'Content-Type': 'application/json' });
              return res.end(JSON.stringify({ error: err.message }));
            }
          });
        } else if (req.url === '/api/send-bulk-emails' && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => body += chunk);
          req.on('end', async () => {
            try {
              const payload = JSON.parse(body);
              const { key, subject, message } = payload;
              console.log("=========================================");
              console.log("📨 [LOCAL BULK EMAIL TRIGGERED]");
              console.log(`Key Match: ${key ? 'Yes' : 'No'}`);
              console.log(`Subject: "${subject}"`);
              console.log(`Message Body (Preview): "${message ? message.slice(0, 100) : ''}..."`);
              console.log(`[EMAIL SIM] Simulated sending greetings to all Firestore users via Microsoft SMTP.`);
              console.log("=========================================");
              
              res.writeHead(200, { 'Content-Type': 'application/json' });
              return res.end(JSON.stringify({ success: true, count: 5, message: 'Local bulk email simulated' }));
            } catch (err) {
              res.writeHead(500, { 'Content-Type': 'application/json' });
              return res.end(JSON.stringify({ error: err.message }));
            }
          });
        } else if (req.url === '/api/ai-chat' && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => body += chunk);
          req.on('end', async () => {
            try {
              const payload = JSON.parse(body);
              const { messages, customApiKey } = payload;

              // 1. If custom apiKey is provided, fetch from x.ai
              if (customApiKey && customApiKey.trim().length > 0) {
                const xaiRes = await fetch('https://api.x.ai/v1/chat/completions', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${customApiKey.trim()}`
                  },
                  body: JSON.stringify({
                    model: 'grok-2-latest',
                    messages: messages,
                    temperature: 0.4,
                    max_tokens: 2048,
                    stream: false
                  })
                });

                if (!xaiRes.ok) {
                  let errMsg = 'xAI Grok API request failed.';
                  try {
                    const errData = await xaiRes.json();
                    errMsg = errData?.error?.message || errMsg;
                  } catch (_) {}
                  res.writeHead(xaiRes.status, { 'Content-Type': 'application/json' });
                  return res.end(JSON.stringify({ error: errMsg }));
                }

                const data = await xaiRes.json();
                res.writeHead(200, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ reply: data.choices?.[0]?.message?.content || '' }));
              }

              // 2. Otherwise use local GROQ_API_KEY if configured
              const apiKey = process.env.GROQ_API_KEY;
              if (!apiKey) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ error: 'GROQ_API_KEY environment variable is not configured locally.' }));
              }

              const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                  model: 'llama-3.3-70b-versatile',
                  messages: messages,
                  temperature: 0.4,
                  max_tokens: 2048,
                  stream: false
                })
              });

              if (!groqRes.ok) {
                let errMsg = 'Groq API request failed.';
                try {
                  const errData = await groqRes.json();
                  errMsg = errData?.error?.message || errMsg;
                } catch (_) {}
                res.writeHead(groqRes.status, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ error: errMsg }));
              }

              const data = await groqRes.json();
              res.writeHead(200, { 'Content-Type': 'application/json' });
              return res.end(JSON.stringify({ reply: data.choices?.[0]?.message?.content || '' }));

            } catch (err) {
              res.writeHead(500, { 'Content-Type': 'application/json' });
              return res.end(JSON.stringify({ error: err.message }));
            }
          });
        } else {
          next();
        }
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), localCompilerPlugin()],
  // NOTE: No server.proxy — the localCompilerPlugin middleware handles all
  // /api/execute and /api/send-email routes locally. On Vercel, the
  // serverless functions in /api/ handle production requests natively.
})
