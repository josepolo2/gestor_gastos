import { useEffect, useState } from 'react';
import type { Expense, Category, Stats } from './types';
import { expenseService, categoryService, statsService } from './services/api';
import ExpenseList from './components/ExpenseList';
import ExpenseForm from './components/ExpenseForm';
import Statistics from './components/Statistics';
import Modal from './components/Modal';
import Swal from 'sweetalert2';

export default function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [expensesRes, categoriesRes, statsRes] = await Promise.all([
        expenseService.getAll(),
        categoryService.getAll(),
        statsService.getStats(),
      ]);
      setExpenses(expensesRes.data);
      setCategories(categoriesRes.data);
      setStats(statsRes.data);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddExpense = async (expense: Omit<Expense, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      await expenseService.create(expense);
      setShowForm(false);
      loadData();
      
      Swal.fire({
        icon: 'success',
        title: '¡Gasto agregado!',
        text: 'El gasto se ha registrado correctamente',
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error('Error adding expense:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo agregar el gasto. Intenta nuevamente.',
      });
    }
  };

  const handleDeleteExpense = async (id: number) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      try {
        await expenseService.delete(id);
        loadData();
        
        Swal.fire({
          icon: 'success',
          title: '¡Eliminado!',
          text: 'El gasto ha sido eliminado',
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (error) {
        console.error('Error deleting expense:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo eliminar el gasto. Intenta nuevamente.',
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-3xl font-bold text-gray-900">Gestor de Gastos</h1>
          <p className="text-gray-600 text-sm">Administra tus gastos personales</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics */}
        {stats && <Statistics stats={stats} />}

        {/* Add Expense Button */}
        <div className="mb-8">
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Agregar Gasto
          </button>
        </div>

        {/* Expense Form Modal */}
        <Modal
          isOpen={showForm}
          onClose={() => setShowForm(false)}
          title="Agregar Nuevo Gasto"
        >
          <ExpenseForm
            categories={categories}
            onSubmit={handleAddExpense}
            onCancel={() => setShowForm(false)}
          />
        </Modal>

        {/* Expense List */}
        {loading ? (
          <div className="text-center py-8">
            <p className="text-gray-600">Cargando gastos...</p>
          </div>
        ) : (
          <ExpenseList
            expenses={expenses}
            categories={categories}
            onDelete={handleDeleteExpense}
          />
        )}
      </main>
    </div>
  );
}
