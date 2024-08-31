const FilterSearch = ({ buscarNombre, onBuscarNombreChange }) => {
    return (
        <div className="bg-slate-800 hover:bg-slate-700 cursor-pointer rounded-xl">
            <p className="pt-4 text-center pb-4">Busqueda</p>
            <input className="block w-11/12 mx-auto" type="text" value={buscarNombre} onChange={onBuscarNombreChange} placeholder="Buscar por nombre" />
        </div>
    );
};

export default FilterSearch;
