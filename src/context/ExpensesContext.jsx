import React, { createContext, useState } from 'react';

const ExpensesContext = createContext();

export const ExpensesProvider = ({ children }) => {
    const [expenses, setExpenses] = useState([
        { id: 1, nombre: 'Supermercado', precio: 150, categoria: 'comida' },
        { id: 2, nombre: 'Camisa', precio: 50, categoria: 'ropa' },
        { id: 3, nombre: 'Cambio de dólares', precio: 200, categoria: 'dolarBlue' },
        { id: 4, nombre: 'Ahorro mensual', precio: 300, categoria: 'ahorro' },
        { id: 5, nombre: 'Transferencia bancaria', precio: 100, categoria: 'transferencia' },
        { id: 6, nombre: 'Medicamentos', precio: 75, categoria: 'medicamentos' },
        { id: 7, nombre: 'Cena en restaurante', precio: 80, categoria: 'comida' },
        { id: 8, nombre: 'Zapatos nuevos', precio: 120, categoria: 'ropa' },
        { id: 9, nombre: 'Compra de dólares', precio: 250, categoria: 'dolarBlue' },
        { id: 10, nombre: 'Inversión en ahorro', precio: 400, categoria: 'ahorro' },
        { id: 11, nombre: 'Envío de dinero', precio: 50, categoria: 'transferencia' },
        { id: 12, nombre: 'Medicamentos recetados', precio: 60, categoria: 'medicamentos' },
        { id: 13, nombre: 'Salida al cine', precio: 30, categoria: 'ocio' },
        { id: 14, nombre: 'Almuerzo en oficina', precio: 20, categoria: 'comida' },
        { id: 15, nombre: 'Pantalones', precio: 70, categoria: 'ropa' },
        { id: 16, nombre: 'Compra en mercado', precio: 40, categoria: 'comida' },
        { id: 17, nombre: 'Diversión con amigos', precio: 100, categoria: 'ocio' },
        { id: 18, nombre: 'Suplementos vitamínicos', precio: 90, categoria: 'medicamentos' },
        { id: 19, nombre: 'Pago por servicio', precio: 150, categoria: 'transferencia' },
        { id: 20, nombre: 'Compras para el hogar', precio: 200, categoria: 'comida' },
    ]);

    const addExpense = (newExpense) => {
        setExpenses([...expenses, newExpense]);
    };

    const updateExpense = (newExpense) => {
        setExpenses((prevExpenses) => prevExpenses.map((expense) => (expense.id === newExpense.id ? newExpense : expense)));
    };

    const deleteExpense = (id) => {
        setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== id));
    };

    return <ExpensesContext.Provider value={{ expenses, addExpense, updateExpense, deleteExpense }}>{children}</ExpensesContext.Provider>;
};

export const useExpenses = () => React.useContext(ExpensesContext);
