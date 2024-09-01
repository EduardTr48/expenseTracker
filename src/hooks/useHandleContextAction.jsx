import { useActionData, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
const useHandleContextAction = ({ actionContext, state, path }) => {
    const data = useActionData();
    const navigate = useNavigate();
    useEffect(() => {
        if (data?.response) {
            console.log('desde action context');
            actionContext(data.response);
            navigate(path, { state: { ...state }, replace: true });
        }
    }, [data, actionContext, navigate, state, path]);

    return data?.errores;
};

export default useHandleContextAction;
