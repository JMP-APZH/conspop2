import { Role as PrismaRole } from '@prisma/client';
import jwt from 'jsonwebtoken';

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
    return !!getAuthToken();
  };

  export const getAuthUserRole = (): PrismaRole | null => {
    const token = getAuthToken();
    if (!token) return null;
    
    try {
      const decoded = jwt.decode(token) as { role?: PrismaRole };
      return decoded?.role || null;
    } catch {
      return null;
    }
  };