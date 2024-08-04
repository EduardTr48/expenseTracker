import { Form, useActionData, useNavigate, useParams } from "react-router-dom";
import { useExpenses } from "../context/ExpensesContext";
import { useEffect, useState } from "react";
import { formatDate } from "../helpers/formatDate";
import { autoIncrement } from "../helpers/autoIncrement";

export async function action({ request }) {
    const { id } = useParams();

    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    const errores = [];
    const fechaActual = new Date();
    const getNextIndex = autoIncrement();

    Object.entries(data).forEach(([key, value]) => {
        if (value === "") {
            errores.push(`El campo ${key} es obligatorio`);
        }
    });
    if (errores.length > 0) {
        return { errores };
    }

    data.fecha = formatDate(fechaActual);
    data.id = getNextIndex();
    return { data };
}

const AddExpense = () => {
    const { id } = useParams();

    const [errores, setErrores] = useState([]);
    const { addExpense } = useExpenses();
    const actionData = useActionData();
    const navigate = useNavigate();
    useEffect(() => {
        if (actionData?.errores) {
            setErrores([...actionData.errores]);
        } else if (actionData?.data) {
            addExpense(actionData.data);
            navigate("/expense");
        }
    }, [actionData, addExpense, navigate]);

    return (
        <div className="bg-slate-800 w-full h-full pt-10 rounded-xl">
            <button className="bg-blue-800 text-white px-3 py-1 font-bold uppercase" onClick={() => navigate("/expense")}>
                Volver
            </button>
            <h2 className="text-center text-4xl">Add Expense</h2>
            <Form method="post">
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
