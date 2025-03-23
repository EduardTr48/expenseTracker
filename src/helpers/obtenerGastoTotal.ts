import { Expense } from "../types/expense";

export const obtenerGastoTotal = (gastos: Expense[]): number => {
    return gastos.reduce((acc, gasto) => acc + Number(gasto.precio), 0);
};
