// import { Role as PrismaRole } from '@prisma/client';
import { Role } from '../types/roles';
import jwt from 'jsonwebtoken';

// Helper to check if running on client
const isClient = () => typeof window !== 'undefined';

export const setAuthToken = (token: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
    }
  };
  
  export const getAuthToken = (): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  };
  
  export const removeAuthToken = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  };
  
  export const isAuthenticated = (): boolean => {
    // Always return false during SSR
    if (!isClient()) return false;
    return !!getAuthToken();
  };

  export const getAuthUserRole = (): Role | null => {

    // Always return null during SSR
    if (!isClient()) return null;

    const token = getAuthToken();
    if (!token) return null;
    
    try {
      const decoded = jwt.decode(token) as { role?: Role };
      return decoded?.role || null;
    } catch {
      return null;
    }
  };