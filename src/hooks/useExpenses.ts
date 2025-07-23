import { useState, useEffect } from 'react';
import { Expense, CategorySummary, EXPENSE_CATEGORIES } from '../types/expense';

const STORAGE_KEY = 'expenses-data';

export function useExpenses() {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  // Load expenses from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsedExpenses = JSON.parse(stored);
        setExpenses(parsedExpenses);
      } catch (error) {
        console.error('Error loading expenses:', error);
      }
    }
  }, []);

  // Save expenses to localStorage whenever expenses change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (expense: Omit<Expense, 'id' | 'createdAt'>) => {
    const newExpense: Expense = {
      ...expense,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    setExpenses(prev => [newExpense, ...prev]);
  };

  const updateExpense = (id: string, updates: Partial<Expense>) => {
    setExpenses(prev => 
      prev.map(expense => 
        expense.id === id ? { ...expense, ...updates } : expense
      )
    );
  };

  const deleteExpense = (id: string) => {
    setExpenses(prev => prev.filter(expense => expense.id !== id));
  };

  const getTotal = () => {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0);
  };

  const getCategorySummary = (): CategorySummary[] => {
    const summary = EXPENSE_CATEGORIES.map(category => {
      const categoryExpenses = expenses.filter(expense => expense.category === category.value);
      const total = categoryExpenses.reduce((sum, expense) => sum + expense.amount, 0);
      
      return {
        category: category.label,
        total,
        count: categoryExpenses.length,
        color: category.color,
      };
    }).filter(summary => summary.total > 0);

    return summary.sort((a, b) => b.total - a.total);
  };

  const getExpensesByCategory = (category?: string) => {
    if (!category) return expenses;
    return expenses.filter(expense => expense.category === category);
  };

  return {
    expenses,
    addExpense,
    updateExpense,
    deleteExpense,
    getTotal,
    getCategorySummary,
    getExpensesByCategory,
  };
}