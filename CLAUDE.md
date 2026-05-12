# AGENTS.md — vtex/address-form

> **Read this first.** This file is the canonical context for AI agents (Cursor, Copilot, Claude Code, etc.) working on this repository. It is mirrored to `CLAUDE.md` via a symlink for Claude Code compatibility.

## What this repo is

`vtex/address-form` is the **reusable address input UI library for VTEX**. It owns the complete address entry experience: country-aware field rendering, postal code autocomplete, geolocation-based address resolution, field validation, and a composable component API consumed by checkout and storefront apps.

It has a **dual nature**:

- **VTEX IO app** (`react@2.x` + `messages@0.x` builders) — consumed as `vtex.address-form` peer dep inside the VTEX IO platform
- **npm package** (`@vtex/address-form`) — published from `react/lib/` via Rollup, consumed by non-IO apps and the `demo/` standalone app

It is consumed by:

- `vtex.omnishipping` — full checkout shipping UI (address step)
- `vtex.shipping-preview` — cart-page shipping preview (postal code entry)
- `vtex.checkout` — main checkout app
- Any VTEX storefront app that needs address input

Any change to the exported component API or the country rules shape is a **breaking change for all consumers**.

## Tech stack

| Layer | Tooling |
|---|---|
| Platform | VTEX IO (`react@2.x`, `messages@0.x` builders) |
| Language | TypeScript 3.9 + JavaScript (mixed — new code in TS, legacy in JS) |
| UI | React 16.x (peerDep: `15.x \|\| 16.x`) |
| State | React Context only (`RulesContext`, `AddressContext`) — no Redux |
| GraphQL | None |
| Bundle (npm) | Rollup 3 → `react/lib/` (CJS) + locales copy |
| Tests | Jest 26 + `@testing-library/react` 12 + Enzyme 3 |
| Lint | ESLint + `eslint-config-vtex` + `eslint-config-vtex-react` |
| Format | Prettier + `@vtex/prettier-config` |
| i18n | `@vtex/intl-equalizer` over `messages/<locale>.json`; source locale is `en.json`; reference locale for parity checks is `pt`; translations synced via Crowdin (`%two_letters_code%`) |
| Observability | `window.logSplunk` (Splunk, via `react/metrics.ts`) |
| Node (dev container) | 16 |

Stack constraints encoded as agent rules: see `.agents/rules/00-vtex-address-form.md`.

## Layout

