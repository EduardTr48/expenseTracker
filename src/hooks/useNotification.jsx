import { useState } from 'react';
import { useLocation } from 'react-router-dom';
const useNotification = () => {
    const location = useLocation();
    const { actionElementSucess } = location.state || {};
    const { message } = location.state || '';
    const [notification, setNotification] = useState({
        isOpen: actionElementSucess,
        message: message,
    });

    return {
        notification,
        setNotification,
    };
};

export default useNotification;
