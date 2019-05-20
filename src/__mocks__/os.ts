import os from 'os';

declare module 'os' {
  export function __setPlatform(newPlatform: NodeJS.Platform): void;
  export function __setArch(newArch: string): void;
}

const mockedOS = jest.genMockFromModule<typeof os>('os');

let platform: NodeJS.Platform;
const __setPlatform: typeof os.__setPlatform = newPlatform => {
  platform = newPlatform;
};

mockedOS.__setPlatform = __setPlatform;
mockedOS.platform = jest.fn(() => platform);

let arch: string;
const __setArch: typeof os.__setArch = newArch => {
  arch = newArch;
};

mockedOS.__setArch = __setArch;
mockedOS.arch = jest.fn(() => arch);

export default mockedOS;
