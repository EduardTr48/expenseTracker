import { Link } from 'react-router-dom';
import { useExpenses } from '../context/ExpensesContext';

const Home = () => {
    const { expenses } = useExpenses();
    return (
        <div className="grid grid-cols-2 gap-6 h-full pt-10">
            <div className="bg-slate-800 rounded-xl">
                <h2 className="text-center mb-7 mt-2">Gastos Recientes</h2>
                <table className="table-auto w-11/12 mx-auto mt-2">
                    <thead className="text-left">
                        <tr>
                            <th>Nombre</th>
                            <th>Precio</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expenses &&
                            expenses.map((expense) => {
                                return (
                                    <tr className="border-y-2" key={expense.id}>
                                        <td>{expense.nombre}</td>
                                        <td>$ {expense.precio}</td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </div>
            <div className="bg-slate-800 rounded-xl col-span-1">
                <Link className="w-full my-auto flex justify-center items-center h-full" to={'/addExpense'}>
                    <p className="text-center m-auto">Acceso Rapido</p>
                </Link>
            </div>
            <div className="bg-slate-800 rounded-xl col-span-2">
                <Link className="w-full my-auto flex justify-center items-center h-full" to={'/addExpense'}>
                    <p className="text-center m-auto">Reporte del Mes</p>
                </Link>
            </div>
        </div>
    );
};

export default Home;
