import React, { useState } from 'react';
import type { Category, Expense } from '../types';

type ExpenseFormData = {
  description: string;
  amount: string;
  category: number;
  date: string;
};

interface ExpenseFormProps {
  categories: Category[];
  onSubmit: (expense: Omit<Expense, 'id' | 'created_at' | 'updated_at'>) => void;
  onCancel: () => void;
}

export default function ExpenseForm({ categories, onSubmit, onCancel }: ExpenseFormProps) {
  const [formData, setFormData] = useState<ExpenseFormData>({
    description: '',
    amount: '',
    category: categories.length > 0 ? categories[0].id : 0,
    date: new Date().toISOString().split('T')[0],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'amount' ? value : name === 'category' ? parseInt(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      description: formData.description,
      amount: parseFloat(formData.amount),
      category: formData.category,
      date: formData.date,
    });
    setFormData({
      description: '',
      amount: '',
      category: categories.length > 0 ? categories[0].id : 0,
      date: new Date().toISOString().split('T')[0],
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Descripción
          </label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Ej: Almuerzo"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cantidad
          </label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
            step="0.01"
            min="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="0.00"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Categoría
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fecha
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
      <div className="flex gap-3 mt-6">
        <button
          type="submit"
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-md transition-colors"
        >
          Guardar Gasto
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2.5 px-4 rounded-md transition-colors"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
