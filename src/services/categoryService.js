export const getCategoriesByTypeAPI = async (type) => {
    const response = await fetch(`http://localhost:8080/api/categories/${type}`);
    const data = await response.json();
    return data;
};

export const getCategoriesAPI = async () => {
    const response = await fetch(`http://localhost:8080/api/categories`);
    const data = await response.json();
    return data;
};
