const isBrowser = typeof window !== 'undefined';

export function getItem<T>(key: string): T | null {
  if (!isBrowser) return null;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

export function setItem<T>(key: string, value: T): void {
  if (!isBrowser) return;
  localStorage.setItem(key, JSON.stringify(value));
}

export function removeItem(key: string): void {
  if (!isBrowser) return;
  localStorage.removeItem(key);
}

export const STORAGE_KEYS = {
  AUTH_USER: 'todo_auth_user',
  USERS: 'todo_users',
  TASKS: 'todo_tasks',
} as const;
