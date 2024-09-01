import { Form } from 'react-router-dom';
import { useHandleContextAction } from '../hooks';
import { useIncomes } from '../context/IncomesContext';
import FormTransaction from './FormTransaction';
import { addIncomeAPI } from '../services/incomeService';
import { validateData, getCurrentFormatDate } from '../helpers';
export async function action({ request }) {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    const errores = validateData(data);

    if (errores.length > 0) {
        return { errores };
    }

    data.fecha = getCurrentFormatDate();

    try {
        const response = await addIncomeAPI(data);
        return { response };
    } catch (error) {
        console.error('Error al agregar el gasto:', error);
    }
    return null;
}

const AddIncome = () => {
    const { addIncomes } = useIncomes();
    const errores = useHandleContextAction({ actionContext: addIncomes, path: '/incomes', state: { addElementSuccess: true } });

    return (
        <>
            {errores &&
                errores.map((error, index) => (
                    <h3 className="text-red-500 my-5" key={index}>
                        {error}
                    </h3>
                ))}
            <Form method="post" className="bg-slate-800  py-5 rounded-xl">
                <FormTransaction titulo={'Agregar ingreso'} isIncome={true} />
                <div className="w-6/12 mx-auto">
                    <input className="px-4 py-2 bg-slate-900 cursor-pointer" type="submit" value="Agregar ingreso" />
                </div>
            </Form>
        </>
    );
};

export default AddIncome;
