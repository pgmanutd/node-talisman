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
    '53d3b342450fe421544a9770c1f8caeb470ea7f41bc82d49f84864fa0d79d3cd',
  talisman_linux_amd64:
    process.env.TALISMAN_LINUX_AMD64_CHECKSUM ||
    '45c696f9b8a9722ef5c58cd6a42665357d4e135d9e2e196b9b59ff4b9398bb18',
  talisman_linux_arm64:
    process.env.TALISMAN_LINUX_ARM64_CHECKSUM ||
    'bf36d5d60fbf9e1384c827283712278da9b5047a3cc500f12abdb98a5d67aeda',
  // NOTE: Checksum for darwin_386 not present in original checksum file.
  talisman_darwin_386: process.env.TALISMAN_DARWIN_386_CHECKSUM || '',
  talisman_darwin_amd64:
    process.env.TALISMAN_DARWIN_AMD64_CHECKSUM ||
    '7e43943e63c5aaf89d540f43a09e737e996ab2b19c14a78e81906b22a57e287a',
  talisman_darwin_arm64:
    process.env.TALISMAN_DARWIN_ARM64_CHECKSUM ||
    '82710952e819eb32f1f84f3c722bffed7f373c034f20db1067e2557a4ed23f9a',
  'talisman_windows_386.exe':
    process.env.TALISMAN_WINDOWS_386_CHECKSUM ||
    '93b7b5379a9c620144cf549df9ebe580942e9a4d8f854dda636d24b79a56078a',
  'talisman_windows_amd64.exe':
    process.env.TALISMAN_WINDOWS_AMD64_CHECKSUM ||
    'e3137c7babd4f540d60438cf17c606df49f3f876ce1f8d6721335ae64d378077',
  'talisman_windows_arm64.exe':
    process.env.TALISMAN_WINDOWS_ARM64_CHECKSUM ||
    '19140947e741ef698645a56ee71fcd0f3f8106ddc502e93dec2756d7f1580d28',
};

export const META_INFO = {
  version: process.env.TALISMAN_VERSION || 'v1.33.2',
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
