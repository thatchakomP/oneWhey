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
description: 'Run tasks from /docs/sdlc/tasks.yaml (or tasks.md), using defaults from /.github/sdlc.profile.yaml; update status, artifacts, and memory'
---

# Behavior

-   Load `/.github/sdlc.profile.yaml`; select profile by `active_profile` or `profile:` in message. If `auto`, detect via repo signals.
-   Load checklist from `/docs/sdlc/tasks.yaml`. If missing, attempt to parse `/docs/sdlc/tasks.md` checkboxes.
-   If `policy.only` is non-empty, run only those task IDs; otherwise run all in order.
-   Follow phase rules (read-only for planning/analysis/design; active edits for implement/testing/maintenance). Show diffs; ask before terminal unless user approved workspace.
-   Apply doc/memory auto-apply rules; respect `file_count_guard` from the profile.
-   Update artifacts listed in `outputs`; append to `/ai/agent_memory.json`.

# Output

-   Updated `/docs/sdlc/tasks.yaml` statuses
-   `/docs/sdlc/tasks.log.md` summary table
-   Phase artifacts under `/docs/sdlc/`
-   Updated `/ai/agent_memory.json`
