# Constitution — vtex/address-form

> This document is the **architectural contract** for `vtex/address-form`. Spec Kit reads it before every plan, analyze, and implement step. Edit it manually only — `/speckit.constitution` is for regeneration suggestions, not the primary mechanism. If a proposed change violates a principle here, the spec must explicitly justify and supersede it.

---

## I. Identity and Role

`vtex/address-form` is the **reusable address input UI library for VTEX**. Its purpose is to abstract the complexity of country-specific address fields, postal code autocomplete strategies, and geolocation-based address resolution into a composable React component API.

It has a **dual nature** that must be preserved in all decisions:

1. **VTEX IO app** (`vtex.address-form`) — deployed on the VTEX IO platform, consumed as a React peer dependency by IO apps.
2. **npm package** (`@vtex/address-form`) — published from `react/lib/` via Rollup, consumed by non-IO JavaScript projects.

Both surfaces are production-critical. A bug in either affects checkout for VTEX merchants. A breaking change in either requires a major version bump and coordinated consumer updates.

---

## II. Stack Constraints

These are non-negotiable. No spec may propose changing them without an accompanying RFC.

- **Platform**: VTEX IO `react@2.x` + `messages@0.x` builders. No `node` builder.
- **Language**: TypeScript 3.9 for new code. JavaScript for existing legacy files. Do not migrate past TS 3.9 without an RFC that covers both root `tsconfig.json` and `react/tsconfig.json`.
- **React**: 16.x (`peerDep: 15.x || 16.x`). Do not upgrade without an RFC.
- **State management**: React Context only (`RulesContext`, `AddressContext`). No Redux, no MobX, no Zustand.
- **Build (npm)**: Rollup 3 → `react/lib/` (CJS). No webpack, no esbuild at the library level.
- **Tests**: Jest 26 + `@testing-library/react` 12 (standard). Enzyme 3 (legacy only — do not extend).
- **Linting**: ESLint + `eslint-config-vtex` + `eslint-config-vtex-react`. No rule disabling without inline comment + TODO.
- **i18n**: `@vtex/intl-equalizer` + Crowdin. Reference locale: `pt`. Crowdin format: `%two_letters_code%`.
- **Observability**: `window.logSplunk` (NOT `@vtex/evidence-client-js`).
- **Package manager**: `yarn` classic v1. No npm, no pnpm.
- **Node in dev container**: 16.

---

## III. Architecture Invariants

### A. Two-Context Model

The library is built on two composable React Contexts. This model must not be collapsed or replaced:

1. **`RulesContext`** (from `addressRulesContext.tsx`): provides the loaded `PostalCodeRules` for the current country. Set only by `<AddressRules country="...">`. Available to any child via `useAddressRules()` or `injectRules()`.
2. **`AddressContext`** (from `addressContainerContext.tsx`): provides `{ address, handleAddressChange, Input }`. Set only by `<AddressContainer>`.

Components that need rules or address state must consume these contexts — not receive Redux state, not lift state up, not use global variables.

### B. Country Rules as Static Modules

Per-country rules live in `react/country/<ISO3>.ts`. Each file exports a `PostalCodeRules` object. `<AddressRules>` loads them via dynamic `import()`. The fallback is `react/country/default.ts`.

- Adding a new country = new file under `react/country/`, never modifying `AddressRules.tsx` logic.
- Country rule files are pure data + minimal formatting logic. No API calls, no side effects.
- The `PostalCodeRules` type shape is a contract shared with consumers — changes require a major version bump.

### C. postalCodeFrom Strategies

There are exactly four postal code resolution strategies encoded as constants:
- `POSTAL_CODE` — single text field with API autocomplete
- `ONE_LEVEL` — one select dropdown
- `TWO_LEVELS` — two cascading select dropdowns
- `THREE_LEVELS` — three cascading select dropdowns

New strategies require a spec. Do not add a new `postalCodeFrom` value without also adding a corresponding component under `react/postalCodeFrom/`.

### D. Postal Code Autocomplete

The flow: user enters a valid postal code → `AddressContainer.handleAddressChange` calls `postalCodeAutoCompleteAddress` → which calls `postalCodeService.getAddress` → VTEX public API `/api/checkout/pub/postal-code/<country>/<postalCode>` → fills remaining address fields.

This call must always go through `postalCodeService.js`. No component should call the API directly.

### E. Geolocation

Google Maps integration lives entirely under `react/geolocation/`. The entry point is `GoogleMapsContainer`, which loads the Maps SDK and provides `googleMaps` to children. `Map` renders the map. `GeolocationInput` provides the autocomplete search input. `getAddressByGeolocation` (in `Utils.js`) resolves a structured address from geo coordinates.

Geolocation features are opt-in via `useGeolocation` prop on `<AddressRules>`.

### F. Public API Surfaces

**Never modify without a major version bump + consumer coordination:**

