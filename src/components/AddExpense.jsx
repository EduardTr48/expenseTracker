import { Form, useNavigate } from 'react-router-dom';
import { useExpenses } from '../context/ExpensesContext';
import { useState } from 'react';

const AddExpense = () => {
    const { addExpense } = useExpenses();
    const [errores, setErrores] = useState([]);
    const navigate = useNavigate();
    function handleSubmit(event) {
        event.preventDefault();
        setErrores([]);
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());

        if (Object.values(data).includes('')) {
            setErrores(['Llena todos los campos']);
        } else {
            addExpense(data);
            return navigate('/expense');
        }
    }

    return (
        <div className="bg-slate-800 w-full h-full pt-10 rounded-xl">
            <h2 className="text-center text-4xl">Add Expense</h2>
            <Form method="post" onSubmit={handleSubmit}>
                <div className="w-6/12 mx-auto ">
                    {errores &&
                        errores.map((error, index) => (
                            <h3 className="text-red-500 my-5" key={index}>
                                {error}
                            </h3>
                        ))}
                    <div className="mb-4">
                        <label>Nombre</label>
                        <input className="w-full text-gray-900 px-1" type="text" name="nombre" />
                    </div>
                    <div className="mb-4">
                        <label>Precio</label>
                        <input className="w-full text-gray-900 px-1" type="number" name="precio" />
                    </div>
                    <div className="mb-4">
                        <label>Categoria</label>
                        <select className="w-full  text-gray-900 px-1" name="categoria">
                            <option value="">---Seleccione---</option>
                            <option value="comida">Comida</option>
                            <option value="ropa">Ropa</option>
                            <option value="dolarBlue">Dolar Blue</option>
                            <option value="ahorro">Ahorro</option>
                            <option value="transferencia">Transferencia</option>
                            <option value="medicamentos">Medicamento</option>
                        </select>
                    </div>
                    <button className="px-4 py-2 bg-slate-900" type="submit">
                        Añadir gasto
                    </button>
                </div>
            </Form>
        </div>
    );
};

export default AddExpense;
