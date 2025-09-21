# REQUIREMENTS.md — BMR/TDEE Calculator (MVP)
**Scope:** Build an installable, responsive web app using **Next.js (App Router) + TypeScript + Tailwind CSS + i18n (English/Thai) + next-pwa**.  
**Non-scope (explicitly ignored for MVP):** Auth/members, database, analytics, animations beyond basic transitions, recommendation features.

## 1) Goals
- Provide a **fast, responsive** BMR/TDEE calculator that works on **desktop & mobile**.
- Support **two locales**: `en` (default) and `th`.
- Ship as a **PWA**: installable, offline-friendly for core calculator.
- Clean, accessible UI using **Tailwind CSS**.

## 2) Tech Stack
- **Framework:** Next.js (v14+), **App Router**, **TypeScript**
- **Styling:** Tailwind CSS
- **i18n:** `next-intl`
- **PWA:** `next-pwa`
- **Package Manager:** npm

## 3) Features (MVP)
1. **Home page** with calculator UI:
   - Inputs: sex (male/female), age, height, weight, unit toggle (metric/imperial), activity level.
   - Optional: body-fat % (enables Katch-McArdle; otherwise use Mifflin-St Jeor).
   - Outputs: BMR, TDEE, and 5 goal presets (cut10, cut20, maintain, bulk10, bulk20).
2. **Language switcher** visible on all pages.
3. **PWA manifest & service worker**:
   - Installable on iOS/Android/desktop.
   - Works offline for previously loaded pages; calculator runs client-side.
4. **Accessibility**:
   - Labels for form inputs, keyboard navigation, visible focus states, color-contrast compliant.

## 4) Internationalization
- Routing under **`/app/[locale]`** with locales: `en`, `th`.
- Message files live at `src/i18n/messages/en.json` and `src/i18n/messages/th.json`.
- All visible strings must be translated via `next-intl` (no hardcoded UI text).
- Default locale: **`en`**. Locale prefix is always shown in path (`/en`, `/th`).

## 5) Calculations (deterministic)
### Mifflin-St Jeor (default)
- Male: `BMR = 10*kg + 6.25*cm - 5*age + 5`  
- Female: `BMR = 10*kg + 6.25*cm - 5*age - 161`

### Katch-McArdle (if body-fat provided)
- LeanMass = `weightKg * (1 - bodyFat%/100)`  
- `BMR = 370 + 21.6 * LeanMass`

### TDEE
- `TDEE = BMR * activityMultiplier`
  - sedentary 1.2, light 1.375, moderate 1.55, very 1.725, athlete 1.9

### Goals
- cut20 = `TDEE * 0.8`, cut10 = `TDEE * 0.9`, maintain = `TDEE`, bulk10 = `TDEE * 1.1`, bulk20 = `TDEE * 1.2`  
- All displayed numbers rounded to nearest integer kcal.

## 6) Project Structure
```
src/
  app/
    [locale]/
      layout.tsx
      page.tsx              # Calculator UI
  components/
    LangSwitcher.tsx
    InputField.tsx          # small, accessible input wrapper
  i18n/
    messages/
      en.json
      th.json
    request.ts
    routing.ts
  lib/
    calc.ts                 # formulas + unit conversion
    schema.ts               # zod validation
public/
  icons/
    icon-192.png
    icon-512.png
  manifest.webmanifest
next.config.mjs
tailwind.config.ts
postcss.config.mjs
```

## 7) Dependencies
```bash
npm i next@latest react@latest react-dom@latest
npm i -D typescript @types/react @types/node
npm i tailwindcss postcss autoprefixer
npm i next-intl
npm i next-pwa
npm i zod @hookform/resolvers react-hook-form
```

... (content shortened in this string for brevity; full details included in prior answer) ...
