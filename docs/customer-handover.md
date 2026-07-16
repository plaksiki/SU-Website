# Customer Handover — SU Website (Innopolis University Students Union Portal)

## Product Status & Handover Scope

- **What this covers:** The web portal of the Innopolis University Students Union (SU) - the "business card" of SU and the interaction bridge between SU members and university students. Covers frontend (TypeScript), backend (Java), and database (PostgreSQL).
- **What is NOT covered:** A mobile app - does not exist and is not part of the current project scope.
- **Current state in one paragraph:** The current release is MVP v2.1.0 (2026-07-12, per CHANGELOG.md) - a TypeScript frontend paired with a Java Spring Boot backend, deployed via Docker Compose on the production VM 10.93.26.192. v2.1.0 added the SU Brandbook and fixed polls/events created from the admin panel not appearing on the site pages.

## Transition Scope

| Item | Type | Status | Notes |
|---|---|---|---|
| github.com/plaksiki/SU-Website | Repository | Transferred | Public repository, MIT license; GitHub account owner is `plaksiki`, not the SU directly |
| Production VM (`10.93.26.192`) | Deployment | Transfered | SSH access as `root`; dev team currently holds root access |
| su-backend (Spring Boot) | Service | Retained by dev team | Deployed via `docker-compose.prod.yml` |
| su-frontend (TS) | Service | Retained by dev team | Deployed via `docker-compose.prod.yml` |
| PostgreSQL instance | Service | Retained by dev team | Port 5432, configured via `.env` |
| GitHub Actions CI/CD (`.github/workflows`) | Ownership | Retained by dev team | Pipeline configuration stays with developers |
| Netlify deployment of MVP v0 | Deployment | Deprecated | https://innopolissu.netlify.app/ - test development |

## Access & Usage

- **How the customer accesses the product:** The production portal is available at `http://10.93.26.192/`.
- **Accounts / roles:** Admin
- **Typical usage flow:** A student opens the portal -> finds information about the SU (departments, events, contacts) -> uses the portal as the main source of news/reference about SU activities.

## Installation / Deployment

