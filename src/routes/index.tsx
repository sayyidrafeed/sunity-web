import { createBrowserRouter } from 'react-router';
import { ErrorState } from '@/components/ui/error-state';
import { NotFound } from '@/components/ui/not-found';
import { RootLayout } from '@/components/layout/root-layout';
import { LoginPage, DashboardPage, MonitoringPage, KelolaKampanyePage } from '@/components/admin'; // 👈 TAMBAHKAN DI SINI
import Home from '@/routes/home';
import Campaigns from '@/routes/campaigns';

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
        path: '/campaigns',
        element: <Campaigns />,
      },
      {
        path: '/admin/login',
        element: <LoginPage />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
  {
    path: '/admin/dashboard',
    element: <DashboardPage />,
    errorElement: <ErrorState />,
  },
  {
    path: '/admin/monitoring',
    element: <MonitoringPage />,
    errorElement: <ErrorState />,
  },
  {
    path: '/admin/campaigns',
    element: <KelolaKampanyePage />,
    errorElement: <ErrorState />,
  },
]);
