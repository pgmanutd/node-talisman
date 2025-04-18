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
    '30d39314fc01cf18f395d096f01fb5b87bcbedc68ec49867d8d5c529fb2ee6ac',
  talisman_linux_amd64:
    process.env.TALISMAN_LINUX_AMD64_CHECKSUM ||
    'a2ee9f6ae88d42b9d13b378c0f6e3337a5c2bca9d0f880c092de11851f579547',
  talisman_linux_arm64:
    process.env.TALISMAN_LINUX_ARM64_CHECKSUM ||
    'b6f0ac5885246271c18a334d630cb87eb92fc68557632887f66d62504b02f291',
  // NOTE: Checksum for darwin_386 not present in original checksum file.
  talisman_darwin_386: process.env.TALISMAN_DARWIN_386_CHECKSUM || '',
  talisman_darwin_amd64:
    process.env.TALISMAN_DARWIN_AMD64_CHECKSUM ||
    'e0cc4362cf80e07fe9274336a888aba25d918ef42fc5032dc63eaf5081f9da3a',
  talisman_darwin_arm64:
    process.env.TALISMAN_DARWIN_ARM64_CHECKSUM ||
    'cd5d995216f078658f44e3a0e4e6cf7cd17dc0209730ae49f1a79f3fb06722fd',
  'talisman_windows_386.exe':
    process.env.TALISMAN_WINDOWS_386_CHECKSUM ||
    'd7c58e96c1faae72e7020f542df1f3479564d905e2a72e4d4a20b2a7a0b060d2',
  'talisman_windows_amd64.exe':
    process.env.TALISMAN_WINDOWS_AMD64_CHECKSUM ||
    '2bd48992b9782a0d433045993090ffba84fb1ae16ccd08b63e68159f910eaa7e',
  'talisman_windows_arm64.exe':
    process.env.TALISMAN_WINDOWS_ARM64_CHECKSUM ||
    'a5b5c7d78e28e51d9ed6499cc34925a6b09b65db0a02a5363903db82d42d0b2d',
};

export const META_INFO = {
  version: process.env.TALISMAN_VERSION || 'v1.35.0',
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
