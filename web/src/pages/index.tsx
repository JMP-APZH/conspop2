import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { FiHome, FiInfo, FiMail, FiClipboard, FiUser } from 'react-icons/fi'

const Home: NextPage = () => {
  return (
    <div className="min-h-screen bg-yellow-300 text-white">
      <Head>
        <title>Consultation Populaire 972</title>
        <meta name="description" content="Sociological survey platform" />
      </Head>

      {/* Desktop Navigation (Top) */}
      <nav className="hidden md:flex justify-center items-center p-4 bg-gray-800 text-yellow-300">
        <NavLink href="/" icon={<FiHome />} text="Home" />
        <NavLink href="/about" icon={<FiInfo />} text="About" />
        <NavLink href="/contact" icon={<FiMail />} text="Contact" />
        <NavLink href="/surveys" icon={<FiClipboard />} text="Surveys" />
        <NavLink href="/profile" icon={<FiUser />} text="Profile" />
      </nav>

      {/* Mobile Navigation (Bottom) - Fixed */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 flex justify-around items-center p-3 bg-gray-800 border-t border-gray-700 text-yellow-300">
        <NavLink href="/" icon={<FiHome />} />
        <NavLink href="/about" icon={<FiInfo />} />
        <NavLink href="/contact" icon={<FiMail />} />
        <NavLink href="/surveys" icon={<FiClipboard />} />
        <NavLink href="/profile" icon={<FiUser />} />
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16 md:py-24">
        <div>
          <h1 className="font-bold text-center bg-red-800 p-2 md:text-sm lg:text-4xl">Kontan Wè Zot'</h1>
          <h1 className="font-bold text-center bg-red-800 mb-4 pb-2 md:text-sm lg:text-4xl">Lyannaj' pou fè péyi a vansé</h1>
        </div>
        <h1 className="font-bold text-center bg-green-800 md:text-sm lg:text-4xl">Consultation Populaire - Ed. Martinique</h1>
        <h1 className="font-bold italic text-center mb-4 bg-green-800 p-2 md:text-sm lg:text-4xl">Bienvenu-e-s à notre expérience sociale pour la Martinique</h1>
        {/* <p className="text-xl text-center text-gray-300 max-w-2xl mx-auto">
          Participate in sociological studies and view community results to understand collective priorities.
        </p> */}
        <p className="font-bold text-center italic mx-auto bg-black p-2 md:text-sm lg:text-xl">
          En participant à cette expérience, vous permettrez à la population Martiniquaise de disposer de ses propres données pour des prises de décision pragmatiques et au plus près des priorités des Martiniquais-es.
        </p>
      </main>
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