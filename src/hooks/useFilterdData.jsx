import { useMemo, useState } from 'react';

const useFilterdData = (data) => {
    const [categoria, setCategoria] = useState('');
    const [buscarNombre, setBuscarNombre] = useState('');

    const filterdData = useMemo(() => {
        return data.filter((expense) => {
            const matchesCategoria = categoria ? expense.categoria === categoria : true;
            const matchesNombre = buscarNombre ? expense.nombre.toLowerCase().includes(buscarNombre.toLowerCase()) : true;
            return matchesCategoria && matchesNombre;
        });
    }, [data, buscarNombre, categoria]);

    return {
        categoria,
        buscarNombre,
        filterdData,
        setBuscarNombre,
        setCategoria,
    };
};

export default useFilterdData;
