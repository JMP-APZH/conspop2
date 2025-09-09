import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { gql } from '@apollo/client';
import { isAuthenticated } from '../../lib/auth';
import PrivateLayout from '../../components/Layout/PrivateLayout';

const ME_QUERY = gql`
  query Me {
    me {
      id
      email
      firstName
      lastName
      nickname
      cityOfOrigin
      currentCity
      role
      createdAt
    }
  }
`;

export default function ProfilePage() {
  const router = useRouter();
  const { loading, error, data } = useQuery(ME_QUERY);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/auth/login');
    }
  }, [router]);

  if (loading) return <PrivateLayout><div>Loading...</div></PrivateLayout>;
  if (error) return <PrivateLayout><div>Error: {error.message}</div></PrivateLayout>;

  return (
    <PrivateLayout>
      <div className="max-w-2xl mx-auto py-12 px-4">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-yellow-300">
          <h1 className="text-2xl font-bold mb-6">Pwofil aw'</h1>
          
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold">Enfòmasyon pèsonèl</h2>
              <div className="mt-2 space-y-2">
                <p><span className="font-medium">Non:</span> {data?.me?.firstName} {data?.me?.lastName}</p>
                {data?.me?.nickname && <p><span className="font-medium">Surnom:</span> {data?.me?.nickname}</p>}
                <p><span className="font-medium">Mèl:</span> {data?.me?.email}</p>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold">Adrès</h2>
              <div className="mt-2 space-y-2">
                <p><span className="font-medium">Kote ou sòti:</span> {data?.me?.cityOfOrigin}</p>
                <p><span className="font-medium">Kote ou retè:</span> {data?.me?.currentCity}</p>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold">Kont' ou</h2>
              <div className="mt-2 space-y-2">
                <p><span className="font-medium">Rol:</span> {data?.me?.role}</p>
                <p><span className="font-medium">Dat kréyasyon:</span> {new Date(data?.me?.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PrivateLayout>
  );
}