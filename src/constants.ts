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
    'e19c4f277308951c3f13be00ad53d07f216434d2acfca54151f650a5067f14b7',
  talisman_linux_amd64:
    process.env.TALISMAN_LINUX_AMD64_CHECKSUM ||
    '98fb5484eadc481da3016032675ed114a05c41d6d624f9ca525ce181d74ffa43',
  // NOTE: Checksum for darwin_386 not present in original checksum file.
  talisman_darwin_386: process.env.TALISMAN_DARWIN_386_CHECKSUM || '',
  talisman_darwin_amd64:
    process.env.TALISMAN_DARWIN_AMD64_CHECKSUM ||
    '1a3e7f223095fbf4f0cb91a3e1ea6955d331a1ff3a0e7ffc6c45d14dfbdcda25',
  talisman_darwin_arm64:
    process.env.TALISMAN_DARWIN_ARM64_CHECKSUM ||
    '91ef4e207b39c757b618a14733a92be7a40b8fabae0d9d32d520d683e7bd8d3a',
  'talisman_windows_386.exe':
    process.env.TALISMAN_WINDOWS_386_CHECKSUM ||
    '55e1e63c7d5873603e9d4bae8caac5525f245ffcf84cef8e702fa36f8ccf3538',
  'talisman_windows_amd64.exe':
    process.env.TALISMAN_WINDOWS_AMD64_CHECKSUM ||
    '49e55c0ca319d13071979bbf93f1c5884f637f0a206035d9b4fa7c6092730c51',
};

export const META_INFO = {
  version: process.env.TALISMAN_VERSION || 'v1.26.0',
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
