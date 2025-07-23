import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { ExpenseForm } from './ExpenseForm';
import { IncomeForm } from './IncomeForm';
import { Transaction, Expense, Income } from '../types/expense';

interface TransactionFormsProps {
  onAddExpense: (expense: Omit<Expense, 'id' | 'createdAt' | 'type'>) => void;
  onAddIncome: (income: Omit<Income, 'id' | 'createdAt' | 'type'>) => void;
}

export function TransactionForms({ onAddExpense, onAddIncome }: TransactionFormsProps) {
  return (
    <Tabs defaultValue="expense" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="expense" className="flex items-center gap-2">
          <TrendingDown className="h-4 w-4" />
          Despesas
        </TabsTrigger>
        <TabsTrigger value="income" className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4" />
          Entradas
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="expense" className="mt-4">
        <ExpenseForm onAddExpense={onAddExpense} />
      </TabsContent>
      
      <TabsContent value="income" className="mt-4">
        <IncomeForm onAddIncome={onAddIncome} />
      </TabsContent>
    </Tabs>
  );
}