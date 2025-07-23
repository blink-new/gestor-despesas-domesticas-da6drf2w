import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { PieChart } from 'lucide-react';
import { CategorySummary as CategorySummaryType } from '../types/expense';

interface CategorySummaryProps {
  categories: CategorySummaryType[];
  totalAmount: number;
}

export function CategorySummary({ categories, totalAmount }: CategorySummaryProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(amount);
  };

  const getPercentage = (amount: number) => {
    return totalAmount > 0 ? (amount / totalAmount) * 100 : 0;
  };

  if (categories.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChart className="h-5 w-5" />
            Resumo por Categoria
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            Nenhuma despesa registrada ainda.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PieChart className="h-5 w-5" />
          Resumo por Categoria
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {categories.map((category) => {
            const percentage = getPercentage(category.total);
            
            return (
              <div key={category.category} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: category.color }}
                    />
                    <span className="font-medium">{category.category}</span>
                    <span className="text-sm text-muted-foreground">
                      ({category.count} {category.count === 1 ? 'item' : 'itens'})
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-destructive">
                      {formatCurrency(category.total)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {percentage.toFixed(1)}%
                    </div>
                  </div>
                </div>
                
                <Progress 
                  value={percentage} 
                  className="h-2"
                  style={{
                    '--progress-background': category.color,
                  } as React.CSSProperties}
                />
              </div>
            );
          })}
        </div>
        
        <div className="mt-6 pt-4 border-t">
          <div className="flex justify-between items-center">
            <span className="font-semibold">Total Geral:</span>
            <span className="font-bold text-lg text-destructive">
              {formatCurrency(totalAmount)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}