export const validateData = (data) => {
    return Object.entries(data)
        .filter(([, value]) => value === '')
        .map(([key]) => `El campo ${key} es obligatorio`);
};
