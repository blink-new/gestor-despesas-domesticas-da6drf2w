import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { PlusCircle, TrendingUp } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { INCOME_CATEGORIES, Income } from '../types/expense';

interface IncomeFormProps {
  onAddIncome: (income: Omit<Income, 'id' | 'createdAt' | 'type'>) => void;
}

export function IncomeForm({ onAddIncome }: IncomeFormProps) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!description.trim() || !amount || !category) {
      toast.error('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      toast.error('Por favor, insira um valor válido');
      return;
    }

    onAddIncome({
      description: description.trim(),
      amount: numericAmount,
      category,
      date,
    });

    // Reset form
    setDescription('');
    setAmount('');
    setCategory('');
    setDate(new Date().toISOString().split('T')[0]);

    toast.success('Entrada adicionada com sucesso!');
  };

  return (
    <Card className="w-full border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-primary">
          <TrendingUp className="h-5 w-5" />
          Nova Entrada
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="income-description">Descrição *</Label>
            <Input
              id="income-description"
              type="text"
              placeholder="Ex: Salário, Freelance, Vendas..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border-primary/20 focus:border-primary"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="income-amount">Valor (R$) *</Label>
            <Input
              id="income-amount"
              type="number"
              step="0.01"
              min="0"
              placeholder="0,00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="border-primary/20 focus:border-primary"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="income-category">Categoria *</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="border-primary/20 focus:border-primary">
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                {INCOME_CATEGORIES.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    <div className="flex items-center gap-2">
                      <span>{cat.icon}</span>
                      <span>{cat.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="income-date">Data</Label>
            <Input
              id="income-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border-primary/20 focus:border-primary"
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-primary hover:bg-primary/90 text-white"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Adicionar Entrada
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}