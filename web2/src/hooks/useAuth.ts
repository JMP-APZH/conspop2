// web2/src/hooks/useAuth.ts
import { useState, useEffect } from 'react';
import { getAuthUserRole, isAuthenticated } from '../lib/auth';
import { Role } from '../types/roles';

export function useAuth() {
  const [mounted, setMounted] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<Role | null>(null);

  useEffect(() => {
    setMounted(true);
    setAuthenticated(isAuthenticated());
    setUserRole(getAuthUserRole());
  }, []);

  return {
    mounted,
    authenticated,
    userRole
  };
}