import { env } from '@/config';

// Called by the generated hey-api SDK to build the base client config.
export const createClientConfig = (config: Record<string, unknown>) => ({
  ...config,
  baseUrl: env.VITE_API_URL ?? 'http://localhost:3000',
  credentials: 'include' as RequestCredentials,
});
