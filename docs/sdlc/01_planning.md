# 01 — Planning: UI/UX Enhancement

## Summary

Enhance the oneWhey BMR/TDEE calculator's user interface and user experience to achieve **98% pixel-perfect implementation**, **WCAG 2.2 AA+ accessibility compliance**, and **optimized performance across 7 responsive breakpoints**.

This phase builds upon the existing functional calculator to deliver design excellence, accessibility compliance, and cross-platform optimization while maintaining the current technical foundation.

## Enhanced Scope

### UI/UX Enhancement Focus Areas

-   **Design System Consolidation**: Unify multiple Tailwind configurations into cohesive design system
-   **Accessibility Excellence**: Achieve WCAG 2.2 AA+ compliance with automated validation
-   **Responsive Design Mastery**: Optimize across 7 breakpoints with mobile-first approach
-   **Performance Optimization**: Meet Core Web Vitals targets with 60fps animations
-   **Visual Polish**: Enhance typography, spacing, micro-interactions, and component consistency
-   **Cross-Platform Excellence**: Touch-friendly interfaces optimized for all devices

## Scope

-   Scope
-
-   -   Build an installable, responsive web app using React + TypeScript + Tailwind CSS. Use pnpm as the package manager.
-
-   -   Note: REQUIREMENTS.md originally specified Next.js (App Router), next-intl, and next-pwa. Switching to plain React means we will replace Next-specific features with suitable alternatives:
-   -   Routing & i18n: use react-router (or a minimal router) + react-intl (or react-i18next) for locale paths `/en` and `/th`.
-   -   PWA: use Workbox or vite-plugin-pwa (depending on the bundler) to provide manifest and service worker functionality.
-   -   File layout will be adjusted from `app/[locale]` to a React-centric `src/pages` or `src/routes` structure per chosen bundler.

1. Calculator UI at `/en` and `/th` with inputs: sex, age, height, weight, units toggle, activity level, optional body-fat%.
2. Correct BMR/TDEE calculations (Mifflin-St Jeor and Katch-McArdle) and goal presets. Numbers rounded to nearest kcal.
3. Language switcher visible on all pages; all strings localized via `next-intl`.
4. PWA manifest + service worker; site installable and usable offline for previously loaded pages.
5. Accessibility: form labels, keyboard nav, visible focus, WCAG contrast.

## Assumptions & Unknowns

-   Assume Node 18+ and Next.js 14+ per REQUIREMENTS.
    Implementation Plan (high level)

1. Initialize a React + TypeScript project using Vite (recommended) or Create React App, with pnpm as the package manager and Tailwind CSS.
2. Add i18n routing for `/en` and `/th` using `react-router` (or file-based routes if using frameworks) and `react-intl`/`react-i18next` for message bundles.
3. Implement `lib/calc.ts` with unit conversion and formulas; add zod schema in `lib/schema.ts` and wire to `react-hook-form`.
4. Build accessible form components in `components/` and page UI under `src/routes` or `src/pages` depending on bundler choice; ensure locale-aware routing.
5. Add PWA support using `vite-plugin-pwa` (if Vite) or Workbox (if CRA/Webpack) with a manifest and service worker to cache assets and enable offline use.
6. Add tests for `lib/calc.ts` (Vitest or Jest) and a basic React Testing Library smoke test for the UI.

-   Default coverage target: 0.8 (can be adjusted via sdlc profile).
-   Unknown: preferred design language (component library); will use Tailwind primitives unless the user requests a UI library.

Code Touchpoints

-   `src/lib/calc.ts` — formulas + conversions
-   `src/lib/schema.ts` — zod validation
-   `src/routes/[locale]/index.tsx` or `src/pages/[locale]/index.tsx` — calculator UI (React routing equivalent)
-   `src/components/InputField.tsx`, `LangSwitcher.tsx`
-   `manifest.webmanifest`, PWA service-worker config (via vite-plugin-pwa or Workbox)

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
