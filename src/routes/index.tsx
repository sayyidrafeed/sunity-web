import { createBrowserRouter } from 'react-router';
import { ErrorState } from '@/components/ui/error-state';
import { NotFound } from '@/components/ui/not-found';
import { RootLayout } from '@/components/layout/root-layout';
import { Login } from './login';

// Features define their own route slices and import them here.
export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <ErrorState />,
    children: [
      {
        path: '/',
        element: <div>Sunity</div>,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);
