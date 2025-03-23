import { useEffect } from 'react';
import { memo } from 'react';

interface NotificationProps{
    message: string,
    isOpen: boolean,
    duration: number,
    onClose: ()=>void
}

const Notification = ({ message, isOpen, duration, onClose } : NotificationProps) => {
    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [isOpen, duration, onClose]);

    if (!isOpen) return null;

    return <div className="fixed top-5 right-5 bg-green-500 text-white p-4 rounded shadow-lg">{message}</div>;
};

export default memo(Notification);
