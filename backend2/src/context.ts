import { PrismaClient, Role } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { IncomingMessage } from 'http';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET!;

export interface Context {
  prisma: PrismaClient;
  userId?: string;
  userRole?: Role;
}

export const createContext = async ({ req }: { req: IncomingMessage }): Promise<Context> => {
  // Safely extract and process the authorization header
  const authHeader = req.headers.authorization;
  let token = '';

  if (authHeader) {
    if (Array.isArray(authHeader)) {
      // Take the first authorization header if multiple exist
      token = authHeader[0].split(' ')[1] || '';
    } else {
      token = authHeader.split(' ')[1] || '';
    }
  }

  try {
    if (token) {
      const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; role: Role };
      return { 
        prisma, 
        userId: decoded.userId, 
        userRole: decoded.role 
      };
    }
  } catch (error) {
    console.error('Token verification failed:', error);
  }

  return { prisma };
};