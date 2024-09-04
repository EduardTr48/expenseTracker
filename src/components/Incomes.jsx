import { useIncomes } from '../context/IncomesContext';
import { useCategories } from '../context/CategoriesContext';
import { AddLink, FilterCategory, FilterSearch, Table, Notification, Modal } from '../UI';
import { useModal, useNotification, useFilterdData, useIncomeHandlers, useCleanNotification } from '../hooks';
const Incomes = () => {
    const { notification, setNotification } = useNotification();
    const { isModalOpen, elementDelete, openModal, closeModal, setElementDelete } = useModal();
    const { incomes, deleteIncomes, loading, error } = useIncomes();
    const { categoriesIncome } = useCategories();
    const { filterdData, filters, setFilter } = useFilterdData(incomes, { nombre: '', categoria: '' });
    const { handleEditar, handleEliminar, eliminarIngreso } = useIncomeHandlers({ setElementDelete, openModal, setNotification, closeModal, deleteIncomes });

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
                duration={3000} // Duración en milisegundos
                onClose={() => setNotification({ ...notification, isOpen: false })}
            />

            <Modal isOpen={isModalOpen} onClose={closeModal} onConfirm={() => eliminarIngreso(elementDelete)} title={'Eliminar el ingreso'} message={'¿Estas seguro que deseas eliminar el ingreso?'} />
            <div className="grid grid-cols-3 gap-6">
                <AddLink link={'/addIncome'} title={'Agregar ingreso'} />
                <FilterCategory filter={filters.categoria} categories={categoriesIncome} onCategoryChange={(e) => setFilter('categoria', Number(e.target.value))} />
                <FilterSearch filter={filters.nombre} onNameChange={(e) => setFilter('nombre', e.target.value)} />
                <Table isIncome data={filterdData} handleEditar={handleEditar} handleEliminar={handleEliminar} />
            </div>
        </>
    );
};

export default Incomes;
