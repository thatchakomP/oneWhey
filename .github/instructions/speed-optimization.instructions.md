---
applyTo: '**'
---

# Speed Optimization Instructions

## ⚡ Pipeline Speed Targets

-   **Target Reduction**: 45-60min → 25-35min (40-50% faster)
-   **Feedback Loops**: < 8min for typical changes
-   **Quality Maintenance**: 100% (no regressions)

## 🚀 Smart Execution Strategies

### Multi-Level Caching

-   **Build cache**: 48h for unchanged dependencies
-   **Test results**: 24h for unchanged code
-   **Validation cache**: Skip repeated checks on same code
-   **Template reuse**: For similar features and patterns

### Parallel Processing

-   **Quality gates**: typecheck + lint + test + security simultaneously
-   **Multi-worker testing**: 4+ parallel test workers
-   **Breakpoint validation**: All 7 responsive breakpoints at once
-   **Component validation**: Independent component checks

### Smart Change Detection

-   **Git diff analysis**: Determine impact scope automatically
-   **Test impact analysis**: Only test affected code paths
-   **Component isolation**: Skip unchanged components
-   **Incremental builds**: Hot reload when possible

## 📊 Performance Monitoring

### Pipeline Metrics

```yaml
Target_Metrics:
    average_execution_time: '< 30 minutes'
    cache_hit_rate: '> 70%'
    parallel_processing_efficiency: '> 85%'
    phase_timeout_rate: '< 5%'
    quality_maintenance: '100%'
```

### Quality vs Speed Balance

-   **Accessibility score**: Maintain 95+ Lighthouse score
-   **Visual fidelity**: Maintain 98%+ design accuracy
-   **Test coverage**: Maintain target coverage (usually 85%+)
-   **Security scan coverage**: Maintain 100%
-   **Time to feedback**: Optimize to < 8min for typical changes

## 🎯 Phase-Specific Optimizations

### Planning & Analysis (2-3min max)

-   **Cached analysis**: Reuse for similar requirements
-   **Template acceleration**: Pre-built patterns
-   **Auto-timeout**: Prevent analysis paralysis

### Design Phase (3-5min max)

-   **Component library first**: Reuse existing patterns
-   **Parallel breakpoint checks**: All 7 simultaneously
-   **Design token automation**: Automated validation

### Implementation Phase (8-15min max)

-   **Hot reload optimization**: Sub-second feedback
-   **Parallel quality gates**: All checks simultaneously
-   **Smart test selection**: Critical path prioritization
-   **Incremental compilation**: Only build changed code

### Design QA Phase (2-4min max)

-   **Smart screenshot diff**: Only changed components
-   **Cached accessibility results**: 24h cache for unchanged code
-   **Parallel validation streams**: Multiple checks simultaneously

### Testing Phase (5-8min max)

-   **Test impact analysis**: Only affected code paths
-   **Parallel execution**: Multiple test workers
-   **Smart fixture reuse**: Cache test setup

## 🔧 Implementation Guidelines

### Cache Management

```typescript
// Smart caching strategy
const CacheStrategy = {
    builds: { ttl: '48h', key: 'deps-hash' },
    tests: { ttl: '24h', key: 'code-hash' },
    validation: { ttl: '24h', key: 'file-hash' },
    assets: { ttl: '7d', key: 'content-hash' },
}
```

### Parallel Execution

```typescript
// Run quality gates in parallel
const qualityGates = await Promise.allSettled([
    runTypecheck(),
    runLinting(),
    runTests(),
    runSecurityScan(),
    runAccessibilityAudit(),
])
```

### Change Detection

```bash
# Smart change impact analysis
git diff --name-only HEAD~1 | grep -E '\.(ts|tsx|js|jsx|vue|py|go)$' |
xargs -I {} analyze-impact {}
```

## 🚨 Quality Safeguards

### Never Compromise On

-   Security scan completeness
-   Accessibility compliance (WCAG 2.2 AA+)
-   Test coverage targets
-   Design fidelity standards
-   Performance benchmarks

### Speed vs Quality Balance

-   Use intelligent shortcuts that maintain quality
-   Cache successful validations, not failures
-   Parallel execution for independent checks
-   Progressive enhancement for non-critical validations
