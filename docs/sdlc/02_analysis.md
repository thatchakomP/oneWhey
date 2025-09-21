# 02 — Analysis

## Refined Requirements

-   Must support `/app/[locale]` routing for `en` (default) and `th`. Locale prefix always present.
-   All UI strings via `next-intl` message files under `src/i18n/messages/{en,th}.json`.
-   Calculator formulas deterministic and must pass unit tests.

## Measurable Acceptance Criteria

1. End-to-end: visiting `/en` and completing the form produces expected BMR/TDEE within ±1 kcal of known values.
2. Unit coverage: `lib/calc.ts` ≥ 90% lines covered by unit tests.
3. PWA: app shows install prompt on supporting platforms and functions offline for previously loaded pages.

## Dependency Map

-   next@14+, react, react-dom
-   next-intl for i18n routing and translations
-   next-pwa for service worker and manifest
-   tailwindcss for styling
-   zod + react-hook-form for validation

## Data Flow

1. User fills form → client-side validation (zod) → normalized inputs (kg/cm) → `lib/calc` computes BMR/TDEE → UI displays results.
2. No server-side persistence required for MVP; calculations run entirely client-side.

## Risk/Impact Matrix

-   i18n routing misconfiguration — High impact, Medium probability — Mitigation: integration test for `/en` and `/th` routes early.
-   PWA failures on iOS — Medium impact, High probability — Mitigation: document limitations, test on iOS.

## Performance Considerations

-   Keep calculations client-only and CPU-light. Use static imports and avoid heavy libraries on the client bundle.

## Security Considerations

-   No sensitive data stored. Sanitize and limit any logging. Keep dependencies up-to-date.

## Acceptance Tests (examples)

-   Given male, age 30, height 180cm, weight 75kg, activity moderate → BMR ≈ 10*75+6.25*180-5*30+5 = 1675 → TDEE ≈ 1675*1.55 = 2596 → rounded 2596.
