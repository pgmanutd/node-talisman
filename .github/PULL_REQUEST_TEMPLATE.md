**Before submitting a pull request,** please make sure the following is done:

1. Fork [the repository](https://github.com/pgmanutd/node-talisman.git) and create your branch from `master`.
2. Run `npm install` in the repository root.
3. Format your code with [prettier](https://prettier.io/) (`npm run format`).
4. Make sure your code lints (`npm run lint`).
5. Run the [Typescript](https://www.typescriptlang.org/) typechecking (`npm run typecheck`).
6. Follow [commit convention](./COMMIT_CONVENTION.md).

When you are done with your changes:

```bash
git branch -b "YOUR_BRANCH_NAME"

git add --all

git commit -a -m "commit message"

git push -u origin "YOUR_BRANCH_NAME"
```

and create a pull request from github
