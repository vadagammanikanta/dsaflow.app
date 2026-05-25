const fs = require('fs');
const content = fs.readFileSync('../../brain/1619a9cd-8445-4eba-bfee-d89e0e6106e9/.system_generated/steps/535/content.md', 'utf8');

const startStr = '"subcategory_name":"Patterns","problems":[';
const startIdx = content.indexOf(startStr);

if (startIdx !== -1) {
  let endIdx = content.indexOf(']', startIdx + startStr.length);
  const problemsStr = '[' + content.substring(startIdx + startStr.length, endIdx) + ']';
  
  // Clean up any weird escaping that Next.js might have added
  const cleanStr = problemsStr.replace(/\\"/g, '"');
  
  try {
    const problems = JSON.parse(problemsStr);
    
    const curriculum = problems.map((p, i) => {
      return {
        id: `striver-pattern-${i+1}`,
        title: p.problem_name,
        category: "Patterns",
        difficulty: p.difficulty,
        icon: "⭐",
        iconColor: "amber",
        summary: `Learn how to print ${p.problem_name} using nested loops.`,
        readTime: "5 mins",
        details: `<h2>${p.problem_name}</h2>
<p>Pattern printing is essential for building strong logical thinking and mastering nested loops.</p>
<ul>
  <li><a href="${p.article}" target="_blank">Read Article</a></li>
  <li><a href="${p.youtube}" target="_blank">Watch Video</a></li>
</ul>
<p>In this pattern, you must identify the relationship between the row index, column index, and the spaces/stars printed.</p>`
      };
    });

    fs.writeFileSync('striver_patterns.json', JSON.stringify(curriculum, null, 2));
    console.log('Extracted ' + curriculum.length + ' patterns.');
  } catch (e) {
    console.error("JSON parse error:", e);
  }
} else {
  console.log('Pattern section not found.');
}
