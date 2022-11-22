/* eslint-disable no-console, @typescript-eslint/no-var-requires, import/no-extraneous-dependencies */

require('ts-node').register();

const fs = require('fs');

const request = require('request');
const execShPromise = require('exec-sh').promise;
const replace = require('replace-in-file');
const semver = require('semver');

const packageJson = require('../../package.json');
const { CHECKSUMS, META_INFO } = require('../../src/constants');

const oldTWTalismanVersion = META_INFO.version.replace('v', '');
const { version: oldNodeTalismanVersion } = packageJson;

const publishNewTag = async () => {
  const newNodeTalismanVersion = semver.inc(oldNodeTalismanVersion, 'patch');

  await execShPromise(
    `npm run publish -- ${newNodeTalismanVersion} --no-release-draft`,
    {
      cwd: process.cwd(),
    },
  );
};

const commitChanges = async ({ newTWTalismanVersion }) => {
  await execShPromise(
    [
      'git add --all',
      `git commit -m "build(tw-talisman): upgrade from ${oldTWTalismanVersion} to ${newTWTalismanVersion}" -n`,
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

const replaceVersionsInFiles = ({ newTWTalismanVersion }) => {
  const cwd = process.cwd();

  try {
    const changedFiles = replace.sync({
      files: [`${cwd}/README.md`, `${cwd}/src/constants.ts`],
      from: new RegExp(`v${oldTWTalismanVersion}`, 'g'),
      to: `v${newTWTalismanVersion}`,
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
      `(?<${groupKey}>.*)  ${checksumName}[\n\r]*`,
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

const getNextValidTagName = (body) => {
  const index = body.findIndex(({ tag_name: tagName }) =>
    tagName.includes(oldTWTalismanVersion),
  );

  let nextValidTag = null;

  if (index <= 0) {
    return nextValidTag;
  }

  for (let i = index - 1; i >= 0; i -= 1) {
    const nextTag = body[i];

    if (
      nextTag &&
      !nextTag.draft &&
      !nextTag.prerelease &&
      nextTag.tag_name.startsWith('v')
    ) {
      nextValidTag = nextTag;

      break;
    }
  }

  return nextValidTag && nextValidTag.tag_name;
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
          return resolve(getNextValidTagName(body));
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
      const newTWTalismanVersion = tagName.replace('v', '');

      const checksumFileContent = await getChecksumFileContent({ tagName });
      const checksums = extractChecksumsFromContent({
        content: checksumFileContent,
        checksumNames: Object.keys(CHECKSUMS),
      });

      await replaceChecksumsInFiles({ checksums });

      replaceVersionsInFiles({ newTWTalismanVersion });

      await commitChanges({ newTWTalismanVersion });

      await publishNewTag();
    }
  } catch (error) {
    setImmediate(() => {
      throw error;
    });
  }
})();
