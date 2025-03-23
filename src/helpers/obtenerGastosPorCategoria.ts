import { CategoryMap } from "../context/CategoriesContext";
import { Expense } from "../types/expense";

export const obtenerGastosPorCategoria = (expenses: Expense[], categorias: CategoryMap) => {
    const totalPorCategoria = expenses.reduce((acc:Record<string,number>, expense) => {
        const { categoria, precio } = expense;
        const nombreCategoria = categorias[categoria];

        if(!nombreCategoria){
            return acc;
        }

        if (!acc[nombreCategoria]) {
            acc[nombreCategoria] = 0;
        }

        acc[nombreCategoria] += +precio;
        return acc;
    }, {});

    const data = Object.keys(totalPorCategoria).map((categoria) => ({
        categoria,
        gasto: totalPorCategoria[categoria],
    }));

    return data;
};
