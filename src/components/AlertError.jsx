const AlertError = ({ error, index }) => {
    return (
        <h3 className="text-white mb-1 w-full bg-red-500 px-5 py-2 text-center" key={index}>
            {error}
        </h3>
    );
};

export default AlertError;
