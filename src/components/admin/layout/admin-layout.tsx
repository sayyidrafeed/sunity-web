import { Outlet } from 'react-router';
import { AdminSidebar } from '@/components/admin/layout/admin-sidebar';

/**
 * AdminLayout
 *
 * Shared shell for all /admin/* routes.
 * Renders the fixed-width sidebar on the left and the page content
 * (via <Outlet>) on the right.
 *
 */
export function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-brand-surface">
      <AdminSidebar />

      <main id="admin-main-content" className="flex-1 overflow-auto bg-brand-surface">
        <Outlet />
      </main>
    </div>
  );
}
