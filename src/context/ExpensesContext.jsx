import React, { createContext, useState } from "react";

const ExpensesContext = createContext();

export const ExpensesProvider = ({ children }) => {
    const [expenses, setExpenses] = useState([
        { id: 1, nombre: "salchichon", precio: 523, categoria: "comida", fecha: "20-11-2024" },
        { id: 2, nombre: "marihuana", precio: 652, categoria: "ocio", fecha: "12-05-2024" },
    ]);

    const addExpense = (newExpense) => {
        setExpenses([...expenses, newExpense]);
    };

    return <ExpensesContext.Provider value={{ expenses, addExpense }}>{children}</ExpensesContext.Provider>;
};

export const useExpenses = () => React.useContext(ExpensesContext);
