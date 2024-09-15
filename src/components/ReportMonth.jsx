import { ResponsiveContainer } from "recharts";
import { useExpenses } from "../context/ExpensesContext";
import { obtenerGastosPorFecha } from "../helpers/obtenerGastosPorFecha";
import { obtenerGastosPorCategoria } from "../helpers/obtenerGastosPorCategoria";
import { useState } from "react";
import { formatMMYY } from "../helpers/formatDate";
import { obtenerGastoTotal } from "../helpers/obtenerGastoTotal";
import { useCategories } from "../context/CategoriesContext";
import { convertStringToDate } from "../helpers";
import GraficoBarra from "../UI/GraficoBarra";
const ReportMonth = () => {
    const { expenses, error } = useExpenses();
    const { categoriesMap } = useCategories();
    const [date, setDate] = useState("08-2024");
    const dataFilterDate = obtenerGastosPorFecha(expenses, date);
    const data = obtenerGastosPorCategoria(dataFilterDate, categoriesMap);
    const gastoTotal = obtenerGastoTotal(dataFilterDate);

    const changeMonth = (months) => {
        const newDate = new Date(convertStringToDate(date));
        newDate.setMonth(newDate.getMonth() + months);
        setDate(formatMMYY(newDate));
    };

    if (error) {
        return <p>No se encontraron gastos</p>;
    }

    return (
        <>
            <p className="text-2xl">Gasto Total: ${gastoTotal}</p>
            <div className="my-5 flex justify-between">
                <button className="px-4 py-2 bg-slate-900" onClick={() => changeMonth(-1)}>
                    Anterior
                </button>
                <h2 className="text-center text-2xl">{date}</h2>
                <button className="px-4 py-2 bg-slate-900" onClick={() => changeMonth(1)}>
                    Siguiente
                </button>
            </div>
            {gastoTotal ? (
                <ResponsiveContainer width="100%" height={400}>
                    <GraficoBarra data={data} dataXA={"categoria"} width={1000} dataBar={"gasto"} />
                </ResponsiveContainer>
            ) : (
                <p>No hay gastos</p>
            )}
        </>
    );
};

export default ReportMonth;
