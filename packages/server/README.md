# Mr. Noodles API

This is Mr Noodles server.

## Features

### Media scanner

- scans a folder in the local filesystem for images
- TODO scan for videos as well
- TODO request scan via API (block certain operations while scanning, report on progress back to the UI)
- indexes all images in the database
- stores dimensions metadata and geo location extracted from exif
- when a scan finds that a photo attributes have changed updates them automatically
- TODO invalidate image automatically
- TODO detect if new scanned files actually already exist under a different filename
- TODO check for duplicates and expose `/photos/duplicates`
- stores messages about new scanned files, including processing errors and warnings

### API serves

- `/photos`
- `/photos/<id>`
- `/photos/<id>/img`
- `/photos/<id>/img?h=500`
- `/albums`
- `/albums/<id>`
- `/albums/<id>/img`
- `/albums/<id>/img?h=500`

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

#### DB (docker)

Install [Docker](https://docs.docker.com/desktop/, get the [MongoDB image](https://hub.docker.com/_/mongo), and create a container exposing the MongoDB port to the host.

```
docker pull mongo:jammy
docker run -p 27017:27017 --name mongo -d mongo:jammy
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

If the build fails with `@noodlestan/shared-types` errors, you might have pulled changes: rebuild `packages/shared/types`. **Note:** run that shared build in watch mode if you are activelly changinging those types. See [shared/types/README.md](../shared/types/README.md) for details.

### Server fails to start

Check http://localhost:8008/photos for health

Check logs

Is another instance running on same port? Stop it, or use a different por. See [env](../../.env.example) for how.

Is the MongoDB instance up?

```
docker logs mongo -f
```

Can you connect to it via [shell](https://www.mongodb.com/docs/mongodb-shell/install/#std-label-macos-install-archive)?

```
mongosh
```

## License

Copyright (c) 2023 [Andre Torgal](https://andretorgal.com/).

Published under a [MIT License](https://andrezero.mit-license.org/2023).
