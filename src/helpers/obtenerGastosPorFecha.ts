import { Expense } from "../types/expense";

export const obtenerGastosPorFecha = (expenses: Expense[], date: string) : Expense[] => {
    return expenses.filter((expense) => {
        const [year, mes] = expense.fecha.split('-');
        const formatMMYY = `${mes}-${year}`;
        return formatMMYY === date;
    });
};
