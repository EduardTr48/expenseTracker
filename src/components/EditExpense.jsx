import { formatDate } from '../helpers/formatDate';
import FormExpense from './FormExpense';
import { useExpenses } from '../context/ExpensesContext';
import { useActionData, useNavigate, Form, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import BotonVolver from '../UI/BotonVolver';

export async function action({ request }) {
    const errores = [];
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    const fechaActual = new Date();

    if (Object.values(data).includes('')) {
        errores.push('Todos los campos son obligatorios');
    }
    if (errores.length > 0) {
        return { errores };
    }

    data.fecha = formatDate(fechaActual);
    return { data };
}

const EditExpense = () => {
    const { expenses, updateExpense } = useExpenses();
    const params = useParams();
    const id = +params.id;
    const data = useActionData();
    const errores = data?.errores;
    const navigate = useNavigate();

    const expense = expenses.find((expense) => expense.id === id);

    useEffect(() => {
        if (data?.data) {
            data.data.id = id;
            updateExpense(data.data);
            navigate('/expense', { state: { editElementSuccess: true } });
        }
    }, [data, updateExpense, navigate, id]);

    return (
        <>
            {errores &&
                errores.map((error, index) => (
                    <h3 className="text-red-500 my-5" key={index}>
                        {error}
                    </h3>
                ))}
            <BotonVolver />
            <Form method="post">
                <FormExpense expense={expense} />
                <input className="px-4 py-2 bg-slate-900" type="submit" value="Actualizar gasto" />
            </Form>
        </>
    );
};

export default EditExpense;
