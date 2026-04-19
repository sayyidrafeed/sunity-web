import { createBrowserRouter } from 'react-router';
import { ErrorState } from '@/components/ui/error-state';
import { NotFound } from '@/components/ui/not-found';

// Features define their own route slices and import them here.
export const router = createBrowserRouter([
  {
    path: '/',
    element: <div>Sunity</div>,
    errorElement: <ErrorState />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
