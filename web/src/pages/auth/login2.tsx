import PublicLayout from '../../components/PublicLayout';
import Link from 'next/link';
import { FiArrowLeft, FiEye, FiEyeOff } from 'react-icons/fi';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/router';
// import { setToken } from '../../utils/auth';
import { gql, useMutation } from '@apollo/client';
import { useAuth } from '@/context/AuthContext';

// Validation schema
const loginSchema = z.object({
  email: z.string().email("Mèl ou pa valid"),
  password: z.string().min(1, "Mod'pas' ou obligatwa")
});

type LoginFormData = z.infer<typeof loginSchema>;

// GraphQL mutation
const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        id
        email
        firstName
        lastName
        cityOfOrigin
        currentCity
        role
      }
      token
    }
  }
`;

export default function LoginPage() {

  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const { setUser } = useAuth();

  // Moved useEffect to component level (not inside onCompleted)
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      console.log('[Login] Token exists - redirecting to dashboard');
      router.replace('/admin/dashboard');
    }
  }, [router]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  });

  const [login] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data) => {
      const { token } = data.login;
      localStorage.setItem('token', token);
      console.log('Login successful - redirecting');
      window.location.href = '/admin/dashboard';
    },
    onError: (error) => {
      console.error('Login failed:', error);
      setServerError("Authentication failed");
    }
  });
  
  const onSubmit = async (formData: LoginFormData) => {
    setServerError(null);
    await login({ variables: formData });
  };

  return (
    <PublicLayout>
      <div className="max-w-md mx-auto py-12 px-4">
        <Link href="/" className="flex items-center text-black mb-6 hover:underline">
          <FiArrowLeft className="mr-2" /> Ritounin a kay
        </Link>

        <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-yellow-300 mb-6">Konèkté</h1>

          {serverError && (
            <div className="mb-4 p-3 bg-red-500 text-white rounded">
              {serverError}
            </div>
          )}
          
          <form 
            className="space-y-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <label htmlFor="email" className="block text-yellow-300 mb-1">Mèl ou Pipiri</label>
              <input
                {...register("email")}
                type="email"
                autoComplete="username"
                id="email"
                className="w-full px-4 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-yellow-300"
                disabled={isSubmitting}
              />
              {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div className="relative">
              <label htmlFor="password" className="block text-yellow-300 mb-1">Mod'pas'</label>
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                id="password"
                className="w-full px-4 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-yellow-300"
                disabled={isSubmitting}
              />
              <button
                type="button"
                className="absolute right-3 top-9 text-yellow-300 hover:text-yellow-400"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isSubmitting}
              >
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
              {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting || isRedirecting}
              className="w-full bg-yellow-300 text-gray-800 py-2 px-4 rounded font-bold hover:bg-yellow-400 transition-colors"
            >
              {(isSubmitting || isRedirecting) ? 'Ap konèkté...' : 'Konèkté kow\''}
            </button>
          </form>

          <div className="mt-6 text-center space-y-2">
            <p className="text-yellow-300">
              Ou poho ni kont' ou?{' '}
              <Link href="/auth/register2" className="font-bold hover:underline">
                Réjistré kow'
              </Link>
            </p>
            <p className="text-yellow-300">
              <Link href="/auth/forgot-password" className="text-sm hover:underline">
                Oublié mod'pas' ou?
              </Link>
            </p>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}