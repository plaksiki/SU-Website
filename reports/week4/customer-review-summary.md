# Sprint 2 Review Summary
**Project:** SU-Website  
**Date:** 2026-06-27  
**Sprint Period:** 2026-06-22 – 2026-06-28

---

## Participants

### Meeting Roles

| Role | Name |
|------|------|
| Interviewer / Facilitator | Dasha Sevostianova (Participant A) |
| Notes | Svetlana Levagina (Participant B) |
| Notes & Recording | Emil Gilfanov (Participant C) |
| Customer / Product Owner | Valerii (Participant D) |
| Customer / Product Owner | Anna (Participant E) |

### Development Team

| Member | Email | GitHub | Scrum / Technical Role |
|--------|-------|--------|------------------------|
| Alina Petrova | al.petrova@innopolis.university | bilidjinka | Team Lead, Product Owner / Microservices Developer |
| Bulat Shaikhutdinov | b.shaikhutdinov@innopolis.university | LoLiTop1gg | Developer / Frontend |
| Daria Sevostianova | d.sevostianova@innopolis.university | dashasevostianova | Scrum Master / Backend |
| Emil Gilfanov | e.gilfanov@innopolis.university | EMIL2007da | Developer / Database |
| Kristina Butkina | k.butkina@innopolis.university | smorodina2128506 | Developer / Frontend |
| Svetlana Levagina | s.levagina@innopolis.university | moddyl | Developer / Frontend |

---

## Sprint Goal

> **Develop survey structure: Frontend → Backend → PostgreSQL**

Establish a working end-to-end data pipeline so that survey metadata stored in the database is fetched via a backend endpoint and rendered on the frontend polls page.

---

## Selected Scope (Sprint 2)

| # | Item | Type | Size |
|---|------|------|------|
| SU-Website #43 | US-01: Viewing event details | User Story | 2 |
| SU-Website #45 | US-05: Exporting questionnaire results | User Story | 5 |
| SU-Website #48 | US-08: Applying for an internship | User Story | 2 |
| SU-Website #49 | Create questionnaires table | Task | — |
| SU-Website #51 | Create questions table | Task | 2 |
| SU-Website #52 | Create options table | Task | 1 |
| SU-Website #53 | Create responses table | Task | 1 |
| SU-Website #54 | Create answers table | Task | 2 |
| SU-Website #55 | Create database schema for Questionnaires | Task | 3 |
| SU-Website #63 | Create the base for backend, survey entity and controller | Task | 5 |
| SU-Website #105 | Backend connection with Docker and database | Task | — |
| SU-Website #107 | Update DB | Task | — |
| SU-Website #111 | Backend integration | Task | 20 |
| SU-Website #122 | Front-end questionnaires | Task | 13 |
| SU-Website #124 | Setup CI pipeline for frontend and backend | Task | — |

**Sprint 2:** 33 Story Points  
*(Reference: Sprint 1 Total — 33 Story Points)*

---

## Delivered Increment

The team demonstrated a live deployment on an internal university VM accessible via the university network. The following was delivered:

