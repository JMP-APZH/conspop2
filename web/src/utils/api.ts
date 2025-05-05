// utils/api.ts
import { ApolloClient, InMemoryCache, createHttpLink, gql } from '@apollo/client';

import { setContext } from '@apollo/client/link/context';

// 1. Create HTTP link
const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URI || 'http://localhost:4000/graphql',
});

// 2. Create auth link
const authLink = setContext((_, { headers }) => {
  // Get token from storage
  let token;
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('token');
  }
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  };
});


// export const apolloClient = new ApolloClient({
//   // uri: 'http://localhost:4000/graphql', // Your backend URL
//   uri: process.env.NEXT_PUBLIC_GRAPHQL_URI,
//   cache: new InMemoryCache(),
// });

// 3. Create Apollo Client instance
export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// 4. Registration mutation
export const REGISTER_MUTATION = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      user {
        id
        email
      }
      token
    }
  }
`;