# 06 — Maintenance

## Maintenance Tasks

-   Routine dependency updates (monthly), security audits, and small accessibility patches.

## Rollback Plan

-   Tag releases (vX.Y.Z). If a release causes regressions, revert the merge and open a hotfix branch.

## Impact Review

-   Modules touched: `src/lib/*`, `src/app/[locale]/*`, `src/components/*`, `next.config.mjs`.
-   Downstream risks: None for MVP; keep API surface minimal.
