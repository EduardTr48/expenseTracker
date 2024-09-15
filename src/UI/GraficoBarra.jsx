import { BarChart, XAxis, YAxis, Tooltip, Bar } from 'recharts';
import { memo } from 'react';
const GraficoBarra = ({ data, dataXA, dataBar }) => {
    return (
        <BarChart width={700} height={350} data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey={dataXA} />
            <YAxis />
            <Tooltip />

            <Bar dataKey={dataBar} fill="#8884d8" />
        </BarChart>
    );
};

export default memo(GraficoBarra);
