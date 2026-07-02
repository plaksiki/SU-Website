# ADR-005: One Translations Object for EN/RU

**Status:** Accepted

## Context

Customer wants at least English, ideally with a Russian toggle too. If only half the site gets
translated it looks broken, not "not translated yet." We needed a setup where it's hard to
accidentally add English text without also adding the Russian version.

## Decision

All text on the site lives in one TypeScript object, with an `en` and `ru` version of every key
(e.g. `t.events.title`). Components always pull text from this object, never hardcode a string.
Because both language versions must have the same keys, TypeScript itself complains if you add a
key to one language and forget the other. A unit test (QRT-5) also checks that every key exists in
both languages.

## Consequences

- Good: missing translations get caught at compile time or by the test, not by a student browsing
  in Russian.
- Bad: one big object can get messy as the site grows — might need splitting by page/feature later.

## Addresses

QR-5: Usability – Language Switching
  QR-5 (complete EN/RU translations enforced by type-checking and verified by QRT-5).
