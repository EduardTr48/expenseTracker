import { categorias } from './categorias';

export const obtenerGastosPorCategoria = (expenses) => {
    const totalPorCategoria = expenses.reduce((acc, expense) => {
        const { categoria, precio } = expense;
        if (!acc[categorias[categoria]]) {
            acc[categorias[categoria]] = 0;
        }

        acc[categorias[categoria]] += +precio;
        return acc;
    }, {});

    const data = Object.keys(totalPorCategoria).map((categoria) => ({
        categoria,
        gasto: totalPorCategoria[categoria],
    }));

    return data;
};
