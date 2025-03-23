import { Expense } from "../types/expense";
import { Income } from "../types/income";

const useFindItemById = (data: (Expense | Income)[], id: number) => {
    const item = data.find((expense) => expense.id === id);
    return { item, id };
};

export default useFindItemById;
