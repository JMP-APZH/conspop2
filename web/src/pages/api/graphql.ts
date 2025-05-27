import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { resolvers } from '../../graphql/resolvers';
import { readFileSync } from 'fs';
import path from 'path';
import { PrismaClient } from '@prisma/client';

// 1. Initialize Prisma Client with logging
const prisma = new PrismaClient({
  log: [
    { level: 'warn', emit: 'event' },
    { level: 'error', emit: 'event' },
    { level: 'query', emit: 'event' }
  ],
});

// 2. Add Prisma error logging
prisma.$on('warn', (e) => {
  console.warn('Prisma Warning:', e);
});

prisma.$on('error', (e) => {
  console.error('Prisma Error:', e);
});

prisma.$on('query', (e) => {
  console.log('Prisma Query:', e.query, 'Params:', e.params);
});

// 3. Test database connection immediately
prisma.$connect()
  .then(() => console.log('Database connected successfully'))
  .catch((err) => {
    console.error('Database connection error:', err);
    process.exit(1);
  });

// 4. Read GraphQL schema
const typeDefs = readFileSync(
  path.join(process.cwd(), 'src/graphql/schema.graphql'),
  'utf8'
);

// 5. Configure Apollo Server with error handling
const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: (error) => {
    console.error('GraphQL Error:', error);
    return {
      message: process.env.NODE_ENV === 'development' 
        ? error.message 
        : 'Internal server error',
      locations: error.locations,
      path: error.path
    };
  },
  plugins: [{
    async requestDidStart() {
      return {
        async didEncounterErrors(context) {
          console.error('GraphQL Errors:', context.errors);
        },
      };
    },
  }],
});

// 6. Export handler with context
export default startServerAndCreateNextHandler(server, {
  context: async (req, res) => ({
    req,
    res,
    prisma // Use the already initialized instance
  }),
});

// 7. Cleanup on server shutdown
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});