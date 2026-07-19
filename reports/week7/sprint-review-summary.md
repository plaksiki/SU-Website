# Sprint Review Summary – Week 7 (Sprint 5)

---

## Meeting Details

| **Attribute** | **Details** |
| :--- | :--- |
| **Date** | 18 July 2026 |
| **Sprint** | Sprint 5 (Week 7) |
| **Sprint Dates** | 13.07.2026 – 19.07.2026 |
| **Total Sprint Size** | 130 Story Points |
| **Type** | Final Sprint Review & Transition Confirmation |
| **Recording Permitted** | Yes |
| **Public Transcript Publication Permitted** | Yes |
| **Private Instructor Sharing** | Yes |

---

## Participants in review

| **Role** | **Name** |
| :--- | :--- |
| Team Lead | Alina Petrova |
| Customer | Anna |
| Front-end Developer | Svetlana Levagina|
| Front-end Developer | Bulat Shaikhutdinov |
| Database Developer | Emil Gilfanov|

---

## Sprint Goal Reviewed

**Sprint 5 Goal:** Refactor admin panel view, fix export table bug, and update documentation for transition.

---

## Sprint 5 PBIs Status

| **PBI** | **Description** | **Status** |
| :--- | :--- | :--- |
| #62 | Swagger/OpenAPI Documentation | ✅ Completed |
| #198 | Make separate section for admin panel features | ✅ Completed |
| #208 | Swagger documentation | ✅ Completed |
| #209 | Separate export | ✅ Completed |
| #216 | PUT endpoint for polls | ✅ Completed |
| #225 | Fix survey page routing | ✅ Completed |
| #227 | Add Edit button for surveys | ✅ Completed |
| #230 | Add edit fields for surveys | ✅ Completed |
| #232 | Add description cards for SU heads | ✅ Completed |
| #236 | Fix polls ordering and auto-deletion of expired polls | ✅ Completed |
| #240 | Add direct photo upload for events | ✅ Completed |

**Sprint 5 Completion:** 100% (All 11 issues completed)

