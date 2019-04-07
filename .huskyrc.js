const tasks = array => array.join(' && ');

module.exports = {
  hooks: {
    'pre-commit': tasks(['lint-staged']),
    'commit-msg': tasks(['commitlint -E HUSKY_GIT_PARAMS']),
    'post-merge': tasks(['node ./scripts/husky/post-merge']),
  },
};
