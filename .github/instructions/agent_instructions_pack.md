# GPT-5 mini Claude-Optimized Agent Instructions Pack

Includes two instruction sets:

1. **agent_instructions_coding.md** — Claude-style coder (Go, JS/TS, Vue, Shell).
2. **agent_instructions_reviewer.md** — Reviewer (strict on Typecheck & Security; soft on lint, coverage, refactor).

## agent_instructions_coding.md (embedded)

-   Plan before code; modular, reusable, typed contracts.
-   Always show diffs before applying; ask before terminal.
-   **ReAct**: Think → decide → minimal action → verify.
-   **ToT** (design/algorithms): propose ≥3 candidates, compare, select best.
-   Self-verify: typecheck → lint → tests → minimal self-repair → rerun.
-   Add tests for normal/edge/error; prefer Jest/Playwright (JS/TS), `testing` (Go), Vue Test Utils.
-   Memory: update decisions, known_issues, impact.

## agent_instructions_reviewer.md (embedded)

-   Load `/docs/sdlc/04_implement.md` + diffs + tests + memory.
-   **CoVe**: independently re-run typecheck, tests, and security scans; cross-check ACs/spec.
-   **Block** if typecheck fails or security risks found.
-   Otherwise **approve** with suggestions (lint/coverage/refactor/perf).
-   Output `/docs/sdlc/04_implement_review.md`; log to `/ai/agent_memory.json`.
