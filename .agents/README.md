# .agents/ — vtex/address-form

This directory is the **source of truth** for all AI agent configuration in this repository.

## Directory layout

```
.agents/
├── README.md            # This file
├── rules/               # Always-on rules (loaded automatically by supporting agents)
│   ├── 00-vtex-address-form.md      # Baseline repo rules (stack, architecture, DO NOTs)
│   ├── 10-test-discipline.md        # Test strategy and what requires a test
│   ├── 20-i18n-discipline.md        # i18n key governance and Crowdin workflow
│   └── 30-public-api-discipline.md  # npm + VTEX IO public API change protocol
├── skills/              # Vendored skills from vtex/vtex-agent-skills
│   ├── specification/SKILL.md       # /specification slash command skill
│   │   └── references/template.md  # SDD Lite spec template
│   ├── implementing/SKILL.md        # /implementing slash command skill
│   └── README.md                    # Skill table + refresh instructions
└── commands/            # Repo-specific slash commands
    ├── sdd-lite-bootstrap.md        # /sdd-lite-bootstrap — full SDD Lite flow
    └── sdd-full-bootstrap.md        # /sdd-full-bootstrap — full Spec Kit flow
```

## Routing table — which agent reads what

| Agent tool | Reads from |
|---|---|
| Claude Code | `.claude/` (symlinks → `.agents/`) |
| Cursor | `.agents/rules/*.md`, `.agents/skills/*/SKILL.md` |
| Copilot | `.github/copilot-instructions.md` (not present; falls back to `.agents/`) |

## Updating vendored skills

The `skills/` directory is vendored verbatim from [`vtex/vtex-agent-skills`](https://github.com/vtex/vtex-agent-skills). To update:

```bash
npx skills add vtex/vtex-agent-skills
# or
git clone https://github.com/vtex/vtex-agent-skills /tmp/vtas
cp /tmp/vtas/skills/specification/SKILL.md .agents/skills/specification/SKILL.md
cp /tmp/vtas/skills/specification/references/template.md .agents/skills/specification/references/template.md
cp /tmp/vtas/skills/implementing/SKILL.md .agents/skills/implementing/SKILL.md
```

Do **not** hand-edit `SKILL.md` files. Repo-specific guidance goes in `.agents/rules/`.
