export const obtenerGastosPorFecha = (expenses, date) => {
    return expenses.filter((expense) => {
        const [year, mes] = expense.fecha.split('-');
        const formatMMYY = `${mes}-${year}`;
        return formatMMYY === date;
    });
};
