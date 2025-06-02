import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FiArrowLeft, FiEye, FiEyeOff } from 'react-icons/fi';
import Link from 'next/link';
import { useState } from 'react';
import PublicLayout from '../../components/Layout/PublicLayout';
import { setAuthToken } from '../../lib/auth';
import { gql } from '@apollo/client';

const LOGIN_MUTATION = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      token
      user {
        id
        email
        firstName
        lastName
        role
      }
    }
  }
`;

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loginUser, { loading, error }] = useMutation(LOGIN_MUTATION);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    try {
      const { data: response } = await loginUser({
        variables: {
          input: {
            email: data.email,
            password: data.password,
          }
        }
      });

      if (response?.login?.token) {
        setAuthToken(response.login.token);
        router.push('/profile');
      }
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  return (
    <PublicLayout>
      <div className="max-w-md mx-auto py-12 px-4">
        <Link href="/" className="flex items-center text-black mb-6 hover:underline">
          <FiArrowLeft className="mr-2" /> Ritounin a kay
        </Link>

        <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-yellow-300 mb-6">Konèkté</h1>

          {error && (
            <div className="mb-4 p-3 bg-red-500 text-white rounded">
              {error.message}
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
                disabled={loading}
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
                disabled={loading}
              />
              <button
                type="button"
                className="absolute right-3 top-9 text-yellow-300 hover:text-yellow-400"
                onClick={() => setShowPassword(!showPassword)}
                disabled={loading}
              >
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
              {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-300 text-gray-800 py-2 px-4 rounded font-bold hover:bg-yellow-400 transition-colors"
            >
              {loading ? 'Ap konèkté...' : 'Konèkté kow\''}
            </button>
          </form>

          <div className="mt-6 text-center space-y-2">
            <p className="text-yellow-300">
              Ou poho ni kont' ou?{' '}
              <Link href="/auth/register" className="font-bold hover:underline">
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