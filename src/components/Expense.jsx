import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useExpenses } from '../context/ExpensesContext';
import { useCallback, useMemo, useState } from 'react';
import { useCategories } from '../context/CategoriesContext';
import Modal from './Modal';
import Notification from './Notification';
import { deleteExpenseAPI } from '../services/api';
import Table from './Table';
const Expense = () => {
    const location = useLocation();
    const { addElementSuccess } = location.state || {};
    const { editElementSuccess } = location.state || {};

    const [notification, setNotification] = useState({
        isOpen: !!addElementSuccess || !!editElementSuccess,
        message: addElementSuccess ? 'El gasto fue agregado correctamente' : editElementSuccess ? 'El gasto fue editado correctamente' : '',
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [elementDelete, setElementDelete] = useState(null);
    const navigate = useNavigate();
    const { expenses, deleteExpense, loading, error } = useExpenses();
    const [categoria, setCategoria] = useState('');
    const [buscarNombre, setBuscarNombre] = useState('');
    const { categoriesExpense } = useCategories();
    const filteredExpenses = useMemo(() => {
        return expenses.filter((expense) => {
            const matchesCategoria = categoria ? expense.categoria === categoria : true;
            const matchesNombre = buscarNombre ? expense.nombre.toLowerCase().includes(buscarNombre.toLowerCase()) : true;
            return matchesCategoria && matchesNombre;
        });
    }, [expenses, buscarNombre, categoria]);

    const handleEditar = useCallback(
        (id) => {
            navigate(`/editExpense/${id}`);
        },
        [navigate]
    );
    const openModal = useCallback(() => {
        setIsModalOpen(true);
    }, []);

    const closeModal = useCallback(() => {
        setIsModalOpen(false);
        setElementDelete(null);
    }, []);

    const handleEliminar = useCallback(
        (id) => {
            setElementDelete(id);
            openModal();
        },
        [openModal]
    );

    const eliminarGasto = useCallback(
        async (id) => {
            deleteExpense(id);
            try {
                await deleteExpenseAPI(id);
            } catch (error) {
                console.log('El gasto no pudo ser eliminado');
            }
            setNotification({ isOpen: true, message: 'El gasto fue eliminado correctamente' });
            closeModal();
        },
        [closeModal, deleteExpense]
    );

    const handleBuscarNombre = useCallback((e) => {
        setBuscarNombre(e.target.value);
    }, []);

    const handleCategoriaChange = useCallback((e) => {
        setCategoria(Number(e.target.value));
    }, []);

    if (loading) {
        return <p>Cargando....</p>;
    }

    if (error) {
        return <p>No se pudo obtener los gastos</p>;
    }

    return (
        <>
            {notification.isOpen && (
                <Notification
                    message={notification.message}
                    isOpen={notification.isOpen}
                    duration={3000} // Duración en milisegundos
                    onClose={() => setNotification({ ...notification, isOpen: false })}
                />
            )}
            <Modal isOpen={isModalOpen} onClose={closeModal} onConfirm={() => eliminarGasto(elementDelete)} title={'Eliminar el gasto'}>
                <p>Estas seguro que deseas eliminar el gasto?</p>
            </Modal>

            <div className="grid grid-cols-3 gap-6">
                <div className="bg-slate-800 hover:bg-slate-700 cursor-pointer rounded-xl">
                    <Link className="w-full my-auto flex justify-center items-center h-32" to={'/addExpense'}>
                        <p className="text-center m-auto">Agregar gasto</p>
                    </Link>
                </div>
                <div className="bg-slate-800 hover:bg-slate-700 w-full rounded-xl">
                    <p className="pt-4 text-center pb-4">Filtrar</p>
                    <select value={categoria} onChange={handleCategoriaChange} className="block w-11/12 mx-auto">
                        <option value="">Ninguna</option>
                        {categoriesExpense.map((categoria) => (
                            <option key={categoria.id} value={categoria.id}>
                                {categoria.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="bg-slate-800 hover:bg-slate-700 cursor-pointer rounded-xl">
                    <p className="pt-4 text-center pb-4">Busqueda</p>
                    <input className="block w-11/12 mx-auto" type="text" value={buscarNombre} onChange={handleBuscarNombre} placeholder="Buscar por nombre" />
                </div>
                <div className="bg-slate-800 rounded-xl col-span-3 row-span-6 max-h-112 overflow-y-auto">{filteredExpenses.length > 0 ? <Table expenses={filteredExpenses} handleEditar={handleEditar} handleEliminar={handleEliminar} /> : <p className="text-center text-2xl mt-7">No hay gastos encontrados</p>}</div>
            </div>
        </>
    );
};

export default Expense;
