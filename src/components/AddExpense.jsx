import { Form } from 'react-router-dom';
import FormTransaction from './FormTransaction';
import BotonVolver from '../UI/BotonVolver';
import { addExpenseAPI } from '../services/expenseService';
import { validateData } from '../helpers/validateData';
import { getCurrentFormatDate } from '../helpers/getCurrentFormatDate';
import useHandleExpenseAction from '../hooks/useHandleExpenseAction';

export async function action({ request }) {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    const errores = validateData(data);
    if (errores.length > 0) {
        return { errores };
    }
    data.fecha = getCurrentFormatDate();

    try {
        const response = await addExpenseAPI(data);
        return { response };
    } catch (error) {
        console.error('Error al agregar el gasto:', error);
        // Podrías mostrar un mensaje de error al usuario aquí
    }
    return null;
}

const AddExpense = () => {
    const errores = useHandleExpenseAction();

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
                <FormTransaction titulo={'Agregar gasto'} />
                <div className="w-6/12 mx-auto">
                    <input className="px-4 py-2 bg-slate-900 cursor-pointer" type="submit" value="Añadir gasto" />
                </div>
            </Form>
        </>
    );
};

export default AddExpense;
