# Mr. Noodles

This Monorepo hosts all code for Mr. Noodles.

## Development

Recommended software:

- [NVM](https://github.com/nvm-sh/nvm)
- [VS Code](https://code.visualstudio.com/)
- [VS Code Eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [VS Code Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

### What's in the repo

See each package's README for more details.

- [Server](./packages/server/README.md)
- [Client APP](./packages/client/apps/app-noodles-gallery/README.md)
- [Client UI lib home](./packages/client/apps/app-ui-system/README.md)
- [Client UI lib packages](./packages/client/libs/)
- [Shared libs](./packages/shared/types/README.md)

### Commiting

[Lefthook](https://evilmartians.com/chronicles/lefthook-knock-your-teams-code-back-into-shape) should run automatically before every commit.

- lints all code
- does a global `tsc`
- builds shared code
- builds server(s)
- builds client app(s)

Note: if you see `🥊 lint` you should run `npm run lint` for details (linting is silent because `prettier` is noisy and breaks lefthooks output buffering)

## License

Copyright (c) 2023 [Andre Torgal](https://andretorgal.com/).

Published under a [MIT License](https://andrezero.mit-license.org/2023).
