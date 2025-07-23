import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { Pencil, Trash2, TrendingUp, TrendingDown, Search, Filter } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Transaction, EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '../types/expense';
import { EditTransactionDialog } from './EditTransactionDialog';

interface TransactionListProps {
  transactions: Transaction[];
  onUpdateTransaction: (id: string, updates: Partial<Transaction>) => void;
  onDeleteTransaction: (id: string) => void;
}

export function TransactionList({ 
  transactions, 
  onUpdateTransaction, 
  onDeleteTransaction 
}: TransactionListProps) {
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(amount);
  };

  const getCategoryInfo = (category: string, type: 'income' | 'expense') => {
    const categories = type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
    return categories.find(cat => cat.value === category) || { label: category, icon: '📦', color: '#6b7280' };
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesType = filterType === 'all' || transaction.type === filterType;
    const matchesCategory = filterCategory === 'all' || transaction.category === filterCategory;
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesType && matchesCategory && matchesSearch;
  });

  const allCategories = [
    ...EXPENSE_CATEGORIES.map(cat => ({ ...cat, type: 'expense' as const })),
    ...INCOME_CATEGORIES.map(cat => ({ ...cat, type: 'income' as const }))
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Histórico de Transações
        </CardTitle>
        
        {/* Filtros */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por descrição..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <Select value={filterType} onValueChange={(value: 'all' | 'income' | 'expense') => setFilterType(value)}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="income">Entradas</SelectItem>
              <SelectItem value="expense">Saídas</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              {allCategories.map((cat) => (
                <SelectItem key={`${cat.type}-${cat.value}`} value={cat.value}>
                  <div className="flex items-center gap-2">
                    <span>{cat.icon}</span>
                    <span>{cat.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent>
        {filteredTransactions.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              {transactions.length === 0 
                ? 'Nenhuma transação registrada ainda.' 
                : 'Nenhuma transação encontrada com os filtros aplicados.'
              }
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredTransactions.map((transaction) => {
              const categoryInfo = getCategoryInfo(transaction.category, transaction.type);
              const isIncome = transaction.type === 'income';
              
              return (
                <div
                  key={transaction.id}
                  className={`p-4 rounded-lg border transition-colors hover:bg-muted/50 ${
                    isIncome 
                      ? 'border-primary/20 bg-primary/5' 
                      : 'border-destructive/20 bg-destructive/5'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <div className={`p-2 rounded-lg ${
                        isIncome ? 'bg-primary/10' : 'bg-destructive/10'
                      }`}>
                        {isIncome ? (
                          <TrendingUp className="h-4 w-4 text-primary" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-destructive" />
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-foreground truncate">
                            {transaction.description}
                          </h3>
                          <Badge 
                            variant="secondary" 
                            className="text-xs"
                            style={{ backgroundColor: `${categoryInfo.color}20`, color: categoryInfo.color }}
                          >
                            {categoryInfo.icon} {categoryInfo.label}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>
                            {format(new Date(transaction.date), 'dd/MM/yyyy', { locale: ptBR })}
                          </span>
                          <Badge variant={isIncome ? 'default' : 'destructive'} className="text-xs">
                            {isIncome ? 'Entrada' : 'Saída'}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className={`text-lg font-bold ${
                          isIncome ? 'text-primary' : 'text-destructive'
                        }`}>
                          {isIncome ? '+' : '-'}{formatCurrency(transaction.amount)}
                        </div>
                      </div>

                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditingTransaction(transaction)}
                          className="h-8 w-8 p-0"
                        >
                          <Pencil className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onDeleteTransaction(transaction.id)}
                          className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Dialog de Edição */}
        {editingTransaction && (
          <EditTransactionDialog
            transaction={editingTransaction}
            open={!!editingTransaction}
            onOpenChange={(open) => !open && setEditingTransaction(null)}
            onSave={(updates) => {
              onUpdateTransaction(editingTransaction.id, updates);
              setEditingTransaction(null);
            }}
          />
        )}
      </CardContent>
    </Card>
  );
}