/* eslint-disable no-console, @typescript-eslint/no-var-requires, import/no-extraneous-dependencies */

const request = require('request');
const execShPromise = require('exec-sh').promise;
const replace = require('replace-in-file');

const pkg = require('../../package.json');

const pkgVersion = pkg.version;

const publishNewTag = async ({ newVersion }) => {
  await execShPromise(`npm run publish -- ${newVersion} --preview`, {
    cwd: process.cwd(),
  });
};

const commitChanges = async ({ newVersion }) => {
  await execShPromise(
    [
      'git add --all',
      `git commit -m "build(tw-talisman): upgrade from ${pkgVersion} to ${newVersion}" -n`,
    ],
    { cwd: process.cwd() },
  );
};

const replaceChecksumsInFiles = async ({ checksums }) => {
  const stringifiedChecksums = JSON.stringify(checksums);

  await execShPromise(
    `npx jscodeshift --parser=ts --extensions=ts --transform scripts/release/transform.js src/constants.ts --checksums='${stringifiedChecksums}'`,
    { cwd: process.cwd() },
  );
};

const replaceVersionsInFiles = ({ tagName }) => {
  const cwd = process.cwd();

  try {
    const changedFiles = replace.sync({
      files: [`${cwd}/README.md`, `${cwd}/src/constants.ts`],
      from: new RegExp(`v${pkgVersion}`, 'g'),
      to: tagName,
    });

    console.log('Modified files after replacing versions:', changedFiles);
  } catch (error) {
    console.error('Error occurred while replacing versions:', error);
  }
};

const extractChecksumsFromContent = ({ content, checksumNames }) => {
  return checksumNames.reduce((accum, checksumName) => {
    const groupKey = checksumName.replace('.', '_');
    const matchedValue = content.match(
      `(?<${groupKey}>.*) [*]${checksumName}[\n\r]*`,
    );

    if (!matchedValue) {
      return accum;
    }

    return {
      ...accum,
      [checksumName]: matchedValue.groups[groupKey],
    };
  }, {});
};

const getChecksumFileContent = ({ tagName }) => {
  return new Promise((resolve, reject) => {
    request(
      {
        url: `https://github.com/thoughtworks/talisman/releases/download/${tagName}/checksums`,
      },
      (error, response, data) => {
        if (!error && response.statusCode === 200) {
          return resolve(data);
        }

        return reject(error);
      },
    );
  });
};

const getNextTagName = () => {
  return new Promise((resolve, reject) => {
    request(
      {
        uri: 'https://api.github.com/repos/thoughtworks/talisman/releases',
        headers: {
          'User-Agent': 'talisman',
        },
        json: true,
      },
      (error, { body, statusCode }) => {
        if (!error && statusCode === 200) {
          const index = body.findIndex(({ tag_name: tagName }) =>
            tagName.includes(pkgVersion),
          );

          if (index === 0) {
            return resolve();
          }

          const nextRelease = body[index - 1];

          if (nextRelease.draft || nextRelease.prerelease) {
            return resolve();
          }

          return resolve(nextRelease.tag_name);
        }

        return reject(error);
      },
    );
  });
};

(async () => {
  try {
    const tagName = await getNextTagName();

    if (tagName) {
      const newVersion = tagName.replace('v', '');

      const checksumFileContent = await getChecksumFileContent({ tagName });
      const checksums = extractChecksumsFromContent({
        content: checksumFileContent,
        checksumNames: [
          'talisman_linux_386',
          'talisman_linux_amd64',
          'talisman_darwin_386',
          'talisman_darwin_amd64',
          'talisman_windows_386.exe',
          'talisman_windows_amd64.exe',
        ],
      });

      replaceVersionsInFiles({ tagName });

      await replaceChecksumsInFiles({ checksums });

      await commitChanges({ newVersion });

      await publishNewTag({ newVersion });
    }
  } catch (error) {
    setImmediate(() => {
      throw error;
    });
  }
})();
