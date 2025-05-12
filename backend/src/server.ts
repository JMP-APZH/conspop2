import { createYoga } from 'graphql-yoga';
import { createServer } from 'http';
import { schema } from './graphql/schema';
// import { PrismaClient } from '../node_modules/@prisma/client'
import { PrismaClient } from '../node_modules/.prisma/client'
import { verifyToken } from './lib/auth';



// Initialize Prisma Client with logging
const prisma = new PrismaClient({
  log: [
    { level: 'warn', emit: 'event' },
    { level: 'info', emit: 'event' },
    { level: 'error', emit: 'event' },
    { level: 'query', emit: 'event' }
  ]
})

// Advanced query logging
prisma.$on('query', (e: {
  timestamp: Date
  query: string
  params: string
  duration: number
  target: string
}) => {
  console.log('\n--- Prisma Query ---')
  console.log('Query:', e.query)
  console.log('Params:', e.params)
  console.log(`Duration: ${e.duration}ms`)
  console.log('-------------------\n')
})

// Error logging
prisma.$on('error', (e: {
  timestamp: Date
  message: string
  target: string
}) => {
  console.error('\n--- Prisma Error ---')
  console.error('Message:', e.message)
  console.error('Target:', e.target)
  console.error('Timestamp:', e.timestamp)
  console.error('-------------------\n')
})

const yoga = createYoga({
  schema,
  context: async ({ request }) => {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    let user = null;

    if (token) {
      user = await verifyToken(token);
    }

    return { prisma, user };
  },
  cors: {
    origin: ['http://localhost:3000'], // Next.js dev server
    credentials: true
  }
});

const server = createServer(yoga);

const port = process.env.PORT || 4000;
server.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}/graphql`);
});

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  server.close();
  process.exit(0);
});