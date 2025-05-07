import "reflect-metadata";
import { ApolloServer } from "apollo-server-express"; // Changed from apollo-server
import express, { Express } from 'express';
import { buildSchema } from "type-graphql";
import { AuthResolver } from "./resolvers/auth";
import { BaseQueryResolver } from "./resolvers/base-query";
import { Container } from "typedi";
import dotenv from "dotenv";
import path from "path";
import { PrismaClient } from "@prisma/client";
import { UserQueries } from "./resolvers/user-queries";
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import jwt from 'jsonwebtoken';
import cors from 'cors';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

// Verify required environment variables
if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is not set');
}
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set');
}

const prisma = new PrismaClient();

// Register instances for dependency injection
Container.set(PrismaClient, prisma);
Container.set(BaseQueryResolver, new BaseQueryResolver(Container.get(PrismaClient)));
Container.set(AuthResolver, new AuthResolver(Container.get(PrismaClient)));
Container.set(UserQueries, new UserQueries(Container.get(PrismaClient)));

async function bootstrap() {
  const app: Express = express();

  // Security middleware
  app.use(helmet());
  app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
  }));

  // CORS configuration
  app.use(cors({
    origin: [
      'http://localhost:3000', // Your Next.js frontend
      'https://studio.apollographql.com' // GraphQL IDE
    ],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'OPTIONS']
  }));

  try {
    // Build TypeGraphQL schema
    const schema = await buildSchema({
      resolvers: [AuthResolver, BaseQueryResolver, UserQueries],
      container: Container,
      validate: true,
    });

    // Create Apollo Server
    const server = new ApolloServer({
      schema,
      context: ({ req }) => { 
        const authHeader = req.headers.authorization || '';
        const token = authHeader.replace('Bearer ', '');
        const ctx: ApolloContext = { 
          prisma, 
          user: null // Now matches the interface
        };

        if (token) {
          try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
            ctx.user = decoded; // Now properly typed
          } catch (error) {
            console.warn('Invalid token:', error);
            // user remains null
          }
        }
        return ctx;
      },
      introspection: process.env.NODE_ENV !== "production",
      formatError: (error) => {
        console.error(error);
        return error;
      }
    });

    await server.start();
    
    // Apply Apollo middleware to express
    server.applyMiddleware({ 
      app,
      cors: false // Disable Apollo's built-in CORS since we're using express cors
    });

    // Start server
    app.listen(4000, () => {
      console.log(`🚀 Server running at http://localhost:4000${server.graphqlPath}`);
    });

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