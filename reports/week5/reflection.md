# Week 5 Reflection

## 1. Learning Points

### Customer review and feedback:
The team conducted a customer verification session, during which some of the information about the administrative panel, history, and ready-made questionnaires and events were reviewed. The reviews were collected and documented. See: [meeting summary](https://github.com/plaksiki/SU-Website/blob/main/reports/week5/sprint-review-summary.md), [transcript](https://github.com/plaksiki/SU-Website/blob/main/reports/week5/sprint-review-transcript.md).

### Documenting architecture:
- We wrote up the 3 architecture of 3 QRs to turn into ADRs:
mobile responsiveness (ADR-001), language switching (ADR-002), questionnaire submission (ADR-003).
Writing them forced us to actually decide stuff we'd left vague — like a real breakpoint for mobile,
one shared object for translations, and checking questionnaires on the backend too, not just
frontend.

### Recording ADRs:
- Linking each ADR to its exact QR made it obvious these were real, thought-through decisions and not just "however we happened to build it." Writing the consequences/tradeoffs part also made us admit stuff we hadn't said out loud — like one big translations file getting messy as the site grows, or that we now have the same validation logic in two places (frontend and backend) that we have to keep in sync.

### Refining the workflow:
- We have now tried to organize all the documentation since the beginning of the week and distribute it to everyone according to their abilities and capabilities, taking into account the presence of unforeseen situations.

### Managing configuration:
- There was a problem connecting the backend and the frontend in small areas, but we managed it. There was also a problem when translating words: on a mobile device, the text went out of bounds or moved out. Now everything is restored and adjusted.

### Sprint increment (MVP v2):
- We have adjusted and put the events and questionnaires pages in working order. We also added a gradient and improved the design of our product. We also added a new feature story of SU union. And we implemented internships and linked them to events. And the most important task, we started developing an admin panel for monitoring questionnaires and events.

## 2. Validated Assumptions

### Architecture and ADRs:
- Each of the three quality requirements (QR-4, QR-5, QR-6) can be traced to exactly one architectural decision — confirmed: the QR ↔ ADR mapping came out 1-to-1, with no gaps and no orphan ADRs.

### MVP v2 and deployment:
- The website remains deployable on the IU virtual machine — confirmed, the Sprint 3 and MVP v2 increment was successfully demonstrated to the customer on the VM.

### Customer feedback:
- The overall UI design direction was confirmed by the customer as visually appealing and on the right track.
- The admin panel should include the creation of questionnaires and events online in both English and Russian, and be user-friendly.

## 3. Friction and Gaps

### Unresolved requirements:
- No unresolved requirements.

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
- No unresolved requirements.

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
- Dark theme for website

### UAT:
- A new UAT session with a SU representative is planned for Sprint 4, where a fully ready-made admin panel with all the functions of creating questionnaires and events in a convenient form of filling out and creating will be demonstrated and tested.

### Uncertainties:
- The questionnaire data export format and flow will be finalized as part of the xlsx implementation. See: 'Issue [#45](https://github.com/plaksiki/SU-Website/issues/45)'
