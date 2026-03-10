'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import Header from '@/components/layout/Header';
import BottomNav from '@/components/layout/BottomNav';
import CategoryCard from '@/components/tasks/CategoryCard';
import TaskList from '@/components/tasks/TaskList';
import CreateTaskModal from '@/components/tasks/CreateTaskModal';
import Button from '@/components/ui/Button';
import { CATEGORY_LIST } from '@/lib/constants';

export default function DashboardPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) router.replace('/login');
  }, [user, isLoading, router]);

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

      <main className="px-6 space-y-6">
        {/* Category cards */}
        <div className="grid grid-cols-2 gap-3">
          {CATEGORY_LIST.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>

        {/* Today's Tasks */}
        <div>
          <h2 className="mb-3 text-lg font-bold text-gray-900">
            Today&apos;s Tasks
          </h2>
          <TaskList />
        </div>

        {/* Create button */}
        <Button
          variant="cta"
          fullWidth
          onClick={() => setModalOpen(true)}
        >
          Create new task
        </Button>
      </main>

      <CreateTaskModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />

      <BottomNav />
    </div>
  );
}
