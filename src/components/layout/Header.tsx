'use client';

import { usePathname } from 'next/navigation';

const PAGE_TITLES: Record<string, string> = {
  '/dashboard': 'Home',
  '/profile': 'Profile',
};

export default function Header() {
  const pathname = usePathname();
  const title = PAGE_TITLES[pathname] ?? '';

  return (
    <header className="flex items-center justify-between px-6 pt-12 pb-4">
      <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
    </header>
  );
}
