import { useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const useCleanNotification = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const actionElementSucess = useMemo(() => location.state?.actionElementSucess, [location.state]);
    const currentPath = useMemo(() => location.pathname, [location.pathname]);

    useEffect(() => {
        if (actionElementSucess) {
            const stateCopy = { ...location.state };
            delete stateCopy.actionElementSucess;
            navigate(currentPath, { replace: true, state: stateCopy });
        }
    }, [navigate, currentPath, actionElementSucess, location.state]);
};

export default useCleanNotification;
