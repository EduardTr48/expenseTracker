import { memo } from 'react';
import { Link } from 'react-router-dom';
const AddLink = ({ link, title }) => {
    return (
        <div className="bg-slate-800 hover:bg-slate-700 cursor-pointer rounded-xl">
            <Link className="w-full my-auto flex justify-center items-center h-32" to={link}>
                <p className="text-center m-auto">{title}</p>
            </Link>
        </div>
    );
};

export default memo(AddLink);
