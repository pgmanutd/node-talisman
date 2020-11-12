/* eslint-disable no-console, @typescript-eslint/no-var-requires, import/no-extraneous-dependencies */

require('ts-node').register();

const fs = require('fs');

const request = require('request');
const execShPromise = require('exec-sh').promise;
const replace = require('replace-in-file');

const { CHECKSUMS, META_INFO } = require('../../src/constants');

const oldVersion = META_INFO.version.replace('v', '');

const publishNewTag = async ({ newVersion }) => {
  await execShPromise(`npm run publish -- ${newVersion} --no-release-draft`, {
    cwd: process.cwd(),
  });
};

const commitChanges = async ({ newVersion }) => {
  await execShPromise(
    [
      'git add --all',
      `git commit -m "build(tw-talisman): upgrade from ${oldVersion} to ${newVersion}" -n`,
    ],
    { cwd: process.cwd() },
  );
};

const replaceChecksumsInFiles = async ({ checksums }) => {
  const stringifiedChecksums = JSON.stringify(checksums);
  const cwd = process.cwd();
  const file = 'src/constants.ts';

  const originalStats = fs.statSync(`${cwd}/${file}`);

  await execShPromise(
    `npx jscodeshift --parser=ts --extensions=ts --transform scripts/release/transform.js ${file} --checksums='${stringifiedChecksums}'`,
    { cwd: process.cwd() },
  );

  const newStats = fs.statSync(`${cwd}/${file}`);

  if (originalStats.mtimeMs === newStats.mtimeMs) {
    throw new Error('Failed to replace checksum');
  }
};

const replaceVersionsInFiles = ({ tagName }) => {
  const cwd = process.cwd();

  try {
    const changedFiles = replace.sync({
      files: [`${cwd}/README.md`, `${cwd}/src/constants.ts`],
      from: new RegExp(`v${oldVersion}`, 'g'),
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
            tagName.includes(oldVersion),
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

    if (tagName && tagName.startsWith('v')) {
      const newVersion = tagName.replace('v', '');

      const checksumFileContent = await getChecksumFileContent({ tagName });
      const checksums = extractChecksumsFromContent({
        content: checksumFileContent,
        checksumNames: Object.keys(CHECKSUMS),
      });

      await replaceChecksumsInFiles({ checksums });

      replaceVersionsInFiles({ tagName });

      await commitChanges({ newVersion });

      await publishNewTag({ newVersion });
    }
  } catch (error) {
    setImmediate(() => {
      throw error;
    });
  }
})();