1. `react/index.ts` — npm package named exports (components, functions, types)
2. `react/components.ts` — VTEX IO component map (default export object)
3. `react/types/rules.ts` — `PostalCodeRules` interface and related types
4. `react/types/address.ts` — `Address`, `AddressWithValidation`, `ValidatedField` types

Adding new exports to surfaces 1 or 2 is safe (minor). Removing, renaming, or changing the shape is breaking (major).

---

## IV. Code Style

- 2 spaces, LF, UTF-8.
- New files: TypeScript (`.ts` / `.tsx`). Existing JS files remain JS unless the PR's scope includes migration.
- No inline `any` without a `// eslint-disable-next-line` comment explaining why.
- No default export of anonymous functions or anonymous classes — always name them.
- PropTypes are maintained on legacy JS components for runtime type checking. TypeScript components use TS types only.

---

## V. Testing

- **Test runner**: `yarn --cwd react test` (Jest 26, config in `react/package.json`).
- **New country files**: require a unit test asserting the `PostalCodeRules` shape.
- **New selectors/transforms**: require unit tests covering all logic branches.
- **New validation paths**: require tests for valid, invalid, and edge cases.
- **Bug fixes**: ship with a failing regression test before the fix.
- **Snapshot tests**: allowed only for stable outputs. Never `--updateSnapshot` to clear noise.
- **Test co-location**: `Foo.test.js` next to `Foo.js`, or `__tests__/Foo.test.tsx` for `.tsx` files.
- **Country mock fixtures**: use `react/country/__mocks__/` before inlining test data.
- **Address mock fixtures**: use `react/__mocks__/` before inlining test data.

---

## VI. Performance

- Country rule files are loaded via dynamic `import()` and are not bundled into the main chunk.
- The demo app (`demo/`) is CRA-based and separate from the library bundle — do not couple them.
- `react/lib/` (the npm bundle) should have no unnecessary dependencies. All VTEX IO peer deps must remain `peerDependencies`, not `dependencies`, in `react/package.json`.

---

## VII. Versioning

- `manifest.json` and `react/package.json` versions **must always be in lockstep**. The release script (`publish-release.sh`) handles both atomically.
- Major bump: any breaking change to public API surfaces (I.F above).
- Minor bump: new exports, new country files, new non-breaking features.
- Patch bump: bug fixes, performance improvements.
- Conventional Commits required. `BREAKING CHANGE:` footer mandatory for majors.
- `CHANGELOG.md` updated under `## [Unreleased]` in every PR.

---

## VIII. i18n Governance

- `messages/en.json` is the only file agents and engineers edit.
- Reference locale for parity: `pt`. Run `yarn lint:locales` after any `en.json` change.
- Crowdin format: `%two_letters_code%` (e.g., `pt`, `es`, `de`).
- Key naming: `<componentName>.<descriptor>` or `<featureDomain>.<descriptor>`.
- Removing or renaming a key = breaking change (CHANGELOG + `BREAKING CHANGE:` footer).
- `messages/context.json` provides Crowdin with context — keep it in sync when adding keys.

---

## IX. Telemetry

- `react/metrics.ts` contains `window.logSplunk` calls for Splunk telemetry.
- Currently tracks: `logGeolocationAddressMismatch` — fired when a geolocation-resolved field value doesn't match the rules expectation.
- Do not remove existing telemetry calls without opening a follow-up task.
- New critical geolocation or validation flows should consider adding telemetry.

---

## X. Security

- No private VTEX API keys in the browser.
- Postal code API calls go to the public endpoint `/api/checkout/pub/postal-code/` only.
- The `cors` prop on `AddressContainer` enables cross-origin postal code calls — it uses the account's `vtexcommercestable.com.br` domain, which is safe for production accounts.
- Never expose merchant credentials through the component API.

---

## XI. Dependencies

- No new `dependencies` in `react/package.json` without a spec justification and CHANGELOG entry.
- Rollup and build tooling belong in `devDependencies`.
- React, react-intl, prop-types, vtex-tachyons remain `peerDependencies`.
- `axios` is a runtime dependency (postal code API calls) — do not replace without migration plan.
- Do not upgrade react-intl peerDep constraint without verifying all consumer versions.

---

## XII. Specification-Driven Development

All non-trivial work starts from a written spec. The hierarchy:

- **SDD Lite** — for tasks < 5 days, single-repo, no public API changes. Uses `/specification` + `/implementing` skills.
- **SDD Full** — for tasks > 5 days, cross-repo, or any change to public API surfaces. Uses Spec Kit (specify-cli v0.6.0).

Agents must not implement features not described in an approved spec. When in doubt, write the spec first.

---

## XIII. Governance

- This constitution is edited manually by the team. It is **not** auto-generated.
- If a proposed change violates a principle in this document, the spec must explicitly state the violation, justify the exception, and get team sign-off before proceeding.
- Agents that encounter an irreconcilable conflict between this constitution and a spec must surface the conflict rather than silently resolve it.
