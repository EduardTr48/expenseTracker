const autoIncrement = () => {
    let index = 2;

    return () => {
        index++;
        return index;
    };
};

export const nextId = autoIncrement();
