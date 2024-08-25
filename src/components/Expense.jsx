import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useExpenses } from '../context/ExpensesContext';
import { useState } from 'react';
import Modal from './Modal';
import Notification from './Notification';
import { categorias } from '../helpers/categorias';
import { deleteExpenseAPI } from '../services/api';
const Expense = () => {
    const location = useLocation();
    const { addElementSuccess } = location.state || {};
    const { editElementSuccess } = location.state || {};

    const [notification, setNotification] = useState({ isOpen: !!addElementSuccess || !!editElementSuccess, message: addElementSuccess ? 'El gasto fue agregado correctamente' : editElementSuccess ? 'El gasto fue editado correctamente' : '' });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [elementDelete, setElementDelete] = useState(null);
    const navigate = useNavigate();
    const { expenses, deleteExpense, loading, error } = useExpenses();
    const [categoria, setCategoria] = useState('');
    const [buscarNombre, setBuscarNombre] = useState('');
    const categoriasFiltrar = [...new Set(expenses.map((expense) => categorias[expense.categoria]))];

    const filteredExpenses = expenses.filter((expense) => {
        const matchesCategoria = categoria ? expense.categoria === categoria : true;
        const matchesNombre = buscarNombre ? expense.nombre.toLowerCase().includes(buscarNombre.toLowerCase()) : true;
        return matchesCategoria && matchesNombre;
    });

    const handleEditar = (id) => {
        navigate(`/editExpense/${id}`);
    };

    const handleEliminar = (id) => {
        setElementDelete(id);
        openModal();
    };

    const eliminarGasto = async (id) => {
        deleteExpense(id);
        try {
            await deleteExpenseAPI(id);
        } catch (error) {
            console.log('El gasto no pudo ser eliminado');
        }
        setNotification({ isOpen: true, message: 'El gasto fue eliminado correctamente' });
        closeModal();
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setElementDelete(null);
    };

    const handleBuscarNombre = (e) => {
        setBuscarNombre(e.target.value);
    };

    const handleCategoriaChange = (e) => {
        setCategoria(e.target.value);
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

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
            {loading && <p className="text-center">Cargando...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}

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
                        {categoriasFiltrar.map((categoria) => (
                            <option key={categoria} value={categoria}>
                                {categoria}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="bg-slate-800 hover:bg-slate-700 cursor-pointer rounded-xl">
                    <p className="pt-4 text-center pb-4">Busqueda</p>
                    <input className="block w-11/12 mx-auto" type="text" value={buscarNombre} onChange={handleBuscarNombre} placeholder="Buscar por nombre" />
                </div>
                <div className="bg-slate-800 rounded-xl col-span-3 row-span-6 max-h-112 overflow-y-auto">
                    <table className="table-auto w-11/12 mx-auto mt-2">
                        <thead className="text-left">
                            <tr>
                                <th>Id</th>
                                <th>Nombre</th>
                                <th>Precio</th>
                                <th>Categoria</th>
                                <th>Fecha</th>
                            </tr>
                        </thead>
                        <tbody>
                            {expenses &&
                                filteredExpenses.map((expense) => {
                                    return (
                                        <tr className="border-y-2 last:border-t-2 last:border-b-0" key={expense.id}>
                                            <td>{expense.id}</td>
                                            <td>{expense.nombre}</td>
                                            <td>$ {expense.precio}</td>
                                            <td>{categorias[expense.categoria]}</td>
                                            <td>{expense.fecha}</td>
                                            <td className="flex justify-end flex-wrap">
                                                <button className="px-4 py-2 bg-slate-900 hover:bg-slate-950" onClick={() => handleEditar(expense.id)}>
                                                    Editar
                                                </button>
                                                <button className="px-4 py-2 bg-slate-900 hover:bg-slate-950" onClick={() => handleEliminar(expense.id)}>
                                                    Eliminar
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default Expense;
