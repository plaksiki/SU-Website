# Customer Handover — SU Website (Innopolis University Students Union Portal)

## Product Status & Handover Scope

- **What this covers:** The web portal of the Innopolis University Students Union (SU) - the "business card" of SU and the interaction bridge between SU members and university students. Covers frontend (TypeScript), backend (Java), and database (PostgreSQL).
- **What is NOT covered:** Admin Panel backlog.
- **Current state:** The current release is MVP v3.0.0 (2026-07-19, per CHANGELOG.md) - a TypeScript frontend paired with a Java Spring Boot backend, deployed via Docker Compose on the production VM 10.93.26.192. v3.0.0 came with refactored admin panel and ability to edit created items

## Transition Scope

The product is delivered as open-source code. The customer can:

1. **Fork the repository** at `https://github.com/plaksiki/SU-Website`
2. **Clone and deploy** using the provided [DEPLOY.md](https://github.com/plaksiki/SU-Website/blob/main/DEPLOY.md) instructions
3. **Customize** the code as needed for their own VM

| Item | Status | Notes |
| :--- | :--- | :--- |
| Source Code | **Open source** | Public repository, MIT license; The customer is expected to fork the repository and deploy on their own VM |
| Documentation | **Provided** | DEPLOY.md, docs/, AGENTS.md |
| Production VM | **Not transferred** | Dev team's university VM is for demo purposes only |
| Hosting | **Not included** | Customer's dev team or plaksiki team (by request) deploys on customer's own infrastructure |


**Important:** The production VM at `10.93.26.192` is for development/demo purposes. The customer is expected to fork the repository and deploy on their own VM.

## Access & Usage

- **How the customer accesses the product:** The production portal is currently available at `http://10.93.26.192/` within the univerity's wifi.
- **Accounts / roles:** Admin (role).
- **Typical usage flow:** A student opens the portal -> finds information about the SU departments -> go to the Events page to find information about this department activities.

## Installation / Deployment

- **Deployment method:** Docker Compose (`docker-compose.prod.yml`), four services: `su-website-backend`, `su-website-db`, `su-website-frontend`, `su-thumbor`.
- **Environments:** Production — VM `10.93.26.192`.
- - **Configuration (Environment Variables):**
  - Stored in `.env` file
  - Required variables: `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `THUMBOR_SECURITY_KEY`
  - See [`.env.example`](https://github.com/plaksiki/SU-Website/blob/Assignment/.env.example) in the public repository
- **Current deployment owner:** Development team "plaksiki".
- **Setup steps customer must follow:**
  1. `git clone https://github.com/plaksiki/SU-Website.git && cd SU-Website`
  2. `cp .env.example .env` and fill in real values
  3. `docker compose -f docker-compose.prod.yml up -d --build`
  4. Check status: `docker ps` (backend, db, frontend and thumbor should show `Up`)
  5. Open `http://<vm-ip>` in a browser
  (**Full instructions:** [DEPLOY.md](https://github.com/plaksiki/SU-Website/blob/main/DEPLOY.md-deploy-from-scratch))
- **Recovery steps customer must follow:**
  1. If container crashes: `docker compose -f docker-compose.prod.yml restart <service>`
  2. If database is corrupted: restore from backup using `docker exec -i su-website-db-1 psql -U postgres < backup.sql`
  3. If VM fails: clone repository on new VM and follow DEPLOY.md
  4. In other case customer should follow [DEPLOY.md](https://github.com/plaksiki/SU-Website/blob/main/DEPLOY.md) for step-by-step recovery procedures.
- **Verification steps customer must follow:** The health-check described from [DEPLOY.md](https://github.com/plaksiki/SU-Website/blob/main/DEPLOY.md#health-test) verifies: container status, frontend HTTP response code, backend API, PostgreSQL and Thumbor containers status.

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
