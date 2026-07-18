# Week 7 Reflection

## 1. Learning Points

### Customer review and feedback:

- The team conducted a customer review session on 2026-07-17. See: [meeting summary](https://github.com/plaksiki/SU-Website/blob/main/reports/week7/sprint-review-summary.md), [transcript](https://github.com/plaksiki/SU-Website/blob/main/reports/week7/sprint-review-transcript.md).
- Key finding:
  - The time should be right during creating a new questionnare.
  - The leaders of SU departaments should have an extended information, as a common members.
  - The button for choosing the time during creating a new questionnaire should be close to time, but not at the end of the raw.
  - Polls should be tracked by id within the DB, but not randomly.
  - Polls should have active and passive mode.
  - Polls should be in order that they were created.
  - It should be possible to edit polls.
  - It should be possible to upload photos not by url, but by the photo itself.

### Documentation review

**What was added/updated:**

- **AGENTS.md**: Instructions for agents working inside the repository.
- **CONTRIBUTING.md**: Instructions for anyoe who wants to contribute to the project.
- 3 UATs connected to the admin panel items creation were added.
- Work statuses in User stories document were updated.

### Refining the workflow

- Git workflow stayed the same as during Sprint 3.
- We put more effort into the documentation: added instructions for agents and contributors, updated already existed documentation we started the project with.
- We tried to finish the main documentation by the end of Saturday and the beginning of Sunday.

### Sprint increment

**During the sprint we mostly did "filler" tasks that was failed before:**

- More fast photo upload.
- Polls now can be uploaded seperately in csv format.
- Now logic of csv report is located on backend, but not frontend.
- Admin panel and departments view refactoring.
- Now pages are updated when surfing between them through the website.
- Polls and Events can be changed.

## 2. Validated Assumptions

### Documentation review

- We should split the tasks in the way where the person who did the technical part document about this part by himself.
- It is better for team lead to write reflection and retrospective since she is acting in every little "department" in the team and communicate with teammates more comparing to others.
- We learned that documentation is the way of communicating with people, which was not involved in the development proccess. It should be consice and readable so other developers/customers/investors could understand the logic and purpose of the product.

### Deployment

- The website remains deployable on the IU virtual machine — confirmed, the Sprint 5 increment was successfully demonstrated to the customer on the VM.
- Final deployment of teh product will be done by customers' development team by forking the origin repository.

### Customer feedback

- The Website design is approved.
- The architecture design decision is not good: most of logic implemented through frontend.
- No catching of exceptions are in the system.
- In general, out website is good for the first project, but since a small experience we have a few technical issues. 

## 3. Friction and Gaps

### Unresolved requirements

- Unsuccessful responses are not proceed.

### Technical risks

- Admins verification is happening on frontend, which is not safe.
- Unsuccessful responses can occur errors and the website should handle it.

### Missing scope

- No missing scope.

### Blocked work

- No work was blocked.

### Process friction

- In some cases, PR approvals were delayed, which slightly slowed down the merging process.

### Uncertainties

- No uncertainties.

### UAT

- A new UAT session with a SU representative is planned for Sprint 5, where a fully ready-made product will be demonstrated and tested successfully.

## 4. Planned Response

- Fix the final bugs
- Demonstrate and transfer final version of the product
- Finish the project and present it on 21 of July as a final exam.
