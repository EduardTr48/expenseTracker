import { useMemo, useState } from 'react';
import { Expense } from '../types/expense';
import { Income } from '../types/income';

interface Filters {
    nombre: string;
    categoria: number | undefined;
}

interface userFilterDataProps{
    data: (Expense | Income)[],
    filters: Filters
}

const useFilterdData = ({data, filters} : userFilterDataProps) => {
    const [stateFilters, setStateFilters] = useState<Filters>(filters);

    const filterdData = useMemo(() => {
        return data.filter((item) => {
            return (Object.keys(stateFilters) as Array<keyof Filters>).every((key) => {
                const filterValue = stateFilters[key];
                const itemValue = item[key];
                if (!filterValue) return true;
                if (typeof itemValue === 'number') {
                    return itemValue === Number(filterValue);
                }
                return itemValue.toString().toLowerCase().includes(filterValue.toString().toLowerCase());
            });
        });
    }, [data, stateFilters]);

    const setFilter = <K extends keyof Filters>(key: K, value: Filters[K]) => {
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
