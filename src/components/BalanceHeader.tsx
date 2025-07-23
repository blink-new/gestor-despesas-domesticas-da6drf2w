import { Card, CardContent } from './ui/card';
import { TrendingUp, TrendingDown, DollarSign, Calendar } from 'lucide-react';
import { MonthlySummary } from '../types/expense';

interface BalanceHeaderProps {
  summary: MonthlySummary;
}

export function BalanceHeader({ summary }: BalanceHeaderProps) {
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

  const isPositiveBalance = summary.balance >= 0;

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

      {/* Saldo Principal */}
      <Card className={`w-full mb-6 ${isPositiveBalance 
        ? 'bg-gradient-to-r from-primary/10 to-primary/20 border-primary/30' 
        : 'bg-gradient-to-r from-destructive/10 to-destructive/20 border-destructive/30'
      }`}>
        <CardContent className="p-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <DollarSign className={`h-6 w-6 ${isPositiveBalance ? 'text-primary' : 'text-destructive'}`} />
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Saldo do Mês
              </span>
            </div>
            <div className={`text-4xl md:text-5xl font-bold ${isPositiveBalance ? 'text-primary' : 'text-destructive'}`}>
              {formatCurrency(summary.balance)}
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              {isPositiveBalance ? 'Você está no azul! 🎉' : 'Atenção aos gastos! ⚠️'}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Detalhes de Entradas e Saídas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total de Entradas */}
        <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Entradas</p>
                <p className="text-xl font-bold text-primary">
                  {formatCurrency(summary.totalIncome)}
                </p>
                <p className="text-xs text-muted-foreground">
                  {summary.incomeCount} registro{summary.incomeCount !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Total de Saídas */}
        <Card className="bg-gradient-to-br from-destructive/5 to-destructive/10 border-destructive/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-destructive/10 rounded-lg">
                <TrendingDown className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Saídas</p>
                <p className="text-xl font-bold text-destructive">
                  {formatCurrency(summary.totalExpenses)}
                </p>
                <p className="text-xs text-muted-foreground">
                  {summary.expenseCount} registro{summary.expenseCount !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Período */}
        <Card className="bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-accent/10 rounded-lg">
                <Calendar className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Período</p>
                <p className="text-lg font-semibold text-foreground capitalize">
                  {currentMonth}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Taxa de Economia */}
        <Card className="bg-gradient-to-br from-muted/5 to-muted/10 border-muted/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-muted/10 rounded-lg">
                <DollarSign className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Taxa de Economia</p>
                <p className="text-lg font-bold text-foreground">
                  {summary.totalIncome > 0 
                    ? `${((summary.balance / summary.totalIncome) * 100).toFixed(1)}%`
                    : '0%'
                  }
                </p>
                <p className="text-xs text-muted-foreground">
                  {summary.totalIncome > 0 && summary.balance > 0 ? 'Parabéns!' : 'Melhore!'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}