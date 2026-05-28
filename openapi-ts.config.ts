import { defineConfig } from '@hey-api/openapi-ts';

import { getOpenApiDocumentUrl } from './scripts/generation-env';

export default defineConfig({
  input: getOpenApiDocumentUrl(process.env),
  output: 'src/lib/api/generated',
  plugins: [
    '@hey-api/typescript',
    '@hey-api/sdk',
    {
      name: '@hey-api/client-fetch',
      runtimeConfigPath: '../hey-api.ts',
    },
    'zod',
    {
      name: '@tanstack/react-query',
      queryOptions: true,
      mutationOptions: true,
    },
  ],
});
