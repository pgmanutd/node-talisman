import path from 'path';

import getDirname from './utils/getDirname';

export const CONSOLE_COLORS = {
  white: '\x1b[1m\x1b[30m\x1b[47m%s\x1b[0m',
  cyan: '\x1b[1m\x1b[37m\x1b[46m%s\x1b[0m',
  red: '\x1b[1m\x1b[37m\x1b[41m%s\x1b[0m',
  green: '\x1b[1m\x1b[37m\x1b[42m%s\x1b[0m',
};

export const CHECKSUMS = {
  talisman_linux_386:
    process.env.TALISMAN_LINUX_386_CHECKSUM ||
    '6074aa68810b098d4b6085623ec3ab48da61363b1bd0feb69b4ef61b8e8c2ed0',
  talisman_linux_amd64:
    process.env.TALISMAN_LINUX_AMD64_CHECKSUM ||
    '2489937228e1611a38c49635834fb096a6eaa08a990d35726f0ff470004a90cf',
  talisman_darwin_386:
    process.env.TALISMAN_DARWIN_386_CHECKSUM ||
    '4d1cb537a54fff0a0e12a13053d2a2e53406d9c71e7349465051df1dfc5d8185',
  talisman_darwin_amd64:
    process.env.TALISMAN_DARWIN_AMD64_CHECKSUM ||
    '72ee52207483faa8e630e6ad22493a1f048c50b460c923ef4e93c1f555089eb4',
  'talisman_windows_386.exe':
    process.env.TALISMAN_WINDOWS_386_CHECKSUM ||
    '1ce60b99d29e424af4476a0c265060b25712fed322663f3602a3f038480c8acb',
  'talisman_windows_amd64.exe':
    process.env.TALISMAN_WINDOWS_AMD64_CHECKSUM ||
    'bfd6f63bf23696a6f92cbee79ae080fa9913fe2b18118c588e8d4510c7a45385',
};

export const META_INFO = {
  version: process.env.TALISMAN_VERSION || 'v1.3.0',
};

export const PATHS = {
  // TODO: Replace __filename with require('url').fileURLToPath(import.meta.url);
  // Need some investigation here. Not working out of box.
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
