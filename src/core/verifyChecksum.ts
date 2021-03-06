import messages from '../messages';
import { CONSOLE_COLORS } from '../constants';

import logToConsole, { logToConsoleForDebugging } from '../utils/logToConsole';
import getChecksum from '../utils/getChecksum';

const verifyChecksum: ({
  data,
  checksum,
}: {
  data: BinaryType;
  checksum: string;
}) => Promise<boolean> = ({ data, checksum }) => {
  logToConsoleForDebugging({ checksum });

  return new Promise((resolve, reject) => {
    const isChecksumEqual = getChecksum(data) === checksum;

    logToConsoleForDebugging({ isChecksumEqual });

    if (isChecksumEqual) {
      logToConsole(
        { color: CONSOLE_COLORS.green },
        messages.verifyChecksum.succeed.toString(),
      );
      logToConsole();

      return resolve(isChecksumEqual);
    }

    const errorMessage = messages.verifyChecksum.failed.toString();

    logToConsole({ color: CONSOLE_COLORS.red }, errorMessage);
    logToConsole();

    return reject(new Error(errorMessage));
  });
};

export default verifyChecksum;
