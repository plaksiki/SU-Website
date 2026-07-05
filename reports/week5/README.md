# Week 5 Report

## Project Information
- **Project name:** SU Website
- **Description:** The Innopolis University Student Union Portal is a centralized web platform designed to connect IU students with the SU team. Serving as a hub, service provides information about events, departments and let people leave their feedback and donate to SU.
- **License:** [MIT License](https://github.com/plaksiki/SU-Website/blob/main/LICENSE)

---

## Backlog & Sprint Managment

### Product Backlog

- **[Product Backlog Board](https://github.com/orgs/plaksiki/projects/2)**
- **Total Size:**  Story Points 102

### Current Sprint

- **[Sprint-3 Backlog Board](https://github.com/orgs/plaksiki/projects/12)**
- **[Sprint-3 Milestone](https://github.com/plaksiki/SU-Website/milestone/3)**
- **Sprint-3 Goal:** Implement Admins authorization and .xlsx export of questionnaires data
- **Sprint-3 Dates:** 2026-06-30 – 2026-07-05
- **Total Sprint-3 Size:** 39 Story Points

### Selected Scope for Current Sprint

- Admin panel
- Export .xlsx data of questionnaires
- History page
- Update UI (Detailed events and department cards, donate link placeholder)

## Delivered MVP v2 Changes

- ✅ Questionnire participation flow
- ✅ Support for three question types: single choice, multiple choice, text input
- ✅ "History" page
- ✅ Admin Login page and Admin Panel
- ✅ Export of csv tables
- ✅ Updated (opening) events and departments cards

---

## Product Access Artifact

[su-portal](https://10.93.26.192/)

---

## Access / Run Instructions

[DEPLOY.md](https://github.com/plaksiki/SU-Website/blob/main/DEPLOY.md)

---

## Customer Feedback Response Table

| Feedback point | Resulting PBI or issue | Status | Response |
|---|---|---|---|
| Simplified Donation page | [#47](https://github.com/plaksiki/SU-Website/issues/47) | Done | Left only QR-code and link |
| Backlog for admins | - | Rejected | Rejected because creating an admin panel with ability to create questionnaires is prioritized |
| Support for .xlsx import of data | [#45](https://github.com/plaksiki/SU-Website/issues/45) | ✅ Done | Export button in admin panel |
| Dark Theme | [#162](https://github.com/plaksiki/SU-Website/issues/162) | Deffered | Deffered to sprint 5 |

---

## Documentation Links

| Document | Link |
|----------|------|
| Roadmap | [docs/roadmap.md](https://github.com/plaksiki/SU-Website/blob/main/docs/roadmap.md) |
| Definition of Done | [docs/definition-of-done.md](https://github.com/plaksiki/SU-Website/blob/main/docs/definition-of-done.md) |
| Testing Strategy | [docs/testing.md](https://github.com/plaksiki/SU-Website/blob/main/docs/testing.md) |
| Quality Requirements | [docs/quality-requirements.md](https://github.com/plaksiki/SU-Website/blob/main/docs/quality-requirements.md) |
| Quality Requirement Tests | [docs/quality-requirement-tests.md](https://github.com/plaksiki/SU-Website/blob/main/docs/quality-requirement-tests.md) |
| User Acceptance Tests | [docs/user-acceptance-tests.md](https://github.com/plaksiki/SU-Website/blob/main/docs/user-acceptance-tests.md) |
| Development Process | [docs/development-process.md](https://github.com/plaksiki/SU-Website/blob/main/docs/development-process.md) |
| Architecture Overview | [docs/architecture/README.md](https://github.com/plaksiki/SU-Website/blob/main/docs/architecture/README.md) |

---

## Architecture Artifacts

| Artifact | Link |
|----------|------|
| Static View | [docs/architecture/static-view/](https://github.com/plaksiki/SU-Website/blob/main/docs/architecture/static-view/) |
| Dynamic View | [docs/architecture/dynamic-view/](https://github.com/plaksiki/SU-Website/blob/main/docs/architecture/dynamic-view/) |
| Deployment View | [docs/architecture/deployment-view/](https://github.com/plaksiki/SU-Website/blob/main/docs/architecture/deployment-view/) |
| ADR Index | [docs/architecture/adr/](https://github.com/plaksiki/SU-Website/blob/main/docs/architecture/adr/) |

---

## Architecture Summary

The system follows a **microservices-oriented architecture** with clear separation of concerns:

- **Frontend (React)**: Provides the user interface for survey participation and administration. Communicates with backend via REST API.
- **Backend (Spring Boot)**: Acts as the core orchestrator for survey operations. It is a connecting port between database and frontend. Frontend sends questionnaires results to backend, and finally backend form it for database tables.
- **Database (PostgreSQL)**: Stores surveys, questions, and student responses.
- **Supporting Services**: Nginx serves the React frontend, acting as a single entry point for all users. Docker contaibers are essential for our project to package the frontend, backend, and database into isolated but network-connected "boxes" that work identically on any server, communicating with each other.

---

## Quality Requirements → ADRs

| Quality Requirement | Related ADRs |
|---------------------|-------------------------------|
| **Usability – Mobile Responsiveness (QR-004)** | [ADR-001: Mobile-First Layout](https://github.com/plaksiki/SU-Website/blob/main/docs/architecture/adr/ADR-001-mobile-first-layout.md) |
| **Usability – Language Switching (QR-005)** | [ADR-002: One Translations Object for EN/RU](https://github.com/plaksiki/SU-Website/blob/main/docs/architecture/adr/ADR-002-one-translations-object-for-EN%26RU.md) |
| **Usability (QR-006)** | [ADR-003: Validate Questionnaires on Both Frontend and Backend](https://github.com/plaksiki/SU-Website/blob/main/docs/architecture/adr/ADR-003-validate-questionnaires-on-both-frontend-and-backend.md) |

---

## Testing & CI Status

| Aspect | Status |
|--------|--------|
| **User Acceptance Tests** | [UAT History](https://github.com/plaksiki/SU-Website/blob/main/docs/user-acceptance-tests.md#execution-history) |
| **CI Pipeline** | ✅ Passing ([latest CI run on main](https://github.com/plaksiki/SU-Website/actions/runs/28614112933)) |

---

## CI/CD Links

| Link | URL |
|------|-----|
| CI Pipeline Configuration | [.github/workflows/ci.yml](https://github.com/plaksiki/SU-Website/blob/main/.github/workflows/ci.yml) |
| Latest CI Run (Protected Branch) | [Latest CI Run on 'main' branch](https://github.com/plaksiki/SU-Website/actions/runs/28659266179) |

---

## Release Artifacts

| Artifact | Link |
|----------|------|
| SemVer Release (MVP v2) | [v2.0.0](https://github.com/plaksiki/SU-Website/releases/tag/v2.0.0) |
| CHANGELOG.md | [CHANGELOG.md](https://github.com/plaksiki/SU-Website/blob/main/CHANGELOG.md) |

---

## Demo Video

📹 **Public Sanitized Demo Video**
[Demo video](https://drive.google.com/file/d/1PS55YtFoy9vcffSBwMiFZKob6eziSQN4/view?usp=sharing)

---

## UAT Results Summary

**Key Findings:**

- ✅ Admin Login page is hidden and working
- ✅ User can log in admin panel with valid login and password
- ✅ Admins can export csv tables from the panel
- ✅ All question types render correctly
- ✅ Events cards are opening and showing detailed info
- ✅ Users can participate in surveys
- ✅ Customers liked the design of the web page

---

## Hosted Documentation Site

[Documentation Page](https://plaksiki.github.io/SU-Website/)

---

## Week 5 Reports

| Report | Link |
|--------|------|
| Sprint Review Transcript | [reports/week5/sprint-review-transcript.md](https://github.com/plaksiki/SU-Website/blob/main/reports/week5/sprint-review-transcript.md) |
| Sprint Review Summary | [sprint-review-summary.md](https://github.com/plaksiki/SU-Website/blob/main/reports/week5/sprint-review-summary.md) |
| Reflection | [reflection.md](https://github.com/plaksiki/SU-Website/blob/main/reports/week5/reflection.md) |
| Retrospective | [retrospective.md](https://github.com/plaksiki/SU-Website/blob/main/reports/week5/retrospective.md) |
| LLM Report | [llm-report.md](https://github.com/plaksiki/SU-Website/blob/main/reports/week5/llm-report.md) |

---

## Product Status Summary

**Current Status: MVP v2 - Stable**:

- Main page with departments info
- SU History page
- Events page
- User can view detailed event or SU departments info by tapping on the cards
- Students can view available surveys
- Surveys present questions of different types (single/multiple choice, text input) and submit them
- Donation page with QR-code

**Known Issues:**

- In surveys only single choice questions being checked for given answer
- Backlog for admins is not presented
- Thumbor was not implemented

**Health:** ✅ Backend API stable | ✅ Database healthy | ✅ Frontend operational

---

## Next Steps

| Action | Target Sprint |
| ------ | ------------- |
| Creating Questionnaires as an admin | Sprint 4 |
| Light/Dark Mode Switch | POSSIBLY Sprint 5 |
| Upload real SU photos/info into frontend part | Sprint 4 OR 5 |
| Creating Events as an admin | Sprint 4-5 |

---

## Contribution Traceability

| Team Member | Issues | PRs/MRs | Reviews | Testing | Quality | Automation | Architecture | Documentation |
|-------------|--------|---------|---------|---------|---------|------------|--------------|---------------|
| **Alina P.** | #148, #149, #155 | #,# | - | Unit tests | - | - | Dynamic view documentation | README.md, UAT, US, docs/README.md, DEPLOY.md update |
| **Bulat S.** | #150, #157 |  | - | Integration tests | ✅ | CI config | Dynamic view | Sprint LLM report |
| **Emil G.** | #156, #153 | #145 |  | - | - | - | - | Sprint reflection |
| **Daria S.** | #139, #140, #141, #142, #143 | #154, #161, #163, #164, #168, #169 | - | - | ✅ | - | Static view documentation | docs/architecture/static-view |
| **Kristina B.** | #152, #158 | #160, #166 | - | - | ✅ | - | - | Sprint retrospective |
| **Svetlana L.** | #151, #158 | - | - | - | - | - | - | Sprint review summary/transcript |

---

## Screenshots

### Sprint 3 Milestone

![Sprint Milestone](https://github.com/plaksiki/SU-Website/blob/main/reports/week5/images/sprint-milestone.png)

### Board / Workflow View

![Board View](https://github.com/plaksiki/SU-Website/blob/main/reports/week5/images/board-view.png)

### Latest CI Run (Protected Branch)

![CI Run](https://github.com/plaksiki/SU-Website/blob/main/reports/week5/images/ci-run.png)

### SemVer Release (MVP v2)

![SemVer Release](https://github.com/plaksiki/SU-Website/blob/main/reports/week5/images/semver-release.png)

### Example Reviewed PR/MR

![Reviewed PR](https://github.com/plaksiki/SU-Website/blob/main/reports/week5/images/reviewed-pr.png)

### Hosted Documentation Page

![Docs Site](https://github.com/plaksiki/SU-Website/blob/main/reports/week5/images/docs-site.png)
