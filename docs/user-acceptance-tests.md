# User Acceptance Tests
**Last Updated:** 2026-06-25

This document defines UAT scenarios for the SU Website.
Scenarios are executed with the customer during Sprint Review.

---

## UAT Scenarios

### UAT-1: Viewing Upcoming and Past Events

| Field | Details |
|-------|---------|
| **Related User Story** | US-01 – Viewing event details |
| **Priority** | Must Have |
| **Status** | ✅ Pass (Sprint 2 Review – 2026-06-25) |

**Given** a student opens the Events page on the SU Website
**When** the page loads
**Then** events with a future date are shown under "Upcoming Events"
**And** events with a past date are shown under "Past Events"
**And** both sections are clearly labelled and visible without scrolling

---

### UAT-2: Submitting an Anonymous Questionnaire

| Field | Details |
|-------|---------|
| **Related User Story** | US-08 – Applying for an internship |
| **Priority** | Could Have |
| **Status** | ✅ Pass (Sprint 2 Review – 2026-06-25) |

**Given** a student opens the Questionnaires page
**When** the student selects an open questionnaire and fills in all required fields
**And** clicks the Submit button
**Then** a success message is displayed
**And** no personal information is stored or displayed to other users

---

### UAT-3: Switching Interface Language

| Field | Details |
|-------|---------|
| **Related User Story** | US-06 – Language selection |
| **Priority** | Should Have |
| **Status** | ✅ Pass (Sprint 2 Review – 2026-06-25) |

**Given** a student is on any page of the SU Website
**When** the student clicks the language toggle in the navigation bar
**Then** all visible text on the page switches to the selected language (EN or RU)
**And** the selected language is remembered when navigating to another page

---

## Execution History

| Scenario | Sprint 1 | Sprint 2 |
|----------|----------|----------|
| UAT-1: Viewing events | Not tested | ✅ Pass |
| UAT-2: Submitting questionnaire | Not tested | ✅ Pass |
| UAT-3: Language switching | Not tested | ✅ Pass |
