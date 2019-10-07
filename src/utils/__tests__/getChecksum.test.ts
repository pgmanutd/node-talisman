import getChecksum from '../getChecksum';

describe('#getChecksum', () => {
  test.each`
    data                      | algorithm    | encoding     | output
    ${'abcdefg'}              | ${undefined} | ${undefined} | ${'7d1a54127b222502f5b79b5fb0803061152a44f92b37e23c6527baf665d4da9a'}
    ${'abcdefg'}              | ${'sha1'}    | ${undefined} | ${'2fb5e13419fc89246865e7a324f476ec624e8740'}
    ${'abcdefg'}              | ${'sha1'}    | ${'base64'}  | ${'L7XhNBn8iSRoZeejJPR27GJOh0A='}
    ${Buffer.from('abcdefg')} | ${'sha1'}    | ${'base64'}  | ${'L7XhNBn8iSRoZeejJPR27GJOh0A='}
  `(
    'returns $output for passed $data, $algorithm and $encoding',
    ({ data, algorithm, encoding, output }) => {
      expect(getChecksum(data, algorithm, encoding)).toEqual(output);
    },
  );
});
