import { Outlet } from 'react-router';
import { Navbar } from './navbar';

export function RootLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-brand-surface">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
