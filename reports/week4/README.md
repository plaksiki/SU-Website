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
