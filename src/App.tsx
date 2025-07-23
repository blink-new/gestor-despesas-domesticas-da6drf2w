import { useExpenses } from './hooks/useExpenses';
import { TotalHeader } from './components/TotalHeader';
import { ExpenseForm } from './components/ExpenseForm';
import { ExpenseList } from './components/ExpenseList';
import { CategorySummary } from './components/CategorySummary';

function App() {
  const {
    expenses,
    addExpense,
    updateExpense,
    deleteExpense,
    getTotal,
    getCategorySummary,
  } = useExpenses();

  const total = getTotal();
  const categorySummary = getCategorySummary();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header com Total */}
        <TotalHeader total={total} expenseCount={expenses.length} />

        {/* Layout Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Coluna Esquerda - Formulário e Resumo */}
          <div className="lg:col-span-1 space-y-6">
            <ExpenseForm onAddExpense={addExpense} />
            <CategorySummary categories={categorySummary} totalAmount={total} />
          </div>

          {/* Coluna Direita - Lista de Despesas */}
          <div className="lg:col-span-2">
            <ExpenseList
              expenses={expenses}
              onUpdateExpense={updateExpense}
              onDeleteExpense={deleteExpense}
            />
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-border">
          <div className="text-center text-sm text-muted-foreground">
            <p>Gestor de Despesas Domésticas - Controle suas finanças com simplicidade</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;