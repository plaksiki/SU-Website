# User Acceptance Tests
**Last Updated:** 2026-07-10

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

- **Given** a user opens the Events page on the SU Website
- **When** the page loads
- **Then** events with a future date are shown under "Upcoming Events"
- **And** events with a past date are shown under "Past Events"
- **And** both sections are clearly labelled and visible without scrolling

---

### UAT-2: Submitting an Anonymous Questionnaire

| Field | Details |
|-------|---------|
| **Related User Story** | US-08 – Applying for an internship |
| **Priority** | Could Have |
| **Status** | ✅ Pass (Sprint 2 Review – 2026-06-25) |

- **Given** a user opens the Questionnaires page
- **When** the user selects an open questionnaire and fills in all required fields
- **And** clicks the Submit button
- **Then** a success message is displayed
- **And** no personal information is stored or displayed to other users

---

### UAT-3: Switching Interface Language

| Field | Details |
|-------|---------|
| **Related User Story** | US-06 – Language selection |
| **Priority** | Should Have |
| **Status** | ✅ Pass (Sprint 2 Review – 2026-06-25) |

- **Given** a user is on any page of the SU Website
- **When** the user clicks the language toggle in the navigation bar
- **Then** all visible text on the page switches to the selected language (EN or RU)
- **And** the selected language is remembered when navigating to another page

---

### UAT-4: Admin Login page

| Field | Details |
|-------|---------|
| **Related User Story** | US-05 - Exporting questionnaire results |
| **Priority** | Should Have |
| **Status** | ✅ Pass (Sprint 3 Review – 2026-07-03) |

- **Given** a user is on any page of the SU Website
- **When** the user clicks 3 times on IU logo at the left top of the page
- **Then** user sees Admin login page asking for login and password and "Login" button
- **And** when password was put in user can check it by click on eye logo (password that was put there will appear)

---

### UAT-5: Log in Admin Panel and log out

| Field | Details |
|-------|---------|
| **Related User Story** | US-05 - Exporting questionnaire results |
| **Priority** | Should Have |
| **Status** | ✅ Pass (Sprint 3 Review – 2026-07-03) |

- **Given** a user is on Admin login page
- **When** the user input valid login and password and press "Login"
- **Then** user sees Admin panel greeting and can logout by click on "Logout"
- **And** if user clicked "Logout" button, he sees Admin login page again

---

### UAT-6: csv Export from the Admin Panel

| Field | Details |
|-------|---------|
| **Related User Story** | US-05 - Exporting questionnaire results |
| **Priority** | Should Have |
| **Status** | ✅ Pass (Sprint 3 Review – 2026-07-03) |

- **Given** a user logged in Admin panel
- **When** the user clicks on "Export Questionnaires to CSV" button
- **Then** downloading of the file starting
- **And** user can find the file in downloadings in the browser

---

### UAT-7: Events Details

| Field | Details |
|-------|---------|
| **Related User Story** | US-01 - Viewing event details |
| **Priority** | Must Have |
| **Status** | ✅ Pass (Sprint 3 Review – 2026-07-03) |

- **Given** a user is on "Events" page
- **When** the user clicks on any Event card
- **Then** picked event page opens
- **And** detailed info about the event is pressented on this page

---

### UAT-8: Creating a Questionnaire via Admin Panel

| Field | Details |
|-------|---------|
| **Related User Story** | US-05 - Exporting questionnaire results |
| **Priority** | Must Have |
| **Status** | ✅ Pass (Sprint 4 Review - 2026-07-10) |

- **Given** an admin is logged into the Admin Panel
- **When** the admin fills in the questionnaire title, description, adds at least one question, and clicks "Create questionnaire"
- **Then** the new questionnaire appears in the questionnaire list in the Admin Panel
- **And** the new questionnaire is visible to users on the Questionnaires page

---

### UAT-9: Viewing Questionnaire Answers in CSV Export

| Field | Details |
|-------|---------|
| **Related User Story** | US-05 - Exporting questionnaire results |
| **Priority** | Must Have |
| **Status** | ✅ Pass (Sprint 4 Review - 2026-07-10) |

- **Given** an admin is logged into the Admin Panel
- **And** at least one user has submitted a response to a questionnaire
- **When** the admin clicks "Export Questionnaires to CSV"
- **Then** a CSV file is downloaded
- **And** the file contains each questionnaire as a separate section with its title
- **And** each row represents one user's complete response with answers to all questions

---

### UAT-10: Viewing Department Members on the Home Page

| Field | Details |
|-------|---------|
| **Related User Story** | US-03 - Viewing SU structure |
| **Priority** | Must Have |
| **Status** | ✅ Pass (Sprint 4 Review - 2026-07-10) |

- **Given** a user opens the SU Website home page
- **When** the page loads
- **Then** the user can see all three departments (SU Core, SU Active, SU Media)
- **And** clicking on a department card opens a dedicated department page
- **And** the department page lists all members with their names, roles, and photos

---

## Execution History

| Scenario | Sprint 1 | Sprint 2 | Sprint 3 | Sprint 4 |
|----------|----------|----------|----------|----------|
| UAT-1: Viewing events | Not tested | ✅ Pass | Not tested | Not tested |
| UAT-2: Submitting questionnaire | Not tested | ✅ Pass | Not tested | Not tested |
| UAT-3: Language switching | Not tested | ✅ Pass | Not tested | Not tested |
| UAT-4: Admin Login page | Not tested | Not tested | ✅ Pass | Not tested |
| UAT-5: Log in Admin Panel and log out | Not tested | Not tested | ✅ Pass | Not tested |
| UAT-6: csv Export from the Admin Panel | Not tested | Not tested | ✅ Pass | Not tested |
| UAT-7: Events Details | Not tested | Not tested | ✅ Pass | Not tested |
| UAT-8: Creating a questionnaire via Admin Panel | Not tested | Not tested | Not tested | ✅ Pass |
| UAT-9: Viewing answers in CSV export | Not tested | Not tested | Not tested | ✅ Pass |
| UAT-10: Viewing department members on home page | Not tested | Not tested | Not tested | ✅ Pass |
