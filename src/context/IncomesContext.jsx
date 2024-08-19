import React, { createContext, useState } from 'react';

const IncomesContext = createContext();

export const IncomesProvider = ({ children }) => {
    const [incomes, setIncomes] = useState([
        { id: 1, nombre: 'Pago de Programdor', monto: 1500, categoria: 'Salario', fecha: '2024-08-01' },
        { id: 2, nombre: 'Pago de sitio web', monto: 200, categoria: 'Freelance', fecha: '2024-08-05' },
        { id: 3, nombre: 'Regalo de Beili', monto: 300, categoria: 'Regalo', fecha: '2024-08-10' },
        { id: 4, nombre: 'Transferencia de Beili', monto: 450, categoria: 'Venta', fecha: '2024-08-15' },
        { id: 5, nombre: 'Transferencia de Beili', monto: 100, categoria: 'Intereses', fecha: '2024-08-20' },
    ]);

    const addIncomes = (newIncome) => {
        setIncomes((prevIncomes) => [...prevIncomes, newIncome]);
    };

    const updateIncomes = (newIncome) => {
        setIncomes((prevIncomes) => prevIncomes.map((income) => (income.id == newIncome.id ? newIncome : income)));
    };

    const deleteIncomes = (id) => {
        setIncomes((prevIncomes) => prevIncomes.filter((income) => income.id !== id));
    };

    return <IncomesContext.Provider value={{ incomes, addIncomes, updateIncomes, deleteIncomes }}>{children}</IncomesContext.Provider>;
};

export const useIncomes = () => React.useContext(IncomesContext);
