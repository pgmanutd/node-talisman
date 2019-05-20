import path from 'path';

declare module 'path' {
  export function __setDirname(newDirname: string): void;
}

const mockedPath = jest.genMockFromModule<typeof path>('path');

let dirname: string;
const __setDirname: typeof path.__setDirname = newDirname => {
  dirname = newDirname;
};

mockedPath.__setDirname = __setDirname;
mockedPath.dirname = jest.fn(() => dirname);

export default mockedPath;
