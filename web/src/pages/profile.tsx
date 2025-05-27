import { useAuth } from '../context/AuthContext';
// import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

// const CURRENT_USER_QUERY = gql`
//   query CurrentUser {
//     currentUser {
//       id
//       email
//       firstName
//       lastName
//       cityOfOrigin
//       currentCity
//     }
//   }
// `;

export default function ProfilePage() {
  const router = useRouter();
  const { user, loading } = useAuth();  // Replace useQuery

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login2');
    }
  }, [loading, user, router]);

  // if (error) return <p>Error: {error.message}</p>;
  if (loading) return <p>Loading...</p>;
  if (!user) return null;

  return (
    <div>
      <h1>Profile</h1>
      {user && (
        <div>
          <p>Email: {user.email}</p>
          <p>Name: {user.firstName} {user.lastName}</p>
          <p>City of Origin: {user.cityOfOrigin}</p>
          <p>Current City: {user.currentCity}</p>
        </div>
      )}
    </div>
  );
}