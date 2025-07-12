import 'reflect-metadata';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { buildSchema } from 'type-graphql';
import { AuthResolver } from './auth/auth.resolver';
import { createContext } from './context';
import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import 'dotenv/config';

async function bootstrap() {
  const schema = await buildSchema({
    resolvers: [AuthResolver],
    authChecker: ({ context }) => !!context.userId,
  });

  const app = express();
  
  // Apply bodyParser FIRST as top-level middleware
  app.use(express.json()); // <-- This is the critical change
  
  const server = new ApolloServer({ 
    schema,
    // Include these for better error handling
    formatError: (error) => {
      console.error(error);
      return error;
    },
  });

  await server.start();

  const corsOptions = {
    origin: ['http://localhost:3000'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
  };
  
  app.use(
    '/graphql',
    cors(corsOptions),
    // Remove bodyParser.json() from here since it's already applied globally
    expressMiddleware(server, {
      context: async ({ req }) => createContext({ req })
    })
  );

  const PORT = 4001;
  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
  });
}

bootstrap().catch(err => console.error(err));