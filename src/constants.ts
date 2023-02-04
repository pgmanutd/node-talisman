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
    '1de45716f82ecbad90b10c52263ae1ac6b73a4bc6a4ffb46db403d09fd12c4f6',
  talisman_linux_amd64:
    process.env.TALISMAN_LINUX_AMD64_CHECKSUM ||
    '4b416431264bfe079f12faf71426ae7fbdd36b5c499c9b80b274b61d75f82059',
  talisman_linux_arm64:
    process.env.TALISMAN_LINUX_ARM64_CHECKSUM ||
    'e9e034836671166c11200b9a71c4e4c4e6b25a1da393d3827fe928cf92550d0c',
  // NOTE: Checksum for darwin_386 not present in original checksum file.
  talisman_darwin_386: process.env.TALISMAN_DARWIN_386_CHECKSUM || '',
  talisman_darwin_amd64:
    process.env.TALISMAN_DARWIN_AMD64_CHECKSUM ||
    'ffdd6be5db7c057d9fa7dea54b6747a6737ed3c4c3453560cc1ceecc4bd07be1',
  talisman_darwin_arm64:
    process.env.TALISMAN_DARWIN_ARM64_CHECKSUM ||
    'ca2ad08aef94f460c43a72c1e4088a3637d117dc8d567366854e40ecd0d395cb',
  'talisman_windows_386.exe':
    process.env.TALISMAN_WINDOWS_386_CHECKSUM ||
    '34f482a08532098060d9e802227e93a8f7463699eef793b20941ed326d048304',
  'talisman_windows_amd64.exe':
    process.env.TALISMAN_WINDOWS_AMD64_CHECKSUM ||
    'd9fb04432db773378e8b55d2dffa84f84ffefd73bdf8ac23bec081f5644b3380',
  'talisman_windows_arm64.exe':
    process.env.TALISMAN_WINDOWS_ARM64_CHECKSUM ||
    'cc936692ca4ae764abe73c9560e6035f52e67f76ad21322967cab09845591626',
};

export const META_INFO = {
  version: process.env.TALISMAN_VERSION || 'v1.30.0',
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
