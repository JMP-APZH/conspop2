import { PrismaClient, Prisma } from '@prisma/client';
import { VotingMethods } from './lib/voting-methods';

const prisma = new PrismaClient();

// Type definitions (keeping yours and adding new ones)
interface CreateSessionInput {
  title: string;
  ideas: string[];
  maxPriorities?: number;
}

interface SubmitVoteInput {
  sessionId: string;
  voterId: string;
  scores?: Record<string, number>; // Made optional for backward compatibility
  votes?: Array<{ ideaId: string; score?: number; rank?: number }>; // New format
  method?: 'SCORE' | 'RANKED_CHOICE' | 'BORDA_COUNT' | 'CONDORCET'; // Added method
}

interface GetResultsInput {
  sessionId: string;
  method?: 'SCORE' | 'RANKED_CHOICE' | 'BORDA_COUNT' | 'CONDORCET'; // Added method
}

interface IdeaResult {
  ideaId: string;
  title: string;
  score?: number;
  points?: number;
  percentage?: number;
  rank?: number;
}

// Helper function to check if object is record with string keys (kept from your code)
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
      { sessionId, voterId, scores, votes, method = 'SCORE' }: SubmitVoteInput
    ) => {
      // Backward compatibility: convert old scores format to new votes format
      const voteData = votes || (scores ? Object.entries(scores).map(([ideaId, score]) => ({
        ideaId,
        score,
        rank: undefined
      })) : [];

      // Validate based on method
      if (method === 'SCORE') {
        voteData.forEach(vote => {
          if (vote.score === undefined) {
            throw new Error('Score voting requires score for each vote');
          }
        });
      } else {
        voteData.forEach(vote => {
          if (vote.rank === undefined) {
            throw new Error('Ranked methods require rank for each vote');
          }
        });
      }

      // Store votes in database (updated format)
      await prisma.vote.createMany({
        data: voteData.map(vote => ({
          sessionId,
          voterId,
          ideaId: vote.ideaId,
          score: vote.score,
          rank: vote.rank,
          method,
        })),
      });

      return true;
    },
  },
  Query: {
    getResults: async (
      _: unknown, 
      { sessionId, method = 'SCORE' }: GetResultsInput
    ): Promise<IdeaResult[]> => {
      const [votes, ideas] = await Promise.all([
        prisma.vote.findMany({ 
          where: { sessionId },
          select: { 
            voterId: true,
            ideaId: true,
            score: true,
            rank: true,
            method: true
          }
        }),
        prisma.idea.findMany({ 
          where: { sessionId },
          select: { id: true, title: true }
        }),
      ]);

      // Convert votes to common format
      const normalizedVotes = votes.map(vote => ({
        userId: vote.voterId,
        ideaId: vote.ideaId,
        score: vote.score ?? undefined,
        rank: vote.rank ?? undefined
      }));

      // Apply the selected voting method
      let results;
      switch (method) {
        case 'SCORE':
          results = VotingMethods.scoreVoting(ideas, normalizedVotes);
          break;
        case 'RANKED_CHOICE':
          results = VotingMethods.rankedChoiceVoting(ideas, normalizedVotes);
          break;
        case 'BORDA_COUNT':
          results = VotingMethods.bordaCount(ideas, normalizedVotes);
          break;
        case 'CONDORCET':
          const condorcetWinner = VotingMethods.condorcetVoting(ideas, normalizedVotes);
          results = condorcetWinner ? [condorcetWinner] : ideas.map(i => ({ ...i, score: 0 }));
          break;
        default:
          throw new Error('Invalid voting method');
      }

      // Format results for backward compatibility
      return results.map((result, index) => ({
        ideaId: result.id,
        title: result.title,
        score: 'score' in result ? result.score : undefined,
        points: 'points' in result ? result.points : undefined,
        percentage: 'percentage' in result ? result.percentage : undefined,
        rank: index + 1
      }));
    },

    // New query to get all methods' results
    getAllResults: async (
      _: unknown,
      { sessionId }: { sessionId: string }
    ) => {
      const methods: ('SCORE' | 'RANKED_CHOICE' | 'BORDA_COUNT' | 'CONDORCET')[] = [
        'SCORE', 'RANKED_CHOICE', 'BORDA_COUNT', 'CONDORCET'
      ];
      
      return Promise.all(
        methods.map(method => 
          resolvers.Query.getResults(_, { sessionId, method })
            .then(results => ({ method, results }))
        )
      );
    }
  },
};

export default resolvers;