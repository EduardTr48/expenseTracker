import { Link } from 'react-router-dom';
import { useExpenses } from '../context/ExpensesContext';
const Expense = () => {
    const { expenses } = useExpenses();
    return (
        <div className="grid grid-cols-3 gap-6 h-full pt-10">
            <div className="bg-slate-800 hover:bg-slate-700 cursor-pointer rounded-xl">
                <Link className="w-full h-full inline-block" to={'/addExpense'}>
                    Add Expense
                </Link>
            </div>
            <div className="bg-slate-800 hover:bg-slate-700 cursor-pointer rounded-xl">Filtrar</div>
            <div className="bg-slate-800 hover:bg-slate-700 cursor-pointer rounded-xl">Busqueda</div>
            <div className="bg-slate-800 rounded-xl col-span-3 row-span-6">
                <table className="table-fixed w-full ml-6 mt-2">
                    <thead className="text-left">
                        <tr>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Categoria</th>
                            <th>Fecha</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expenses &&
                            expenses.map((expense, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{expense.nombre}</td>
                                        <td>{expense.precio}</td>
                                        <td>{expense.categoria}</td>
                                        <td>{expense.fecha}</td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Expense;
