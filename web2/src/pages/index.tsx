import type { NextPage } from 'next';
import Link from 'next/link';
import PublicLayout from '../components/Layout/PublicLayout';
import { FiHome, FiInfo, FiMail, FiUser } from 'react-icons/fi';
import { RiSurveyFill } from 'react-icons/ri';
import { SiLimesurvey } from "react-icons/si";
import { AiOutlineLogin } from "react-icons/ai";

const Home: NextPage = () => {
  return (
    <PublicLayout>
      <div className="min-h-screen bg-yellow-300 text-white">
        {/* Main Content */}
        <div className='py-12'>
          <div className="-ml-5 mr-5">
            <h1 className="font-bold text-center bg-red-800 p-2 text-lg md:text-xl lg:text-4xl">
              Kontan Wè Zot'
            </h1>
            <h1 className="font-bold text-center bg-red-800 mb-4 pb-2 text-lg md:text-xl lg:text-4xl">
              Lyannaj' pou fè péyi a vansé
            </h1>
          </div>
          
          <h1 className="font-bold text-center bg-green-800 text-lg md:text-xl lg:text-4xl">
            Consultation Populaire - Ed. Martinique
          </h1>
          <h1 className="font-bold italic text-center mb-4 bg-green-800 p-2 text-lg md:text-xl lg:text-4xl">
            Bienvenu-e-s à notre expérience sociale pour la Martinique
          </h1>

          <div className="ml-5 -mr-5">
            <p className="font-bold text-center italic mx-auto bg-black text-sm md:text-base lg:text-xl">
              En participant à cette expérience, vous permettrez à la population Martiniquaise
            </p>
            <p className="font-bold text-center italic mx-auto bg-black text-sm md:text-base lg:text-xl">
              de disposer de ses propres données pour des prises de décision
            </p>
            <p className="font-bold text-center italic mx-auto bg-black text-sm md:text-base lg:text-xl mb-8">
              pragmatiques et au plus près des priorités des Martiniquais-es.
            </p>
          </div>

          {/* Quick Links Section */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <NavLink 
              href="/surveys" 
              icon={<RiSurveyFill />} 
              text="Avi a zot'" 
            />
            <NavLink 
              href="/results" 
              icon={<SiLimesurvey />} 
              text="Rézulta" 
            />
            <NavLink 
              href="/about" 
              icon={<FiInfo />} 
              text="Sa ou pou sav'" 
            />
            <NavLink 
              href="/auth/login" 
              icon={<AiOutlineLogin />} 
              text="Konèkté" 
            />
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

// NavLink component (moved outside the Home component)
const NavLink = ({ href, icon, text = '' }: { 
  href: string; 
  icon: React.ReactNode; 
  text?: string 
}) => (
  <Link 
    href={href} 
    className="flex flex-col items-center p-4 rounded-lg bg-gray-800 text-yellow-300 hover:bg-gray-700 transition-colors min-w-[120px]"
  >
    <span className="text-2xl">{icon}</span>
    {text && <span className="mt-2 text-sm">{text}</span>}
  </Link>
);

export default Home;