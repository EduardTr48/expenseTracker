import { memo } from 'react';

const FilterSearch = ({ filter, onNameChange }) => {
    return (
        <div className="bg-slate-800 hover:bg-slate-700 cursor-pointer rounded-xl">
            <p className="pt-4 text-center pb-4">Busqueda</p>
            <input className="block w-11/12 mx-auto" type="text" value={filter} onChange={onNameChange} placeholder="Buscar por nombre" />
        </div>
    );
};

export default memo(FilterSearch);
