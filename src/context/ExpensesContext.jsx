import React, { createContext, useState } from 'react';

const ExpensesContext = createContext();

export const ExpensesProvider = ({ children }) => {
    const [expenses, setExpenses] = useState([
        { id: 1, nombre: 'Supermercado', precio: 150, categoria: 'comida', fecha: '15-06-2024' },
        { id: 2, nombre: 'Camisa', precio: 50, categoria: 'ropa', fecha: '20-07-2024' },
        { id: 3, nombre: 'Cambio de dólares', precio: 200, categoria: 'dolarBlue', fecha: '05-06-2024' },
        { id: 4, nombre: 'Ahorro mensual', precio: 300, categoria: 'ahorro', fecha: '01-08-2024' },
        { id: 5, nombre: 'Transferencia bancaria', precio: 100, categoria: 'transferencia', fecha: '12-07-2024' },
        { id: 6, nombre: 'Medicamentos', precio: 75, categoria: 'medicamentos', fecha: '25-06-2024' },
        { id: 7, nombre: 'Cena en restaurante', precio: 80, categoria: 'comida', fecha: '08-07-2024' },
        { id: 8, nombre: 'Zapatos nuevos', precio: 120, categoria: 'ropa', fecha: '15-08-2024' },
        { id: 9, nombre: 'Compra de dólares', precio: 250, categoria: 'dolarBlue', fecha: '28-06-2024' },
        { id: 10, nombre: 'Inversión en ahorro', precio: 400, categoria: 'ahorro', fecha: '30-08-2024' },
        { id: 11, nombre: 'Envío de dinero', precio: 50, categoria: 'transferencia', fecha: '22-07-2024' },
        { id: 12, nombre: 'Medicamentos recetados', precio: 60, categoria: 'medicamentos', fecha: '10-08-2024' },
        { id: 13, nombre: 'Salida al cine', precio: 30, categoria: 'ocio', fecha: '17-07-2024' },
        { id: 14, nombre: 'Almuerzo en oficina', precio: 20, categoria: 'comida', fecha: '02-06-2024' },
        { id: 15, nombre: 'Pantalones', precio: 70, categoria: 'ropa', fecha: '08-07-2024' },
        { id: 16, nombre: 'Compra en mercado', precio: 40, categoria: 'comida', fecha: '24-08-2024' },
        { id: 17, nombre: 'Diversión con amigos', precio: 100, categoria: 'ocio', fecha: '19-08-2024' },
        { id: 18, nombre: 'Suplementos vitamínicos', precio: 90, categoria: 'medicamentos', fecha: '13-08-2024' },
        { id: 19, nombre: 'Pago por servicio', precio: 150, categoria: 'transferencia', fecha: '27-06-2024' },
        { id: 20, nombre: 'Compras para el hogar', precio: 200, categoria: 'comida', fecha: '31-07-2024' },
    ]);

    const addExpense = (newExpense) => {
        setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
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
