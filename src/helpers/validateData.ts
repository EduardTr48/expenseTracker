import { Expense } from "../types/expense";
import { Income } from "../types/income";

export const validateData = (data: Expense | Income) => {
    return Object.entries(data)
        .filter(([, value]) => value === '')
        .map(([key]) => `El campo ${key} es obligatorio`);
};
