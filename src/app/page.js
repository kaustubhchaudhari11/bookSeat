'use client';
import { useState } from 'react';
import AuthPopup from './components/AuthPopup/AuthPopup';


export default function Home() {
    const [showPopup, setShowPopup] = useState(false);
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
            <h1 className="text-3xl font-bold text-black mb-4">Welcome to Seat Reservation App</h1>
            <button
                onClick={() => setShowPopup(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Get Started
            </button>
        </div>
        {showPopup && <AuthPopup onClose={() => setShowPopup(false)} />}
    </div>
    )
}
