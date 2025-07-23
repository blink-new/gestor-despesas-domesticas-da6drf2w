export interface Transaction {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
  createdAt: string;
  type: 'income' | 'expense';
}

export interface Expense extends Transaction {
  type: 'expense';
}

export interface Income extends Transaction {
  type: 'income';
}

export interface CategorySummary {
  category: string;
  total: number;
  count: number;
  color: string;
}

export interface MonthlySummary {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  incomeCount: number;
  expenseCount: number;
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

export const INCOME_CATEGORIES = [
  { value: 'salario', label: 'Salário', color: '#059669', icon: '💰' },
  { value: 'freelance', label: 'Freelance', color: '#0891b2', icon: '💻' },
  { value: 'investimentos', label: 'Investimentos', color: '#7c3aed', icon: '📈' },
  { value: 'vendas', label: 'Vendas', color: '#dc2626', icon: '🛒' },
  { value: 'bonus', label: 'Bônus', color: '#ea580c', icon: '🎁' },
  { value: 'outros', label: 'Outros', color: '#059669', icon: '💵' },
] as const;

export type ExpenseCategory = typeof EXPENSE_CATEGORIES[number]['value'];
export type IncomeCategory = typeof INCOME_CATEGORIES[number]['value'];