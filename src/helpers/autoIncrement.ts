const autoIncrement = () => {
    let index = 20;

    return () => {
        index++;
        return index;
    };
};

export const nextId = autoIncrement();
