// web/src/context/AuthContext.tsx
import { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { verifyToken, VerifiedUser } from '../lib/auth'; // Now using local version
import jwt from 'jsonwebtoken';

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
  const _setUser = useCallback((userData: VerifiedUser | null) => {
    console.log('[AuthContext] Setting user:', userData);
    setUser(userData);
    console.log('[AuthContext] User state after internal update:', userData); // Added line
  }, []);
  const [loading, setLoading] = useState(true);

  // Updated logout function (replace existing one)
  const logout = useCallback(() => {
    console.log('[AuthContext] Logging out user'); // Optional debug log
    localStorage.removeItem('token');
    _setUser(null);
    if (typeof window !== 'undefined') {
      window.location.href = '/auth/login2'; // Full page reload
    }
  }, [_setUser]); // Keep the dependency

  const verifyAuth = useCallback(async () => {
    console.group('[AuthContext] verifyAuth');
    try {
      const token = localStorage.getItem('token');
      console.log('Token exists:', !!token);
      
      if (!token) {
        console.log('No token - skipping verification');
        return;
      }
  
      const response = await fetch('/api/verify-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token })
      });
  
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
  
      const userData = await response.json();
      console.log('User data received:', userData);
      
      if (!userData?.id) {
        throw new Error('Invalid user data');
      }
  
      _setUser(userData);
    } catch (error) {
      console.error('Verification failed:', error);
      localStorage.removeItem('token');
      _setUser(null);
      
      if (!window.location.pathname.includes('/auth')) {
        console.log('Redirecting to login');
        window.location.href = '/auth/login2';
      }
    } finally {
      console.groupEnd();
      setLoading(false);
    }
  }, [_setUser]);

  useEffect(() => {
    verifyAuth();
  }, [verifyAuth]);

  useEffect(() => {
    console.log('[AuthContext] Current state:', { user, loading });
  }, [user, loading]);

  return (
    <AuthContext.Provider value={{ user, loading, setUser: _setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}