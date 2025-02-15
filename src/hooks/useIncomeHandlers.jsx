import { useNavigate } from 'react-router-dom';
import { deleteIncomeAPI } from '../services/incomeService';
import { useCallback } from 'react';

const useIncomeHandlers = ({ setElementDelete, openModal, setNotification, closeModal, deleteIncomes }) => {
    const navigate = useNavigate();

    const handleEditar = useCallback(
        (id) => {
            navigate(`/editIncome/${id}`);
        },
        [navigate]
    );

    const handleEliminar = useCallback(
        (id) => {
            setElementDelete(id);
            openModal();
        },
        [setElementDelete, openModal]
    );

    const eliminarIngreso = useCallback(
        async (id) => {
            try {
                await deleteIncomeAPI(id);
                deleteIncomes(id);
                setNotification({ isOpen: true, message: 'El ingreso fue eliminado correctamente' });
                closeModal();
            } catch (error) {
                console.log('El ingreso no pudo ser eliminado');
            }
        },
        [deleteIncomes, closeModal, setNotification]
    );

    return {
        handleEditar,
        handleEliminar,
        eliminarIngreso,
    };
};

export default useIncomeHandlers;
