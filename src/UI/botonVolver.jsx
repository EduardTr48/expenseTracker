import { useNavigate } from 'react-router-dom';

const botonVolver = () => {
    const navigate = useNavigate();

    return (
        <button className="bg-blue-800 text-white px-3 py-1 font-bold uppercase" onClick={() => navigate('/expense')}>
            Volver
        </button>
    );
};

export default botonVolver;
