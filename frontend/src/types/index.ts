export interface Expense {
  id: number;
  description: string;
  amount: number;
  category: number;
  date: string;
  created_at?: string;
  updated_at?: string;
}

export interface Category {
  id: number;
  name: string;
  description?: string;
}

export interface Stats {
  total_expenses: number;
  total_amount: number;
  average_expense: number;
  expenses_by_category: Record<string, number>;
}
