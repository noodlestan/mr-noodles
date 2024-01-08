# Mr. Noodles Gallery App

This is Mr Noodles gallery app.

It connects to [Mr Noodles API](../../../server/README.md) and displays media in galleries.

It's built with [Solid JS](https://www.solidjs.com/) app and [Vite](https://vitejs.dev/).

## Features

### Use cases

- list images grouped by album and day
- navigate items with keyboard
- selects and deselects items, clears selection
- view item in modal
- TODO select/deselect from within modal
- TODO show item details within modal (keyboard: D)
- TODO navigate from modal view
- TODO delete item (keyboard: DEL)

- list folders by parent
- filter folders by text search
- navigate folders with breadcrumbs and keyboard
- TODO show files within selected folder (along? before? after sub folders)
- TODO ESC moves one folder up
- TODO files selection context

- TODO list deleted items
- TODO restore deleted item

- TODO create playlist from folder
- TODO play playlist

- TODO rename Photo to MediaItem and Album to Folder

- TODO ingest video
- TODO handle video in lists with placeholder graphics only
- TODO video player in modal view
- TODO generate video thumbnails
- TODO generate video preview

- TODO filter items by date range
- TODO incremental load
- TODO list virtualization (fixed heights)

- TODO list playlists
- TODO delete playlist
- TODO edit playlist options

- TODO add tag to file
- TODO show file tags (toggle tag visibility from bar)
- TODO create slideshow from tag

- TODO identify identical files
- TODO identify blurry files
- TODO create group from identical files

### Capabilities

- TODO display keyboard tooltips (accessible)
- TODO turn keyboard tooltips on/off

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
