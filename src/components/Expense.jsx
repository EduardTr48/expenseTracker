import { useLocation } from 'react-router-dom';
import { useExpenses } from '../context/ExpensesContext';
import { useCategories } from '../context/CategoriesContext';
import { Modal, Notification, AddLink, FilterCategory, FilterSearch, Table } from '../UI';
import useFilterdData from '../hooks/useFilterdData';
import useNotification from '../hooks/useNotification';
import useModal from '../hooks/useModal';
import useExpenseHandlers from '../hooks/useExpenseHandlers';
const Expense = () => {
    const location = useLocation();
    const { notification, setNotification } = useNotification(location);
    const { openModal, closeModal, elementDelete, isModalOpen, setElementDelete } = useModal();
    const { expenses, deleteExpense, loading, error } = useExpenses();
    const { categoriesExpense } = useCategories();
    const { categoria, buscarNombre, filterdData, setCategoria, setBuscarNombre } = useFilterdData(expenses);
    const { handleEditar, handleEliminar, eliminarGasto } = useExpenseHandlers(setElementDelete, openModal, deleteExpense, setNotification, closeModal);
    if (loading) {
        return <p>Cargando....</p>;
    }

    if (error) {
        return <p>No se pudo obtener los gastos</p>;
    }

    return (
        <>
            <Notification
                message={notification.message}
                isOpen={notification.isOpen}
                duration={1500} // Duración en milisegundos
                onClose={() => setNotification({ ...notification, isOpen: false })}
            />

            <Modal isOpen={isModalOpen} onClose={closeModal} onConfirm={() => eliminarGasto(elementDelete)} title={'Eliminar el gasto'} message={'¿Seguro que deseas elimiar el gasto?'} />

            <div className="grid grid-cols-3 gap-6">
                <AddLink link={'/addExpense'} title={'Agregar gasto'} />
                <FilterCategory categoria={categoria} categories={categoriesExpense} onCategoriaChange={(e) => setCategoria(Number(e.target.value))} />
                <FilterSearch buscarNombre={buscarNombre} onBuscarNombreChange={(e) => setBuscarNombre(e.target.value)} />
                {<Table isIncome={false} data={filterdData} handleEditar={handleEditar} handleEliminar={handleEliminar} />}
            </div>
        </>
    );
};

export default Expense;
