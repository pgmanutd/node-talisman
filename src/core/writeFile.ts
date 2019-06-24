import fs from 'fs';

import mkdirp from 'mkdirp';

import messages from '../messages';
import { CONSOLE_COLORS } from '../constants';

import logToConsole, { logToConsoleForDebugging } from '../utils/logToConsole';
import doesFileExists from '../utils/doesFileExists';

const writeFile: ({
  fileBasePath,
  filePath,
  data,
}: {
  fileBasePath: string;
  filePath: string;
  data: BinaryType;
}) => Promise<void> = ({ fileBasePath, filePath, data }) => {
  logToConsoleForDebugging({ fileBasePath, filePath });

  return new Promise((resolve, reject) => {
    try {
      !doesFileExists(fileBasePath) && mkdirp.sync(fileBasePath);

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
