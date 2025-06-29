// voting-server/src/lib/voting-methods.ts

type Vote = {
  userId: string;
  ideaId: string;
  score?: number; // For Score Voting
  rank?: number; // For Ranked Choice/Borda/Condorcet
};

type Idea = {
  id: string;
  title: string;
  description: string;
};

export class VotingMethods {
  /**
   * 1. Score Voting / Dotmocracy
   * Each voter assigns a score to each idea (e.g., 0-5)
   * The idea with the highest average score wins
   */
  static scoreVoting(ideas: Idea[], votes: Vote[]): Idea[] {
    // Group votes by idea
    const ideaScores: Record<string, { sum: number; count: number }> = {};

    ideas.forEach(idea => {
      ideaScores[idea.id] = { sum: 0, count: 0 };
    });

    votes.forEach(vote => {
      if (vote.score !== undefined) {
        ideaScores[vote.ideaId].sum += vote.score;
        ideaScores[vote.ideaId].count += 1;
      }
    });

    // Calculate average scores
    const scoredIdeas = ideas.map(idea => {
      const scoreData = ideaScores[idea.id];
      const average = scoreData.count > 0 ? scoreData.sum / scoreData.count : 0;
      return { ...idea, score: average };
    });

    // Sort by score descending
    return scoredIdeas.sort((a, b) => (b.score || 0) - (a.score || 0));
  }

  /**
   * 2. Ranked Choice (Instant Runoff Voting)
   * Voters rank ideas in order of preference
   * Uses elimination rounds until a majority is found
   */
  static rankedChoiceVoting(ideas: Idea[], votes: Vote[]): Idea[] {
    // Transform votes into rankings per user
    const userRankings: Record<string, { ideaId: string; rank: number }[]> = {};

    votes.forEach(vote => {
      if (!userRankings[vote.userId]) {
        userRankings[vote.userId] = [];
      }
      if (vote.rank !== undefined) {
        userRankings[vote.userId].push({ ideaId: vote.ideaId, rank: vote.rank });
      }
    });

    // Sort each user's rankings
    for (const userId in userRankings) {
      userRankings[userId].sort((a, b) => a.rank - b.rank);
    }

    // Implement IRV logic
    const activeIdeas = new Set(ideas.map(idea => idea.id));
    const ideaNames: Record<string, string> = {};
    ideas.forEach(idea => { ideaNames[idea.id] = idea.title; });

    let winners: Idea[] = [];
    let round = 1;

    while (activeIdeas.size > 0) {
      const roundVotes: Record<string, number> = {};

      // Count first-choice votes for active ideas
      Object.values(userRankings).forEach(rankings => {
        const topChoice = rankings.find(r => activeIdeas.has(r.ideaId));
        if (topChoice) {
          roundVotes[topChoice.ideaId] = (roundVotes[topChoice.ideaId] || 0) + 1;
        }
      });

      // Check for majority
      const totalVotes = Object.values(roundVotes).reduce((sum, count) => sum + count, 0);
      const sorted = [...activeIdeas].map(ideaId => ({
        ideaId,
        votes: roundVotes[ideaId] || 0,
        percentage: totalVotes > 0 ? (roundVotes[ideaId] || 0) / totalVotes * 100 : 0
      })).sort((a, b) => b.votes - a.votes);

      // If a majority exists or we're down to one, return winner
      if (sorted.length === 1 || sorted[0].percentage > 50) {
        const winnerId = sorted[0].ideaId;
        winners = ideas.filter(idea => idea.id === winnerId);
        break;
      }

      // Eliminate the lowest ranked idea
      const lowest = sorted[sorted.length - 1].ideaId;
      activeIdeas.delete(lowest);
      round++;
    }

    return winners;
  }

  /**
   * 3. Borda Count
   * Voters rank ideas, each rank gives points (1st = n-1 points, 2nd = n-2, etc.)
   * The idea with the most points wins
   */
  static bordaCount(ideas: Idea[], votes: Vote[]): Idea[] {
    const ideaPoints: Record<string, number> = {};

    ideas.forEach(idea => {
      ideaPoints[idea.id] = 0;
    });

    // Group votes by user
    const userVotes: Record<string, Vote[]> = {};
    votes.forEach(vote => {
      if (!userVotes[vote.userId]) {
        userVotes[vote.userId] = [];
      }
      userVotes[vote.userId].push(vote);
    });

    // Calculate Borda points for each user's ranking
    Object.values(userVotes).forEach(userVotes => {
      // Sort by rank (1st = highest)
      const sorted = userVotes.filter(v => v.rank !== undefined)
                             .sort((a, b) => (a.rank || 0) - (b.rank || 0));

      const numIdeas = sorted.length;
      sorted.forEach((vote, index) => {
        // Borda count: 1st place gets n-1 points, 2nd gets n-2, etc.
        const points = numIdeas - index - 1;
        ideaPoints[vote.ideaId] += points;
      });
    });

    // Sort ideas by total points
    return [...ideas]
      .map(idea => ({ ...idea, points: ideaPoints[idea.id] }))
      .sort((a, b) => b.points - a.points);
  }

  /**
   * 4. Condorcet Method
   * Voters rank ideas, we compare all head-to-head matchups
   * The idea that beats all others in pairwise comparisons wins
   */
  static condorcetVoting(ideas: Idea[], votes: Vote[]): Idea | null {
    // Create a matrix to store pairwise comparisons
    const pairwise: Record<string, Record<string, number>> = {};
    const ideaIds = ideas.map(idea => idea.id);

    // Initialize matrix
    ideaIds.forEach(id1 => {
      pairwise[id1] = {};
      ideaIds.forEach(id2 => {
        if (id1 !== id2) {
          pairwise[id1][id2] = 0;
        }
      });
    });

    // Group votes by user
    const userRankings: Record<string, { ideaId: string; rank: number }[]> = {};
    votes.forEach(vote => {
      if (!userRankings[vote.userId]) {
        userRankings[vote.userId] = [];
      }
      if (vote.rank !== undefined) {
        userRankings[vote.userId].push({ ideaId: vote.ideaId, rank: vote.rank });
      }
    });

    // Sort each user's rankings
    for (const userId in userRankings) {
      userRankings[userId].sort((a, b) => a.rank - b.rank);
    }

    // Populate pairwise comparisons
    Object.values(userRankings).forEach(ranking => {
      for (let i = 0; i < ranking.length; i++) {
        for (let j = i + 1; j < ranking.length; j++) {
          const preferred = ranking[i].ideaId;
          const other = ranking[j].ideaId;
          pairwise[preferred][other] += 1;
        }
      }
    });

    // Check for Condorcet winner (beats all others in pairwise comparisons)
    for (const candidate of ideaIds) {
      let isCondorcetWinner = true;
      for (const opponent of ideaIds) {
        if (candidate !== opponent && pairwise[candidate][opponent] <= pairwise[opponent][candidate]) {
          isCondorcetWinner = false;
          break;
        }
      }
      if (isCondorcetWinner) {
        return ideas.find(idea => idea.id === candidate) || null;
      }
    }

    return null; // No Condorcet winner
  }
}