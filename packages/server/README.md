# Mr. Noodles API

This is Mr Noodles server.

## Features

### Media scanner

- scans a folder in the local filesystem for images
- TODO scan import folder from frontend
  - create an `ImportJob` and start scan immediately
  - import jobs survive server shutdown (resume on restart)
  - import job: status, dateStarted, files, completion, estimation, dateFinished, results
  - expose `/jobs`
- TODO scan for videos as well
- TODO delete item
- TODO expose `/noodles/deleted`
- TODO restore item
- TODO permanently delete item
- TODO request scan via API (block certain operations while scanning, report on progress back to the UI)
- indexes all images in the database
- stores dimensions metadata and geo location extracted from exif
- when a scan finds that some file's attributes have changed, it updates them automatically
- TODO invalidate image automatically
- stores messages about new scanned files, including processing errors and warnings
- TODO store `ScanJob` details in `/jobs` instead of individual "file messages"
- TODO detect if new scanned files actually already exist under a different filename
- TODO check for duplicates and expose `/noodles/duplicates`

### API server

- `/meta` - show info about objects and queues
- `/noodles`
- `/noodles/<id>`
- `/noodles/<id>/img`
- `/noodles/<id>/img?h=500`
- `/noodles/<id>/img?p=thumb.small`
- `/folders`
- `/folders/<id>`
- `/folders/<id>/img`
- `/folders/<id>/img?h=500`
- `/folders/<id>/img?p=thumb.small`
- `/users`
- `/users/<id>`
- `/users/<id>/img`
- `/users/<id>/img?h=500`
- `/users/<id>/img?p=thumb.small`

Note: the image endpoints update the parent document with image data after these are generated. The endpoints are idempotent

TODO invalidate images on request

## Development

Read first: [Mr Noodles README](../../README.md)

### Requirements

#### Dependencies

You have to build [@noodlestan/shared-types](../shared/types/README.md) first:

```
cd packages/shared/types
npm run build
```

### Populating the database

Run the `populate` script at least once. It reads from the fixtures in the `resources/example-data/` and populates the DB with `users` and their `avatars`.

```
npm run populate
```

Run the `scan-now` script at least once. It scans the `resources/example-media/good` folder in this repository, as well as all folders listed under each user's `folders` attribute, and populates the DB with the found folders and files.

```
npm run scan-now
```

### Running the server

In static mode

```
npm install
npm run build
npm run serve
```

In watch mode

```
npm install
npm run watch
```

## Troubleshooting

### Build failures

Make sure you are running the prescribed [node version](../../.nvmrc)

If the build fails with `@noodlestan/shared-types` errors, you might have pulled changes and you need to rebuild the package `packages/shared/types`.

```
TS Error: Unable to compile TypeScript:
scripts/populate.ts:4:10 - error TS2305: Module '"@noodlestan/shared-types"' has no exported member 'UserNoodle'.
```

**Note:** run that shared build in watch mode if you are actively changing those types. See [shared/types/README.md](../shared/types/README.md) for details.

### Server fails to start

Check http://localhost:8008/files for health

Check logs

### API returns no users and/or no data

Is the database is empty?

You need to perform the steps detailed in the above section: **Populating the database**

## License

Copyright (c) 2023 [Andre Torgal](https://andretorgal.com/).

Published under a [MIT License](https://andrezero.mit-license.org/2023).
