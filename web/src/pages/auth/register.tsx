// web/src/pages/auth/register.tsx
import { useState } from 'react';
import PublicLayout from '../../components/PublicLayout';
import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/router';
import { setToken } from '../../utils/auth';

// Simplified validation schema (kept your existing one)
const registerSchema = z.object({
  email: z.string().email("Mèl ou pa valid"),
  password: z.string().min(8, "Mod'pas' ou dwe gen minimòm 8 karaktè"),
  confirmPassword: z.string(),
  firstName: z.string().min(1, "Non ou obligatwa"),
  lastName: z.string().min(1, "Siyati ou obligatwa"),
  cityOfOrigin: z.string().min(1, "Kote ou sòti obligatwa"),
  currentCity: z.string().min(1, "Kote ou retè obligatwa")
}).refine(data => data.password === data.confirmPassword, {
  message: "Mod'pas' yo pa menm",
  path: ["confirmPassword"]
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema)
  });

  const onSubmit = async (formData: RegisterFormData) => {
    setServerError(null);
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
          cityOfOrigin: formData.cityOfOrigin,
          currentCity: formData.currentCity
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erè sou sèvè a, tanpri eseye ankò");
      }

      setToken(data.token);
      router.push('/profile');
    } catch (err) {
      const error = err as Error;
      setServerError(
        error.message.includes('Email')
          ? "Mèl sa deja itilize" 
          : "Erè sou sèvè a, tanpri eseye ankò"
      );
    } finally {
      setIsLoading(false);
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

          {serverError && (
            <div className="mb-4 p-3 bg-red-500 text-white rounded">
              {serverError}
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
                disabled={isLoading}
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
                disabled={isLoading}
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
                disabled={isLoading}
              />
              {errors.confirmPassword && <p className="text-red-400 text-sm mt-1">{errors.confirmPassword.message}</p>}
            </div>

            {/* First Name */}
            <div>
              <label htmlFor="firstName" className="block text-yellow-300 mb-1">Non</label>
              <input
                {...register("firstName")}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-yellow-300"
                disabled={isLoading}
              />
              {errors.firstName && <p className="text-red-400 text-sm mt-1">{errors.firstName.message}</p>}
            </div>

            {/* Last Name */}
            <div>
              <label htmlFor="lastName" className="block text-yellow-300 mb-1">Siyati</label>
              <input
                {...register("lastName")}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-yellow-300"
                disabled={isLoading}
              />
              {errors.lastName && <p className="text-red-400 text-sm mt-1">{errors.lastName.message}</p>}
            </div>

            {/* City of Origin */}
            <div>
              <label htmlFor="cityOfOrigin" className="block text-yellow-300 mb-1">Kote ou sòti</label>
              <input
                {...register("cityOfOrigin")}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-yellow-300"
                disabled={isLoading}
              />
              {errors.cityOfOrigin && <p className="text-red-400 text-sm mt-1">{errors.cityOfOrigin.message}</p>}
            </div>

            {/* Current City */}
            <div>
              <label htmlFor="currentCity" className="block text-yellow-300 mb-1">Kote ou retè</label>
              <input
                {...register("currentCity")}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-yellow-300"
                disabled={isLoading}
              />
              {errors.currentCity && <p className="text-red-400 text-sm mt-1">{errors.currentCity.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-yellow-300 text-gray-800 py-2 px-4 rounded font-bold hover:bg-yellow-400 transition-colors"
            >
              {isLoading ? 'Ap soumèt...' : 'Réjistré'}
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