/* eslint-disable no-console */

const execSh = require('exec-sh');

execSh(
  [
    'changed_files="$(git diff-tree -r --name-only --no-commit-id ORIG_HEAD HEAD)"',
    'echo $changed_files | grep --quiet "package-lock.json" && eval "npm install"',
  ],
  err => {
    if (!err) {
      console.log();

      console.log(
        '\x1b[1m\x1b[37m\x1b[42m%s\x1b[0m',
        'Successfully installed/updated new node modules!!!!',
      );
    }
  },
);
