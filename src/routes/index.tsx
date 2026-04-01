import { createBrowserRouter, Navigate } from 'react-router';

// This is the main router of the application.
// Features will define their own routes which will be imported and merged here.
export const router = createBrowserRouter([
  {
    path: '/',
    element: <div>Sunity</div>,
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);
