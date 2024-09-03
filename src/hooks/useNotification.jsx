import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
const useNotification = () => {
    const location = useLocation();
    const [notification, setNotification] = useState({
        isOpen: false,
        message: '',
    });

    useEffect(() => {
        const { actionElementSucess, message } = location.state || {};
        if (actionElementSucess) {
            setNotification({
                isOpen: actionElementSucess || false,
                message: message || '',
            });
        }
    }, [location.state]);

    return {
        notification,
        setNotification,
    };
};

export default useNotification;
