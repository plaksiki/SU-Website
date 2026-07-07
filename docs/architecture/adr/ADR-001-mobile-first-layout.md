# ADR-001: Mobile-First Layout

**Status:** Accepted

## Context

The customer asked for a "fully responsive design," and honestly most students probably open the
site on their phone first. We didn't have any real rule for this before, so pages could easily end
up broken on small screens (buttons cut off, text overflowing, horizontal scroll).

## Decision

We build layouts mobile-first: design for a 375px screen (iPhone SE) first, then add media queries
for bigger screens. No fixed-width containers — use `%`, `rem`, flex/grid instead.

We check this automatically: a Playwright/Cypress test opens every page at 375px and checks there's
no horizontal scroll and every button/link is actually clickable. This is QRT-4.

## Consequences

- Good: catches broken mobile layouts before merge, not after a student complains.
- Bad: mobile-first takes a bit more discipline to get used to, and 375px is just one screen size,
  not a guarantee everything looks perfect on every device.

## Addresses

QR-4: Usability – Mobile Responsiveness
