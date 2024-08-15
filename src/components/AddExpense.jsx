import { Form, useActionData, useNavigate } from 'react-router-dom';

import FormExpense from './FormExpense';
import { useEffect } from 'react';
import { useExpenses } from '../context/ExpensesContext';
import { nextId } from '../helpers/autoIncrement';
import { formatDate } from '../helpers/formatDate';
import BotonVolver from '../UI/BotonVolver';

export async function action({ request }) {
    console.log('desde action');
    const errores = [];
    const formData = await request.formData();
    const fechaActual = new Date();
    const data = Object.fromEntries(formData);
    if (Object.values(data).includes('')) {
        errores.push('Todos los campos son obligatorios');
    }
    if (errores.length > 0) {
        return { errores };
    }
    data.id = nextId();
    data.fecha = formatDate(fechaActual);
    return { data };
}

const AddExpense = () => {
    const { addExpense: agregarGasto } = useExpenses();
    const data = useActionData();
    const errores = data?.errores;
    const navigate = useNavigate();

    useEffect(() => {
        if (data?.data) {
            agregarGasto(data.data);
            navigate('/expense', { state: { addElementSuccess: true } });
        }
    }, [data, agregarGasto, navigate]);

    return (
        <>
            {errores &&
                errores.map((error, index) => (
                    <h3 className="text-red-500 my-5" key={index}>
                        {error}
                    </h3>
                ))}
            <Form method="post" className="bg-slate-800  py-5 rounded-xl">
                <BotonVolver />
                <FormExpense />
                <div className="w-6/12 mx-auto">
                    <input className="px-4 py-2 bg-slate-900 cursor-pointer" type="submit" value="Añadir gasto" />
                </div>
            </Form>
        </>
    );
};

export default AddExpense;
