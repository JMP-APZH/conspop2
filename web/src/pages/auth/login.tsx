// login.tsx
import PublicLayout from '../../components/PublicLayout';
import LoginForm from './LoginForm';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <PublicLayout>
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