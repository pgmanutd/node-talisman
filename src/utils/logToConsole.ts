import clogy from 'clogy';

import { CONSOLE_COLORS } from '../constants';

clogy.setLevel(clogy.LEVELS.log);

export const logToConsoleForDebugging = (message: DynamicObject) => {
  if (process.env.__TALISMAN__DEV__) {
    clogy.trace(CONSOLE_COLORS.white, JSON.stringify(message));
  }
};

const logToConsole = (...args: any[]) => {
  if (!args || args.length === 0) {
    return clogy.log();
  }

  const [{ color }, message] = args;

  return clogy.log(
    `${CONSOLE_COLORS.white} ${color}`,
    ' TALISMAN >>>> ',
    ` ${message} `,
  );
};

export default logToConsole;
