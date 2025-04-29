import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { AuthResolver } from "./resolvers/auth";
import { BaseQueryResolver } from "./resolvers/base-query";
import { Container } from "typedi";
import dotenv from "dotenv";
import path from "path";
import { PrismaClient } from "@prisma/client";

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const prisma = new PrismaClient();

// Register Prisma instance for dependency injection
Container.set(PrismaClient, prisma);

async function bootstrap() {
  try {
    // Build TypeGraphQL schema
    const schema = await buildSchema({
      resolvers: [AuthResolver, BaseQueryResolver],
      container: Container,
      validate: true,
    });

    // Create Apollo Server
    const server = new ApolloServer({
      schema,
      context: () => ({ prisma }),
      introspection: process.env.NODE_ENV !== "production",
      formatError: (error) => {
        console.error(error);
        return error;
      },
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