- **Deployment method:** Docker Compose (`docker-compose.prod.yml`), three services: `su-website-backend`, `su-website-db`, `su-website-frontend`.
- **Environments:** Production — VM `10.93.26.192`.
- **Current deployment owner:** Development team "plaksiki".
- **Setup steps customer must follow:**
  1. `git clone https://github.com/plaksiki/SU-Website.git && cd SU-Website`
  2. `cp .env.example .env` and fill in real values
  3. `docker compose -f docker-compose.prod.yml up -d --build`
  4. Check status: `docker ps` (backend, db, frontend should show `Up`)
  5. Open `http://<vm-ip>` in a browser
  (Full instructions: [DEPLOY.md](https://github.com/plaksiki/SU-Website/blob/main/DEPLOY.md))
- **Recovery steps customer must follow:** We wrote instructions in [README.md](https://github.com/plaksiki/SU-Website/blob/main/README.md) and [DEPLOY.md](https://github.com/plaksiki/SU-Website/blob/main/DEPLOY.md) to recovery our product.
- **Verification steps customer must follow:** The health-check script from DEPLOY.md verifies: container status, frontend HTTP response code, backend `/actuator/health`, and PostgreSQL container status.

**Auto-update:** The VM automatically checks for updates every 5 minutes via cron (`*/5 * * * * cd /root/SU-Website && /bin/bash update.sh`). Manual update: `cd /SU-Website && ./update.sh`. Logs: `tail -f /var/log/site-update.log`.

## Configuration & Secrets Handling

| Name | Purpose | Where it's set | Who owns the value |
|---|---|---|---|
| `DB_NAME` | SU | `.env` on the production VM | dev team |
| `DB_USER` | postgres | `.env` on the production VM | dev team |
| `DB_PASSWORD` | Ask dev team (Secret info) | `.env` on the production VM | dev team |
| `THUMBOR_SECURITY_KEY` | Security key for the Thumbor image-processing service | `.env` on the production VM | dev team |

- **Secrets-handling process:** Secrets are stored in a `.env` file directly on the production VM (created manually from `.env.example`, not committed to the repository — see `.gitignore`).
- **Who provisions/rotates secrets:** Dev team.

## Operational Notes

- **Monitoring / logging:** Update logs — `/var/log/site-update.log` on the VM.
- **Routine operational tasks:** Auto-update every 5 minutes via cron; manual health check via the script from DEPLOY.md.
- **Known operational constraints:** Ports 80, 5432, and 8080 must be free on the VM.

## Documentation Entry Points
 
| Purpose | Link |
|---|---|
| General project overview | [README.md](https://github.com/plaksiki/SU-Website/blob/main/README.md) |
| Deployment and updates | [DEPLOY.md](https://github.com/plaksiki/SU-Website/blob/main/DEPLOY.md) |
| Version history | [CHANGELOG.md](https://github.com/plaksiki/SU-Website/blob/main/CHANGELOG.md) |
| Contribution guidelines | [CONTRIBUTING.md](https://github.com/plaksiki/SU-Website/blob/main/CONTRIBUTING.md) |
| Agent/AI working conventions | [AGENTS.md](https://github.com/plaksiki/SU-Website/blob/main/AGENTS.md) |
| Development process | [docs/development-process.md](https://github.com/plaksiki/SU-Website/blob/main/docs/development-process.md) |
| Architecture — static view | [docs/architecture/static-view](https://github.com/plaksiki/SU-Website/tree/main/docs/architecture/static-view) |
| Architecture — dynamic view | [docs/architecture/dynamic-view](https://github.com/plaksiki/SU-Website/tree/main/docs/architecture/dynamic-view) |
| Architecture — deployment view | [docs/architecture/deployment-view](https://github.com/plaksiki/SU-Website/tree/main/docs/architecture/deployment-view) |
| Architecture decision records | [docs/architecture/adr](https://github.com/plaksiki/SU-Website/tree/main/docs/architecture/adr) |
| MVP v1 demo video | [Google Drive demo](https://drive.google.com/file/d/1BB24vPEWdS3sDSKUaNwpFbZiY8T7Vzl2/view) |
| MVP v2 demo video | [Google Drive demo](https://drive.google.com/file/d/1PS55YtFoy9vcffSBwMiFZKob6eziSQN4/view?usp=sharing) |
| Release v1.0.0 | [GitHub Release v1.0.0](https://github.com/plaksiki/SU-Website/releases/tag/v1.0.0) |
| Release v2.0.0 | [GitHub Release v2.0.0](https://github.com/plaksiki/SU-Website/releases/tag/v2.0.0) |
 
---

## Troubleshooting & Support
 
- **Common issues and fixes:** We don't have this document. We only have bug fixes in CHANGELOG: wrong arrow rendering, events not moving to "past" automatically, translation sliding wrong, polls/events not showing after admin panel creates them.
- **Support channel:** We don't have official support channel for customer yet. For now, people use our repository [GitHub Issues](https://github.com/plaksiki/SU-Website/issues) page, we already made templates there for Bug / Task / User Story ([Issue Templates](https://github.com/plaksiki/SU-Website/tree/main/.github/ISSUE_TEMPLATE)).
- **Escalation path:** We don't have official escalation path (who to contact first, response time, etc). For now, our team members from README.md are the contact points:
  | Name | Role | Contact |
  |---|---|---|
  | Alina Petrova | Teaml-lead / Microservices | [GitHub](https://github.com/bilidjinka) · al.petrova@innopolis.university |
  | Daria Sevostianova | Scrum Master / Backend | [GitHub](https://github.com/dashasevostianova) · d.sevostianova@innopolis.university |
  | Bulat Shaikhutdinov | Frontend | [GitHub](https://github.com/LoLiTop1gg) · b.shaikhutdinov@innopolis.university |
  | Emil Gilfanov | Database | [GitHub](https://github.com/EMIL2007da) · e.gilfanov@innopolis.university |
  | Kristina Butkina | Frontend | [GitHub](https://github.com/smorodina2128506) · k.butkina@innopolis.university |
  | Svetlana Levagina | Frontend | [GitHub](https://github.com/moddyl) · s.levagina@innopolis.university |

  We think customer should choose one contact person (maybe Scrum Master or Team-lead) for production incidents, but now any of us can answers.
- **Support still necessary:** No.

## Known Limitations, Unfinished Areas & Risks

- No documented recovery/rollback procedure (what to do if a container fails or database data is lost).
- Secrets are stored locally in `.env` on the VM without a centralized secrets manager — a risk if VM access is lost or transferred to a new administrator.
- Production is accessible via an internal IP (`10.93.26.192`) — external accessibility outside the university network is not confirmed.
- Admins verification is happening on frontend, which is not safe.

## Handover Status
 
**Current level reached:** `Ready for independent use portal is deployed and running on v2.1.0, and DEPLOY.md let us reproduce deployment from zero.
 
**Documentation sufficiency assessment:** We think DEPLOY.md is enough for a technical person to reproduce our deployment.
 
**Support still necessary:** No.

## Related Documentation
 
- [README.md](https://github.com/plaksiki/SU-Website/blob/main/README.md)
- [DEPLOY.md](https://github.com/plaksiki/SU-Website/blob/main/DEPLOY.md)
- [CHANGELOG.md](https://github.com/plaksiki/SU-Website/blob/main/CHANGELOG.md)
- [CONTRIBUTING.md](https://github.com/plaksiki/SU-Website/blob/main/CONTRIBUTING.md)
- [AGENTS.md](https://github.com/plaksiki/SU-Website/blob/main/AGENTS.md)
- [docs/development-process.md](https://github.com/plaksiki/SU-Website/blob/main/docs/development-process.md)
- [Architecture documentation](https://github.com/plaksiki/SU-Website/tree/main/docs/architecture)
- [Pull Request Template](https://github.com/plaksiki/SU-Website/blob/main/.github/pull_request_template.md)
- [CI/CD Workflows](https://github.com/plaksiki/SU-Website/tree/main/.github/workflows)


## Changelog
 
| Date | Change | Author |
|---|---|---|
| 2026-06-14 | Release v0.1.0 (MVP v0 — static HTML/CSS prototype) | dev team |
| 2026-06-21 | Release v1.0.0 (MVP v1 — React migration, Docker production deployment) | dev team |
| 2026-07-05 | Release v2.0.0 (MVP v2 — Polls, Events, SU History page, Admin Panel, CSV export) | dev team |
| 2026-07-08 | First version of customer-handover.md | dev team |
| 2026-07-12 | Release v2.1.0 (SU Brandbook implemented; fixed polls/events not appearing after admin-panel creation) | dev team |
| 2026-07-12 | Week 6: Prefinal version of the product, fixed customer-handover.md | dev team |
| [date] | Week 7: Final version of the product (MVP v3) and customer-handover.md | dev team |
