# CLAUDE.md

Guidance for working in this repository.

## What this is

`node-talisman` is a thin npm wrapper that runs ThoughtWorks'
[Talisman](https://github.com/thoughtworks/talisman) secret-scanning tool as a
CLI. On invocation it detects the OS/architecture, downloads the matching
Talisman binary from Talisman's GitHub releases, verifies its checksum, writes
it to disk, makes it executable, and runs it with the passed-through args
(e.g. `--githook pre-commit`).

- Published binary name: `node-talisman` (`pkg/dist-node/index.bin.js`).
- Target Talisman version: `v1.37.0` (see `META_INFO.version` in `src/constants.ts`).
- Supported: Linux, macOS, Windows. Requires Node 12+.

## Architecture

Entry: `src/index.ts` → `src/core/runner.ts`. The runner is the orchestrator:

```text
runner(args)
  ├─ if binary already on disk → check()
  └─ else install() → then check()

install()  = download() → verifyChecksum() → writeFile() → makeExecutable()
download() = src/utils/get.ts  (native http/https GET, follows redirects)
check()    = src/utils/... + exec-sh runs the binary with the user's args
```

- `src/core/*` — the pipeline steps (one file per step).
- `src/utils/*` — small single-purpose helpers (OS detection, checksum, logging, etc.).
- `src/constants.ts` — Talisman version, per-platform checksums, download paths.
  Checksums and version are overridable via env vars (`TALISMAN_VERSION`,
  `TALISMAN_<PLATFORM>_<ARCH>_CHECKSUM`).
- Logging goes through `src/utils/logToConsole.ts` (wraps `clogy`) — do **not**
  use raw `console.log`.

### Dev mode

`NODE_ENV=development` (`src/utils/isDevEnv.ts`) short-circuits the side effects:
`install` skips `writeFile`/`makeExecutable` and `runner` skips `check`, so the
download path can be exercised without touching disk or executing a binary. The
`npm start` script runs in this mode.

## Commands

| Command | What it does |
| --- | --- |
| `npm run build` | Build the distributable with pika (`@pika/pack`) → `pkg/` |
| `npm test` | Jest (via ts-jest), `NODE_ENV=test` |
| `npm run test:coverage` | Tests + coverage report |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint over `src/**` and `scripts/**` only |
| `npm run check` | lint + typecheck + coverage (CI gate) |
| `npm start` | Run the CLI locally in dev mode (ts-node) |

## Conventions & gotchas

- **Immutability**: build new objects, never mutate. Prefer many small,
  focused files.
- **Tests**: unit tests live in `__tests__/` next to the code. Integration
  tests (`src/__tests__/{posix,windows}.integration.test.ts`) mock the network
  by `jest.mock('../utils/get')` and driving its callback. Keep coverage high;
  `npm run check` enforces it.
- **Pre-commit hook (important)**: husky + lint-staged run on **every staged
  `.ts` file**, including `typings/**` — a broader scope than `npm run lint`
  (which only covers `src`/`scripts`). Staged files get `eslint --fix`, then
  `tsc --noEmit`, then Jest `--findRelatedTests`. A commit can fail on files
  that `npm run lint` never checks, so lint the exact files you're committing.
- **Commits**: Conventional Commits, enforced by commitlint (`commit-msg` hook).
- **Type globals**: ambient types live in `typings/globals/index.d.ts`, wired in
  via `tsconfig.base.json` (`typeRoots` + `types`).

## Dependencies

Keep runtime `dependencies` minimal — consumers install this as a devDependency
and it must pass `npm audit`. Downloading uses the Node stdlib (`http`/`https`)
via `src/utils/get.ts`, not a third-party HTTP client. Verify with
`npm audit --omit=dev` (should report 0 vulnerabilities). Dev-only tooling
vulnerabilities do not ship to consumers.
