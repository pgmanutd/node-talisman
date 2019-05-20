import path from 'path';

import { CHECKSUMS, PATHS, META_INFO } from '../constants';

import { isWindows, getPlatform, getArchitecture } from '../utils/getOSDetails';
import doesFileExists from '../utils/doesFileExists';

import install from './install';
import check from './check';

const fileName = `talisman_${getPlatform()}_${getArchitecture()}${
  isWindows() ? '.exe' : ''
}`;
const url = `https://github.com/thoughtworks/talisman/releases/download/${
  META_INFO.version
}/${fileName}`;
const checksum = CHECKSUMS[fileName as keyof typeof CHECKSUMS];

const fileBasePath = PATHS.BINARY;
const filePath = path.resolve(fileBasePath, fileName);

const runner = (args: NodeJS.Process['argv']) => {
  if (doesFileExists(filePath)) {
    return check({ filePath, args });
  }

  return install({ url, checksum, fileBasePath, fileName, filePath }).then(() =>
    check({ filePath, args }),
  );
};

export default runner;
