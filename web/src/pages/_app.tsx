import '../styles/globals.css';

import { ApolloProvider } from '@apollo/client';
import { client } from '../lib/apollo-client';
import type { AppProps } from 'next/app';

import AuthRedirectHandler from '../components/AuthRedirectHandler';

function MyApp({ Component, pageProps }: AppProps) {
  // const apolloClient = useApollo(pageProps.initialApolloState);
  
  return (
    <ApolloProvider client={client}>
      <AuthRedirectHandler />
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;