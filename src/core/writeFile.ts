import fs from 'fs';

import messages from '../messages';
import { CONSOLE_COLORS } from '../constants';
import {
  logToConsole,
  logToConsoleForDebugging,
  doesFileExists,
} from '../utils';

const writeFile: ({
  fileBasePath,
  filePath,
  data,
}: {
  fileBasePath: string;
  filePath: string;
  data: BinaryType;
}) => Promise<undefined> = ({ fileBasePath, filePath, data }) => {
  logToConsoleForDebugging({ fileBasePath, filePath });

  return new Promise((resolve, reject) => {
    try {
      if (!doesFileExists(fileBasePath)) {
        fs.mkdirSync(fileBasePath);
      }

      fs.writeFileSync(filePath, data);

      logToConsole(
        { color: CONSOLE_COLORS.green },
        messages.writeFile.succeed.toString(),
      );
      logToConsole();

      resolve();
    } catch (error) {
      logToConsole(
        { color: CONSOLE_COLORS.red },
        messages.writeFile.failed.toString(),
      );
      logToConsole();

      reject(error);
    }
  });
};

export default writeFile;
