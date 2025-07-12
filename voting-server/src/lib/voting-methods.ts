import { PrismaClient, Prisma } from '@prisma/client';
import type { Idea as PrismaIdea } from '@prisma/client';

const prisma = new PrismaClient();

// Type definitions (keeping yours and adding new ones)
interface CreateSessionInput {
  title: string;
  ideas: string[];
  maxPriorities?: number;
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

interface VotingMethodResult extends PrismaIdea {
  score?: number;
  points?: number;
  percentage?: number;
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
  winners: Idea[];
}

interface ResolverArgs<T> {
  _: unknown;
  args: T;
  context: any;
  info: any;
}

interface Idea {
  id: string;
  title: string;
  // description: string; // Non-nullable
  description: string | null; // Make this match Prisma's type
}

export const VotingMethods = {
  /**
   * Score Voting - Averages all scores for each idea
   */
  scoreVoting(ideas: PrismaIdea[], votes: NormalizedVote[]): VotingMethodResult[] {
    const ideaScores = new Map<string, { sum: number; count: number }>();
    
    // Sum all scores for each idea
    votes.forEach(vote => {
      if (vote.score !== undefined) {
        const current = ideaScores.get(vote.ideaId) || { sum: 0, count: 0 };
        ideaScores.set(vote.ideaId, {
          sum: current.sum + vote.score,
          count: current.count + 1
        });
      }
    });

    // Calculate averages and return sorted results
    return ideas.map(idea => {
      const scoreData = ideaScores.get(idea.id);
      const averageScore = scoreData ? scoreData.sum / scoreData.count : 0;
      return {
        ...idea,
        score: averageScore,
        percentage: scoreData ? (averageScore / 10) * 100 : 0 // Assuming 10-point scale
      };
    }).sort((a, b) => (b.score || 0) - (a.score || 0)); // Sort high to low
  },

  /**
   * Ranked Choice Voting - Counts first-choice votes
   */
  rankedChoiceVoting(ideas: PrismaIdea[], votes: NormalizedVote[]): VotingMethodResult[] {
    // Count how many times each idea was ranked first
    const firstChoiceCounts = votes
      .filter(vote => vote.rank === 1)
      .reduce((countMap, vote) => {
        countMap.set(vote.ideaId, (countMap.get(vote.ideaId) || 0) + 1);
        return countMap;
      }, new Map<string, number>());

    return ideas.map(idea => ({
      ...idea,
      points: firstChoiceCounts.get(idea.id) || 0,
      percentage: firstChoiceCounts.get(idea.id) 
        ? (firstChoiceCounts.get(idea.id)! / votes.length) * 100 
        : 0
    })).sort((a, b) => (b.points || 0) - (a.points || 0));
  },

  /**
   * Borda Count - Gives points based on ranking position
   */
  bordaCount(ideas: PrismaIdea[], votes: NormalizedVote[]): VotingMethodResult[] {
    const ideaPoints = new Map<string, number>();
    const maxRank = Math.max(...votes.map(v => v.rank || 0), 0);

    votes.forEach(vote => {
      if (vote.rank !== undefined) {
        // Higher ranks get more points (1st place gets max points)
        const points = maxRank - vote.rank + 1;
        ideaPoints.set(vote.ideaId, (ideaPoints.get(vote.ideaId) || 0) + points);
      }
    });

    return ideas.map(idea => ({
      ...idea,
      points: ideaPoints.get(idea.id) || 0
    })).sort((a, b) => (b.points || 0) - (a.points || 0));
  },

  /**
   * Condorcet Method - Finds an idea that beats all others in pairwise comparisons
   */
  condorcetVoting(ideas: PrismaIdea[], votes: NormalizedVote[]): VotingMethodResult | null {
    // Group votes by user to analyze each voter's preferences
    const votesByUser = votes.reduce((userMap, vote) => {
      const userVotes = userMap.get(vote.userId) || [];
      userVotes.push(vote);
      userMap.set(vote.userId, userVotes);
      return userMap;
    }, new Map<string, NormalizedVote[]>());

    // Initialize pairwise comparison matrix
    const pairwiseResults = new Map<string, Map<string, number>>();
    ideas.forEach(idea1 => {
      const innerMap = new Map<string, number>();
      ideas.forEach(idea2 => {
        if (idea1.id !== idea2.id) innerMap.set(idea2.id, 0);
      });
      pairwiseResults.set(idea1.id, innerMap);
    });

    // Count how many times each idea beats others in pairwise comparisons
    votesByUser.forEach(userVotes => {
      // Sort by rank to get preference order
      const rankedVotes = [...userVotes].sort((a, b) => (a.rank || 0) - (b.rank || 0));
      
      // Compare each idea with every idea ranked below it
      for (let i = 0; i < rankedVotes.length; i++) {
        for (let j = i + 1; j < rankedVotes.length; j++) {
          const preferredId = rankedVotes[i].ideaId;
          const otherId = rankedVotes[j].ideaId;
          pairwiseResults.get(preferredId)?.set(otherId, 
            (pairwiseResults.get(preferredId)?.get(otherId) || 0) + 1);
        }
      }
    });

    // Check for a Condorcet winner (beats all others in pairwise comparisons)
    for (const [ideaId, comparisons] of pairwiseResults) {
      const isCondorcetWinner = Array.from(comparisons.values()).every(count => count > 0);
      if (isCondorcetWinner) {
        const winner = ideas.find(i => i.id === ideaId);
        return winner ? { ...winner, score: 1 } : null;
      }
    }

    return null; // No Condorcet winner found
  }
};

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

// 1. First, define a type for the return value
type SessionWithIdeas = Prisma.VotingSessionGetPayload<{
  include: { ideas: true }
}>;

// 2. Update the handler to use this type
const createSessionHandler = async ({
  args: { title, ideas, maxPriorities = 15 }
}: CreateSessionArgs): Promise<SessionWithIdeas> => {
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
      voterId,
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
  
  // Transform ideas to match expected type
  const votingIdeas = ideas.map(idea => ({
    ...idea,
    description: idea.description || ""
  }));

  // Apply the selected voting method
  let results;
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
      results = condorcetWinner ? [condorcetWinner] : ideas.map(i => ({ ...i, score: 0, points: 0,
      percentage: 0 }));
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
      score: 'score' in result ? Number(result.score) : undefined,
      points: 'points' in result ? Number(result.points) : undefined,
      percentage: 'percentage' in result ? Number(result.percentage) : undefined,
      rank: index + 1
    })),
    winners: results.filter(r => 'rank' in r && r.rank === 1)
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

  // 3. Update the resolver to use the concrete type
  Mutation: {
    createSession: async (_: unknown, args: CreateSessionInput, context: any, info: any) => 
      withErrorHandling<CreateSessionArgs, SessionWithIdeas>(
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