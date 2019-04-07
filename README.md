# node-talisman &middot; [![npm](https://img.shields.io/npm/v/node-talisman.svg)](https://www.npmjs.com/package/node-talisman) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

A npm package for running Thoughtwork's [Talisman](https://github.com/thoughtworks/talisman) tool as a CLI

## Requires

- Node 8+

## Features

- Linux, MacOS and Windows supported

## Installation

1. Add package

   ```sh
   npm install --save-dev node-talisman
   ```

2. Add a script to package.json

   ```js
   {
     "scripts" : {
       "node-talisman": "node-talisman",
       ...
     }
     ...
   }
   ```

3. Use it as you like :wink:

    - Using above script:

   ```sh
   npm run node-talisman -- --githook [pre-commit|pre-push]
   ```

   or

   ```sh
   # finds all .js and .ts files in the current directory (recursively)
   npm run node-talisman -- --pattern="./**/*.{js,ts}"
   ```

   - Using npx

   ```sh
   npx node-talisman --githook [pre-commit|pre-push]
   ```

    or

   ```sh
   # finds all .js and .ts files in the current directory (recursively)
   npx node-talisman --pattern="./**/*.{js,ts}"
   ```

   For more details checkout [Talisman's installation as CLI](https://github.com/thoughtworks/talisman#installation-as-a-cli)

## Contributing Guide

Anyone can help to make this project better - check out the [Contributing Guide](./.github/CONTRIBUTING.md)!

## Code of Conduct

Please adhere to [Code of Conduct](./.github/CODE_OF_CONDUCT.md).

## Issues

Please make sure to read the [Issue Reporting Guidelines](./.github/ISSUE_TEMPLATE.md) before opening an issue.

## License

Licensed under the [MIT licensed](./LICENSE).
