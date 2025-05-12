import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const CURRENT_USER_QUERY = gql`
  query CurrentUser {
    currentUser {
      id
      email
      firstName
      lastName
      cityOfOrigin
      currentCity
    }
  }
`;

export default function ProfilePage() {
  const router = useRouter();
  const { loading, error, data } = useQuery(CURRENT_USER_QUERY);

  useEffect(() => {
    if (!loading && !data?.currentUser) {
      router.push('/login');
    }
  }, [loading, data, router]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Profile</h1>
      {data?.currentUser && (
        <div>
          <p>Email: {data.currentUser.email}</p>
          <p>Name: {data.currentUser.firstName} {data.currentUser.lastName}</p>
          <p>City of Origin: {data.currentUser.cityOfOrigin}</p>
          <p>Current City: {data.currentUser.currentCity}</p>
        </div>
      )}
    </div>
  );
}