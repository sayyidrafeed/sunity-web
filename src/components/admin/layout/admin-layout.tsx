import { Outlet, Navigate, useLocation } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { sessionQueryOptions } from '@/lib/auth/client';
import { AdminSidebar } from '@/components/admin/layout/admin-sidebar';
import { Toaster } from '@/components/ui/sonner';
import { LoaderCircle } from 'lucide-react';

/**
 * AdminLayout
 *
 * Shared shell for all /admin/* routes.
 * Renders the fixed-width sidebar on the left and the page content
 * (via <Outlet>) on the right.
 *
 */
export function AdminLayout() {
  const location = useLocation();
  const { data: session, isLoading } = useQuery(sessionQueryOptions());

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-brand-surface gap-4">
        <div className="flex flex-row items-center gap-[13px] animate-pulse">
          <img src="/sunity-admin-logo.avif" alt="Sunity logo mark" className="w-[38px] h-[52px] object-contain flex-shrink-0" />
          <span className="font-outfit font-bold text-[48px] leading-[60px] tracking-[-0.006em] text-brand-green">Sunity</span>
        </div>
        <div className="flex items-center gap-2">
          <LoaderCircle className="h-4 w-4 animate-spin text-brand-green" />
          <p className="font-jakarta text-sm text-[#A3A39E]">Memuat sesi...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return (
    <div className="flex min-h-screen bg-brand-surface">
      <AdminSidebar />

      <main id="admin-main-content" className="flex-1 overflow-auto bg-brand-surface">
        <Outlet />
      </main>
      <Toaster />
    </div>
  );
}
