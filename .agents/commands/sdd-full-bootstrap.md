# /sdd-full-bootstrap — SDD Full (Spec Kit) workflow for vtex/address-form

Use this command to understand and run the SDD Full (Spec Kit) development cycle for this repository.

## When to use SDD Full

Use SDD Full (not SDD Lite) when:
- The task is > 5 days
- Cross-team or cross-repo coordination is required
- Significant architectural impact (e.g., changing the `PostalCodeRules` type shape)
- Breaking change to `react/index.ts` or `react/components.ts` (requires consumer coordination with vtex.omnishipping, vtex.shipping-preview, vtex.checkout)
- Changes to `react/types/rules.ts` or `react/types/address.ts` that affect the public type surface
- High ambiguity or unresolved product decisions

## One-time machine setup

```bash
# Install uv
curl -LsSf https://astral.sh/uv/install.sh | sh
# or: brew install uv

source "$HOME/.local/bin/env"
uv tool install specify-cli --from git+https://github.com/github/spec-kit.git@v0.6.0
specify version
```

## Per-task workflow

```
1. Drop the relevant PRD/RFC sections into docs/scope_of_work/<feature-name>.md
2. /speckit.specify     → specs/<feature>/spec.md   (commit — this is the only committed artifact)
3. /speckit.clarify     → resolve ambiguity, update spec
4. /speckit.plan        → specs/<feature>/plan.md   (DO NOT commit — gitignored)
5. /speckit.tasks       → specs/<feature>/tasks.md  (DO NOT commit — gitignored)
6. /speckit.analyze     → specs/<feature>/analysis.md (DO NOT commit — gitignored)
7. /speckit.implement phase 1 only   → code + branch (commit code only)
```

The **Constitution** (`.specify/memory/constitution.md`) is the architectural contract. Spec Kit reads it before every plan/analyze/implement step.

## Multi-repo coordination

For breaking changes that affect `vtex.omnishipping` and `vtex.shipping-preview`:

1. Start with this repo's spec (`specs/<feature>/spec.md`)
2. Use the [vtex/speckit-multi-repo](https://github.com/vtex/speckit-multi-repo) extension to propagate the spec context to consumer repos
3. Consumer repos have their own `specs/` directories and constitutions — respect their architecture rules

## address-form-specific notes for SDD Full

- The constitution at `.specify/memory/constitution.md` encodes the dual-nature (IO app + npm package) as a non-negotiable principle
- Breaking API changes must list ALL consumers in the spec's Risks & Mitigations table
- The spec must call out version bump implications (both `manifest.json` and `react/package.json`)
- `PostalCodeRules` shape changes are the highest-risk category — they require coordinated updates in both omnishipping and shipping-preview before merging
