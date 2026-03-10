'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Avatar from '@/components/ui/Avatar';

export default function SignUpForm() {
  const router = useRouter();
  const { signup } = useAuth();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');

    if (!username.trim() || !email.trim() || !password || !confirm) {
      setError('All fields are required');
      return;
    }

    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 4) {
      setError('Password must be at least 4 characters');
      return;
    }

    const err = signup(username.trim(), email.trim(), password);
    if (err) {
      setError(err);
      return;
    }

    router.push('/dashboard');
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col items-center gap-4">
      <Avatar alt={username || 'U'} size={72} className="mb-2" />

      <h1 className="mb-1 text-center text-2xl font-bold text-white">
        Sign up
      </h1>

      {error && (
        <p className="w-full rounded-lg bg-red-500/20 px-3 py-2 text-center text-sm text-red-100">
          {error}
        </p>
      )}

      <Input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Input
        type="password"
        placeholder="Confirm Password"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
      />

      <Button type="submit" fullWidth className="mt-2 bg-gray-900 hover:bg-gray-800">
        Sign up
      </Button>

      <button
        type="button"
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/30 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
      >
        <svg width="18" height="18" viewBox="0 0 48 48">
          <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.9 33.1 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 8 3l5.7-5.7C34 6 29.3 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.7-.4-3.9z" />
          <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.3 15.8 18.8 13 24 13c3.1 0 5.8 1.2 8 3l5.7-5.7C34 6 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
          <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.3 0-9.8-3-11.3-7.2l-6.5 5C9.5 39.6 16.2 44 24 44z" />
          <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4.1 5.5l6.2 5.2C36.7 39.3 44 34 44 24c0-1.3-.1-2.7-.4-3.9z" />
        </svg>
        Sign in with Google
      </button>

      <p className="mt-2 text-center text-sm text-white/80">
        Already have an account?{' '}
        <Link href="/login" className="font-semibold text-white underline">
          Sign in
        </Link>
      </p>
    </form>
  );
}
