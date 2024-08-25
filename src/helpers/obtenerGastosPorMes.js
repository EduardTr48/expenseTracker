export const obtenerGastosPorMes = (expenses) => {
    const totalPorMes = expenses.reduce((acc, expense) => {
        const { fecha, precio } = expense;
        const [year, mes] = fecha.split('-');
        const key = `${mes}-${year}`;
        if (!acc[key]) {
            acc[key] = 0;
        }
        acc[key] += +precio;
        return acc;
    }, {});

    const data = Object.keys(totalPorMes).map((mes) => ({
        mes,
        gasto: totalPorMes[mes],
    }));

    return data;
};