**Sprint 5 Milestone:** [plaksiki/SU-Website/milestone/9](https://github.com/plaksiki/SU-Website/milestone/9)

**Product Backlog:** [plaksiki/projects/2](https://github.com/orgs/plaksiki/projects/2)

**Sprint 5 Backlog:** [plaksiki/projects/18](https://github.com/orgs/plaksiki/projects/18)

---

## Artifacts Demonstrated

| **Artifact** | **Status** | **Details** |
| :--- | :--- | :--- |
| Admin Panel Refactoring | ✅ Complete | Separate tabs for events and polls; auto-updating views |
| Event Editing | ✅ Complete | Full CRUD with auto-update across tabs |
| Poll Export | ✅ Complete | Backend-based; individual exports |
| PUT Endpoint for Polls | ✅ Complete | #216 delivered |
| Photo Upload | ✅ Complete | Direct upload implemented (#240) |
| Cards with Toggle | ✅ Complete | Modal window display |
| Routing | ✅ Complete | Working correctly |
| Deployment Documentation | ✅ Complete | Confirmed sufficient by customer |

---

## Week 7 UAT / Customer Trial Results

**UAT-11 (Events Editable):** ✅ Passed

**UAT-12 (Info Cards for SU Members):** ✅ Passed

### Key Findings

| **Finding** | **Status** |
| :--- | :--- |
| Events are editable | ✅ Working |
| CSV export available only if at least one person submitted answers |  ✅ Working  |
| Photo upload works correctly | ✅ Working |

### Issues Found During UAT (Resolved)

| **Issue** | **Status** |
| :--- | :--- |
| Some SU member photos flipping due to Thumbor | ✅ Resolved |
| Time drops after event creation | ✅ Resolved |
| Missing info cards for two SU members | ✅ Resolved (#232) |
| Surveys are not editable | ✅ Resolved (#227, #230) |

---

## Feedback Received (Customer)

| **Feedback Point** | **Priority** | **Action / Decision** |
| :--- | :--- | :--- |
| Polls sorted oldest-to-newest; prefer newest first | High | ✅ Implemented (#236) |
| Poll end date disappeared after selection | High | ✅ Fixed |
| Polls cannot be edited; need active/inactive toggle | High | ✅ Implemented (#227, #230) |
| Poll routing issue (/surveys/123 shows list view) | High | ✅ Fixed (#225) |
| Location field should be optional | Medium | ✅ Updated to optional |
| Google Drive photo uploads not user-friendly | Low | ✅ Implemented direct upload (#240) |
| Descriptions needed for SU members | Medium | ✅ Implemented (#232) |

---

## Approvals and Requested Changes

| **Criterion** | **Status** |
| :--- | :--- |
| **Customer Confirmation Status** | ✅ **Accepted** |
| **Handover Level** | ✅ **Ready for independent use** |
| **Evidence** | Customer confirmed: *"Deployment is clear. Documentation is also clear. No obvious problems."* |

### Why Stronger Transition Levels Were Not Reached

| **Level** | **Status** | **Reason** |
| :--- | :--- | :--- |
| Independently used by customer | ❌ | Customer plans to fork post-project; not deployed yet |
| Deployed on customer side | ❌ | Customer not ready to deploy immediately |
| **Blocker** | Customer-side (timing) | Customer confirmed documentation sufficient; will deploy independently after project ends |

---

## Risks Identified

| **Risk** | **Impact** | **Mitigation** |
| :--- | :--- | :--- |
| Photo upload via links may be less user-friendly | Low | ✅ Resolved — direct upload implemented (#240) |
| No active/inactive poll status; manual deletion risks data loss | Medium | ✅ Resolved — implemented (#230) |
| Thumbor photo flipping affects SU member images | Medium | ✅ Resolved |
| Time drops after event creation | High | ✅ Resolved |

---

## Action Points (All Resolved)

| **Issue** | **Description** | **Status** |
| :--- | :--- | :--- |
| #236 | Fix polls ordering and auto-deletion | ✅ Completed |
| #232 | Add description cards for SU heads | ✅ Completed |
| #230 | Add edit fields for surveys | ✅ Completed |
| #227 | Add Edit button for surveys | ✅ Completed |
| #225 | Fix survey page routing | ✅ Completed |
| #240 | Add direct photo upload for events | ✅ Completed |
| - | Fix Thumbor photo flipping | ✅ Resolved |
| - | Fix time drop after event creation | ✅ Resolved |
| - | Fix photo upload caching issue | ✅ Resolved |

---

## Resulting Backlog or Scope Changes

- **Completed in Sprint 5:** All 11 issues (#62, #198, #208, #209, #216, #225, #227, #230, #232, #236, #240)
- **New Items Added During Sprint:** #236, #232, #230, #227, #225, #240
- **All Follow-up Items:** ✅ Resolved and merged
- **Final Status:** All customer feedback addressed

---

## Links & Evidence

| **Artifact** | **Link** |
| :--- | :--- |
| Sprint 5 Milestone | [plaksiki/SU-Website/milestone/9](https://github.com/plaksiki/SU-Website/milestone/9) |
| Product Backlog | [plaksiki/projects/2](https://github.com/orgs/plaksiki/projects/2) |
| Sprint 5 Backlog | [plaksiki/projects/18](https://github.com/orgs/plaksiki/projects/18) |
| Transcript | [reports/week7/sprint-review-transcript.md](./sprint-review-transcript.md) |
| Week 7 Report | [reports/week7/README.md](./README.md) |
| Final Release (MVP v3) | [https://github.com/plaksiki/SU-Website/releases/tag/v3.0.0](https://github.com/plaksiki/SU-Website/releases/tag/v3.0.0) |
| Public Sanitized Demo Video | [https://drive.google.com/file/d/1pCvHi0qGTcXQbeWgT9cAeUpZI6PY-ioU/view?usp=sharing](https://drive.google.com/file/d/1pCvHi0qGTcXQbeWgT9cAeUpZI6PY-ioU/view?usp=sharing) |
| CHANGELOG.md | [CHANGELOG.md](../../CHANGELOG.md) |
| docs/customer-handover.md | [docs/customer-handover.md](../../docs/customer-handover.md) |

---

## Summary Statement

> **Sprint 5 successfully delivered all planned items, including admin panel refactoring, export functionality, PUT endpoint for polls, and all follow-up customer feedback items. All 11 issues (#62, #198, #208, #209, #216, #225, #227, #230, #232, #236, #240) were completed and merged. UAT confirmed all critical issues were resolved: events are editable, surveys are now editable, routing works correctly, info cards are present, direct photo upload is implemented, and time/date bugs are fixed. The customer confirmed the product is Ready for independent use with clear deployment documentation. Stronger transition levels were not reached due to customer-side timing: the customer will fork and deploy post-project.**
