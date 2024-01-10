# Mr. Noodles Gallery App

This is Mr Noodles timeline app.

It connects to [Mr Noodles API](../../../server/README.md) and displays media in galleries.

It's built with [Solid JS](https://www.solidjs.com/) app and [Vite](https://vitejs.dev/).

## Features

### Use cases

- TODO (homescreen) type your name
- TODO (homescreen) welcome back from thumbs

- (timeline) list images grouped by folder and day
- (timeline) navigate files with keyboard
- (timeline) selects and deselects files, clears selection
- (timeline) view file in modal
- (timeline) navigate files in modal view
- TODO (timeline) select/deselect from within modal
- TODO (timeline) show file details within modal (keyboard: D)
- TODO (timeline) delete file (keyboard: DEL) requires modal dialog

- (folders) list by parent
- (folders) filter by text search
- (folders) navigate with breadcrumbs and keyboard
- (folders) show files within selected folder
- TODO (folders) show folder thumb and info (number of files, subfolders, date range)
- TODO (folders) view file in modal
- TODO (folders) navigate with arrows
- TODO (folders) BACKSPACE moves one folder up

- TODO (folders) files selection context

- TODO (delete) list deleted files
- TODO (delete) restore deleted file

- TODO (playlist) create playlist from folder (playlist contains folder)
- TODO (playlist) play playlist
- TODO (playlist) share playlist

- TODO (refactor) rename Photo to Noodle and Album to Folder

- TODO (video) ingest files
- TODO (video) handle video in lists with placeholder graphics only
- TODO (video) video player in modal views
- TODO (video) generate video thumbnails
- TODO (video) generate video preview

- TODO (timeline) filter files by date range
- TODO (timeline) incremental load
- TODO (timeline) list virtualization (fixed heights)

- TODO (playlists) list playlists
- TODO (playlists) delete playlist
- TODO (playlists) edit playlist options

- TODO (tags) add tag to file
- TODO (tags) show file tags (toggle tag visibility from bar)
- TODO (playlists) create playlist from tag

- TODO (identicals) identify identical files
- TODO (identicals) create group from identical files

- TODO (blurs) identify blurry files

- TODO (guestbook)
- TODO (reminder)
- TODO (shoppinglist)

- TODO (settings) list locations (per owner)
- TODO (settings) add/remove location

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
