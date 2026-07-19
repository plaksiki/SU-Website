# Sprint Review Summary – Week 7 (Sprint 5)


---

## Meeting Details

| **Attribute** | **Details** |
| :--- | :--- |
| **Date** | 18 July 2026 |
| **Sprint** | Sprint 5 (Week 7) |
| **Sprint Dates** | Start: 2026-07-13 / Finish: 2026-07-19 |
| **Type** | Final Sprint Review & Transition Confirmation |
| **Recording Permitted** | Yes |
| **Public Transcript Publication Permitted** | Yes |
| **Private Instructor Sharing** | Yes |

---

## Participants

| **Role** | **Name** | **Speaker Code** |
| :--- | :--- | :--- |
| Team Lead | Alina | Speaker 1 |
| Customer | Anna | Speaker 2 |
| Front-end Developer | Sveta | Speaker 3 |
| Front-end Developer | Bulat | Speaker 4 |
| Database Developer | Emil | Speaker 5 |

---

## Sprint Goal Reviewed

**Sprint 5 Goal:** Admin panel refactoring

**Focus & Outcomes:**
- Separate admin panel on different pages
- Make only one CSV table downloading per one pick
- Continue developing backend logic

---

## Planned Items Reviewed

The following Sprint 5 PBIs were reviewed during the Sprint Review:

| **PBI** | **Description** | **Status** |
| :--- | :--- | :--- |
| #62 | Swagger/OpenAPI Documentation | **Completed** |
| #198 | Make separate section for admin panel features | **Completed** |
| #208 | Swagger documentation | **Completed** |
| #209 | Separate export | **Completed** |
| #216 | PUT endpoint for polls | **Completed** |

---

## Artifacts Demonstrated

The team demonstrated the following completed and updated artifacts:

- **Admin Panel Refactoring (Related to #198):**
    - Separate tabs for events and polls management.
    - Auto-updating views when switching between tabs (no manual page refresh required).
- **Event Management:**
    - Edit functionality for events.
    - Google Drive (Yandex Disk) photo integration via links.
    - Modal window display for event cards.
- **Poll Management:**
    - Export functionality moved from frontend to backend, with individual export capability (Related to #209).
    - PUT endpoint for polls implemented (Related to #216).
- **Documentation:**
    - Swagger/OpenAPI documentation updated (Related to #62, #208).
    - `README.md`, `CONTRIBUTING.md`, `AGENTS.md`, `docs/customer-handover.md` updated.
    - Deployment and Swagger documentation reviewed and considered sufficient by the customer.

---

## Feedback Received (Customer)

| **Feedback Point** | **Priority** | **Action / Decision** |
| :--- | :--- | :--- |
| Polls sorted oldest-to-newest; customer prefers newest first. | High | **Action:** Fix polls ordering (Created: #236) |
| Poll end date disappeared after selection. | High | **Action:** Fix date persistence bug. |
| Polls cannot be edited after creation; need active/inactive status toggle. | High | **Action:** Add edit functionality and active/inactive status for polls. |
| Polls routing issue: navigation from poll view redirects to events page. | High | **Action:** Fix routing to keep users on the poll page (Created: #225) |
| Location field should be optional. | Medium | **Action:** Update location field to optional. |
| Google Drive photo uploads via links are not user-friendly. | Low (Acknowledged) | **Decision:** Keep current approach due to time constraints. |
| Translations for poll titles should be manual instead of automatic. | Low | **Action:** Use manual translations instead of automatic library. |
| Descriptions needed for members. | High | **Action:** Add description cards for SU heads on main page (Created: #232) |

---

## Approvals and Requested Changes

**Customer Confirmation Status:** `Accepted with follow-up items`

**Handover Level Reached:** `Ready for independent use`

The customer confirmed that:
- The product is **functionally complete** and has **no obvious blocking issues**.
- The **documentation (deployment, Swagger) is clear and sufficient**.
- The product is **ready for independent use** after the follow-up items are completed.

**Follow-up Items Created as PBIs/Issues:**
1. #236 - Fix polls ordering and add auto-deletion of expired polls
2. #232 - Add description cards for SU heads on main page
3. #230 - Add edit fields for surveys
4. #227 - Add Edit button for surveys
5. #225 - Fix survey page routing

---

## Risks Identified

| **Risk** | **Impact** | **Mitigation** |
| :--- | :--- | :--- |
| Photo upload via links may be less user-friendly than direct upload. | Low | Customer acknowledged limitation; acceptable for current version. |
| No active/inactive poll status means polls must be deleted manually, which could be a data loss risk. | Medium | **Action:** Implement active/inactive status and edit functionality in follow-up. |

---

## Action Points (Follow-up Issues Created)

The following PBIs/Issues were created during the Sprint Review based on customer feedback:

| **Issue** | **Description** | **Priority** | **Responsible** |
| :--- | :--- | :--- | :--- |
| #236 | Fix polls ordering and add auto-deletion of expired polls | High | Speaker 1 |
| #232 | Add description cards for SU heads on main page | Low | Speaker 3 |
| #230 | Add edit fields for surveys | High | Speaker 1 |
| #227 | Add Edit button for surveys | High | Speaker 1 |
| #225 | Fix survey page routing | High | Speaker 4 |

---

## Resulting Backlog or Scope Changes

- **Completed in Sprint 5:** All planned items (#62, #198, #208, #209, #216) were successfully delivered.
- **New Items Created:** 5 follow-up issues (#236, #232, #230, #227, #225) based on customer feedback.
- **Removed from Scope:** Full photo upload functionality (kept as is with Google Drive links, per customer agreement).
- **Deferred:** None; all Sprint 5 planned items were completed.

---

## Sprint Review Recording Status

- **Recording Attempted:** Yes
- **Recording Permitted:** Yes
- **Public Transcript Publication Permitted:** Yes
- **Public Summary Published:** `reports/week7/sprint-review-summary.md` (current file)
- **Transcript Published:** `reports/week7/sprint-review-transcript.md`

---

## Transition Readiness Summary

**Handover Level:** `Ready for independent use`

**Customer Confirmation:** `Accepted with follow-up items`

**Evidence of Transition Readiness:**
- The customer confirmed the deployment documentation is clear and the product is functionally complete.
- The customer does not plan to deploy immediately but will fork the repository after the project ends.
- The product is considered ready for independent use after the follow-up items are completed.

**Final Status:** The product is not yet independently used or deployed on the customer side, but is considered ready for that level after the final follow-up fixes.
