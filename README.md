# sunity-web

Frontend for Sunity, a platform for crowdfunding solar panel installations at worship places. It has two parts:

- **Public site**: home page, campaign list (`/campaigns`), campaign detail with energy data (`/campaigns/:id/:tab?`), and a donation form (`/campaigns/:id/transaction`).
- **Admin panel** (`/admin`): Google sign-in, dashboard, campaign management and creation, and energy monitoring with CSV import.

Data comes from the `sunity-api` backend through a client generated from its OpenAPI schema. Agent and contributor rules are in [`AGENTS.md`](./AGENTS.md); [`docs/engineering-guide.md`](./docs/engineering-guide.md) explains the patterns.

## Stack

| Layer         | Library                                                                 |
| ------------- | ----------------------------------------------------------------------- |
| Build         | Vite 6, `@vitejs/plugin-react`                                          |
| UI            | React 19, Tailwind CSS v4 (`@tailwindcss/vite`), Radix UI, `lucide-react` |
| Routing       | React Router 7 (`createBrowserRouter`, lazy routes)                     |
| Data          | TanStack Query 5 + hey-api generated SDK (`@hey-api/openapi-ts`)        |
| Auth          | Better Auth client (Google sign-in via the backend)                     |
| Forms         | `react-hook-form` + Zod                                                 |
| State         | Zustand                                                                 |
| Charts        | Recharts, `react-circular-progressbar`                                  |
| Env           | `@t3-oss/env-core`                                                      |
| Type check    | `tsgo` (`@typescript/native-preview`)                                   |
| Lint / format | Oxlint, Oxfmt                                                           |
| Tests         | Vitest, Testing Library, jsdom                                          |

## Getting started

Requirements: Bun, and a running `sunity-api` backend (default `http://localhost:3000`).

```bash
bun install
cp .env.example .env
bun run dev
```

Vite serves the app on `http://localhost:5173`. The backend must list this origin in `FRONTEND_URLS` for CORS and auth cookies.

### Environment variables

All variables are optional URLs, validated in `src/config/index.ts`, and inlined at build time. Do not put secrets in them.

| Variable             | Purpose                                                       |
| -------------------- | ------------------------------------------------------------- |
| `VITE_API_URL`       | Backend base URL without `/api`. Used by the SDK and codegen. |
| `VITE_APP_URL`       | This app's URL. Used for the post-login redirect.             |
| `VITE_AUTH_BASE_URL` | Better Auth server URL.                                       |

## Scripts

| Command                    | What it does                                                  |
| -------------------------- | ------------------------------------------------------------- |
| `bun run dev`              | Vite dev server                                               |
| `bun run build`            | Production build to `dist/`                                   |
| `bun run preview`          | Serve the production build locally                            |
| `bun run check`            | Type check with `tsgo --noEmit`                               |
| `bun run lint`             | Oxlint                                                        |
| `bun run format`           | Oxfmt (write)                                                 |
| `bun run format:check`     | Oxfmt (check only)                                            |
| `bun run fl`               | Format, then lint                                             |
| `bun run test`             | Vitest, single run                                            |
| `bun run openapi:generate` | Regenerate `src/lib/api/generated/` from `${VITE_API_URL}/openapi.json` |

## Project layout

```
src/
├── main.tsx            # App providers and router
├── routes/             # Route table (index.tsx) and public pages
├── components/         # admin/, campaigns/, home/, layout/, ui/
├── hooks/              # Query, mutation, and form hooks
├── lib/                # api/ (generated SDK + runtime config), auth/, query/, validation/, constants/
├── config/             # Env validation
├── stores/             # Zustand store
├── data/               # Static and mock data
└── types/              # Shared types
scripts/generation-env.ts   # Resolves the OpenAPI URL for codegen
openapi-ts.config.ts        # hey-api config
```

## API client

`openapi-ts.config.ts` reads the backend schema and writes types, an SDK, Zod schemas, and TanStack Query `queryOptions`/`mutationOptions` to `src/lib/api/generated/`. Do not edit that folder by hand. After a backend schema change, run `bun run openapi:generate` with the backend reachable and commit the diff.

At runtime the SDK calls `${VITE_API_URL}/api` with `credentials: "include"` (`src/lib/api/hey-api.ts`), so the Better Auth session cookie is sent on every request.

## Deployment

`bun run build` outputs a static SPA to `dist/`. Set the `VITE_*` variables in the hosting dashboard before building. The repo carries SPA fallback config for two hosts:

- Cloudflare Pages: `public/_redirects` (`/* /index.html 200`)
- Vercel: `vercel.json` (rewrite all paths to `/index.html`)

## CI

`.github/workflows/ci.yml` runs on pushes and pull requests to `main`: lint, format check, and type check in parallel, then build. Tests are not part of CI; run `bun run test` locally. The Husky pre-commit hook runs `bun run format:check` and `bun run check`.
