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
    <div className="flex min-h-screen" style={{ backgroundColor: '#FAF9F6' }}>
      <AdminSidebar />

      <main id="admin-main-content" className="flex-1 overflow-auto" style={{ backgroundColor: '#FAF9F6' }}>
        <Outlet />
      </main>
    </div>
  );
}
