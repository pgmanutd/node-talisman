import request from 'request';

import messages from '../messages';
import { CONSOLE_COLORS } from '../constants';
import { logToConsole, logToConsoleForDebugging } from '../utils';

const download: ({
  url,
  name,
}: {
  url: string;
  name: string;
}) => Promise<BinaryType> = ({ url, name }) => {
  logToConsoleForDebugging({ url, name });

  return new Promise((resolve, reject) => {
    logToConsole(
      { color: CONSOLE_COLORS.cyan },
      messages.download.inProgress({ NAME: name }),
    );
    logToConsole();

    request(
      {
        url,
        encoding: null,
      },
      (error, response, data) => {
        if (!error && response.statusCode === 200) {
          logToConsole(
            { color: CONSOLE_COLORS.green },
            messages.download.succeed({ NAME: name }),
          );
          logToConsole();

          return resolve(data);
        }

        logToConsole(
          { color: CONSOLE_COLORS.red },
          messages.download.failed({ NAME: name }),
        );
        logToConsole();

        return reject(error);
      },
    );
  });
};

export default download;
