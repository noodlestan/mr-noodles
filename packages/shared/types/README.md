# Mr. Noodles

This is Mr Noodles server.

## Development

### Requirements

Install [Docker](https://docs.docker.com/desktop/, get the [MongoDB image](https://hub.docker.com/_/mongo), and create a container exposing the MongoDB port to the host.

```
docker pull mongo:jammy
docker run -p 27017:27017 --name mongo -d mongo:jammy
```

### Running the server

In watch mode

```
npm install
npm run watch
```

In static mode

```
npm run build && npm run serve
```

## Troubleshooting

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
