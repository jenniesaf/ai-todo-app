'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import Header from '@/components/layout/Header';
import BottomNav from '@/components/layout/BottomNav';
import Avatar from '@/components/ui/Avatar';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

export default function ProfilePage() {
  const { user, isLoading, logout, updateProfile } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [editingEmail, setEditingEmail] = useState(false);
  const [editingPhone, setEditingPhone] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) router.replace('/login');
  }, [user, isLoading, router]);

  useEffect(() => {
    if (user) {
      setEmail(user.email);
      setPhone(user.phone);
    }
  }, [user]);

  function handleSaveEmail() {
    updateProfile({ email: email.trim() });
    setEditingEmail(false);
  }

  function handleSavePhone() {
    updateProfile({ phone: phone.trim() });
    setEditingPhone(false);
  }

  function handleLogout() {
    logout();
    router.replace('/login');
  }

  if (isLoading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-gray-900" />
      </div>
    );
  }

  return (
    <div className="mx-auto min-h-screen max-w-md bg-gray-50 pb-24">
      <Header />

      <main className="flex flex-col items-center px-6">
        {/* Avatar and name */}
        <div className="relative mb-2">
          <Avatar alt={user.username} size={96} />
          <div className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full bg-green-500 text-white shadow-md">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </div>
        </div>
        <h2 className="mb-8 text-xl font-bold text-gray-900">{user.username}</h2>

        {/* Email field */}
        <div className="mb-4 w-full">
          <label className="mb-1.5 block text-sm font-medium text-gray-700">Email</label>
          <div className="flex items-center gap-2">
            {editingEmail ? (
              <>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1"
                />
                <Button variant="cta" onClick={handleSaveEmail} className="px-4 py-2.5 text-xs">
                  Save
                </Button>
              </>
            ) : (
              <>
                <div className="flex-1 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700">
                  {user.email || 'Not set'}
                </div>
                <button
                  onClick={() => setEditingEmail(true)}
                  className="p-2 text-blue-500 hover:text-blue-600 transition-colors cursor-pointer"
                  aria-label="Edit email"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Phone field */}
        <div className="mb-8 w-full">
          <label className="mb-1.5 block text-sm font-medium text-gray-700">Phone</label>
          <div className="flex items-center gap-2">
            {editingPhone ? (
              <>
                <Input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="flex-1"
                />
                <Button variant="cta" onClick={handleSavePhone} className="px-4 py-2.5 text-xs">
                  Save
                </Button>
              </>
            ) : (
              <>
                <div className="flex-1 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700">
                  {user.phone || 'Not set'}
                </div>
                <button
                  onClick={() => setEditingPhone(true)}
                  className="p-2 text-blue-500 hover:text-blue-600 transition-colors cursor-pointer"
                  aria-label="Edit phone"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Logout */}
        <Button variant="danger" onClick={handleLogout} className="w-40">
          Log out
        </Button>
      </main>

      <BottomNav />
    </div>
  );
}
