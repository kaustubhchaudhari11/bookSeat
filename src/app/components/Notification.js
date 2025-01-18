'use client';

export default function Notification({ message, type, onClose }) {
    return (
        <div
            className={`fixed top-4 right-4 p-4 rounded shadow-md transition-opacity duration-300 ${
                type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
            }`}
        >
            <p>{message}</p>
            <button
                onClick={onClose}
                className="mt-2 bg-white text-black py-1 px-3 rounded hover:bg-gray-200"
            >
                Close
            </button>
        </div>
    );
}