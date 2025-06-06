import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { gql } from '@apollo/client';
import AdminLayout from '../../components/Layout/AdminLayout';
import AdminRoute from '@/components/Auth/AdminRoute';

const ADMIN_DATA_QUERY = gql`
  query AdminData {
    users {
      id
      email
      firstName
      lastName
      role
      createdAt
    }
    # Add other admin-specific queries
  }
`;

export default function AdminDashboard() {
  const router = useRouter();
  const { loading, error, data } = useQuery(ADMIN_DATA_QUERY);

  if (loading) return <AdminLayout><div>Loading...</div></AdminLayout>;
  if (error) return <AdminLayout><div>Error: {error.message}</div></AdminLayout>;

  return (
    <AdminRoute>
      <AdminLayout>
        <div className="max-w-6xl mx-auto py-12 px-4">
          <h1 className="text-2xl font-bold text-yellow-300 mb-6">Panno Administratè</h1>
          
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-yellow-300 mb-4">Itilizatè yo</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-yellow-300 uppercase tracking-wider">Non</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-yellow-300 uppercase tracking-wider">Mèl</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-yellow-300 uppercase tracking-wider">Rol</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-yellow-300 uppercase tracking-wider">Dat Kréyasyon</th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                  {data?.users?.map((user: any) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-white">{user.firstName} {user.lastName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-white">{user.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-white">{user.role}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-white">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </AdminLayout>
    </AdminRoute>
  );
}