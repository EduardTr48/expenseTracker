import { useNavigate } from 'react-router-dom';
import { deleteIncomeAPI } from '../services/incomeService';

const useIncomeHandlers = ({ setElementDelete, openModal, setNotification, closeModal, deleteIncomes }) => {
    const navigate = useNavigate();

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

    return {
        handleEditar,
        handleEliminar,
        eliminarIngreso,
    };
};

export default useIncomeHandlers;
