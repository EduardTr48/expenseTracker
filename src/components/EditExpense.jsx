import { formatDate } from '../helpers/formatDate';
import { useExpenses } from '../context/ExpensesContext';
import { useActionData, useNavigate, Form, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import BotonVolver from '../UI/BotonVolver';
import FormTransaction from './FormTransaction';
import { updateExpenseAPI } from '../services/api';
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
    console.log(expense);
    useEffect(() => {
        if (data?.data) {
            data.data.id = id;
            try {
                updateExpenseAPI(id, data.data);
            } catch (error) {
                console.log('Error al actualizar el gasto');
            }
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
            <Form method="post" className="bg-slate-800  py-5 rounded-xl">
                <BotonVolver />
                <FormTransaction entry={expense} titulo={'Editar gasto'} />
                <div className="w-6/12 mx-auto">
                    <input className="px-4 py-2 bg-slate-900 cursor-pointer" type="submit" value="Editar gasto" />
                </div>
            </Form>
        </>
    );
};

export default EditExpense;
