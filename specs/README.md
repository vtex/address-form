# specs/ — vtex/address-form

This directory contains SDD (Specification-Driven Development) specifications for features in this repository.

## Layout

```
specs/
├── README.md              # This file
├── app-baseline.md        # Reverse-spec of the existing app (baseline reference)
└── <feature-name>.md      # SDD Lite spec (one file per feature)
    or
└── <feature-name>/
    └── spec.md            # SDD Full spec (directory per feature)
```

## Spec status lifecycle

| Status | Meaning | Who sets it |
|---|---|---|
| `Draft` | Written, awaiting review | `/specification` skill |
| `Approved` | Reviewed and accepted for implementation | Engineer (manual) |
| `Done` | Fully implemented and merged | `/implementing` skill |

## PR conventions

- **Spec PR**: branch `spec/<feature-name>`, contains only `specs/<feature-name>.md`. Title: `spec: <feature-name>`.
- **Implementation PR**: branch `feat/<feature-name>`, contains code + test changes. Title: `feat: <feature-name>`. Links to the spec PR.

## What gets committed

Only `spec.md` (SDD Full) or `<feature>.md` (SDD Lite) are committed. The following are gitignored:

```
specs/**/plan.md
specs/**/tasks.md
specs/**/analysis.md
```

## Multi-repo note

When a spec covers changes that affect `vtex.omnishipping` or `vtex.shipping-preview` (e.g., breaking API changes), a corresponding spec must exist in those repos. Use [vtex/speckit-multi-repo](https://github.com/vtex/speckit-multi-repo) to propagate context across repos.
