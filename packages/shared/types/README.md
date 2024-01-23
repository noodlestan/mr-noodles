# Mr. Noodles Shared lib

This is Mr Noodles shared library.

These (simple) types and functions exist because they are needed both in the server (typically `node-ts/express` environment) and browser (typically `vite/solidjs` apps)

## Distributables

Simple becomes complicated because it's 2024 but still not straightfowrward to build for client and server consumers.

- Support for ESM modules in NodeJS comes through `ts-node` (compiles to commonjs). Couldn't make it transpile dependencies (such as this one) alongside the compiled server code. So when the built server encounters the untranspiled ESM module, it chokes with `unexpected "import { ...`
- Support for consuming CommonJS in Vite is also not straightforward. And obviously, that would be a U-turn (and literally include a U-turn in the pipeline)

Checked how some [cool libraries out there ship for both environments](https://github.com/lucide-icons/lucide/blob/main/packages/lucide-solid/package.json#L27:L28) and the answer is not surprising at this point: separate builds for "ESM" and "CommonJS" target.

The 2 targets are manifested in `package.json` via:

```
  "main": "dist/cjs/index.js",
  "module": "dist/esm/index.js",
  "sideEffects": false,
```

Added `"sideEffects": true` for eventual tree shakers and (IMPORTANT!) removed the `"type": "module"`.

### What's with the ".js" extension in all the import statements!?!

Unfortunately, every guide that explains [how to emit native ESM from TS](https://ubuverse.com/configure-typescript-to-emit-esm-code/) instructs us to `add ".js" extension to all your` import statements.

```
export * from './api/index.js';
export * from './query/index.js';
export * from './models/index.js';
```

Unfortunately, this is not a joke. :clown:

Fortunately, though, VSCode seems to transparently translate all `from "/index.js"`. The DX is not (totally) ruined.

## Development

Read first: [Mr Noodles README](../../../README.md)

### Building

Single build

```
npm install
npm run build
```

In watch mode

```
npm install
npm run watch
```

## License

Copyright (c) 2023 [Andre Torgal](https://andretorgal.com/).

Published under a [MIT License](https://andrezero.mit-license.org/2023).
