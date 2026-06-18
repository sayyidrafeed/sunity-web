import type { CreateClientConfig } from './generated/client.gen';

import { env } from '@/config';

export const createClientConfig: CreateClientConfig = (config) => {
  const raw = env.VITE_API_URL ?? 'http://localhost:3000';
  const baseUrl = raw.replace(/\/+$/, '') + '/api';
  return {
    ...config,
    baseUrl,
    credentials: 'include' as RequestCredentials,
  };
};
