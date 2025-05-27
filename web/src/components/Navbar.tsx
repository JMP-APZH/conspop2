// components/Layout/Navbar.tsx
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FiHome, FiInfo, FiMail, FiUser } from 'react-icons/fi';
import { RiSurveyFill } from 'react-icons/ri';
import { SiLimesurvey } from "react-icons/si";
import { AiOutlineLogin } from "react-icons/ai";

export default function Navbar() {
  return (
    <>
      {/* Desktop Navigation (Top) */}
      <nav className="hidden md:flex justify-center items-center p-4 bg-gray-800 text-yellow-300">
        <NavLink href="/" icon={<FiHome />} text="A Kay" />
        <NavLink href="/surveys" icon={<RiSurveyFill />} text="Avi a zot'" />
        <NavLink href="/results" icon={<SiLimesurvey />} text="Rézulta tout' moun'" />
        <NavLink href="/profile" icon={<FiUser />} text="Pwofil aw'" />
        <NavLink href="/about" icon={<FiInfo />} text="Sa ou pou sav'" />
        <NavLink href="/contact" icon={<FiMail />} text="Késyon ? Pa ézité !" />
        <NavLink href="/auth/login" icon={<AiOutlineLogin />} text="Konèkté" />
        <NavLink href="/auth/login2" icon={<AiOutlineLogin />} text="Konèkté2" />
        <NavLink href="/auth/login3" icon={<AiOutlineLogin />} text="Konèkté3" />
        {/* <Link href="/auth/register" className="hover:text-gray-300"> Register</Link> */}
      </nav>

      {/* Mobile Navigation (Bottom) - Fixed */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 flex justify-around items-center p-3 bg-gray-800 border-t border-gray-700 text-yellow-300">
        <NavLink href="/" icon={<FiHome />} />
        <NavLink href="/surveys" icon={<RiSurveyFill />} />
        <NavLink href="/results" icon={<SiLimesurvey />} />
        <NavLink href="/profile" icon={<FiUser />} />
        <NavLink href="/about" icon={<FiInfo />} />
        <NavLink href="/contact" icon={<FiMail />} />
        <NavLink href="/auth/login" icon={<AiOutlineLogin />} />
        <NavLink href="/auth/login2" icon={<AiOutlineLogin />} />
        <NavLink href="/auth/login3" icon={<AiOutlineLogin />} />
      </nav>
    </>
  );
}

// Reusable NavLink component
const NavLink = ({ href, icon, text = '' }: { href: string; icon: React.ReactNode; text?: string }) => {
  const router = useRouter();
  const isActive = router.pathname === href;
  const activeClass = isActive ? 'bg-yellow-300 text-gray-800' : 'hover:bg-gray-700';

  return (
    <Link href={href} className={`flex flex-col items-center mx-2 md:mx-4 p-2 rounded-lg transition-colors duration-300 ${activeClass}`}>
      <span className="text-xl">{icon}</span>
      {text && <span className="mt-1 text-sm">{text}</span>}
    </Link>

  );
}