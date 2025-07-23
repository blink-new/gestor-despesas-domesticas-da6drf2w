import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'react-hot-toast';
import { Transaction, EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '../types/expense';

interface EditTransactionDialogProps {
  transaction: Transaction;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (updates: Partial<Transaction>) => void;
}

export function EditTransactionDialog({ 
  transaction, 
  open, 
  onOpenChange, 
  onSave 
}: EditTransactionDialogProps) {
  const [description, setDescription] = useState(transaction.description);
  const [amount, setAmount] = useState(transaction.amount.toString());
  const [category, setCategory] = useState(transaction.category);
  const [date, setDate] = useState(transaction.date);

  useEffect(() => {
    setDescription(transaction.description);
    setAmount(transaction.amount.toString());
    setCategory(transaction.category);
    setDate(transaction.date);
  }, [transaction]);

  const handleSave = () => {
    if (!description.trim() || !amount || !category) {
      toast.error('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      toast.error('Por favor, insira um valor válido');
      return;
    }

    onSave({
      description: description.trim(),
      amount: numericAmount,
      category,
      date,
    });

    toast.success('Transação atualizada com sucesso!');
  };

  const categories = transaction.type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
  const isIncome = transaction.type === 'income';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {isIncome ? '💰' : '💸'} Editar {isIncome ? 'Entrada' : 'Despesa'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="edit-description">Descrição *</Label>
            <Input
              id="edit-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descrição da transação"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-amount">Valor (R$) *</Label>
            <Input
              id="edit-amount"
              type="number"
              step="0.01"
              min="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0,00"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-category">Categoria *</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
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
            <Label htmlFor="edit-date">Data</Label>
            <Input
              id="edit-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSave} className={isIncome ? 'bg-primary' : 'bg-destructive'}>
            Salvar Alterações
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}