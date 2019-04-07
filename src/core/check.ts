import execSh from 'exec-sh';

import messages from '../messages';
import { CONSOLE_COLORS } from '../constants';
import {
  logToConsole,
  logToConsoleForDebugging,
  getProcessArgs,
} from '../utils';

const check: ({
  filePath,
  args,
}: {
  filePath: string;
  args: NodeJS.Process['argv'];
}) => Promise<undefined> = ({ filePath, args }) => {
  logToConsoleForDebugging({ filePath });

  return new Promise((resolve, reject) => {
    logToConsole(
      { color: CONSOLE_COLORS.cyan },
      messages.check.inProgress.toString(),
    );
    logToConsole();

    execSh([`${filePath} ${getProcessArgs(args)}`], error => {
      if (!error) {
        logToConsole(
          { color: CONSOLE_COLORS.green },
          messages.check.succeed.toString(),
        );
        logToConsole();

        return resolve();
      }

      logToConsole(
        { color: CONSOLE_COLORS.red },
        messages.check.failed.toString(),
      );
      logToConsole();

      return reject(error);
    });
  });
};

export default check;
