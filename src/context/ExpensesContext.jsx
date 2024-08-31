import React, { createContext, useState, useEffect } from 'react';
import { getExpensesAPI } from '../services/expenseService';

const ExpensesContext = createContext();

export const ExpensesProvider = ({ children }) => {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const data = await getExpensesAPI();
                setExpenses(data);
            } catch (error) {
                setError('Error al obtener los gastos');
            } finally {
                setLoading(false);
            }
        };

        fetchExpenses();
    }, []);

    const addExpense = (newExpense) => {
        setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
    };

    const updateExpense = (newExpense) => {
        setExpenses((prevExpenses) => prevExpenses.map((expense) => (expense.id === newExpense.id ? newExpense : expense)));
    };

    const deleteExpense = (id) => {
        setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== id));
    };

    return <ExpensesContext.Provider value={{ expenses, loading, error, addExpense, updateExpense, deleteExpense }}>{children}</ExpensesContext.Provider>;
};

export const useExpenses = () => React.useContext(ExpensesContext);
