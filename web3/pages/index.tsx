import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import client from '../lib/apolloClient';

// GraphQL queries and mutations
const CREATE_SESSION = gql`
  mutation CreateSession($title: String!, $ideas: [String!]!) {
    createSession(title: $title, ideas: $ideas) {
      id
      title
      ideas {
        id
        title
      }
    }
  }
`;

const SUBMIT_VOTE = gql`
  mutation SubmitVote($sessionId: ID!, $votes: [VoteInput!]!, $method: VotingMethod!) {
    submitVote(sessionId: $sessionId, voterId: "test-user", votes: $votes, method: $method)
  }
`;

const GET_RESULTS = gql`
  query GetResults($sessionId: ID!, $method: VotingMethod!) {
    getResults(sessionId: $sessionId, method: $method) {
      method
      results {
        ideaId
        title
        score
        points
        percentage
        rank
      }
      winners {
        id
        title
      }
    }
  }
`;

const GET_ALL_RESULTS = gql`
  query GetAllResults($sessionId: ID!) {
    getAllResults(sessionId: $sessionId) {
      method
      results {
        ideaId
        title
        score
        points
        percentage
        rank
      }
      winners {
        id
        title
      }
    }
  }
`;

export default function VotingTester() {
  const [sessionId, setSessionId] = useState('');
  const [title, setTitle] = useState('Test Voting Session');
  const [ideas, setIdeas] = useState('Idea 1\nIdea 2\nIdea 3');
  const [selectedMethod, setSelectedMethod] = useState('SCORE');
  const [votes, setVotes] = useState<Record<string, number>>({});
  const [rankings, setRankings] = useState<Record<string, number>>({});

  // GraphQL operations
  const [createSession] = useMutation(CREATE_SESSION);
  const [submitVote] = useMutation(SUBMIT_VOTE);
  const { data: resultsData } = useQuery(GET_RESULTS, {
    variables: { sessionId, method: selectedMethod },
    skip: !sessionId,
  });
  const { data: allResultsData } = useQuery(GET_ALL_RESULTS, {
    variables: { sessionId },
    skip: !sessionId,
  });

  const handleCreateSession = async () => {
    try {
      const ideasArray = ideas.split('\n').filter(idea => idea.trim() !== '');
      const { data } = await createSession({
        variables: {
          title,
          ideas: ideasArray,
        },
      });
      setSessionId(data.createSession.id);
      alert('Session created successfully!');
    } catch (error) {
      console.error('Error creating session:', error);
      alert('Failed to create session');
    }
  };

  const handleSubmitVote = async () => {
    try {
      const voteInput = Object.entries(votes).map(([ideaId, score]) => ({
        ideaId,
        score: selectedMethod === 'SCORE' ? score : undefined,
        rank: selectedMethod !== 'SCORE' ? score : undefined,
      }));

      await submitVote({
        variables: {
          sessionId,
          votes: voteInput,
          method: selectedMethod,
        },
      });
      alert('Vote submitted successfully!');
    } catch (error) {
      console.error('Error submitting vote:', error);
      alert('Failed to submit vote');
    }
  };

  const handleVoteChange = (ideaId: string, value: number) => {
    setVotes(prev => ({ ...prev, [ideaId]: value }));
  };

  const handleRankChange = (ideaId: string, value: number) => {
    setRankings(prev => ({ ...prev, [ideaId]: value }));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Voting Server Tester</h1>
      
      {/* Session Creation */}
      <div className="mb-8 p-4 border rounded">
        <h2 className="text-xl font-semibold mb-4">Create Voting Session</h2>
        <div className="mb-4">
          <label className="block mb-2">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Ideas (one per line):</label>
          <textarea
            value={ideas}
            onChange={(e) => setIdeas(e.target.value)}
            rows={5}
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          onClick={handleCreateSession}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create Session
        </button>
        {sessionId && (
          <div className="mt-4 p-2 bg-gray-100 rounded">
            <p>Session ID: <strong>{sessionId}</strong></p>
          </div>
        )}
      </div>

      {/* Voting */}
      {sessionId && resultsData?.createSession?.ideas && (
        <div className="mb-8 p-4 border rounded">
          <h2 className="text-xl font-semibold mb-4">Submit Vote</h2>
          <div className="mb-4">
            <label className="block mb-2">Voting Method:</label>
            <select
              value={selectedMethod}
              onChange={(e) => setSelectedMethod(e.target.value)}
              className="p-2 border rounded"
            >
              <option value="SCORE">Score Voting</option>
              <option value="RANKED_CHOICE">Ranked Choice</option>
              <option value="BORDA_COUNT">Borda Count</option>
              <option value="CONDORCET">Condorcet</option>
            </select>
          </div>
          
          <div className="mb-4">
            <h3 className="font-medium mb-2">Ideas:</h3>
            {resultsData.createSession.ideas.map((idea: any) => (
              <div key={idea.id} className="mb-2 flex items-center">
                <span className="mr-2 w-48">{idea.title}</span>
                {selectedMethod === 'SCORE' ? (
                  <input
                    type="number"
                    min="0"
                    max="10"
                    value={votes[idea.id] || ''}
                    onChange={(e) => handleVoteChange(idea.id, parseInt(e.target.value) || 0)}
                    className="p-2 border rounded w-20"
                    placeholder="Score (0-10)"
                  />
                ) : (
                  <input
                    type="number"
                    min="1"
                    value={rankings[idea.id] || ''}
                    onChange={(e) => handleRankChange(idea.id, parseInt(e.target.value) || 1)}
                    className="p-2 border rounded w-20"
                    placeholder="Rank"
                  />
                )}
              </div>
            ))}
          </div>
          <button
            onClick={handleSubmitVote}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Submit Vote
          </button>
        </div>
      )}

      {/* Results */}
      {sessionId && (
        <div className="p-4 border rounded">
          <h2 className="text-xl font-semibold mb-4">Results</h2>
          
          <div className="mb-4">
            <h3 className="font-medium mb-2">Current Method ({selectedMethod}):</h3>
            {resultsData?.getResults?.results?.length > 0 ? (
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 border">Idea</th>
                    <th className="p-2 border">Score</th>
                    <th className="p-2 border">Points</th>
                    <th className="p-2 border">Percentage</th>
                    <th className="p-2 border">Rank</th>
                  </tr>
                </thead>
                <tbody>
                  {resultsData.getResults.results.map((result: any) => (
                    <tr key={result.ideaId} className="border">
                      <td className="p-2 border">{result.title}</td>
                      <td className="p-2 border">{result.score?.toFixed(2)}</td>
                      <td className="p-2 border">{result.points}</td>
                      <td className="p-2 border">{result.percentage?.toFixed(2)}%</td>
                      <td className="p-2 border">{result.rank}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No results yet</p>
            )}
          </div>

          <div className="mt-6">
            <h3 className="font-medium mb-2">All Methods:</h3>
            {allResultsData?.getAllResults?.map((methodResult: any) => (
              <div key={methodResult.method} className="mb-6">
                <h4 className="font-medium">{methodResult.method}</h4>
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-2 border">Idea</th>
                      <th className="p-2 border">Score</th>
                      <th className="p-2 border">Points</th>
                      <th className="p-2 border">Percentage</th>
                      <th className="p-2 border">Rank</th>
                    </tr>
                  </thead>
                  <tbody>
                    {methodResult.results.map((result: any) => (
                      <tr key={`${methodResult.method}-${result.ideaId}`} className="border">
                        <td className="p-2 border">{result.title}</td>
                        <td className="p-2 border">{result.score?.toFixed(2)}</td>
                        <td className="p-2 border">{result.points}</td>
                        <td className="p-2 border">{result.percentage?.toFixed(2)}%</td>
                        <td className="p-2 border">{result.rank}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {methodResult.winners.length > 0 && (
                  <p className="mt-2 font-medium">
                    Winner(s): {methodResult.winners.map((w: any) => w.title).join(', ')}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}