```
.
├── .agents/                    # Source of truth for agent skills/commands/rules
│   ├── skills/{specification,implementing}/SKILL.md
│   ├── commands/{sdd-full-bootstrap,sdd-lite-bootstrap}.md
│   └── rules/*.md
├── .claude/                    # Claude Code-specific (symlinks back into .agents/)
│   ├── skills    -> ../.agents/skills
│   ├── commands  -> ../.agents/commands
│   └── rules     -> ../.agents/rules
├── .devcontainer/              # Node 16 + VTEX Toolbelt + uv/spec-kit
├── .specify/memory/constitution.md   # SDD Full constitution (architecture contract)
├── docs/                       # Long-form docs, including scope_of_work/
│   └── scope_of_work/          # Per-task scoped contexts for /speckit.specify
├── specs/                      # SDD specs (Lite: <feature>.md ; Full: <feature>/spec.md)
├── react/                      # App + npm package source
│   ├── country/                # Per-country postal code rule files (55+ countries, dynamic import)
│   │   ├── BRA.ts, ARG.ts …   # Each exports a PostalCodeRules object
│   │   ├── default.ts          # Fallback rules when country not found
│   │   └── __mocks__/          # Mock rule fixtures for tests
│   ├── country/data/           # JSON datasets for hierarchical postal code lookups
│   ├── geolocation/            # Google Maps integration (GoogleMapsContainer, Map, GeolocationInput, Utils)
│   ├── inputs/                 # Input components: DefaultInput, StyleguideInput, StyleguideButton
│   ├── postalCodeFrom/         # Postal code entry modes: OneLevel, TwoLevels, ThreeLevels, SelectPostalCode
│   ├── propTypes/              # Legacy PropTypes shapes (AddressShape, AddressShapeWithValidation, CountryType)
│   ├── selectors/              # Pure selector functions (fields, hasOption, postalCode, cleanStr)
│   ├── transforms/             # Pure transform functions (address, addressFieldsOptions, postalCodes)
│   ├── types/                  # TypeScript types (address.ts, rules.ts)
│   ├── intl/                   # react-intl compatibility helpers
│   ├── __mocks__/              # Address fixture mocks
│   ├── __tests__/              # Colocated tests for tsx files (AddressRules, InputFieldContainer)
│   ├── AddressContainer.js     # Context provider: validates fields, triggers postal code autocomplete
│   ├── AddressForm.js          # Renders all address fields per country rules
│   ├── AddressRules.tsx        # Dynamically loads country rules, provides RulesContext
│   ├── AddressSubmitter.js     # Validates on submit, calls back with valid/invalid result
│   ├── AddressSummary.js       # Read-only formatted address display
│   ├── AutoCompletedFields.js  # Displays fields filled by postal code autocomplete
│   ├── CountrySelector.js      # Country picker dropdown
│   ├── PostalCodeGetter.js     # Postal code entry with inline validation
│   ├── addressContainerContext.tsx  # AddressContext (address state + handleAddressChange)
│   ├── addressRulesContext.tsx      # RulesContext + injectRules HOC + useAddressRules hook
│   ├── validateAddress.ts      # isValidAddress, validateField, validateAddress, validateChangedFields
│   ├── postalCodeService.js    # Calls /api/checkout/pub/postal-code/ via axios
│   ├── postalCodeAutoCompleteAddress.js  # Orchestrates postal code API → address fill
│   ├── geolocationAutoCompleteAddress.js # Google Maps geocoder → address fill
│   ├── metrics.ts              # window.logSplunk telemetry (geolocation mismatch events)
│   ├── constants.ts            # POSTAL_CODE, ONE_LEVEL, TWO_LEVELS, THREE_LEVELS, error codes
│   ├── helpers.ts              # Named helper exports (addValidation, removeValidation, etc.)
│   ├── index.ts                # npm package public API (named exports for all components + helpers + types)
│   ├── components.ts           # VTEX IO public component map (default export object)
│   ├── inputs.ts               # Input registry (DefaultInput, StyleguideInput, GeolocationInput, …)
│   ├── shapes.ts               # Exported TypeScript shapes
│   ├── countries.ts            # Country list for CountrySelector
│   ├── rollup.config.mjs       # npm bundle build (→ react/lib/)
│   ├── package.json            # npm package metadata + Jest config
│   └── setupTests.js           # Jest global setup (Enzyme adapter)
├── demo/                       # Standalone CRA-style app for local development/testing
├── jscodeshift/                # Codemod scripts (e.g., upgrade-react-intl migration)
├── messages/                   # i18n source files (en.json is the source of truth)
├── crowdin.yml                 # Crowdin sync config (uses %two_letters_code%)
├── manifest.json               # VTEX IO app manifest (vendor/name/version)
├── package.json                # Root tooling (lint/format/lint:locales)
├── CHANGELOG.md                # Keep a Changelog format — required updates per PR
├── AGENTS.md                   # This file
└── CLAUDE.md -> AGENTS.md      # Symlink for Claude Code
```

## Day-to-day commands

```bash
# Install (root tooling)
yarn install --frozen-lockfile

# Install react/ dependencies
yarn --cwd react install --frozen-lockfile

# Lint (only touch changed files — never run globally in a feature PR)
yarn lint

# Format
yarn format

# Run unit tests (Jest — run from react/ subdirectory)
yarn --cwd react test

# Run unit tests in watch mode
yarn --cwd react test:watch

# Run unit tests with coverage
yarn test:coverage   # (root script that installs + runs coverage)

# Check i18n key parity across all locales
yarn lint:locales

# Build the npm bundle (react/lib/)
yarn --cwd react build

# Start the demo app
cd demo && yarn install && yarn start

# Link the app into a VTEX workspace for live testing
vtex use $VTEX_WORKSPACE
vtex link
```

