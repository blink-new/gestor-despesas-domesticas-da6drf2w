import { useState } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Trash2, Edit, Filter } from 'lucide-react';
import { Expense, EXPENSE_CATEGORIES } from '../types/expense';
import { EditExpenseDialog } from './EditExpenseDialog';
import toast from 'react-hot-toast';

interface ExpenseListProps {
  expenses: Expense[];
  onUpdateExpense: (id: string, updates: Partial<Expense>) => void;
  onDeleteExpense: (id: string) => void;
}

export function ExpenseList({ expenses, onUpdateExpense, onDeleteExpense }: ExpenseListProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  const filteredExpenses = selectedCategory === 'all' 
    ? expenses 
    : expenses.filter(expense => expense.category === selectedCategory);

  const handleDelete = (id: string, description: string) => {
    if (window.confirm(`Tem certeza que deseja excluir "${description}"?`)) {
      onDeleteExpense(id);
      toast.success('Despesa excluída com sucesso!');
    }
  };

  const getCategoryInfo = (categoryValue: string) => {
    return EXPENSE_CATEGORIES.find(cat => cat.value === categoryValue) || EXPENSE_CATEGORIES[EXPENSE_CATEGORIES.length - 1];
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(amount);
  };

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Despesas Recentes ({filteredExpenses.length})
            </CardTitle>
            
            <div className="flex items-center gap-2">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filtrar por categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as categorias</SelectItem>
                  {EXPENSE_CATEGORIES.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      <span className="flex items-center gap-2">
                        <span>{cat.icon}</span>
                        {cat.label}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          {filteredExpenses.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              {selectedCategory === 'all' 
                ? 'Nenhuma despesa registrada ainda.' 
                : 'Nenhuma despesa encontrada para esta categoria.'}
            </div>
          ) : (
            <div className="space-y-3">
              {filteredExpenses.map((expense) => {
                const categoryInfo = getCategoryInfo(expense.category);
                
                return (
                  <div
                    key={expense.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className="text-2xl">{categoryInfo.icon}</div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium truncate">{expense.description}</h3>
                          <Badge 
                            variant="secondary" 
                            style={{ backgroundColor: `${categoryInfo.color}20`, color: categoryInfo.color }}
                          >
                            {categoryInfo.label}
                          </Badge>
                        </div>
                        
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(expense.date), 'dd/MM/yyyy', { locale: ptBR })}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="font-semibold text-lg text-destructive">
                          {formatCurrency(expense.amount)}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditingExpense(expense)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(expense.id, expense.description)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      <EditExpenseDialog
        expense={editingExpense}
        open={!!editingExpense}
        onClose={() => setEditingExpense(null)}
        onSave={(updates) => {
          if (editingExpense) {
            onUpdateExpense(editingExpense.id, updates);
            setEditingExpense(null);
            toast.success('Despesa atualizada com sucesso!');
          }
        }}
      />
    </>
  );
}