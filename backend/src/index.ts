import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import express from 'express';
import { Application } from 'express';
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
import { ApolloContext, JwtPayload } from "./types";
import { authenticate } from "./middlewares/auth.middleware";

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

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
  const app: Application = express();

  app.use(helmet());
  app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
  }));

  app.use(cors({
    origin: [
      'http://localhost:3000',
      'https://studio.apollographql.com'
    ],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'OPTIONS']
  }));

  // Add authentication middleware
  app.use(authenticate(prisma));

  try {
    const schema = await buildSchema({
      resolvers: [AuthResolver, BaseQueryResolver, UserQueries],
      container: Container,
      validate: true,
    });

    const server = new ApolloServer({
      schema,
      context: ({ req }) => ({
        prisma,
        user: req.user
      }),
      introspection: process.env.NODE_ENV !== "production",
      formatError: (error) => {
        console.error(error);
        return error;
      }
    });

    await server.start();
    
    server.applyMiddleware({ 
      app,
      cors: false
    });

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