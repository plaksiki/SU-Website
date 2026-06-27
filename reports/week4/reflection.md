# Week 4 Reflection

## 1. Learning Points

### Customer review and feedback:b/main/reports/week4/customer-review-summary.md
The team conducted a customer review session with already connecting frontend, backend, databases of the SU questionnaires. Feedback was collected and documented. See: [meeting summary](https://github.com/plaksiki/SU-Website/blob/Assignment/reports/week4/customer-review-summary.md), [transcript](https://github.com/plaksiki/SU-Website/blob/Assignment/reports/week4/customer-review-transcript.md).

### Quality requirements and quality requirements tests:
Code style & linting: ESLint and TypeScript checks are enforced as quality requirements to maintain uniform code style across the frontend team. These are automatically tested on every PR via CI — any linting error blocks the merge.

Bundle size: A maximum frontend bundle size of 1 MB was defined as a performance quality requirement. An automated bundle size check runs in CI to verify this threshold is not exceeded on each PR.

Unit test coverage: Correct event filtering logic was defined as a functional quality requirement. 4 unit tests were written using Vitest and run automatically in CI, confirming the filtering behavior works as expected with our Vite + TypeScript stack.

Backend build integrity: Successful Maven build was set as a quality requirement for the backend. CI runs the build on every PR; PostgreSQL dependency was identified as a risk — temporarily resolved by using the -DskipTests flag until a test database is configured in CI.

### CI configuration:
During Sprint 2, the team configured GitHub Actions for both frontend and backend. For the frontend (Node.js), we set up ESLint, TypeScript, Vitest, and bundle size checks. For the backend (Java 21 + Maven), we configured an automated build pipeline.
The main challenge we encountered was that DemoApplicationTests crashes without a PostgreSQL connection, which caused CI to fail on the backend. We learned that backend tests with database dependencies require either a test database in CI or a way to skip them — as a temporary solution, we used the -DskipTests flag in Maven.
We also learned that writing CI configuration requires careful separation of frontend and backend workflows to avoid conflicts and keep checks fast and readable.

### UAT running:
A demonstration of the website was conducted to a representative of the Student Union, because our customer is a member of SU core. There was also a session where the customer clicks on the site and checks the features. ## LINK TO UAT

### Sprint increment:
In Sprint 2, we created a new feature, questionnaires, to do this, we combined the parts, important concepts of backend, frontend and databases. We also studied the CI configuration. We also presented the UAT phase for the customer. And since one of the customers is from SU core, that's why we tested our project on future users. We also designed the Github, added new issues with descriptions for Sprint 2, and also tracked all changes and completed tasks in the Backlog.

## 2. Validated Assumptions
It was assumed that ESLint and TypeScript checks are sufficient to maintain a uniform code style among the three front—enders - CI is confirmed to automatically catch errors with each PR in main. Also guessed that the size of the frontend bundle would remain within 1 MB — it is confirmed that the current bundle is undergoing automatic verification in CI. And that the backend tests require PostgreSQL — it is confirmed that DemoApplicationTests crashes without connecting to the database. A temporary solution is to compile Maven with the -DskipTests flag. Also thought that Vitest is compatible with our Vite + TypeScript stack without additional configuration — it is confirmed that 4 unit tests for event filtering logic are successfully running in CI. CI was supposed to work correctly on GitHub Actions for the front (Node.js) and beck (Java 21 + Maven) — confirmed, all checks are green on PR in main.


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
