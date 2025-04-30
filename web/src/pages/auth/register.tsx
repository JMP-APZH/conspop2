import PublicLayout from '../../components/PublicLayout';
import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';

// backend connection prep
import { useMutation } from '@apollo/client';
import { REGISTER_MUTATION } from '../../utils/api';
import { useRouter } from 'next/router';

export default function RegisterPage() {

  const router = useRouter();
  const [registerUser, { loading, error }] = useMutation(REGISTER_MUTATION);

  const onSubmit = async (data) => {
    try {
      const { data: response } = await registerUser({
        variables: {
          input: {
            email: data.email,
            password: data.password,
            firstName: '', // Add these from your form
            lastName: '',
            cityOfOrigin: '',
            currentCity: ''
          }
        }
      });

      // Store token and redirect
      localStorage.setItem('token', response.register.token);
      router.push('/profile');
    } catch (err) {
      console.error("Registration failed:", err);
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
          
          <form className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-yellow-300 mb-1">Mèl ou Pipiri</label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-yellow-300"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-yellow-300 mb-1">Mod'pas'</label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-yellow-300"
                required
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-yellow-300 mb-1">Anko an fwa mod'pas' la</label>
              <input
                type="password"
                id="confirmPassword"
                className="w-full px-4 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-yellow-300"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-300 text-gray-800 py-2 px-4 rounded font-bold hover:bg-yellow-400 transition-colors"
            >
              Réjistré
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