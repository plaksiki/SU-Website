# Customer Handover — SU Website (Innopolis University Students Union Portal)

## 1. Product Status & Handover Scope

- **What this covers:** The web portal of the Innopolis University Students Union (SU) — the "business card" of SU and the interaction bridge between SU members and university students. Covers frontend (React/TypeScript), backend (Java), and database (PostgreSQL).
- **What is NOT covered:** A mobile app — does not exist and is not part of the current project scope.
- **Current state in one paragraph:** The current release is **MVP v1.0.0** (Assignment 3) — a React frontend paired with a Java backend, deployed via Docker Compose on the production VM `10.93.26.192`. The earlier MVP v0 (static HTML/CSS) was hosted on Netlify and is now a deprecated legacy version.

## 2. Transition Scope

| Item | Type | Status | Notes |
|---|---|---|---|
| github.com/plaksiki/SU-Website | Repository | Transferred | Public repository, MIT license; GitHub account owner is `plaksiki`, not the SU directly |
| Production VM (`10.93.26.192`) | Deployment | Transfered | SSH access as `root`; dev team currently holds root access |
| su-backend (Java service) | Service | Retained by dev team | Deployed via `docker-compose.prod.yml` |
| su-frontend (React/TS) | Service | Retained by dev team | Deployed via `docker-compose.prod.yml` |
| PostgreSQL instance | Service | Retained by dev team | Port 5432, configured via `.env` |
| GitHub Actions CI/CD (`.github/workflows`) | Ownership | Retained by dev team | Pipeline configuration stays with developers |
| Netlify deployment of MVP v0 | Deployment | Deprecated | https://innopolissu.netlify.app/ — old version, not current production |

**Summary:** Root SSH access to the production VM (10.93.26.192) has been transferred to SU representatives — the customer can now log in, redeploy, and administer the server directly.

## 3. Access & Usage

- **How the customer accesses the product:** The production portal is available at `http://10.93.26.192/`.
- **Accounts / roles:** [TBD]
- **Typical usage flow:** A student opens the portal → finds information about the SU (structure, events, contacts) → uses the portal as the main source of news/reference about SU activities.

## 4. Installation / Deployment

- **Deployment method:** Docker Compose (`docker-compose.prod.yml`), three services: `su-website-backend`, `su-website-db`, `su-website-frontend`.
- **Environments:** Production — VM `10.93.26.192`.
- **Current deployment owner:** Development team (based on DEPLOY.md, procedures are written from a developer/DevOps perspective).
- **Setup steps customer must follow:**
  1. `git clone https://github.com/plaksiki/SU-Website.git && cd SU-Website`
  2. `cp .env.example .env` and fill in real values
  3. `docker compose -f docker-compose.prod.yml up -d --build`
  4. Check status: `docker compose -f docker-compose.prod.yml ps` (backend, db, frontend should show `Up`)
  5. Open `http://<vm-ip>` in a browser
  (Full instructions: [DEPLOY.md](https://github.com/plaksiki/SU-Website/blob/main/DEPLOY.md))
- **Recovery steps customer must follow:** No separate recovery/rollback runbook was found in the repository — **this is a gap** (see section 9, "Known Limitations").
- **Verification steps customer must follow:** The health-check script from DEPLOY.md verifies: container status, frontend HTTP response code, backend `/actuator/health`, and PostgreSQL container status.

**Auto-update:** The VM automatically checks for updates every 5 minutes via cron (`*/5 * * * * cd /root/SU-Website && /bin/bash update.sh`). Manual update: `cd /SU-Website && ./update.sh`. Logs: `tail -f /var/log/site-update.log`.

## 5. Configuration & Secrets Handling

| Name | Purpose | Where it's set | Who owns the value |
|---|---|---|---|
| `DB_NAME` | SU | `.env` on the production VM | dev team |
| `DB_USER` | postgres | `.env` on the production VM | dev team |
| `DB_PASSWORD` | More5_95 | `.env` on the production VM | dev team |
| `THUMBOR_SECURITY_KEY` | Security key for the Thumbor image-processing service | `.env` on the production VM | dev team |

- **Secrets-handling process:** Secrets are stored in a `.env` file directly on the production VM (created manually from `.env.example`, not committed to the repository — see `.gitignore`). **No centralized secrets manager (Vault, AWS Secrets Manager, etc.) is used** — this should be flagged as a limitation/risk (section 9).
- **Who provisions/rotates secrets:** Dev team.

## 6. Operational Notes

- **Monitoring / logging:** Update logs — `/var/log/site-update.log` on the VM.
- **Routine operational tasks:** Auto-update every 5 minutes via cron; manual health check via the script from DEPLOY.md.
- **Known operational constraints:** Ports 80, 5432, and 8080 must be free on the VM.

## 7. Documentation Entry Points

| Purpose | Link |
|---|---|
| General project overview | [README.md](https://github.com/plaksiki/SU-Website/blob/main/README.md) |
| Deployment and updates | [DEPLOY.md](https://github.com/plaksiki/SU-Website/blob/main/DEPLOY.md) |
| Version history | [CHANGELOG.md](https://github.com/plaksiki/SU-Website/blob/main/CHANGELOG.md) |
| MVP v1 demo video | [Google Drive demo](https://drive.google.com/file/d/1BB24vPEWdS3sDSKUaNwpFbZiY8T7Vzl2/view) |
| Release v1.0.0 | [GitHub Release v1.0.0](https://github.com/plaksiki/SU-Website/releases/tag/v1.0.0) |
| Troubleshooting / support |  |

---

## 8. Troubleshooting & Support

- **Common issues and fixes:** 
- **Support channel:** 
- **Escalation path:** 
- **Support still necessary:** 

## 9. Known Limitations, Unfinished Areas & Risks

- No documented recovery/rollback procedure (what to do if a container fails or database data is lost).
- Secrets are stored locally in `.env` on the VM without a centralized secrets manager — a risk if VM access is lost or transferred to a new administrator.
- No documented user role model for the portal (who is an SU administrator vs. a regular student).
- Production is accessible via an internal IP (`10.93.26.192`) — external accessibility outside the university network is not confirmed.

## 10. Handover Status

**Current level reached:** `Ready for independent use` *(preliminary assessment — [confirm with the team/instructor]: the portal is deployed and running, and DEPLOY.md allows the deployment to be reproduced from scratch.*

**Documentation sufficiency assessment:**
The existing documentation (DEPLOY.md) is sufficient for a technically capable person to reproduce the deployment.

**Support still necessary:**
Development team support is still required for at least: (a) initially clarifying root access to the VM, (b) handling production incidents, (c) migrating secrets to the customer's side, if that is required by project completion.

## 11. Related Documentation

- [README.md](https://github.com/plaksiki/SU-Website/blob/main/README.md)
- [DEPLOY.md](https://github.com/plaksiki/SU-Website/blob/main/DEPLOY.md)
- [CHANGELOG.md](https://github.com/plaksiki/SU-Website/blob/main/CHANGELOG.md)
- [Pull Request Template](https://github.com/plaksiki/SU-Website/blob/main/.github/pull_request_template.md)
- [CI/CD Workflows](https://github.com/plaksiki/SU-Website/tree/main/.github/workflows)

## Changelog

| Date | Change | Author |
|---|---|---|
| 2026-06-21 | Release v1.0.0 (MVP v1) | dev team |
| 2026-07-08 | First version of customer-handover.md | dev team |
| [date] | Week 6: Prefinal version of the product, fixed customer-handover.md | dev team |
| [date] | Week 7: Final version of the product (MVP v3) and customer-handover.md  | dev team |
