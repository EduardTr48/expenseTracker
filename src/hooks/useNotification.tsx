import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface Notification{
    isOpen: boolean,
    message: string
}

interface NotificationState{
    actionElementSucess?: boolean,
    message?: string
}

const useNotification = () => {
    const location = useLocation();
    const [notification, setNotification] = useState<Notification>({
        isOpen: false,
        message: '',
    });

    useEffect(() => {
        const state = location.state as NotificationState | null;
        if (state?.actionElementSucess) {
            setNotification({
                isOpen: true,
                message: state?.message || '',
            });
        }
    }, [location.state]);

    return {
        notification,
        setNotification,
    };
};

export default useNotification;
