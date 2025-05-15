import { registerUser, loginUser, verifyToken } from '../lib/auth';

import prisma  from '../lib/prisma';
import { GraphQLError } from 'graphql';

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
    },
    // admindashboard resolvers:
    adminDashboardStats: async (_: any, __: any, context: any) => {
      if (!context.user || context.user.role !== 'ADMIN') {
        throw new GraphQLError('Unauthorized access to admin dashboard', {
          extensions: {
            code: 'FORBIDDEN',
            http: { status: 403 }
          }
        });
      }
      
      try {
        const [totalUsers, newUsersLast24h, newUsersLast7d] = await Promise.all([
          prisma.user.count(),
          prisma.user.count({
            where: {
              createdAt: {
                gte: new Date(Date.now() - 24 * 60 * 60 * 1000)
              }
            }
          }),
          prisma.user.count({
            where: {
              createdAt: {
                gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
              }
            }
          })
        ]);

        return { totalUsers, newUsersLast24h, newUsersLast7d };
      } catch (error) {
        console.error('Admin dashboard stats error:', error);
        throw new GraphQLError('Failed to fetch dashboard statistics', {
          extensions: {
            code: 'INTERNAL_SERVER_ERROR'
          }
        });
      }
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