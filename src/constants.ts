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
    '3769aaea3f6c80f586210f23d2649a0670389386e96fd74077f684ad8c9f6413',
  talisman_linux_amd64:
    process.env.TALISMAN_LINUX_AMD64_CHECKSUM ||
    '2da76b7785acc145063836986b42f673bddcba99703f2831cdce1768e62c6e42',
  talisman_darwin_386:
    process.env.TALISMAN_DARWIN_386_CHECKSUM ||
    'dfedf78ee7aac4895ace817b02ece30bf7a7834d977b001ce6e7be0483cd1872',
  talisman_darwin_amd64:
    process.env.TALISMAN_DARWIN_AMD64_CHECKSUM ||
    'a1bfa411fc775129108e137e779478497d05cd52e7dd1768400641ed48c37237',
  'talisman_windows_386.exe':
    process.env.TALISMAN_WINDOWS_386_CHECKSUM ||
    '04f1a4dcbe18673c6771ece5f4d57d46014ac9dded3c685869a4be1252b3878b',
  'talisman_windows_amd64.exe':
    process.env.TALISMAN_WINDOWS_AMD64_CHECKSUM ||
    '493e4dc1ca8a3731734641b3b4700831b93a243bf70ecf96b304a70e5f580ee5',
};
/* eslint-enable @typescript-eslint/camelcase */

export const META_INFO = {
  version: process.env.TALISMAN_VERSION || 'v1.0.0',
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
