import { registerUser, loginUser, verifyToken } from '../lib/auth';

import prisma  from '../lib/prisma';

export const resolvers = {
  Query: {
    currentUser: async (_: any, __: any, context: any) => {
      if (!context.user) return null;
      return context.user;
    },
    users: async () => {
      return prisma.user.findMany({
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          nickname: true,
          cityOfOrigin: true,
          currentCity: true,
          createdAt: true
        },
        orderBy: { createdAt: 'desc' } // Newest first
      });
    },
    user: async (_: any, { id }: { id: string }) => {
      return prisma.user.findUnique({
        where: { id },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          nickname: true,
          cityOfOrigin: true,
          currentCity: true,
          createdAt: true
        }
      });
    }
  },
  Mutation: {
    register: async (_: any, { input }: { input: any }) => {
      try {
        const result = await registerUser(input);
        console.log('Registration result:', result);
        return result;
      } catch (error) {
        console.error('Registration error:', error);
        throw error;
      }
    },
    login: async (_: any, { email, password }: { email: string; password: string }) => {
      const { user, token } = await loginUser(email, password);
      return { user, token };
    }
  }
};