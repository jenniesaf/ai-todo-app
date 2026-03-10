'use client';

import { useState } from 'react';
import { Task } from '@/lib/types';
import { useTasks } from '@/hooks/useTasks';
import { CATEGORIES } from '@/lib/constants';
import { CategoryId } from '@/lib/types';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

function formatTime12h(time24: string): string {
  const [h, m] = time24.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  const hour12 = h % 12 || 12;
  return `${hour12.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')} ${period}`;
}

interface TaskItemProps {
  task: Task;
}

export default function TaskItem({ task }: TaskItemProps) {
  const { toggleTask, deleteTask, updateTask } = useTasks();
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editCategory, setEditCategory] = useState<CategoryId>(task.category);
  const [editStart, setEditStart] = useState(task.startTime);
  const [editEnd, setEditEnd] = useState(task.endTime);

  function handleSave() {
    if (!editTitle.trim()) return;
    updateTask(task.id, {
      title: editTitle.trim(),
      category: editCategory,
      startTime: editStart,
      endTime: editEnd,
    });
    setEditing(false);
  }

  function handleCancel() {
    setEditTitle(task.title);
    setEditCategory(task.category);
    setEditStart(task.startTime);
    setEditEnd(task.endTime);
    setEditing(false);
  }

  if (editing) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-4 space-y-3">
        <Input
          placeholder="Task title"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
        />
        <select
          value={editCategory}
          onChange={(e) => setEditCategory(e.target.value as CategoryId)}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm"
        >
          {Object.values(CATEGORIES).map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.label}</option>
          ))}
        </select>
        <div className="flex gap-2">
          <Input
            type="time"
            value={editStart}
            onChange={(e) => setEditStart(e.target.value)}
          />
          <Input
            type="time"
            value={editEnd}
            onChange={(e) => setEditEnd(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="cta" onClick={handleSave} className="flex-1 text-xs py-2">
            Save
          </Button>
          <Button variant="outline" onClick={handleCancel} className="flex-1 text-xs py-2">
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm">
      <button
        onClick={() => toggleTask(task.id)}
        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors cursor-pointer ${
          task.completed
            ? 'border-teal-500 bg-teal-500 text-white'
            : 'border-gray-300'
        }`}
        aria-label={task.completed ? 'Mark incomplete' : 'Mark complete'}
      >
        {task.completed && (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </button>

      <div className="flex-1 min-w-0">
        <p className={`text-sm font-semibold ${task.completed ? 'text-gray-400 line-through' : 'text-gray-900'}`}>
          {task.title}
        </p>
        <p className="text-xs text-gray-400 mt-0.5">
          {formatTime12h(task.startTime)} to {formatTime12h(task.endTime)}
        </p>
      </div>

      <button
        onClick={() => setEditing(true)}
        className="p-1.5 text-blue-500 transition-colors cursor-pointer hover:text-blue-600"
        aria-label="Edit task"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
        </svg>
      </button>

      <button
        onClick={() => deleteTask(task.id)}
        className="p-1.5 text-red-500 transition-colors cursor-pointer hover:text-red-600"
        aria-label="Delete task"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="3 6 5 6 21 6" />
          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
          <path d="M10 11v6" />
          <path d="M14 11v6" />
          <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
        </svg>
      </button>
    </div>
  );
}
