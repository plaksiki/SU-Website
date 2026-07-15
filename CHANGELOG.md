# Changelog

All notable changes to this project will be documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
## Added
- Tab navigation in admin panel: Create Event / Events / Create Questionnaire / Questionnaires
- Admin username displayed in topbar
- Data persistence via localStorage — survives page refresh

## Changed
- Optimistic UI updates — events and questionnaires appear instantly without waiting for server
- Server requests run in background after UI is already updated
- Events and polls pages load instantly from cache

## Fixed
- Auto-redirect to list view after creating an event or questionnaire
- Questionnaire form fields now always clear after submission
- Events not appearing on Events page after creation
- Infinite loading on Polls page when server is unavailable
- Admin panel showing empty username after login via localStorage
- Year field in date inputs limited to 4 digits

---

## [2.1.0] - 2026-07-12

### Added

### Changed

- SU Brandbook is implemented

### Fixed

- Polls and Events created from admin panel appear on the Website pages

---

## [2.0.0] - 2026-07-05

### Added

- "Polls" page
- Questionnaires with single/multiple choice questions and individual answer questions
- Creating questionnaires with single/multiple choice questions and individual answer questions
- Creating events with a title, date, description, and venue.
- SU "History" page
- Admin Panel
- csv export from admin panel

### Changed

- Events and departments cards now can be opened (detailed info presents)

### Fixed

- Translation does not slide the text

---

## [1.0.0] - 2026-06-21

### Added

- Department members display
- Donations page
- Event page with filters
- Localization support (two languages)
- Production Docker setup with auto-update script,
Docker Compose configuration for production deployment
- Deployment to Virtual Machine

### Changed

- Migrated codebase from HTML/CSS to React

### Fixed

- Incorrect arrow rendering
- Automatic transition of events to past

---

## [0.1.0] - MVP v0 - 2026-06-14

### Added

- Initial repository structure
- Basic HTML/CSS prototype
- Static pages for testing
