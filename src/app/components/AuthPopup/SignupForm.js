'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignupForm({ switchToLogin }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSignup = async (e) => {
        e.preventDefault();
        
        const response = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password }),
        });
        console.log(response);

        const data = await response.json();
        console.log(data);

        if (response.ok) {
            alert('Signup successful! Please sign in.');
            switchToLogin();
        } else {
            setError(data.error);
        }
    };

    return (
        <form onSubmit={handleSignup} className="flex flex-col">
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mb-2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mb-2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mb-4 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
            />
            <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
            >
                Sign Up
            </button>
            <p className="mt-2 text-sm text-gray-700">
                Already have an account?{' '}
                <button
                    type="button"
                    onClick={switchToLogin}
                    className="text-blue-500 underline hover:text-blue-600"
                >
                    Sign In
                </button>
            </p>
        </form>
    );
}
