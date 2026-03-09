export interface User {
  id: string;
  username: string;
  email: string;
  phone: string;
  avatar?: string;
}

export interface Task {
  id: string;
  title: string;
  category: CategoryId;
  startTime: string;
  endTime: string;
  completed: boolean;
  createdAt: string;
}

export type CategoryId = 'project' | 'work' | 'daily' | 'groceries';

export interface Category {
  id: CategoryId;
  label: string;
  color: string;
  bgColor: string;
  iconColor: string;
}
