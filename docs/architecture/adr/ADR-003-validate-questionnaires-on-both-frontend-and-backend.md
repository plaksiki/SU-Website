# ADR-003: Validate Questionnaires on Both Frontend and Backend

**Status:** Accepted

## Context

The customer said questionnaires are the most important feature. If a submission silently fails or
saves broken data, that's a big problem — a student thinks they answered, but nothing was recorded.
We have three question types (single-choice, multiple-choice, text) and all of them need to actually
work.

## Decision

We validate required fields in two places:
1. **Frontend** — before sending the request, check every required question is filled in correctly
   per type. If not, show an error and don't send anything.
2. **Backend** — check the same rules again on the server, independent of what the frontend already
   did. Never trust the frontend alone.

On success, the backend confirms and the frontend shows that confirmation. Vitest tests (QRT-6)
cover all three question types: valid submit works, invalid submit gets rejected, and the request
sent has the right shape.

## Consequences

- Good: even if someone calls the API directly or the frontend check gets skipped somehow, bad data
  still can't get saved.
- Bad: the same validation rules exist in two places, so if a rule changes, we have to remember to
  update both.

## Addresses

QR-6: Functional Suitability – Questionnaire Submission
