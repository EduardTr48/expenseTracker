import { useLocation, useNavigate } from 'react-router-dom';
import Modal from '../UI/Modal';
import Notification from '../UI/Notification';
import { useIncomes } from '../context/IncomesContext';
import { useCategories } from '../context/CategoriesContext';
import Table from '../UI/Table';
import useNotification from '../hooks/useNotification';
import useModal from '../hooks/useModal';
import useFilterdData from '../hooks/useFilterdData';
import { AddLink, FilterCategory, FilterSearch } from '../UI';
import useIncomeHandlers from '../hooks/useIncomeHandlers';
import { useEffect } from 'react';

const Incomes = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const editElementSuccess = location.state?.editElementSuccess;
    const { notification, setNotification } = useNotification(location);
    const { isModalOpen, elementDelete, openModal, closeModal, setElementDelete } = useModal();
    const { incomes, deleteIncomes } = useIncomes();
    const { categoriesIncome } = useCategories();
    const { categoria, buscarNombre, filterdData, setBuscarNombre, setCategoria } = useFilterdData(incomes);
    const { handleEditar, handleEliminar, eliminarIngreso } = useIncomeHandlers({ setElementDelete, openModal, setNotification, closeModal, deleteIncomes });

    useEffect(() => {
        if (editElementSuccess) {
            console.log(location);
            const stateCopy = { ...location.state };
            delete stateCopy.editElementSuccess;
            navigate(location.pathname, { replace: true, state: stateCopy });
        }
    }, [editElementSuccess, location, navigate]);

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
                <FilterCategory categoria={categoria} categories={categoriesIncome} onCategoriaChange={(e) => setCategoria(Number(e.target.value))} />
                <FilterSearch buscarNombre={buscarNombre} onBuscarNombreChange={(e) => setBuscarNombre(e.target.value)} />
                <Table isIncome data={filterdData} handleEditar={handleEditar} handleEliminar={handleEliminar} />
            </div>
        </>
    );
};

export default Incomes;
