import { useState, useCallback } from 'react';

const useModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [elementDelete, setElementDelete] = useState(null);

    const openModal = useCallback(() => {
        setIsModalOpen(true);
    }, []);

    const closeModal = useCallback(() => {
        setIsModalOpen(false);
        setElementDelete(null);
    }, []);

    return {
        isModalOpen,
        elementDelete,
        openModal,
        closeModal,
        setElementDelete,
    };
};

export default useModal;
