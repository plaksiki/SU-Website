# Week 4 Report

## Project Information
- **Project name:** SU Website
- **Description:** The Innopolis University Student Union Portal is a centralized web platform designed to connect IU students with the SU team. Serving as a hub, service provides information about events, departments and let people leave their feedback and donate to SU.
- **License:** [MIT License](https://github.com/plaksiki/SU-Website/blob/main/LICENSE)

---

## Backlog & Sprint Managment
### Product Backlog
- **[Product Backlog Board](https://github.com/orgs/plaksiki/projects/2)**
- **Total Size:** 63 Story Points

### Current Sprint
- **[Sprint-2 Backlog Board](https://github.com/orgs/plaksiki/projects/6)**
- **[Sprint-2 Milestone](https://github.com/plaksiki/SU-Website/milestone/2)**
- **Sprint-2 Goal:** Develop survey structure: Frontend -> Backend -> PostgreSQL
- **Sprint-2 Dates:** 2026-06-22 – 2026-06-28
- **Total Sprint-1 Size:** 33 Story Points

### Selected Scope for Current Sprint
The selected scope includes:
- Polls page with available polls.
- PostgreSQL table questionnaire, which connects to backend through VM.
- Endpoint /questionnaire/{id}, which returns JSON file with general info about a poll (name, description, dates).
- Specific poll in Polls page, which displays information from GET HTTP Request.

---

## User Story & PBI Scope Summary

### Relevant User stories
For this sprint we decided to implement [US-08](https://github.com/plaksiki/SU-Website/issues/48) by creating polls and connecting them to PostgreSQL
- **User Stories Documentation:** [docs/user-stories.md](https://github.com/plaksiki/SU-Website/blob/main/docs/user-stories.md)
- **Historical Reference:** [reports/week2/user-stories.md](https://github.com/plaksiki/SU-Website/blob/main/reports/week2/user-stories.md)
- **Relevant Issues:** [US-08](https://github.com/plaksiki/SU-Website/issues/48) 

### Customer Feedback Addressed in Sprint-2
The following customer feedback points Sprint-1 have been addressed:
- When changing the language, the text does not move out.
- Polls window implemented
- Polls are connected to info from PostgreSQL

---

## Quality Requirements

The project defines measurable non-functional quality requirements based on the ISO/IEC 25010 quality model.

- **Quality Requirements:** [docs/quality-requirements.md](https://github.com/plaksiki/SU-Website/blob/Assignment/docs/quality-requirements.md)
- **Quality Requirement Tests:** [docs/quality-requirement-tests.md](https://github.com/plaksiki/SU-Website/blob/Assignment/docs/quality-requirement-tests.md)

### Covered Quality Characteristics
| ID | ISO/IEC 25010 Sub-characteristic | Verification |
|----|----------------------------------|--------------|
| QR-001 | Maintainability / Analysability | QRT-001 |
| QR-002 | Reliability / Maturity | QRT-002 |
| QR-003 | Performance Efficiency / Resource Utilisation | QRT-003 |

---

## User Acceptance Testing
User Acceptance Testing was conducted with the customer during the Sprint Review.

### Documentation

- **UAT Scenarios:** [docs/user-acceptance-tests.md]([...](https://github.com/plaksiki/SU-Website/blob/main/docs/user-acceptance-tests.md))
- **Execution Results:** All UAT are passed successfully

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

### Templates  
- [Issue Templates](https://github.com/plaksiki/SU-Website/tree/main/.github/ISSUE_TEMPLATE)
- [PR/MR Template](https://github.com/plaksiki/SU-Website/blob/main/.github/pull_request_template.md)

---

## Continuous Integration
The project uses GitHub Actions to automatically verify code quality before merging.

### CI Pipeline includes
- Build
- Unit Tests
- Integration Tests
- Coverage
- Additional QA Check

### Testing & Quality Assurance
**Testing:** [docs/testing.md](https://github.com/plaksiki/SU-Website/blob/main/docs/testing.md)

---

## Roadmap Direction

### Current Sprint
Focused on:
- Implementing polls
- Connecting general info about polls to info from PostgerSQL tables
- Connecting backend to PostgreSQL through VM (-> Dockerizing backend)
- Connecting backend to frontend

### Next Sprint
Planned work includes:
- Finish up main page by making separate pages for departments
- Finish up events by making them clickable
- Finish up surveys, for them to be openable. Questions and answers to PostgreSQL tables
- Admin panel with authorization
- Survey and Event publishing for Admins

### Full Roadmap
[docs/roadmap.md](https://github.com/plaksiki/SU-Website/blob/main/docs/roadmap.md)

---

## Product Status Summary

### Current Status
The product is at **MVP v1** stage with the following features delivered:  
 ✅ Main info-page for SU departmets  
 ✅ Events page  
 ✅ Language Switch (Eng/Rus)  
 ✅ Donation Page  
 ✅ Polls page

### Known Limitations
- No actual QR-codes or payment links provided (so donation cannot be performed)
- Events full details are not visible yet
- No real information about SU is presented on website
- Departments don't have their own windows
- Polls connected to PostgreSQL have only general info in them

### Next Steps
1. **Short-term (Sprint 2):**
   - More detailed Events cards
   - More placeholders for info on the main page
   - Light/Dark mode switch
   - Separate windows for departments
   - Fully working polls
   - Admin panel
   - Statistics panel for admins

2. **Long-term:**
   - Questionaires with ability to export data
   - Ability to download photos from past events
   - Photos in events
   - Backlog for amins
   - History page

### Deployment
**Deployment Link:** [SU-portal](http://10.93.26.192/)
**Access/Run Instructions:** [DEPLOY.md](https://github.com/plaksiki/SU-Website/blob/week3-bilidjinka/DEPLOY.md)

---

## Release & Documentation

- **SemVer Release (MVP v1):** 
- **CHANGELOG:** [CHANGELOG.md](https://github.com/plaksiki/SU-Website/blob/main/CHANGELOG.md)
- **Process Requirements:** [Process_Requirements.md](https://gitlab.pg.innopolis.university/swp_26/swp_26/-/blob/main/Process_Requirements.md)
- **Roadmap:** [docs/roadmap.md](https://github.com/plaksiki/SU-Website/blob/main/docs/roadmap.md)
- **Definition of Done:** [docs/definition-of-done.md](https://github.com/plaksiki/SU-Website/blob/main/docs/definition-of-done.md)

---

## Contribution Traceability

| Team Member | Issues | PRs/MRs | Reviews |
|-------------|--------|---------|---------|
| Alina Petrova | [#115](https://github.com/plaksiki/SU-Website/issues/115) | [#128](https://github.com/plaksiki/SU-Website/pull/128), [#111](https://github.com/plaksiki/SU-Website/pull/111) | - |
| Bulat Shaikhutdinov | [#130](https://github.com/plaksiki/SU-Website/issues/130) | [#131](https://github.com/plaksiki/SU-Website/pull/131) | [review on #111 PR](https://github.com/plaksiki/SU-Website/pull/86#pullrequestreview-4538426937), [#129 PR](https://github.com/plaksiki/SU-Website/pull/129#pullrequestreview-4587672965) |
| Daria Sevostianova | [#105](https://github.com/plaksiki/SU-Website/issues/105), [#115](https://github.com/plaksiki/SU-Website/issues/115) | [#127](https://github.com/plaksiki/SU-Website/pull/127), [#117](https://github.com/plaksiki/SU-Website/pull/117) | [review on #128 PR](https://github.com/plaksiki/SU-Website/pull/128#discussion_r3487999504) |
| Emil Gilfanov | [#107](https://github.com/plaksiki/SU-Website/issues/107) | [#109](https://github.com/plaksiki/SU-Website/pull/109) | - |
| Kristina Butkina | [#132](https://github.com/plaksiki/SU-Website/issues/132) | [#133](https://github.com/plaksiki/SU-Website/pull/133) | [review on #131 PR](https://github.com/plaksiki/SU-Website/pull/131#pullrequestreview-4587785411)|
| Svetlana Levagina | [#122](https://github.com/plaksiki/SU-Website/issues/122) | [#129](https://github.com/plaksiki/SU-Website/pull/129) |[review on #127 PR](https://github.com/plaksiki/SU-Website/pull/127#pullrequestreview-4587647308) |

---

## Week 4 Pull Requests

Reviewed issue-linked PRs/MRs created during Week 3 (#[PR/MR 3] - [Brief description] - [Reviewer]):

1. [#128](https://github.com/plaksiki/SU-Website/pull/128) - Added reports/week4/ with done LLM report, reflection.md and partially written README.md for this week - Alina P.
2. [#131](https://github.com/plaksiki/SU-Website/pull/131) - Improved frontend UI with event cards, department tags, and mobile navbar - Bulat S.
3. [#127](https://github.com/plaksiki/SU-Website/pull/127) - Backend connected to PosgreSQL and polls are visible on frontend - Daria S.
4. [#117](https://github.com/plaksiki/SU-Website/pull/117) - Backend variables changed to connect to specific fields in tables - Daria S.
5. [#109](https://github.com/plaksiki/SU-Website/pull/109) - Added the finished_at TIMESTAMP field, changed the name of created_at TIMESTAMP field to started_at - Emil G.
6. [#133](https://github.com/plaksiki/SU-Website/pull/133) - Added history page with timeline, footer with contacts, gradient background for all pages, and smooth hover animations for cards - Kristina B.
7. [#129](https://github.com/plaksiki/SU-Website/pull/129) - Added questionnaires feature to the frontend - Svetlana L.

---

## Customer Review
- **Customer Review recordings:** [Video](https://drive.google.com/file/d/1F9Dp_rODdi8BVr5h6jSaAK32LsGNrG1W/view?usp=sharing)
- **Transcript:** [Link or customer review transcript](https://github.com/plaksiki/SU-Website/blob/Assignment/reports/week4/customer-review-transcript.md)
- **Summary:** [Link to customer review summary](https://github.com/plaksiki/SU-Website/blob/Assignment/reports/week4/customer-review-summary.md)

---

## Screenshots

### Product Backlog View
![Product Backlog](https://github.com/plaksiki/SU-Website/blob/Assignment/reports/week4/images/Product-backlog.png)

### Sprint Backlog View
![Sprint Backlog](https://github.com/plaksiki/SU-Website/blob/Assignment/reports/week4/images/Sprint-2-backlog.png)

### Sprint Milestone
![Sprint Milestone issues](https://github.com/plaksiki/SU-Website/blob/Assignment/reports/week4/images/Milestone-issues.png)

---

## Team Reflections

- **Reflection:** [reports/week4/reflection.md](https://github.com/plaksiki/SU-Website/blob/main/reports/week4/reflection.md)
- **Retrospective:** [reports/week4/retrospective.md](https://github.com/plaksiki/SU-Website/blob/main/reports/week4/retrospective.md)
- **LLM Report:** [reports/week4/llm-report.md](https://github.com/plaksiki/SU-Website/blob/main/reports/week4/llm-report.md)

---
