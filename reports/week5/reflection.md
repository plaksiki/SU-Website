# Week 5 Reflection

## 1. Learning Points

### Customer review and feedback:


### Documenting architecture:
- The team formally documented the system architecture for the first time, in `docs/architecture/README.md`. Writing the document forced us to make explicit a number of decisions that had previously only existed implicitly. We learned that architecture documentation is useful less as a formality and more as a way to surface gaps between what the repository contains and what is actually deployed — a gap that had gone unnoticed until we tried to write it down.

### Recording ADRs:
- We created three Architecture Decision Records, one per quality requirement (QR-1, QR-2, QR-3): the CI gate enforcing TypeScript and ESLint, the containerized deployment via Docker Compose, and the frontend bundle-size budget. Requiring every ADR to name the exact quality requirement it addresses made it immediately clear which decisions had been made deliberately and which had simply been unexamined defaults — all three mapped cleanly to a QR, with no leftover "decisions" that didn't actually trace to anything. The mandatory "Consequences and tradeoffs" section was also useful on its own: it forced us to write down risks that had previously only been assumed, such as the fact that deferring Redis means the backend currently has no caching layer.

### Refining the workflow:
- We have now tried to organize all the documentation since the beginning of the week and distribute it to everyone according to their abilities and capabilities, taking into account the presence of unforeseen situations.

### Managing configuration:
- There was a problem connecting the backend and the frontend in small areas, but we managed it. There was also a problem when translating words: on a mobile device, the text went out of bounds or moved out. Now everything is restored and adjusted.

### Sprint increment (MVP v2):
- We have adjusted and put the events and questionnaires pages in working order. We also added a gradient and improved the design of our product. We also added a new feature story of SU union. And we implemented internships and linked them to events. And the most important task, we started developing an admin panel for monitoring questionnaires and events.

## 2. Validated Assumptions

### Architecture and ADRs:
- Each of the three quality requirements (QR-1, QR-2, QR-3) can be traced to exactly one architectural decision — confirmed: the QR ↔ ADR mapping came out 1-to-1, with no gaps and no orphan ADRs.

### CI and configuration:
- [ADD: which assumptions about CI/configuration were confirmed or rejected this week — e.g. was the `-DskipTests` workaround replaced with a real test database in CI, as planned in Week 4?]

### MVP v2 and deployment:
- The website remains deployable on the IU virtual machine — confirmed, the Sprint 3 and MVP v2 increment was successfully demonstrated to the customer on the VM.

### Customer feedback:
- [ADD: which assumptions were revised after the customer demo — similar to Week 4, where the format of the Internship page was adjusted based on feedback?]

## 3. Friction and Gaps

### Unresolved requirements:
- The brand book and content (logos, photos, member descriptions) still have not been provided by the customer — a risk carried over from Week 4.

### Technical risks:
- No technical risks on this week.

### Missing scope:
- No missing scope was identified — all planned tasks for Sprint 3 were completed successfully.

### Blocked work:
- No action required.

### Process friction:
- In some cases, PR approvals were delayed, which slightly slowed down the merging process.

### Uncertainties:
- How far will we get the brandbook and how much time there will be left to implement it in frontend part of the project.

## 4. Planned Response

### Unresolved requirements:

### Technical risks:
- No technical risks on this week.

### Missing scope:
- No missing scope was identified — all planned tasks for Sprint 3 were completed successfully.

### Blocked work:
- No action required.

### Architecture and ADRs:
- Continue treating ADRs as part of the regular workflow — record a new architectural decision before implementing it, rather than after, whenever possible.
- Keep `docs/architecture/README.md` and `docs/quality-requirements.md` in sync as new quality requirements are added or existing ADRs are revised.

### New features:


### UAT:
- [ADD: plan for the next UAT session — exactly what will be demonstrated to the customer]

### Uncertainties:
- The questionnaire data export format and flow will be finalized as part of the xlsx implementation. See: 'Issue [#45](https://github.com/plaksiki/SU-Website/issues/45)'
