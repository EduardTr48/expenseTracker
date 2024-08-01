import { useExpenses } from '../context/ExpensesContext';

const Home = () => {
    const { expenses } = useExpenses();
    console.log(expenses);
    return (
        <div className="grid grid-cols-2 gap-6 h-full pt-10">
            <div className="bg-slate-800 rounded-xl">Tareas pendientes</div>
            <div className="bg-slate-800 rounded-xl">
                {expenses &&
                    expenses.map((expense, index) => (
                        <p className="ml-2 mt-2 uppercase" key={index}>
                            {index + 1} - {expense.nombre}, precio: {expense.precio}
                        </p>
                    ))}
            </div>
            <div className="bg-slate-800 rounded-xl col-span-2">Acceso rapido</div>
            <div className="bg-slate-800 rounded-xl col-span-2">Reporte del Mes</div>
        </div>
    );
};

export default Home;
