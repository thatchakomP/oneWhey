# 04.1 — Implementation Review

## Automated Reviewer Checklist

-   Typecheck: `npx tsc --noEmit` — must pass
-   Security: run `npm audit` and flag high/critical vulnerabilities
-   Tests: unit tests must pass; coverage target documented in profile
-   Lint: recommend running ESLint but not blocking on first pass

## Blocking Issues

-   Type errors — block
-   High/critical npm audit vulnerabilities — block until mitigated or acknowledged

## Soft Recommendations

-   Lint fixes, test coverage improvements, small refactors.

## Recording Decisions

-   Every merge will append a brief decision record to `/ai/agent_memory.json` with timestamp, diff summary, and gate statuses.
