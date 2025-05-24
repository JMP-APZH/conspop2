// web/src/context/AuthContext.tsx
import { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { verifyToken, VerifiedUser } from '../lib/auth'; // Now using local version

// interface User extends VerifiedUser {
//   id: string;
//   email?: string;
//   firstName?: string;
//   lastName?: string;
//   cityOfOrigin?: string;
//   currentCity?: string;
//   createdAt?: string;
//   role: 'USER' | 'ADMIN';
// }

interface AuthContextType {
  user: VerifiedUser | null;
  loading: boolean;
  setUser: (user: VerifiedUser | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  setUser: () => {},
  logout: () => {}
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<VerifiedUser | null>(null);
  const [loading, setLoading] = useState(true);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    setUser(null);
  }, []);

  const verifyAuth = useCallback(async () => {
    console.log('Starting auth verification');
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      console.log('Token found:', !!token);
      
      if (!token) throw new Error('No token');
      
      // if (!token) {
      //   logout();
      //   return;
      // }

      const userData = await verifyToken(token);
      console.log('User data from verifyToken:', userData);

      // Check userData FIRST before using it
    if (!userData) throw new Error('No user data');
    
    // Then validate role
    if (userData.role !== 'USER' && userData.role !== 'ADMIN') {
      throw new Error(`Invalid role: ${userData.role}`);
    }

      setUser({
        id: userData.id,
        email: userData.email, // Ensure verifyToken returns email
        role: userData.role,
        firstName: userData.firstName,
        lastName: userData.lastName,
        cityOfOrigin: userData.cityOfOrigin,
        currentCity: userData.currentCity,
        createdAt: userData.createdAt,
      });
      console.log('Auth successful, user set:', userData.role);

      localStorage.setItem('userRole', userData.role);
      
    } catch (error) {
      console.error('Auth verification failed:', error);
      logout();

      // Redirect to login if we're on a protected page
      if (typeof window !== 'undefined' && 
        window.location.pathname.startsWith('/admin')) {
      window.location.href = '/login2';
    }
    
    } finally {
      console.log('Auth verification complete');
      setLoading(false);
    }
  }, [logout]);

  useEffect(() => {
    verifyAuth();
  }, [verifyAuth]);

  return (
    <AuthContext.Provider value={{ user, loading, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}