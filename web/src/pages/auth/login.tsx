// login.tsx
import PublicLayout from '../../components/PublicLayout';
import LoginForm from './LoginForm';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <PublicLayout>
      <div className="max-w-md mx-auto py-12">
        <h1 className="text-2xl font-bold mb-6">Sign In</h1>
        <LoginForm />
        <p className="mt-4 text-center">
          Don't have an account?{' '}
          <Link href="/auth/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </PublicLayout>
  );
}