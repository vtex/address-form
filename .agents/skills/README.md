# Skills — vtex/address-form

Skills vendored verbatim from [`vtex/vtex-agent-skills`](https://github.com/vtex/vtex-agent-skills) v1.2.0.

| Skill | Slash command | Purpose |
|---|---|---|
| `specification` | `/specification "<task>"` | Generate a SDD spec at `specs/<feature>.md` (Draft) |
| `implementing` | `/implementing "specs/<feature>.md"` | Autonomous implementation from an Approved spec → PR (Done) |

## Refresh

```bash
npx skills add vtex/vtex-agent-skills
# or manually:
git clone https://github.com/vtex/vtex-agent-skills /tmp/vtas
cp /tmp/vtas/skills/specification/SKILL.md .agents/skills/specification/SKILL.md
cp /tmp/vtas/skills/specification/references/template.md .agents/skills/specification/references/template.md
cp /tmp/vtas/skills/implementing/SKILL.md .agents/skills/implementing/SKILL.md
```

Do **not** hand-edit SKILL.md files. All repo-specific guidance belongs in `.agents/rules/`.
