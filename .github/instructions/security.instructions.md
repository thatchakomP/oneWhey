---
applyTo: '**'
---

# Security Awareness (baseline)

-   Manage secrets via env/secret manager; never commit secrets.
-   Validate/sanitize inputs; encode outputs; mitigate XSS/CSRF/SSRF.
-   Least-privilege for APIs/DB; parameterized queries; security headers/CSP.
-   Add **Risks & Mitigations** to deliverables and include a brief threat sketch.

##

# Security Awareness (baseline)

#

Agent Roles: security, fullstack
Protocols: MCP, SelfLearningLoop
SDLC Phases: all
Escalation: majority_vote
Fallback: escalate_to_human
Feedback: true
Memory Schema: /ai/agent_memory.json
File Goal: Security instructions for agent orchestration, hardening, and risk mitigation. [NEEDS-INPUT: Add specific security behaviors/goals]

-   Manage secrets via env/secret manager; never commit secrets.
-   Validate/sanitize inputs; encode outputs; mitigate XSS/CSRF/SSRF.
-   Least-privilege for APIs/DB; parameterized queries; security headers/CSP.

# Testing Policy

-   Testing pyramid: unit > integration > e2e; deterministic tests; mock externals.
-   Coverage target 85% lines/branches (adjust per repo) and track explicit gaps.
-   Prefer red→green→refactor; add a failing test before fixing when feasible.
