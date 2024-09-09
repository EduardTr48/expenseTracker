export const convertStringToDate = (mmYYYY) => {
    const [month, year] = mmYYYY.split('-').map(Number);
    return new Date(year, month - 1);
};
