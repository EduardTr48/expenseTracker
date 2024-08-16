import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const GraficoPastel = ({ data, ...props }) => {
    const COLORS = [
        "#9ABF9F", // Pastel Green
        "#F8A2A2", // Pastel Pink
        "#F5C8B2", // Pastel Peach
        "#A0C2F4", // Pastel Blue
        "#C4A6F6", // Pastel Purple
        "#A0F5D2", // Pastel Mint
        "#F7F5A5", // Pastel Yellow
    ];
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, value }) => {
        const RADIAN = Math.PI / 180;
        const radius = innerRadius + (outerRadius - innerRadius) * 1.3;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central" fontSize={16}>
                {`${((value * 100) / data.reduce((acc, entry) => acc + entry.gasto, 0)).toFixed(0)}%`}
            </text>
        );
    };
    return (
        <ResponsiveContainer width={"100%"} height="85%">
            <PieChart width={150} height={150}>
                <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={100} fill="#8884d8" label={renderCustomizedLabel} paddingAngle={0} labelLine={false} {...props}>
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />

                <Legend layout="horizontal" align="center" verticalAlign="bottom" />
            </PieChart>
        </ResponsiveContainer>
    );
};

export default GraficoPastel;
