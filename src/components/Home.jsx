import { useExpenses } from '../context/ExpensesContext';
import { obtenerGastoTotal } from '../helpers/obtenerGastoTotal';
import IconMoneyDollarBoxFill from './IconMoneyDollarBoxFill';
import { obtenerGastosPorCategoria } from '../helpers/obtenerGastosPorCategoria';
import GraficoPastel from './GraficoPastel';
import { obtenerGastosPorMes } from '../helpers/obtenerGastosPorMes';
import GraficoBarra from './GraficoBarra';
import { useIncomes } from '../context/IncomesContext';
import { obtenerIngresoTotal } from '../helpers/ObtenerIngresoTotal';
const Home = () => {
    const { expenses } = useExpenses();
    const { incomes } = useIncomes();
    const gastoTotal = obtenerGastoTotal(expenses);
    const ingresoTotal = obtenerIngresoTotal(incomes);
    const data = obtenerGastosPorCategoria(expenses);
    const gastosPorMes = obtenerGastosPorMes(expenses);

    return (
        <div className="grid grid-cols-3 grid-rows-4 gap-6 h-full pt-10">
            <div className="col-span-1 row-span-1 w-full bg-slate-800 rounded-xl flex">
                <div className="bg-slate-700 max-w-28 w-full h-full rounded-xl rounded-r-none">
                    <IconMoneyDollarBoxFill className={'w-full h-full mx-auto text-green-500'} />
                </div>
                <div className="flex flex-col w-full justify-center items-center ">
                    <h2 className="">Ingresos totales: </h2>
                    <p>${ingresoTotal}</p>
                </div>
            </div>
            <div className="col-span-1 row-span-1 w-full bg-slate-800 rounded-xl flex">
                <div className="bg-slate-700 max-w-28 w-full h-full rounded-xl rounded-r-none">
                    <IconMoneyDollarBoxFill className={'w-full h-full mx-auto text-red-500'} />
                </div>
                <div className="flex flex-col w-full justify-center items-center ">
                    <h2 className="">Gastos Totales: </h2>
                    <p>${gastoTotal}</p>
                </div>
            </div>
            <div className="col-span-1 row-span-1 w-full bg-slate-800 rounded-xl flex">
                <div className="bg-slate-700 max-w-28 w-full h-full rounded-xl rounded-r-none">
                    <IconMoneyDollarBoxFill className={' w-full h-full mx-auto text-blue-600'} />
                </div>
                <div className="flex flex-col w-full justify-center items-center ">
                    <h2 className="">Balance: </h2>
                    <p>${ingresoTotal - gastoTotal}</p>
                </div>
            </div>
            <div className="col-span-1 row-span-3 bg-slate-800 rounded-xl flex justify-center items-center ">
                <GraficoPastel dataKey="gasto" nameKey={'categoria'} data={data} />
            </div>
            <div className="col-span-2 row-span-3 bg-slate-800 rounded-xl flex justify-center items-center ">
                <GraficoBarra data={gastosPorMes} dataXA={'mes'} dataBar={'gasto'} />
            </div>
        </div>
    );
};

export default Home;
