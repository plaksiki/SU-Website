# Testing Strategy

**Last Updated:** 2026-06-25

This document describes the testing approach for the SU Website frontend.

---

## Overview

| Type | Tool | Status | Location |
|------|------|--------|----------|
| Type checking | TypeScript (`tsc -b`) | ✅ Active | CI – `Type check & Build` step |
| Linting | ESLint | ✅ Active | CI – `Lint (ESLint)` step |
| Build verification | Vite (`vite build`) | ✅ Active | CI – `Type check & Build` step |
| Unit tests | Vitest | 🔜 Planned Sprint 3 | `su-frontend/src/__tests__/` |
| Integration tests | Vitest + React Testing Library | 🔜 Planned Sprint 3 | `su-frontend/src/__tests__/` |

---

## Current Automated Checks

All checks run on every pull request to `main` via `.github/workflows/ci.yml`.

### 1. TypeScript Type Checking

- **Command:** `tsc -b` (part of `npm run build`)
- **What it catches:** type mismatches, missing properties, incorrect function arguments
- **Config:** `su-frontend/tsconfig.json`

### 2. ESLint

- **Command:** `npm run lint`
- **What it catches:** unused variables, React Hooks violations, code style issues
- **Config:** `su-frontend/eslint.config.js`

### 3. Production Build

- **Command:** `vite build` (part of `npm run build`)
- **What it catches:** unresolved imports, bundling errors, missing dependencies
- **Output:** `su-frontend/dist/`

---

## Critical Modules

The following modules contain the most important product logic
and are prioritised for test coverage in upcoming sprints.

| Module | Description | Coverage target |
|--------|-------------|-----------------|
| `src/components/EventsTab.tsx` | Past/upcoming event filtering logic | ≥ 30% |
| `src/components/PollsTab.tsx` | Questionnaire rendering and answer submission | ≥ 30% |
| `src/data.ts` | Static data used across all components | ≥ 30% |

---

## Additional QA Check

In addition to linting and build checks, the CI runs **Check Links** via
`check-links.yml` using [Lychee](https://github.com/lycheeverse/lychee-action).
This checks that all URLs in repository markdown files are reachable.

Note: link checking does not count as the additional QA check for Assignment 4
quality requirement purposes — it is a separate supplementary check.

---

## Planned Testing Work

Unit and integration tests are planned for Sprint 3 once backend integration
stabilises. The following scenarios are prioritised:

- Event filtering: past vs upcoming events split by current date
- Questionnaire submission: required field validation
- Language switching: EN/RU translation key coverage

Tests will be added using **Vitest** (compatible with Vite) and stored in
`su-frontend/src/__tests__/`. Coverage reports will be generated with
`vitest --coverage` and linked from CI.

---

## Running Checks Locally

```bash
cd su-frontend
npm install
npm run lint       # ESLint
npm run build      # TypeScript + Vite build
```
