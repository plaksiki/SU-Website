# Week 7 Reflection

## 1. Learning Points

### Customer review and feedback:

- The team conducted a customer review session on 2026-07-18. See: [meeting summary](https://github.com/plaksiki/SU-Website/blob/main/reports/week7/sprint-review-summary.md), [transcript](https://github.com/plaksiki/SU-Website/blob/main/reports/week7/sprint-review-transcript.md).
- Key finding:
  - The time for events should be visible from user-side and be as it was picked by admin during the creation.
  - The leaders of SU should also have an extended information cards, as a common members.
  - The button for choosing the time during creating a new event should be close to time, but not at the end of the raw.
  - Polls should be tracked by id within the DB, but not randomly.
  - Polls should have active and inactive mode.
  - Polls should be presented from newest (first on the page) to oldest (last on the page).
  - Admins should be able to edit polls.
  - It should be possible to upload photos not by url, but by the photo itself.

### Documentation review

**What was added/updated:**

- 2 UATs connected to the admin panel items editing and SU members extended information.
- `Customer Handover` was finalized: updated transition scope, contacts for support requests, Operational Notes, changelog.
- v3.0.0 section was added to `CHANGELOG.md`
- `DEPLOY.md` was updated with automated healtcheck and troobleshooting/stop instructions
- `README.md` was also finalized: newest documents were added to the documentation section and releases section was actualized

### Refining the workflow

- Git workflow stayed the same as during Sprint 4.
- For Sprint 5 we focused on fixing bugs, UI flaws and responding to customer's feedback
- We finilize the main handover documentation and instructions for future product development.

### Sprint increment

**During the sprint we mostly did tasks that was deffered and responded to customer's feedback:**

- Photo upload optimization via Thumbor.
- Polls now can be uploaded seperately in csv format.
- Now the logic of csv report is located on backend, but not frontend.
- The Admin panel and departments view have been redesigned.
- Now the pages are updated when surfing between them through the website.
- Polls and Events can be changed.

## 2. Validated Assumptions

### Documentation review

- We should split the tasks in the way where the person who did the technical part document about this part by himself.
- We learned that documentation is the way of communicating with people, which was not involved in the development proccess. It should be consice and readable so other developers/customers/investors could understand the logic and purpose of the product.

### Deployment

- The website remains deployable on the IU virtual machine — confirmed, the Sprint 5 increment was successfully demonstrated to the customer on the VM.
- Final deployment of the product will be done by customers' development team by forking the origin repository.

### Customer feedback

- The Website design is approved.
- The architecture design decision still is not good: most of logic is still implemented through frontend.
- No catching of exceptions are in the system.
- In general, out website is good for the first project, but due to small experience we have a few technical issues. 

## 3. Friction and Gaps

### Unresolved requirements

- Unsuccessful responses are not proceed.

### Technical risks

- Admins verification is happening on frontend, which is not safe.
- Unsuccessful responses can occur errors and the website should handle it.
- Empty Website page can be opened even if link is not valid, but VM address is right.

### Missing scope

- No missing scope.

### Blocked work

- No work was blocked.

### Process friction

- In some cases, PR approvals were delayed, which slightly slowed down the merging process.
- Most of logic is performed on frontend and sometimes it confuses development team (it is harder to classify the issue type and find who is responsible for thst)

### Uncertainties

- No uncertainties.

### UAT

- A new UAT session with a SU representative is planned for Sprint 5, where a fully ready-made product will be demonstrated and tested successfully.

## 4. Planned Response

- Fix the final bugs
- Demonstrate and transfer final version of the product
- Finish the project and present it on 21 of July as a final exam.
