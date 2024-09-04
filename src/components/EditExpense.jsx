import { useExpenses } from '../context/ExpensesContext';
import BotonVolver from '../UI/BotonVolver';
import { validateData } from '../helpers';
import FormTransaction from './FormTransaction';
import { updateExpenseAPI } from '../services/expenseService';
import { useHandleContextAction, useFindItemById } from '../hooks';
import { Form } from 'react-router-dom';
import AlertError from './AlertError';
export async function action({ request, params }) {
    const id = Number(params.id);
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    const errores = validateData(data);
    if (errores.length > 0) {
        return { errores };
    }
    data.id = id;

    try {
        const response = await updateExpenseAPI(id, data);
        console.log(response);
        return { response };
    } catch (error) {
        console.error('Error al editar el gasto:', error);
        // Podrías mostrar un mensaje de error al usuario aquí
    }
    return null;
}

const EditExpense = () => {
    const { expenses, updateExpense } = useExpenses();
    const { item } = useFindItemById(expenses);
    const errores = useHandleContextAction({ actionContext: updateExpense, path: '/expense', state: { actionElementSucess: true, message: 'El gasto fue editado correctamente' } });

    return (
        <>
            {errores && errores.map((error, index) => <AlertError error={error} index={index} key={index} />)}

            <Form method="post" className="bg-slate-800  py-5 rounded-xl">
                <BotonVolver />
                <FormTransaction entry={item} titulo={'Editar gasto'} />
                <div className="w-6/12 mx-auto">
                    <input className="px-4 py-2 bg-slate-900 cursor-pointer" type="submit" value="Editar gasto" />
                </div>
            </Form>
        </>
    );
};

export default EditExpense;
