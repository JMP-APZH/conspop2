// web/src/lib/auth.ts
interface JwtPayload {
  userId: string;
  email: string;
  role: 'USER' | 'ADMIN';
  firstName?: string;
  lastName?: string;
  cityOfOrigin?: string;
  currentCity?: string;
  createdAt?: string;
}

export interface VerifiedUser {
  id: string;
  email: string;
  role: 'USER' | 'ADMIN';
  firstName?: string;
  lastName?: string;
  cityOfOrigin?: string;
  currentCity?: string;
  createdAt?: string;
}

export async function verifyToken(token: string): Promise<VerifiedUser> {
  try {
    const response = await fetch('/api/verify-token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token })
    });

    if (!response.ok) {
      throw new Error(`Token verification failed: ${response.status}`);
    }

    const data = await response.json();
    
    // Validate response structure
    if (!data.id || !data.email || !data.role) {
      throw new Error('Invalid user data from server');
    }

    return data;
  } catch (error) {
    console.error('Token verification failed:', error);
    throw new Error('Invalid token');
  }
}

export function isAdmin(user: VerifiedUser | null): boolean {
  return user?.role === 'ADMIN';
}

// Secure token storage with cookie fallback
export async function getCurrentUser(): Promise<VerifiedUser | null> {
  if (typeof window === 'undefined') return null; // SSR safety

  try {
    const token = getToken();
    if (!token) return null;
    
    return await verifyToken(token);
  } catch (error) {
    console.error('Failed to get current user:', error);
    clearToken(); // Auto-clear invalid tokens
    return null;
  }
}

// Token management helpers
export function getToken(): string | null {
  // Prefer cookies for security
  if (typeof document !== 'undefined') {
    const cookie = document.cookie
      .split('; ')
      .find(row => row.startsWith('token='));
    if (cookie) return cookie.split('=')[1];
  }
  // Fallback to localStorage (less secure)
  return localStorage.getItem('token');
}

export function storeToken(token: string, rememberMe = false): void {
  if (typeof document !== 'undefined') {
    // Store in cookie with HttpOnly flag in production
    document.cookie = `token=${token}; path=/; ${
      rememberMe ? `max-age=${30 * 24 * 60 * 60};` : ''
    }${process.env.NODE_ENV === 'production' ? ' Secure; HttpOnly; SameSite=Strict' : ''}`;
  }
  // Fallback to localStorage
  localStorage.setItem('token', token);
}

export function clearToken(): void {
  if (typeof document !== 'undefined') {
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  }
  localStorage.removeItem('token');
}