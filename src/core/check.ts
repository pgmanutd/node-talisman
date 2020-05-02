import execSh from 'exec-sh';

import messages from '../messages';
import { CONSOLE_COLORS } from '../constants';

import logToConsole, { logToConsoleForDebugging } from '../utils/logToConsole';
import getProcessArgs from '../utils/getProcessArgs';
import wrapTextIfNotWindows from '../utils/wrapTextIfNotWindows';

const wrapTextWithQuotesIfNotWindows = wrapTextIfNotWindows(`"`);

const check: ({
  filePath,
  args,
}: {
  filePath: string;
  args: NodeJS.Process['argv'];
}) => Promise<void> = ({ filePath, args }) => {
  logToConsoleForDebugging({ filePath });

  return new Promise((resolve, reject) => {
    logToConsole(
      { color: CONSOLE_COLORS.cyan },
      messages.check.inProgress.toString(),
    );
    logToConsole();

    execSh(
      [`${wrapTextWithQuotesIfNotWindows(filePath)} ${getProcessArgs(args)}`],
      (error) => {
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
      },
    );
  });
};

export default check;
