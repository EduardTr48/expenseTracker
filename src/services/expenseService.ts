import { mapExpenseFromApi, mapExpenseToApi } from '../mappers/expenseMapper';
import { Expense } from '../types/expense';

export async function getExpensesAPI(): Promise<Expense[]> {
    const response = await fetch(import.meta.env.VITE_API_EXPENSE_URL);
    const data = await response.json();
    return data.map(mapExpenseFromApi);
}

export async function getExpenseAPI(id: number): Promise<Expense> {
    const response = await fetch(`${import.meta.env.VITE_API_EXPENSE_URL}/${id}`);
    const data = await response.json();
    return mapExpenseFromApi(data);
}

export async function addExpenseAPI(datos: Expense): Promise<Expense | undefined> {
    const data = mapExpenseToApi(datos);
    try {
        const respuesta = await fetch(import.meta.env.VITE_API_EXPENSE_URL, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const resultado = await respuesta.json();
        console.log(resultado);
        return mapExpenseFromApi(resultado);
    } catch (error) {
        console.log(error);
    }
}

export async function updateExpenseAPI(id: number, datos: Expense): Promise<Expense | undefined> {
    const data = mapExpenseToApi(datos);
    console.log(data);
    try {
        const response = await fetch(`${import.meta.env.VITE_API_EXPENSE_URL}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const result = mapExpenseFromApi(await response.json());
        return result;
    } catch (error) {
        console.log(error);
    }
}

export async function deleteExpenseAPI(id: number) {
    try {
        const respuesta = await fetch(`${import.meta.env.VITE_API_EXPENSE_URL}/${id}`, {
            method: 'DELETE',
        });

        if (!respuesta.ok || respuesta.status !== 204) {
            console.error('No se pudo eliminar el gasto');
        }
    } catch (error) {
        console.log(error);
    }
}
