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
    '945cd2b943864436c0164c745d346954dc1505e99d063981238e4da1c7df7e93 ',
  talisman_linux_amd64:
    process.env.TALISMAN_LINUX_AMD64_CHECKSUM ||
    '87b32e5fd48ab710b4d63fe0e5098612df54e9a8afdb9c57968ee63fb1a0449d ',
  talisman_linux_arm64: process.env.TALISMAN_LINUX_ARM64_CHECKSUM || 'f0beadec8603e668110739c19bc01a1877b0d3e73fb5171a83b0a4c08a091c6d ',
  // NOTE: Checksum for darwin_386 not present in original checksum file.
  talisman_darwin_386: process.env.TALISMAN_DARWIN_386_CHECKSUM || '',
  talisman_darwin_amd64:
    process.env.TALISMAN_DARWIN_AMD64_CHECKSUM ||
    'bb60979a0990a11a532dd80b71485038baa2ead4ce0fc52ddbba8f1c559e3086 ',
  talisman_darwin_arm64:
    process.env.TALISMAN_DARWIN_ARM64_CHECKSUM ||
    '1436ce5e9ab96ed7adcd0a8c4959d3dd5461878ad4be8225365f82d9b5c2fc3b ',
  'talisman_windows_386.exe':
    process.env.TALISMAN_WINDOWS_386_CHECKSUM ||
    '446e111ad63e98a8a5a32a4dde4818c1c9895f95137d3c4f7b3b5cfe559ecfa0 ',
  'talisman_windows_amd64.exe':
    process.env.TALISMAN_WINDOWS_AMD64_CHECKSUM ||
    '84b0618c9f68127ad3d0f21faf986f47bd1d0359195b6e9f67a38077217ae998 ',
  'talisman_windows_arm64.exe': process.env.TALISMAN_WINDOWS_ARM64_CHECKSUM || '6ddcc8dc7ed2858773e6261a74e7c0a026df4c653b23a793e80f5f7709633000 ',
};

export const META_INFO = {
  version: process.env.TALISMAN_VERSION || 'v1.29.1',
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
