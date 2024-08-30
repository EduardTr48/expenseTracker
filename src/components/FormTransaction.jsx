import { useEffect, useState } from 'react';
import { useCategories } from '../context/CategoriesContext';
const FormTransaction = ({ entry: transaction, titulo, isIncome = false }) => {
    const [entry, setEntry] = useState(transaction || { nombre: '', [isIncome ? 'monto' : 'precio']: '', categoria: '' });
    const [categories, setCategories] = useState([]);
    const { categoriesExpense, categoriesIncome } = useCategories();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEntry({ ...entry, [name]: value });
    };

    useEffect(() => {
        setCategories(isIncome ? categoriesIncome : categoriesExpense);
    }, [categoriesExpense, categoriesIncome, isIncome]);

    return (
        <>
            <h2 className="text-center text-4xl">{titulo}</h2>

            <div className="w-6/12 mx-auto ">
                <div className="mb-4">
                    <label>Nombre</label>
                    <input className="w-full text-gray-900 px-1" type="text" name="nombre" value={entry?.nombre} onChange={handleChange} />
                </div>
                <div className="mb-4">
                    <label>{isIncome ? 'Monto' : 'Precio'}</label>
                    <input className="w-full text-gray-900 px-1" type="number" name={isIncome ? 'monto' : 'precio'} value={isIncome ? entry?.monto : entry?.precio} onChange={handleChange} />
                </div>
                <div className="mb-4">
                    <label>Categoria</label>
                    <select className="w-full text-gray-900 px-1" name="categoria" value={entry?.categoria} onChange={handleChange}>
                        <option value="">---Seleccione---</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </>
    );
};

export default FormTransaction;
