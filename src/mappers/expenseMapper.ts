import { Expense } from "../types/expense";
import { APIExpense } from "../types/APIExpense";
export function mapExpenseFromApi(expense: APIExpense):Expense {
    return {
        id: expense.id,
        nombre: expense.name,
        precio: Number(expense.amount),
        categoria: Number(expense.categoryId),
        fecha: expense.date,
    };
}

export function mapExpenseToApi(expense: Expense): APIExpense {
    return {
        id: expense.id,
        name: expense.nombre,
        amount: Number(expense.precio),
        categoryId: Number(expense.categoria),
        date: expense.fecha,
    };
}

export function mapFormDataToExpense(formData: FormData): Expense{
    return {
        id: Number(formData.get("id")),
        nombre: formData.get("nombre") as string,
        precio: Number(formData.get("precio")),
        categoria: Number(formData.get("categoria")),
        fecha: formData.get("fecha") as string
    };
}
