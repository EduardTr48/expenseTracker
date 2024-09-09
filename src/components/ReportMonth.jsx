import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useExpenses } from '../context/ExpensesContext';
import { obtenerGastosPorFecha } from '../helpers/obtenerGastosPorFecha';
import { obtenerGastosPorCategoria } from '../helpers/obtenerGastosPorCategoria';
import { useState } from 'react';
import { formatMMYY } from '../helpers/formatDate';
import { obtenerGastoTotal } from '../helpers/obtenerGastoTotal';
import { useCategories } from '../context/CategoriesContext';
import { convertStringToDate } from '../helpers';
const ReportMonth = () => {
    const { expenses, error } = useExpenses();
    const { categoriesMap } = useCategories();
    const [date, setDate] = useState('08-2024');
    const dataFilterDate = obtenerGastosPorFecha(expenses, date);
    const data = obtenerGastosPorCategoria(dataFilterDate, categoriesMap);
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A4DE02', '#D0ED57', '#FF7F50'];
    const gastoTotal = obtenerGastoTotal(dataFilterDate);
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div style={{ backgroundColor: '#333', color: '#fff', padding: '10px', borderRadius: '5px' }}>
                    <p>{`${payload[0].name} : $${payload[0].value}`}</p>
                </div>
            );
        }
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
            <p>Gasto Total: ${gastoTotal}</p>
            <div className="flex justify-between">
                <button onClick={() => changeMonth(-1)}>Anterior</button>
                <h2 className="text-center">{date}</h2>
                <button onClick={() => changeMonth(1)}>Siguiente</button>
            </div>
            {gastoTotal ? (
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="categoria" tickCount={5} />
                        <YAxis />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar dataKey="gasto">
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            ) : (
                <p>No hay gastos</p>
            )}
        </>
    );
};

export default ReportMonth;
