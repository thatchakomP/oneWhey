---
applyTo: '**'
---

# Design Implementation Instructions

## 🎨 Visual Fidelity Standards

### Pixel-Perfect Implementation

-   **98%+ accuracy** to approved designs and design tokens
-   **Zero visual regressions** - every change must be validated
-   **Exact spacing, colors, typography** as specified in design system
-   **Consistent component behavior** across all interaction states

### Responsive Design Mastery

-   **7 responsive breakpoints**: 320px, 768px, 1024px, 1280px, 1440px, 1920px, 2560px
-   **Mobile-first approach** with progressive enhancement
-   **Fluid layouts** that adapt gracefully between breakpoints
-   **Touch-friendly interface** with minimum 44px tap targets

## ♿ Accessibility Requirements

### WCAG 2.2 AA+ Compliance

-   **Color contrast ratios**: Minimum 4.5:1 for normal text, 3:1 for large text
-   **Keyboard navigation**: Full functionality without mouse required
-   **Screen reader support**: Proper semantic markup and ARIA labels
-   **Focus management**: Visible focus indicators and logical tab order

### Automated Testing

-   **aXe-core integration** for continuous accessibility auditing
-   **Lighthouse accessibility score**: Minimum 95/100
-   **Manual testing** with screen readers (VoiceOver, NVDA, JAWS)

## ⚡ Performance Standards

### Core Web Vitals

-   **LCP (Largest Contentful Paint)**: < 2.5 seconds
-   **FID (First Input Delay)**: < 100 milliseconds
-   **CLS (Cumulative Layout Shift)**: < 0.1
-   **60fps animations** with smooth transitions

### Optimization Techniques

-   **Image optimization**: WebP/AVIF formats, lazy loading, responsive images
-   **Bundle optimization**: Code splitting, tree shaking, compression
-   **Caching strategies**: Service workers, CDN, browser caching
-   **Performance monitoring**: Real User Monitoring (RUM) and synthetic testing

## 🛠️ Implementation Guidelines

### Code Quality Standards

```typescript
// ✅ Good: Semantic, accessible component
const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'medium',
    disabled = false,
    onClick,
    ...props
}) => {
    return (
        <button
            className={cn(
                'inline-flex items-center justify-center rounded-md font-medium transition-colors',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                'disabled:pointer-events-none disabled:opacity-50',
                buttonVariants({ variant, size })
            )}
            disabled={disabled}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    )
}
```

### Framework-Specific Requirements

-   **React 18+**: Concurrent features, Suspense, Error boundaries
-   **Next.js 14+**: App Router, Server Components, Image optimization
-   **Flutter 3.16+**: Material 3, Adaptive layouts, Platform-specific UX
-   **Modern CSS**: CSS Grid, Flexbox, Custom Properties, Container queries

### Design System Integration

-   **Design tokens**: Colors, typography, spacing, shadows from single source
-   **Component library**: Reusable, tested, documented components
-   **Style guide compliance**: Consistent patterns across entire application
-   **Dark mode support**: Automatic theme switching and persistence
