import os from 'os';

import { getPlatform, getArchitecture, isWindows } from '../getOSDetails';

jest.mock('os');

describe('#getOSDetails', () => {
  describe('#getPlatform', () => {
    test.each`
      platform    | output
      ${'win32'}  | ${'windows'}
      ${'linux'}  | ${'linux'}
      ${'darwin'} | ${'darwin'}
    `('returns $output for passed $platform', ({ platform, output }) => {
      os.__setPlatform(platform);

      expect(getPlatform()).toEqual(output);
    });

    it('should throw ReferenceError when platform is not present in the list', () => {
      const platformNotPresentInList = 'freebsd';

      os.__setPlatform(platformNotPresentInList);

      expect(getPlatform).toThrow(
        new ReferenceError(
          `${platformNotPresentInList} not present in {"macOS":{"key":"darwin","name":"darwin"},"linux":{"key":"linux","name":"linux"},"windows":{"key":"win","name":"windows"}}`,
        ),
      );
    });
  });

  describe('#getArchitecture', () => {
    test.each`
      arch      | output
      ${'ia32'} | ${'386'}
      ${'x64'}  | ${'amd64'}
    `('returns $output for passed $arch', ({ arch, output }) => {
      os.__setArch(arch);

      expect(getArchitecture()).toEqual(output);
    });

    it('should throw ReferenceError when arch is not present in the list', () => {
      const archNotPresentInList = 'arm';

      os.__setArch(archNotPresentInList);

      expect(getArchitecture).toThrow(
        new ReferenceError(
          `${archNotPresentInList} not present in {"threeEightySix":{"key":"32","name":"386"},"sixtyFour":{"key":"64","name":"amd64"}}`,
        ),
      );
    });
  });

  describe('#isWindows', () => {
    test.each`
      platform    | output
      ${'win32'}  | ${true}
      ${'darwin'} | ${false}
    `('returns $output for passed $platform', ({ platform, output }) => {
      os.__setPlatform(platform);

      expect(isWindows()).toEqual(output);
    });
  });
});
