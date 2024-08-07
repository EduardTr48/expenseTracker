import { useState } from 'react';

const FormExpense = ({ expense: gasto }) => {
    const [expense, setExpense] = useState(gasto || { nombre: '', precio: '', categoria: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setExpense({ ...expense, [name]: value });
    };

    return (
        <div className="bg-slate-800 w-full h-full pt-10 rounded-xl">
            <h2 className="text-center text-4xl">Add Expense</h2>

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
                    </select>
                </div>
            </div>
        </div>
    );
};

export default FormExpense;
