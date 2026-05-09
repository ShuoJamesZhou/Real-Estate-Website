# Changelog

All notable changes to this project will be documented in this file.

## 0.1.0 - 2026-05-09

- Migrate from static `/docs` site to Node server under `server/`.
- Add build pipeline (sanitize + bundle + hashed `dist/` + minify) for QA/prod-like deploys.
- Add local dev launcher `startLocalDev.sh` (port 5106).
- Add `/api/contact` endpoint with optional Postgres/Prisma persistence.

