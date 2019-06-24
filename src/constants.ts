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
    'bead7db68874e6c24230dcfebeb0c9185686c68e457a3a0d00830482454131ba',
  talisman_linux_amd64:
    process.env.TALISMAN_LINUX_AMD64_CHECKSUM ||
    'bae93611eb20414d2bc43eda23c30befccf4de1c9f56653786a52255ae37ec31',
  talisman_darwin_386:
    process.env.TALISMAN_DARWIN_386_CHECKSUM ||
    '814875f920fb1d5dc549e9f4b42b147aed337143a6c32143cde3320e4abcdfc9',
  talisman_darwin_amd64:
    process.env.TALISMAN_DARWIN_AMD64_CHECKSUM ||
    'a2dea398aa320f3cd8905ea6b45516161d0d84fcae4d7d30116079b237696a6c',
  'talisman_windows_386.exe':
    process.env.TALISMAN_WINDOWS_386_CHECKSUM ||
    '4e1cfa141ae18b04b673c30d5eac0401e8b0c422f29fa3b7c9563311d1186b28',
  'talisman_windows_amd64.exe':
    process.env.TALISMAN_WINDOWS_AMD64_CHECKSUM ||
    '94eb93134d1ba78ea50c1eeb058b3636cf8715f515bbb74defb5f563915ab90c',
};
/* eslint-enable @typescript-eslint/camelcase */

export const META_INFO = {
  version: process.env.TALISMAN_VERSION || 'v0.4.9',
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
