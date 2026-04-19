import { config } from 'dotenv';
import { z } from 'zod';

config();

export const DEFAULT_API_URL = 'http://localhost:3000';

const ApiUrlSchema = z
  .string()
  .url('VITE_API_URL must be a valid URL')
  .transform((value) => value.replace(/\/$/, ''));

type EnvInput = NodeJS.ProcessEnv | Record<string, string | undefined>;

export function parseApiUrl(env: EnvInput): string {
  return ApiUrlSchema.parse(env.VITE_API_URL ?? DEFAULT_API_URL);
}

export function getOpenApiDocumentUrl(env: EnvInput): string {
  return `${parseApiUrl(env)}/openapi.json`;
}

export function getManifestUrl(env: EnvInput): string {
  return `${parseApiUrl(env)}/api/meta/permissions-manifest`;
}
