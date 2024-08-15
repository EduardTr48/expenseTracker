import { Link } from "react-router-dom";
import { useExpenses } from "../context/ExpensesContext";
import { obtenerGastoTotal } from "../helpers/obtenerGastoTotal";
import IconMoneyDollarBoxFill from "./IconMoneyDollarBoxFill";

const Home = () => {
    const { expenses } = useExpenses();
    const gastoTotal = obtenerGastoTotal(expenses);
    return (
        <div className="grid grid-cols-3 grid-rows-4 gap-6 h-full pt-10">
            <div className="col-span-1 row-span-1 w-full bg-slate-800 rounded-xl flex">
                <div className="bg-slate-700 max-w-28 w-full h-full rounded-xl rounded-r-none">
                    <IconMoneyDollarBoxFill className={"m-auto h-full text-green-500"} />
                </div>
                <div className="flex flex-col w-full justify-center items-center ">
                    <h2 className="">Ingresos totales: </h2>
                    <p>${gastoTotal}</p>
                </div>
            </div>
            <div className="col-span-1 row-span-1 w-full bg-slate-800 rounded-xl flex">
                <div className="bg-slate-700 max-w-28 w-full h-full rounded-xl rounded-r-none">
                    <IconMoneyDollarBoxFill className={"m-auto h-full text-red-500"} />
                </div>
                <div className="flex flex-col w-full justify-center items-center ">
                    <h2 className="">Gastos Totales: </h2>
                    <p>${gastoTotal}</p>
                </div>
            </div>
            <div className="col-span-1 row-span-1 w-full bg-slate-800 rounded-xl flex">
                <div className="bg-slate-700 max-w-28 w-full h-full rounded-xl rounded-r-none">
                    <IconMoneyDollarBoxFill className={" m-auto h-full text-blue-600"} />
                </div>
                <div className="flex flex-col w-full justify-center items-center ">
                    <h2 className="">Balance: </h2>
                    <p>${gastoTotal}</p>
                </div>
            </div>
            <div className="col-span-1 row-span-3 bg-slate-800 rounded-xl"></div>
            <div className="col-span-2 row-span-3 bg-slate-800 rounded-xl"></div>
        </div>
    );
};

export default Home;
