# Week 3 Reflection

## 1. Learning Points

### Product Backlog migration & refinement:
- Tasks were migrated from a spreadsheet into GitHub Issues. To track progress more easily, we added 5 columns (Backlog, Ready, In Progress, In Review, Done). Through this process, we learned that breaking tasks into smaller subtasks with detailed descriptions and concrete completion criteria significantly simplifies the workflow, so each team member clearly understands what is expected of them. Setting priorities (Urgent, High, Medium, Low) helped the team stay focused on the most critical tasks first.

### Estimation & Sprint Planning:
- Tasks were estimated in Story points. Sprint Planning was conducted via Telegram, the team lead distributed tasks among team members and determined what to include in the sprint. We found that this approach worked well for our team size and allowed us to start working quickly and more efficiently.

### MVP v1 delivery:
- During Sprint 1, the team successfully delivered the first MVP increment. The following features were implemented:student union departments page, a donation page, event page with filters (Upcoming, Passed, and All), and Language switch. This allowed us to validate the core structure of the application and confirm that the chosen tech stack (React + TypeScript) works well for the team.

### Customer review:
The team conducted a customer review session with the SU representative. Feedback was collected and documented. See: [meeting summary](https://github.com/plaksiki/SU-Website/blob/main/reports/week3/customer-review-summary.md), [transcript](https://github.com/plaksiki/SU-Website/blob/main/reports/week3/customer-review-transcript.md).

### Release preparation:
The team did not create a formal GitHub release for Sprint 1. Changes were merged into the main branch via PR review. We recognized that creating a proper release with a version tag and description is important for tracking progress and will be implemented starting from Sprint 2.

### Workflow enforcement:
The team followed the agreed workflow: each participant was required to make at least one PR with a meaningful commit message, and all work was done in separate branches. This helped avoid conflicts and kept the main branch stable.

## 2. Validated Assumptions

### Implementation:
- The React + TypeScript stack proved to be a suitable choice for the team, allowing successful delivery of the frontend prototype including language switching and event/team templates.

### Testing & deployment:
- The prototype was successfully demonstrated to the customer, confirming that the core structure of the application meets the basic requirements. The website was deployed on the IU virtual
machine(VM).

### Customer feedback:
**Several assumptions were revised based on customer feedback:**

- The donation page was assumed to need detailed financial information, but the customer requested a simplified version with only a QR code or link.
- The events page was assumed to need a "Join" button, but the customer confirmed that informative cards with event details are sufficient.
- The admin backlog was confirmed to be for internal team use only.

## 3. Friction and Gaps

### Unresolved requirements:
- The brand book and content (logos, photos, member descriptions) have not yet been provided by the customer, which may affect the final UI implementation.

### Technical risks:
- Potential delay in backend integration may impact the delivery of data-dependent features in upcoming sprints.

### Missing scope:
- No missing scope was identified — all planned tasks for Sprint 1 were completed successfully.

### Blocked work:
- No blocked tasks were identified during Sprint 1.

### Process friction:
- In some cases, PR approvals were delayed, which slightly slowed down the merging process.

### Uncertainties:
- For now it is on discussion stage how to match backend and frontend with databases drafts.
- There are questons about how Thumbor is expected to be used by frontenders form customers' side opinion. 

## 4. Planned Response

### Unresolved requirements:
- The team will follow up with the customer to obtain the brand book and content
(logos, photos, member descriptions) as soon as possible to unblock UI implementation.

### Technical risks:
- Backend integration with the frontend is planned for Sprint 2. The team will
prioritize delivering working end-to-end features as requested by the customer.

### Missing scope:
- No action required.

### Blocked work:
- No action required.

### Process friction:
- The team will aim to review and approve PRs more promptly to avoid delays in
the merging process.

### Uncertainties:
- How finally data from questionaires will be exported
- How Thumbor will be used by frontenders
