export const formatDate = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    const fecha = `${year}-${month}-${day}`;

    return fecha;
};

export const formatMMYY = (date: Date): string => {
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    const fecha = `${month}-${year}`;

    return fecha;
};
