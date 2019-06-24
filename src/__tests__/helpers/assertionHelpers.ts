import clogy from 'clogy';

export const setup = () => ({
  checksum: '123456789',
  responseSuccessStatusCode: 200,
  responseFailedStatusCode: 500,
});

export const verifyClogyNumberOfCalls = (numberOfCalls: number) => {
  it(`should print messages ${numberOfCalls} times`, () => {
    expect(clogy.log).toHaveBeenCalledTimes(numberOfCalls);
  });
};

export const verifyClogyNoOutputByCallIndex = (callIndex: number) => {
  it('should print nothing', () => {
    expect(clogy.log).toHaveBeenNthCalledWith(callIndex);
  });
};

export const verifySuccessDownload = ({
  clogyCallIndexes = [1, 2, 3, 4],
} = {}) => {
  describe('for #download', () => {
    it('should print message when download in progress', () => {
      expect(clogy.log).toHaveBeenNthCalledWith(
        clogyCallIndexes[0],
        '\x1b[1m\x1b[30m\x1b[47m%s\x1b[0m \x1b[1m\x1b[37m\x1b[46m%s\x1b[0m',
        ' TALISMAN >>>> ',
        ' Downloading binary.... ',
      );
    });

    verifyClogyNoOutputByCallIndex(clogyCallIndexes[1]);

    it('should print message when download succeeds', () => {
      expect(clogy.log).toHaveBeenNthCalledWith(
        clogyCallIndexes[2],
        '\x1b[1m\x1b[30m\x1b[47m%s\x1b[0m \x1b[1m\x1b[37m\x1b[42m%s\x1b[0m',
        ' TALISMAN >>>> ',
        ' Successfully downloaded binary!!!! ',
      );
    });

    verifyClogyNoOutputByCallIndex(clogyCallIndexes[3]);
  });
};

export const verifySuccessChecksum = ({ clogyCallIndexes = [5, 6] } = {}) => {
  describe('for #verifyChecksum', () => {
    it('should print message when verify checksum succeeds', () => {
      expect(clogy.log).toHaveBeenNthCalledWith(
        clogyCallIndexes[0],
        '\x1b[1m\x1b[30m\x1b[47m%s\x1b[0m \x1b[1m\x1b[37m\x1b[42m%s\x1b[0m',
        ' TALISMAN >>>> ',
        ' Checksum verification passed!!!! ',
      );
    });

    verifyClogyNoOutputByCallIndex(clogyCallIndexes[1]);
  });
};

export const verifySuccessWriteFile = ({ clogyCallIndexes = [7, 8] } = {}) => {
  describe('for #writeFile', () => {
    it('should print message when file written to disk', () => {
      expect(clogy.log).toHaveBeenNthCalledWith(
        clogyCallIndexes[0],
        '\x1b[1m\x1b[30m\x1b[47m%s\x1b[0m \x1b[1m\x1b[37m\x1b[42m%s\x1b[0m',
        ' TALISMAN >>>> ',
        ' File written to disk!!!! ',
      );
    });

    verifyClogyNoOutputByCallIndex(clogyCallIndexes[1]);
  });
};

export const verifySuccessMakeExecutable = ({
  clogyCallIndexes = [9, 10],
} = {}) => {
  describe('for #makeExecutable', () => {
    it('should print message when binary is made executable', () => {
      expect(clogy.log).toHaveBeenNthCalledWith(
        clogyCallIndexes[0],
        '\x1b[1m\x1b[30m\x1b[47m%s\x1b[0m \x1b[1m\x1b[37m\x1b[42m%s\x1b[0m',
        ' TALISMAN >>>> ',
        ' Made binary executable!!!! ',
      );
    });

    verifyClogyNoOutputByCallIndex(clogyCallIndexes[1]);
  });
};

export const verifySuccessCheck = ({
  clogyCallIndexes = [11, 12, 13, 14],
} = {}) => {
  describe('for #check', () => {
    it('should print message when checking source files', () => {
      expect(clogy.log).toHaveBeenNthCalledWith(
        clogyCallIndexes[0],
        '\x1b[1m\x1b[30m\x1b[47m%s\x1b[0m \x1b[1m\x1b[37m\x1b[46m%s\x1b[0m',
        ' TALISMAN >>>> ',
        ' Checking source files.... ',
      );
    });

    verifyClogyNoOutputByCallIndex(clogyCallIndexes[1]);

    it('should print message when check passed', () => {
      expect(clogy.log).toHaveBeenNthCalledWith(
        clogyCallIndexes[2],
        '\x1b[1m\x1b[30m\x1b[47m%s\x1b[0m \x1b[1m\x1b[37m\x1b[42m%s\x1b[0m',
        ' TALISMAN >>>> ',
        ' Check passed!!!! ',
      );
    });

    verifyClogyNoOutputByCallIndex(clogyCallIndexes[3]);
  });
};
