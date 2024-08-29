import React from "react";
import { categorias } from "../helpers/categorias";

const Table = ({ expenses, handleEditar, handleEliminar }) => {
    return (
        <>
            <table className="table-auto w-11/12 mx-auto mt-2">
                <thead className="text-left">
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Categoria</th>
                        <th>Fecha</th>
                    </tr>
                </thead>

                <tbody>
                    {expenses.map((expense) => (
                        <tr className="border-y-2 last:border-t-2 last:border-b-0" key={expense.id}>
                            <td>{expense.id}</td>
                            <td>{expense.nombre}</td>
                            <td>$ {expense.precio}</td>
                            <td>{categorias[expense.categoria]}</td>
                            <td>{expense.fecha}</td>
                            <td className="flex justify-end flex-wrap">
                                <button className="px-4 py-2 bg-slate-900 hover:bg-slate-950" onClick={() => handleEditar(expense.id)}>
                                    Editar
                                </button>
                                <button className="px-4 py-2 bg-slate-900 hover:bg-slate-950" onClick={() => handleEliminar(expense.id)}>
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
