import { useNavigate } from 'react-router-dom';
import { memo } from 'react';
const BotonVolver = () => {
    const navigate = useNavigate();

    return (
        <div className="w-11/12 mx-auto">
            <button className="px-4 py-2 bg-slate-900" onClick={() => navigate(-1)}>
                Volver
            </button>
        </div>
    );
};

export default memo(BotonVolver);
