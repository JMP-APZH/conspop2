import { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/router";

export default function AdminRouteGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, loading, error } = useAuth();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    if (loading) return;

    if (error) {
      router.push(`/auth/login3?error=${encodeURIComponent(error)}`);
      return;
    }

    if (!user) {
      router.push(`/auth/login3?redirect=${encodeURIComponent(router.asPath)}`);
      return;
    }

    if (user.role !== 'ADMIN') {
      router.push(user.role === 'USER' ? '/admin/dashboard2' : '/auth/login3');
      return;
    }

    setIsAuthorized(true);
  }, [user, loading, error, router]);

  if (loading) return <LoadingSpinner />;
  if (!isAuthorized) return null;
  
  return <>{children}</>;
}