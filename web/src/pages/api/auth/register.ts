// web/src/pages/api/auth/register.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { registerUser } from '../../../backend/lib/auth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { user, token } = await registerUser(req.body);
    return res.status(200).json({ user, token });
  } catch (error: any) {
    return res.status(400).json({ 
      message: error.message || 'Registration failed' 
    });
  }
}