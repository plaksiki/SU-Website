# Week 4 Reflection

## 1. Learning Points

### Customer review and feedback:
The team conducted a customer review session with already connected frontend, backend, databases of the SU questionnaires. Feedback was collected and documented. See: [meeting summary](https://github.com/plaksiki/SU-Website/reports/week4/customer-review-summary.md), [transcript](https://github.com/plaksiki/SU-Website/reports/week4/customer-review-transcript.md).

### Quality requirements and quality requirements tests:
Code style & linting: ESLint and TypeScript checks are enforced as quality requirements to maintain uniform code style across the frontend team. These are automatically tested on every PR via CI — any linting error blocks the merge.

**Bundle size:** A maximum frontend bundle size of 1 MB was defined as a performance quality requirement. An automated bundle size check runs in CI to verify this threshold is not exceeded on each PR.

**Unit test coverage:** Correct event filtering logic was defined as a functional quality requirement. 4 unit tests were written using Vitest and run automatically in CI, confirming the filtering behavior works as expected with our Vite + TypeScript stack.

**Backend build integrity:** Successful Maven build was set as a quality requirement for the backend. CI runs the build on every PR; PostgreSQL dependency was identified as a risk — temporarily resolved by using the -DskipTests flag until a test database is configured in CI.

### CI configuration:
During Sprint 2, the team configured GitHub Actions for both frontend and backend. For the frontend (Node.js), we set up ESLint, TypeScript, Vitest, and bundle size checks. For the backend (Java 21 + Maven), we configured an automated build pipeline.
The main challenge we encountered was that DemoApplicationTests crashes without a PostgreSQL connection, which caused CI to fail on the backend. We learned that backend tests with database dependencies require either a test database in CI or a way to skip them — as a temporary solution, we used the -DskipTests flag in Maven.
We also learned that writing CI configuration requires careful separation of frontend and backend workflows to avoid conflicts and keep checks fast and readable.

### UAT running:
A demonstration of the website was conducted to a representative of the Student Union, because our customer is a member of SU core. There was also a session where the customer clicks on the site and checks the features. ## LINK TO UAT

### Sprint increment:
In Sprint 2, we created a new feature, questionnaires, to do this, we combined the parts, important concepts of backend, frontend and databases. We also studied the CI configuration. We also presented the UAT phase for the customer. And since one of the customers is from SU core, that's why we tested our project on future users. We also designed the Github, added new issues with descriptions for Sprint 2, and also tracked all changes and completed tasks in the Backlog.

## 2. Validated Assumptions

### CI & automated testing:
- ESLint and TypeScript checks are sufficient to maintain uniform code style — confirmed, CI automatically catches errors on every PR to main.
- Frontend bundle size stays within 1 MB — confirmed, automatic bundle size verification is passing in CI.
- Vitest is compatible with our Vite + TypeScript stack without additional configuration — confirmed, 4 unit tests for event filtering logic run successfully in CI.
- GitHub Actions works correctly for both frontend (Node.js) and backend (Java 21 + Maven) — confirmed, all checks are green on PRs to main.
- Backend tests can run without a database connection — rejected, DemoApplicationTests crashes without PostgreSQL. Temporarily resolved using the -DskipTests flag in Maven.

### Implementation:
- React + TypeScript stack is a suitable choice for the team — confirmed, the questionnaire feature was successfully delivered by connecting frontend, backend, and database.

### Deployment:
- The website remains deployable on the IU virtual machine — confirmed, the Sprint 2 increment was successfully demonstrated to the customer on the VM.

### Customer feedback:
**Several assumptions were revised based on customer feedback:**

## 3. Friction and Gaps

### Unresolved requirements:
- The brand book and content (logos, photos, member descriptions) have not yet been provided by the customer, which may affect the final UI implementation.

### Technical risks:
- The PostgreSQL dependency in CI remains an unresolved technical risk. The current -DskipTests flag is a temporary workaround — backend tests are not actually running in CI, which means integration issues may go undetected.

### Missing scope:
- No missing scope was identified — all planned tasks for Sprint 2 were completed successfully.

### Blocked work:
- No blocked tasks were identified during Sprint 2.

### Process friction:
- In some cases, PR approvals were delayed, which slightly slowed down the merging process.

### Uncertainties:
- How Thumbor is expected to be used by frontend developers remains unclear — this question was carried over from Sprint 1 and has not yet been resolved with the customer.

## 4. Planned Response

### Unresolved requirements:
- The team will follow up with the customer to obtain the brand book and content
(logos, photos, member descriptions) as soon as possible to unblock UI implementation.

### Technical risks:
- The team will work on properly configuring backend tests in CI by setting up a PostgreSQL test database or introducing database mocking, replacing the temporary -DskipTests workaround. This will ensure backend logic is actually validated on every PR.

### Missing scope:
- No action required.

### Blocked work:
- No action required.

### UAT:
- A new UAT session with the SU representative is planned for Sprint 3, where the xlsx export feature will be demonstrated and validated.

### New features:
- The team will implement export of questionnaire results to .xlsx format via the backend. See: 'Issue [#45](https://github.com/plaksiki/SU-Website/issues/45)'

### Uncertainties:
- The questionnaire data export format and flow will be finalized as part of the xlsx implementation. See: 'Issue [#45](https://github.com/plaksiki/SU-Website/issues/45)'
