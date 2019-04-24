import execSh from 'exec-sh';

import messages from '../messages';
import { CONSOLE_COLORS } from '../constants';

import logToConsole, { logToConsoleForDebugging } from '../utils/logToConsole';
import { isWindows } from '../utils/getOSDetails';

const makeExecutable: ({
  filePath,
}: {
  filePath: string;
}) => Promise<undefined> = ({ filePath }) => {
  logToConsoleForDebugging({ filePath });

  return new Promise((resolve, reject) => {
    if (isWindows) {
      return resolve();
    }

    return execSh([`chmod +x ${filePath}`], error => {
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
    });
  });
};

export default makeExecutable;
