export const obtenerGastosPorFecha = (expenses, date) => {
    return expenses.filter((expense) => {
        const [, mes, year] = expense.fecha.split('-');
        const formatMMYY = `${mes}-${year}`;
        return formatMMYY === date;
    });
};
