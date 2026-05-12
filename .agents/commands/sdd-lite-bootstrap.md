# /sdd-lite-bootstrap — SDD Lite workflow for vtex/address-form

Use this command to understand and run the SDD Lite development cycle for this repository.

## When to use SDD Lite

Use SDD Lite (not Spec Kit) when:
- The task fits in < 5 days
- Single-repo, contained scope
- Bug fixes, small features, focused refactors
- Low ambiguity
- No cross-consumer coordination needed
- Adding a new country rule file without changing `PostalCodeRules` shape
- No breaking changes to `react/index.ts` or `react/components.ts`

Use **SDD Full** instead when the task involves changing the `PostalCodeRules` type, adding/removing exports from `react/index.ts` or `react/components.ts`, or any cross-repo coordination.

## The two-skill pipeline

```
/specification "<task description, definition of done, repos affected>"
   ↓
   Writes specs/<feature-name>.md
   Opens PR on branch spec/<feature-name>
   Status: Draft
   ↓
[Engineer reviews, asks PM if needed, edits spec, manually flips Status: Approved, merges]
   ↓
/implementing "specs/<feature-name>.md"
   ↓
   Non-interactive sandbox run
   Creates branch feat/<feature-name>
   Writes failing tests first, then minimal implementation
   Opens PR with: Summary / Tests / Assumptions / Deviations / Follow-ups / Spec
   On success: Status: Done in the spec file
   On block: opens GitHub issue "implementing blocked: <feature-name>" and ends
```

## address-form-specific notes

### Running tests
```bash
# Unit tests — run from react/ subdirectory
yarn --cwd react test

# Watch mode during development
yarn --cwd react test:watch

# i18n parity (runs automatically on pre-push)
yarn lint:locales
```

### What always needs a test
- New country rule file: assert fields array, postalCodeFrom type, required field presence
- New selector/transform function: unit test every logic branch
- New validation path: test valid/invalid/edge cases
- Any bug fix: failing regression test before the fix

### Country rule files
New files go in `react/country/<ISO3>.ts`. Export a `PostalCodeRules` object. Copy an existing similar country as a template. Test with the demo app (`cd demo && yarn start`).

### Public API caution
If the spec touches `react/index.ts` or `react/components.ts`, escalate to SDD Full — those changes require consumer coordination with `vtex.omnishipping` and `vtex.shipping-preview`.

### i18n
New user-visible strings go in `messages/en.json`. Run `yarn lint:locales` before pushing.
