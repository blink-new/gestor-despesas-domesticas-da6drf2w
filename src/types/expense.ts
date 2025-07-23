export interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
  createdAt: string;
}

export interface CategorySummary {
  category: string;
  total: number;
  count: number;
  color: string;
}

export const EXPENSE_CATEGORIES = [
  { value: 'alimentacao', label: 'Alimentação', color: '#f59e0b', icon: '🍽️' },
  { value: 'transporte', label: 'Transporte', color: '#3b82f6', icon: '🚗' },
  { value: 'casa', label: 'Casa', color: '#10b981', icon: '🏠' },
  { value: 'saude', label: 'Saúde', color: '#ef4444', icon: '🏥' },
  { value: 'lazer', label: 'Lazer', color: '#8b5cf6', icon: '🎮' },
  { value: 'educacao', label: 'Educação', color: '#06b6d4', icon: '📚' },
  { value: 'roupas', label: 'Roupas', color: '#ec4899', icon: '👕' },
  { value: 'outros', label: 'Outros', color: '#6b7280', icon: '📦' },
] as const;

export type ExpenseCategory = typeof EXPENSE_CATEGORIES[number]['value'];