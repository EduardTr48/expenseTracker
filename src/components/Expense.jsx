import { useExpenses } from '../context/ExpensesContext';
import { useCategories } from '../context/CategoriesContext';
import { Modal, Notification, AddLink, FilterCategory, FilterSearch, Table } from '../UI';
import { useModal, useNotification, useFilterdData, useExpenseHandlers, useCleanNotification } from '../hooks';

const Expense = () => {
    const { notification, setNotification } = useNotification();
    const { openModal, closeModal, elementDelete, isModalOpen, setElementDelete } = useModal();
    const { expenses, deleteExpense, loading, error } = useExpenses();
    const { categoriesExpense } = useCategories();
    const { filterdData, filters, setFilter } = useFilterdData(expenses, { nombre: '', categoria: '' });
    const { handleEditar, handleEliminar, eliminarGasto } = useExpenseHandlers({ setElementDelete, openModal, deleteExpense, setNotification, closeModal });

    useCleanNotification();

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
                <FilterCategory categories={categoriesExpense} filter={filters.categoria} onCategoryChange={(e) => setFilter('categoria', Number(e.target.value))} />
                {<FilterSearch filter={filters.nombre} onNameChange={(e) => setFilter('nombre', e.target.value)} />}
                {<Table isIncome={false} data={filterdData} handleEditar={handleEditar} handleEliminar={handleEliminar} />}
            </div>
        </>
    );
};

export default Expense;
