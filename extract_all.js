const fs = require('fs');

const path = 'C:\\Users\\vsssm\\.gemini\\antigravity-ide\\brain\\1619a9cd-8445-4eba-bfee-d89e0e6106e9\\.system_generated\\steps\\535\\content.md';
const content = fs.readFileSync(path, 'utf8');

// The NextJS payload stores it as a giant string, so quotes are escaped like `\"`
// We can find `\"sections\":[`
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
    
    fs.writeFileSync('a2z_raw.json', rawJson);
    console.log("Extracted successfully!");
  } else {
    console.log("Could not find end bracket.");
  }
} else {
  console.log("Could not find start string.");
  // Dump a snippet to see what's actually there
  const snippet = content.substring(content.indexOf('strivers-a2z-sheet'), content.indexOf('strivers-a2z-sheet') + 500);
  console.log("Snippet:", snippet);
}
