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
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { useExpenses } from "../context/ExpensesContext";
import { obtenerGastosPorFecha } from "../helpers/obtenerGastosPorFecha";
import { obtenerGastosPorCategoria } from "../helpers/obtenerGastosPorCategoria";
import { useState } from "react";
import { formatDDYY } from "../helpers/formatDate";
import { obtenerGastoTotal } from "../helpers/obtenerGastoTotal";
import { useCategories } from "../context/CategoriesContext";
const ReportMonth = () => {
    const { expenses, error } = useExpenses();
    const { categoriesMap } = useCategories();
    const [date, setDate] = useState("08-2024");
    const dataFilterDate = obtenerGastosPorFecha(expenses, date);
    const data = obtenerGastosPorCategoria(dataFilterDate, categoriesMap);
    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A4DE02", "#D0ED57", "#FF7F50"];
    const gastoTotal = obtenerGastoTotal(dataFilterDate);
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div style={{ backgroundColor: "#333", color: "#fff", padding: "10px", borderRadius: "5px" }}>
                    <p>{`${payload[0].name} : $${payload[0].value}`}</p>
                </div>
            );
        }
    };

    const convertStringToDate = (mmYYYY) => {
        const [month, year] = mmYYYY.split("-").map(Number);
        return new Date(year, month - 1);
    };

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
                    <GraficoBarra data={data} dataXA={"categoria"} dataBar={"gasto"} />
                </ResponsiveContainer>
            ) : (
                <p>No hay gastos</p>
            )}
        </>
    );
};

export default ReportMonth;
