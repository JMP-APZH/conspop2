import { PrismaClient } from "@prisma/client";
import { User } from '@prisma/client';

export interface ApolloContext {
  prisma: PrismaClient;
  user?: {
    userId: string;
    [key: string]: any; // additional JWT claims
  };
}