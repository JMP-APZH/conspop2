import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '../lib/apolloClient';
import { AppProps } from 'next/app';

import '../components/Layout/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;