import 'reflect-metadata';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { buildSchema } from 'type-graphql';
import { AuthResolver } from './auth/auth.resolver';
import { createContext } from './context';
import { StandaloneServerContextFunctionArgument } from '@apollo/server/standalone';
import { Request } from 'express';

import 'dotenv/config';

async function bootstrap() {
  const schema = await buildSchema({
    resolvers: [AuthResolver],
    authChecker: ({ context }) => !!context.userId,
  });

  const server = new ApolloServer({ schema });

  const { url } = await startStandaloneServer(server, {
    context: async ({ req }: StandaloneServerContextFunctionArgument) => {
      // Convert IncomingMessage to Express Request-like object if needed
      const request = req as unknown as Request;
      return createContext({ req: request });
    },
    listen: { port: 4000 }
  });

  console.log(`🚀 Server ready at ${url}`);
}

bootstrap().catch(err => console.error(err));