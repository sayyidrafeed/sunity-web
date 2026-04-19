# Sunity Frontend — Engineering Guide

> For new contributors. Start here, then read the code.

---

## 1. Stack at a glance

| Layer         | Choice                                                      | Why you care                                                                                         |
| ------------- | ----------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| Build         | **Vite 6** via `bun run` scripts                            | `bun run dev`, `bun run build`, `bun run check`, `bun run test`. Never run `vite` or `npx` directly. |
| UI            | **React 18**                                                | Functional components only. No class components.                                                     |
| Routing       | **React Router 7** (data router)                            | Routes defined in `src/routes/index.tsx`. Features add their own route slices and merge them there.  |
| Data          | **TanStack Query 5** + **hey-api** client                   | Backend OpenAPI spec generates a typed client + `queryOptions` helpers in `src/lib/api/generated/`.  |
| Auth          | **Better Auth** via `authClient` (`src/lib/auth/client.ts`) | Session exposed as a shared `queryOptions` helper.                                                   |
| Global state  | **Zustand 5**                                               | For client-only state not derivable from server. Stores live in `src/stores/`.                       |
| Type check    | **tsgo** (`@typescript/native-preview`)                     | Faster than `tsc`. Run via `bun run check`.                                                          |
| Lint / Format | **Oxlint** + **Oxfmt**                                      | `bun run lint`, `bun run format`, or `bun run fl` for both.                                          |
| Tests         | **Vitest** + Testing Library                                | `bun run test`.                                                                                      |
| Deployment    | **Cloudflare Pages** (static SPA)                           | `bun run build` → `dist/`. No server runtime on CF Pages.                                            |

---

## 2. How the app boots

```
main.tsx
  ├─ QueryClientProvider       → singleton QueryClient (defaults in src/lib/query/client.ts)
  ├─ AuthProvider              → wraps Better Auth session state
  └─ RouterProvider            → React Router data router (src/routes/index.tsx)
```

Nothing should block first paint. Any data needed for a page is fetched inside that page's route `loader`, not in `main.tsx`.

---

## 3. Routing

### Structure

Routes are defined in `src/routes/index.tsx` using `createBrowserRouter`. Features define their own route objects and import + merge them in `index.tsx`.

```
src/routes/
  index.tsx       ← root router — merges all feature route slices

src/components/
  <feature>/      ← each feature owns its components, and exports its route slice
```

### React Router 7 data pattern

React Router 7 supports `loader` and `action` on route objects. Use them for data that must be ready before paint:

```tsx
// src/routes/index.tsx
import { listGroupsOptions } from '@/lib/api';

{
  path: '/mentor/kelompok',
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(listGroupsOptions()),
  element: <KelompokPage />,
  errorElement: <ErrorState />,
}
```

```tsx
// KelompokPage.tsx
import { useLoaderData } from 'react-router';

export function KelompokPage() {
  const data = useLoaderData();
  return <MenteeList items={data.mentees} />;
}
```

### Loader vs. component: where does data go?

- **Needed before paint →** `loader` on the route. Declare `errorElement` for error UI.
- **Incremental (after user action) →** `useQuery` / `useMutation` inside the component.

### Cloudflare Pages SPA routing

CF Pages serves only static files. `public/_redirects` must contain:

```
/* /index.html 200
```

This ensures all paths fall through to `index.html` so React Router handles them client-side.

---

## 4. Data layer

Everything in `src/lib/api/generated/` is produced by **hey-api** from the backend OpenAPI spec:

- `sdk.gen.ts` — typed fetch functions
- `@tanstack/react-query.gen.ts` — `queryOptions` and `mutationOptions` helpers

**You do not write query keys or `queryFn` by hand.** Call the generated `*Options()` and feed it to TanStack Query:

```ts
import { useSuspenseQuery } from '@tanstack/react-query';
import { listAnnouncementsOptions } from '@/lib/api/generated';

const { data } = useSuspenseQuery(listAnnouncementsOptions({ query: { groupId } }));
```

### Regenerating the client

After any backend schema change:

```sh
bun run openapi:generate
```

Commit the diff in `src/lib/api/generated/`.

### QueryClient defaults (`src/lib/query/client.ts`)

```ts
new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5min — avoid refetch storms on nav
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});
```

Override per-query only when you have a specific reason.

### Shared non-generated queries

Things not in the OpenAPI spec (e.g. Better Auth session) get wrapped once as a `queryOptions` helper:

```ts
// src/lib/auth/client.ts
export const sessionQueryOptions = () =>
  queryOptions({
    queryKey: ['auth', 'session'] as const,
    queryFn: async () => (await authClient.getSession()).data ?? null,
    staleTime: 60_000,
    retry: false,
  });
```

Consumers: `useQuery(sessionQueryOptions())`.

**Never copy-paste a `queryKey` literal.** If two files need the same key, extract a shared helper.

### API client config (`src/lib/api/hey-api.ts`)

Configure the shared hey-api client here:

- `baseURL` from `env.VITE_API_URL`
- `credentials: 'include'` for Better Auth cookie-based sessions

---

## 5. Auth

Better Auth client is initialized in `src/lib/auth/client.ts`:

```ts
export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_API_URL,
});
```

