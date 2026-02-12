import type { Expense, Category } from '../types';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface ExpenseListProps {
  expenses: Expense[];
  categories: Category[];
  onDelete: (id: number) => void;
}

export default function ExpenseList({ expenses, categories, onDelete }: ExpenseListProps) {
  const getCategoryName = (categoryId: number) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Sin categoría';
  };

  if (expenses.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No hay gastos registrados</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Descripción</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Categoría</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Cantidad</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Fecha</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {expenses.map((expense) => (
            <tr key={expense.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm text-gray-900">{expense.description}</td>
              <td className="px-6 py-4 text-sm text-gray-600">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {getCategoryName(expense.category)}
                </span>
              </td>
              <td className="px-6 py-4 text-sm font-medium text-gray-900">${expense.amount.toFixed(2)}</td>
              <td className="px-6 py-4 text-sm text-gray-600">
                {format(new Date(expense.date), 'dd MMM yyyy', { locale: es })}
              </td>
              <td className="px-6 py-4 text-sm font-medium">
                <button
                  onClick={() => onDelete(expense.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
