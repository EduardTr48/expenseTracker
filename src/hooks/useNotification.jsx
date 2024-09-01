import { useState } from 'react';
import { useLocation } from 'react-router-dom';
const useNotification = () => {
    const location = useLocation();
    const { addElementSuccess, editElementSuccess } = location.state || {};
    const [notification, setNotification] = useState({
        isOpen: !!addElementSuccess || !!editElementSuccess,
        message: addElementSuccess ? 'El gasto fue agregado correctamente' : editElementSuccess ? 'El gasto fue editado correctamente' : '',
    });

    return {
        notification,
        setNotification,
    };
};

export default useNotification;
