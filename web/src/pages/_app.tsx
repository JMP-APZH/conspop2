import '../styles/globals.css';
// export default function App({ Component, pageProps }) {
//   return <Component {...pageProps} />;
// }

import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../lib/apollo-client';

function MyApp({ Component, pageProps }: any) {
  const apolloClient = useApollo(pageProps.initialApolloState);
  
  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;