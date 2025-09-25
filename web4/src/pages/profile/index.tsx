import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { gql } from '@apollo/client';
import Image from 'next/image';
import Link from 'next/link';
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
      profileImage
      isDiaspora
      cityOfOrigin {
        id
        name
      }
      currentCity {
        id
        name
      }
      diasporaLocation {
        id
        country
      }
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
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Pwofil aw'</h1>
            <Link 
              href="/profile/edit" 
              className="bg-yellow-300 text-gray-800 px-4 py-2 rounded font-bold hover:bg-yellow-400 transition-colors"
            >
              Modifyé Pwofil
            </Link>
          </div>
          
          <div className="space-y-6">
            {/* Profile Image */}
            {data?.me?.profileImage ? (
              <div className="flex justify-center">
                <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-yellow-300">
                  <Image 
                    src={data.me.profileImage} 
                    alt="Foto Pwofil" 
                    fill
                    className="object-cover"
                    sizes="128px"
                    priority // Add priority for LCP optimization
                  />
                </div>
              </div>
            ) : (
              <div className="flex justify-center">
                <div className="w-32 h-32 rounded-full bg-gray-600 border-4 border-yellow-300 flex items-center justify-center">
                  <span className="text-4xl text-white font-bold">
                    {data?.me?.firstName?.[0]}{data?.me?.lastName?.[0]}
                  </span>
                </div>
              </div>
            )}
          
            <div>
              <h2 className="text-lg font-semibold mb-4">Enfòmasyon pèsonèl</h2>
              <div className="space-y-3">
                <p><span className="font-medium">Non:</span> {data?.me?.firstName} {data?.me?.lastName}</p>
                {data?.me?.nickname && (
                  <p><span className="font-medium">Surnom:</span> {data?.me?.nickname}</p>
                )}
                <p><span className="font-medium">Mèl:</span> {data?.me?.email}</p>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-4">Adrès</h2>
              <div className="space-y-3">
                <p><span className="font-medium">Kote ou sòti:</span> {data?.me?.cityOfOrigin?.name}</p>
                {data?.me?.isDiaspora ? (
                  <p><span className="font-medium">Kote ou retè an dyaspora:</span> {data?.me?.diasporaLocation?.country}</p>
                ) : (
                  <p><span className="font-medium">Kote ou retè:</span> {data?.me?.currentCity?.name}</p>
                )}
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-4">Kont' ou</h2>
              <div className="space-y-3">
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