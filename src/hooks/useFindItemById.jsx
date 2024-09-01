import { useParams } from 'react-router-dom';
const useFindItemById = (data) => {
    const params = useParams();
    const id = +params.id;

    const item = data.find((expense) => expense.id === id);
    return { item, id };
};

export default useFindItemById;
