import { Category, CategoryId } from './types';

export const CATEGORIES: Record<CategoryId, Category> = {
  project: {
    id: 'project',
    label: 'Project',
    color: 'text-emerald-700',
    bgColor: 'bg-emerald-100',
    iconColor: 'bg-emerald-500',
  },
  work: {
    id: 'work',
    label: 'Work',
    color: 'text-blue-700',
    bgColor: 'bg-blue-100',
    iconColor: 'bg-blue-500',
  },
  daily: {
    id: 'daily',
    label: 'Daily Tasks',
    color: 'text-pink-700',
    bgColor: 'bg-pink-100',
    iconColor: 'bg-pink-500',
  },
  groceries: {
    id: 'groceries',
    label: 'Groceries',
    color: 'text-amber-700',
    bgColor: 'bg-amber-100',
    iconColor: 'bg-amber-500',
  },
};

export const CATEGORY_LIST = Object.values(CATEGORIES);

export const DEFAULT_AVATAR = '/avatar-placeholder.svg';
