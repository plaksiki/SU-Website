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
