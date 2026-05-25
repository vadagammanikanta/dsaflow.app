const fs = require('fs');

const path = 'C:\\Users\\vsssm\\.gemini\\antigravity-ide\\brain\\1619a9cd-8445-4eba-bfee-d89e0e6106e9\\.system_generated\\steps\\535\\content.md';
let content = fs.readFileSync(path, 'utf8');

// The NextJS payload splits the string across script tags.
// It looks like: `"])</script><script>self.__next_f.push([1,"`
// Let's remove this exact split marker.

content = content.replace(/\"\]\)\<\/script\>\<script\>self\.__next_f\.push\(\[1,\"/g, '');

// Now do the same extraction logic
let startIdx = content.indexOf('\\"sections\\":[');
if (startIdx === -1) {
  startIdx = content.indexOf('"sections":[');
}

if (startIdx !== -1) {
  let isEscaped = content.substring(startIdx, startIdx + 2) === '\\"';
  let searchStr = isEscaped ? '\\"sections\\":[' : '"sections":[';
  
  let jsonStart = startIdx + searchStr.length - 1; // Start at the `[` bracket
  
  let brackets = 0;
  let endIdx = -1;
  let inString = false;
  let escape = false;

  for (let i = jsonStart; i < content.length; i++) {
    const char = content[i];
    
    if (escape) {
      escape = false;
      continue;
    }
    
    if (char === '\\') {
      escape = true;
      continue;
    }
    
    if (char === '"') {
      inString = !inString;
      continue;
    }
    
    if (!inString) {
      if (char === '[') brackets++;
      if (char === ']') brackets--;
      
      if (brackets === 0) {
        endIdx = i;
        break;
      }
    }
  }

  if (endIdx !== -1) {
    let rawJson = content.substring(jsonStart, endIdx + 1);
    
    if (isEscaped) {
      rawJson = rawJson.replace(/\\\\"/g, '"');
      rawJson = rawJson.replace(/\\"/g, '"');
    }
    
    try {
      const data = JSON.parse(rawJson);
      fs.writeFileSync('a2z_clean.json', JSON.stringify(data, null, 2));
      console.log("Successfully extracted and parsed", data.length, "sections!");
    } catch(e) {
      console.log("Still failed to parse JSON:", e.message);
      fs.writeFileSync('a2z_clean_error.json', rawJson);
    }
  }
}
