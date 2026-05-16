import { Outlet, ScrollRestoration } from 'react-router';
import { Navbar } from './navbar';
import { Footer } from './footer';

export function RootLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-brand-surface">
      <ScrollRestoration />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
