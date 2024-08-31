import { mapExpenseFromApi, mapExpenseToApi } from '../mappers/expenseMapper';

export async function getExpensesAPI() {
    const response = await fetch(import.meta.env.VITE_API_EXPENSE_URL);
    const data = await response.json();
    return data.map(mapExpenseFromApi);
}

export async function obtenerCategorias() {
    const response = await fetch('http://localhost:8080/api/categories');
    const categorias = await response.json();
    return categorias;
}

export async function getExpenseAPI(id) {
    const response = await fetch(`${import.meta.env.VITE_API_EXPENSE_URL}/${id}`);
    const data = await response.json();
    return mapExpenseFromApi(data);
}

export async function addExpenseAPI(datos) {
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

export async function updateExpenseAPI(id, datos) {
    const data = mapExpenseToApi(datos);
    console.log(data);
    try {
        const respuesta = await fetch(`${import.meta.env.VITE_API_EXPENSE_URL}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        await respuesta.json();
    } catch (error) {
        console.log(error);
    }
}

export async function deleteExpenseAPI(id) {
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
