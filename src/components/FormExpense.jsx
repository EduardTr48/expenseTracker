import { useState } from "react";

const FormExpense = ({ expense: gasto, titulo }) => {
    const [expense, setExpense] = useState(gasto || { nombre: "", precio: "", categoria: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setExpense({ ...expense, [name]: value });
    };
    return (
        <>
            <h2 className="text-center text-4xl">{titulo}</h2>

            <div className="w-6/12 mx-auto ">
                <div className="mb-4">
                    <label>Nombre</label>
                    <input className="w-full text-gray-900 px-1" type="text" name="nombre" value={expense?.nombre} onChange={handleChange} />
                </div>
                <div className="mb-4">
                    <label>Precio</label>
                    <input className="w-full text-gray-900 px-1" type="number" name="precio" value={expense?.precio} onChange={handleChange} />
                </div>
                <div className="mb-4">
                    <label>Categoria</label>
                    <select className="w-full  text-gray-900 px-1" name="categoria" value={expense?.categoria} onChange={handleChange}>
                        <option value="">---Seleccione---</option>
                        <option value="comida">Comida</option>
                        <option value="ropa">Ropa</option>
                        <option value="dolarBlue">Dolar Blue</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="transferencia">Transferencia</option>
                        <option value="medicamentos">Medicamento</option>
                        <option value="ocio">Ocio</option>
                    </select>
                </div>
            </div>
        </>
    );
};

export default FormExpense;
