import type { ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';
import { sessionQueryOptions } from './client';

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  useQuery(sessionQueryOptions());
  return <>{children}</>;
}
