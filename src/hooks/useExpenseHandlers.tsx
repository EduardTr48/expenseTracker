import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteExpenseAPI } from '../services/expenseService';

interface useExpenseHandlersProps{
    setElementDelete: (id : number)=>void,
    deleteExpense: (id: number)=>void,
    setNotification: (notification: {isOpen: boolean; message: string})=>void,
    closeModal: ()=>void,
    openModal: ()=>void

}

const useExpenseHandlers = ({ setElementDelete, openModal, deleteExpense, setNotification, closeModal } : useExpenseHandlersProps) => {
    const navigate = useNavigate();

    const handleEditar = useCallback(
        (id : number) => {
            navigate(`/editExpense/${id}`);
        },
        [navigate]
    );

    const handleEliminar = useCallback(
        (id : number) => {
            setElementDelete(id);
            openModal();
        },
        [openModal, setElementDelete]
    );

    const eliminarGasto = useCallback(
        async (id : number) => {
            
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
