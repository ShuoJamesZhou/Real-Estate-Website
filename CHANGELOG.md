# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project uses [Semantic Versioning](https://semver.org/spec/v2.0.0.html) (MAJOR.MINOR.PATCH).

---

## [Unreleased]

---

## [0.1.0] - 2026-05-09

### Added

- **Node server:** Serve the website from `server/` (Express) with local dev + QA/prod-like modes.
- **Build pipeline:** `sanitize` + bundle + hashed `dist/` + minify for production-like deploys.
- **Contact API:** `POST /api/contact` with optional Postgres/Prisma persistence.
- **Versioning files:** `VERSION`, `CHANGELOG.md`, `VERSIONING.md`.

### Changed

- **Site structure:** Move away from config-driven `site-content.js` rendering to static HTML as the source of truth (`server/src/public-src/`).

[0.1.0]: https://github.com/ShuoJamesZhou/Real-Estate-Website/releases/tag/v0.1.0

