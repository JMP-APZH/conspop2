import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from './Navbar';
import { isAuthenticated } from '../../../lib/auth';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';

const ME_QUERY = gql`
  query Me {
    me {
      role
    }
  }
`;

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { data, loading, error } = useQuery(ME_QUERY);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/auth/login');
    } else if (!loading && data?.me?.role !== 'ADMIN') {
      router.push('/');
    }
  }, [router, data, loading]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (data?.me?.role !== 'ADMIN') return null;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <main className="pb-16 md:pb-0">{children}</main>
    </div>
  );
}