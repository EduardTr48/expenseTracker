import { memo } from 'react';

const FilterCategory = ({ filter, onCategoryChange, categories }) => {
    return (
        <div className="bg-slate-800 hover:bg-slate-700 w-full rounded-xl">
            <p className="pt-4 text-center pb-4">Filtrar</p>
            <select value={filter} onChange={onCategoryChange} className="block w-11/12 mx-auto">
                <option value="">Ninguna</option>
                {categories.map((categoria) => (
                    <option key={categoria.id} value={categoria.id}>
                        {categoria.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default memo(FilterCategory);
