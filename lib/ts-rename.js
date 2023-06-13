#!/usr/bin/env node

const fs = require('node:fs');
const path = require('node:path');

const targetESM = '--esm';
const targetCommonJS = '--cjs';

// Get command line arguments
const args = process.argv.slice(2);
const target = args[0];
const folderPath = args[1];

// Check for arguments
if (!args.length || ![targetESM, targetCommonJS].includes(target) || !folderPath) {
  console.log(`Usage: ts-rename ${targetESM},${targetCommonJS} <folder_path>`);
  process.exit(1);
}

// Function to rename files
function renameFiles(folderPath, oldExt, newExt) {
  try {
    const files = fs.readdirSync(folderPath);

    files.forEach((file) => {
      const filePath = path.join(folderPath, file);

      // Check if file is a .js file
      if (fs.statSync(filePath).isFile() && path.extname(file) === oldExt) {
        const newFilePath = path.join(folderPath, path.basename(file, oldExt) + newExt);

        // Rename the file
        fs.renameSync(filePath, newFilePath);
        console.log(`File ${file} successfully renamed to ${path.basename(file, oldExt) + newExt}`);
      }
    });
  } catch (err) {
    console.error('Error reading folder:', err);
  }
}

// Run the program
switch (target) {
  case targetESM:
    renameFiles(folderPath, '.js', '.mjs');
    renameFiles(folderPath, '.ts', '.mts');
    break;
  case targetCommonJS:
    renameFiles(folderPath, '.js', '.cjs');
    renameFiles(folderPath, '.ts', '.cts');
    break;
}
