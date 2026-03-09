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
    <div className="flex min-h-screen items-center justify-center bg-auth-gradient px-6">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
