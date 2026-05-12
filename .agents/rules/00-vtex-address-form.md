---
applyTo: "**/*"
---

# Baseline rules — vtex/address-form

These rules apply to **every** agent conversation in this repo. They override generic best practices and codify the address-form team's standards.

## Repository purpose

`vtex/address-form` is the **reusable address input UI library** for VTEX. It provides country-aware address field rendering, postal code autocomplete, geolocation-based address resolution, and field validation.

It has a **dual nature**:
- **VTEX IO app** (`vtex.address-form`) — consumed as a peer dependency inside VTEX IO apps
- **npm package** (`@vtex/address-form`) — published from `react/lib/` via Rollup

It is consumed by `vtex.omnishipping`, `vtex.shipping-preview`, `vtex.checkout`, and any storefront app that needs address input. A breaking change here can affect checkout for all VTEX merchants.

## Stack (do not invent alternatives)

- VTEX IO `react@2.x` + `messages@0.x` builders (no `node` builder, no `graphql` builder)
- React 16.x (peerDep: `15.x || 16.x`) — do not upgrade without an RFC
- **TypeScript 3.9** for new code; JavaScript (JSX/JS) for legacy files. Do not migrate past TS 3.9 without an RFC.
- **No Redux, no MobX** — state is managed entirely via React Context (`RulesContext`, `AddressContext`)
- Jest 26 + `@testing-library/react` 12 + Enzyme 3 (legacy)
- ESLint with `eslint-config-vtex` + `eslint-config-vtex-react`
- Prettier with `@vtex/prettier-config`
- `@vtex/intl-equalizer` for i18n parity; Crowdin for translations; `%two_letters_code%` in `crowdin.yml`
- `window.logSplunk` for Splunk telemetry (NOT `@vtex/evidence-client-js`)
- Package manager: `yarn` (classic v1). No npm, no pnpm.
- Node 16 in the dev container.
- **Test runner**: `yarn --cwd react test` (NOT at root — Jest config lives in `react/package.json`)

## Code style — non-negotiable

- 2 spaces, LF, UTF-8 (see `.editorconfig`).
- Run lint **only on files you touched**, never globally.
- Never disable ESLint rules without an inline comment explaining why and a TODO.
- Never reformat unrelated files. PRs must show a small, reviewable diff.

## Architecture rules

- **Two React Contexts are the backbone**:
  - `RulesContext` (from `addressRulesContext.tsx`) — provides loaded `PostalCodeRules` to the subtree. Set by `<AddressRules country="...">`.
  - `AddressContext` (from `addressContainerContext.tsx`) — provides `{ address, handleAddressChange, Input }`. Set by `<AddressContainer>`.
- **`<AddressRules>`** dynamically imports `react/country/<COUNTRY>.ts` rules via `import()`. Falls back to `react/country/default.ts` on 404.
- **`<AddressContainer>`** runs `validateChangedFields` on every address change and triggers postal code autocomplete when a valid postal code is entered.
- **Country rules live in `react/country/*.ts`**. Each file exports a `PostalCodeRules` object. New country files must include a unit test.
- **Selectors live in `react/selectors/`**. They are pure functions — no side effects, no component imports.
- **Transforms live in `react/transforms/`**. They produce new values from inputs — pure, no side effects.
- **`react/index.ts`** is the npm package public API (named exports). **`react/components.ts`** is the VTEX IO public component map (default export). Both are load-bearing for consumers — see rule 30.
- **No new dependencies** without a spec justification and explicit CHANGELOG entry.
- **`react/metrics.ts`** `window.logSplunk` calls must not be removed without a follow-up telemetry task.

## Versioning & releases

- **`manifest.json` and `react/package.json` must move in lockstep.** Use `publish-release.sh` — never bump manually.
- Release notes go in `CHANGELOG.md` (Keep a Changelog format).
- Conventional Commits required. Breaking changes use `feat!:` / `fix!:` and a `BREAKING CHANGE:` footer.

## Testing

- Test command (CI): `yarn --cwd react test`.
- Pre-push hook runs: `yarn lint:locales && yarn --cwd react test`.
- New utility functions and logic paths **must** have unit tests.
- New components **should** have tests asserting key rendering behaviors.
- Bug fixes ship with a regression test before the fix.
- Prefer `@testing-library/react` for new tests; Enzyme is legacy and should not be extended.

## Branching & PRs

- Spec PRs: branch `spec/<feature-name>`, only the spec file in the diff.
- Implementation PRs: branch `feat/<feature-name>` — even for fixes. Use `feat!:` when breaking.
- Never push to `main` directly.
- PR title = Conventional Commit. PR body must link the spec.

## Things to NOT do

- Do not add a `node/` builder.
- Do not introduce Redux or any other state library.
- Do not switch from yarn to npm or pnpm.
- Do not migrate TypeScript past 3.9 without an RFC.
- Do not call VTEX private APIs from this app — it's a frontend library.
- Do not commit `.env`, `.env.local`, or anything containing real account/workspace credentials.
- Do not manually edit locale files other than `en.json` — Crowdin owns the translations.
- Do not edit `manifest.json` or `react/package.json` version fields manually.
- Do not remove `window.logSplunk` calls from `react/metrics.ts` without a follow-up task.
