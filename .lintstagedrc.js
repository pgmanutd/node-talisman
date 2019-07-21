module.exports = {
  '**/*.{js,ts}': filenames => [
    `eslint --fix ${filenames.join(' ')}`,
    `git add ${filenames.join(' ')}`,
    'tsc -p tsconfig.json --noEmit',
    `cross-env NODE_ENV=test jest --projects ./scripts/jest --bail --findRelatedTests ${filenames.join(
      ' ',
    )}`,
  ],
};
