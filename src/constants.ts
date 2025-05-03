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
    '8de2384ecd56fbf1d51b08db4670a067b3209244a1707ed941ec64ee3af0041f',
  talisman_linux_amd64:
    process.env.TALISMAN_LINUX_AMD64_CHECKSUM ||
    '8e0ae8bb7b160bf10c4fa1448beb04a32a35e63505b3dddff74a092bccaaa7e4',
  talisman_linux_arm64:
    process.env.TALISMAN_LINUX_ARM64_CHECKSUM ||
    'ca706f428a45d7a4ed3cc5c3cf7b3e5b0dfce6f2f584000a117d0d602a0342b7',
  // NOTE: Checksum for darwin_386 not present in original checksum file.
  talisman_darwin_386: process.env.TALISMAN_DARWIN_386_CHECKSUM || '',
  talisman_darwin_amd64:
    process.env.TALISMAN_DARWIN_AMD64_CHECKSUM ||
    '9a67e015d6c99650c45d653ce4a597f885bf661164c2671f08a3827013b277fb',
  talisman_darwin_arm64:
    process.env.TALISMAN_DARWIN_ARM64_CHECKSUM ||
    '4806746b2ba0190941f0606853990b4da6eb7df2d64c261212a6aa66eb6b15c2',
  'talisman_windows_386.exe':
    process.env.TALISMAN_WINDOWS_386_CHECKSUM ||
    '06baa1703b9e50c67567aafc92aa699929a54069f0ca6df1cb6a99fe36c98538',
  'talisman_windows_amd64.exe':
    process.env.TALISMAN_WINDOWS_AMD64_CHECKSUM ||
    '64b4f61fadd254f0bf32b5411e678564a8f201bd61a811105e286495df644be1',
  'talisman_windows_arm64.exe':
    process.env.TALISMAN_WINDOWS_ARM64_CHECKSUM ||
    'ce3649680a427fa1204b418c9e5b67c83f32737c1426993796cd9ee6cde1ebc9',
};

export const META_INFO = {
  version: process.env.TALISMAN_VERSION || 'v1.37.0',
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
