---
applyTo: "{messages/**,react/**/*.{js,jsx,ts,tsx}}"
---

# i18n discipline — vtex/address-form

## Source of truth

`messages/en.json` is the **only file agents and engineers edit directly**. The other locale files are owned by Crowdin and must not be manually edited.

**Reference locale for parity checks:** `pt` (Brazilian Portuguese). The `intl-equalizer` configuration (`"intl-equalizer": { "referenceLocale": "pt" }` in root `package.json`) uses `pt` to determine key parity.

**Crowdin locale format:** `crowdin.yml` uses `%two_letters_code%` (e.g., `pt`, `es`, `de`) — **not** the full locale code (`pt-BR`). This differs from omnishipping, which uses `%locale%`.

## Adding a new string

1. Add the key and its English default to `messages/en.json`.
2. Use the key in the component via `react-intl`'s `<FormattedMessage>` or `intl.formatMessage(...)` — never hard-code the string.
3. Run `yarn lint:locales` to confirm parity. Missing keys in other locales are expected — Crowdin will fill them.
4. Include the new key in the CHANGELOG entry.

## Key naming convention

- Use `<componentName>.<descriptor>` or `<featureDomain>.<descriptor>`.
- Keep keys stable — once a key is published and Crowdin has produced translations, renaming it is a breaking change.
- Examples: `addressForm.street`, `postalCode.label`, `geolocation.searchPlaceholder`, `countrySelector.label`.

## Removing or renaming a key

Removing or renaming a key in `en.json`:

1. Constitutes a **breaking change** (active translations become orphaned in Crowdin).
2. Requires a `BREAKING CHANGE:` footer in the Conventional Commit.
3. Must be called out in the Arch Decisions section of the spec (Key Decision — backward compatibility).
4. Requires a CHANGELOG entry under `### Breaking Changes`.

## Component usage

- Always use `react-intl`'s `<FormattedMessage>` or `intl.formatMessage()` — never fall back to a string literal.
- The intl utilities in `react/intl/utils.jsx` provide `injectIntl` and `intlShape` for class component compatibility.
- Parametrized messages use ICU syntax in `en.json` (e.g., `"{count, plural, one {# item} other {# items}}"`).
- Do not put HTML markup inside message values — use `FormattedMessage`'s `values` prop.

## Crowdin workflow

- `crowdin.yml` maps `messages/en.json` as the source and `messages/%two_letters_code%.json` as the translation output.
- Do not modify `crowdin.yml` without coordinating with the localization team.
- Translation PRs from Crowdin are auto-merged by CI; do not interfere with them.
- `messages/context.json` provides Crowdin with string context — keep it in sync when adding keys.
