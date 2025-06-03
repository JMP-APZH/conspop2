import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FiArrowLeft } from 'react-icons/fi';
import Link from 'next/link';
import PublicLayout from '../../components/Layout/PublicLayout';
import { setAuthToken } from '../../lib/auth';
import { gql } from '@apollo/client';

const REGISTER_MUTATION = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
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

interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  cityOfOrigin: string;
  currentCity: string;
}


const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), undefined], 'Passwords must match')
    .required('Confirm Password is required'),
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  cityOfOrigin: yup.string().required('City of origin is required'),
  currentCity: yup.string().required('Current city is required'),
});

export default function RegisterPage() {
  const router = useRouter();
  const [registerUser, { loading, error }] = useMutation(REGISTER_MUTATION);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const { data: response } = await registerUser({
        variables: {
          input: {
            email: data.email,
            password: data.password,
            firstName: data.firstName,
            lastName: data.lastName,
            cityOfOrigin: data.cityOfOrigin,
            currentCity: data.currentCity,
          }
        }
      });

      if (response?.register?.token) {
        setAuthToken(response.register.token);
        router.push('/profile');
      }
    } catch (err) {
      console.error('Registration error:', err);
    }
  };

  return (
    <PublicLayout>
      <div className="max-w-md mx-auto py-12 px-4">
        <Link href="/" className="flex items-center text-yellow-300 mb-6 hover:underline">
          <FiArrowLeft className="mr-2" /> Retour à l'accueil
        </Link>

        <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-yellow-300 mb-6">Kréyé kont' ou</h1>

          {error && (
            <div className="mb-4 p-3 bg-red-500 text-white rounded">
              {error.message}
            </div>
          )}
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-yellow-300 mb-1">Mèl ou Pipiri</label>
              <input
                {...register("email")}
                type="email"
                className="w-full px-4 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-yellow-300"
                disabled={loading}
              />
              {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-yellow-300 mb-1">Mod'pas'</label>
              <input
                {...register("password")}
                type="password"
                className="w-full px-4 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-yellow-300"
                disabled={loading}
              />
              {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-yellow-300 mb-1">Anko an fwa mod'pas' la</label>
              <input
                {...register("confirmPassword")}
                type="password"
                className="w-full px-4 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-yellow-300"
                disabled={loading}
              />
              {errors.confirmPassword && <p className="text-red-400 text-sm mt-1">{errors.confirmPassword.message}</p>}
            </div>

            {/* First Name */}
            <div>
              <label htmlFor="firstName" className="block text-yellow-300 mb-1">Non</label>
              <input
                {...register("firstName")}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-yellow-300"
                disabled={loading}
              />
              {errors.firstName && <p className="text-red-400 text-sm mt-1">{errors.firstName.message}</p>}
            </div>

            {/* Last Name */}
            <div>
              <label htmlFor="lastName" className="block text-yellow-300 mb-1">Siyati</label>
              <input
                {...register("lastName")}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-yellow-300"
                disabled={loading}
              />
              {errors.lastName && <p className="text-red-400 text-sm mt-1">{errors.lastName.message}</p>}
            </div>

            {/* City of Origin */}
            <div>
              <label htmlFor="cityOfOrigin" className="block text-yellow-300 mb-1">Kote ou sòti</label>
              <input
                {...register("cityOfOrigin")}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-yellow-300"
                disabled={loading}
              />
              {errors.cityOfOrigin && <p className="text-red-400 text-sm mt-1">{errors.cityOfOrigin.message}</p>}
            </div>

            {/* Current City */}
            <div>
              <label htmlFor="currentCity" className="block text-yellow-300 mb-1">Kote ou retè</label>
              <input
                {...register("currentCity")}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-yellow-300"
                disabled={loading}
              />
              {errors.currentCity && <p className="text-red-400 text-sm mt-1">{errors.currentCity.message}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-300 text-gray-800 py-2 px-4 rounded font-bold hover:bg-yellow-400 transition-colors"
            >
              {loading ? 'Ap soumèt...' : 'Réjistré'}
            </button>
          </form>

          <p className="mt-6 text-center text-yellow-300">
            Ou za ni an kont'?{' '}
            <Link href="/auth/login" className="font-bold hover:underline">
              Konèkté
            </Link>
          </p>
        </div>
      </div>
    </PublicLayout>
  );
}