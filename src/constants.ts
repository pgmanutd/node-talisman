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
    '97f6bf4f1af890d34cb5cace4935acfa894f10437ed081c4f53032051688edb6 ',
  talisman_linux_amd64:
    process.env.TALISMAN_LINUX_AMD64_CHECKSUM ||
    'ae7df043870348dc73327bce300b42990a08f60df057f6f9b9cd715f3f4943a5 ',
  talisman_linux_arm64: process.env.TALISMAN_LINUX_ARM64_CHECKSUM || 'b23ad54d8883c25c20a34e8f4b0cad8c38314a36ddf8457f17bcbf3fcddd5995 ',
  // NOTE: Checksum for darwin_386 not present in original checksum file.
  talisman_darwin_386: process.env.TALISMAN_DARWIN_386_CHECKSUM || '',
  talisman_darwin_amd64:
    process.env.TALISMAN_DARWIN_AMD64_CHECKSUM ||
    '8b3c2a14c97059a99b597b34a3234299fe990609debf8411add66fd5a83232cc ',
  talisman_darwin_arm64:
    process.env.TALISMAN_DARWIN_ARM64_CHECKSUM ||
    '54da220c7dfc3e979d470ebbee18a40d79ef73acd2e7e252420b0da53b41ed7a ',
  'talisman_windows_386.exe':
    process.env.TALISMAN_WINDOWS_386_CHECKSUM ||
    '603c951ef2d07b9832cbbe1f1fce64a653914aca5062ff7627e4ee6da20a228c ',
  'talisman_windows_amd64.exe':
    process.env.TALISMAN_WINDOWS_AMD64_CHECKSUM ||
    'c490cc9405e94f858a78f41633c820d2e104d9fb4ef5fa9cfb2f3204621e1827 ',
  'talisman_windows_arm64.exe': process.env.TALISMAN_WINDOWS_ARM64_CHECKSUM || '13e4dc9f8e5cbbc3c7c2b0e9ebdcd169733018a72bd61e1308574dd1369f6a9f ',
};

export const META_INFO = {
  version: process.env.TALISMAN_VERSION || 'v1.28.1',
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
