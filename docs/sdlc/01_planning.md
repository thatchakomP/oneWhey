# 01 — Planning

## Summary

This document translates the user's REQUIREMENTS.md for the BMR/TDEE Calculator (MVP) into a concise planning artifact for implementation.

## Scope

-   Build an installable, responsive web app using Next.js (App Router) + TypeScript + Tailwind CSS + next-intl + next-pwa.
-   Two locales: en (default) and th.
-   PWA installable and offline-friendly for core calculator.
-   No auth, database, analytics, or advanced animations for MVP.

## Acceptance Criteria (measurable)

1. Calculator UI at `/en` and `/th` with inputs: sex, age, height, weight, units toggle, activity level, optional body-fat%.
2. Correct BMR/TDEE calculations (Mifflin-St Jeor and Katch-McArdle) and goal presets. Numbers rounded to nearest kcal.
3. Language switcher visible on all pages; all strings localized via `next-intl`.
4. PWA manifest + service worker; site installable and usable offline for previously loaded pages.
5. Accessibility: form labels, keyboard nav, visible focus, WCAG contrast.

## Assumptions & Unknowns

-   Assume Node 18+ and Next.js 14+ per REQUIREMENTS.
-   Default coverage target: 0.8 (can be adjusted via sdlc profile).
-   Unknown: preferred design language (component library); will use Tailwind primitives unless the user requests a UI library.

## Implementation Plan (high level)

1. Initialize Next.js app (App Router) with TypeScript and Tailwind.
2. Add `next-intl` routing under `/app/[locale]` and create i18n messages.
3. Implement `lib/calc.ts` with unit conversion and formulas; add zod schema in `lib/schema.ts`.
4. Build accessible form components in `components/` and page UI in `app/[locale]/page.tsx`.
5. Add `next-pwa` configuration and manifest; ensure offline caching for core assets and the calculator logic.
6. Add tests for `lib/calc.ts` and a basic RTL test for the UI (smoke path).

## Code Touchpoints

-   `src/lib/calc.ts` — formulas + conversions
-   `src/lib/schema.ts` — zod validation
-   `src/app/[locale]/page.tsx` — calculator UI
-   `src/components/InputField.tsx`, `LangSwitcher.tsx`
-   `next.config.mjs`, `manifest.webmanifest`, PWA service-worker config

## Data/Schema

-   Input shape (zod): { sex: 'male'|'female', age: number, height: number, weight: number, units: 'metric'|'imperial', activity: enum, bodyFat?: number }

## Testing Strategy

-   Unit tests: `lib/calc.test.ts` covering Mifflin-St Jeor, Katch-McArdle, unit conversions, and goals.
-   Integration: a single RTL + Jest smoke test that renders the calculator and verifies outputs for a known input.
-   CI: run typecheck, lint, unit tests; block merge on failing tests.

## Risks & Mitigations

-   PWA pitfalls on iOS: limited service worker support — test on iOS and add guidance in README.
-   i18n routing complexity: implement `app/[locale]/layout.tsx` early and add comprehensive message fallbacks.

## Rollout & Metrics

-   Release: initial release as `v0.1.0` with basic telemetry (optional) — out of scope for MVP.
-   Metrics to monitor (post-MVP): installs, load times, offline usage.

## Effort & Timeline (rough)

-   Setup + basic UI: 1–2 days
-   Calculations + tests: 0.5–1 day
-   PWA + i18n wiring: 0.5–1 day
-   Accessibility and polish: 0.5–1 day

## Open Questions

-   Should we use any component library (Headless UI, Radix) or plain Tailwind?
-   Exact locales and translations — will the user provide Thai translations or request machine-assisted drafts?

## Next Steps

1. Confirm component strategy and translation approach.
2. Approve implement diffs for `lib/calc.ts`, basic page and types.
