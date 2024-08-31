const Modal = ({ isOpen, onClose, onConfirm, title, message }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-slate-800 text-gray-300 p-6 rounded-lg shadow-lg max-w-lg w-full">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">{title}</h2>
                    <button onClick={onClose} className="text-xl">
                        &times;
                    </button>
                </div>
                <div className="mt-4">
                    <p>{message}</p>
                </div>
                <div className="mt-6 flex justify-end space-x-2">
                    <button onClick={onConfirm} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                        Eliminar
                    </button>
                    <button onClick={onClose} className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400">
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
