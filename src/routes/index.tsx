import { createBrowserRouter, Navigate } from 'react-router';
import { ErrorState } from '@/components/ui/error-state';
import { NotFound } from '@/components/ui/not-found';
import { RootLayout } from '@/components/layout/root-layout';
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
        lazy: () =>
          import('@/components/admin/login/login-page').then((m) => ({
            Component: m.LoginPage,
          })),
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
  {
    path: '/admin',
    lazy: () =>
      import('@/components/admin/layout/admin-layout').then((m) => ({
        Component: m.AdminLayout,
      })),
    errorElement: <ErrorState />,
    children: [
      {
        index: true,
        element: <Navigate to="/admin/dashboard" replace />,
      },
      {
        path: 'dashboard',
        lazy: () =>
          import('@/components/admin/dashboard/dashboard-page').then((m) => ({
            Component: m.DashboardPage,
          })),
      },
      {
        path: 'monitoring',
        lazy: () =>
          import('@/components/admin/monitoring/monitoring-page').then((m) => ({
            Component: m.MonitoringPage,
          })),
      },
      {
        path: 'campaigns',
        lazy: () =>
          import('@/components/admin/campaigns/campaigns-page').then((m) => ({
            Component: m.CampaignsPage,
          })),
      },
    ],
  },
]);
