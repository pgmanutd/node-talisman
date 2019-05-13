module.exports = {
  name: 'unit',
  displayName: 'unit',
  rootDir: '../..',
  verbose: false,
  notify: false,
  roots: ['<rootDir>/src'],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.ts$',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/tsconfig.json',
    },
  },
  moduleNameMapper: {
    '^.+\\.(jpe?g|png|gif|ttf|eot|woff|svg)$':
      '<rootDir>/scripts/jest/fileMock.js',
  },
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  moduleDirectories: ['node_modules', 'src'],
  setupFiles: ['<rootDir>/scripts/jest/throwConsoleError.js'],
  collectCoverageFrom: ['src/**/*.ts', '!**/node_modules/**'],
  coveragePathIgnorePatterns: ['.*.(test|spec).ts?.snap?$'],
  coverageDirectory: '<rootDir>/reports/coverage',
  coverageThreshold: {
    global: {
      lines: 100,
    },
  },
};
