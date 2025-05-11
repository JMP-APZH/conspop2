import { registerUser, loginUser, verifyToken } from '../lib/auth';

export const resolvers = {
  Query: {
    currentUser: async (_: any, __: any, context: any) => {
      if (!context.user) return null;
      return context.user;
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