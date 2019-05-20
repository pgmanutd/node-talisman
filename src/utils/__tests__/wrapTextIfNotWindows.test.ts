import os from 'os';

import wrapTextIfNotWindows from '../wrapTextIfNotWindows';

jest.mock('os');

describe('#wrapTextIfNotWindows', () => {
  test.each`
    platform    | text       | wrapper       | output
    ${'win32'}  | ${'text1'} | ${'wrapper1'} | ${'text1'}
    ${'darwin'} | ${'text2'} | ${'wrapper2'} | ${'wrapper2text2wrapper2'}
  `(
    'returns $output for passed $platform, $text and $wrapper',
    ({ platform, text, wrapper, output }) => {
      os.__setPlatform(platform);

      expect(wrapTextIfNotWindows(wrapper)(text)).toEqual(output);
    },
  );
});
