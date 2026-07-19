# Customer Handover — SU Website (Innopolis University Students Union Portal)

## Product Status & Handover Scope

- **What this covers:** The web portal of the Innopolis University Students Union (SU) - the "business card" of SU and the interaction bridge between SU members and university students. Covers frontend (TypeScript), backend (Java), and database (PostgreSQL).
- **What is NOT covered:** 
  - Admin Panel backlog (not critical for current product state)
  - External accessibility outside university network
- **Current state:** The current release is MVP v3.0.0 (2026-07-19, per CHANGELOG.md) - a TypeScript frontend paired with a Java Spring Boot backend, deployed via Docker Compose on the production VM 10.93.26.192. v3.0.0 came with refactored admin panel and ability to edit created items

---

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

---

## Access & Usage

- **How the customer accesses the product:** The production portal is currently available at `http://10.93.26.192/` within the univerity's wifi.
- **Accounts / roles:** Admin (role).
- **Typical usage flow:** A student opens the portal -> finds information about the SU departments -> go to the Events page to find information about this department activities.

---

## Installation / Deployment

- **Deployment method:** Docker Compose (`docker-compose.prod.yml`), four services: `su-website-backend`, `su-website-db`, `su-website-frontend`, `su-thumbor`.
- **Environments:** Production — VM `10.93.26.192`.
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
  2. For other cases, follow [DEPLOY.md](https://github.com/plaksiki/SU-Website/blob/main/DEPLOY.md) for step-by-step recovery procedures.
- **Verification steps customer must follow:** The health-check described from [DEPLOY.md](https://github.com/plaksiki/SU-Website/blob/main/DEPLOY.md#health-test) verifies: container status, frontend HTTP response code, backend API, PostgreSQL and Thumbor containers status.

---

## Configuration & Secrets Handling

- Stored in `.env` file
- See [`.env.example`](https://github.com/plaksiki/SU-Website/blob/Assignment/.env.example) in the public repository

### Required Variables

| Name | Purpose | Where it's set | Who owns the value |
|---|---|---|---|
| `DB_NAME` | PostgreSQL database name | `.env` on VM | **Customer** (set by customer) |
| `DB_USER` | PostgreSQL user | `.env` on VM | **Customer** (set by customer) |
| `DB_PASSWORD` | PostgreSQL password | `.env` on VM | **Customer** (set by customer) |
| `THUMBOR_SECURITY_KEY` | Thumbor security | `.env` on VM  | **Customer** (set by customer) |

### Setup Instructions

1. Copy `.env.example` → `.env`
2. Fill in all values (see descriptions above)
3. Deploy using `docker compose -f docker-compose.prod.yml up -d`

### Security Notes

- `.env` is ignored by Git (`.gitignore`)
- Do not commit `.env` to the repository
- The customer is responsible for rotating secrets (e.g., changing `DB_PASSWORD`)

### Who Owns the Secrets

- **After handover:** Customer
- **Dev team:** Has no access to production `.env` file

---

## Operational Notes

- **Known operational constraints:** Ports 80, 5432, 8888, and 8080 must be free on the VM.

### Monitoring & Logging

| Task | Command |
| :--- | :--- |
| Check container status | `docker compose -f docker-compose.prod.yml ps` |
| Health check | `bash healthcheck.sh` |
| View all logs | `docker compose -f docker-compose.prod.yml logs` |
| View last 100 logs | `docker compose -f docker-compose.prod.yml logs --tail=100` |
| View last 100 logs for certain service | `docker compose -f docker-compose.prod.yml logs <service> --tail=100` (services: `backend`, `frontend`, `thumbor`, `db`)|
| Follow logs in real-time | `docker compose -f docker-compose.prod.yml logs --tail=100 -f` |

### Routine Operational Tasks

| Frequency | Task | Command |
| :--- | :--- | :--- |
| Daily | Health check | `bash healthcheck.sh` |
| Daily | Check for errors | `docker compose -f docker-compose.prod.yml logs --tail=150` |
 
---

## Documentation Entry Points

### For End Users

| Purpose | Link |
| :--- | :--- |
| Product overview | [README.md](https://github.com/plaksiki/SU-Website/blob/main/README.md) |
| Deployment guide | [DEPLOY.md](https://github.com/plaksiki/SU-Website/blob/main/DEPLOY.md) |
| Changelog | [CHANGELOG.md](https://github.com/plaksiki/SU-Website/blob/main/CHANGELOG.md) |
| Contributing | [CONTRIBUTING.md](https://github.com/plaksiki/SU-Website/blob/main/CONTRIBUTING.md) |

### For Dev Team
| Purpose | Link |
| :--- | :--- |
| Deployment and updates | [DEPLOY.md](https://github.com/plaksiki/SU-Website/blob/main/DEPLOY.md) |
| Changelog | [CHANGELOG.md](https://github.com/plaksiki/SU-Website/blob/main/CHANGELOG.md) |
| Agent/AI working conventions | [AGENTS.md](https://github.com/plaksiki/SU-Website/blob/main/AGENTS.md) |
| Architecture documentation | [docs/architecture/](https://github.com/plaksiki/SU-Website/tree/main/docs/architecture) |
| Development process | [docs/development-process.md](https://github.com/plaksiki/SU-Website/blob/main/docs/development-process.md) |
| Pull Request Template | [.github/pull_request_template.md](https://github.com/plaksiki/SU-Website/blob/main/.github/pull_request_template.md) |
| CI/CD Workflows | [.github/workflows](https://github.com/plaksiki/SU-Website/tree/main/.github/workflows) |

---

## Troubleshooting & Support

- **Common issues and fixes:** [Troubleshooting](https://github.com/plaksiki/SU-Website/blob/main/DEPLOY.md#troubleshooting) section in `DEPLOY.md`.
- **Support channel:** GitHub Issues — [`https://github.com/plaksiki/SU-Website/issues`](https://github.com/plaksiki/SU-Website/issues).
- **Escalation path:**
  - Contact the Team Lead via email `al.petrova@innopolis.university`. Response time: within 24 hours during the working days.
  - **All members contacts:**
| Name | Role | Contact |
|---|---|---|
| Alina Petrova | Teaml-lead / Microservices Engineer | [GitHub](https://github.com/bilidjinka) · al.petrova@innopolis.university |
| Daria Sevostianova | Scrum Master / Backend | [GitHub](https://github.com/dashasevostianova) · d.sevostianova@innopolis.university |
| Bulat Shaikhutdinov | Frontend | [GitHub](https://github.com/LoLiTop1gg) · b.shaikhutdinov@innopolis.university |
| Emil Gilfanov | Database | [GitHub](https://github.com/EMIL2007da) · e.gilfanov@innopolis.university |
| Kristina Butkina | Frontend | [GitHub](https://github.com/smorodina2128506) · k.butkina@innopolis.university |
| Svetlana Levagina | Frontend | [GitHub](https://github.com/moddyl) · s.levagina@innopolis.university |
- **Support still necessary:** No.

---

## Known Limitations, Unfinished Areas & Risks

| **Area** | **Description** | **Risks** |
| :--- | :--- | :--- |
| Recovery procedure | No documented rollback if container fails or DB data is lost | High - manual recovery required |
| Secrets management | `.env` stored locally on VM, no central secrets manager | Medium - risk if VM access is lost |
| Network access | Accessible only via internal IP | Medium - not accessible from outside university |
| Admins verification | Admins verification performed on frontend (not safe) | High - should be moved to backend |

---

## Handover Status

**The handover status:** Ready for independent use.
**Why it is not used by customer:** 3 development teams are developing similar products (SU Website), so Student Union will finally choose one of them to daploy after Demo Day (planned on 2026-07-21).

**Remaining actions to reach full transition:**
- None — product is **ready for independent use**.
- Customer needs to deploy on their own VM for independent operation.
- Customer should set their own `.env` with secure passwords.

**Documentation sufficiency assessment:** The documentation is sufficient for a development teams to deploy and maintain the product. DEPLOY.md provides step-by-step instructions for setup, update, and troubleshooting. README.md covers project overview. Documentation site is hosted. CHANGELOG.md tracks version history. Architecture documentation captured main aspects of system working.

---

## Changelog

| Date | Version | Changes |
| :--- | :--- | :--- |
| 2026-07-19 | **v3.0.0** | MVPv3: Tab navigation in admin panel, Data persistence via localStorage — survives page refresh |
| 2026-07-12 | **v2.1.0** | Applied SU Brandbook; Added info cards for SU members; fixed polls/events not appearing after admin-panel creation.. |
| 2026-07-05 | **v2.0.0** | MVPv2: Polls page with surveys(single/multiple choice and 'text answer' questions), SU History page; Admin Panel - CSV export, Surveys and Events creation window in Admin Panel. |
| 2026-06-21 | **v1.0.0** | MVPv1: Main page with info about departments, `Events` page with filters and `Support Us` pages, Language Switch |
| 2026-06-14 | **v0.1.0** | MVPv0: static info pages for deployment testing.
