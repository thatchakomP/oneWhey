# 02 — Analysis: Design Integration Issue Root Cause

## Problem Identification

**Issue**: User sees plain white background instead of enhanced Scandinavian Health & Wellness design.

**Root Cause**: Enhanced UI/UX components were applied to wrong component structure:

-   ✅ Design system correctly configured in `tailwind.config.ts`
-   ✅ CSS files properly importing Tailwind and custom styles
-   ❌ Enhanced components applied to `app/page.tsx` (unused Next.js structure)
-   ❌ Actual application uses `src/routes/[locale]/index.tsx` (React Router structure)

### Current State Audit

**Existing Architecture:**

-   React Router with locale-based routing (`/` → `/en/` → CalculatorPage)
-   Internationalization via react-intl
-   Main component: `src/routes/[locale]/index.tsx`
-   Support for `/en` and `/th` locales
-   Form validation with React Hook Form + Zod

**Styling Status:**

-   ✅ Enhanced Tailwind config with design tokens
-   ✅ CSS custom properties defined in `src/index.css`
-   ✅ Design system utilities available
-   ❌ Current CalculatorPage uses legacy class names (e.g., `text-gray-900`)
-   ❌ Missing application of new design system classes

**Critical Issues Identified:**

-   ⚠️ **Design System Inconsistency**: Dual Tailwind configurations (`tailwind.config.ts` + `tailwind.config.cjs`)
-   ⚠️ **Accessibility Gaps**: Missing ARIA labels, insufficient color contrast, incomplete keyboard navigation
-   ⚠️ **Component Inconsistency**: Mixed styling approaches across components
-   ⚠️ **Performance Bottlenecks**: Unoptimized bundle size, missing Core Web Vitals optimization
-   ⚠️ **Responsive Design Issues**: Breakpoint inconsistencies, sub-optimal mobile experience

## Dependency Map

-- react, react-dom
-- react-router (or chosen routing solution) for locale-prefixed routes
-- react-intl or react-i18next for translations
-- vite + vite-plugin-pwa (recommended) or CRA + Workbox for PWA
-- tailwindcss for styling
-- zod + react-hook-form for validation

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
