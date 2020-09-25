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
    'd0558d626a4ee1e90d2c2a5f3c69372a30b8f2c8e390a59cedc15585b0731bc4',
  talisman_linux_amd64:
    process.env.TALISMAN_LINUX_AMD64_CHECKSUM ||
    '22b1aaee860b27306bdf345a0670f138830bcf7fbe16c75be186fe119e9d54b4',
  // NOTE: Checksum for darwin_386 not present in original checksum file.
  talisman_darwin_386: process.env.TALISMAN_DARWIN_386_CHECKSUM || '',
  talisman_darwin_amd64:
    process.env.TALISMAN_DARWIN_AMD64_CHECKSUM ||
    'f30e1ec6fb3e1fc33928622f17d6a96933ca63d5ab322f9ba869044a3075ffda',
  'talisman_windows_386.exe':
    process.env.TALISMAN_WINDOWS_386_CHECKSUM ||
    '98ee5ed4bb394096a643531b7b8d3e6e919cc56e4673add744b46036260527c3',
  'talisman_windows_amd64.exe':
    process.env.TALISMAN_WINDOWS_AMD64_CHECKSUM ||
    '697cebb5988ee002b630b814c6c6f5d49d921c9c3aad4545c4a77d749e5ae833',
};

export const META_INFO = {
  version: process.env.TALISMAN_VERSION || 'v1.8.0',
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
