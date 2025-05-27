import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const verifyAuth = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/auth/login2');
        return;
      }

      try {
        const response = await fetch('/api/verify-token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token })
        });

        if (!response.ok) {
          throw new Error('Verification failed');
        }

        const userData = await response.json();
        if (userData.role !== 'ADMIN') {  // Fixed comparison
          throw new Error('Not an admin');
        }

      } catch (error) {
        localStorage.removeItem('token');
        router.push('/auth/login2');
      }
    };

    verifyAuth();
  }, [router]);

  return (
    <>
      <Head>
        <title>Admin Dashboard</title>
      </Head>
      <div className="min-h-screen bg-gray-100">
        <AdminNavbar />
        <main className="p-4 md:p-8">{children}</main>
      </div>
    </>
  );
}

function AdminNavbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-lg font-bold">Admin Panel</h1>
            </div>
          </div>
          <div className="flex items-center">
            <button 
              onClick={() => {
                localStorage.removeItem('token');
                localStorage.removeItem('userRole');
                window.location.href = '/';
              }}
              className="text-red-500 hover:text-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}