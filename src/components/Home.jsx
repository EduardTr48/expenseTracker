import { useExpenses } from '../context/ExpensesContext';

const Home = () => {
    const { expenses } = useExpenses();
    console.log(expenses);
    return (
        <div className="grid grid-cols-2 gap-6 h-full pt-10">
            <div className="bg-slate-800 rounded-xl">Tareas pendientes</div>
            <div className="bg-slate-800 rounded-xl">
                <h2 className="text-center mb-7 mt-2">Gastos Recientes</h2>
                <table className="table-fixed w-11/12 mx-auto mt-2">
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
            <div className="bg-slate-800 rounded-xl col-span-2">Acceso rapido</div>
            <div className="bg-slate-800 rounded-xl col-span-2">Reporte del Mes</div>
        </div>
    );
};

export default Home;
