// lib/apollo-client.ts
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { useMemo } from 'react';

let client: ApolloClient<any>;

export function getApolloClient() {
  if (!client) {
    const httpLink = createHttpLink({
      uri: process.env.NEXT_PUBLIC_GRAPHQL_URI,
    });

    const authLink = setContext((_, { headers }) => {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : "",
        }
      };
    });

    client = new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
      ssrMode: typeof window === 'undefined',
    });
  }
  return client;
}

export function useApollo(initialState: any) {
    const store = useMemo(() => initializeApollo(initialState), [initialState]);
    return store;
  }
  
  function initializeApollo(initialState = null) {
    const _apolloClient = getApolloClient();
    
    if (initialState) {
      _apolloClient.cache.restore(initialState);
    }
    
    return _apolloClient;
  }