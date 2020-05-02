import fs from 'fs';

declare module 'fs' {
  export function __setMockFiles(newMockFiles: DynamicObject): void;
}

const mockedFS = jest.genMockFromModule<typeof fs>('fs');

const mockFiles = new Map();
const __setMockFiles: typeof fs.__setMockFiles = (newMockFiles) => {
  mockFiles.clear();

  Object.keys(newMockFiles).forEach((fileName) => {
    mockFiles.set(fileName, newMockFiles[fileName]);
  });
};

mockedFS.__setMockFiles = __setMockFiles;
mockedFS.existsSync = jest.fn((filePath: fs.PathLike) =>
  mockFiles.has(filePath),
);

export default mockedFS;
