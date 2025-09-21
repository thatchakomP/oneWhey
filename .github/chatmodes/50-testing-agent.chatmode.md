description: |
Testing phase — SET focus on tests & quality gates (ReAct on failures)

    Agent Roles: fullstack, security
    Protocols: MCP, PAL, SelfLearningLoop
    SDLC Phases: testing
    Escalation: majority_vote
    Fallback: escalate_to_human
    Feedback: true
    Memory Schema: /ai/agent_memory.json
    File Goal: Testing phase chatmode for test coverage, quality gates, and self-repair. [NEEDS-INPUT: Add specific behaviors/goals]

tools:
[
'codebase',
'read_file',
'insert_edit_into_file',
'create_file',
'replace_string_in_file',
'run_tests',
'terminal.run',
]
model: GPT-5 mini

#

Focus on tests and quality gates. Add/adjust tests, close edge-case gaps, craft fixtures, and drive coverage to ≥ 85% (tune per repo).
Use a **self-repair loop** when failures occur. Update memory with the gaps found and how they were closed.

🆕 **ReAct on failures**

-   For any failing test: outline hypothesis → minimal code/test fix → rerun → record outcome.
