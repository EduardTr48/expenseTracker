import { convertStringToDate } from './convertStringToDate';

export const obtenerGastosAgrupadosPorMes = (expenses) => {
    const gastosPorMes = agruparGastosPorMes(expenses);
    const gastosOrdenados = [...gastosPorMes].sort((a, b) => convertStringToDate(a.mes) - convertStringToDate(b.mes));

    return gastosOrdenados;
};

function agruparGastosPorMes(gastos) {
    return gastos.reduce((acumulador, gasto) => {
        const { fecha, precio } = gasto;
        /* yyyy-mm-dd */
        const [year, mes] = fecha.split('-');
        /* mm-yyyy */
        const key = `${mes}-${year}`;
        const existKey = acumulador.find((entry) => entry.mes == key);

        if (existKey) {
            existKey.gasto += Number(precio);
        } else {
            acumulador.push({ mes: key, gasto: Number(precio) });
        }

        return acumulador;
    }, []);
}
