import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
const useCleanNotification = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const editElementSuccess = location.state?.editElementSuccess;
    const addElementSuccess = location.state?.addElementSuccess;
    useEffect(() => {
        if (editElementSuccess || addElementSuccess) {
            const stateCopy = { ...location.state };
            editElementSuccess ? delete stateCopy.editElementSuccess : delete stateCopy.addElementSuccess;
            navigate(location.pathname, { replace: true, state: stateCopy });
        }
    }, [editElementSuccess, location, navigate, addElementSuccess]);
};

export default useCleanNotification;
