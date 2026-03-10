'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import LoginForm from '@/components/auth/LoginForm';

export default function LoginPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) router.replace('/dashboard');
  }, [user, isLoading, router]);

  if (isLoading || user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-auth-gradient">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-white/30 border-t-white" />
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-auth-gradient px-6 overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-orange-400/20 blur-3xl" />
      <div className="absolute top-1/4 right-0 h-40 w-40 rounded-full bg-purple-300/15 blur-2xl" />

      <div className="relative w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
