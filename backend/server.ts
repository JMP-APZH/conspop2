import { createYoga } from 'graphql-yoga';
import { createServer } from 'http';
import { schema } from './graphql/schema';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from './lib/auth';

const prisma = new PrismaClient();

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