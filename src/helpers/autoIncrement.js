export const autoIncrement = () => {
    let index = 2;

    return () => {
        index++;
        return index;
    };
};
