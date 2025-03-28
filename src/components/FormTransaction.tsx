import { useEffect, useState } from "react";
import { useCategories } from "../context/CategoriesContext";
import { ChangeEvent } from "react";
import { Category } from "../types/category";
interface FormTransactionProps {
    entry?: EntryState;
    titulo: string;
    isIncome?: boolean;
}

type EntryState = {
    nombre: string;
    categoria: number | string;
    fecha: string;
    monto?: number | undefined;
    precio?: number | undefined;
};

const FormTransaction = ({
    entry: data,
    titulo,
    isIncome = false,
}: FormTransactionProps) => {
    const [entry, setEntry] = useState<EntryState>({
        nombre: data?.nombre || "",
        categoria: data?.categoria || "",
        fecha: data?.fecha || "",
        ...(isIncome
            ? { monto: data?.monto || undefined }
            : { precio: data?.precio || undefined }),
    });
    const [categories, setCategories] = useState<Category[]>([]);
    const { categoriesExpense, categoriesIncome } = useCategories();

    const handleChange = (
        e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>
    ) => {
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
                    <input
                        className="w-full text-gray-900 px-1"
                        type="text"
                        name="nombre"
                        value={entry?.nombre}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <label>{isIncome ? "Monto" : "Precio"}</label>
                    <input
                        className="w-full text-gray-900 px-1"
                        type="number"
                        name={isIncome ? "monto" : "precio"}
                        value={isIncome ? entry?.monto : entry?.precio}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <label>Categoria</label>
                    <select
                        className="w-full text-gray-900 px-1"
                        name="categoria"
                        value={entry?.categoria}
                        onChange={handleChange}
                    >
                        <option value="">---Seleccione---</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <label>Fecha</label>
                    <input
                        className="w-full text-gray-900 px-1"
                        type="date"
                        name="fecha"
                        value={entry?.fecha}
                        onChange={handleChange}
                    />
                </div>
            </div>
        </>
    );
};

export default FormTransaction;
