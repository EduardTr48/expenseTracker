import FormTransaction from "./FormTransaction";
import { Form, Params } from "react-router-dom";
import { useIncomes } from "../context/IncomesContext";
import BotonVolver from "../UI/BotonVolver";
import { updateIncomeAPI } from "../services/incomeService";
import { useFindItemById, useHandleContextAction } from "../hooks";
import { validateData } from "../helpers";
import AlertError from "./AlertError";
import { useParams } from "react-router-dom";
import { mapFormDataToIncome } from "../mappers/incomeMapper";
import { Income } from "../types/income";
export async function action({
    request,
    params,
}: {
    request: Request;
    params: Params;
}) {
    const id = Number(params.id);
    const formData = await request.formData();
    const data = mapFormDataToIncome(formData);
    const errores = validateData(data);

    if (errores.length > 0) {
        return { errores };
    }

    if (!id) {
        return null;
    }

    try {
        const response = await updateIncomeAPI(id, data);
        console.log(response);
        return { response };
    } catch (error) {
        console.log("Error al actualizar el ingreso");
    }

    return null;
}

const EditIncome = () => {
    const params = useParams();
    const { incomes, updateIncomes } = useIncomes();
    const { item } = useFindItemById(incomes, Number(params.id));
    const errores = useHandleContextAction<Income>({
        actionContext: updateIncomes,
        path: "/incomes",
        state: {
            actionElementSucess: true,
            message: "El ingreso fue editado correctamente",
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

                <FormTransaction
                    entry={item}
                    titulo={"Editar ingreso"}
                    isIncome={true}
                />
                <div className="w-6/12 mx-auto">
                    <input
                        className="px-4 py-2 bg-slate-900 cursor-pointer"
                        type="submit"
                        value="Editar ingreso"
                    />
                </div>
            </Form>
        </>
    );
};

export default EditIncome;
