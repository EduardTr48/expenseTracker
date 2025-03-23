import { Income } from "../types/income";
import { APIIncome } from "../types/APIIncome";
export function mapIncomeFromAPI(income: APIIncome) {
    return {
        id: income.id,
        nombre: income.name,
        monto: income.amount,
        categoria: income.categoryId,
        fecha: income.date,
    };
}

export function mapIncomeToAPI(income: Income) {
    return {
        id: Number(income.id),
        name: income.nombre,
        amount: Number(income.monto),
        categoryId: Number(income.categoria),
        date: income.fecha,
    };
}

export function mapFormDataToIncome(formData: FormData): Income{
    return {
        id: Number(formData.get("id")),
        nombre: formData.get("nombre") as string,
        monto: Number(formData.get("monto")),
        categoria: Number(formData.get("categoria")),
        fecha: formData.get("fecha") as string
    };
}

