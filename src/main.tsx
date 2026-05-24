import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/query/client';
import { router } from './routes';
import { AuthProvider } from './lib/auth/provider';
import { client } from '@/lib/api/generated/client.gen';
import { createClientConfig } from '@/lib/api/hey-api';
import './index.css';

client.setConfig(createClientConfig({}));

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
