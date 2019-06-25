import os from 'os';
import fs from 'fs';
import request from 'request';
import execSh from 'exec-sh';
import clogy from 'clogy';

import getChecksum from '../utils/getChecksum';
import doesFileExists from '../utils/doesFileExists';

import {
  setup,
  verifyClogyNumberOfCalls,
  verifyClogyNoOutputByCallIndex,
  verifySuccessDownload,
  verifySuccessChecksum,
  verifySuccessWriteFile,
  verifySuccessMakeExecutable,
  verifySuccessCheck,
} from './helpers/assertionHelpers';

jest.mock('os');
jest.mock('fs');
jest.mock('path');

jest.mock('../utils/getChecksum');
const mockedGetChecksum = getChecksum as jest.Mock;

jest.mock('../utils/doesFileExists');
const mockedDoesFileExists = doesFileExists as jest.Mock;

describe('#posix.integration', () => {
  beforeAll(() => {
    jest.useFakeTimers();

    const { checksum } = setup();

    process.env.TALISMAN_LANGUAGE = 'es';
    process.env.TALISMAN_DARWIN_AMD64_CHECKSUM = checksum;

    os.__setPlatform('darwin');
    os.__setArch('x64');
  });

  describe('when executable does not exists', () => {
    beforeAll(() => {
      mockedDoesFileExists.mockReturnValue(false);
    });

    describe('and application fails because of any reason (in this case; download)', () => {
      const responseError = new Error('Some error');

      beforeAll(() => {
        jest.clearAllMocks();

        const { responseFailedStatusCode } = setup();

        request.__setResponse(responseError, {
          statusCode: responseFailedStatusCode,
        });
      });

      it('should throw error on console', () => {
        return require('../index')
          .default([])
          .then(() => jest.runAllImmediates())
          .catch((error: Error) => {
            expect(error).toBe(responseError);
          });
      });
    });

    describe('and everything succeeds', () => {
      beforeAll(() => {
        jest.clearAllMocks();

        const { checksum, responseSuccessStatusCode } = setup();

        request.__setResponse(undefined, {
          statusCode: responseSuccessStatusCode,
        });
        mockedGetChecksum.mockReturnValue(checksum);
        execSh.__setError(undefined);

        return require('../index').default([]);
      });

      verifyClogyNumberOfCalls(14);

      verifySuccessDownload();

      verifySuccessChecksum();

      verifySuccessWriteFile();

      verifySuccessMakeExecutable();

      verifySuccessCheck();
    });

    describe('and download fails', () => {
      beforeAll(() => {
        jest.clearAllMocks();

        const { responseFailedStatusCode } = setup();

        request.__setResponse(undefined, {
          statusCode: responseFailedStatusCode,
        });

        return require('../index').default([]);
      });

      verifyClogyNumberOfCalls(4);

      describe('for #download', () => {
        it('should print message when download in progress', () => {
          expect(clogy.log).toHaveBeenNthCalledWith(
            1,
            '\x1b[1m\x1b[30m\x1b[47m%s\x1b[0m \x1b[1m\x1b[37m\x1b[46m%s\x1b[0m',
            ' TALISMAN >>>> ',
            ' Downloading binary.... ',
          );
        });

        verifyClogyNoOutputByCallIndex(2);

        it('should print message when download fails', () => {
          expect(clogy.log).toHaveBeenNthCalledWith(
            3,
            '\x1b[1m\x1b[30m\x1b[47m%s\x1b[0m \x1b[1m\x1b[37m\x1b[41m%s\x1b[0m',
            ' TALISMAN >>>> ',
            ' Failed to download binary!!!! ',
          );
        });

        verifyClogyNoOutputByCallIndex(4);
      });
    });

    describe('and verify checksum fails', () => {
      beforeAll(() => {
        jest.clearAllMocks();

        const { responseSuccessStatusCode } = setup();

        request.__setResponse(undefined, {
          statusCode: responseSuccessStatusCode,
        });
        mockedGetChecksum.mockReturnValue('23456');

        return require('../index').default([]);
      });

      verifyClogyNumberOfCalls(6);

      verifySuccessDownload();

      describe('for #verifyChecksum', () => {
        it('should print message when verify checksum fails', () => {
          expect(clogy.log).toHaveBeenNthCalledWith(
            5,
            '\x1b[1m\x1b[30m\x1b[47m%s\x1b[0m \x1b[1m\x1b[37m\x1b[41m%s\x1b[0m',
            ' TALISMAN >>>> ',
            ' Checksum verification failed!!!! ',
          );
        });

        verifyClogyNoOutputByCallIndex(6);
      });
    });

    describe('and file writing fails', () => {
      beforeAll(() => {
        jest.clearAllMocks();

        const { checksum, responseSuccessStatusCode } = setup();

        request.__setResponse(undefined, {
          statusCode: responseSuccessStatusCode,
        });
        mockedGetChecksum.mockReturnValue(checksum);
        (fs.writeFileSync as jest.Mock).mockImplementationOnce(() => {
          throw new Error('File Error');
        });

        return require('../index').default([]);
      });

      verifyClogyNumberOfCalls(8);

      verifySuccessDownload();

      verifySuccessChecksum();

      describe('for #writeFile', () => {
        it('should print message when failed to write file on disk', () => {
          expect(clogy.log).toHaveBeenNthCalledWith(
            7,
            '\x1b[1m\x1b[30m\x1b[47m%s\x1b[0m \x1b[1m\x1b[37m\x1b[41m%s\x1b[0m',
            ' TALISMAN >>>> ',
            ' Failed to write file on disk!!!! ',
          );
        });

        verifyClogyNoOutputByCallIndex(8);
      });
    });

    describe('and make executable fails', () => {
      beforeAll(() => {
        jest.clearAllMocks();

        const { checksum, responseSuccessStatusCode } = setup();

        request.__setResponse(undefined, {
          statusCode: responseSuccessStatusCode,
        });
        mockedGetChecksum.mockReturnValue(checksum);
        execSh.__setError(new Error('chmod'));

        return require('../index').default([]);
      });

      verifyClogyNumberOfCalls(10);

      verifySuccessDownload();

      verifySuccessChecksum();

      verifySuccessWriteFile();

      describe('for #makeExecutable', () => {
        it('should print message when failed to make binary executable', () => {
          expect(clogy.log).toHaveBeenNthCalledWith(
            9,
            '\x1b[1m\x1b[30m\x1b[47m%s\x1b[0m \x1b[1m\x1b[37m\x1b[41m%s\x1b[0m',
            ' TALISMAN >>>> ',
            ' Failed to make binary executable!!!! ',
          );
        });

        verifyClogyNoOutputByCallIndex(10);
      });
    });

    describe('and talisman check fails', () => {
      const inputArgs = ['node', ' filename', '--checkFails'];

      beforeAll(() => {
        jest.clearAllMocks();

        const { checksum, responseSuccessStatusCode } = setup();

        request.__setResponse(undefined, {
          statusCode: responseSuccessStatusCode,
        });
        mockedGetChecksum.mockReturnValue(checksum);
        execSh.__setError(new Error(inputArgs[2]));

        return require('../index').default(inputArgs);
      });

      verifyClogyNumberOfCalls(14);

      verifySuccessDownload();

      verifySuccessChecksum();

      verifySuccessWriteFile();

      verifySuccessMakeExecutable();

      describe('for #check', () => {
        it('should print message when checking source files', () => {
          expect(clogy.log).toHaveBeenNthCalledWith(
            11,
            '\x1b[1m\x1b[30m\x1b[47m%s\x1b[0m \x1b[1m\x1b[37m\x1b[46m%s\x1b[0m',
            ' TALISMAN >>>> ',
            ' Checking source files.... ',
          );
        });

        verifyClogyNoOutputByCallIndex(12);

        it('should print message when check fails', () => {
          expect(clogy.log).toHaveBeenNthCalledWith(
            13,
            '\x1b[1m\x1b[30m\x1b[47m%s\x1b[0m \x1b[1m\x1b[37m\x1b[41m%s\x1b[0m',
            ' TALISMAN >>>> ',
            ' Check failed!!!! There might be some security breaches or you might have changed parts of any file listed in ".talismanrc" or the binary itself has some unknown error. If you have changed parts of any file listed in ".talismanrc", Please update ".talismanrc" with latest checksum (https://github.com/thoughtworks/talisman#ignoring-files). For more details, Please check the above report. ',
          );
        });

        verifyClogyNoOutputByCallIndex(14);
      });
    });
  });

  describe('when executable exists', () => {
    beforeAll(() => {
      mockedDoesFileExists.mockReturnValue(true);
    });

    describe('and everything succeeds', () => {
      beforeAll(() => {
        jest.clearAllMocks();

        const { checksum, responseSuccessStatusCode } = setup();

        request.__setResponse(undefined, {
          statusCode: responseSuccessStatusCode,
        });
        mockedGetChecksum.mockReturnValue(checksum);
        execSh.__setError(undefined);

        return require('../index').default([]);
      });

      verifyClogyNumberOfCalls(4);

      verifySuccessCheck({
        clogyCallIndexes: [1, 2, 3, 4],
      });
    });
  });
});
