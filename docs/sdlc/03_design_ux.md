# 03 — Design & UX: UI Enhancement with ToT + ReAct

## 🎯 Design Mission

Transform oneWhey BMR/TDEE calculator into a **design-first, accessibility-focused, performance-optimized** web application that delivers exceptional user experience across all devices and user capabilities.

## User Journey

1. Land on `/en` or `/th` → immediate visible calculator (no sign-in) → fill inputs → view results and goal presets → optionally switch locale or units.

# 03 — Design: Style Application Strategy

## Design Integration Plan

**Objective**: Apply existing Scandinavian Health & Wellness design system to the active CalculatorPage component while preserving i18n functionality.

### Current vs. Target Styling

**Current CalculatorPage Issues:**

-   Uses `text-gray-900` instead of design system colors
-   No background styling (plain white)
-   Generic input styling without design system utilities
-   Missing card styling for form container
-   No visual hierarchy or spacing consistency

**Target Enhancement:**

-   Apply `bg-stone-50` background for warmth
-   Use design system color tokens (`text-stone-900`, `text-stone-600`)
-   Implement `.scandi-input` utilities for form fields
-   Add `.card` styling to form container
-   Apply proper spacing with 8px baseline grid

## Selected Option and Rationale

-   Choose Minimal Tailwind (1) for MVP to minimize dependencies and match constraints. Add Headless UI later if user requests.

## React-specific Layout & Routing Notes

-   Since we're using plain React (not Next), we'll implement locale-prefixed routes with `react-router` and a top-level `/:locale/*` route. The app root will mount a `LocaleProvider` that loads messages from `src/i18n/messages/{locale}.json`.
-   Directory structure suggestion:

    src/
    routes/
    [locale]/
    index.tsx # calculator page
    components/
    InputField.tsx
    LangSwitcher.tsx
    i18n/
    messages/
    en.json
    th.json

-   PWA install flow: include a visible install button in the header when the `beforeinstallprompt` event is fired (desktop/mobile) and provide guidance for iOS where install is manual.

## Wireframes / Layout Notes

-   Single-column responsive form with labeled inputs and helper text.
-   Results card pinned below inputs with clear ARIA roles.

## Accessibility Checklist

-   All form inputs have associated <label>.
-   Inputs reachable by keyboard; visible focus states.
-   Color contrast meets WCAG AA.
-   Screen reader announcements for updated results (aria-live).

## Design Tokens

-   Use Tailwind config for color tokens and spacing scale.
