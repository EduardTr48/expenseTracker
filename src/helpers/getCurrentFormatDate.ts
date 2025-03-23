import { formatDate } from './formatDate';

export const getCurrentFormatDate = (): string => {
    const fechaActual = new Date();
    return formatDate(fechaActual);
};
