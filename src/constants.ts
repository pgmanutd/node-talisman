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
    '15748f1c19edf4e24561799be50d5d6743d2224b18244c1e8a6c549032c5851d',
  talisman_linux_amd64:
    process.env.TALISMAN_LINUX_AMD64_CHECKSUM ||
    '228220c6c479e8edccf61299855fe76ad2676694aa77d84db600ada7b4d8f552',
  talisman_linux_arm64:
    process.env.TALISMAN_LINUX_ARM64_CHECKSUM ||
    '75fbf6c98998d827793558537a50c90eea7e672966871f1d1174eb783150ab2b',
  // NOTE: Checksum for darwin_386 not present in original checksum file.
  talisman_darwin_386: process.env.TALISMAN_DARWIN_386_CHECKSUM || '',
  talisman_darwin_amd64:
    process.env.TALISMAN_DARWIN_AMD64_CHECKSUM ||
    '48d195c18f4646620397a73f23e72048ca75a6293664adf7724fb69387a52c7d',
  talisman_darwin_arm64:
    process.env.TALISMAN_DARWIN_ARM64_CHECKSUM ||
    'a00f449a80b688f2ca07143ac2eba8edfc12512f22b8060695733cc8ee751872',
  'talisman_windows_386.exe':
    process.env.TALISMAN_WINDOWS_386_CHECKSUM ||
    'e7facc719845b920d7a585664949defc2473e8cc04086f71e8bbe4d09b66a1de',
  'talisman_windows_amd64.exe':
    process.env.TALISMAN_WINDOWS_AMD64_CHECKSUM ||
    '7484ce800ac637302433566d40be637d542cea285978dcc1a30ca9fc987bb09d',
  'talisman_windows_arm64.exe':
    process.env.TALISMAN_WINDOWS_ARM64_CHECKSUM ||
    'c5d3a2edbbfe2edfe80a89ee00b3deb1ef61ee00049303af5bb5e87996a58a95',
};

export const META_INFO = {
  version: process.env.TALISMAN_VERSION || 'v1.35.1',
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
