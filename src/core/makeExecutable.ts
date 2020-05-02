import execSh from 'exec-sh';

import messages from '../messages';
import { CONSOLE_COLORS } from '../constants';

import logToConsole, { logToConsoleForDebugging } from '../utils/logToConsole';
import { isWindows } from '../utils/getOSDetails';
import wrapTextIfNotWindows from '../utils/wrapTextIfNotWindows';

const wrapTextWithQuotesIfNotWindows = wrapTextIfNotWindows(`"`);

const makeExecutable: ({ filePath }: { filePath: string }) => Promise<void> = ({
  filePath,
}) => {
  logToConsoleForDebugging({ filePath });

  return new Promise((resolve, reject) => {
    if (isWindows()) {
      return resolve();
    }

    return execSh(
      [`chmod +x ${wrapTextWithQuotesIfNotWindows(filePath)}`],
      (error) => {
        if (!error) {
          logToConsole(
            { color: CONSOLE_COLORS.green },
            messages.makeExecutable.succeed.toString(),
          );
          logToConsole();

          return resolve();
        }

        logToConsole(
          { color: CONSOLE_COLORS.red },
          messages.makeExecutable.failed.toString(),
        );
        logToConsole();

        return reject(error);
      },
    );
  });
};

export default makeExecutable;
