import { useExpenses } from "../context/ExpensesContext";
import BotonVolver from "../UI/BotonVolver";
import { validateData } from "../helpers";
import FormTransaction from "./FormTransaction";
import { updateExpenseAPI } from "../services/expenseService";
import { useHandleContextAction, useFindItemById } from "../hooks";
import { Form, Params, useParams } from "react-router-dom";
import AlertError from "./AlertError";
import { mapFormDataToExpense } from "../mappers/expenseMapper";
import { Expense } from "../types/expense";
export async function action({
    request,
    params,
}: {
    request: Request;
    params: Params;
}) {
    const id = Number(params.id);
    const formData = await request.formData();
    const data = mapFormDataToExpense(formData);
    const errores = validateData(data);
    if (errores.length > 0) {
        return { errores };
    }

    if (!id) {
        return null;
    }

    try {
        const response = await updateExpenseAPI(id, data);
        console.log(response);
        return { response };
    } catch (error) {
        console.error("Error al editar el gasto:", error);
        // Podrías mostrar un mensaje de error al usuario aquí
    }
    return null;
}

const EditExpense = () => {
    const params = useParams();
    const { expenses, updateExpense } = useExpenses();
    const { item } = useFindItemById(expenses, Number(params.id));
    const errores = useHandleContextAction<Expense>({
        actionContext: updateExpense,
        path: "/expense",
        state: {
            actionElementSucess: true,
            message: "El gasto fue editado correctamente",
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
                <FormTransaction entry={item} titulo={"Editar gasto"} />
                <div className="w-6/12 mx-auto">
                    <input
                        className="px-4 py-2 bg-slate-900 cursor-pointer"
                        type="submit"
                        value="Editar gasto"
                    />
                </div>
            </Form>
        </>
    );
};

export default EditExpense;
