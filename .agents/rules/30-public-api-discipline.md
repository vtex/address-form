---
applyTo: "react/{index.ts,components.ts,types/**,helpers.ts,inputs.ts}"
---

# Public API discipline — vtex/address-form

`vtex/address-form` has **two public surfaces** that serve different consumers. A breaking change in either requires a major version bump and coordinated consumer updates.

## Surface 1 — npm package (`react/index.ts`)

Consumed by external packages via `@vtex/address-form`. This is the richest API.

### What counts as the npm public API

- Every named export from `react/index.ts`
- All types re-exported from `react/types/address.ts` and `react/types/rules.ts`
- The `helpers` default export (and its individual function members)
- The `components` default export (same as surface 2 below)

Current named exports (as of baseline):

| Export | Source |
|---|---|
| `CountrySelector` | `./CountrySelector` |
| `AddressForm` | `./AddressForm` |
| `AddressSummary` | `./AddressSummary` |
| `PostalCodeGetter` | `./PostalCodeGetter` |
| `AddressContainer` | `./AddressContainer` |
| `AutoCompletedFields` | `./AutoCompletedFields` |
| `AddressRules` | `./AddressRules` |
| `AddressSubmitter` | `./AddressSubmitter` |
| `addValidation`, `removeValidation` | `./transforms/address` |
| `isValidAddress`, `validateField` | `./validateAddress` |
| `injectRules` | `./addressRulesContext` |
| `injectAddressContext` | `./addressContainerContext` |
| `helpers` | `./helpers` (default) |
| All types | `./types/address`, `./types/rules` |

## Surface 2 — VTEX IO components map (`react/components.ts`)

Consumed by `vtex.omnishipping`, `vtex.shipping-preview`, and any IO app that uses `vtex.address-form` as a peer dep via the VTEX IO framework.

### What counts as the IO public API

- Every key in the `default` export object of `react/components.ts`

Current keys: `AddressContainer`, `AddressForm`, `AddressRules`, `AddressSubmitter`, `AddressSummary`, `AutoCompletedFields`, `CountrySelector`, `GoogleMapsContainer`, `Map`, `PostalCodeGetter`, `PostalCodeLoader`, `StyleguideInput`, `StyleguideButton`.

## Changes that REQUIRE a major version bump

- Removing or renaming a named export from `react/index.ts`.
- Removing or renaming a key from `react/components.ts`'s default export.
- Changing the required props of any exported component in a way that breaks existing usage.
- Changing the shape of `PostalCodeRules` in `react/types/rules.ts`.
- Changing the signature of any exported function (`addValidation`, `removeValidation`, `isValidAddress`, `validateField`, `injectRules`, `injectAddressContext`).
- Changing the country rule object shape expected by `<AddressRules>`.

## Changes that are safe (minor/patch)

- Adding a new named export to `react/index.ts`.
- Adding a new key to `react/components.ts`'s default export.
- Adding optional props with defaults to an existing exported component.
- Adding a new country file under `react/country/`.
- Internal refactors that preserve the public contract.
- Bug fixes that align actual behavior with the documented contract.

## Process for breaking changes

1. The spec must call out the breaking change in the Arch Decisions section.
2. The spec's Risks & Mitigations table must list every consumer (`vtex.omnishipping`, `vtex.shipping-preview`, `vtex.checkout`, and known external npm consumers) and the coordination plan.
3. The PR description must list every consumer that needs to update.
4. The CHANGELOG entry uses `BREAKING CHANGE:` footer.
5. Both `manifest.json` and `react/package.json` major versions move together via `publish-release.sh`.
6. Coordinate with the checkout team before merging — do not merge during a release freeze.

## Anti-patterns to reject in code review

- Removing an export "because it looks unused" — verify all consumers first.
- Renaming an exported type and calling it an internal refactor.
- Changing a required prop to optional (or vice versa) without a version bump.
- Silently changing the shape of `PostalCodeRules` fields.
- Adding a "v2" function next to "v1" without a deprecation plan.
