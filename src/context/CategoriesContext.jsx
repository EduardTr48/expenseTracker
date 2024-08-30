import React, { createContext, useEffect, useState, useMemo } from 'react';
import { getCategoriesAPI } from '../services/categoryService';

const CategoriesContext = createContext();

export const CategoriesProvider = ({ children }) => {
    const [categoriesExpense, setCategoriesExpense] = useState([]);
    const [categoriesIncome, setCategoriesIncome] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const filtrarCategorias = (categories, type) => {
        return categories.filter((category) => category.type == type);
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getCategoriesAPI();
                setCategoriesExpense(filtrarCategorias(data, 'EXPENSE'));
                setCategoriesIncome(filtrarCategorias(data, 'INCOME'));
            } catch (error) {
                setError('No se pudo obtener las categorias');
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    const categoriesMap = useMemo(() => {
        const map = {};
        [...categoriesIncome, ...categoriesExpense].forEach((category) => {
            map[category.id] = category.name;
        });
        return map;
    }, [categoriesExpense, categoriesIncome]);

    return <CategoriesContext.Provider value={{ categoriesMap, categoriesIncome, categoriesExpense, loading, error }}>{children}</CategoriesContext.Provider>;
};

export const useCategories = () => React.useContext(CategoriesContext);
