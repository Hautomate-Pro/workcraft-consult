# Workcraft Consult

Workcraft Consult is a full-stack consultancy and training website built with:

- React, Vite, and TypeScript
- Express and TypeScript
- PostgreSQL through Neon
- Drizzle ORM
- JWT cookie authentication
- Vercel deployment

## Local development

### Prerequisites

- Node.js 20 or newer
- npm
- A PostgreSQL database, such as Neon

### 1. Install dependencies

```powershell
npm install
```

### 2. Configure the environment

Create `.env` in the repository root:

```dotenv
NODE_ENV=development
PORT=4000
CLIENT_ORIGIN=http://localhost:5173
DATABASE_URL=postgresql://...
JWT_SECRET=replace-with-a-random-secret-at-least-32-characters
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=replace-with-a-password-at-least-12-characters
ADMIN_NAME=Administrator
```

Generate a JWT secret with PowerShell:

```powershell
-join ((1..48) | ForEach-Object { [char](Get-Random -Minimum 65 -Maximum 122) })
```

Do not commit `.env`. The repository already ignores it.

### 3. Apply the database migration

Generate and apply migrations if schema changes are made:

```powershell
npm run db:generate -w server
npm run db:push -w server
```

Create or update the initial admin account:

```powershell
npm run db:seed-admin -w server
```

### 4. Start the application

```powershell
npm run dev
```

- Website: <http://localhost:5173>
- API: <http://localhost:4000>

The Vite development server proxies `/api` requests to the Express server.

## Build and type-check

```powershell
npm run build
npm run build:server
npm run typecheck
```

## Deploy to Vercel

1. Push the repository to GitHub, GitLab, or Bitbucket.
2. Import the repository in Vercel.
3. Keep the repository root as the project root.
4. Add the following environment variables in Vercel:

| Variable | Production value |
| --- | --- |
| `NODE_ENV` | `production` |
| `PORT` | Usually leave unset; Vercel manages the port |
| `CLIENT_ORIGIN` | `https://your-domain.com` |
| `DATABASE_URL` | Production Neon PostgreSQL connection string |
| `JWT_SECRET` | A separate random secret with at least 32 characters |
| `ADMIN_EMAIL` | Initial admin email |
| `ADMIN_PASSWORD` | Initial admin password with at least 12 characters |
| `ADMIN_NAME` | Initial admin display name |

Configure the variables for the Production environment. Redeploy after changing them.

The root `vercel.json` routes `/api/*` to the Express service and all other paths to the Vite client. Production database migrations and the admin seed should be run with the production `DATABASE_URL` before or during deployment.

## Custom domain

1. In Vercel, open **Project Settings > Domains**.
2. Add the apex domain, for example `workcraftconsult.com`, and optionally `www.workcraftconsult.com`.
3. Use the exact DNS records shown by Vercel.
4. Configure the apex domain and `www` as redirects according to the preferred canonical hostname.
5. Wait for DNS propagation and certificate issuance.
6. Set `CLIENT_ORIGIN` to the preferred public HTTPS origin and redeploy.
7. Test both the website and API:

```powershell
curl https://your-domain.com
curl https://your-domain.com/api/health
```

Do not guess DNS values or reuse Vercel DNS settings from another project; copy the records generated for this project.

## Database operations

The schema is defined in `server/src/db/schema.ts`. Drizzle migration files are stored in `server/drizzle`.

```powershell
npm run db:generate -w server
npm run db:migrate -w server
npm run db:push -w server
npm run db:studio -w server
npm run db:seed-admin -w server
```

Use `db:migrate` for a controlled migration workflow. Use `db:push` for local schema synchronization.

## Production checklist

- Use a unique JWT secret for production.
- Use a strong admin password and store credentials securely.
- Keep `.env` and database credentials out of source control.
- Configure `CLIENT_ORIGIN` as the exact public HTTPS domain.
- Ensure the domain redirect resolves to one canonical hostname.
- Confirm Neon migrations are applied.
- Verify login, registration, contact submission, and admin pages.
- Enable HTTPS and confirm Vercel SSL status.
