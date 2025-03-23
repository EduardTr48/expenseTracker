import { Expense } from '../types/expense';
import { convertStringToDate } from './convertStringToDate';

interface GastoPorMes{
    mes: string,
    gasto: number
}

export const obtenerGastosAgrupadosPorMes = (expenses: Expense[]) : GastoPorMes[] => {
    const gastosPorMes = agruparGastosPorMes(expenses);
    const gastosOrdenados = [...gastosPorMes].sort((a, b) => convertStringToDate(a.mes).getTime() - convertStringToDate(b.mes).getTime());

    return gastosOrdenados;
};

function agruparGastosPorMes(gastos: Expense[]) : GastoPorMes[] {
    return gastos.reduce((acumulador: GastoPorMes[], gasto) => {
        const { fecha, precio } = gasto;
        /* yyyy-mm-dd */
        const [year, mes] = fecha.split('-');
        /* mm-yyyy */
        const key = `${mes}-${year}`;
        const existKey = acumulador.find((entry) => entry.mes == key);

        if (existKey) {
            existKey.gasto += precio;
        } else {
            acumulador.push({ mes: key, gasto: Number(precio) });
        }

        return acumulador;
    }, []);
}
