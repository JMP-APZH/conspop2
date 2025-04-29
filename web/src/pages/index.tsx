import type { NextPage } from 'next'

import Link from 'next/link'

import PublicLayout from '../components/PublicLayout';

const Home: NextPage = () => {
  return (
    <div className="min-h-screen w-screen bg-yellow-300 text-white">
      <PublicLayout>

        {/* Main Content */}
        {/* <main className="container mx-auto py-16 md:py-24 px-20"> */}
          <div className='py-12'>

            <div className="-ml-5 mr-5">
              <h1 className="font-bold text-center bg-red-800 p-2 md:text-sm lg:text-4xl">Kontan Wè Zot'</h1>
              <h1 className="font-bold text-center bg-red-800 mb-4 pb-2 md:text-sm lg:text-4xl">Lyannaj' pou fè péyi a vansé</h1>
            </div>
            <h1 className="font-bold text-center bg-green-800 md:text-sm lg:text-4xl">Consultation Populaire - Ed. Martinique</h1>
            <h1 className="font-bold italic text-center mb-4 bg-green-800 p-2 md:text-sm lg:text-4xl">Bienvenu-e-s à notre expérience sociale pour la Martinique</h1>
            {/* <p className="text-xl text-center text-gray-300 max-w-2xl mx-auto">
              Participate in sociological studies and view community results to understand collective priorities.
            </p> */}
            <div className="ml-5 -mr-5">
              <p className="font-bold text-center italic mx-auto bg-black md:text-sm lg:text-xl">
                En participant à cette expérience, vous permettrez à la population Martiniquaise
              </p>
              <p className="font-bold text-center italic mx-auto bg-black md:text-sm lg:text-xl">
                de disposer de ses propres données pour des prises de décision
              </p>
              <p className="font-bold text-center italic mx-auto bg-black md:text-sm lg:text-xl">
                pragmatiques et au plus près des priorités des Martiniquais-es.
              </p>
            </div>

          </div>
        {/* </main> */}
      </PublicLayout>
    </div>
        
  )
}

// Reusable NavLink component
const NavLink = ({ href, icon, text = '' }: { href: string; icon: React.ReactNode; text?: string }) => (
    <Link href={href} className="flex flex-col items-center mx-2 md:mx-4 p-2 rounded-lg hover:bg-gray-700 transition-colors">
      <span className="text-xl">{icon}</span>
      {text && <span className="mt-1 text-sm">{text}</span>}
    </Link>
  )

export default Home