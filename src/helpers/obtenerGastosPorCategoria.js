export const obtenerGastosPorCategoria = (expenses) => {
    const totalPorCategoria = expenses.reduce((acc, expense) => {
        const { categoria, precio } = expense;
        if (!acc[categoria]) {
            acc[categoria] = 0;
        }

        acc[categoria] += +precio;
        return acc;
    }, {});

    const data = Object.keys(totalPorCategoria).map((categoria) => ({
        categoria,
        gasto: totalPorCategoria[categoria],
    }));

    return data;
};
