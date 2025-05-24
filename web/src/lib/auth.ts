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

    // First try to verify normally (catches expiration)
    const response = await fetch('/api/verify-token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token })
    });

    if (!response.ok) throw new Error('Token invalid');

    return await response.json();

    // // Decode token without verification (for frontend-only use)
    // const base64Payload = token.split('.')[1];
    // const payload = JSON.parse(atob(base64Payload)) as JwtPayload;
    
    // // Validate required fields
    // if (!payload.userId || !payload.email || !payload.role) {
    //   throw new Error('Invalid token payload');
    // }

    // // Validate role type
    // if (payload.role !== 'USER' && payload.role !== 'ADMIN') {
    //   throw new Error('Invalid user role');
    // }

    // return {
    //   id: payload.userId,
    //   email: payload.email,
    //   role: payload.role,
    //   firstName: payload.firstName,
    //   lastName: payload.lastName,
    //   cityOfOrigin: payload.cityOfOrigin,
    //   currentCity: payload.currentCity,
    //   createdAt: payload.createdAt
    // };
  } catch (error) {
    console.error('Token verification failed:', error);
    throw new Error('Invalid token');
  }
}

// Helper function for admin checks
export function isAdmin(user: VerifiedUser | null): boolean {
  return user?.role === 'ADMIN';
}