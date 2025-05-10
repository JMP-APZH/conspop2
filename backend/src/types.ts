import { PrismaClient, User } from '@prisma/client';
import { Request } from 'express';

// Strongly typed JWT payload
export interface JwtPayload {
  userId: string;
  // Add other standard JWT claims if needed
  iat?: number;
  exp?: number;
}

// Enhanced context interface
export interface ApolloContext {
  prisma: PrismaClient;
  req?: Request;
  user?: JwtPayload; // Now strictly typed
}

// // Optional: Type for your GraphQL response
// export interface AuthResponse {
//   user: Omit<User, 'password'>; // Exclude sensitive fields
//   token: string;
// }