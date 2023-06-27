#!/usr/bin/env node

const fs = require('node:fs');
const path = require('node:path');
const { program } = require('commander');
const pkg = require('../package.json');

const renameFiles = ({ folderPath, oldExt, newExt, verbose, recursive }) => {
  try {
    const files = fs.readdirSync(folderPath);

    files.forEach((file) => {
      const filePath = path.join(folderPath, file);
      const stat = fs.statSync(filePath);

      // Check if file is a .js file
      if (stat.isFile() && path.extname(file) === oldExt) {
        const newFilePath = path.join(folderPath, path.basename(file, oldExt) + newExt);

        // Rename the file
        fs.renameSync(filePath, newFilePath);
        if (verbose) {
          console.log(`File ${file} successfully renamed to ${path.basename(file, oldExt) + newExt}`);
        }
      } else if (stat.isDirectory() && recursive) {
        renameFiles({ folderPath: filePath, oldExt, newExt, verbose, recursive });
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
    .option('-r, --recursive', 'recursive rename', false)
    .option('--verbose', 'show verbose information', false)
    .action((folderPath, options) => {
      const { verbose, recursive } = options;
      const oldExt = '.js';
      if (options.esm) {
        renameFiles({ folderPath, oldExt, newExt: '.mjs', verbose, recursive });
      } else if (options.cjs) {
        renameFiles({ folderPath, oldExt, newExt: '.cjs', verbose, recursive });
      } else {
        console.error('One of the values must be used: --esm or --cjs');
      }
    })
    .parse();
};

main();
