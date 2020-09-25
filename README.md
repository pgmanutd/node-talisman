# node-talisman &middot; [![npm](https://img.shields.io/npm/v/node-talisman.svg)](https://www.npmjs.com/package/node-talisman) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/pgmanutd/node-talisman/blob/master/LICENSE) [![CircleCI](https://circleci.com/gh/pgmanutd/node-talisman.svg?style=shield)](https://circleci.com/gh/pgmanutd/node-talisman) [![Coverage Status](https://coveralls.io/repos/github/pgmanutd/node-talisman/badge.svg?branch=master)](https://coveralls.io/github/pgmanutd/node-talisman?branch=master) [![BCH compliance](https://bettercodehub.com/edge/badge/pgmanutd/node-talisman?branch=master)](https://bettercodehub.com/results/pgmanutd/node-talisman) [![Known Vulnerabilities](https://snyk.io/test/github/pgmanutd/node-talisman/badge.svg?targetFile=package.json)](https://snyk.io/test/github/pgmanutd/node-talisman?targetFile=package.json)

A npm package for running Thoughtwork's [Talisman](https://github.com/thoughtworks/talisman) tool as a CLI.

## Requires

- Node 12+

## Features

- Supports [Talisman v1.8.0](https://github.com/thoughtworks/talisman/releases/tag/v1.8.0).
- Linux, MacOS and Windows supported.

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

   **Using above script:**

   ```sh
   npm run node-talisman -- --githook [pre-commit|pre-push]

   # finds all .js and .ts files in the current directory (recursively)
   npm run node-talisman -- --pattern="./**/*.{js,ts}"
   ```

   **Using npx:**

   ```sh
   npx node-talisman --githook [pre-commit|pre-push]

   # finds all .js and .ts files in the current directory (recursively)
   npx node-talisman --pattern="./**/*.{js,ts}"
   ```

   For more details checkout [Talisman as a CLI utility](https://github.com/thoughtworks/talisman#talisman-as-a-cli-utility).

## Contributing Guide

Anyone can help to make this project better - check out the [Contributing Guide](./.github/CONTRIBUTING.md)!

## Code of Conduct

Please adhere to [Code of Conduct](./.github/CODE_OF_CONDUCT.md).

## Issues

Please make sure to read the [Issue Reporting Guidelines](./.github/ISSUE_TEMPLATE.md) before opening an issue.

## Changelog

Detailed changes for each release are documented in the [release notes](https://github.com/pgmanutd/node-talisman/releases).

## License

Licensed under the [MIT licensed](./LICENSE).
