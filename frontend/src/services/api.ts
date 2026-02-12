import axios, { AxiosInstance } from 'axios';
import type { Expense, Category, Stats } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Expenses endpoints
export const expenseService = {
  getAll: () => api.get<Expense[]>('/expenses'),
  getById: (id: number) => api.get<Expense>(`/expenses/${id}`),
  create: (expense: Omit<Expense, 'id' | 'created_at' | 'updated_at'>) =>
    api.post<Expense>('/expenses', expense),
  update: (id: number, expense: Partial<Expense>) =>
    api.put<Expense>(`/expenses/${id}`, expense),
  delete: (id: number) => api.delete(`/expenses/${id}`),
};

// Categories endpoints
export const categoryService = {
  getAll: () => api.get<Category[]>('/categories'),
  create: (category: Omit<Category, 'id'>) =>
    api.post<Category>('/categories', category),
};

// Stats endpoints
export const statsService = {
  getStats: () => api.get<Stats>('/stats'),
};

export default api;
