// pages/_app.tsx
import '../styles/globals.css';
import { ApolloProvider } from '@apollo/client';
import { client } from '../lib/apollo-client';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useAuth } from '../hooks/useAuth';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';

function AuthWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, loading } = useAuth();
  const publicPaths = ['/auth/login3', '/auth/register2'];

  useEffect(() => {
    if (loading || publicPaths.some(path => router.pathname.startsWith(path))) return;
    if (!user) router.push(`/auth/login3?redirect=${encodeURIComponent(router.asPath)}`);
  }, [user, loading, router]);

  if (loading && !publicPaths.some(path => router.pathname.startsWith(path))) {
    return <LoadingSpinner fullPage />;
  }

  return <>{children}</>;
}

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <AuthWrapper>
        <Component {...pageProps} />
      </AuthWrapper>
    </ApolloProvider>
  );
}