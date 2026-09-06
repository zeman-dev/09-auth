'use client';

import { checkSession, getMe } from '@/lib/api/clientApi';
import { useAuthUser } from '@/lib/store/authStore';
import { useEffect } from 'react';

type AuthProviderProps = {
  children: React.ReactNode;
};

export default function AuthProvider({ children }: AuthProviderProps) {
  const setUser = useAuthUser(state => state.setUser);
  const clearIsAuthenticated = useAuthUser(state => state.clearIsAuthenticated);

  useEffect(() => {
    async function fetchUsers() {
      const isAuthenticated = await checkSession();
      if (isAuthenticated) {
        const user = await getMe();
        setUser(user);
      } else {
        clearIsAuthenticated();
      }
    }
    fetchUsers();
  }, []);

  return <>{children}</> ;
}
