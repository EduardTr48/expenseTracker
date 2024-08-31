import React, { createContext, useEffect, useState } from 'react';
import { getIncomesAPI } from '../services/incomeService';

const IncomesContext = createContext();

export const IncomesProvider = ({ children }) => {
    const [incomes, setIncomes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchIncomes = async () => {
            try {
                const data = await getIncomesAPI();
                setIncomes(data);
            } catch (error) {
                setError('No se pudo obtener los ingresos');
            } finally {
                setLoading(false);
            }
        };

        fetchIncomes();
    }, []);

    const addIncomes = (newIncome) => {
        setIncomes((prevIncomes) => [...prevIncomes, newIncome]);
    };

    const updateIncomes = (newIncome) => {
        setIncomes((prevIncomes) => prevIncomes.map((income) => (income.id == newIncome.id ? newIncome : income)));
    };

    const deleteIncomes = (id) => {
        setIncomes((prevIncomes) => prevIncomes.filter((income) => income.id !== id));
    };

    return <IncomesContext.Provider value={{ incomes, addIncomes, updateIncomes, deleteIncomes, loading, error }}>{children}</IncomesContext.Provider>;
};

export const useIncomes = () => React.useContext(IncomesContext);
