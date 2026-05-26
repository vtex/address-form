# scope_of_work/ — vtex/address-form

Input documents for `/speckit.specify`. Place PRD sections, RFC excerpts, or feature briefs here before running Spec Kit.

## Template

Create a file named `docs/scope_of_work/<feature-name>.md` with:

```markdown
# Scope of Work: <Feature Name>

## Problem

<What problem are we solving? Who is affected?>

## Goals

<Measurable outcomes this feature should achieve.>

## Requirements

<Functional and non-functional requirements.>

## Constraints

<Technical constraints, deadlines, dependencies.>

## Out of scope

<What this feature explicitly does NOT cover.>

## References

<Links to PRDs, Figma designs, Slack threads, etc.>
```

## Rules

- Files here are **never committed** to PRs — they are working documents only.
- Once a spec is generated in `specs/`, the scope-of-work file can be archived or deleted.
- Keep files focused on one feature. Split large features into multiple files.
