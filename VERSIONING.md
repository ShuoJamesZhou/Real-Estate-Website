# Versioning

This repo uses a simple file-based version like `assessmentsHub`.

## Source of truth

- `VERSION` at the repo root.
- `CHANGELOG.md` entry for each release.

## How to cut a release

1. Decide the next version (e.g. `0.1.1`).
2. Update `VERSION`.
3. Add a new section at the top of `CHANGELOG.md` for that version with the date and bullet points.
4. Commit with a message like:
   - `release: 0.1.1`
5. Push to `main`.

