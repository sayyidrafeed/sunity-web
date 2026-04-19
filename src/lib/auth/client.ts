import { createAuthClient } from 'better-auth/react';
import { queryOptions } from '@tanstack/react-query';
import { env } from '@/config';

export const authClient = createAuthClient({
  baseURL: env.VITE_API_URL,
});

export const sessionQueryOptions = () =>
  queryOptions({
    queryKey: ['auth', 'session'] as const,
    queryFn: async () => (await authClient.getSession()).data ?? null,
    staleTime: 60_000,
    retry: false,
  });