- **Main page** — fully functional with language switcher (EN/RU) fixed and working correctly.
- **Events page** — split into upcoming and past events; cards render correctly. Detail expansion not yet implemented (pending brand assets and participant data).
- **Polls page** — survey skeleton implemented. First survey entry is fully loaded end-to-end from PostgreSQL via the `/questionnaire/{id}` endpoint (returns JSON with name, description, dates). Second and third surveys are frontend mocks demonstrating the intended visual layout.
- **Donations page** — functional; displays QR code for transfers.
- **Backend pipeline** — full cycle operational: frontend → backend → PostgreSQL → response to frontend. All services deployed via Docker on the VM.
- **CI pipeline** — set up for frontend and backend (SU-Website #124).
- **Database schema** — questionnaires, questions, options, responses, and answers tables created.

---

## UAT Results

*Last Updated: 2026-06-25. Scenarios executed with the customer during Sprint 2 Review.*

### UAT-1: Viewing Upcoming and Past Events

| Field | Details |
|-------|---------|
| Related User Story | US-01 – Viewing event details |
| Priority | Must Have |
| Status | ✅ Pass (Sprint 2 Review – 2026-06-25) |

**Scenario:**
- **Given** a student opens the Events page on the SU Website
- **When** the page loads
- **Then** events with a future date are shown under "Upcoming Events"
- **And** events with a past date are shown under "Past Events"
- **And** both sections are clearly labelled and visible without scrolling

---

### UAT-2: Submitting an Anonymous Questionnaire

| Field | Details |
|-------|---------|
| Related User Story | US-08 – Applying for an internship |
| Priority | Could Have |
| Status | ✅ Pass (Sprint 2 Review – 2026-06-25) |

**Scenario:**
- **Given** a student opens the Questionnaires page
- **When** the student selects an open questionnaire and fills in all required fields
- **And** clicks the Submit button
- **Then** a success message is displayed
- **And** no personal information is stored or displayed to other users

---

### UAT-3: Switching Interface Language

| Field | Details |
|-------|---------|
| Related User Story | US-06 – Language selection |
| Priority | Should Have |
| Status | ✅ Pass (Sprint 2 Review – 2026-06-25) |

**Scenario:**
- **Given** a student is on any page of the SU Website
- **When** the student clicks the language toggle in the navigation bar
- **Then** all visible text on the page switches to the selected language (EN or RU)
- **And** the selected language is remembered when navigating to another page

---

### Execution History

| Scenario | Sprint 1 | Sprint 2 |
|----------|----------|----------|
| UAT-1: Viewing events | Not tested | ✅ Pass |
| UAT-2: Submitting questionnaire | Not tested | ✅ Pass |
| UAT-3: Language switching | Not tested | ✅ Pass |

**All 3 UAT scenarios passed.** Customer Valerii confirmed by clicking through the scenarios live during the meeting.

---

## Quality Evidence

- Backend endpoint `/questionnaire/{id}` returns correct JSON (name, description, dates) — confirmed live.
- Docker deployment stable on university VM.
- CI pipeline active for both frontend and backend repositories.
- Language switcher verified correct on all pages.
- No broken routes or critical UI issues observed during demo.

---

## Feedback

**From Anna (PO):**
- Department cards should navigate to a **full department detail page**, not just expand inline. A brief **SSU history page** is also expected (exists in codebase but non-functional).
- Events should have a **link field** to support attaching external URLs (photos, surveys, etc.) — this applies to all event types.
- Survey form should support a **short description and optional image** at the top.
- For the internship use case: treat it as a **standard event with a link** pointing to the survey — no special event type needed.
- Survey **result statistics** (charts, CSV/spreadsheet export) should be **admin-only** — responses are not published publicly.
- Preferred export format: **CSV** (xlsx also acceptable).
- Admin accounts: **no self-registration**; insert records directly into the database (PGAdmin). Multiple accounts needed for backlog task attribution.

**From Valerii (PO):**
- Approximately **15–20 curated high-resolution photos** will be hosted directly on the site per event (rest linked externally via Google Drive or gallery services). Image optimization (Thumbor or equivalent) is still recommended given future volume (~100 events × 15 photos).
- **Redis is optional** — only add if the team identifies a caching need.
- Event detail should open as a **dedicated full page** (not a modal), containing photos, text, and links.

---

## Approvals & Decisions

| Decision | Status |
|----------|--------|
| Sprint 2 increment accepted by customers | ✅ Approved |
| Transition to in-person meetings from next sprint | ✅ Agreed |
| CSV as preferred export format | ✅ Confirmed |
| Admin auth via hardcoded DB records (no registration) | ✅ Confirmed |
| Internship survey = basic event + link field | ✅ Confirmed |
| Redis — optional, not required | ✅ Confirmed |
| Thumbor / image optimization — still recommended | ✅ Confirmed |

---

## Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Brand assets (photos, copy) not yet delivered | High | Medium | Continue with placeholders; unblock department and event pages once assets arrive |
| 3 productive weeks remaining (week 4 of project, week 7 is presentation) | High | High | Prioritise admin panel + survey/event completion; defer history page if needed |
| External VM access requires university network | Medium | Low | Screen share demo as fallback for remote stakeholders |
| Thumbor not yet implemented; high-res photos will degrade performance | Medium | Medium | Schedule Thumbor integration in Sprint 3 or 4 |

---

## Action Points

| # | Action | Owner | Due |
|---|--------|-------|-----|
| 1 | Finish survey questions loading from DB (complete `/questionnaire/{id}` with full question set) | Dev team | Sprint 3 |
| 2 | Implement event card → full detail page navigation | Dev team | Sprint 3 |
| 3 | Add link field to events (supports photos, survey links, etc.) | Dev team | Sprint 3 |
| 4 | Build admin panel: login (multi-account, DB records via PGAdmin), event creation, survey creation & publishing | Dev team | Sprint 3 |
| 5 | Implement survey result statistics with CSV export (admin-only) | Dev team | Sprint 3 |
| 6 | Add short description + optional image field to survey form | Dev team | Sprint 3 |
| 7 | Implement department detail page (full page, not inline expand) | Dev team | Sprint 3–4 |
| 8 | Integrate Thumbor for hosted photo optimization | Dev team (Alina) | Sprint 3–4 |
| 9 | Add SSU history page (currently non-functional stub) | Dev team | Sprint 4 |
| 10 | Send VM link to Anna via accessible channel for async testing | Dasha | Immediately |
| 11 | Switch to in-person meetings starting next sprint | All | Sprint 3 kickoff |

---

## Product Backlog Changes

### Moved to Ready / Prioritised for Sprint 3

| Item | Notes |
|------|-------|
| SU-Website #61 — Thumbor Integration for Image Optimization | Already in Ready |
| SU-Website #45 — US-05: Exporting questionnaire results | Already in Ready |
| SU-Website #60 — Setup Redis | Ready; confirmed optional — deprioritise if capacity limited |
| SU-Website #48 — US-08: Applying for an internship | Ready |
| SU-Website #43 — US-01: Viewing event details | Ready |

### New Scope Identified (to be created/estimated)

| Item | Source |
|------|--------|
| Admin login + multi-account auth (DB-based, no registration) | Anna feedback |
| Admin panel: create/publish events and surveys | Anna feedback |
| Survey result statistics + CSV export (admin-only) | Anna feedback |
| Event detail full page | Anna feedback |
| Link field on events | Anna feedback |
| Survey description + image header | Anna feedback |
| Department detail page | Anna feedback |

### Remaining in Backlog

| Item | Status |
|------|--------|
| SU-Website #112 — Write README.md for week 4 | Backlog |
| SU-Website #113 — Interview week 4 transcript/summary | Backlog |
| SU-Website #116 — Write reports/week4/retrospective.md | Backlog |
| SU-Website #118 — Moodle PDF report | Backlog |
| SU-Website #119 — PDF presentation | Backlog |
| SU-Website #130 — Improve frontend: event cards, department tags, mobile navbar | Backlog |
| SU-Website #132 — Add history page, footer, gradient background and smooth transitions | Backlog |

---

*Summary prepared by: Emil (recording) & Sveta (notes)*  
*Review conducted via video call; next meeting in-person.*
