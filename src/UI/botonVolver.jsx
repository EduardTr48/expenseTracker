import { useNavigate } from 'react-router-dom';

const BotonVolver = () => {
    const navigate = useNavigate();

    return (
        <button className="px-4 py-2 bg-slate-900" onClick={() => navigate('/expense')}>
            Volver
        </button>
    );
};

export default BotonVolver;
