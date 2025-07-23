import { useState, useEffect } from 'react';
import { Transaction, Expense, Income, CategorySummary, MonthlySummary, EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '../types/expense';

const STORAGE_KEY = 'transactions-data';

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Load transactions from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsedTransactions = JSON.parse(stored);
        setTransactions(parsedTransactions);
      } catch (error) {
        console.error('Error loading transactions:', error);
      }
    }
  }, []);

  // Save transactions to localStorage whenever transactions change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (transaction: Omit<Transaction, 'id' | 'createdAt'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const addExpense = (expense: Omit<Expense, 'id' | 'createdAt' | 'type'>) => {
    addTransaction({ ...expense, type: 'expense' });
  };

  const addIncome = (income: Omit<Income, 'id' | 'createdAt' | 'type'>) => {
    addTransaction({ ...income, type: 'income' });
  };

  const updateTransaction = (id: string, updates: Partial<Transaction>) => {
    setTransactions(prev => 
      prev.map(transaction => 
        transaction.id === id ? { ...transaction, ...updates } : transaction
      )
    );
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(transaction => transaction.id !== id));
  };

  const getExpenses = (): Expense[] => {
    return transactions.filter(t => t.type === 'expense') as Expense[];
  };

  const getIncomes = (): Income[] => {
    return transactions.filter(t => t.type === 'income') as Income[];
  };

  const getTotalExpenses = () => {
    return getExpenses().reduce((sum, expense) => sum + expense.amount, 0);
  };

  const getTotalIncome = () => {
    return getIncomes().reduce((sum, income) => sum + income.amount, 0);
  };

  const getBalance = () => {
    return getTotalIncome() - getTotalExpenses();
  };

  const getMonthlySummary = (): MonthlySummary => {
    const totalIncome = getTotalIncome();
    const totalExpenses = getTotalExpenses();
    const balance = totalIncome - totalExpenses;
    const incomeCount = getIncomes().length;
    const expenseCount = getExpenses().length;

    return {
      totalIncome,
      totalExpenses,
      balance,
      incomeCount,
      expenseCount,
    };
  };

  const getExpenseCategorySummary = (): CategorySummary[] => {
    const expenses = getExpenses();
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

  const getIncomeCategorySummary = (): CategorySummary[] => {
    const incomes = getIncomes();
    const summary = INCOME_CATEGORIES.map(category => {
      const categoryIncomes = incomes.filter(income => income.category === category.value);
      const total = categoryIncomes.reduce((sum, income) => sum + income.amount, 0);
      
      return {
        category: category.label,
        total,
        count: categoryIncomes.length,
        color: category.color,
      };
    }).filter(summary => summary.total > 0);

    return summary.sort((a, b) => b.total - a.total);
  };

  const getTransactionsByCategory = (category?: string, type?: 'income' | 'expense') => {
    let filtered = transactions;
    
    if (type) {
      filtered = filtered.filter(t => t.type === type);
    }
    
    if (category) {
      filtered = filtered.filter(t => t.category === category);
    }
    
    return filtered;
  };

  return {
    transactions,
    expenses: getExpenses(),
    incomes: getIncomes(),
    addTransaction,
    addExpense,
    addIncome,
    updateTransaction,
    deleteTransaction,
    getTotalExpenses,
    getTotalIncome,
    getBalance,
    getMonthlySummary,
    getExpenseCategorySummary,
    getIncomeCategorySummary,
    getTransactionsByCategory,
  };
}