# Mr. Noodles Gallery App

This is Mr Noodles gallery app.

It connects to [Mr Noodles API](../../../server/README.md) and displays media in galleries.

It's built with [Solid JS](https://www.solidjs.com/) app and [Vite](https://vitejs.dev/).

## Features

### Media list

- render a list of images grouped by album and day

- TODO incremental render
- TODO filter
- TODO list virtualization (fixed heights)
- TODO list albums
- TODO play album slide-show

## Development

Read first: [Mr Noodles README](../../../../README.md)

### Requirements

#### Dependencies

You have to build [@noodlestan/shared-types](../../../shared/types/README.md) first:

```
cd packages/shared/types
npm run build
```

### Running the dev server

In watch mode

```
npm install
npm start
```

## Troubleshooting

### Build failures

Make sure you are running the prescribed [node version](../../.nvmrc)

If the build fails with `@noodlestan/shared-types` errors, you might have pulled changes: rebuild `packages/shared/types`. **Note:** run that shared build in watch mode if you are activelly changinging those types. See [shared/types/README.md](../../../shared/types/README.md) for details.

### Dev server fails to start

Check http://localhost:3000 for health

Is another instance running on same port? Stop it, or use a different por. See [env](../../../../.env.example) for how.

Is the [Mr Noodles API](../../../server/README.md) server running at http://localhost:8008/photos? Check [packages/server/README.md](../../../server/README.md) for more info.

## License

Copyright (c) 2023 [Andre Torgal](https://andretorgal.com/).

Published under a [MIT License](https://andrezero.mit-license.org/2023).
