export const validateData = (data) => {
    const errores = [];
    if (Object.values(data).includes('')) {
        errores.push('Todos los campos son obligatorios');
    }
    return errores;
};
