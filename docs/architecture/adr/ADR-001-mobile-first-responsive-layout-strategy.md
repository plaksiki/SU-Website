# ADR-001: Mobile-First Responsive Layout Strategy

**Status:** Accepted
 
## Context
 
The customer explicitly requested a "fully responsive design," and student usage patterns confirm
that a significant share of visitors open the portal from a phone rather than a desktop browser.
The frontend (`su-frontend/`, React + TypeScript + Vite) previously had no enforced layout strategy
or minimum-viewport target, which risked pages that render correctly on desktop but break — fixed
widths causing horizontal scroll, unreachable buttons, overlapping text — on small screens.
 
We needed an explicit layout approach and a concrete, testable minimum viewport, rather than
"responsive" as an unverified aspiration.
 
## Decision
 
We adopt a mobile-first CSS strategy across `su-frontend/`: layouts are built for a 375px-wide
viewport (iPhone SE, our defined minimum target) first, then progressively enhanced with media
queries for larger breakpoints (tablet, desktop). Fixed pixel widths are disallowed for layout
containers in favor of relative units (`%`, `rem`, `fr`, `flex`/`grid` sizing).
 
Conformance is verified automatically: an end-to-end test (Playwright/Cypress) loads every page at a
375px viewport and asserts there is no horizontal scroll and that all interactive elements
(buttons, nav links, form fields) are within the visible viewport and clickable. This test runs in
CI and implements QRT-4.
 
## Consequences and Tradeoffs
 
**Benefits:**
- Forces every new page/component to be designed for the smallest supported screen first, rather
  than retrofitting mobile support after the fact.
- Automated viewport testing catches regressions (e.g., a new component with a fixed width)
  before merge, rather than relying on manual device testing.
**Tradeoffs:**
- Mobile-first CSS requires more discipline from contributors unfamiliar with the pattern, and can
  slow down initial component development compared to "desktop-first, fix mobile later."
- A single 375px CI check does not guarantee correctness across all real device sizes; it is a
  floor, not a full device matrix.
## Quality Requirements Addressed
 
- **QR-4: Usability – Mobile Responsiveness** — this ADR is the architectural decision implementing
  QR-4 (mobile-first layout, verified at 375px by QRT-4).
