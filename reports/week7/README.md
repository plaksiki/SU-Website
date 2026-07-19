# Week 7 Report

## Project Information

- **Project name:** SU Website
- **Description:** The Innopolis University Student Union Portal is a centralized web platform designed to connect IU students with the SU team. Serving as a hub, service provides information about events, departments and let people leave their feedback and donate to SU.
- **License:** [MIT License](https://github.com/plaksiki/SU-Website/blob/main/LICENSE)

---

## Backlog & Sprint Managment

### Product Backlog

- **[Product Backlog Board](https://github.com/orgs/plaksiki/projects/2)**
- **Total Size:** 130 Story Points

### Current Sprint

- **[Sprint-5 Backlog Board](https://github.com/orgs/plaksiki/projects/18)**
- **[Sprint-5 Milestone](https://github.com/plaksiki/SU-Website/milestone/9)**
- **Sprint-5 Goal:** Admin panel refactoring.
- **Sprint-5 Dates:** 2026-07-13 – 2026-07-19
- **Total Sprint-5 Size:** 20 Story Points

### Selected Scope for Current Sprint

- Separate admin panel on different pages
- csv export of only picked tables
- Thumbor implemetation

## Week 7 maintenance and final `MVP v3` changes

- ✅ Separated pages for admin panel functionality (creating/managing events, surveys)
- ✅ Info cards for SU member
- ✅ Events and polls are editable
- ✅ Photo optimization for events and departments via Thumbor
- ✅ Csv export performing on backend and export only picked survey's results
- ✅ Swagger documentation
- ✅ Week 7 changes follow up documentation

---

## Product Access Artifact

[su-portal][(https://10.93.26.192/)]

---

## Core Documentation

- [DEPLOY.md](https://github.com/plaksiki/SU-Website/blob/main/DEPLOY.md)
- [README.md](https://github.com/plaksiki/SU-Website/blob/main/README.md)
- [CONTRIBUTING.md](https://github.com/plaksiki/SU-Website/blob/main/CONTRIBUTING.md)
- [AGENTS.md](https://github.com/plaksiki/SU-Website/blob/main/AGENTS.md)
- [docs/customer-handover.md](https://github.com/plaksiki/SU-Website/blob/Assignment/docs/customer-handover.md)
- [Hosted Documentation Site](https://plaksiki.github.io/SU-Website/)

---

## Final Transition Outcome

### Handover Status

| **Aspect** | **Status** |
| :--- | :--- |
| **Handover Level Reached** | Full |
| **Customer Confirmation Status** | Confirmed |
| **Date of Confirmation** | 2026-07-18 |

### What Was Transferred

- Public Repository link was transferred to the customer.
- [`docs/customer-handover.md`](https://github.com/plaksiki/SU-Website/blob/main/docs/customer-handover.md): customer-facing handover artifact for the current product state was finilized
- [DEPLOY.md](https://github.com/plaksiki/SU-Website/blob/main/DEPLOY.md): Deployment, update and troubleshooting instructions for development team

### Remaining Transition Blockers, Limitations, or Follow-Up Items

| **Item** | **Description** | **Responsible Party** | **Target Resolution** |
| :--- | :--- | :--- | :--- |
| Configure HTTPS | Generate SSL certificate and configure nginx to enable HTTPS. Currently only HTTP is available. Required for production use with sensitive data. | Dev team | After Demo Day (if customer requests) |
| Document backup/restore | Add step-by-step recovery instructions to DEPLOY.md | Dev team | After Demo Day (if customer requests) |
| Customer VM deployment | Customer should follow `DEPLOY.md` | Customer | After Demo Day (if product is selected among all three teams) |

### Customer Independent Use / Deployment / Operation Evidence

At the moment customer does not use (deploy) the product, because there is three project to choose among after Demo Day is passed. However, the product transfer readiness is confirmed by the customer.

---

## Customer Feedback & UAT

### Sprint 5 Feedback Response Table

| **Feedback Point** | **Resulting PBI / Issue** | **Status** | **Notes** |
| :--- | :--- | :--- | :--- |
| **No editor for surveys** | [#230](https://github.com/plaksiki/SU-Website/issues/230) | Backlog | `Edit` button for polls (as how for events) |
| **Info cards for SU heads** | [#232](https://github.com/plaksiki/SU-Website/issues/232) | - | SU heads on the Home page should also have extended information cards |
| **Fix survey page routing** | [#225](https://github.com/plaksiki/SU-Website/issues/225) | [Status] | When navigating to /surveys/123, the page renders the general surveys list instead of the individual survey view; Back button from /surveys/:id returns to /surveys |

### Week 7 UAT / Customer Trial Results

- User Acceptance Test (UAT) for Week 7 was conducted during the sprint 5 review. This week we added [UAT-11](https://github.com/plaksiki/SU-Website/blob/main/docs/user-acceptance-tests.md#uat-11-su-members-info-cards) and [UAT-12](https://github.com/plaksiki/SU-Website/blob/main/docs/user-acceptance-tests.md#uat-12-events-editing) to test edit of events and info cards for presented SU members.
- Customer liked the UI design for added features
- Customer requested to make surveys editable

#### Key Findings

- Events are editable
- csv export is available only if at least one person submited answers for the picked poll
- Photos are uploading only during the first department card opening, after that photos open simultaneously

#### Issues Found During UAT

- Some fotos of SU members are flipping because of some problems with Thumbor
- Time drops after event is created
- No info cards for two SU members on the Home page
- Surveys are not editable

---

## Demo Day Preparation

The required Week 7 rehearsal preparation was completed on 2026-07-19.

| **Item** | **Status** | **Notes** |
| :--- | :--- | :--- |
| Presentation Slides | ✅ | We changed some slides from Week 6 Presentation, including Qulity Requirements and Vision Pages. Slides numeration is presented for navigation. Slides order was changed according to recommendations from `Assignment 6` instructions |
| Demo Script | ✅ | We distributed speech parts between all team members in such way that every person speak about stuff he used to work with or understand deeply. |
| Rehearsal | ✅ | Rehearsal was conducted on 2026-07-19. All team members were presented. First two times we tried to present with the script, after that had three tries without the script. We were in time during all tries and also had extra time left. |
| Product Demo Video | ✅ | The Product Demo video was recorded after Sprint 5 when final version product was deployed. |

---

## Repository Items Links

| Item | Link |
|------|------|
| **Week 7 SemVer final release** | [v3.0.0](https://github.com/plaksiki/SU-Website/releases/tag/v3.0.0) |
| Changelog | [CHANGELOG.md](https://github.com/plaksiki/SU-Website/blob/main/CHANGELOG.md) |
| Sprint 5 review transcript | [reports/week7/sprint-review-transcript.md](https://github.com/plaksiki/SU-Website/blob/main/reports/week7/sprint-review-transcript.md) |
| Sprint 5 review summary | [reports/week7/sprint-review-summary.md](https://github.com/plaksiki/SU-Website/blob/main/reports/week7/sprint-review-summary.md) |
| Sprint 5 reflection | [reports/week7/reflection.md](https://github.com/plaksiki/SU-Website/blob/main/reports/week7/reflection.md) |
| Sprint 5 retrospective | [reports/week7/retrospective.md](https://github.com/plaksiki/SU-Website/blob/main/reports/week7/retrospective.md) |
| LLM Report | [reports/week7/llm-report.md](https://github.com/plaksiki/SU-Website/blob/main/reports/week7/llm-report.md) |

---

## Final Product Status

### Summary

- By the end of week 7 all [User Stories](https://github.com/plaksiki/SU-Website/blob/main/docs/user-stories.md) were addressed
- We responded to most of feedback points given by customer
- Product is curently deployed and available via [`10.93.26.192`](http://10.93.26.192/)
- Users can submit answer form on created surveys and Admins can create surveys and export csv tables of data received
- Admins can create events cards and add photos to them via URLs
- Duringevelopment proccess followed Definition of done criterias
- Customers are satisfied with the results of our work as for first serious development project (citated from sprint 5 review)

### Key Achievements

- Intuitive pages navigaton
- Splited interface: no long scrolling, different functionality was splitted
- Mobile Responsiveness: Website render correctly on mobile devices([QR-4](https://github.com/plaksiki/SU-Website/blob/main/docs/quality-requirements.md#qr-4-usability--mobile-responsiveness) completness)
- Language switching does not slide/glitch the text on page
- Creation of items is available only for admins
- Created events and surveys are editable

### Known Limitations / Open Issues

- No backup for database
- HTTPS is not configured
- Admins verification is happening on frontend (not safe)
- Dark Theme was not implemented due to lack of time
- Surveys can be submitted more then once per user from the same device

---

## Contribution Traceability

| **Team Member** | **Issues** | **PRs/MRs** | **Reviews** | **Testing** | **Docs** | **Transition** | **Deployment** | **Demo Day prep** |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Alina P. | [#193](https://github.com/plaksiki/SU-Website/issues/193), [#198](https://github.com/plaksiki/SU-Website/issues/198) | [#224](https://github.com/plaksiki/SU-Website/pull/224) | 3 | - | customer handover update, README.md for Week 7, existing documentation update | Custmoer handover, DEPLOY.md update | - | Speech distribution, participation in rehearsal |
| Bulat S | [#225](https://github.com/plaksiki/SU-Website/issues/225), [#227](https://github.com/plaksiki/SU-Website/pull/227), [#230](https://github.com/plaksiki/SU-Website/pull/230), [#232](https://github.com/plaksiki/SU-Website/pull/232), [#240](https://github.com/plaksiki/SU-Website/pull/224) | [#219](https://github.com/plaksiki/SU-Website/pull/219) | 2 | Local tests/deployment of the dev branch | LLM report | - | Deploy of MVP v3 on VM | Presentation update, participation in rehearsal |
| Dasha S. | [#208](https://github.com/plaksiki/SU-Website/issues/208), [#209](https://github.com/plaksiki/SU-Website/issues/209), [#216](https://github.com/plaksiki/SU-Website/issues/216) [#221](https://github.com/plaksiki/SU-Website/issues/221) | [#202](https://github.com/plaksiki/SU-Website/pull/202) | - | Local tests/deployment of the dev branch | - | - | - | Participation in rehearsal |
| Emil G. | [#187](https://github.com/plaksiki/SU-Website/issues/187) | [#239](https://github.com/plaksiki/SU-Website/pull/239) | - | - | Week 7 reflection | - | - | Participation in rehearsal |
| Kristina B. | [#236](https://github.com/plaksiki/SU-Website/issues/236) | [#228](https://github.com/plaksiki/SU-Website/pull/228), [#238](https://github.com/plaksiki/SU-Website/pull/238) | - | - | Week 7 retropective | - | - | Participation in rehearsal |
| Svetlana L. | - | - | 2 | - | Week 7 Review transcript and summary | - | - | Participation in rehearsal |

---

## Embedded Screenshots

### Sprint 5 Milestone

![Sprint 5 Milestone](images/sprint5-milestone.png)

### Final Release MVP v3

![Final Release](images/week7-final-release.png)

### Example PR/MR with Linked Issue

![Example PR/MR](images/week7-example-pr.png)
