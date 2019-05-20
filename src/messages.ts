import createDeepProxy from './utils/createDeepProxy';

const defaultLanguage = 'en';

const messages = {
  [defaultLanguage]: {
    check: {
      inProgress: 'Checking source files....',
      succeed: 'Check passed!!!!',
      failed:
        'Check failed!!!! There might be some security breaches or you might have changed parts of any file listed in ".talismanrc" or the binary itself has some unknown error. If you have changed parts of any file listed in ".talismanrc", Please update ".talismanrc" with latest checksum (https://github.com/thoughtworks/talisman#ignoring-files). For more details, Please check the above report.',
    },
    download: {
      inProgress: 'Downloading {NAME}....',
      succeed: 'Successfully downloaded {NAME}!!!!',
      failed: 'Failed to download {NAME}!!!!',
    },
    makeExecutable: {
      succeed: 'Made binary executable!!!!',
      failed: 'Failed to make binary executable!!!!',
    },
    verifyChecksum: {
      succeed: 'Checksum verification passed!!!!',
      failed: 'Checksum verification failed!!!!',
    },
    writeFile: {
      succeed: 'File written to disk!!!!',
      failed: 'Failed to write file on disk!!!!',
    },
    binary: 'binary',
    keyNotPresentInList: '{KEY} not present in {LIST}',
  },
};

export default createDeepProxy<typeof messages[typeof defaultLanguage]>(
  messages[process.env.TALISMAN_LANGUAGE || defaultLanguage] ||
    messages[defaultLanguage],
);
