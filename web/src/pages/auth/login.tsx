// login.tsx
import PublicLayout from '../../components/PublicLayout';
import LoginForm from './LoginForm';
import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';

export default function LoginPage() {
  return (
    <PublicLayout>
      <Link href="/" className="flex items-center text-black font-semibold mb-6 hover:underline">
        <FiArrowLeft className="mr-2" /> Ritounin a kay
      </Link>
      <div className="max-w-md mx-auto py-12">
        <h1 className="text-2xl font-bold mb-6">Konèkté kow'</h1>
        <LoginForm />
        <p className="mt-4 text-center">
          Ou pni kont' ou?{' '}
          <Link href="/auth/register" className="text-blue-500 font-bold hover:underline">
            Réjistré kow'
          </Link>
        </p>
      </div>
    </PublicLayout>
  );
}