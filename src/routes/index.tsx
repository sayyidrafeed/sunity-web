import { createBrowserRouter } from 'react-router';
import { ErrorState } from '@/components/ui/error-state';
import { NotFound } from '@/components/ui/not-found';
import { RootLayout } from '@/components/layout/root-layout';
import Home from '@/routes/home';

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <ErrorState />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);
