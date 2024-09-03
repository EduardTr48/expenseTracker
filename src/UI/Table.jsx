import { useCategories } from '../context/CategoriesContext';
import { memo } from 'react';

const Table = ({ data, handleEditar, handleEliminar, isIncome }) => {
    const { categoriesMap } = useCategories();

    if (data.length === 0) {
        return (
            <div className="bg-slate-800 rounded-xl col-span-3 row-span-6 max-h-112 overflow-y-auto">
                <p className="text-center text-2xl mt-7">No hay gastos encontrados</p>
            </div>
        );
    }

    return (
        <div className="bg-slate-800 rounded-xl col-span-3 row-span-6 max-h-112 overflow-y-auto">
            <table className="table-auto w-11/12 mx-auto mt-2">
                <thead className="text-left">
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>{isIncome ? 'Monto' : 'Precio'}</th>
                        <th>Categoria</th>
                        <th>Fecha</th>
                    </tr>
                </thead>

                <tbody>
                    {data.map((element) => (
                        <tr className="border-y-2 last:border-t-2 last:border-b-0" key={element.id}>
                            <td>{element.id}</td>
                            <td>{element.nombre}</td>
                            <td>$ {isIncome ? element.monto : element.precio}</td>
                            <td>{categoriesMap[element.categoria]}</td>
                            <td>{element.fecha}</td>
                            <td className="flex justify-end flex-wrap">
                                <button className="px-4 py-2 bg-slate-900 hover:bg-slate-950" onClick={() => handleEditar(element.id)}>
                                    Editar
                                </button>
                                <button className="px-4 py-2 bg-slate-900 hover:bg-slate-950" onClick={() => handleEliminar(element.id)}>
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default memo(Table);
