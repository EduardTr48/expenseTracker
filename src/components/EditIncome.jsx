import FormTransaction from './FormTransaction';
import { Form } from 'react-router-dom';
import { useIncomes } from '../context/IncomesContext';
import BotonVolver from '../UI/BotonVolver';
import { updateIncomeAPI } from '../services/incomeService';
import { useFindItemById, useHandleContextAction } from '../hooks';
import { getCurrentFormatDate, validateData } from '../helpers';
import AlertError from './AlertError';

export async function action({ request, params }) {
    const id = Number(params.id);
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    const errores = validateData(data);

    if (errores.length > 0) {
        return { errores };
    }

    data.fecha = getCurrentFormatDate();
    data.id = id;
    try {
        const response = await updateIncomeAPI(id, data);
        console.log(response);
        return { response };
    } catch (error) {
        console.log('Error al actualizar el ingreso');
    }

    return null;
}

const EditIncome = () => {
    const { incomes, updateIncomes } = useIncomes();
    const { item } = useFindItemById(incomes);
    const errores = useHandleContextAction({ actionContext: updateIncomes, path: '/incomes', state: { actionElementSucess: true, message: 'El ingreso fue editado correctamente' } });

    return (
        <>
            {errores && errores.map((error, index) => <AlertError error={error} index={index} key={index} />)}

            <Form method="post" className="bg-slate-800  py-5 rounded-xl">
                <BotonVolver />

                <FormTransaction entry={item} titulo={'Editar ingreso'} isIncome={true} />
                <div className="w-6/12 mx-auto">
                    <input className="px-4 py-2 bg-slate-900 cursor-pointer" type="submit" value="Editar ingreso" />
                </div>
            </Form>
        </>
    );
};

export default EditIncome;
