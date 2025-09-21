# 04 — Implementation Plan

## Goal

Provide the exact files, diffs, and minimal runnable code to implement the BMR/TDEE MVP per REQUIREMENTS.md. No code will be applied without explicit user approval.

## Proposed File Additions (high level)

-   `package.json` (if missing) and minimal scripts
-   `src/lib/calc.ts` — implementation of formulas + unit conversions
-   `src/lib/schema.ts` — zod input schema
-   `src/app/[locale]/page.tsx` — Calculator UI (uses components)
-   `src/components/InputField.tsx`, `LangSwitcher.tsx`
-   `src/i18n/messages/en.json` and `th.json`

## Diff Policy

-   I will show exact diffs for each source file before applying changes.
-   If the change touches >10 files or large binary assets, I'll pause and ask for confirmation.

## Typecheck & Gates

-   Before merging: run `npm ci` (if package-lock.json exists) or `npm install`, then run `npx tsc --noEmit`, `npm test`.

## Developer Workflow

1. Review proposed diffs.
2. Approve to apply changes.
3. Agent will run typecheck and unit tests; report results and fix minimal issues.
