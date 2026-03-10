'use client';

import { useTasks } from '@/hooks/useTasks';
import TaskItem from './TaskItem';

export default function TaskList() {
  const { tasks } = useTasks();

  if (tasks.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-sm text-gray-400">No tasks yet. Create one!</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
}
