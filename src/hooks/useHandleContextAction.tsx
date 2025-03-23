import { useActionData, useNavigate } from "react-router-dom";
import { useEffect } from "react";

interface State {
    actionElementSucess: boolean;
    message: string;
}

interface ActionResponse<T> {
    response?: T;
    errores?: string[];
}

const useHandleContextAction = <T extends unknown>({
    actionContext,
    state,
    path,
}: {
    actionContext: (data: T) => void;
    state: State;
    path: string;
}) => {
    const data = useActionData() as ActionResponse<T>;
    const navigate = useNavigate();
    useEffect(() => {
        if (data?.response) {
            console.log("desde action context");
            actionContext(data.response);
            navigate(path, { state: { ...state }, replace: true });
        }
    }, [data, actionContext, navigate, state, path]);

    return data?.errores;
};

export default useHandleContextAction;
