import PublicLayout from '../../components/PublicLayout';
import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';

export default function LoginPage() {
  return (
    <PublicLayout>
      <div className="max-w-md mx-auto py-12 px-4">
        <Link href="/" className="flex items-center text-black mb-6 hover:underline">
          <FiArrowLeft className="mr-2" /> Ritounin a kay
        </Link>

        <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-yellow-300 mb-6">Konèkté</h1>
          
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

            <button
              type="submit"
              className="w-full bg-yellow-300 text-gray-800 py-2 px-4 rounded font-bold hover:bg-yellow-400 transition-colors"
            >
              Konèkté kow'
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