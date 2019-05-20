import clogy from 'clogy';

import logToConsole, { logToConsoleForDebugging } from '../logToConsole';

afterEach(() => {
  jest.clearAllMocks();
});

describe('#logToConsoleForDebugging', () => {
  describe('when process.env.__TALISMAN__DEV__ is set', () => {
    beforeEach(() => {
      process.env.__TALISMAN__DEV__ = 'true';
    });

    afterEach(() => {
      delete process.env.__TALISMAN__DEV__;
    });

    it('should call #clogy.warn with #CONSOLE_COLORS.white and passed message in stringified form', () => {
      logToConsoleForDebugging({ a: 1, b: 2 });

      expect(clogy.trace).toHaveBeenCalledWith(
        '\x1b[1m\x1b[30m\x1b[47m%s\x1b[0m',
        '{"a":1,"b":2}',
      );
    });
  });

  describe('when process.env.__TALISMAN__DEV__ is not set', () => {
    it('should not call #clogy.warn', () => {
      logToConsoleForDebugging({ a: 1, b: 2 });

      expect(clogy.trace).not.toHaveBeenCalledTimes(1);
    });
  });
});

describe('#logToConsole', () => {
  test.each`
    input                                            | args
    ${[]}                                            | ${[]}
    ${[undefined]}                                   | ${[]}
    ${[null]}                                        | ${[]}
    ${[1]}                                           | ${[]}
    ${[undefined, 'message']}                        | ${['\x1b[1m\x1b[30m\x1b[47m%s\x1b[0m \x1b[1m\x1b[30m\x1b[47m%s\x1b[0m', ' TALISMAN >>>> ', ' message ']}
    ${[{}, 'message']}                               | ${['\x1b[1m\x1b[30m\x1b[47m%s\x1b[0m \x1b[1m\x1b[30m\x1b[47m%s\x1b[0m', ' TALISMAN >>>> ', ' message ']}
    ${[{ color: 'color1' }, 'message']}              | ${['\x1b[1m\x1b[30m\x1b[47m%s\x1b[0m color1', ' TALISMAN >>>> ', ' message ']}
    ${[{ color: 'color1' }, 'message1', 'message2']} | ${['\x1b[1m\x1b[30m\x1b[47m%s\x1b[0m color1', ' TALISMAN >>>> ', ' message1 ']}
  `('should call #clogy.log with $args', ({ input, args }) => {
    logToConsole(...input);

    expect(clogy.log).toHaveBeenCalledWith(...args);
  });
});
