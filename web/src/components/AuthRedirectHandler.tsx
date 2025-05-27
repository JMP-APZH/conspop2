import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';

export default function AuthRedirectHandler() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    // Skip for auth pages
    if (router.pathname.startsWith('/auth')) return;

    // Admin route protection
    if (router.pathname.startsWith('/admin') && user?.role !== 'ADMIN') {
      router.push('/');
      return;
    }

    // General auth protection (except public routes)
    if (!user && !['/', '/about'].includes(router.pathname)) {
      router.push('/auth/login2');
    }
  }, [user, loading, router.pathname]);

  return null;
}