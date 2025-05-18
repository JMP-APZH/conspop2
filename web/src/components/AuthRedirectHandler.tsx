import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';

export default function AuthRedirectHandler() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && router.pathname.startsWith('/admin') && user?.role !== 'ADMIN') {
      router.push('/');
    }
  }, [user, loading, router.pathname]);

  return null;
}

// Then add this to your _app.tsx