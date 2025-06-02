import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from './Navbar';
import { isAuthenticated } from '../../../lib/auth';

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/auth/login');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <main className="pb-16 md:pb-0">{children}</main>
    </div>
  );
}