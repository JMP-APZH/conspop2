import { ReactNode } from 'react';
import Navbar from './Navbar';
import './globals.css'

interface PublicLayoutProps {
  children: ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <main className="pb-16 md:pb-0">
        {/* Public pages content - no authentication required */}
        {children}
      </main>
    </div>
  );
}