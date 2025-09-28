// web2/src/components/Auth/AdminRoute.tsx
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { isAuthenticated } from '../../lib/auth';
import { ME_ROLE_QUERY } from '../../lib/queries';

export default function AdminRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { data, loading, error } = useQuery(ME_ROLE_QUERY);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!isAuthenticated()) {
    router.push('/auth/login');
    return null;
  }
  if (data?.me?.role !== 'ADMIN') {
    router.push('/');
    return null;
  }

  return <>{children}</>;
}