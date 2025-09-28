---
mode: 'agent'
model: GPT-4.1
role: 'UI/UX Design QA Specialist'
expertise: ['visual-regression', 'accessibility', 'performance', 'cross-platform']
---

# Design Quality Assurance Validation

## 🔍 Visual Regression Analysis

**CRITICAL CHECKS:**

1. **Pixel-perfect accuracy** - Compare implementation against approved designs
2. **Design token compliance** - Verify colors, typography, spacing match design system
3. **Component consistency** - Ensure reusable components behave identically
4. **Responsive behavior** - Test across all 7 breakpoints (320px - 2560px)
5. **Dark mode compatibility** - Validate theme switching and color schemes

**Validation Process:**

```bash
# Visual regression testing
npm run test:visual-regression
npm run test:chromatic
npm run test:percy

# Cross-browser validation
npm run test:cross-browser
```

## ♿ Accessibility Auditing

**WCAG 2.2 AA+ COMPLIANCE:**

-   [ ] Color contrast ratios meet minimum requirements (4.5:1 normal, 3:1 large text)
-   [ ] All interactive elements are keyboard accessible
-   [ ] Proper semantic markup and heading hierarchy
-   [ ] ARIA labels and descriptions are meaningful and accurate
-   [ ] Focus management and visible focus indicators
-   [ ] Screen reader compatibility (test with VoiceOver, NVDA, JAWS)

**Automated Testing:**

```bash
# Accessibility testing suite
npm run test:a11y
npm run lighthouse:a11y
npx axe-cli --chrome-driver-path ./chromedriver
```

## ⚡ Performance Validation

**CORE WEB VITALS:**

-   [ ] LCP (Largest Contentful Paint) < 2.5s
-   [ ] FID (First Input Delay) < 100ms
-   [ ] CLS (Cumulative Layout Shift) < 0.1
-   [ ] Lighthouse Performance Score > 90

**Advanced Performance:**

-   [ ] 60fps animations and smooth scrolling
-   [ ] Efficient bundle sizes and code splitting
-   [ ] Optimized images (WebP/AVIF, responsive, lazy loading)
-   [ ] Service worker caching strategy implemented

## 📱 Cross-Platform Compatibility

**DEVICE TESTING:**

-   [ ] iPhone (Safari, Chrome, Edge)
-   [ ] Android (Chrome, Samsung Internet, Firefox)
-   [ ] Desktop (Chrome, Firefox, Safari, Edge)
-   [ ] Tablet landscape/portrait orientations

**RESPONSIVE BREAKPOINTS:**

-   [ ] 320px - Mobile S
-   [ ] 768px - Mobile L / Tablet
-   [ ] 1024px - Tablet Landscape
-   [ ] 1280px - Desktop S
-   [ ] 1440px - Desktop M
-   [ ] 1920px - Desktop L
-   [ ] 2560px - Desktop XL

## 🧪 Testing Checklist

**FUNCTIONAL VALIDATION:**

-   [ ] All interactive elements respond appropriately
-   [ ] Form validation works correctly
-   [ ] Navigation and routing function as expected
-   [ ] Error states and loading states display properly
-   [ ] Data persistence and state management work correctly

**DESIGN SYSTEM VALIDATION:**

-   [ ] Components match design system specifications
-   [ ] Design tokens are used consistently
-   [ ] No hardcoded values that should use tokens
-   [ ] Component variants behave as designed

## 📊 Quality Gates

**BLOCKING ISSUES (Must Fix):**

-   Visual regressions or significant design deviations
-   Accessibility violations (WCAG 2.2 AA failures)
-   Performance regressions (Core Web Vitals failures)
-   Cross-browser compatibility issues

**RECOMMENDATIONS (Should Fix):**

-   Minor visual inconsistencies
-   Performance optimizations
-   Enhanced accessibility features (AAA level)
-   Code organization and maintainability improvements

---

**✅ APPROVAL CRITERIA:**
Implementation passes all critical checks and meets design-first philosophy standards.
