import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
const useCleanNotification = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const actionElementSucess = location.state?.actionElementSucess;
    useEffect(() => {
        if (actionElementSucess) {
            const stateCopy = { ...location.state };
            delete stateCopy.actionElementSucess;
            navigate(location.pathname, { replace: true, state: stateCopy });
        }
    }, [location, navigate, actionElementSucess]);
};

export default useCleanNotification;
