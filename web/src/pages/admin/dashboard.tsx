import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';

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
  const router = useRouter();
  const { loading, error, data } = useQuery(DASHBOARD_STATS, {
    fetchPolicy: 'network-only'
  });

  useEffect(() => {
    // You might want to verify admin status on client side too
    const userRole = localStorage.getItem('userRole');
    if (userRole !== 'ADMIN') {
      router.push('/');
    }
  }, []);

  if (loading) return <AdminLayout>Loading...</AdminLayout>;
  if (error) return <AdminLayout>Error: {error.message}</AdminLayout>;

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

// Reusable DashboardCard component
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