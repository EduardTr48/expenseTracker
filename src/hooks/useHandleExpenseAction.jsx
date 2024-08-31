import { useExpenses } from '../context/ExpensesContext';
import { useActionData, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const useHandleExpenseAction = () => {
    const { addExpense } = useExpenses();
    const data = useActionData();
    const navigate = useNavigate();
    useEffect(() => {
        if (data?.response) {
            addExpense(data.response);
            navigate('/expense', { state: { addElementSuccess: true } });
        }
    }, [data, addExpense, navigate]);

    return data?.errores;
};

export default useHandleExpenseAction;
