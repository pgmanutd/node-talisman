import os from 'os';
import request from 'request';
import execSh from 'exec-sh';

import getChecksum from '../utils/getChecksum';

import {
  setup,
  verifyClogyNumberOfCalls,
  verifySuccessDownload,
  verifySuccessChecksum,
  verifySuccessWriteFile,
  verifySuccessCheck,
} from './helpers/assertionHelpers';

jest.mock('os');
jest.mock('fs');
jest.mock('path');

jest.mock('../utils/getChecksum');
const mockedGetChecksum = getChecksum as jest.Mock;

describe('#windows.integration', () => {
  beforeAll(() => {
    jest.useFakeTimers();

    const { checksum } = setup();

    process.env.TALISMAN_LANGUAGE = 'es';
    process.env.TALISMAN_WINDOWS_AMD64_CHECKSUM = checksum;

    os.__setPlatform('win32');
    os.__setArch('x64');
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

    verifyClogyNumberOfCalls(12);

    verifySuccessDownload();

    verifySuccessChecksum();

    verifySuccessWriteFile();

    verifySuccessCheck({ clogyCallIndexes: [9, 10, 11, 12] });
  });
});
