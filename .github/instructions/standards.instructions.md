---
applyTo: '**'
---

# Code Standards & Quality (Global, Language-Agnostic)

## Principles

-   Clarity over cleverness; small modules and functions; follow SOLID/KISS/DRY where sensible.
-   Fail fast on invalid state; make invariants explicit; never silently swallow errors.
-   Backwards-compatibility for public APIs; version contracts; document breaking changes.

## Naming & Structure

-   Follow community conventions per language (e.g., JS/TS: camelCase/PascalCase; Python: snake_case; Go: MixedCaps; CSS: BEM/kebab-case).
-   File/dir layout reflects domain boundaries; keep code, tests, and docs co-located.

## Formatting (enforce via tools)

-   JS/TS/JSON/MD: Prettier; Python: Black; Go: gofumpt/gofmt; C/C++: clang-format; Java/Kotlin: ktlint/spotless; Rust: rustfmt; Swift: swiftformat; Shell: shfmt; SQL: sql-formatter.
-   Enforce in CI; no manual debates on style.

## Linting & Static Analysis

-   JS/TS: ESLint; Python: ruff/pylint; Go: golangci-lint; Java/Kotlin: detekt/spotbugs; Ruby: rubocop; PHP: phpstan/psalm; C/C++: clang-tidy; Rust: clippy.
-   Treat lints as quality gates; suppress with justification only.

## Errors & Logging

-   Propagate typed/structured errors; avoid exceptions for normal control-flow.
-   Structured logs (JSON) with levels, request/trace IDs; never log secrets/PII.
-   Timeouts/retries with backoff for IO; idempotency for externally visible actions.

## Security Baseline

-   Input validation & output encoding; XSS/CSRF/SSRF/SQLi mitigations; least privilege.
-   Secrets via env/secret manager; dependency scanning & pinning; verify checksums/signatures where relevant.
-   Add a **Risks & Mitigations** section to deliverables.

## Performance & Concurrency

-   Be mindful of complexity (big-O), memory use, N+1 queries; use indices.
-   Concurrency: avoid shared mutable state; prefer immutability; guard with locks/atomics when needed.

## APIs, Data & Schemas

-   Define/validate schemas (OpenAPI/JSON Schema/Protobuf/Avro). Migrations are reversible; provide rollback.
-   Version data contracts; ensure compatibility across services.

## Testing & Coverage

-   Pyramid: unit > integration > e2e; tests are deterministic; mock externals.
-   Coverage target ≥ 85% (adjust per repo); track explicit gaps and rationale.

## Docs & Reviews

-   Update README/CHANGELOG/ADR for significant changes.
-   PRs: small, reviewable diffs with rationale, alternatives, and impact analysis.
-   Accessibility (WCAG) and i18n considered for UI work.

## Config & Deployability

-   12-factor: config in env; feature flags for risky changes; observability (metrics/traces/logs).
-   Lockfiles committed; dependency update policy documented.
