import { useTransactions } from './hooks/useTransactions';
import { BalanceHeader } from './components/BalanceHeader';
import { TransactionForms } from './components/TransactionForms';
import { TransactionList } from './components/TransactionList';
import { CategorySummary } from './components/CategorySummary';

function App() {
  const {
    transactions,
    addExpense,
    addIncome,
    updateTransaction,
    deleteTransaction,
    getMonthlySummary,
    getExpenseCategorySummary,
    getIncomeCategorySummary,
  } = useTransactions();

  const monthlySummary = getMonthlySummary();
  const expenseCategorySummary = getExpenseCategorySummary();
  const incomeCategorySummary = getIncomeCategorySummary();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header com Saldo */}
        <BalanceHeader summary={monthlySummary} />

        {/* Layout Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Coluna Esquerda - Formulários */}
          <div className="lg:col-span-1 space-y-6">
            <TransactionForms 
              onAddExpense={addExpense}
              onAddIncome={addIncome}
            />
            
            {/* Resumo por Categoria */}
            {expenseCategorySummary.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Despesas por Categoria</h3>
                <CategorySummary 
                  categories={expenseCategorySummary} 
                  totalAmount={monthlySummary.totalExpenses} 
                />
              </div>
            )}
            
            {incomeCategorySummary.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Entradas por Categoria</h3>
                <CategorySummary 
                  categories={incomeCategorySummary} 
                  totalAmount={monthlySummary.totalIncome} 
                />
              </div>
            )}
          </div>

          {/* Coluna Direita - Lista de Transações */}
          <div className="lg:col-span-2">
            <TransactionList
              transactions={transactions}
              onUpdateTransaction={updateTransaction}
              onDeleteTransaction={deleteTransaction}
            />
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-border">
          <div className="text-center text-sm text-muted-foreground">
            <p>Gestor de Despesas Domésticas - Controle suas finanças com simplicidade</p>
            <p className="mt-1">
              💰 Entradas: <span className="text-primary font-medium">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(monthlySummary.totalIncome)}
              </span>
              {' | '}
              💸 Saídas: <span className="text-destructive font-medium">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(monthlySummary.totalExpenses)}
              </span>
              {' | '}
              📊 Saldo: <span className={`font-medium ${monthlySummary.balance >= 0 ? 'text-primary' : 'text-destructive'}`}>
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(monthlySummary.balance)}
              </span>
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;