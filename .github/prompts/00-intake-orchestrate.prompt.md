---
mode: 'agent'
model: GPT-5 mini
tools:
    [
        'codebase',
        'search',
        'usages',
        'fetch',
        'githubRepo',
        'findTestFiles',
        'read_file',
        'create_file',
        'insert_edit_into_file',
        'replace_string_in_file',
        'file_search',
        'semantic_search',
        'terminal.run',
        'run_tests',
    ]
description: 'Intake → then run the full SDLC Orchestrator automatically (uses defaults from /.github/sdlc.profile.yaml)'
---

# Defaults

-   Load `/.github/sdlc.profile.yaml` and adopt: stack_pm, constraints, auto, allowed_auto_apply, non_interactive_cli, file_count_guard.
-   If a user field is missing, use profile value; if still missing, ask concisely.
-   If `Auto` is not provided, assume **Auto: true** unless the user says "no".

# Flow (summary)

1. Load memory → summarize context
2. Intake (merge user input with profile)
3. Run phases Planning → Analysis → Design (docs only)
4. Implement → **Reviewer (auto)** → Testing → Maintenance (active edits, show diffs; ask before terminal)
5. Impact review + update memory & artifacts
