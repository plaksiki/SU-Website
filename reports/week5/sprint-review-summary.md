
**Date:** July 3, 2026

**Participants:**
- Speaker 1 – Alina (Team Lead)
- Speaker 2 – Valery (Client)
- Speaker 3 – Emil (Developer)
- Speaker 4 – Anna (Client)
- Speaker 5 – Bulat (Developer)

**Sprint Goal:** Admin Panel and CSV export of tables

---

## Artifacts Demonstrated

- Frontend interface with department cards and interactive elements
- Admin panel access (via logo click or /admin route)
- Questionnaire display
- Mobile-responsive design improvements
- CSV export foundation
- GitHub repository structure (SU-Website)

---

## Sprint Achievements

- Implemented department information display with clickable cards
- Added admin panel entry point (hidden access via triple logo click)
- Created questionnaire view
- Significantly improved mobile responsiveness (fixed broken layouts)
- Added hover effects on interactive elements
- Started table export functionality foundation

---

## Backend Status and Bottlenecks

- Backend development is significantly behind schedule
- Only one backend developer was allocated, which proved insufficient for the scope
- Issues with database connectivity and container stability
- API endpoints for data transfer not fully implemented
- Team spent excessive time debating data transfer structure (arrays vs. ID lookups)
- Current integration: only questionnaire responses are synchronized with the database
- Events and other features remain as mock data only

**Client feedback:** "Everything looks good on the frontend, but there is absolutely nothing connecting it on the backend."

---

## Customer Feedback and Requests

**Design and Frontend:**
- Valery: "The design is very cool. Everything looks beautiful."
- Anna: "I really liked both the design and overall execution."
- Anna: "Most components are solid. It looks excellent on the frontend."

**Content:**
- Logo and brand book materials expected from client within the week
- Department information and member photos to be provided gradually

**Features Requested:**
- Focus on questionnaires as the top priority
- Admin panel must support both event and questionnaire creation
- CSV export: first row contains questions separated by standard delimiter, subsequent rows contain answers

**Theme:**
- Dark/light themes are low priority
- Should only be worked on if frontend developers have no other tasks

---

## Decisions Made

- Backlog feature is deprioritized to the very end of the project
- Focus shifted to questionnaire functionality and backend integration
- Team will reallocate a frontend developer to assist with backend development
- Dark/light themes postponed to low priority
- CSV format confirmed: tabular data with questions in first row and answers in subsequent rows

---

## Risks and Issues

- Critical bottleneck: backend development is understaffed and behind schedule
- Database container stability issues on server side
- Integration between frontend and backend is minimal (only questionnaire responses work)
- Risk of not delivering fully functional product by deadline
- Architecture is described as "basic" and lacking maturity for rapid admin panel development
- Deployed production site differs from design mockups

---

## Action Points (Next Sprint)

1. Complete backend integration for questionnaires
2. Implement admin panel for questionnaire creation
3. Finish CSV export functionality for questionnaires
4. Complete event page integration with backend
5. Integrate provided logo and branding materials

---

## Product Backlog Changes

| Change | Reason |
|--------|--------|
| Admin panel moved to top priority | Client request |
| Questionnaires prioritized | Client request |
| Backlog feature deprioritized | Valery: "Forget the backlog for now" |
| Dark/light themes moved to low priority | Anna: "Highly non-prioritized" |
| CSV export confirmed as required | Client request for data export |
| Additional backend developer needed | Addressing critical bottleneck |

---

## Approval Status

**Valery (Client):** "Everything is cool, guys. I approve."

**Condition:** Final approval is contingent on successful backend integration and functional questionnaires in the next sprint.

---

## Recording and Publication Status

- Meeting was recorded with client consent
- Transcript documented for internal use
- Repository publication limited to educational project scope
- Instructor sharing permitted for quality assurance purposes

---

## Related Resources

- Repository: `SU-Website` on GitHub

---
