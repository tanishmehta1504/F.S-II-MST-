import fs from 'fs';
let content = fs.readFileSync('src/data/mockData.ts', 'utf-8');
content = content.replace(/\\n/g, '\n');
fs.writeFileSync('src/data/mockData.ts', content);
