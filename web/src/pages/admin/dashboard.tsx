import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { useAuth } from '../../context/AuthContext';
import { UsersIcon, NewUsersIcon, CalendarIcon } from '../../components/Icons';

interface DashboardCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
}

const DASHBOARD_STATS = gql`
  query DashboardStats {
    adminDashboardStats {
      totalUsers
      newUsersLast24h
      newUsersLast7d
    }
  }
`;

function DashboardCard({ title, value, icon, trend }: DashboardCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between">
        <div>
          <p className="text-gray-500">{title}</p>
          <p className="text-3xl font-bold">{value}</p>
        </div>
        <div className="text-blue-500">
          {icon}
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const { user, loading } = useAuth();

  console.log('[Dashboard] Current auth state:', { user, loading });

  // const { loading: queryLoading, error, data } = useQuery(DASHBOARD_STATS, {
  //   skip: !user || user?.role !== 'ADMIN',
  //   fetchPolicy: 'network-only'
  // });

  useEffect(() => {
    console.log('[Dashboard] Auth check - loading:', loading, 'user:', user?.email);
    
    if (loading) {
      console.log('[Dashboard] Waiting for auth verification');
      return;
    }
  
    if (!user) {
      console.log('[Dashboard] No user - hard redirect to login');
      window.location.href = '/auth/login2';
      return;
    }
  
    if (user.role !== 'ADMIN') {
      console.log('[Dashboard] Non-admin user - redirecting home');
      window.location.href = '/';
    }
  }, [user, loading]);

    
  const { loading: queryLoading, error, data } = useQuery(DASHBOARD_STATS, {
    skip: !user || user?.role !== 'ADMIN',
    fetchPolicy: 'network-only'
  });

  console.log('[Dashboard] Query state:', { queryLoading, error, data });

  if (error) {
    return (
      <AdminLayout>
        <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
          <h2 className="text-xl font-bold text-red-800">Dashboard Error</h2>
          <p className="mt-2 text-red-600">{error.message}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-100 text-red-800 rounded hover:bg-red-200"
          >
            Retry
          </button>
        </div>
      </AdminLayout>
    );
  }

  // Add this before the return statement
if (queryLoading || !data) {
  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
        <p>Loading dashboard data...</p>
      </div>
    </AdminLayout>
  );
}

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <DashboardCard 
            title="Total Users"
            value={data.adminDashboardStats.totalUsers}
            icon={<UsersIcon />}
          />
          <DashboardCard
            title="New Users (24h)"
            value={data.adminDashboardStats.newUsersLast24h}
            icon={<NewUsersIcon />}
            trend="up"
          />
          <DashboardCard
            title="New Users (7d)"
            value={data.adminDashboardStats.newUsersLast7d}
            icon={<CalendarIcon />}
          />
        </div>
      </div>
    </AdminLayout>
  );
}