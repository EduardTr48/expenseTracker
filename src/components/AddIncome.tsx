import { Form } from "react-router-dom";
import { useHandleContextAction } from "../hooks";
import { useIncomes } from "../context/IncomesContext";
import FormTransaction from "./FormTransaction";
import { addIncomeAPI } from "../services/incomeService";
import { validateData } from "../helpers";
import AlertError from "./AlertError";
import BotonVolver from "../UI/BotonVolver";
import { mapFormDataToIncome } from "../mappers/incomeMapper";
import { Income } from "../types/income";
export async function action({ request }: { request: Request }) {
    const formData = await request.formData();
    const data = mapFormDataToIncome(formData);
    const errores = validateData(data);

    if (errores.length > 0) {
        return { errores };
    }

    try {
        const response = await addIncomeAPI(data);
        return { response };
    } catch (error) {
        console.error("Error al agregar el gasto:", error);
    }
    return null;
}

const AddIncome = () => {
    const { addIncomes } = useIncomes();
    const errores = useHandleContextAction<Income>({
        actionContext: addIncomes,
        path: "/incomes",
        state: {
            actionElementSucess: true,
            message: "El ingreso fue agregado correctamente",
        },
    });

    return (
        <>
            {errores &&
                errores.map((error: string, index: number) => (
                    <AlertError error={error} index={index} key={index} />
                ))}
            <Form method="post" className="bg-slate-800  py-5 rounded-xl">
                <BotonVolver />

                <FormTransaction titulo={"Agregar ingreso"} isIncome={true} />
                <div className="w-6/12 mx-auto">
                    <input
                        className="px-4 py-2 bg-slate-900 cursor-pointer"
                        type="submit"
                        value="Agregar ingreso"
                    />
                </div>
            </Form>
        </>
    );
};

export default AddIncome;
