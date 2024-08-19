import { BarChart, XAxis, YAxis, Tooltip, Bar } from 'recharts';

const GraficoBarra = ({ data, dataXA, dataBar }) => {
    return (
        <BarChart width={600} height={400} data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey={dataXA} />
            <YAxis />
            <Tooltip />

            <Bar dataKey={dataBar} fill="#8884d8" />
        </BarChart>
    );
};

export default GraficoBarra;
