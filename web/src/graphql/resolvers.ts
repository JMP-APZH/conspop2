import { PrismaClient, User } from '@prisma/client';
import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';

interface LoginArgs {
  email: string;
  password: string;
}

interface Context {
  prisma: PrismaClient;
  req?: any;
}

interface AuthPayload {
  token: string;
  user: {
    id: string;
    email: string;
    role: string;
  };
}

export const resolvers = {
  Query: {
    currentUser: async (
      _: unknown, 
      __: unknown, 
      { prisma, req }: Context
    ): Promise<User | null> => {
      try {
        // 1. Get authorization header
        const authHeader = req.headers.authorization;
        if (!authHeader) return null;

        // 2. Extract token (format: "Bearer <token>")
        const token = authHeader.split(' ')[1];
        if (!token) return null;

        // 3. Verify JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
        
        // 4. Fetch user from database
        const user = await prisma.user.findUnique({
          where: { id: decoded.userId },
          select: { 
            id: true,
            email: true,
            role: true,
            firstName: true,
            lastName: true,
            cityOfOrigin: true,
            currentCity: true
            // Include other non-sensitive fields
          }
        });

        return user;
      } catch (error) {
        console.error('CurrentUser error:', error);
        return null;
      }
    }
  },
  Mutation: {
    login: async (
      _: unknown,
      { email, password }: LoginArgs,
      { prisma }: Context
    ): Promise<AuthPayload> => {
      const user = await prisma.user.findUnique({ 
        where: { email },
        select: { id: true, email: true, role: true, password: true }
      });
      
      if (!user) throw new Error('User not found');
      
      const valid = await compare(password, user.password);
      if (!valid) throw new Error('Invalid password');
      
      if (!process.env.JWT_SECRET) {
        throw new Error('JWT secret not configured');
      }

      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );
      
      return {
        token,
        user: {
          id: user.id,
          email: user.email,
          role: user.role
        }
      };
    }
  }
};