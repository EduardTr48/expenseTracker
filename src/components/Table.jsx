import { useCategories } from '../context/CategoriesContext';

const Table = ({ data, handleEditar, handleEliminar, isIncome }) => {
    const { categoriesMap } = useCategories();

    return (
        <>
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
        </>
    );
};

export default Table;
