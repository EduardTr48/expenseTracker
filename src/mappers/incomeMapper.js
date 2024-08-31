export function mapIncomeFromAPI(income) {
    return {
        id: income.id,
        nombre: income.name,
        monto: income.amount,
        categoria: income.categoryId,
        fecha: income.date,
    };
}

export function mapIncomeToAPI(income) {
    return {
        id: income.id,
        name: income.nombre,
        amount: Number(income.monto),
        categoryId: Number(income.categoria),
        date: income.fecha,
    };
}
