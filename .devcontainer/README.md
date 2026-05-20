# Dev container for vtex/address-form

Standardized, containerized environment so AI agents and engineers run address-form the same way.

## What's inside

- Node 16 (matches the project's React 16 + Jest 26 stack)
- Yarn (classic v1)
- VTEX Toolbelt (`vtex@3.x`)
- `uv` + Spec Kit (`specify-cli @ v0.6.0`) for **SDD Full**
- VS Code extensions: ESLint, Prettier, EditorConfig, Claude Code, Copilot, Cursor

## Bring your VTEX session

The container bind-mounts `~/.vtex` from your host so `vtex login`, `vtex whoami`, and authenticated `vtex link` calls work immediately. If you don't want this, drop the `mounts` entry from `devcontainer.json`.

Set these in your shell or in `.env`:

```
VTEX_ACCOUNT=<your-account>
VTEX_WORKSPACE=<your-workspace>
```

## Usage

In VS Code or Cursor: **Reopen in Container**. In Codespaces: pick this devcontainer when creating the codespace. After build, `yarn install` (root) and `yarn --cwd react install` run automatically.

## Dual install

This repo has two `package.json` files:
- Root `package.json` — lint, format, lint:locales tooling
- `react/package.json` — Jest, Rollup, and all library dependencies

Both are installed automatically by the `postCreateCommand`. If you need to add a dependency to the library, run `yarn --cwd react add <pkg>`.

## Running tests after container start

```bash
# Unit tests
yarn --cwd react test

# i18n parity
yarn lint:locales

# Build the npm bundle
yarn --cwd react build

# Demo app (local development)
cd demo && yarn install && yarn start
```

## Why Node 16

Matches the project's React 16 dependency chain and VTEX Toolbelt compatibility requirements. When the team migrates, bump the base image here in lockstep with `react/package.json` peerDep updates.

## Reference templates

- [vtex/ai-agents@development](https://github.com/vtex/ai-agents/tree/development) — robust example with AWS SSO support
- [vtex/payments-support](https://github.com/vtex/payments-support) — pre-built image example
