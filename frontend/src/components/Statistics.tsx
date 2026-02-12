import type { Stats } from '../types';

interface StatisticsProps {
  stats: Stats;
}

export default function Statistics({ stats }: StatisticsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-sm font-medium text-gray-600 uppercase">Total de Gastos</h3>
        <p className="text-3xl font-bold text-gray-900 mt-2">{stats.total_expenses}</p>
      </div>
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-sm font-medium text-gray-600 uppercase">Total Gastado</h3>
        <p className="text-3xl font-bold text-gray-900 mt-2">${stats.total_amount.toFixed(2)}</p>
      </div>
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-sm font-medium text-gray-600 uppercase">Promedio</h3>
        <p className="text-3xl font-bold text-gray-900 mt-2">${stats.average_expense.toFixed(2)}</p>
      </div>
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-sm font-medium text-gray-600 uppercase">Categorías</h3>
        <p className="text-3xl font-bold text-gray-900 mt-2">
          {Object.keys(stats.expenses_by_category).length}
        </p>
      </div>
    </div>
  );
}
