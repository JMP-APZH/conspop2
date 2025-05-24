import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { useAuth } from '../../context/AuthContext';
import { UsersIcon, NewUsersIcon, CalendarIcon } from '../../components/Icons';

const DASHBOARD_STATS = gql`
  query DashboardStats {
    adminDashboardStats {
      totalUsers
      newUsersLast24h
      newUsersLast7d
    }
  }
`;

export default function AdminDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { error, data } = useQuery(DASHBOARD_STATS, {
    fetchPolicy: 'network-only'
  });

  useEffect(() => {
    if (!loading && user?.role !== 'ADMIN') {
      router.push('/login2');
    }
  }, [user, loading, router]);

  if (loading || !user) return <div>Loading...</div>;

  if (error) {
    return <AdminLayout>Error: {error.message}</AdminLayout>;
  }

  if (!data) {
    return <AdminLayout>No data available</AdminLayout>;
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

function DashboardCard({ title, value, icon, trend }: any) {
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