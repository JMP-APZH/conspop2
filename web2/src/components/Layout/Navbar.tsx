import Link from 'next/link';
import { useRouter } from 'next/router';
import { FiHome, FiInfo, FiMail, FiUser } from 'react-icons/fi';
import { RiSurveyFill } from 'react-icons/ri';
import { SiLimesurvey } from "react-icons/si";
import { AiOutlineLogin, AiOutlineLogout } from "react-icons/ai";
import { isAuthenticated } from '../../lib/auth';
import { useApolloClient } from '@apollo/client';
import { removeAuthToken } from '../../lib/auth';
import { ReactNode } from 'react';
import './globals.css'

interface NavLinkProps {
  href: string;
  icon: ReactNode;
  text?: string;
}

const NavLink = ({ href, icon, text = '' }: NavLinkProps) => {
  const router = useRouter();
  const isActive = router.pathname === href;
  const activeClass = isActive ? 'bg-yellow-300 text-gray-800' : 'hover:bg-gray-700';

  return (
    <Link 
      href={href} 
      className={`flex flex-col items-center mx-2 md:mx-4 p-2 rounded-lg transition-colors duration-300 ${activeClass}`}
    >
      <span className="text-xl">{icon}</span>
      {text && <span className="mt-1 text-sm">{text}</span>}
    </Link>
  );
}

export default function Navbar() {
  const router = useRouter();
  const client = useApolloClient();
  const authenticated = isAuthenticated();

  const handleLogout = () => {
    removeAuthToken();
    client.resetStore();
    router.push('/auth/login');
  };

  return (
    <>
      {/* Desktop Navigation (Top) */}
      <nav className="hidden md:flex justify-center items-center p-4 bg-gray-800 text-yellow-300">
        <NavLink href="/" icon={<FiHome />} text="A Kay" />
        <NavLink href="/surveys" icon={<RiSurveyFill />} text="Avi a zot'" />
        <NavLink href="/results" icon={<SiLimesurvey />} text="Rézulta tout' moun'" />
        {authenticated && <NavLink href="/profile" icon={<FiUser />} text="Pwofil aw'" />}
        <NavLink href="/about" icon={<FiInfo />} text="Sa ou pou sav'" />
        <NavLink href="/contact" icon={<FiMail />} text="Késyon ? Pa ézité !" />
        {authenticated ? (
          <button 
            onClick={handleLogout}
            className="flex flex-col items-center mx-2 md:mx-4 p-2 rounded-lg hover:bg-gray-700 transition-colors duration-300"
          >
            <span className="text-xl"><AiOutlineLogout /></span>
            <span className="mt-1 text-sm">Dékonekté</span>
          </button>
        ) : (
          <NavLink href="/auth/login" icon={<AiOutlineLogin />} text="Konèkté" />
        )}
      </nav>

      {/* Mobile Navigation (Bottom) - Fixed */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 flex justify-around items-center p-3 bg-gray-800 border-t border-gray-700 text-yellow-300">
        <NavLink href="/" icon={<FiHome />} />
        <NavLink href="/surveys" icon={<RiSurveyFill />} />
        <NavLink href="/results" icon={<SiLimesurvey />} />
        {authenticated && <NavLink href="/profile" icon={<FiUser />} />}
        <NavLink href="/about" icon={<FiInfo />} />
        <NavLink href="/contact" icon={<FiMail />} />
        {authenticated ? (
          <button 
            onClick={handleLogout}
            className="p-2 rounded-lg hover:bg-gray-700 transition-colors duration-300"
          >
            <AiOutlineLogout size={24} />
          </button>
        ) : (
          <NavLink href="/auth/login" icon={<AiOutlineLogin />} />
        )}
      </nav>
    </>
  );
}