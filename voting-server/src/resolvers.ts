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

interface UserVerification {
  exists: boolean;
  email?: string;
  name?: string;
}

interface VoteData {
  ideaId: string;
  score?: number;
  rank?: number;
}

// Helper function to check if object is record with string keys (kept from your code)
function isJsonObject(obj: unknown): obj is Record<string, unknown> {
  return typeof obj === 'object' && obj !== null && !Array.isArray(obj);
}

async function verifyUser(userId: string): Promise<UserVerification> {
  try {
    const response = await fetch(process.env.BACKEND2_URL + '/graphql', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.SERVICE_TOKEN}`
      },
      body: JSON.stringify({
        query: `
          query VerifyUser($userId: ID!) {
            verifyUser(userId: $userId) {
              exists
              email
              name
            }
          }
        `,
        variables: { userId }
      })
    });

    const { data, errors } = await response.json();
    if (errors) throw new Error(errors[0].message);
    return data.verifyUser;
  } catch (error) {
    console.error('User verification failed:', error);
    return { exists: false };
  }
}

async function withErrorHandling<T>(
  fn: (...args: any[]) => Promise<T>,
  ...args: any[]
): Promise<T> {
  try {
    return await fn(...args);
  } catch (error) {
    console.error('Resolver error:', error);
    throw new Error(
      error instanceof Error ? error.message : 'Internal server error'
    );
  }
}

const resolvers = {
  JSON: {
    serialize: (value: unknown) => value,
    parseValue: (value: unknown) => value,
  },
  Mutation: {
    createSession: async (...args) => withErrorHandling(async () => {
      const [_, { title, ideas, maxPriorities = 15 }] = args;
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
    }, ...args),

    submitVote: async (...args) => withErrorHandling(async () => {
      const [_, { sessionId, voterId, scores, votes, method = 'SCORE' }] = args;
      const userInfo = await verifyUser(voterId);
      if (!userInfo.exists) throw new Error('Invalid user credentials');

      const voteData: VoteData[] = votes || (scores ? Object.entries(scores).map(([ideaId, score]) => ({
        ideaId, score, rank: undefined
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
          userEmail: userInfo.email, // Cache user info
          userName: userInfo.name,
          ideaId: vote.ideaId,
          score: vote.score,
          rank: vote.rank,
          method,
        })),
      });

      return true;
    }, ...args),
  },

  Query: {
    getResults: async (...args) => withErrorHandling(async () => { 
      const [_, { sessionId, method = 'SCORE' }] = args;

      const [votes, ideas] = await Promise.all([
        prisma.vote.findMany({ 
          where: { sessionId },
          select: {
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
    }, ...args),

    // New query to get all methods' results
    getAllResults: async (...args) => withErrorHandling(async () => {
      const [_, { sessionId }] = args;
      const methods = ['SCORE', 'RANKED_CHOICE', 'BORDA_COUNT', 'CONDORCET'] 
    as const;
      
      return Promise.all(
        methods.map(method => 
          resolvers.Query.getResults(_, { sessionId, method })
            .then(results => ({ method, results }))
        )
      );
    }, ...args)
  },
};

export default resolvers;