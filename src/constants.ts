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
    'df558fc8d23963827a9cfae6f166e9a95c5b759c69138d2921770ef6d436e0ed ',
  talisman_linux_amd64:
    process.env.TALISMAN_LINUX_AMD64_CHECKSUM ||
    '062baf8c35792ad065930ce63e529847e6765d9b85b487f853d1220b8015aa88 ',
  talisman_linux_arm64: process.env.TALISMAN_LINUX_ARM64_CHECKSUM || '5910a8ff1ff3577a132e08ddad4eba76f5d4f5f0e28a222a724d9b5e99a48213 ',
  // NOTE: Checksum for darwin_386 not present in original checksum file.
  talisman_darwin_386: process.env.TALISMAN_DARWIN_386_CHECKSUM || '',
  talisman_darwin_amd64:
    process.env.TALISMAN_DARWIN_AMD64_CHECKSUM ||
    'c98fa362ec3835850a3acd35dadfdd9661187a9cd5732c1b064d0dd224bb4771 ',
  talisman_darwin_arm64:
    process.env.TALISMAN_DARWIN_ARM64_CHECKSUM ||
    'aa84298b28b9460be7f9aed4aa484ee3d8596cf7f75e50fb61857a23e1d681e1 ',
  'talisman_windows_386.exe':
    process.env.TALISMAN_WINDOWS_386_CHECKSUM ||
    '90a4d3e2c36448c4304be270139c71c23d909046c12bf4c30f98e2870b6a5d23 ',
  'talisman_windows_amd64.exe':
    process.env.TALISMAN_WINDOWS_AMD64_CHECKSUM ||
    '74efe5f763e5b66b3497ea7002f61259a5bf08af703f17113f6e4e2751668775 ',
  'talisman_windows_arm64.exe': process.env.TALISMAN_WINDOWS_ARM64_CHECKSUM || 'c5292360044c2ab077cfd6aa0a1fdde50c9b09be2cab5f0ea22d37902a21d691 ',
};

export const META_INFO = {
  version: process.env.TALISMAN_VERSION || 'v1.29.0',
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
