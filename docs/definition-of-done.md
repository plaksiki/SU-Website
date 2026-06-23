# Definition of Done

**Last Updated:** 2026-06-20

A PBI may be marked `Done` only when BOTH:
- Issue-specific acceptance criteria are satisfied
- This Definition of Done is satisfied

## Minimum Requirements

1. **Acceptance Criteria** - All issue acceptance criteria are satisfied and verified

2. **Code Review** - Work is reviewed and approved by at least one team member who is not the author

3. **Tests** - All required tests pass:
   - Unit tests
   - Integration tests (if applicable)
   - Build passes without errors

4. **Verification Evidence** - Evidence is preserved in:
   - PR/MR description or comments
   - Or issue comments with screenshots/logs

5. **CHANGELOG.md Updated** - For every user-visible change:
   - Added entry under `[Unreleased]` section
   - Follows Keep a Changelog format

6. **PR/MR Merged** - For supporting/implementation PBIs:
   - Linked PR/MR is merged into the protected default branch (`main` or `develop`)

## User Stories Specific

For user stories, additionally ensure:
- All linked supporting PBIs are marked "Done"
- Supporting PBIs provide implementation, review, and verification evidence
- Acceptance criteria are demonstrated (screenshot or video if UI-related)

## Quality Standards

- No new warnings, errors, or critical issues
- Documentation updated if API or user-facing changes occur
- No regressions introduced in existing functionality

## Process Compliance

- Sprint milestone is set correctly
- Issue linked to relevant PR/MR
- Labels are accurate and up-to-date
- Branch naming follows project conventions

