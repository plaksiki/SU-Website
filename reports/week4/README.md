# Week 4 Report: CI, Quality Requirements & Testing

## Project Information
- **Project Name:** SU Website
- **Description:** The Innopolis University Student Union Portal is a centralized web platform designed to connect IU students with the SU team. Serving as a hub, service provides information about events, departments and let people leave their feedback and donate to SU.
- **License:** [MIT License](https://github.com/plaksiki/SU-Website/blob/main/LICENSE)

---

## User Story & PBI Scope Summary

### Current Status
Since Assignment 3, we have continued Sprint 2 with focus on CI automation, quality requirements, and testing infrastructure. The current scope includes quality gates, automated checks, and documentation.

- **User Stories Documentation:** [docs/user-stories.md](https://github.com/plaksiki/SU-Website/blob/main/docs/user-stories.md)
- **Relevant Issues:** [Sprint-2 Milestone](https://github.com/plaksiki/SU-Website/milestone/2)

### Customer Feedback Addressed in Sprint 2
The following customer feedback points from Sprint 1 review (2026-06-19) have been addressed:

1. Events should be informative cards only, no "Join" button. → Events page shows cards with name, description, and date only.
2. Donation page is overloaded — leave only a QR code or link. → Donation page simplified to QR code only.
3. Data export should be .xlsx/.csv download. → Planned for Sprint 2, in progress.
4. Admin backlog must be for internal team only. → Backlog tab visible in admin mode only.

---

## Backlog & Sprint Management

### Product Backlog
- **[Product Backlog Board](https://github.com/orgs/plaksiki/projects/2)**
- **Total Size:** [TODO: Story Points]
- **MVP v2 Scope View:** [MVP v2 Milestone](https://github.com/plaksiki/SU-Website/milestone/5)

### Current Sprint
- **[Sprint-2 Backlog Board](https://github.com/orgs/plaksiki/projects/3/views/1)**
- **[Sprint-2 Milestone](https://github.com/plaksiki/SU-Website/milestone/2)**
- **Sprint-2 Goal:** Deliver MVP v2 with more detailed event pages and integrated backend
- **Sprint-2 Dates:** 2026-06-23 – 2026-06-28
- **Total Sprint-2 Size:** [TODO: Story Points]

### Sprint 2 Scope Description
The selected Sprint 2 scope includes:

- **CI Pipeline:** Automated ESLint, TypeScript, build, and bundle size checks on every PR.
- **Unit Tests:** Event filtering logic tested with Vitest (4 tests passing).
- **Quality Requirements:** Three quality requirements defined and documented.
- **UAT Scenarios:** Three user acceptance test scenarios defined.
- **Backend Integration:** Frontend connected to backend and databases.

---

## PBI Management Approach

### PBI Types
- **Epic:** Large bodies of work that can be broken down into smaller stories
- **User Story:** End-user functionality from the perspective of a user role
- **Task:** Technical implementation work derived from stories
- **Bug:** Defects requiring fixes

### Statuses & Priorities
- **Statuses:** Backlog, Ready, In Progress, Review, Done
- **Priorities:** High, Medium, Low

### Sprint Milestone Usage
Each Sprint is tracked via a dedicated milestone containing all PBIs assigned to that Sprint.

### Task Decomposition
User Stories are decomposed into technical tasks during Sprint Planning. Each task is:
- Assigned to a specific team member
- Estimated in Story Points
- Linked to the parent User Story (where appropriate)

---

## Roadmap Direction

### Current Sprint
Focus on CI automation, quality requirements, testing infrastructure, and backend integration.

### Next Sprint
Planned work includes questionnaires with data export, history section, and full backend integration.

**Full Roadmap:** [docs/roadmap.md](https://github.com/plaksiki/SU-Website/blob/main/docs/roadmap.md)

---

## Quality Requirements & Testing

### Quality Requirements
- **[docs/quality-requirements.md](https://github.com/plaksiki/SU-Website/blob/main/docs/quality-requirements.md)**

| ID | ISO/IEC 25010 Sub-characteristic | Measure |
|----|----------------------------------|---------|
| QR-1 | Maintainability / Analysability | 0 lint errors, 0 type errors in CI |
| QR-2 | Reliability / Maturity | Build completes successfully on every push |
| QR-3 | Performance Efficiency / Resource Utilisation | JS bundle size ≤ 1 MB |

### Quality Requirement Tests
- **[docs/quality-requirement-tests.md](https://github.com/plaksiki/SU-Website/blob/main/docs/quality-requirement-tests.md)**

| ID | Verifies | Type | Status |
|----|----------|------|--------|
| QRT-1 | QR-1 | ESLint + TypeScript check | ✅ Automated in CI |
| QRT-2 | QR-2 | Production build check | ✅ Automated in CI |
| QRT-3 | QR-3 | Bundle size check | ✅ Automated in CI |

### Testing
- **[docs/testing.md](https://github.com/plaksiki/SU-Website/blob/main/docs/testing.md)**
- **Unit tests:** [su-frontend/src/app.test.ts](https://github.com/plaksiki/SU-Website/blob/main/su-frontend/src/app.test.ts) — 4 tests passing
- **Integration tests:** Planned for Sprint 3
- **Critical modules coverage target:** ≥ 30% (planned Sprint 3)

### Definition of Done
- **[docs/definition-of-done.md](https://github.com/plaksiki/SU-Website/blob/main/docs/definition-of-done.md)**

### User Acceptance Tests
- **[docs/user-acceptance-tests.md](https://github.com/plaksiki/SU-Website/blob/main/docs/user-acceptance-tests.md)**

| ID | Scenario | Status |
|----|----------|--------|
| UAT-1 | Viewing upcoming and past events | 🔜 Pending – Sprint 2 Review 2026-06-28 |
| UAT-2 | Submitting an anonymous questionnaire | 🔜 Pending – Sprint 2 Review 2026-06-28 |
| UAT-3 | Switching interface language | 🔜 Pending – Sprint 2 Review 2026-06-28 |

---

## CI Pipeline

- **[CI Workflow](https://github.com/plaksiki/SU-Website/blob/main/.github/workflows/ci.yml)**
- **[Check Links Workflow](https://github.com/plaksiki/SU-Website/blob/main/.github/workflows/check-links.yml)**
- **[Latest CI Run](https://github.com/plaksiki/SU-Website/actions)**

CI steps on every pull request to `main`:
1. Lint (ESLint)
2. Run tests (Vitest — 4 unit tests)
3. Type check & Build (tsc + vite build)
4. Check bundle size (max 1 MB)

---

## Sprint 2 Verification Evidence
Completed Sprint 2 PBIs are verified through:

1. **Automated CI:** All checks pass on pull requests to `main`
2. **Unit Tests:** 4 tests passing in Vitest
3. **Code Review:** All PRs reviewed and approved
4. **Acceptance Criteria:** All criteria met and signed off

Verification evidence:
- [CI passing screenshot](images/ci-run.png)
- [TODO: Working MVP v2 video link]

---

## Product Status Summary

### Current Status
The product is at **MVP v2** stage with the following features delivered:
- ✅ Main info-page for SU departments
- ✅ Events page with upcoming/past filtering
- ✅ Language Switch (EN/RU)
- ✅ Donation Page
- ✅ CI pipeline with automated checks
- ✅ Unit tests for event filtering logic
- [TODO: backend integration status]

### Known Limitations
- No actual QR-codes or payment links provided
- No real information about SU presented on website (brand book not yet received)
- Unit test coverage below 30% for critical modules (planned Sprint 3)

---

## Next Steps
1. **Short-term (Sprint 3):**
   - Questionnaires with .xlsx/.csv export
   - History section on main page
   - Unit and integration tests for critical modules (≥ 30% coverage)

2. **Long-term:**
   - Ability to download photos from past events
   - Full backend integration for all pages

---

## Contribution Traceability

| Team Member | Issues | PRs/MRs | Reviews |
|-------------|--------|---------|---------|
| Alina Petrova | [TODO] | [TODO] | [TODO] |
| Bulat Shaikhutdinov | [#112](https://github.com/plaksiki/SU-Website/issues/112) | [TODO] | [TODO] |
| Daria Sevostianova | [TODO] | [TODO] | [TODO] |
| Emil Gilfanov | [TODO] | [TODO] | [TODO] |
| Kristina Butkina | [TODO] | [TODO] | [TODO] |
| Svetlana Levagina | [TODO] | [TODO] | [TODO] |

---

## Release & Documentation

- **SemVer Release (MVP v2):** [TODO: link to v0.2.0 release]
- **CHANGELOG:** [CHANGELOG.md](https://github.com/plaksiki/SU-Website/blob/main/CHANGELOG.md)
- **Process Requirements:** [Process_Requirements.md](https://gitlab.pg.innopolis.university/swp_26/swp_26/-/blob/main/Process_Requirements.md)
- **Roadmap:** [docs/roadmap.md](https://github.com/plaksiki/SU-Website/blob/main/docs/roadmap.md)
- **Definition of Done:** [docs/definition-of-done.md](https://github.com/plaksiki/SU-Website/blob/main/docs/definition-of-done.md)
- **Quality Requirements:** [docs/quality-requirements.md](https://github.com/plaksiki/SU-Website/blob/main/docs/quality-requirements.md)
- **Quality Requirement Tests:** [docs/quality-requirement-tests.md](https://github.com/plaksiki/SU-Website/blob/main/docs/quality-requirement-tests.md)
- **Testing Strategy:** [docs/testing.md](https://github.com/plaksiki/SU-Website/blob/main/docs/testing.md)
- **User Acceptance Tests:** [docs/user-acceptance-tests.md](https://github.com/plaksiki/SU-Website/blob/main/docs/user-acceptance-tests.md)

---

## Templates

- **[Issue Templates](https://github.com/plaksiki/SU-Website/tree/main/.github/ISSUE_TEMPLATE)**
- **[PR/MR Template](https://github.com/plaksiki/SU-Website/blob/main/.github/pull_request_template.md)**

---

## Week 4 Pull Requests

Reviewed issue-linked PRs/MRs created during Week 4:

1. [TODO: #PR] - [description] - [Reviewer]
2. [TODO: #PR] - [description] - [Reviewer]

---

## Deployment

**Deployment Link:** [SU-portal](http://10.93.26.192/)

**Access/Run Instructions:** [DEPLOY.md](https://github.com/plaksiki/SU-Website/blob/main/DEPLOY.md)

---

## Demonstration

**Video Demonstration:** [TODO: link to public sanitized video demonstration (< 2 minutes)]

---

## Screenshots

### Sprint Milestone
![Sprint Milestone](images/sprint2-milestone.png)

### Latest CI Run
![CI Run](images/ci-run.png)

### Branch Protection
![Branch Protection](images/branch-protection.png)

### Test Results
![Test Results](images/test-results.png)

### Bundle Size Check
![Bundle Size](images/bundle-size.png)

### SemVer Release
![SemVer Release](images/semver-release.png)

### Example Reviewed Issue-Linked PR/MR
![Reviewed PR](images/reviewed-pr.png)

---

## Customer Review
- **Customer Review recordings:** [TODO: link to recording]
- **Transcript:** [reports/week4/customer-review-transcript.md](https://github.com/plaksiki/SU-Website/blob/main/reports/week4/customer-review-transcript.md)
- **Summary:** [reports/week4/customer-review-summary.md](https://github.com/plaksiki/SU-Website/blob/main/reports/week4/customer-review-summary.md)

---

## Team Reflections

- **Reflection:** [reports/week4/reflection.md](https://github.com/plaksiki/SU-Website/blob/main/reports/week4/reflection.md)
- **Retrospective:** [reports/week4/retrospective.md](https://github.com/plaksiki/SU-Website/blob/main/reports/week4/retrospective.md)
- **LLM Report:** [reports/week4/llm-report.md](https://github.com/plaksiki/SU-Website/blob/main/reports/week4/llm-report.md)

---
