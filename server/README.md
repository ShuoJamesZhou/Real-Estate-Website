# appRealEstate (QA)

This repo serves the site from `server/`.

## Ports

- **Production**: `3006`
- **QA** (this project): `5006`
- **Local dev**: `5106`

## Local dev

From the parent folder:

```bash
/home/james/appRealEstate/startLocalDev.sh
```

Or directly:

```bash
cd server
npm run dev
```

## Build (QA/prod-like)

```bash
cd server
npm run build
NODE_ENV=production APP_ENV=qa PORT=5006 npm start
```

## Database

Set `DATABASE_URL` (Postgres). QA DB name should be `qa_appRealEstate`.

## GitHub SSH (professional account)

This repo is configured to use the `github-prof` SSH host alias.
If pushes fail, add `~/.ssh/id_ed25519_prof.pub` to your professional GitHub account SSH keys.

