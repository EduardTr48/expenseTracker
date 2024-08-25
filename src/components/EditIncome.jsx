import FormTransaction from './FormTransaction';
import { Form, useActionData, useParams, useNavigate } from 'react-router-dom';
import { useIncomes } from '../context/IncomesContext';
import { formatDate } from '../helpers/formatDate';
import { useEffect } from 'react';

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

const EditIncome = () => {
    const { incomes, updateIncomes } = useIncomes();
    const data = useActionData();
    console.log(data?.data);
    const errores = data?.errores;
    const params = useParams();
    const navigate = useNavigate();

    const id = params.id;
    const income = incomes.find((income) => income.id == id);

    useEffect(() => {
        if (data?.data) {
            data.data.id = id;
            updateIncomes(data.data);
            navigate('/incomes', { state: { editElementSuccess: true } });
        }
    }, [data, updateIncomes, navigate, id]);
    return (
        <>
            {errores &&
                errores.map((error, index) => (
                    <h3 className="text-red-500 my-5" key={index}>
                        {error}
                    </h3>
                ))}
            <Form method="post" className="bg-slate-800  py-5 rounded-xl">
                <FormTransaction entry={income} titulo={'Editar ingreso'} isIncome={true} />
                <div className="w-6/12 mx-auto">
                    <input className="px-4 py-2 bg-slate-900 cursor-pointer" type="submit" value="Editar ingreso" />
                </div>
            </Form>
        </>
    );
};

export default EditIncome;