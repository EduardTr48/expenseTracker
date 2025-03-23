export const convertStringToDate = (mmYYYY: string) : Date => {
    const [month, year] = mmYYYY.split('-').map(Number);
    return new Date(year, month - 1);
};
