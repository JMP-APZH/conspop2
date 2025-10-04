// web4/scripts/debug-scanbot-structure.js
const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, '../node_modules/scanbot-web-sdk/bundle');

function exploreDirectory(dir, depth = 0) {
  const indent = '  '.repeat(depth);
  const items = fs.readdirSync(dir);
  
  items.forEach(item => {
    const fullPath = path.join(dir, item);
    const stats = fs.statSync(fullPath);
    
    if (stats.isDirectory()) {
      console.log(`${indent}📁 ${item}/`);
      exploreDirectory(fullPath, depth + 1);
    } else {
      console.log(`${indent}📄 ${item} (${stats.size} bytes)`);
    }
  });
}

console.log('Scanbot SDK bundle structure:');
exploreDirectory(sourceDir);