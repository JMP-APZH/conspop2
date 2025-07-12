import { PrismaClient, Prisma } from '@prisma/client';
import { VotingMethods } from './lib/voting-methods';
import type { VotingSession, Idea as PrismaIdea } from '@prisma/client';

const prisma = new PrismaClient();

// Type definitions (keeping yours and adding new ones)
interface CreateSessionInput {
  title: string;
  ideas: string[];
  maxPriorities?: number;
}

interface VotingMethodResult extends PrismaIdea {
  score?: number;
  points?: number;
  percentage?: number;
  rank?: number;
}

interface Vote {
  userId: string;
  ideaId: string;
  score?: number;
  rank?: number;
}

interface NormalizedVote {
  userId: string;
  ideaId: string;
  score?: number;
  rank?: number;
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

interface VotingResult {
  method: string;
  results: IdeaResult[];
  winners: PrismaIdea[];
}

interface ResolverArgs<T> {
  _: unknown;
  args: T;
  context: any;
  info: any;
}

interface Idea extends PrismaIdea {
  id: string;
  title: string;
  // description: string; // Non-nullable
  description: string | null; // Make this match Prisma's type
}

type CreateSessionArgs = ResolverArgs<CreateSessionInput>;
type SubmitVoteArgs = ResolverArgs<SubmitVoteInput>;
type GetResultsArgs = ResolverArgs<GetResultsInput>;
type GetAllResultsArgs = ResolverArgs<{ sessionId: string }>;

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
          query ServiceVerifyUser($userId: String!, $serviceToken: String!) {
            serviceVerifyUser(userId: $userId, serviceToken: $serviceToken) {
              exists
              email
              name
            }
          }
        `,
        variables: { 
          userId,
          serviceToken: process.env.SERVICE_SECRET 
        }
      })
    });

    const { data, errors } = await response.json();
    if (errors) throw new Error(errors[0].message);
    return data.serviceVerifyUser;
  } catch (error) {
    console.error('User verification failed:', error);
    return { exists: false };
  }
}

async function withErrorHandling<T, U>(
  fn: (args: T) => Promise<U>,
  args: T
): Promise<U> {
  try {
    return await fn(args);
  } catch (error) {
    console.error('Resolver error:', error);
    throw new Error(
      error instanceof Error ? error.message : 'Internal server error'
    );
  }
}

// 1. First, simplify the handler's return type
const createSessionHandler = async ({
  args: { title, ideas, maxPriorities = 15 }
}: CreateSessionArgs) => {
  return prisma.votingSession.create({
    data: {
      title,
      maxPriorities,
      ideas: {
        create: ideas.map((title: string) => ({
          title,
          description: ""
        })),
      },
    },
    include: { ideas: true }
  });
};

const submitVoteHandler = async ({
  args: { sessionId, voterId, scores, votes, method = 'SCORE' }
}: SubmitVoteArgs) => {
  const userInfo = await verifyUser(voterId);
  if (!userInfo.exists) throw new Error('Invalid user credentials');

  const voteData: VoteData[] = votes || (scores ? Object.entries(scores).map(([ideaId, score]) => ({
    ideaId, score, rank: undefined
  })) : []);

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
      userId: voterId,  // Changed from voterId to userId
      userEmail: userInfo.email,
      userName: userInfo.name,
      ideaId: vote.ideaId,
      score: vote.score,
      rank: vote.rank,
      method,
    })),
  });

  return true;
};

const getResultsHandler = async ({
  args: { sessionId, method = 'SCORE' }
}: GetResultsArgs): Promise<VotingResult> => {
  const [votes, ideas] = await Promise.all([
    prisma.vote.findMany({ 
      where: { sessionId },
      select: {
        userId: true,
        ideaId: true,
        score: true,
        rank: true,
        method: true
      }
    }),
    prisma.idea.findMany({ 
      where: { sessionId },
      select: { 
        id: true, 
        title: true,
        description: true,
        sessionId: true,
        createdAt: true
      }
    }),
  ]);

  // Convert votes to common format
  const normalizedVotes = votes.map(vote => ({
    userId: vote.userId ?? 'unknown-user',
    ideaId: vote.ideaId ?? '', // Provide fallback for ideaId
    score: vote.score ?? undefined,
    rank: vote.rank ?? undefined
  }));
  
  // // Transform ideas to match expected type
  // const votingIdeas = ideas.map(idea => ({
  //   ...idea,
  //   id: idea.id,
  //   title: idea.title,
  //   description: idea.description || ""
  // }));


  // No transformation needed since we have all fields
  const votingIdeas = ideas;

  // Apply the selected voting method
  let results: VotingMethodResult[];
  switch (method) {
    case 'SCORE':
      results = VotingMethods.scoreVoting(votingIdeas, normalizedVotes);
      break;
    case 'RANKED_CHOICE':
      results = VotingMethods.rankedChoiceVoting(votingIdeas, normalizedVotes);
      break;
    case 'BORDA_COUNT':
      results = VotingMethods.bordaCount(votingIdeas, normalizedVotes);
      break;
    case 'CONDORCET':
      const condorcetWinner = VotingMethods.condorcetVoting(votingIdeas, normalizedVotes);
      results = condorcetWinner ? [condorcetWinner] : ideas.map(i => ({ ...i, score: 0 }));
      break;
    default:
      throw new Error('Invalid voting method');
  }

  // Format results for backward compatibility
  return {
    method,
    results: results.map((result, index) => ({
      ideaId: result.id,
      title: result.title,
      score: result.score,
      points: result.points,
      percentage: result.percentage,
      rank: result.rank ?? index + 1
    })),
    winners: results.filter((r): r is PrismaIdea & { rank: number } => 'rank' in r && r.rank === 1)
  };
};

const getAllResultsHandler = async ({
  args: { sessionId }
}: GetAllResultsArgs): Promise<VotingResult[]> => {
  const methods = ['SCORE', 'RANKED_CHOICE', 'BORDA_COUNT', 'CONDORCET'] as const;
  
  return Promise.all(
    methods.map(method => 
      getResultsHandler({ _: null, args: { sessionId, method }, context: null, info: null })
    )
  );
};


const resolvers = {
  JSON: {
    serialize: (value: unknown) => value,
    parseValue: (value: unknown) => value,
  },

  // 2. Then update the resolver to not expect a nested Promise
  Mutation: {
    createSession: async (_: unknown, args: CreateSessionInput, context: any, info: any) => 
      withErrorHandling(
        createSessionHandler,
        { _, args, context, info }
      ),

    submitVote: async (_: unknown, args: SubmitVoteInput, context: any, info: any) =>
      withErrorHandling<SubmitVoteArgs, boolean>(
        submitVoteHandler,
        { _, args, context, info }
      ),
  },
  Query: {
    getResults: async (_: unknown, args: GetResultsInput, context: any, info: any) =>
      withErrorHandling<GetResultsArgs, VotingResult>(
        getResultsHandler,
        { _, args, context, info }
      ),

    getAllResults: async (_: unknown, args: { sessionId: string }, context: any, info: any) =>
      withErrorHandling<GetAllResultsArgs, VotingResult[]>(
        getAllResultsHandler,
        { _, args, context, info }
      )
  }
};

export default resolvers;