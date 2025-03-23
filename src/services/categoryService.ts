import { Category } from "../types/category";

export const getCategoriesByTypeAPI = async (type: string): Promise<Category[]> => {
    const response = await fetch(`${import.meta.env.VITE_API_CATEGORY_URL}/${type}`);
    const data = await response.json();
    return data;
};

export const getCategoriesAPI = async (): Promise<Category[]> => {
    const response = await fetch(`${import.meta.env.VITE_API_CATEGORY_URL}`);
    const data = await response.json();
    return data;
};