`pre-commit` runs `lint-staged` (eslint + prettier on changed files).
`pre-push` runs `yarn lint:locales && yarn --cwd react test`.

## How agents should approach work here

We follow the [**VTEX Engineering Golden Path**](https://docs.google.com/document/d/1e7waGGK-7FE4nNmO7DVjbjDCoULwsPmLlpIh3g2jaoI/edit?tab=t.cobcxrp8wpxu#heading=h.w21olzdtavkg), with Specification-Driven Development as the foundation. Every non-trivial change starts from a written spec — code is the generated artifact, not the starting point.

### Decide: SDD Full or SDD Lite?

| Use **SDD Lite** when… | Use **SDD Full** (Spec Kit) when… |
|---|---|
| The task fits in <5 days | The task is >5 days |
| Single-repo, contained scope | Cross-team or cross-repo |
| Bug fixes, small features, focused refactors | Significant architectural impact |
| Low ambiguity | High ambiguity, unresolved product decisions |
| No cross-consumer coordination needed | Adding/removing/changing a public export (breaking change to `index.ts` or `components.ts`) |
| New country rule file only | Changes to the `PostalCodeRules` type shape |

When in doubt, run `/sdd-lite-bootstrap` (slash command in `.agents/commands/`) to see the full Lite flow, or `/sdd-full-bootstrap` for Spec Kit.

### SDD Lite (default for most work)

```
/specification "<task description, definition of done, repos affected>"
   → opens PR on branch spec/<feature-name>, containing only specs/<feature-name>.md
   → Status: Draft
[engineer reviews the spec PR, asks PM, edits, manually flips Status: Approved, merges]
/implementing "specs/<feature-name>.md"
   → non-interactive sandbox run
   → branch feat/<feature-name>, failing tests, minimal code, PR with named sections
   → on success: Status: Done in the same PR
   → on block: opens GitHub issue "implementing blocked: <feature-name>" and ends
```

The skills live at `.agents/skills/specification/SKILL.md` (+ `references/template.md`) and `.agents/skills/implementing/SKILL.md`. They are **vendored verbatim** from [`vtex/vtex-agent-skills`](https://github.com/vtex/vtex-agent-skills). To refresh: `npx skills add vtex/vtex-agent-skills` or `git clone` and copy. Do not hand-edit the SKILL.md files — repo-specific guidance goes in `.agents/rules/`.

### SDD Full (Spec Kit)

Setup once on your machine:

```bash
# Install uv (one of):
curl -LsSf https://astral.sh/uv/install.sh | sh
# brew install uv

source "$HOME/.local/bin/env"
uv tool install specify-cli --from git+https://github.com/github/spec-kit.git@v0.6.0
specify version
```

Per-task workflow:

```
1. Drop the relevant PRD/RFC sections into docs/scope_of_work/<feature-name>.md
2. /speckit.specify     → specs/<feature>/spec.md   (commit)
3. /speckit.clarify     → resolve ambiguity, update spec
4. /speckit.plan        → specs/<feature>/plan.md   (DO NOT commit)
5. /speckit.tasks       → specs/<feature>/tasks.md  (DO NOT commit)
6. /speckit.analyze     → specs/<feature>/analysis.md (DO NOT commit)
7. /speckit.implement phase 1 only   → code + branch (commit code only)
```

Ephemeral artifacts (`plan.md`, `tasks.md`, `analysis.md`) are gitignored.

The **Constitution** (`.specify/memory/constitution.md`) is the architectural contract. Spec Kit reads it before every plan/analyze step. **Edit it manually** — `/speckit.constitution` is for regeneration suggestions, not the primary mechanism.

## Hierarchy of authority for agents

1. `.specify/memory/constitution.md` — non-negotiable principles. (SDD Full only.)
2. `AGENTS.md` (this file) + `.agents/rules/*.md` — repo-level adaptations.
3. `.agents/skills/*/SKILL.md` — step-by-step skill instructions, bounded by 1 and 2.

If two layers conflict, the higher layer wins. If you cannot reconcile them, stop and surface the conflict.

## Sensitive areas — extra caution required

- **`react/index.ts`** — the npm package's public API. Every named export is consumed by external packages. Removing, renaming, or changing the signature of any export is a breaking change requiring a major version bump in both `manifest.json` and `react/package.json`.
- **`react/components.ts`** — the VTEX IO public component map. Removing or renaming a key in the default export object is a breaking change for every IO consumer.
- **`react/validateAddress.ts`** — field and address validation logic. Behavior changes here affect what shoppers see in real-time validation across all checkout flows.
- **`react/country/*.ts`** — per-country rules define postal code formats, field ordering, masking, and API integration. Incorrect rules ship incorrect checkout UX to an entire market.
- **`react/types/rules.ts`** — the `PostalCodeRules` interface. Any shape change requires coordinating all consumers (omnishipping, shipping-preview) and bumping the major version.
- **`react/postalCodeService.js`** — calls the VTEX public postal code API. Changes here affect address autocomplete for all supported countries.
- **`react/geolocation/`** — Google Maps integration. Test both happy path (address found) and fallback (Maps unavailable, address not found).
- **`react/metrics.ts`** (`window.logSplunk` calls) — Splunk telemetry for geolocation mismatch monitoring. Do not remove existing calls without a follow-up telemetry task.
- **`messages/en.json`** — the Crowdin source file. Adding a key triggers translation work across 25+ locales; removing a key is a breaking change.

## Versioning, CHANGELOG, releases

- SemVer. **`manifest.json` and `react/package.json` versions must move in lockstep.** The release script (`publish-release.sh`) handles the bump — do not edit manually.
- Every PR updates `CHANGELOG.md` (Keep a Changelog format) under `## [Unreleased]`.
- Conventional Commits required. Breaking changes use `feat!:` / `fix!:` plus a `BREAKING CHANGE:` footer.
- Release: `publish-release.sh` bumps both versions, then `vtex publish` + `npm publish`.

## Branching & PRs

- Spec PRs (from `/specification`): branch `spec/<feature-name>`. Diff contains only the spec file.
- Implementation PRs (from `/implementing` or by hand): branch `feat/<feature-name>` — upstream convention is always `feat/`, even for fixes. Use `feat!:` in the title when the change is breaking.
- Never push to `main` directly.
- PR title is a Conventional Commit. Implementation PR body uses the upstream named-section format: **Summary / Tests / Assumptions / Deviations / Follow-ups / Spec**.

## What NOT to do

- Don't add a `node/` builder — this app has no backend.
- Don't add Redux or any other state library — the app is Context-only by design.
- Don't switch package managers (yarn only).
- Don't migrate TypeScript past 3.9 without an RFC (both root and `react/` tsconfigs must align).
- Don't disable ESLint rules without an inline justification + TODO.
- Don't reformat unrelated files in a feature PR.
- Don't commit `.env`, real account credentials, or session cookies.
- Don't add or remove `messages/en.json` keys without a CHANGELOG entry and explicit team awareness of the Crowdin impact.
- Don't remove or rename exports from `react/index.ts` or `react/components.ts` without a major version bump and consumer coordination.
- Don't remove `window.logSplunk` telemetry calls in `react/metrics.ts` without a follow-up task.
- Don't edit `manifest.json` or `react/package.json` version manually — use `publish-release.sh`.
- Don't add new country files to `react/country/` without both a unit test and a manual QA pass in the demo app.

## Pointers

- VTEX IO docs: https://developers.vtex.com/docs/guides/vtex-io-documentation
- Spec Kit: https://github.com/github/spec-kit
- Multi-repo Spec Kit extension: https://github.com/vtex/speckit-multi-repo
- VTEX Agent Skills (upstream of `.agents/skills/`): https://github.com/vtex/vtex-agent-skills — install via `npx skills add vtex/vtex-agent-skills`
- Consumers: [`vtex/omnishipping`](https://github.com/vtex/omnishipping), [`vtex/shipping-preview`](https://github.com/vtex/shipping-preview) — their `AGENTS.md` files document the integration contract
- Golden Path SDLC how-to: see your team's internal handbook
