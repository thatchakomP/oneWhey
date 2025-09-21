---
applyTo: '**'
---

# Agent Memory Usage

-   On start: load `/ai/agent_memory.json` and summarize the latest status (`open_tasks`, `decisions`, `known_issues`, `last_failures`).
-   On finish: append to `history` and update `last_phase`, `decisions`, `known_issues`, and `last_failures`. Also emit `agent_output.json` for the run.
-   Keep the memory **append-only** with timestamps; do not erase prior entries.
