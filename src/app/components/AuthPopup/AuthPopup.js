'use client';

import { useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

export default function AuthPopup({ onClose }) {
    const [isSignup, setIsSignup] = useState(false);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="relative bg-white text-gray-900 p-6 rounded-lg shadow-lg max-w-sm w-full">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-900 text-xl"
                >
                    &times;
                </button>
                <h2 className="text-lg font-bold mb-4">
                    {isSignup ? 'Sign Up' : 'Sign In'}
                </h2>
                {isSignup ? (
                    <SignupForm switchToLogin={() => setIsSignup(false)} />
                ) : (
                    <LoginForm switchToSignup={() => setIsSignup(true)} />
                )}
            </div>
        </div>
    );
}
