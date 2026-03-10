'use client';

import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import Avatar from '@/components/ui/Avatar';

export default function Header() {
  const pathname = usePathname();
  const { user } = useAuth();

  if (pathname === '/profile') {
    return (
      <header className="flex items-center justify-between px-6 pt-12 pb-4">
        <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
      </header>
    );
  }

  return (
    <header className="flex items-center justify-between px-6 pt-12 pb-4">
      <div>
        <p className="text-sm text-gray-400">Hello,</p>
        <h1 className="text-xl font-bold text-gray-900">
          {user?.username ?? 'User'}
        </h1>
      </div>
      <Avatar
        alt={user?.username ?? 'U'}
        size={44}
      />
    </header>
  );
}
