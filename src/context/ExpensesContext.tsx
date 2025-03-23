import {
    createContext,
    useState,
    useEffect,
    ReactNode,
    useContext,
} from "react";
import { getExpensesAPI } from "../services/expenseService";
import { Expense } from "../types/expense";

interface ExpensesProviderProps {
    children: ReactNode;
}

interface ExpensesContextType {
    expenses: Expense[];
    loading: boolean;
    error: string | null;
    addExpense: (expense: Expense) => void;
    updateExpense: (expense: Expense) => void;
    deleteExpense: (id: number) => void;
}

const ExpensesContext = createContext<ExpensesContextType | undefined>(
    undefined
);

export const ExpensesProvider = ({ children }: ExpensesProviderProps) => {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const data = await getExpensesAPI();
                setExpenses(data);
            } catch (error) {
                setError("Error al obtener los gastos");
            } finally {
                setLoading(false);
            }
        };

        fetchExpenses();
    }, []);

    const addExpense = (newExpense: Expense) => {
        setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
    };

    const updateExpense = (newExpense: Expense) => {
        setExpenses((prevExpenses) =>
            prevExpenses.map((expense) =>
                expense.id === newExpense.id ? newExpense : expense
            )
        );
    };

    const deleteExpense = (id: number) => {
        setExpenses((prevExpenses) =>
            prevExpenses.filter((expense) => expense.id !== id)
        );
    };

    return (
        <ExpensesContext.Provider
            value={{
                expenses,
                loading,
                error,
                addExpense,
                updateExpense,
                deleteExpense,
            }}
        >
            {children}
        </ExpensesContext.Provider>
    );
};

export const useExpenses = () => {
    const context = useContext(ExpensesContext);
    if (!context) {
        throw new Error("useExpenses must be used within an ExpensesProvider");
    }
    return context;
};
