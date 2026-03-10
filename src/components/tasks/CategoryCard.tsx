'use client';

import { Category } from '@/lib/types';
import { useTasks } from '@/hooks/useTasks';

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const { getCountByCategory } = useTasks();
  const count = getCountByCategory(category.id);

  return (
    <div className={`rounded-2xl ${category.bgColor} p-4 flex items-center justify-between min-w-0`}>
      <div className="flex items-center gap-2.5">
        <div className={`h-4 w-4 rounded-full ${category.iconColor}`} />
        <span className={`text-sm font-bold ${category.color}`}>
          {category.label}
        </span>
      </div>
      <span className={`text-xl font-extrabold ${category.color}`}>
        {count}
      </span>
    </div>
  );
}
