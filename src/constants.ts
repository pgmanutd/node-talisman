import path from 'path';
import { URL } from 'url';

export const CONSOLE_COLORS = {
  white: '\x1b[1m\x1b[30m\x1b[47m%s\x1b[0m',
  cyan: '\x1b[1m\x1b[37m\x1b[46m%s\x1b[0m',
  red: '\x1b[1m\x1b[37m\x1b[41m%s\x1b[0m',
  green: '\x1b[1m\x1b[37m\x1b[42m%s\x1b[0m',
};

export const CHECKSUMS = {
  talisman_linux_386:
    process.env.TALISMAN_LINUX_386_CHECKSUM ||
    '0c8c127f35f2139da15257e7660eef359f3cfd4071333144ac85e474d2f84ae6',
  talisman_linux_amd64:
    process.env.TALISMAN_LINUX_AMD64_CHECKSUM ||
    'c0eb81bc990c9d687f8e52b40eb6c33d877e50e79632c85bda9c05b0fc060e59',
  talisman_darwin_386:
    process.env.TALISMAN_DARWIN_386_CHECKSUM ||
    '5b9844dbaab739757d6f3f790f473f8b92205005d95f227214652f25e22da4ca',
  talisman_darwin_amd64:
    process.env.TALISMAN_DARWIN_AMD64_CHECKSUM ||
    'f13c58a1cccc24bad46f84d4d8c1de286f556d0a120cd151787491ca7b76c287',
  'talisman_windows_386.exe':
    process.env.TALISMAN_WINDOWS_386_CHECKSUM ||
    '781b249d675bfee514eff8007e44c71e4db6e2781168568bd35bebe400c4ff36',
  'talisman_windows_amd64.exe':
    process.env.TALISMAN_WINDOWS_AMD64_CHECKSUM ||
    '0a5275d0a5d2ea65d96b8c929c3d351e304baf9cf1e2332ec8e2d6d83aed84ec',
};

export const META_INFO = {
  version: process.env.TALISMAN_VERSION || 'v0.4.6',
};

export const PATHS = {
  BINARY: path.resolve(
    path.dirname(new URL(import.meta.url).pathname),
    'bin',
    META_INFO.version,
  ),
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
