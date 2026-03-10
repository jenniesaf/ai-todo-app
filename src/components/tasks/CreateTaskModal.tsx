'use client';

import { FormEvent, useState } from 'react';
import { CategoryId } from '@/lib/types';
import { CATEGORIES } from '@/lib/constants';
import { useTasks } from '@/hooks/useTasks';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

interface CreateTaskModalProps {
  open: boolean;
  onClose: () => void;
}

export default function CreateTaskModal({ open, onClose }: CreateTaskModalProps) {
  const { addTask } = useTasks();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<CategoryId>('daily');
  const [startTime, setStartTime] = useState('08:00');
  const [endTime, setEndTime] = useState('12:00');
  const [error, setError] = useState('');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('Task title is required');
      return;
    }

    addTask(title.trim(), category, startTime, endTime);
    setTitle('');
    setCategory('daily');
    setStartTime('08:00');
    setEndTime('12:00');
    onClose();
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md rounded-t-3xl bg-white p-6 pb-10 sm:rounded-3xl sm:pb-6">
        <h2 className="mb-4 text-lg font-bold text-gray-900">Create new task</h2>

        {error && (
          <p className="mb-3 rounded-lg bg-red-50 px-3 py-2 text-center text-sm text-red-600">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as CategoryId)}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
            >
              {Object.values(CATEGORIES).map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.label}</option>
              ))}
            </select>
          </div>

          <div className="flex gap-3">
            <Input
              type="time"
              label="Start time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
            <Input
              type="time"
              label="End time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="submit" variant="cta" fullWidth>
              Create task
            </Button>
            <Button type="button" variant="outline" fullWidth onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
