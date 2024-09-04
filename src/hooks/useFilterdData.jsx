import { useMemo, useState } from 'react';

const useFilterdData = (data, filters) => {
    const [stateFilters, setStateFilters] = useState(filters);

    const filterdData = useMemo(() => {
        return data.filter((item) => {
            return Object.keys(stateFilters).every((key) => {
                if (!stateFilters[key]) return true;
                if (Number(item[key])) {
                    return item[key] === stateFilters[key];
                }
                return item[key].toString().toLowerCase().includes(stateFilters[key].toLowerCase());
            });
        });
    }, [data, stateFilters]);

    const setFilter = (key, value) => {
        setStateFilters((prevFilters) => ({
            ...prevFilters,
            [key]: value,
        }));
    };
    console.log(filterdData);

    return {
        filterdData,
        setFilter,
        filters: stateFilters,
    };
};

export default useFilterdData;
