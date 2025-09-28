# oneWhey — BMR & TDEE Calculator

This project is a minimal Next.js App Router PWA using Tailwind and a small design system. It includes an accessible BMR/TDEE calculator and basic i18n (en/th).

Quick start (requires pnpm):

```bash
pnpm install
pnpm dev
# open http://localhost:3000/en
```

Notes:

-   PWA: Manifest and service worker are configured via `next-pwa`. On iOS PWA support is limited; users must add to home screen manually.
-   Replace `public/icon-192.png` and `icon-512.png` with proper icons.
-   Thai translations are initial placeholders and may need review.
