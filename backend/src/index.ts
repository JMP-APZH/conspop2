import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { AuthResolver } from "./resolvers/auth";
import { BaseQueryResolver } from "./resolvers/base-query";
import { Container } from "typedi";
import dotenv from "dotenv";
import path from "path";
import { PrismaClient } from "@prisma/client";
import { UserQueries } from "./resolvers/user-queries";
import cors from 'cors';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const prisma = new PrismaClient();

// Register instances for dependency injection
Container.set(PrismaClient, prisma);
// Container.set(AuthResolver, new AuthResolver());
// Container.set(BaseQueryResolver, new BaseQueryResolver());

Container.set(BaseQueryResolver, new BaseQueryResolver(Container.get(PrismaClient)));
Container.set(AuthResolver, new AuthResolver(Container.get(PrismaClient)));
Container.set(UserQueries, new UserQueries(Container.get(PrismaClient)));

async function bootstrap() {
  try {
    // Build TypeGraphQL schema
    const schema = await buildSchema({
      resolvers: [AuthResolver, BaseQueryResolver, UserQueries],
      container: Container,
      validate: true,
    });

    // Create Apollo Server
    const server = new ApolloServer({
      cors: {
        origin: [
          'http://localhost:3000', // Next.js frontend
          'https://studio.apollographql.com' // For GraphQL IDE in development
        ],
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization'],
        methods: ['GET', 'POST', 'OPTIONS']
      },
      schema,
      context: ({ req }) => { 
        // 1. Get the authorization header
        const authHeader = req.headers.authorization || '';
        const token = authHeader.replace('Bearer ', '');

        // 2. Initialize context with prisma (keep your existing setup)
        const ctx = { prisma, user: null };

        // 3. Verify JWT if token exists
        if (token) {
          try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET!);
            ctx.user = decoded; // Add user to context
          } catch (error) {
            console.warn('Invalid token:', error);
            // Don't throw here - let resolvers handle auth as needed
          }
        }

        return ctx;
      },
      introspection: process.env.NODE_ENV !== "production",
      formatError: (error) => {
        console.error(error);
        return error;
      },
      cors: {
        origin: 'http://localhost:3000', // frontend URL
        credentials: true
      }
    });

    // Start server
    const { url } = await server.listen(4000);
    console.log(`🚀 Server running at ${url}`);

    process.on("SIGTERM", async () => {
      await prisma.$disconnect();
      process.exit(0);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

bootstrap();