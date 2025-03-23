import { Form } from "react-router-dom";
import FormTransaction from "./FormTransaction";
import BotonVolver from "../UI/BotonVolver";
import { addExpenseAPI } from "../services/expenseService";
import { validateData } from "../helpers";
import { useHandleContextAction } from "../hooks";
import { useExpenses } from "../context/ExpensesContext";
import AlertError from "./AlertError";
import { Expense } from "../types/expense";
import { mapFormDataToExpense } from "../mappers/expenseMapper";
export async function action({ request }: { request: Request }) {
    const formData = await request.formData();
    const data = mapFormDataToExpense(formData);
    const errores = validateData(data);

    if (errores.length > 0) {
        return { errores };
    }

    try {
        const response = await addExpenseAPI(data);
        return { response };
    } catch (error) {
        console.error("Error al agregar el gasto:", error);
    }
    return null;
}

const AddExpense = () => {
    const { addExpense } = useExpenses();
    const errores = useHandleContextAction<Expense>({
        actionContext: addExpense,
        path: "/expense",
        state: {
            actionElementSucess: true,
            message: "El gasto fue agregado correctamente",
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
                <FormTransaction titulo={"Agregar gasto"} />
                <div className="w-6/12 mx-auto">
                    <input
                        className="px-4 py-2 bg-slate-900 cursor-pointer"
                        type="submit"
                        value="Añadir gasto"
                    />
                </div>
            </Form>
        </>
    );
};

export default AddExpense;
