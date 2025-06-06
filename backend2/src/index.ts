import 'reflect-metadata';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { buildSchema } from 'type-graphql';
import { AuthResolver } from './auth/auth.resolver';
import { createContext } from './context';
import { Request } from 'express';
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
  const server = new ApolloServer({ schema });

  await server.start();

  const corsOptions = {
    origin: ['http://localhost:3000'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
  };
  
  app.use(
    '/graphql',
    cors(corsOptions),
    bodyParser.json(),
    expressMiddleware(server, {
      context: async ({ req }) => createContext({ req })
    })
  );

  const PORT = 4000;
  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
  });
}

bootstrap().catch(err => console.error(err));