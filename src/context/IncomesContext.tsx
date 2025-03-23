import {
    createContext,
    ReactNode,
    useEffect,
    useState,
    useContext,
} from "react";
import { getIncomesAPI } from "../services/incomeService";
import { Income } from "../types/income";

interface IncomesProviderProps {
    children: ReactNode;
}

interface IncomesContextType {
    incomes: Income[];
    loading: boolean;
    error: string | null;
    addIncomes: (income: Income) => void;
    updateIncomes: (income: Income) => void;
    deleteIncomes: (id: number) => void;
}

const IncomesContext = createContext<IncomesContextType | undefined>(undefined);

export const IncomesProvider = ({ children }: IncomesProviderProps) => {
    const [incomes, setIncomes] = useState<Income[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchIncomes = async () => {
            try {
                const data = await getIncomesAPI();
                setIncomes(data);
            } catch (error) {
                setError("No se pudo obtener los ingresos");
            } finally {
                setLoading(false);
            }
        };

        fetchIncomes();
    }, []);

    const addIncomes = (newIncome: Income) => {
        setIncomes((prevIncomes) => [...prevIncomes, newIncome]);
    };

    const updateIncomes = (newIncome: Income) => {
        setIncomes((prevIncomes) =>
            prevIncomes.map((income) =>
                income.id == newIncome.id ? newIncome : income
            )
        );
    };

    const deleteIncomes = (id: number) => {
        setIncomes((prevIncomes) =>
            prevIncomes.filter((income) => income.id !== id)
        );
    };

    return (
        <IncomesContext.Provider
            value={{
                incomes,
                addIncomes,
                updateIncomes,
                deleteIncomes,
                loading,
                error,
            }}
        >
            {children}
        </IncomesContext.Provider>
    );
};

export const useIncomes = () => {
    const context = useContext(IncomesContext);
    if (!context) {
        throw new Error("useIncomes must be used within an IncomesProvide");
    }
    return context;
};
