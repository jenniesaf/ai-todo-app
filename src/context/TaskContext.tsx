'use client';

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from 'react';
import { Task, CategoryId } from '@/lib/types';
import { getItem, setItem, STORAGE_KEYS } from '@/lib/storage';

interface TaskContextValue {
  tasks: Task[];
  addTask: (title: string, category: CategoryId, startTime: string, endTime: string) => void;
  updateTask: (id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => void;
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;
  getCountByCategory: (category: CategoryId) => number;
}

export const TaskContext = createContext<TaskContextValue | null>(null);

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const stored = getItem<Task[]>(STORAGE_KEYS.TASKS) ?? [];
    setTasks(stored);
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      setItem(STORAGE_KEYS.TASKS, tasks);
    }
  }, [tasks, loaded]);

  const addTask = useCallback(
    (title: string, category: CategoryId, startTime: string, endTime: string) => {
      const task: Task = {
        id: generateId(),
        title,
        category,
        startTime,
        endTime,
        completed: false,
        createdAt: new Date().toISOString(),
      };
      setTasks((prev) => [task, ...prev]);
    },
    [],
  );

  const updateTask = useCallback(
    (id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => {
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, ...updates } : t)),
      );
    },
    [],
  );

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toggleTask = useCallback((id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  }, []);

  const getCountByCategory = useCallback(
    (category: CategoryId) => tasks.filter((t) => t.category === category).length,
    [tasks],
  );

  const value = useMemo(
    () => ({ tasks, addTask, updateTask, deleteTask, toggleTask, getCountByCategory }),
    [tasks, addTask, updateTask, deleteTask, toggleTask, getCountByCategory],
  );

  return (
    <TaskContext.Provider value={value}>{children}</TaskContext.Provider>
  );
}
