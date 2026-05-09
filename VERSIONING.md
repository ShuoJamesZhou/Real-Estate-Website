# Versioning and releases

This repo mirrors the `assessmentsHub` release system: **Semantic Versioning** ([semver](https://semver.org/)), a **CHANGELOG** ([Keep a Changelog](https://keepachangelog.com/)), and **Conventional Commits** ([conventionalcommits.org](https://www.conventionalcommits.org/)).

## Commit messages (Conventional Commits)

Use a short type and optional scope:

| Type       | Use for |
|------------|--------|
| `feat`     | New feature. Bump MINOR. |
| `fix`      | Bug fix. Bump PATCH. |
| `docs`     | Documentation only. |
| `chore`    | Build/tooling/config/refactors with no behaviour change. |
| `refactor` | Code change that is not a feature or fix. |
| `style`    | Formatting/whitespace only. |
| `test`     | Tests. |
| `perf`     | Performance improvement. |

**Format:** `type(scope): short description`

## Version format

- **MAJOR**: Breaking changes.
- **MINOR**: New features, backwards compatible.
- **PATCH**: Bug fixes and small improvements.

## Source of truth

- **Repo root**: `VERSION` (single line).
- **Server**: `server/package.json` → `"version"` (keep in sync).

## Workflow: dev → git → release

1. **Update `CHANGELOG.md` before releasing**
   - Move items from `[Unreleased]` into a new version section: `## [X.Y.Z] - YYYY-MM-DD`.
   - Use headings: `### Added`, `### Changed`, `### Fixed`, `### Removed`, `### Security`.
   - Add/maintain link refs at the bottom (compare links or tag links).

2. **Bump version**
   - Update `VERSION`
   - Update `server/package.json` `"version"`

3. **Commit + tag (recommended)**
   - Commit message examples: `Release v0.1.1` or `chore(release): 0.1.1`
   - Tag:
     - `git tag -a vX.Y.Z -m "Release vX.Y.Z"`

4. **Push**
   - `git push origin main`
   - `git push origin vX.Y.Z`


## How to cut a release

1. Decide the next version (e.g. `0.1.1`).
2. Update `VERSION`.
3. Add a new section at the top of `CHANGELOG.md` for that version with the date and bullet points.
4. Commit with a message like:
   - `release: 0.1.1`
5. Push to `main`.

