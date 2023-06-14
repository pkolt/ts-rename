#!/usr/bin/env node

const fs = require('node:fs');
const path = require('node:path');
const { program } = require('commander');
const pkg = require('../package.json');

const renameFiles = (folderPath, oldExt, newExt, verbose) => {
  try {
    const files = fs.readdirSync(folderPath);

    files.forEach((file) => {
      const filePath = path.join(folderPath, file);

      // Check if file is a .js file
      if (fs.statSync(filePath).isFile() && path.extname(file) === oldExt) {
        const newFilePath = path.join(folderPath, path.basename(file, oldExt) + newExt);

        // Rename the file
        fs.renameSync(filePath, newFilePath);
        if (verbose) {
          console.log(`File ${file} successfully renamed to ${path.basename(file, oldExt) + newExt}`);
        }
      }
    });
  } catch (err) {
    console.error('Error reading folder:', err);
  }
};

const main = () => {
  program
    .name(pkg.name)
    .description(pkg.description)
    .version(pkg.version, '-v, --version', 'output the current version')
    .argument('<string>', 'folder path')
    .option('--esm', 'renames *.js files to *.mjs')
    .option('--cjs', 'renames *.js files to *.cjs')
    .option('--verbose', 'show verbose information', false)
    .action((folderPath, options) => {
      if (options.esm) {
        renameFiles(folderPath, '.js', '.mjs', options.verbose);
      } else if (options.cjs) {
        renameFiles(folderPath, '.js', '.cjs', options.verbose);
      }
    })
    .parse();
};

main();
