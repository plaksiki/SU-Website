# Week 3 Report: MVP v1 Delivery

## Project Information
- **Project Name:** SU Website
- 
- **Description:** The Innopolis University Student Union Portal is a centralized web platform designed to connect IU students with the SU team. Serving as a hub, service provides information about events, departments and let people leave their feedback and donate to SU.
- **License:** [MIT License](https://github.com/plaksiki/SU-Website/blob/main/LICENSE)


## User Story & PBI Scope Summary

### Current Status
Since Assignment 2, we have refined our user stories and PBI scope to focus on delivering a functional MVP v1. The current scope includes .

- **User Stories Documentation:** [docs/user-stories.md](https://github.com/plaksiki/SU-Website/blob/main/docs/user-stories.md)
- **Historical Reference:** [reports/week2/user-stories.md](https://github.com/plaksiki/SU-Website/blob/main/reports/week2/user-stories.md)
- **Relevant Issues:** [Link to filtered issues for current state and history]

### Customer Feedback Addressed in MVP v1
The following customer feedback points from Assignment 2 have been addressed:

1. There shall not be separate Internship page, it will be debeloped 
through events page. → Removed this page from prototype and did not implement the page in MVP v1.
2. The main page contains a basic description of the organizations and a block with Student Union members. → Cards with short info of organisations and list of core members of each.
3. All events should be displayed with a clear division into two categories: upcoming and past events. → Events filters: All, Upsoming, Past.
---

## Backlog & Sprint Management

### Product Backlog
- **[Product Backlog Board](https://github.com/orgs/plaksiki/projects/2)**
- **Total Size:** 63 Story Points
- **MVP v1 Scope View:** ['MVP v1' Milestone](https://github.com/plaksiki/SU-Website/milestone/4)

### Current Sprint
- **[Sprint-1 Backlog Board](https://github.com/orgs/plaksiki/projects/3/views/1)**
- **[Sprint-1 Milestone](https://github.com/plaksiki/SU-Website/milestone/1)**
- **Sprint-1 Goal:** Establish project infrastructure and core UI foundation/
- **Sprint-1 Dates:** 2026-06-17 – 2026-06-21
- **Total Sprint-1 Size:** 31 Story Points

### MVP v1 Scope Description
The selected MVP v1 scope includes:

- **Main Page (SU info):** Page serves to introduce Students Union of Innopolis University.
- **Events Page:** Page shows active and past events conducted by SU.
- **Donation Page:** User can open Donation page and see QR-code/links to donate to SU.
- **Language Switch:** User Can open website in either English or Russian modes.
- **Auto-updated web-page:** All changes in main branch in git repository simultaneously affect web page

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

### MVP Version Tracking
MVP v1 scope is tracked using:
- **Version field:** All MVP v1 PBIs are tagged with milestone "MVP v1"
- **Filtered view:** [Link to filtered view showing only MVP v1 items](https://github.com/plaksiki/SU-Website/issues?q=is%3Aissue%20state%3Aopen%20milestone%3A%22MVP%20v1%22)

### Task Decomposition
User Stories are decomposed into technical tasks during Sprint Planning. Each task is:
- Assigned to a specific team member
- Estimated in Story Points
- Linked to the parent User Story (where appropriate)

---

## Roadmap Direction

### Current Sprint
Focus on design prototype and frontend part to deliver User-friendly interface and nice visual design of pages.

### Next Sprint
Planned work includes Deliver MVP v2 with emphasis on more detailed event/main pages.

**Full Roadmap:** [docs/roadmap.md](https://github.com/plaksiki/SU-Website/blob/main/docs/roadmap.md)

---

## MVP v1 Verification Evidence
Completed MVP v1 PBIs are verified through:

1. **Automated Tests:** Test passes where needed
2. **Manual Testing:** Website opens on mobile phones/PCs/Desktops if required conditions are satisfied
3. **Code Review:** All PRs reviewed and approved
4. **Acceptance Criteria:** All criteria met and signed off

Verification evidence can be found in:
- [#89 PR closed](https://github.com/plaksiki/SU-Website/pull/89)
- [Working MVP v1 video link](https://drive.google.com/file/d/1BB24vPEWdS3sDSKUaNwpFbZiY8T7Vzl2/view?usp=sharing)

---

## Product Status Summary

### Current Status
The product is at **MVP v1** stage with the following features delivered:
- ✅ Main info-page for SU departmets
- ✅ Events page
- ✅ Language Switch (Eng/Rus)
- ✅ Donation Page

### Known Limitations
- No actual QR-codes or payment links provided (so donation cannot be performed)
- Events full details are not required yet
- No real information about SU is presented on website

---

## Next Steps
1. **Short-term (Sprint 2):**
   - More detailed Events cards
   - More placeholders for info on the main page
   - Light/Dark mode switch

2. **Long-term:**
   - Questionaires with ability to export data
   - Ability to download photos from past events

---

## Contribution Traceability

| Team Member | Issues | PRs/MRs | Reviews |
|-------------|--------|---------|---------|
| Alina Petrova | [#57](https://github.com/plaksiki/SU-Website/issues/57) ,[#75](https://github.com/plaksiki/SU-Website/issues/75), [#88](https://github.com/plaksiki/SU-Website/issues/88) |  ,[#89](https://github.com/plaksiki/SU-Website/pull/89) | [review on #68 PR](https://github.com/plaksiki/SU-Website/pull/68#pullrequestreview-4531248437) |
| Bulat Shaikhutdinov | - | [#87](https://github.com/plaksiki/SU-Website/pull/87), [#91](https://github.com/plaksiki/SU-Website/pull/91) | [review on #86 PR](https://github.com/plaksiki/SU-Website/pull/86#pullrequestreview-4538426937) |
| Daria Sevostianova | [#63](https://github.com/plaksiki/SU-Website/issues/63) | [#68](https://github.com/plaksiki/SU-Website/pull/68) | [review on #71 PR](https://github.com/plaksiki/SU-Website/pull/71#pullrequestreview-4531900031) |
| Emil Gilfanov | [#55](https://github.com/plaksiki/SU-Website/issues/55), [#54](https://github.com/plaksiki/SU-Website/issues/54), [#53](https://github.com/plaksiki/SU-Website/issues/53), [#52](https://github.com/plaksiki/SU-Website/issues/52) | [#56](https://github.com/plaksiki/SU-Website/pull/56), [#92](https://github.com/plaksiki/SU-Website/pull/92) | [review on #87](https://github.com/plaksiki/SU-Website/pull/87#pullrequestreview-4538629646) |
| Kristina Butkina | [#83](https://github.com/plaksiki/SU-Website/issues/83) | [#84](https://github.com/plaksiki/SU-Website/pull/84) | [review on #66 PR](https://github.com/plaksiki/SU-Website/pull/66#pullrequestreview-4528098794) |
| Svetlana Levagina | [[#78](https://github.com/plaksiki/SU-Website/issues/78)] | [#95](https://github.com/plaksiki/SU-Website/pull/95) |[review on #91 PR](https://github.com/plaksiki/SU-Website/pull/91#pullrequestreview-4539755972) |

---

## Release & Documentation

- **SemVer Release (MVP v1):** 
- **CHANGELOG:** [CHANGELOG.md](https://github.com/plaksiki/SU-Website/blob/main/CHANGELOG.md)
- **Process Requirements:** [Process_Requirements.md](https://gitlab.pg.innopolis.university/swp_26/swp_26/-/blob/main/Process_Requirements.md)
- **Roadmap:** [docs/roadmap.md](https://github.com/plaksiki/SU-Website/blob/main/docs/roadmap.md)
- **Definition of Done:** [docs/definition-of-done.md](https://github.com/plaksiki/SU-Website/blob/main/docs/definition-of-done.md)

---

## Templates

- **[Issue Templates](https://github.com/plaksiki/SU-Website/tree/main/.github/ISSUE_TEMPLATE)** 
- **[PR/MR Template](https://github.com/plaksiki/SU-Website/blob/main/.github/pull_request_template.md)**

---

## Week 3 Pull Requests

Reviewed issue-linked PRs/MRs created during Week 3 (#[PR/MR 3] - [Brief description] - [Reviewer]):

1. [#66](https://github.com/plaksiki/SU-Website/pull/66) - Added Docker infrastructure: PostgreSQL, Redis, Thumbor, but .gitignore did not conatin critical file names - Kristina B.
2. [#86](https://github.com/plaksiki/SU-Website/pull/86) - Migrated user-stories.md to docs, all links and details are checked and verified - Bulat S.
3. [#87](https://github.com/plaksiki/SU-Website/pull/87) - Fronted base part uploaded,but stil requires more space for feature fillers on pages - Emil G.
4. [#68](https://github.com/plaksiki/SU-Website/pull/68) - Added survey entity and controller for survey backend, but should be in another path of the repo - Alina P.
5. [#91](https://github.com/plaksiki/SU-Website/pull/91) - LLM report, but it did not complete. Later assumes were implemented and approved - Svetlana L.
6. [#95](https://github.com/plaksiki/SU-Website/pull/95) - Trancript/summary of customer review, verified - Bulat S.

---

## MVP v1 Deployment

**Deployment Link:** [SU-portal](http://10.93.26.192/)

**Access/Run Instructions:** [DEPLOY.md](https://github.com/plaksiki/SU-Website/blob/week3-bilidjinka/DEPLOY.md)

---

## Demonstration

**Video Demonstration:** [Link to public sanitized video demonstration (< 2 minutes)](https://drive.google.com/file/d/1BB24vPEWdS3sDSKUaNwpFbZiY8T7Vzl2/view?usp=sharing)

---

## Screenshots

### Product Backlog View
![Product Backlog](https://github.com/plaksiki/SU-Website/blob/main/reports/week3/images/ProductBacklogItems.png)

### Sprint Backlog View
![Sprint Backlog](https://github.com/plaksiki/SU-Website/blob/main/reports/week3/images/SprintBacklog.png)

### Sprint Milestone
![Sprint Milestone](https://github.com/plaksiki/SU-Website/blob/main/reports/week3/images/Sprint1_Milestone.png)

### MVP Version Field/Grouped View
![MVP Version View](https://github.com/plaksiki/SU-Website/blob/main/reports/week3/images/MVP-v1_Milestone.png)

### SemVer Release
![SemVer Release]()

### Delivered MVP v1
[MVP v1 Delivery Scope](https://github.com/plaksiki/SU-Website/tree/main/reports/week3/images/MVP-v1)

### Example Reviewed Issue-Linked PR/MR
![Reviewed PR](https://github.com/plaksiki/SU-Website/blob/main/reports/week3/images/Reviewed-PR-MR-example.png)

---

## Customer Review
- **Customer Review recordings:** [Video and audio versions](https://drive.google.com/drive/folders/19RipBp3I-usN2MFVNbPSy4OBANnDOnHj?usp=sharing)
- **Transcript:** [Link or customer review transcript](https://github.com/plaksiki/SU-Website/blob/main/reports/week3/customer-review-transcript.md)
- **Summary:** [Link to customer review summary](https://github.com/plaksiki/SU-Website/blob/main/reports/week3/customer-review-summary.md)

---

## Team Reflections

- **Week 3 Reflection:** [reports/week3/reflection.md](https://github.com/plaksiki/SU-Website/blob/main/reports/week3/reflection.md)
- **Retrospective:** [reports/week3/retrospective.md](https://github.com/plaksiki/SU-Website/blob/main/reports/week3/retrospective.md)
- **LLM Report:** [reports/week3/llm-report.md](https://github.com/plaksiki/SU-Website/blob/main/reports/week3/llm-report.md)

---
