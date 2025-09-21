---
applyTo: '**'
---

# Testing Policy (Repository baseline)

-   Testing pyramid: unit > integration > e2e; deterministic tests; mock externals where appropriate.
-   Tests must be fast and reliable in CI; use test-specific configs for slower integration/e2e tests.
-   Coverage target: use repository profile (default 85% lines/branches unless overridden).

# Test Automation

-   Provide scripts/commands in project profile (e.g., `pnpm test`, `pytest`, `go test`).
-   Tests should be runnable locally and in CI with reproducible results.
-   Use seeded randomness where ordering matters; prefer deterministic fixtures.

# Failure Handling

-   For failing tests, prefer red→green→refactor workflow. Document flaky tests with `@flaky` or skip markers and track remediation.
-   Add regression tests for any fixed bug and include them in the relevant suite.

# Reporting & Coverage

-   Emit coverage reports in a standard format; fail CI if coverage drops below profile threshold.
-   Track coverage gaps in `/docs/sdlc/05_testing.md` and memory.
