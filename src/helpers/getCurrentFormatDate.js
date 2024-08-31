import { formatDate } from './formatDate';

export const getCurrentFormatDate = () => {
    const fechaActual = new Date();
    return formatDate(fechaActual);
};
