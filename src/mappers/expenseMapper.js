export function mapExpenseFromApi(expense) {
    return {
        id: expense.id,
        nombre: expense.name,
        precio: expense.amount,
        categoria: Number(expense.categoryId),
        fecha: expense.date,
    };
}

export function mapExpenseToApi(expense) {
    return {
        id: expense.id,
        name: expense.nombre,
        amount: Number(expense.precio),
        categoryId: Number(expense.categoria),
        date: expense.fecha,
    };
}
