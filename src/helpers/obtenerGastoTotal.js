export const obtenerGastoTotal = (gastos) => {
    return gastos.reduce((acc, gasto) => acc + Number(gasto.precio), 0);
};
