# Sunity Frontend — Agent Guide

This is a React + Vite single-page app using Bun as the package manager. It builds to a **static `dist/` folder** with no server runtime. The repo has hosting config for both Cloudflare Pages (`public/_redirects`) and Vercel (`vercel.json`). See `README.md` for setup; `docs/engineering-guide.md` covers patterns in more depth.

---

## Skills & Best Practices (Read Before Implementing)

This project ships with skill files for its core libraries. **Before implementing any feature, check the relevant skill and follow it.** The same skills are mirrored in `.agents/skills/`, `.agent/skills/`, and `.claude/skills/`.

| What you're working on                   | Skill to invoke                 |
| ---------------------------------------- | ------------------------------- |
| React components, rendering, performance | `react-vite-best-practices`     |
| Routing, loaders, lazy routes            | `react-router-v7`               |
| Data fetching, query keys, mutations     | `tanstack-query-best-practices` |
| Auth client and session handling         | `better-auth-best-practices`    |
| UI/UX design decisions                   | `ui-ux-pro-max`                 |
| General React best practices             | `vercel-react-best-practices`   |
| Reviewing React code for issues          | `react-doctor`                  |

**If a skill doesn't exist for the library you're using** (e.g. Zod, hey-api, Recharts), use **context7 MCP** to pull the latest official documentation before writing code.

All implementation must be compliant with the relevant skill rules. Do not deviate without a documented reason.

---

## Deployment Constraint: Static SPA

The production build is a **fully static SPA**. This has hard consequences:

- `vite build` must produce a static `dist/` folder. No server rendering, no Node.js APIs at runtime.
- All environment variables must be prefixed `VITE_` — they are baked in at build time. **Never put secrets in `VITE_` vars.**
- SPA fallback routing is configured twice: `public/_redirects` (`/* /index.html 200`, Cloudflare Pages) and `vercel.json` (rewrite `/(.*)` to `/index.html`, Vercel). Do not remove either.
- Any dynamic server logic (auth callbacks, API) lives in the **backend** (`sunity-api`) — not here.
- Build command: `bun run build`. Output dir: `dist`.

---

## Workflow Commands

Use `bun run <script>` for all operations. Never use `npx`, `pnpm`, or `npm` directly.

### Develop

