import os from 'os';
import request from 'request';
import execSh from 'exec-sh';
import clogy from 'clogy';

jest.mock('os');
jest.mock('fs');
jest.mock('path');

describe('#unix.integration', () => {
  describe('when executable does not exists', () => {
    describe('and everything succeeds', () => {
      let initialChecksum: string | undefined;

      beforeEach(() => {
        initialChecksum = process.env.TALISMAN_DARWIN_AMD64_CHECKSUM;

        process.env.TALISMAN_DARWIN_AMD64_CHECKSUM =
          '7d1a54127b222502f5b79b5fb0803061152a44f92b37e23c6527baf665d4da9a';

        os.__setPlatform('darwin');
        os.__setArch('x64');
        request.__setResponse(undefined, { statusCode: 200 }, 'abcdefg');
        execSh.__setError(undefined);

        require('../index').default([]);
      });

      afterEach(() => {
        process.env.TALISMAN_DARWIN_AMD64_CHECKSUM = initialChecksum;
      });

      describe('for #downloading', () => {
        it('should print message when download in progress', () => {
          expect(clogy.log).toHaveBeenNthCalledWith(
            1,
            '\x1b[1m\x1b[30m\x1b[47m%s\x1b[0m \x1b[1m\x1b[37m\x1b[46m%s\x1b[0m',
            ' TALISMAN >>>> ',
            ' Downloading binary.... ',
          );
        });

        it('should print nothing', () => {
          expect(clogy.log).toHaveBeenNthCalledWith(2);
        });

        it('should print message when download succeeds', () => {
          expect(clogy.log).toHaveBeenNthCalledWith(
            3,
            '\x1b[1m\x1b[30m\x1b[47m%s\x1b[0m \x1b[1m\x1b[37m\x1b[42m%s\x1b[0m',
            ' TALISMAN >>>> ',
            ' Successfully downloaded binary!!!! ',
          );
        });

        it('should print nothing', () => {
          expect(clogy.log).toHaveBeenNthCalledWith(4);
        });
      });

      describe('for #verifyChecksum', () => {
        it('should print message when verify checksum succeeds', () => {
          expect(clogy.log).toHaveBeenNthCalledWith(
            5,
            '\x1b[1m\x1b[30m\x1b[47m%s\x1b[0m \x1b[1m\x1b[37m\x1b[42m%s\x1b[0m',
            ' TALISMAN >>>> ',
            ' Checksum verification passed!!!! ',
          );
        });

        it('should print nothing', () => {
          expect(clogy.log).toHaveBeenNthCalledWith(6);
        });
      });

      describe('for #writeFile', () => {
        it('should print message when file written to disk', () => {
          expect(clogy.log).toHaveBeenNthCalledWith(
            7,
            '\x1b[1m\x1b[30m\x1b[47m%s\x1b[0m \x1b[1m\x1b[37m\x1b[42m%s\x1b[0m',
            ' TALISMAN >>>> ',
            ' File written to disk!!!! ',
          );
        });

        it('should print nothing', () => {
          expect(clogy.log).toHaveBeenNthCalledWith(8);
        });
      });

      describe('for #makeExecutable', () => {
        it('should print message when binary is made executable', () => {
          expect(clogy.log).toHaveBeenNthCalledWith(
            9,
            '\x1b[1m\x1b[30m\x1b[47m%s\x1b[0m \x1b[1m\x1b[37m\x1b[42m%s\x1b[0m',
            ' TALISMAN >>>> ',
            ' Made binary executable!!!! ',
          );
        });

        it('should print nothing', () => {
          expect(clogy.log).toHaveBeenNthCalledWith(10);
        });
      });

      describe('for #check', () => {
        it('should print message when checking source files', () => {
          expect(clogy.log).toHaveBeenNthCalledWith(
            11,
            '\x1b[1m\x1b[30m\x1b[47m%s\x1b[0m \x1b[1m\x1b[37m\x1b[46m%s\x1b[0m',
            ' TALISMAN >>>> ',
            ' Checking source files.... ',
          );
        });

        it('should print nothing', () => {
          expect(clogy.log).toHaveBeenNthCalledWith(12);
        });

        it('should print message when check passed', () => {
          expect(clogy.log).toHaveBeenNthCalledWith(
            13,
            '\x1b[1m\x1b[30m\x1b[47m%s\x1b[0m \x1b[1m\x1b[37m\x1b[42m%s\x1b[0m',
            ' TALISMAN >>>> ',
            ' Check passed!!!! ',
          );
        });

        it('should print nothing', () => {
          expect(clogy.log).toHaveBeenNthCalledWith(14);
        });
      });
    });
  });
});
