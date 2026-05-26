---
applyTo: "react/**/*.{js,jsx,ts,tsx}"
---

# Test discipline — vtex/address-form

## Order of operations

1. Read the spec. Identify User Stories and their Given/When/Then acceptance criteria.
2. Translate each acceptance criterion and each row of the Key Scenarios table into one or more tests (red first).
3. Implement the minimum to flip them green.
4. Run `yarn --cwd react test` (unit) and `yarn lint:locales` (i18n parity).

## Unit tests (Jest 26)

### Framework preference

- **New tests use `@testing-library/react`**. It is the current standard.
- Enzyme is present for legacy tests only. Do not write new Enzyme tests; when modifying an Enzyme test, consider migrating it to Testing Library if the scope is reasonable.

### What requires a unit test

- Every new selector function under `react/selectors/`.
- Every new transform function under `react/transforms/`.
- Every new validation path in `react/validateAddress.ts`.
- Every new country rule file under `react/country/` — assert required fields are present, postal code regex is correct, and the postalCodeFrom type is valid.
- Every new or modified component that contains conditional logic.
- Every bug fix — add a failing regression test before the fix.

### What does NOT require a unit test

- New country rule files that are pure data changes with no logic (new field ordering only) — but a manual demo app check is required.
- Type-only changes (TypeScript interface additions with no runtime behavior change).
- Adding a key to `messages/en.json` without logic changes.
- Pure CSS/style changes.
- Pure dependency upgrades (Renovate-style).

### Test file location

- Tests for `react/Foo.js` or `react/Foo.tsx` live at `react/Foo.test.js` or `react/__tests__/Foo.test.tsx` (both patterns exist — match the existing co-location convention for the file's directory).
- Tests for `react/selectors/bar.ts` live at `react/selectors/bar.test.ts`.
- Tests for `react/transforms/baz.ts` live at `react/transforms/baz.test.ts`.
- Tests for `react/country/XYZ.ts` live alongside the rule file or in `react/country/__tests__/` if that pattern is established.
- Shared test utilities live in `react/test-modules/test-utils.tsx`.

### Fixtures and mocks

- Reusable address fixtures live in `react/__mocks__/`. Use them before inlining test data.
- Country rule mocks live in `react/country/__mocks__/`. Use `usePostalCode`, `useOneLevel`, `useTwoLevels`, `useThreeLevels`, `displayBrazil`, `displayUSA` as the canonical fixtures.
- Google Maps mocks live in `react/geolocation/__mocks__/`.
- `postalCodeService` mock lives at `react/__mocks__/postalCodeService.js`.
- When adding a new external dependency, add a corresponding mock under `react/__mocks__/<package>.js`.

### Snapshot tests

- Existing snapshots cover `AddressForm`, `AddressSummary`, `CountrySelector`, `DefaultInput`, `GeolocationNumberInput`, `InputText`. Do not add new snapshots unless the rendered output is genuinely a stable contract.
- Never update snapshots with `--updateSnapshot` to clear noise — update them intentionally.

## i18n parity

- After any `messages/en.json` change, run `yarn lint:locales` to confirm parity (reference locale: `pt`).
- A failing `lint:locales` is a blocker — do not merge.
- This check also runs on `pre-push`.

## Coverage

- No enforced threshold today. Do not let coverage drop on changed files.
- `yarn test:coverage` runs through `react/` Jest config.
