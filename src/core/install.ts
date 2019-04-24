import messages from '../messages';

import { logToConsoleForDebugging } from '../utils/logToConsole';

import download from './download';
import verifyChecksum from './verifyChecksum';
import writeFile from './writeFile';
import makeExecutable from './makeExecutable';

const install = ({
  url,
  checksum,
  fileBasePath,
  fileName,
  filePath,
}: {
  url: string;
  checksum: string;
  fileBasePath: string;
  fileName: string;
  filePath: string;
}) => {
  logToConsoleForDebugging({ url, checksum, fileBasePath, fileName, filePath });

  return download({ url, name: messages.binary.toString() })
    .then(data => verifyChecksum({ data, checksum }).then(() => data))
    .then(data => writeFile({ fileBasePath, filePath, data }).then(() => data))
    .then(data => makeExecutable({ filePath }).then(() => data));
};

export default install;
