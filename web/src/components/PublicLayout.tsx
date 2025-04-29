import { ReactNode } from 'react';
// import Navbar from './Navbar';
// import Footer from './Footer';

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-yellow-300 text-white">
      {/* <Navbar /> */}
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      {/* <Footer /> */}
    </div>
  );
}