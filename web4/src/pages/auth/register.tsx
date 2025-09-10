import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FiArrowLeft, FiChevronDown } from 'react-icons/fi';
import Link from 'next/link';
import PublicLayout from '../../components/Layout/PublicLayout';
import { setAuthToken } from '../../lib/auth';
import { gql } from '@apollo/client';
import { useState } from 'react';
import { MartiniqueCity, CitiesResponse } from '../../types';


interface MartiniqueCity {
  id: string;
  name: string;
  postalCode: string;
  agglomeration: string;
  population: number;
}


const GET_CITIES_QUERY = gql`
  query GetCities {
    cities {
      cities {
        id
        name
        postalCode
        agglomeration
        population
      }
      totalCount
    }
  }
`;

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
        isDiaspora
          cityOfOrigin {
            id
            name
          }
          currentCity {
            id
            name
          }
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
  isDiaspora: boolean;
  cityOfOrigin: { id: string };
  currentCity: { id: string };
}


const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), undefined], 'Passwords must match')
    .required('Confirm Password is required'),
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  isDiaspora: yup.boolean().required('Please specify if you are in diaspora'),
  cityOfOrigin: yup.object().shape({
    id: yup.string().required('City of origin is required')
  }).required('City of origin is required'),
  currentCity: yup.object().shape({
    id: yup.string().required('Current city is required')
  }).required('Current city is required'),
});

export default function RegisterPage() {
  const router = useRouter();
  const [registerUser, { loading, error }] = useMutation(REGISTER_MUTATION);
  const { data: citiesData, loading: citiesLoading } = useQuery<{
  cities: CitiesResponse;
}>(GET_CITIES_QUERY);
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      isDiaspora: false,
      cityOfOrigin: { id: '' },
      currentCity: { id: '' }
    }
  });

  const [showOriginDropdown, setShowOriginDropdown] = useState(false);
  const [showCurrentDropdown, setShowCurrentDropdown] = useState(false);

  const selectedOriginId = watch('cityOfOrigin.id');
  const selectedCurrentId = watch('currentCity.id');

  const selectedOriginCity = citiesData?.cities?.cities?.find(city => city.id === selectedOriginId);
  const selectedCurrentCity = citiesData?.cities?.cities?.find(city => city.id === selectedCurrentId);

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const { data: response } = await registerUser({
        variables: {
          input: {
            email: data.email,
            password: data.password,
            firstName: data.firstName,
            lastName: data.lastName,
            isDiaspora: data.isDiaspora,
            cityOfOrigin: { id: data.cityOfOrigin.id },
            currentCity: { id: data.currentCity.id },
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

            {/* Diaspora Field */}
            <div>
              <label className="flex items-center text-yellow-300 mb-1">
                <input
                  type="checkbox"
                  {...register("isDiaspora")}
                  className="mr-2"
                  disabled={loading}
                />
                Mwen ka rété an dyaspora (pa an Matinik)
              </label>
              {errors.isDiaspora && <p className="text-red-400 text-sm mt-1">{errors.isDiaspora.message}</p>}
            </div>

            {/* City of Origin Dropdown */}
            <div className="relative">
              <label htmlFor="cityOfOrigin" className="block text-yellow-300 mb-1">Kote ou sòti</label>
              <div
                className="w-full px-4 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-yellow-300 cursor-pointer flex justify-between items-center"
                onClick={() => setShowOriginDropdown(!showOriginDropdown)}
              >
                <span>{selectedOriginCity ? selectedOriginCity.name : "Chwazi yon vil"}</span>
                <FiChevronDown />
              </div>
              {showOriginDropdown && (
                <div className="absolute z-10 w-full mt-1 bg-gray-700 border border-gray-600 rounded shadow-lg max-h-60 overflow-y-auto">
                  {citiesLoading ? (
                    <div className="p-2 text-white">Chajman...</div>
                  ) : (
                    citiesData?.cities?.cities?.map((city) => (
                      <div
                        key={city.id}
                        className="p-2 hover:bg-gray-600 cursor-pointer text-white"
                        onClick={() => {
                          setValue('cityOfOrigin', { id: city.id });
                          setShowOriginDropdown(false);
                        }}
                      >
                        {city.name} ({city.postalCode})
                      </div>
                    ))
                  )}
                </div>
              )}
              <input type="hidden" {...register("cityOfOrigin.id")} />
              {errors.cityOfOrigin?.id && <p className="text-red-400 text-sm mt-1">{errors.cityOfOrigin.id.message}</p>}
            </div>

            {/* Current City Dropdown */}
            <div className="relative">
              <label htmlFor="currentCity" className="block text-yellow-300 mb-1">Kote ou retè</label>
              <div
                className="w-full px-4 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-yellow-300 cursor-pointer flex justify-between items-center"
                onClick={() => setShowCurrentDropdown(!showCurrentDropdown)}
              >
                <span>{selectedCurrentCity ? selectedCurrentCity.name : "Chwazi yon vil"}</span>
                <FiChevronDown />
              </div>
              {showCurrentDropdown && (
                <div className="absolute z-10 w-full mt-1 bg-gray-700 border border-gray-600 rounded shadow-lg max-h-60 overflow-y-auto">
                  {citiesLoading ? (
                    <div className="p-2 text-white">Chajman...</div>
                  ) : (
                    citiesData?.cities?.cities?.map((city) => (
                      <div
                        key={city.id}
                        className="p-2 hover:bg-gray-600 cursor-pointer text-white"
                        onClick={() => {
                          setValue('currentCity', { id: city.id });
                          setShowCurrentDropdown(false);
                        }}
                      >
                        {city.name} ({city.postalCode})
                      </div>
                    ))
                  )}
                </div>
              )}
              <input type="hidden" {...register("currentCity.id")} />
              {errors.currentCity?.id && <p className="text-red-400 text-sm mt-1">{errors.currentCity.id.message}</p>}
            </div>

            <button
              type="submit"
              disabled={loading || citiesLoading}
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