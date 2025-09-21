# 03 — Design & UX

## Personas

-   Casual user: wants quick estimate on mobile.
-   Fitness enthusiast: cares about body-fat and accuracy.

## User Journey

1. Land on `/en` or `/th` → immediate visible calculator (no sign-in) → fill inputs → view results and goal presets → optionally switch locale or units.

## ToT: 3 Design Alternatives

1. Minimal Tailwind (Selected - SAFE)

    - Plain Tailwind CSS primitives, small bundle, fastest to implement.
    - Pros: minimal dependencies, small bundle, easy to audit for accessibility.
    - Cons: more dev time for polished components.

2. Headless UI + Tailwind

    - Use Headless UI primitives for accessible components + Tailwind for styling.
    - Pros: more accessible defaults, faster dev for form controls.
    - Cons: adds dependency surface.

3. Radix + Tailwind
    - Use Radix primitives for accessible low-level UI.
    - Pros: robust, accessible primitives. Good for future expansion.
    - Cons: larger bundle and slightly more setup.

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