- The auth server is the backend — this frontend only calls it via the client.
- Expose the session via `sessionQueryOptions()` (see above) so any component can subscribe without re-fetching.
- `AuthProvider` in `src/lib/auth/provider.tsx` wraps the app and can preload the session on boot.

---

## 6. Components

```
src/components/
  ui/         ← primitive/dumb components. No business logic.
  layout/     ← app-wide chrome (header, sidebar, shell)
  fragments/  ← shared composition pieces
  <feature>/  ← feature-scoped components, one folder per feature
```

### Conventions

- **Files:** `kebab-case.tsx`. Component export: `PascalCase`.
- **Named exports only.** No `export default` for components.
- **Co-locate by feature.** Route files stay thin — they compose feature components.
- **Barrel files (`index.ts`)** are fine inside a single feature folder. Never barrel across feature boundaries.

### Extending primitives

Wrap base components to add domain behavior. Don't edit base components to accommodate a single use case.

---

## 7. Adding a new page — worked example

Goal: `/mentor/kelompok` listing mentees.

1. **Regenerate the client** after the backend exposes the endpoint:

   ```sh
   bun run openapi:generate
   ```

   Now `listGroupsOptions()` exists in `src/lib/api/generated`.

2. **Create the feature components** at `src/components/mentor/kelompok/`:

   ```tsx
   // src/components/mentor/kelompok/kelompok-page.tsx
   import { useLoaderData } from 'react-router';
   import { MenteeList } from './mentee-list';

   export function KelompokPage() {
     const data = useLoaderData();
     return <MenteeList items={data.mentees} />;
   }
   ```

3. **Add the route** in `src/routes/index.tsx`:

   ```ts
   import { listGroupsOptions } from '@/lib/api/generated';
   import { KelompokPage } from '@/components/mentor/kelompok';

   {
     path: '/mentor/kelompok',
     loader: () => queryClient.ensureQueryData(listGroupsOptions()),
     element: <KelompokPage />,
     errorElement: <ErrorState />,
   }
   ```

4. **Before committing:**

   ```sh
   bun run check
   bun run fl
   bun run test
   ```

---

## 8. SOLID / KISS / DRY in practice

| Principle                 | What it looks like here                                                                                                                   |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **Single Responsibility** | Route composes. Component renders. Generated SDK fetches. Store holds form state. One job per file.                                       |
| **Open/Closed**           | Extend base UI components via wrappers, not by editing them.                                                                              |
| **Liskov**                | Don't narrow types post-hoc. If a prop is `ReactNode`, don't assume string.                                                               |
| **Interface Segregation** | Prefer small focused prop types. Split when a prop list grows past ~8 fields.                                                             |
| **Dependency Inversion**  | Import from `@/components/…` and `@/lib/…`. Never from `generated/` directly — always through a re-export.                                |
| **KISS**                  | `useSuspenseQuery` + route `errorElement` replaces hand-rolled `isLoading` state. Don't build a state machine when the framework has one. |
| **DRY**                   | Session query, query defaults, API client config — one file each. If you're writing a second copy, extract a helper.                      |

---

## 9. DO / DON'T quick reference

|                | DO                                                                                | DON'T                                                |
| -------------- | --------------------------------------------------------------------------------- | ---------------------------------------------------- |
| New route      | Add to `src/routes/index.tsx` with a `loader` using `queryClient.ensureQueryData` | Fetch inside `useEffect`                             |
| Data fetch     | `useSuspenseQuery(getXxxOptions(...))` from generated                             | Hand-write `queryKey` + `queryFn`                    |
| Loading UI     | `pendingElement` / skeleton component on the route                                | `const [loading, setLoading] = useState(true)`       |
| Error UI       | `errorElement` on the route                                                       | `try { … } catch { setError(...) }` in the component |
| Query defaults | Tune once in `src/lib/query/client.ts`                                            | Pass `staleTime` on every `useQuery` call            |
| Shared query   | Export a `queryOptions()` helper next to the resource                             | Inline the same `queryKey` literal in multiple files |
| Global state   | Query cache, URL params, or a Zustand store                                       | React Context for anything that could be a query     |
| Package ops    | `bun add / bun remove`                                                            | `npm install`, `npx`, `pnpm add`                     |
| Type check     | `bun run check` (`tsgo`)                                                          | `tsc` directly                                       |
| Commit gate    | `bun run check` + `bun run fl` + `bun run test` must all pass                     | `--no-verify`                                        |

---

## 10. Deployment — Cloudflare Pages

- **Build command:** `bun run build`
- **Output directory:** `dist`
- **Environment variables:** Set in the CF Pages dashboard. Use `VITE_` prefix for any variable the frontend needs — they are injected at build time.
- **SPA routing:** `public/_redirects` must contain `/* /index.html 200`. Do not remove this file.
- **No server runtime:** CF Pages serves only static files. Any server logic (auth, DB, business logic) lives in the backend.

---

## 11. Things intentionally not covered here

- **Backend/API design** — see the backend repo.
- **CI/CD pipeline** — CF Pages auto-deploys from the main branch.
- **i18n** — strings are hardcoded today. When a second locale is needed, add a proper i18n library with feature-scoped keys; don't sprinkle `if (locale === ...)`.

---

_Update this file whenever a new convention is adopted._
