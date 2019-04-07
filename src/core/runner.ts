import path from 'path';

import { CHECKSUMS, PATHS, META_INFO } from '../constants';
import {
  isWindows,
  getPlatform,
  getArchitecture,
  doesFileExists,
} from '../utils';

import install from './install';
import check from './check';

const { version } = META_INFO;

const fileBasePath = PATHS.BINARY;
const fileName = `talisman_${getPlatform()}_${getArchitecture()}${
  isWindows ? '.exe' : ''
}`;
const filePath = path.resolve(fileBasePath, fileName);
const url = `https://github.com/thoughtworks/talisman/releases/download/${version}/${fileName}`;
const checksum = CHECKSUMS[fileName as keyof typeof CHECKSUMS];

const runner = (args: NodeJS.Process['argv']) => {
  if (doesFileExists(filePath)) {
    return check({ filePath, args });
  }

  return install({ url, checksum, fileBasePath, fileName, filePath }).then(() =>
    check({ filePath, args }),
  );
};

export default runner;
