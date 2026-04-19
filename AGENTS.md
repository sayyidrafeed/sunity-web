# Sunity Frontend — Agent Guide

This is a React + Vite frontend using Bun as the package manager, deployed as a **static site on Cloudflare Pages**.

---

## Skills & Best Practices (Read Before Implementing)

This project ships with skill files for its core libraries. **Before implementing any feature, check the relevant skill and follow it.** Skills live in `.agents/skills/`, `.agent/skills/`, and `.claude/skills/`.

| What you're working on                   | Skill to invoke                 |
| ---------------------------------------- | ------------------------------- |
| React components, rendering, performance | `react-vite-best-practices`     |
| Data fetching, query keys, mutations     | `tanstack-query-best-practices` |
| UI/UX design decisions                   | `ui-ux-pro-max`                 |
| General React best practices             | `vercel-react-best-practices`   |
| Reviewing React code for issues          | `react-doctor`                  |
| Writing any feature or bugfix            | `test-driven-development`       |

**If a skill doesn't exist for the library you're using** (e.g. React Router, Better Auth, Zod, hey-api), use **context7 MCP** (`mcp__context7__resolve-library-id` + `mcp__context7__get-library-docs`) to pull the latest official documentation before writing code.

All implementation must be compliant with the relevant skill rules. Do not deviate without a documented reason.

---

## Deployment Constraint: Cloudflare Pages (Static)

This app is deployed as a **fully static SPA on Cloudflare Pages**. This has hard consequences:

- `vite build` must produce a static `dist/` folder. No server rendering, no Node.js APIs at runtime.
- All environment variables must be prefixed `VITE_` — they are baked in at build time. **Never put secrets in `VITE_` vars.**
- The SPA needs `public/_redirects` with `/* /index.html 200` for React Router to work on CF Pages. Do not remove it.
- Any dynamic server logic (auth callbacks, API) lives in the **backend** — not here.
- CF Pages build command: `bun run build`. Output dir: `dist`.

---

## Workflow Commands

Use `bun run <script>` for all operations. Never use `npx`, `pnpm`, or `npm` directly.

### Develop

- `bun run dev` — start Vite dev server on port 3000
- `bun run check` — TypeScript type check via `tsgo --noEmit`
- `bun run lint` — lint with Oxlint
- `bun run format` — format with Oxfmt
- `bun run fl` — format + lint combined (use before committing)
- `bun run test` — run Vitest test suite

### Build & Preview

- `bun run build` — production build → `dist/`
- `bun run preview` — preview production build locally

### API Code Generation

- `bun run openapi:generate` — regenerate the typed API client from the backend's OpenAPI schema

## Package Management

Use `bun` for all package operations:

- `bun add <pkg>` — add a runtime dependency
- `bun add -d <pkg>` — add a dev dependency
- `bun remove <pkg>` — remove a dependency

---

## Hey API (OpenAPI Code Generation)

The API client is generated from the backend's OpenAPI schema using `@hey-api/openapi-ts`.

**Generated output:** `src/lib/api/generated/`

The generator produces:

- TypeScript types (`@hey-api/typescript`)
- Fetch-based SDK client (`@hey-api/sdk` + `@hey-api/client-fetch`)
- Zod validation schemas (`zod` plugin)
- TanStack Query `queryOptions` and `mutationOptions` (`@tanstack/react-query` plugin)

**To regenerate:**

1. Ensure the backend is running (or set `VITE_API_URL` in `.env`)
2. Run `bun run openapi:generate`
3. Commit the diff in `src/lib/api/generated/`

**Never manually edit files inside `src/lib/api/generated/`** — they are fully overwritten on each generation.

Use the generated `*Options()` helpers with TanStack Query — do not hand-write `queryKey` or `queryFn` for API calls.

---

## Better Auth

- Client: `src/lib/auth/client.ts` — `authClient` initialized with `VITE_API_URL`
- Provider: `src/lib/auth/provider.tsx` — wraps the app tree
- Session data should be exposed as a `queryOptions` helper (see engineering guide for the pattern)

---

## TanStack Query

- Query client config: `src/lib/query/client.ts` — defaults: `staleTime: 5min`, `retry: 1`, `refetchOnWindowFocus: false`
- Use generated `queryOptions` / `mutationOptions` from `src/lib/api/generated/@tanstack/react-query.gen.ts`
- Follow `tanstack-query-best-practices` skill for query key structure, cache invalidation, and mutation patterns

---

## Environment Variables

Validated at startup via `@t3-oss/env-core` + Zod in `src/config/index.ts`:

| Variable             | Purpose              |
| -------------------- | -------------------- |
| `VITE_API_URL`       | Backend API base URL |
| `VITE_APP_URL`       | Frontend URL         |
| `VITE_AUTH_BASE_URL` | Auth server URL      |

Copy `.env.example` to `.env` before starting.

---

## Common Pitfalls

- **Do not edit generated files.** `src/lib/api/generated/` is fully overwritten by `bun run openapi:generate`.
- **Use `tsgo`, not `tsc`.** This project uses TypeScript Native Preview. Run `bun run check`.
- **Do not use npx/pnpm/npm.** Use `bun` for all package operations.
- **API regeneration requires a running backend** — `openapi:generate` fetches the schema from `VITE_API_URL`.
- **No runtime server code.** Cloudflare Pages serves only static files. Any server logic belongs in the backend.
- **Import from `@/`** for src-relative paths (alias in `tsconfig.json` and `vite.config.ts`).
- **Check the relevant skill before implementing.** Non-compliant code will be flagged in review.

---

## Review Checklist for Agents

- [ ] Checked the relevant skill(s) for the libraries touched — implementation is compliant
- [ ] Run `bun install` after pulling changes
- [ ] Run `bun run check` — TypeScript is clean
- [ ] Run `bun run fl` — format + lint pass
- [ ] Run `bun run test` — tests pass
- [ ] If backend schema changed, ran `bun run openapi:generate` and committed the diff
- [ ] No runtime server code introduced (CF Pages is static)
- [ ] No secrets added to `VITE_` environment variables
