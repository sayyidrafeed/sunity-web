import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  input: 'https://your-api.example.com/openapi.json',
  output: 'src/lib/api',
  plugins: [
    {
      name: '@hey-api/client-fetch',
      runtimeConfigPath: '../hey-api.ts',
    },
    '@tanstack/react-query',
    {
      name: '@hey-api/sdk',
      operations: {
        strategy: 'flat',
      },
    },
  ],
});
