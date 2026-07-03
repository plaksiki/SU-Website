# Quality Requirement Tests
**Last Updated:** 2026-06-25

This document defines automated tests for each quality requirement in `quality-requirements.md`.
All tests run automatically in the CI pipeline on every pull request to `main`.

---

## QRT-1: ESLint and TypeScript Check

| Field | Details |
|-------|---------|
| **Verifies** | QR-1 (Maintainability – Code Consistency) |
| **Type** | Static analysis / Type checking |
| **CI step** | `Lint (ESLint)` and `Type check & Build` in `.github/workflows/ci.yml` |
| **Commands** | `npm run lint` and `npm run build` |
| **Pass condition** | Both commands exit with code 0, no errors reported |
| **Fail condition** | Any lint error or TypeScript type error causes CI job to fail |

**What it checks:**
- ESLint rules defined in `su-frontend/eslint.config.js`
- TypeScript type correctness across all `.ts` and `.tsx` files
- React Hooks usage rules (via `eslint-plugin-react-hooks`)

**Evidence:** CI run logs in GitHub Actions → CI workflow → `Lint (ESLint)` step output

---

## QRT-2: Production Build Check

| Field | Details |
|-------|---------|
| **Verifies** | QR-2 (Reliability – Build Stability) |
| **Type** | Build verification |
| **CI step** | `Type check & Build` in `.github/workflows/ci.yml` |
| **Command** | `npm run build` (`tsc -b && vite build`) |
| **Pass condition** | Build completes, `dist/` folder is created, CI job exits with code 0 |
| **Fail condition** | Any compilation or bundling error causes CI job to fail |

**What it checks:**
- Full TypeScript compilation with `tsc -b`
- Vite production bundle generation
- All imports resolve correctly
- No missing dependencies

**Evidence:** CI run logs in GitHub Actions → CI workflow → `Type check & Build` step output

---

## QRT-3: Bundle Size Check

| Field | Details |
|-------|---------|
| **Verifies** | QR-3 (Performance Efficiency – Bundle Size) |
| **Type** | Build output analysis |
| **CI step** | `Type check & Build` in `.github/workflows/ci.yml` |
| **Command** | `npm run build` (Vite prints bundle size report automatically) |
| **Pass condition** | Total JS bundle size remains under 1 MB (1024 KB) |
| **Fail condition** | Bundle size exceeds 1 MB — requires manual review and justification |

**What it checks:**
- Vite prints a size report for every generated chunk after build
- The report is visible in CI logs and can be inspected manually

**Note:** This check is currently observational — the CI does not automatically
fail if the bundle exceeds 1 MB. The team monitors the Vite output in CI logs
and investigates if size grows unexpectedly. Automated enforcement may be added
in a later sprint.

**Evidence:** CI run logs in GitHub Actions → CI workflow → `Type check & Build` step,
Vite bundle size table printed at the end of build output

---

## QRT-4: Mobile Responsiveness Check
| Field | Details |
|-------|---------|
| **Verifies** | QR-4 (Usability – Mobile Responsiveness) |
| **Type** | Unit test |
| **CI step** | `Run tests` in `.github/workflows/ci.yml` |
| **Command** | `npm run test` |
| **Pass condition** | All pages render without horizontal overflow at 375px width |
| **Fail condition** | Any page causes horizontal scroll at mobile viewport |

**What it checks:**
- Home page, Events page, Polls page, Donations page, History page render at 375px
- No element causes `scrollWidth > clientWidth`

**Evidence:** Vitest test output in GitHub Actions → CI workflow → `Run tests` step

---

## QRT-5: Language Switching Check
| Field | Details |
|-------|---------|
| **Verifies** | QR-5 (Usability – Language Switching) |
| **Type** | Unit test |
| **CI step** | `Run tests` in `.github/workflows/ci.yml` |
| **Command** | `npm run test` |
| **Pass condition** | All keys present in both `en` and `ru` translations objects |
| **Fail condition** | Any key missing in either language |

**What it checks:**
- `translations.en` and `translations.ru` have identical keys
- No key returns undefined in either language

**Evidence:** Vitest test output in GitHub Actions → CI workflow → `Run tests` step

---

## QRT-6: Questionnaire Validation Check
| Field | Details |
|-------|---------|
| **Verifies** | QR-6 (Functional Suitability – Questionnaire Submission) |
| **Type** | Unit test |
| **CI step** | `Run tests` in `.github/workflows/ci.yml` |
| **Command** | `npm run test` |
| **Pass condition** | Required fields are validated before submission |
| **Fail condition** | Form submits with empty required fields |

**What it checks:**
- Submit button triggers validation
- Empty required fields produce error state
- Only valid form proceeds to submission

**Evidence:** Vitest test output in GitHub Actions → CI workflow → `Run tests` step
