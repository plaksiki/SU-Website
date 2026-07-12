# Week 6 Reflection

## 1. Learning Points

### Customer review and feedback:

- The team conducted a customer review session on 2026-07-10. See: [meeting summary](https://github.com/plaksiki/SU-Website/blob/main/reports/week6/sprint-review-summary.md), [transcript](https://github.com/plaksiki/SU-Website/blob/main/reports/week6/sprint-review-transcript.md).
- Key findings:
  - The admin panel is not intuitive (features should be splitted on pages and question addition should be more obvious)
  - Pages should be updated whenever going through deifferent website sections
  - The transition of the product: customers' dev team will fork the repository nad use our documentation placed there
  - SU members should have cards with bio

### Documentation review

**What was added/updated:**

- **AGENTS.md**: Instructions for agents working inside the repository
- **CONTRIBUTING.md**: Instructions for anyoe who wants to contribute to the project
- 3 UATs connected to the admin panel items creation were added
- Work statuses in User stories document were updated

### Refining the workflow

- Git workflow stayed the same as during Sprint 3
- We put more effort into the documentation: added instructions for agents and contributors, updated already existed documentation we started the project with

### Sprint increment

**During the sprint we mostly did "filler" tasks that was failed before:**

- Connected the Database and Frontend with Backend
- Implemented SU brandbook on frontend
- Added/updated documentation for working with the project repository

## 2. Validated Assumptions

### Documentation review

- We should split the tasks in the way where the person who did the technical part document about this part by himself.
- It is better for team lead to write reflection and retrospective since she is acting in every little "department" in the team and communicate with teammates more comparing to others.
- We learned that documentation is the way of communicating with people, which was not involved in the development proccess. It should be consice and readable so other developers/customers/investors could understand the logic and purpose of the product.

### Deployment

- The website remains deployable on the IU virtual machine — confirmed, the Sprint 4 increment was successfully demonstrated to the customer on the VM
- Final deployment of teh prosuct will be done by customers' development team by forking the origin repository

### Customer feedback

- The Website design is approved
- Departments members should have info cards and list should be splitted for better view
- The csv. report answers of questionnaries should be for each questionnarie and it will be good, if it include some statistic or diagrams
- The architecture design decision is not good: most of logic implemented through frontend

## 3. Friction and Gaps

### Unresolved requirements

- Pages should be updated when surfing between them through the website
- Admin log in logic should be performed on backend
- Thumbor is not implemented

### Technical risks

- Admins verification is happening on frontend, which is not safe
- If thumbor is not added, there will be problem with uploading photos to the events cards

### Missing scope

- Backlog does not exist
- Thumbor is not implemented

### Blocked work

- No work was blocked.

### Process friction

- In some cases, PR approvals were delayed, which slightly slowed down the merging process.

### Uncertainties

- Could we implement Thumbor in time during next Sprint
- How will we pull created events and questionnaires to the pages simultaneously if the logic happening on frontend

### UAT

All required UAT are passed, but some technical problems were found:

- Website must be updated by user to see newly created items (events, surveys)
- Admin panel is not intuitive to use
- SU members does not have their bios

## 4. Planned Response

**What is planned for Sprint 5 based on this week:**

- Thumbor implementation to optimize photo downloading
- Admins log in logic written on backend
- Admin panel and departments view refactoring
