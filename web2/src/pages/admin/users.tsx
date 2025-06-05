import { useQuery, useMutation } from '@apollo/client';
import { gql } from '@apollo/client';
import AdminLayout from '../../components/Layout/AdminLayout';
import AdminRoute from '@/components/Auth/AdminRoute';

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      email
      firstName
      lastName
      role
      createdAt
    }
  }
`;

const UPDATE_USER_ROLE = gql`
  mutation UpdateUserRole($userId: String!, $newRole: Role!) {
    updateUserRole(userId: $userId, newRole: $newRole) {
      id
      role
    }
  }
`;

export default function AdminUsersPage() {
  const { loading, error, data, refetch } = useQuery(GET_USERS);
  const [updateRole] = useMutation(UPDATE_USER_ROLE);

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      await updateRole({
        variables: {
          userId,
          newRole
        }
      });
      refetch();
    } catch (err) {
      console.error('Error updating role:', err);
    }
  };

  if (loading) return <AdminLayout><div>Loading...</div></AdminLayout>;
  if (error) return <AdminLayout><div>Error: {error.message}</div></AdminLayout>;

  return (
    <AdminRoute>
      <AdminLayout>
        <div className="max-w-6xl mx-auto py-12 px-4">
          <h1 className="text-2xl font-bold text-yellow-300 mb-6">Jesyon Itilizatè yo</h1>
          
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-yellow-300 uppercase tracking-wider">Non</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-yellow-300 uppercase tracking-wider">Mèl</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-yellow-300 uppercase tracking-wider">Rol</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-yellow-300 uppercase tracking-wider">Aksyon</th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                  {data?.users?.map((user: any) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-white">
                        {user.firstName} {user.lastName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-white">{user.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-white">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          user.role === 'ADMIN' 
                            ? 'bg-purple-600 text-white' 
                            : 'bg-gray-600 text-white'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-white">
                        {user.role === 'USER' ? (
                          <button
                            onClick={() => handleRoleChange(user.id, 'ADMIN')}
                            className="bg-yellow-500 hover:bg-yellow-600 text-black px-3 py-1 rounded text-sm"
                          >
                            Promouvoir ADMIN
                          </button>
                        ) : (
                          <button
                            onClick={() => handleRoleChange(user.id, 'USER')}
                            className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm"
                          >
                            Rétrograder USER
                          </button>
                        )}
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