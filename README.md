# ts-rename

Renames *.js files to *.mjs or *.cjs

This package solves the problem described in [issue](https://github.com/microsoft/TypeScript/issues/49462).

## Installation

```bash
npm i ts-rename
```

## Usage

### Renaming ESM modules

**--esm**

```bash
ts-rename --esm ./dist/esm
```

### Renaming CommonJS modules

**--cjs**

```bash
ts-rename --cjs ./dist/cjs
```

### Recursive renaming

**--r, --recursive**

```bash
ts-rename --cjs -r ./dist/cjs
```

### Verbose mode

**--verbose**

```bash
ts-rename --cjs -v ./dist/cjs
```

### Show help

**-h, --help**

```bash
ts-rename -h
```

## License

  [MIT](LICENSE.md)
