import { PrismaClient } from '@prisma/client';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const prisma = new PrismaClient();

const resolvers = {
  JSON: {
    serialize: (value: any) => value,
    parseValue: (value: any) => value,
  },
  Mutation: {
    createSession: async (_, { title, ideas }) => {
      const session = await prisma.votingSession.create({
        data: {
          title,
          ideas: {
            create: ideas.map((title: string) => ({ title })),
          },
        },
      });
      return session;
    },
    submitVote: async (_, { sessionId, scores }) => {
      await prisma.vote.create({
        data: {
          sessionId,
          scores,
        },
      });
      return true;
    },
  },
  Query: {
    getResults: async (_, { sessionId }) => {
      const votes = await prisma.vote.findMany({ where: { sessionId } });
      const ideas = await prisma.idea.findMany({ where: { sessionId } });

      // Score Voting: Sum scores per idea
      const results = ideas.map((idea) => {
        const totalScore = votes.reduce((sum, vote) => {
          return sum + (vote.scores[idea.id] || 0);
        }, 0);
        return { ideaId: idea.id, score: totalScore / votes.length }; // Average score
      });

      return results.sort((a, b) => b.score - a.score);
    },
  },
};

export default resolvers;