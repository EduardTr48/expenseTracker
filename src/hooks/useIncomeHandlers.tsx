import { useNavigate } from 'react-router-dom';
import { deleteIncomeAPI } from '../services/incomeService';
import { useCallback } from 'react';

interface useIncomeHandlersProps{
    setNotification: ( notification : {isOpen:boolean;message: string})=>void,
    setElementDelete: (id : number)=>void,
    deleteIncomes: (id : number)=>void,
    openModal: ()=>void,
    closeModal: ()=>void,

}

const useIncomeHandlers = ({ setElementDelete, openModal, setNotification, closeModal, deleteIncomes } : useIncomeHandlersProps) => {
    const navigate = useNavigate();

    const handleEditar = useCallback(
        (id: number) => {
            navigate(`/editIncome/${id}`);
        },
        [navigate]
    );

    const handleEliminar = useCallback(
        (id : number) => {
            setElementDelete(id);
            openModal();
        },
        [setElementDelete, openModal]
    );

    const eliminarIngreso = useCallback(
        async (id : number) => {
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
