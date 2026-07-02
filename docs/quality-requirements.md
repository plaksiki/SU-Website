# Quality Requirements
**Last Updated:** 2026-06-25

Quality requirements define measurable non-functional properties the SU Website must satisfy.
Each requirement is linked to an ISO/IEC 25010 sub-characteristic and verified by an automated test.

---

## QR-1: Maintainability – Code Consistency

| Field | Details |
|-------|---------|
| **ISO/IEC 25010** | Maintainability / Analysability |
| **Verified by** | QRT-1 |

**Scenario:**
- **Stimulus:** A developer pushes new code to the repository
- **Environment:** CI pipeline running on a pull request to `main`
- **Response:** ESLint and TypeScript checks run automatically
- **Measure:** 0 lint errors, 0 type errors — CI job exits with code 0

**Rationale:** Three frontend developers work in the same codebase simultaneously.
Automated checks catch inconsistencies and type errors before they reach `main` and affect other team members.

---

## QR-2: Reliability – Build Stability

| Field | Details |
|-------|---------|
| **ISO/IEC 25010** | Reliability / Maturity |
| **Verified by** | QRT-2 |

**Scenario:**
- **Stimulus:** A developer merges changes into the main branch
- **Environment:** CI pipeline, production build step (`tsc -b && vite build`)
- **Response:** The application compiles and bundles without errors
- **Measure:** Build completes successfully, output files appear in `dist/`, CI job exits with code 0

**Rationale:** The SU Website is the primary information source for Innopolis University students.
A broken build means students cannot access event information or SU department details.
Build stability must be verified automatically on every change.

---

## QR-3: Performance Efficiency – Bundle Size

| Field | Details |
|-------|---------|
| **ISO/IEC 25010** | Performance Efficiency / Resource Utilisation |
| **Verified by** | QRT-3 |

**Scenario:**
- **Stimulus:** A developer runs a production build
- **Environment:** Vite production build on CI (`npm run build`)
- **Response:** Vite outputs a bundle size report in the terminal
- **Measure:** Total JavaScript bundle size does not exceed 1 MB (1024 KB)

**Rationale:** Students may access the portal from university Wi-Fi or mobile networks.
Keeping the bundle size reasonable ensures the page loads quickly
and discourages adding unnecessary dependencies to the project.

---

## QR-4: Usability – Mobile Responsiveness
 
| Field              | Details                                                       |
| ------------------ | ---------------------------------------------------------------- |
| **ISO/IEC 25010**  | Usability / Operability                                          |
| **Verified by**    | QRT-4                                                             |
| **Related ADR(s)** | [ADR-001](./architecture/adr/ADR-004-mobile-first-layout.md) |
 
**Scenario:**
 
- **Stimulus:** A student opens the portal on a mobile device
- **Environment:** Browser at 375px screen width (iPhone SE)
- **Response:** All pages render correctly
- **Measure:** No horizontal scroll; all buttons and text are reachable — verified by a
  Playwright/Cypress test
**Rationale:** The customer explicitly requested a "fully responsive design." Students frequently
access the site from their phones.
 
---
 
## QR-5: Usability – Language Switching
 
| Field              | Details                                                       |
| ------------------ | ---------------------------------------------------------------- |
| **ISO/IEC 25010**  | Usability / Accessibility                                        |
| **Verified by**    | QRT-5                                                             |
| **Related ADR(s)** | [ADR-002](./architecture/adr/ADR-002-one-translations-object-for-EN&RU.md) |
 
**Scenario:**
 
- **Stimulus:** A user clicks the language-switch control
- **Environment:** Any page on the site
- **Response:** All text on the page switches to the selected language
- **Measure:** 100% of text elements are translated — verified by a unit test against the
  translations object
**Rationale:** The customer requested "at minimum English, ideally with switching to Russian."
Both languages must be complete.
 
---
 
## QR-6: Functional Suitability – Questionnaire Submission
 
| Field              | Details                                                       |
| ------------------ | ---------------------------------------------------------------- |
| **ISO/IEC 25010**  | Functional Suitability / Functional Correctness                  |
| **Verified by**    | QRT-6                                                             |
| **Related ADR(s)** | [ADR-003](./architecture/adr/ADR-003-validate-questionnaires-on-both-frontend-and-backend.md) |
 
**Scenario:**
 
- **Stimulus:** A student fills out and submits a questionnaire
- **Environment:** `/polls` page, all question types (single-choice, multiple-choice, text)
- **Response:** Answers are sent to the backend; the user sees a confirmation
- **Measure:** All required fields are validated and the POST request carries the correct
  payload — verified by a Vitest test
**Rationale:** The customer identified questionnaires as the most important feature. They must
work correctly for every question type.
