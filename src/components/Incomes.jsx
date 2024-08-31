import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Modal from '../UI/Modal';
import Notification from '../UI/Notification';
import { useIncomes } from '../context/IncomesContext';
import { useCategories } from '../context/CategoriesContext';
import { deleteIncomeAPI } from '../services/incomeService';
import Table from '../UI/Table';
const Incomes = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { addElementSuccess } = location.state || {};
    const { editElementSuccess } = location.state || {};

    const [notification, setNotification] = useState({ isOpen: !!addElementSuccess || !!editElementSuccess, message: addElementSuccess ? 'El ingreso fue agregado correctamente' : editElementSuccess ? 'El ingreso fue editado correctamente' : '' });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [elementDelete, setElementDelete] = useState(null);
    const { incomes, deleteIncomes } = useIncomes();
    const [categoria, setCategoria] = useState('');
    const [buscarNombre, setBuscarNombre] = useState('');
    const { categoriesIncome } = useCategories();

    const incomesFilterd = incomes.filter((income) => {
        const matchesCategoria = categoria ? income.categoria === categoria : true;
        const matchesNombre = buscarNombre ? income.nombre.toLowerCase().includes(buscarNombre.toLowerCase()) : true;
        return matchesCategoria && matchesNombre;
    });

    const handleEditar = (id) => {
        navigate(`/editIncome/${id}`);
    };

    const handleEliminar = (id) => {
        setElementDelete(id);
        openModal();
    };

    const eliminarIngreso = async (id) => {
        try {
            await deleteIncomeAPI(id);
            deleteIncomes(id);
            setNotification({ isOpen: true, message: 'El gasto fue eliminado correctamente' });
            closeModal();
        } catch (error) {
            console.log('El ingreso no pudo ser eliminado');
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setElementDelete(null);
    };

    const handleBuscarNombre = (e) => {
        setBuscarNombre(e.target.value);
    };

    const handleCategoriaChange = (e) => {
        setCategoria(Number(e.target.value));
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
            <Modal isOpen={isModalOpen} onClose={closeModal} onConfirm={() => eliminarIngreso(elementDelete)} title={'Eliminar el ingreso'}>
                <p>Estas seguro que deseas eliminar el ingreso?</p>
            </Modal>
            <div className="grid grid-cols-3 gap-6">
                <div className="bg-slate-800 hover:bg-slate-700 cursor-pointer rounded-xl">
                    <Link className="w-full my-auto flex justify-center items-center h-32" to={'/addIncome'}>
                        <p className="text-center m-auto">Agregar ingreso</p>
                    </Link>
                </div>
                <div className="bg-slate-800 hover:bg-slate-700 w-full rounded-xl">
                    <p className="pt-4 text-center pb-4">Filtrar</p>
                    <select value={categoria} onChange={handleCategoriaChange} className="block w-11/12 mx-auto">
                        <option value="">Ninguna</option>
                        {categoriesIncome.map((categoria) => (
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
                <div className="bg-slate-800 rounded-xl col-span-3 row-span-6 max-h-112 overflow-y-auto">{incomesFilterd.length > 0 ? <Table isIncome={true} data={incomesFilterd} handleEditar={handleEditar} handleEliminar={handleEliminar} /> : <p className="text-center text-2xl mt-7">No hay ingresos encontrados</p>}</div>
            </div>
        </>
    );
};

export default Incomes;
