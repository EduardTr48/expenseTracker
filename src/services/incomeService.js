import { mapIncomeFromAPI, mapIncomeToAPI } from '../mappers/incomeMapper';

export async function getIncomesAPI() {
    const response = await fetch(import.meta.env.VITE_API_INCOME_URL);
    const data = await response.json();
    return data.map(mapIncomeFromAPI);
}

export async function getIncomeAPI(id) {
    const response = await fetch(`${import.meta.env.VITE_API_INCOME_URL}/${id}`);
    const data = await response.json();
    return mapIncomeFromAPI(data);
}

export async function addIncomeAPI(datos) {
    const data = mapIncomeToAPI(datos);
    try {
        const respuesta = await fetch(import.meta.env.VITE_API_INCOME_URL, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const resultado = await respuesta.json();
        console.log(resultado);
        return mapIncomeFromAPI(resultado);
    } catch (error) {
        console.log(error);
    }
}

export async function updateIncomeAPI(id, datos) {
    const data = mapIncomeToAPI(datos);
    console.log(data);
    try {
        const response = await fetch(`${import.meta.env.VITE_API_INCOME_URL}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const result = mapIncomeFromAPI(await response.json());
        return result;
    } catch (error) {
        console.log(error);
    }
}

export async function deleteIncomeAPI(id) {
    try {
        const respuesta = await fetch(`${import.meta.env.VITE_API_INCOME_URL}/${id}`, {
            method: 'DELETE',
        });

        if (!respuesta.ok || respuesta.status !== 204) {
            console.error('No se pudo eliminar el gasto');
        }
    } catch (error) {
        console.log(error);
    }
}
