import path from 'path';

import getDirname from './utils/getDirname';

export const CONSOLE_COLORS = {
  white: '\x1b[1m\x1b[30m\x1b[47m%s\x1b[0m',
  cyan: '\x1b[1m\x1b[37m\x1b[46m%s\x1b[0m',
  red: '\x1b[1m\x1b[37m\x1b[41m%s\x1b[0m',
  green: '\x1b[1m\x1b[37m\x1b[42m%s\x1b[0m',
};

/* eslint-disable @typescript-eslint/camelcase */
export const CHECKSUMS = {
  talisman_linux_386:
    process.env.TALISMAN_LINUX_386_CHECKSUM ||
    'fdb53e0ec0ab1a0c2285015654744b1d83acbcb3ca877c5923f0825b06456085',
  talisman_linux_amd64:
    process.env.TALISMAN_LINUX_AMD64_CHECKSUM ||
    '4358506a05655df05fb2e8ea410146153e46cb27dc0a33b69e71a1f89e8f30aa',
  talisman_darwin_386:
    process.env.TALISMAN_DARWIN_386_CHECKSUM ||
    'af5bbfc4ee9382c1c3cf7889f272f104eac2f586ac9f4f6659841e540861ede6',
  talisman_darwin_amd64:
    process.env.TALISMAN_DARWIN_AMD64_CHECKSUM ||
    '10a209e5c95635de39743fc4bd0245519ba1ec16ae4bee7d0d4a03cdad92818d',
  'talisman_windows_386.exe':
    process.env.TALISMAN_WINDOWS_386_CHECKSUM ||
    'b30f9daf753d7a55482a5d7fd57f3a74ecbfdc550631ea1a70bea4aae419c5b2',
  'talisman_windows_amd64.exe':
    process.env.TALISMAN_WINDOWS_AMD64_CHECKSUM ||
    '1482532cdf6764969aa8ed6fd3f7effd391a6040a209fec1b33571c30e4ad367',
};
/* eslint-enable @typescript-eslint/camelcase */

export const META_INFO = {
  version: process.env.TALISMAN_VERSION || 'v1.1.0',
};

export const PATHS = {
  // TODO: Replace __filename with require('url').fileURLToPath(import.meta.url);
  // when upgraded to node 11
  BINARY: path.resolve(getDirname(__filename), 'bin', META_INFO.version),
};

export const PLATFORMS = {
  macOS: {
    key: 'darwin',
    name: 'darwin',
  },
  linux: {
    key: 'linux',
    name: 'linux',
  },
  windows: {
    key: 'win',
    name: 'windows',
  },
};

export const ARCHITECTURES = {
  threeEightySix: {
    key: '32',
    name: '386',
  },
  sixtyFour: {
    key: '64',
    name: 'amd64',
  },
};
