import path from 'path';

import getDirname from '../getDirname';

jest.mock('path');

describe('#getDirname', () => {
  test.each`
    filePath           | output
    ${'/path/file.ts'} | ${'/path/'}
  `('returns $output for passed $filePath', ({ filePath, output }) => {
    path.__setDirname(output);

    expect(getDirname(filePath)).toEqual(output);
  });
});
