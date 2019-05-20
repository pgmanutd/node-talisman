import fs from 'fs';

import doesFileExists from '../doesFileExists';

jest.mock('fs');

describe('#doesFileExists', () => {
  test.each`
    filePath           | output
    ${'/path/file.ts'} | ${true}
  `('returns $output for passed $filePath', ({ filePath, output }) => {
    fs.__setMockFiles({
      [filePath]: 'some content',
    });

    expect(doesFileExists(filePath)).toEqual(output);
  });
});
