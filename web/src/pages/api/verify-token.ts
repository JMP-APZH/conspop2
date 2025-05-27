import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.setHeader('Allow', ['POST']).status(405).json({ 
      message: 'Method not allowed' 
    });
  }

  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ message: 'Token is required' });
  }

  try {
    if (!process.env.JWT_SECRET) {
      console.error('JWT secret not configured');
      throw new Error('Server configuration error');
    }

    // Add timeout for verification
    const decoded = await Promise.race([
      jwt.verify(token, process.env.JWT_SECRET),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Verification timeout')), 2000)
      )
    ]) as jwt.JwtPayload;
    
    // Verify required fields
    if (!decoded.userId || !decoded.email || !decoded.role) {
      throw new Error('Invalid token payload');
    }

    res.status(200).json({
      id: decoded.userId,
      email: decoded.email,
      role: decoded.role,
      firstName: decoded.firstName || null,
      lastName: decoded.lastName || null,
    });
  } catch (error) {
    console.error('Token verification failed:', error);
    res.status(401).json({ 
      message: 'Invalid token',
      requiresReauth: error instanceof Error && error.message.includes('expired')
    });
  }
}