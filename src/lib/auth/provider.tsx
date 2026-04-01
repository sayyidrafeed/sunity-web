import type { ReactNode } from 'react';

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  // TODO: Implement auth provider with Better Auth
  // For now, just render children without auth check
  return <>{children}</>;
}
