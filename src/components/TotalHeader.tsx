import { Card, CardContent } from './ui/card';
import { TrendingDown, Calculator, Calendar } from 'lucide-react';

interface TotalHeaderProps {
  total: number;
  expenseCount: number;
}

export function TotalHeader({ total, expenseCount }: TotalHeaderProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(amount);
  };

  const currentMonth = new Intl.DateTimeFormat('pt-BR', { 
    month: 'long', 
    year: 'numeric' 
  }).format(new Date());

  return (
    <div className="w-full">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Gestor de Despesas Domésticas
        </h1>
        <p className="text-muted-foreground">
          Controle suas finanças de forma simples e eficiente
        </p>
      </div>

      <Card className="w-full bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Total Geral */}
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                <TrendingDown className="h-5 w-5 text-destructive" />
                <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                  Total de Despesas
                </span>
              </div>
              <div className="text-3xl md:text-4xl font-bold text-destructive">
                {formatCurrency(total)}
              </div>
            </div>

            {/* Número de Despesas */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Calculator className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                  Despesas Registradas
                </span>
              </div>
              <div className="text-3xl md:text-4xl font-bold text-primary">
                {expenseCount}
              </div>
            </div>

            {/* Período */}
            <div className="text-center md:text-right">
              <div className="flex items-center justify-center md:justify-end gap-2 mb-2">
                <Calendar className="h-5 w-5 text-accent" />
                <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                  Período
                </span>
              </div>
              <div className="text-lg font-semibold text-foreground capitalize">
                {currentMonth}
              </div>
            </div>
          </div>

          {/* Média por despesa */}
          {expenseCount > 0 && (
            <div className="mt-4 pt-4 border-t border-primary/20">
              <div className="text-center">
                <span className="text-sm text-muted-foreground">
                  Média por despesa: {' '}
                  <span className="font-semibold text-foreground">
                    {formatCurrency(total / expenseCount)}
                  </span>
                </span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}