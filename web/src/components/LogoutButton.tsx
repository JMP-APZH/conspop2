import { useRouter } from 'next/router';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
}