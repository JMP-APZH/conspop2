// web4/scripts/copy-scanbot-files.js - FIXED VERSION
const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, '../node_modules/scanbot-web-sdk/bundle');
const targetDir = path.join(__dirname, '../public/scanbot-sdk');

console.log('Source directory:', sourceDir);
console.log('Target directory:', targetDir);

// Check if source directory exists
if (!fs.existsSync(sourceDir)) {
  console.error('Source directory does not exist:', sourceDir);
  process.exit(1);
}

// Create target directory if it doesn't exist
if (!fs.existsSync(targetDir)) {
  console.log('Creating target directory:', targetDir);
  fs.mkdirSync(targetDir, { recursive: true });
} else {
  console.log('Target directory already exists');
}

let copiedCount = 0;

// Function to recursively copy all files from a directory
function copyDirectoryRecursive(source, target) {
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target, { recursive: true });
  }

  const items = fs.readdirSync(source);
  
  items.forEach(item => {
    const sourcePath = path.join(source, item);
    const targetPath = path.join(target, item);
    
    if (fs.statSync(sourcePath).isDirectory()) {
      // If it's a directory, recursively copy it
      console.log(`📁 Processing directory: ${item}`);
      copyDirectoryRecursive(sourcePath, targetPath);
    } else {
      // If it's a file, copy it
      fs.copyFileSync(sourcePath, targetPath);
      console.log(`✅ Copied: ${path.relative(sourceDir, sourcePath)}`);
      copiedCount++;
    }
  });
}

// Copy entire bundle directory recursively
try {
  console.log('Starting recursive copy...');
  copyDirectoryRecursive(sourceDir, targetDir);
  console.log(`🎉 Successfully copied ${copiedCount} files to public directory`);
} catch (error) {
  console.error('Error during copy:', error);
  process.exit(1);
}

// List all files in target directory for verification
console.log('\n📁 Final files in target directory:');
function listFilesRecursive(dir, prefix = '') {
  const items = fs.readdirSync(dir);
  
  items.forEach(item => {
    const fullPath = path.join(dir, item);
    const relativePath = path.relative(targetDir, fullPath);
    
    if (fs.statSync(fullPath).isDirectory()) {
      console.log(`${prefix}📁 ${item}/`);
      listFilesRecursive(fullPath, prefix + '  ');
    } else {
      console.log(`${prefix}📄 ${item}`);
    }
  });
}

listFilesRecursive(targetDir);