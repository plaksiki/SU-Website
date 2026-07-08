# Customer Handover — <Product / Service Name>

> **Last updated:** <YYYY-MM-DD> · **Owner:** <team/person> · **Reviewed by:** <reviewer name(s)>
>
> This document describes the **current, actual** state of the handover — not planned or future work.
> Update it whenever access, deployment, configuration, limitations, or handover status change.

---

## 1. Product Status & Handover Scope

- **What this covers:** <which component / service / whole product is in scope for this handover>
- **What is NOT covered:** <explicitly excluded parts, if any>
- **Current state in one paragraph:** <plain description of what exists and works today, as of this update>

---

## 2. Access & Usage

- **How the customer accesses the product:** <URL(s), environment(s), app/portal name>
- **Accounts / roles:** <how accounts are created, role types, who provisions access>
- **Typical usage flow:** <the main steps a customer follows to use the product day to day>

---

## 3. Installation / Deployment

> Omit or mark "Not applicable" if the product is fully hosted/managed and the customer never deploys it.

- **Deployment method:** <e.g., Docker image, Helm chart, manual steps, CI/CD pipeline>
- **Environments:** <dev / staging / prod — which exist and where they run>
- **Current deployment owner:** <who deploys today — your team, customer, or shared>
- **Steps (or link to runbook):** <short summary + link to detailed deploy doc>

---

## 4. Configuration & Secrets Handling

> Do NOT include actual secret values here — describe the mechanism only.

- **Required configuration:** <list of config keys/settings needed, with placeholder examples like `<API_KEY>`, `<DB_CONNECTION_STRING>`>
- **Where secrets live:** <e.g., Vault, AWS Secrets Manager, customer's own secret store>
- **Who provisions/rotates secrets:** <your team / customer / shared responsibility>
- **Access process:** <how someone requests access to secrets>

---

## 5. Operational Notes

- **Monitoring / logging:** <where to find logs, dashboards, alerts>
- **Routine operational tasks:** <backups, scaling, scheduled jobs, maintenance windows>
- **Known operational constraints:** <rate limits, capacity limits, manual steps still required>

---

## 6. Troubleshooting & Support

- **Common issues and fixes:** <short list of known problems and how to resolve them>
- **Support channel:** <Slack channel, email, ticketing system>
- **Escalation path:** <who to contact for urgent/Sev1 issues>
- **Support still required from us:** <explicitly state what ongoing support your team still provides, even post-handover — e.g., "Sev1 incident response," "initial prod setup assistance," "data migration questions">

---

## 7. Known Limitations, Unfinished Areas & Risks

- <limitation 1 — what's missing/incomplete and its impact>
- <limitation 2>
- <known bugs, workarounds, technical debt>
- <risks the customer should be aware of>

---

## 8. Handover Status

**Current level reached:** `<Ready for independent use | Independently used by customer | Deployed or operated on customer side>`

**Documentation sufficiency assessment:**
<Assess whether current documentation is sufficient for the customer to operate at this level independently. Be specific about what is and isn't covered. Example: "Documentation covers installation, configuration, and basic troubleshooting — sufficient for independent day-to-day use. Disaster-recovery procedures are not yet documented; customer should contact support for those scenarios.">

---

## 9. Remaining Actions

> If a stronger handover level has not yet been reached, explain the blocker(s) and what's needed to progress.

| Action | Blocks next level? | Owner | Status |
|---|---|---|---|
| <e.g., document production deploy runbook> | Yes/No | <team/person> | <in progress/planned> |
| <e.g., migrate secrets to customer's Vault> | Yes/No | <team/person> | <in progress/planned> |

**Blocker summary:** <if applicable, plain-language explanation of why the next handover level hasn't been reached yet>

---

## 10. Related Documentation

- <Link to detailed deployment runbook>
- <Link to API reference>
- <Link to architecture overview>
- <Link to support/SLA policy>

---

## Changelog

| Date | Change | Author |
|---|---|---|
| <YYYY-MM-DD> | Initial handover doc created | <name> |
| <YYYY-MM-DD> | Reflects Week 6/7 changes: <summary> | <name> |

## 9. Оставшиеся действия
Что осталось сделать и блокирует ли это переход
на следующий уровень готовности.

## 10. Связанные документы
Ссылки на подробные инструкции (deploy runbook, API docs, и т.д.)
