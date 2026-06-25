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
