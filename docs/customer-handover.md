# Customer Handover — <Product / Service Name>

> **Last updated:** <YYYY-MM-DD> · **Owner:** <team/person> · **Reviewed by:** <reviewer name(s)>
>
> This document describes the **current, actual** state of the handover — not planned or future work.
> Update it whenever access, deployment, configuration, limitations, transition scope, or handover
> status change (including during Week 6 and Week 7 work).

---

## 1. Product Status & Handover Scope

- **What this covers:** <which component / service / whole product is in scope for this handover>
- **What is NOT covered:** <explicitly excluded parts, if any>
- **Current state in one paragraph:** <plain description of what exists and works today, as of this update>

---

## 2. Transition Scope (what moved, what stayed)

> Make the concrete transition inspectable — list actual items, not general statements.

| Item | Type | Status | Notes |
|---|---|---|---|
| <repo name> | Repository | Transferred to customer / Delegated / Retained by team | <e.g., customer now has admin access, we keep CI runner ownership> |
| <service name> | Service | Transferred / Delegated / Retained | <...> |
| <deployment / cluster / environment> | Deployment | Transferred / Delegated / Retained | <...> |
| <cloud account, e.g. AWS account X> | Account | Transferred / Delegated / Retained | <...> |
| <admin panel, monitoring dashboard> | Access | Transferred / Delegated / Retained | <...> |
| <domain, DNS, billing> | Ownership | Transferred / Delegated / Retained | <...> |

**Summary:** <one paragraph making explicit what the customer now owns/controls, what your team still owns, and why anything was intentionally retained>

---

## 3. Access & Usage

- **How the customer accesses the product:** <URL(s), environment(s), app/portal name>
- **Accounts / roles:** <how accounts are created, role types, who provisions access>
- **Typical usage flow:** <the main steps a customer follows to use the product day to day>

---

## 4. Installation / Deployment

> Omit or mark "Not applicable" if the product is fully hosted/managed and the customer never deploys it.

- **Deployment method:** <e.g., Docker image, Helm chart, manual steps, CI/CD pipeline>
- **Environments:** <dev / staging / prod — which exist and where they run>
- **Current deployment owner:** <who deploys today — your team, customer, or shared>
- **Setup steps customer must follow:** <summary + link to detailed runbook>
- **Recovery steps customer must follow:** <e.g., rollback, restore from backup — summary + link>
- **Verification steps customer must follow:** <how to confirm a deploy/recovery succeeded — summary + link>

---

## 5. Configuration & Secrets Handling

> Do NOT include actual secret values here — describe the mechanism only.

- **Environment variables / config values customer must know about:**

  | Name | Purpose | Where it's set | Who owns the value |
  |---|---|---|---|
  | `<ENV_VAR_NAME>` | <what it controls> | <e.g., customer's Vault, .env, CI secret> | <customer/team> |

- **External services involved:** <e.g., payment provider, email service, third-party API — what the customer needs to know>
- **Secrets-handling process:** <where secrets live (e.g., Vault, AWS Secrets Manager, customer's own store), who provisions/rotates them, how someone requests access — no actual values>

---

## 6. Operational Notes

- **Monitoring / logging:** <where to find logs, dashboards, alerts>
- **Routine operational tasks:** <backups, scaling, scheduled jobs, maintenance windows>
- **Known operational constraints:** <rate limits, capacity limits, manual steps still required>

---

## 7. Documentation Entry Points

> Main pages the customer should use for normal use, operation, and troubleshooting.

| Purpose | Link |
|---|---|
| Normal day-to-day use | <link> |
| Deployment / operations runbook | <link> |
| Troubleshooting / support | <link> |
| API reference | <link> |
| Architecture overview | <link> |

---

## 8. Troubleshooting & Support

- **Common issues and fixes:** <short list of known problems and how to resolve them>
- **Support channel:** <Slack channel, email, ticketing system>
- **Escalation path:** <who to contact for urgent/Sev1 issues>

---

## 9. Known Limitations, Unfinished Areas & Risks

- <limitation 1 — what's missing/incomplete and its impact>
- <limitation 2>
- <known bugs, workarounds, technical debt>
- <risks the customer should be aware of>

---

## 10. Handover Status

**Current level reached:** `<Ready for independent use | Independently used by customer | Deployed or operated on customer side>`

**Documentation sufficiency assessment:**
<Is the current documentation set sufficient for the reached handover level? Be specific about what is and isn't covered. Example: "Documentation covers installation, configuration, and basic troubleshooting — sufficient for independent day-to-day use. Disaster-recovery procedures are not yet documented; customer should contact support for those scenarios.">

**Support still necessary:**
<Explicitly state what ongoing support your team still provides, even post-handover — e.g., "Sev1 incident response," "initial prod setup assistance," "data migration questions.">

---

## 11. Remaining Actions

> If a stronger handover level has not yet been reached, explain the blocker(s) and what's needed to progress.

| Action | Blocks next level? | Owner | Status |
|---|---|---|---|
| <e.g., document production deploy runbook> | Yes/No | <team/person> | <in progress/planned> |
| <e.g., migrate secrets to customer's Vault> | Yes/No | <team/person> | <in progress/planned> |

**Blocker summary:** <if applicable, plain-language explanation of why the next handover level hasn't been reached yet>

---

## 12. Related Documentation

- <Link to detailed deployment runbook>
- <Link to API reference>
- <Link to architecture overview>
- <Link to support/SLA policy>

---

## Changelog

| Date | Change | Author |
|---|---|---|
| <YYYY-MM-DD> | Initial handover doc created | <name> |
| <YYYY-MM-DD> | Week 6: <summary of changes — access, deployment, feedback> | <name> |
| <YYYY-MM-DD> | Week 7: <summary of changes — access, deployment, feedback> | <name> |
