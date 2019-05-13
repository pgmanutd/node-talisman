# Contributing

Want to contribute? Great! Check the guidelines below.

## Tech

- [node.js](http://nodejs.org) - evented I/O for the backend
- [Typescript](https://www.typescriptlang.org/) - a strict syntactical superset of JavaScript, and adds optional static typing to the language
- [Jest](https://jestjs.io/) - a testing framework
- [ESLint](https://eslint.org/): a fully pluggable tool for identifying and reporting on patterns in JavaScript
- [Prettier](https://prettier.io/): an opinionated code formatter

## Development

Checkout [the repository](https://github.com/pgmanutd/node-talisman.git)

Open your favorite Terminal and run these commands:

```bash
cd node-talisman

npm install
```

## Important commands:

Run eslint on all ts files:

```bash
$ npm run lint
```

Run typescript typechecking:

```bash
$ npm run typecheck
```

Run unit tests:

```bash
$ npm test
```

Run unit tests in watch mode:

```bash
$ npm run test:watch
```

Run unit tests with coverage:

```bash
$ npm run test:coverage
```

Run lint and typechecking and tests:

```bash
$ npm run check
```

Run prettier formatting:

```bash
$ npm run format
```

##### Please follow few guidelines before raising a PR

- Please check pull request guidelines [here](./PULL_REQUEST_TEMPLATE.md)
