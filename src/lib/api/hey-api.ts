import type { CreateClientConfig } from './generated/client.gen';

import { env } from '@/config';

export const createClientConfig: CreateClientConfig = (config) => ({
  ...config,
  baseUrl: env.VITE_API_URL ?? 'http://localhost:3000',
  credentials: 'include' as RequestCredentials,
});
