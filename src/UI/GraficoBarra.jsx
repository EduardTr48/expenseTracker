import { BarChart, XAxis, YAxis, Tooltip, Bar, Cell } from "recharts";
import { memo } from "react";

const GraficoBarra = ({ data, dataXA, dataBar, width = 700 }) => {
    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A4DE02", "#D0ED57", "#FF7F50"];

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div style={{ backgroundColor: "#333", color: "#fff", padding: "10px", borderRadius: "5px" }}>
                    <p>{`${payload[0].name} : $${payload[0].value}`}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <BarChart width={width} height={350} data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey={dataXA} />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey={dataBar}>
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Bar>
        </BarChart>
    );
};

export default memo(GraficoBarra);
