# 05 — Testing

## Testing Strategy (concrete)

-   Unit: `src/lib/calc.test.ts` using vitest for speed to verify formulas and conversions.
-   Integration: React Testing Library smoke test for the page UI.
-   CI: run typecheck, unit tests, and report coverage.

## Self-Repair Loop

-   If tests fail, run `--findRelatedTests` for failures, apply minimal fixes (type or logic), re-run tests.

## Coverage Target

-   Default: 80% lines. Can be changed in `sdlc.profile.yaml`.

## Additional Notes

-   Prefer Vitest with jsdom for fast feedback. Test files live under `src/__tests__/`.
