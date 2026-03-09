'use client';

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from 'react';
import { User } from '@/lib/types';
import { getItem, setItem, removeItem, STORAGE_KEYS } from '@/lib/storage';

interface StoredCredentials {
  username: string;
  password: string;
  email: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
}

interface AuthContextValue extends AuthState {
  login: (username: string, password: string) => string | null;
  signup: (
    username: string,
    email: string,
    password: string,
  ) => string | null;
  logout: () => void;
  updateProfile: (updates: Partial<Pick<User, 'email' | 'phone'>>) => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
  });

  useEffect(() => {
    const stored = getItem<User>(STORAGE_KEYS.AUTH_USER);
    setState({ user: stored, isLoading: false });
  }, []);

  const login = useCallback((username: string, password: string): string | null => {
    const users = getItem<StoredCredentials[]>(STORAGE_KEYS.USERS) ?? [];
    const found = users.find(
      (u) => u.username === username && u.password === password,
    );

    if (!found) return 'Invalid username or password';

    const user: User = {
      id: found.username,
      username: found.username,
      email: found.email,
      phone: '',
    };

    setItem(STORAGE_KEYS.AUTH_USER, user);
    setState({ user, isLoading: false });
    return null;
  }, []);

  const signup = useCallback(
    (username: string, email: string, password: string): string | null => {
      const users = getItem<StoredCredentials[]>(STORAGE_KEYS.USERS) ?? [];

      if (users.some((u) => u.username === username)) {
        return 'Username already taken';
      }

      users.push({ username, password, email });
      setItem(STORAGE_KEYS.USERS, users);

      const user: User = {
        id: username,
        username,
        email,
        phone: '',
      };

      setItem(STORAGE_KEYS.AUTH_USER, user);
      setState({ user, isLoading: false });
      return null;
    },
    [],
  );

  const logout = useCallback(() => {
    removeItem(STORAGE_KEYS.AUTH_USER);
    setState({ user: null, isLoading: false });
  }, []);

  const updateProfile = useCallback(
    (updates: Partial<Pick<User, 'email' | 'phone'>>) => {
      setState((prev) => {
        if (!prev.user) return prev;
        const updated = { ...prev.user, ...updates };
        setItem(STORAGE_KEYS.AUTH_USER, updated);
        return { ...prev, user: updated };
      });
    },
    [],
  );

  const value = useMemo(
    () => ({ ...state, login, signup, logout, updateProfile }),
    [state, login, signup, logout, updateProfile],
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}
