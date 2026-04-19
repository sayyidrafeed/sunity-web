import { Link } from 'react-router';

export function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-8 text-center">
      <h1 className="text-foreground text-2xl font-semibold">404</h1>
      <p className="text-muted-foreground text-sm">Page not found.</p>
      <Link to="/" className="text-sm underline underline-offset-4">
        Go home
      </Link>
    </div>
  );
}
