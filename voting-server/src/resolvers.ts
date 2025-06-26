import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

// Type definitions
interface CreateSessionInput {
  title: string;
  ideas: string[];
  maxPriorities?: number;
}

interface SubmitVoteInput {
  sessionId: string;
  voterId: string;
  scores: Record<string, number>;
}

interface GetResultsInput {
  sessionId: string;
}

interface IdeaResult {
  ideaId: string;
  title: string;
  score: number;
}

// Helper function to check if object is record with string keys
function isJsonObject(obj: unknown): obj is Record<string, unknown> {
  return typeof obj === 'object' && obj !== null && !Array.isArray(obj);
}

const resolvers = {
  JSON: {
    serialize: (value: unknown) => value,
    parseValue: (value: unknown) => value,
  },
  Mutation: {
    createSession: async (
      _: unknown, 
      { title, ideas, maxPriorities = 15 }: CreateSessionInput
    ) => {
      return prisma.votingSession.create({
        data: {
          title,
          maxPriorities,
          ideas: {
            create: ideas.map((title: string) => ({ title })),
          },
        },
        include: { ideas: true }
      });
    },
    submitVote: async (
      _: unknown, 
      { sessionId, voterId, scores }: SubmitVoteInput
    ) => {
      await prisma.vote.create({
        data: {
          sessionId,
          voterId,
          scores: scores as Prisma.InputJsonValue,
        },
      });
      return true;
    },
  },
  Query: {
    getResults: async (
      _: unknown, 
      { sessionId }: GetResultsInput
    ): Promise<IdeaResult[]> => {
      const [votes, ideas] = await Promise.all([
        prisma.vote.findMany({ 
          where: { sessionId },
          select: { scores: true }
        }),
        prisma.idea.findMany({ 
          where: { sessionId },
          select: { id: true, title: true }
        }),
      ]);

      return ideas.map((idea) => {
        const totalScore = votes.reduce((sum, vote) => {
          if (vote.scores && isJsonObject(vote.scores)) {
            const score = vote.scores[idea.id];
            return sum + (typeof score === 'number' ? score : 0);
          }
          return sum;
        }, 0);
      
        return {
          ideaId: idea.id,
          title: idea.title,
          score: votes.length ? totalScore / votes.length : 0,
        };
      }).sort((a, b) => b.score - a.score);
    },
  },
};

export default resolvers;