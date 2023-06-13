# ts-rename

Renames *.js files to *.mjs or *.cjs

This package solves the problem described in [issue](https://github.com/microsoft/TypeScript/issues/49462).

## Installation

```bash
npm i ts-rename
```

## Usage

### Renaming ESM modules

```bash
ts-rename --esm ./dist/esm
```

### Renaming CommonJS modules

```bash
ts-rename --cjs ./dist/cjs
```

## License

  [MIT](LICENSE.md)
