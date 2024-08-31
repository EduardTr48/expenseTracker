import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteExpenseAPI } from '../services/expenseService';

const useExpenseHandlers = (setElementDelete, openModal, deleteExpense, setNotification, closeModal) => {
    const navigate = useNavigate();

    const handleEditar = useCallback(
        (id) => {
            navigate(`/editExpense/${id}`);
        },
        [navigate]
    );

    const handleEliminar = useCallback(
        (id) => {
            setElementDelete(id);
            openModal();
        },
        [openModal, setElementDelete]
    );

    const eliminarGasto = useCallback(
        async (id) => {
            try {
                await deleteExpenseAPI(id);
                deleteExpense(id);
                setNotification({ isOpen: true, message: 'El gasto fue eliminado correctamente' });
                closeModal();
            } catch (error) {
                console.log('El gasto no pudo ser eliminado');
            }
        },
        [closeModal, deleteExpense, setNotification]
    );

    return {
        handleEditar,
        handleEliminar,
        eliminarGasto,
    };
};

export default useExpenseHandlers;
