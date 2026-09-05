'use client';

import { checkSession, getMe } from '@/lib/api/clientApi';
import { useAuthUser } from '@/users/user';
import { useEffect } from 'react';

type AuthProviderProps = {
  children: React.ReactNode;
};

export default function AuthProvider({ children }: AuthProviderProps) {
  const setUser = useAuthUser(state => state.setUser);
  const clearUser = useAuthUser(state => state.clearIsAuthenticated);

  useEffect(() => {
    async function fetchUsers() {
      const isAuthenticated = await checkSession();
      if (isAuthenticated) {
        const user = await getMe();
        setUser(user);
      } else {
        clearUser();
      }
    }
    fetchUsers
  }, []);

  return children;
}