- `bun run dev` — start the Vite dev server (Vite default port `5173`; the backend's `FRONTEND_URLS` allows `http://localhost:5173`)
- `bun run check` — TypeScript type check via `tsgo --noEmit`
- `bun run lint` — lint with Oxlint
- `bun run format` — format with Oxfmt
- `bun run format:check` — check formatting without writing
- `bun run fl` — format + lint combined (use before committing)
- `bun run test` — run the Vitest suite once (`vitest run`)

### Build & Preview

- `bun run build` — production build → `dist/`
- `bun run preview` — preview production build locally

### API Code Generation

- `bun run openapi:generate` — regenerate the typed API client from the backend's OpenAPI schema, then format `src/lib/api`

### CI and hooks

- CI (`.github/workflows/ci.yml`) runs `lint`, `format:check`, and `check` in parallel, then `build`. It does **not** run tests, so run `bun run test` yourself.
- The pre-commit hook (`.husky/pre-commit`) runs `bun run format:check` and `bun run check`.

## Package Management

Use `bun` for all package operations:

- `bun add <pkg>` — add a runtime dependency
- `bun add -d <pkg>` — add a dev dependency
- `bun remove <pkg>` — remove a dependency

---

## Project Structure

```
src/
├── main.tsx                 # QueryClientProvider → AuthProvider → RouterProvider
├── routes/
│   ├── index.tsx            # createBrowserRouter: public routes + /admin (lazy) routes
│   └── *.tsx                # Public pages: home, campaigns, campaign-detail, campaign-transaction
├── components/
│   ├── admin/               # Admin feature folders: campaigns, dashboard, layout, login, monitoring
│   ├── campaigns/           # Public campaign UI (donation-form/, energy/)
│   ├── home/                # Landing page sections
│   ├── layout/              # Navbar, footer, root layout
│   └── ui/                  # shadcn-style primitives (Radix + Tailwind)
├── hooks/                   # Query/mutation and form hooks
├── lib/
│   ├── api/generated/       # hey-api output — never edit
│   ├── api/hey-api.ts       # Runtime client config (base URL, credentials)
│   ├── auth/                # Better Auth client + provider
│   ├── query/client.ts      # QueryClient defaults
│   ├── validation/          # Form validation (+ campaign.test.ts)
│   └── constants/           # UI copy constants
├── config/index.ts          # Env validation (@t3-oss/env-core)
├── stores/index.ts          # Zustand store (UI state such as sidebar)
├── data/                    # Static and mock data
└── types/                   # Shared TypeScript types
```

- Admin pages are lazy routes under `/admin`. `AdminLayout` (`src/components/admin/layout/admin-layout.tsx`) redirects to `/admin/login` when there is no session.
- `src/data/mock-campaigns.ts` is still used by `campaign-transaction.tsx` (campaign data) and `campaign-detail.tsx` (donor list), because the donations API is not served by the backend yet. Replace these with generated queries once it is.
- Hook file names are mixed today (`use-debounce.ts`, `useCampaignForm.ts`). Follow the style of neighbouring files.

---

## Hey API (OpenAPI Code Generation)

The API client is generated from the backend's OpenAPI schema using `@hey-api/openapi-ts`, configured in `openapi-ts.config.ts`.

**Generated output:** `src/lib/api/generated/`

The generator produces:

- TypeScript types (`@hey-api/typescript`)
- Fetch-based SDK client (`@hey-api/sdk` + `@hey-api/client-fetch`)
- Zod validation schemas (`zod` plugin)
- TanStack Query `queryOptions` and `mutationOptions` (`@tanstack/react-query` plugin)

The input URL comes from `scripts/generation-env.ts`: `${VITE_API_URL}/openapi.json`, falling back to `http://localhost:3000` when `VITE_API_URL` is unset. At runtime, `src/lib/api/hey-api.ts` (wired through `runtimeConfigPath`) sets the client base URL to `${VITE_API_URL}/api` and `credentials: "include"`.

**To regenerate:**

1. Ensure the backend is running (or set `VITE_API_URL` in `.env`)
2. Run `bun run openapi:generate`
3. Commit the diff in `src/lib/api/generated/`

**Never manually edit files inside `src/lib/api/generated/`** — they are fully overwritten on each generation. The folder is excluded from `tsconfig.json` and Oxlint.

Use the generated `*Options()` helpers with TanStack Query — do not hand-write `queryKey` or `queryFn` for API calls.

---

## Better Auth

- Client: `src/lib/auth/client.ts` — `authClient` initialized with `VITE_AUTH_BASE_URL`
- Session: `sessionQueryOptions()` in the same file (query key `['auth', 'session']`). Read the session through it instead of calling `authClient.getSession()` in components.
- Provider: `src/lib/auth/provider.tsx` — prefetches the session query; wraps the app tree in `main.tsx`
- Sign-in is Google only. The login page passes a `callbackURL` built from `VITE_APP_URL` (`/admin/dashboard`).

---

## TanStack Query

- Query client config: `src/lib/query/client.ts` — defaults: `staleTime: 5min`, `gcTime: 10min`, `retry: 1`, `refetchOnWindowFocus: false`
- Use generated `queryOptions` / `mutationOptions` from `src/lib/api/generated/@tanstack/react-query.gen.ts`
- Follow `tanstack-query-best-practices` skill for query key structure, cache invalidation, and mutation patterns

---

## Environment Variables

Validated via `@t3-oss/env-core` + Zod in `src/config/index.ts`. All three are optional URLs; empty strings count as unset.

| Variable             | Purpose                                                             |
| -------------------- | ------------------------------------------------------------------- |
| `VITE_API_URL`       | Backend base URL without `/api` (SDK client and OpenAPI generation) |
| `VITE_APP_URL`       | Frontend URL, used for the post-login `callbackURL`                 |
| `VITE_AUTH_BASE_URL` | Better Auth server URL for `authClient`                             |

Copy `.env.example` to `.env` before starting.

---

## Common Pitfalls

- **Do not edit generated files.** `src/lib/api/generated/` is fully overwritten by `bun run openapi:generate`.
- **Use `tsgo`, not `tsc`.** This project uses TypeScript Native Preview. Run `bun run check`.
- **Do not use npx/pnpm/npm.** Use `bun` for all package operations.
- **API regeneration requires a running backend** — `openapi:generate` fetches the schema from `VITE_API_URL` (default `http://localhost:3000`).
- **No runtime server code.** The host serves only static files. Any server logic belongs in the backend.
- **Import from `@/`** for src-relative paths (alias in `tsconfig.json` and `vite.config.ts`).
- **Oxlint rules:** `no-explicit-any` and `no-unused-vars` are errors; `no-console` and `max-lines` (200) are warnings.
- **Check the relevant skill before implementing.** Non-compliant code will be flagged in review.

---

## Review Checklist for Agents

- [ ] Checked the relevant skill(s) for the libraries touched — implementation is compliant
- [ ] Run `bun install` after pulling changes
- [ ] Run `bun run check` — TypeScript is clean
- [ ] Run `bun run fl` — format + lint pass
- [ ] Run `bun run test` — tests pass (CI does not run them)
- [ ] If backend schema changed, ran `bun run openapi:generate` and committed the diff
- [ ] No runtime server code introduced (static hosting)
- [ ] No secrets added to `VITE_` environment variables
