import {
    createContext,
    useEffect,
    useState,
    useMemo,
    ReactNode,
    useContext,
} from "react";
import { getCategoriesAPI } from "../services/categoryService";
import { Category } from "../types/category";

interface CategoriesProviderProps {
    children: ReactNode;
}

export type CategoryMap = Record<number, string>;

interface CategoriesContextType {
    categoriesExpense: Category[];
    categoriesIncome: Category[];
    loading: boolean;
    error: string | null;

    categoriesMap: CategoryMap;
}

const CategoriesContext = createContext<CategoriesContextType | undefined>(
    undefined
);

export const CategoriesProvider = ({ children }: CategoriesProviderProps) => {
    const [categoriesExpense, setCategoriesExpense] = useState<Category[]>([]);
    const [categoriesIncome, setCategoriesIncome] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const filtrarCategorias = (categories: Category[], type: string) => {
        return categories.filter((category) => category.type == type);
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getCategoriesAPI();
                setCategoriesExpense(filtrarCategorias(data, "EXPENSE"));
                setCategoriesIncome(filtrarCategorias(data, "INCOME"));
            } catch (error) {
                setError("No se pudo obtener las categorias");
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    const categoriesMap = useMemo(() => {
        const map: CategoryMap = {};
        [...categoriesIncome, ...categoriesExpense].forEach((category) => {
            map[category.id] = category.name;
        });
        return map;
    }, [categoriesExpense, categoriesIncome]);

    return (
        <CategoriesContext.Provider
            value={{
                categoriesMap,
                categoriesIncome,
                categoriesExpense,
                loading,
                error,
            }}
        >
            {children}
        </CategoriesContext.Provider>
    );
};

export const useCategories = () => {
    const context = useContext(CategoriesContext);
    if (!context) {
        throw new Error("useExpenses must be used within an ExpensesProvider");
    }
    return context;
};
