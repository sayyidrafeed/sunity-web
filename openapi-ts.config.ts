import { defineConfig } from '@hey-api/openapi-ts';

import { getOpenApiDocumentUrl } from './scripts/generation-env';

export default defineConfig({
  input: getOpenApiDocumentUrl(process.env),
  output: 'src/lib/api/generated',
  plugins: [
    '@hey-api/typescript',
    '@hey-api/sdk',
    '@hey-api/client-fetch',
    'zod',
    {
      name: '@tanstack/react-query',
      queryOptions: true,
      mutationOptions: true,
    },
  ],
});
