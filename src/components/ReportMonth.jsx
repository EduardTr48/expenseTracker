import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { obtenerGastosPorCategoria } from '../helpers/obtenerGastosPorCategoria';
import { useExpenses } from '../context/ExpensesContext';

const ReportMonth = () => {
    const { expenses } = useExpenses();
    const data = obtenerGastosPorCategoria(expenses);
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A4DE02', '#D0ED57', '#FF7F50'];

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div style={{ backgroundColor: '#333', color: '#fff', padding: '10px', borderRadius: '5px' }}>
                    <p>{`${payload[0].name} : $${payload[0].value}`}</p>
                </div>
            );
        }
    };
    console.log(data);
    return (
        <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="categoria" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="gasto">
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
};

export default ReportMonth;
