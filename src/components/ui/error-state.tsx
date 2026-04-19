import { useRouteError, isRouteErrorResponse, useNavigate } from 'react-router';

export function ErrorState() {
  const error = useRouteError();
  const navigate = useNavigate();

  const message = isRouteErrorResponse(error)
    ? error.statusText
    : error instanceof Error
      ? error.message
      : 'Something went wrong.';

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-8 text-center">
      <p className="text-muted-foreground text-sm">{message}</p>
      <button
        onClick={() => navigate(-1)}
        className="text-sm underline underline-offset-4"
      >
        Go back
      </button>
    </div>
  );
}
