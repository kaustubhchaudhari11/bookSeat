'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginForm({ switchToSignup }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    //Login function
    const handleLogin = async (e) => {
        e.preventDefault();
    
        console.log('Email:', email);
        console.log('Password:', password);
        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            console.log(response);
            const data = await response.json();
            console.log('Response:', data.email);
            console.log(response);
            if (response.ok) {
                console.log('Login successful. Redirecting to dashboard...');
                localStorage.setItem('token', data.token);
                router.push('/dashboard');
            } else {
                console.error('Error from server:', data.error);
                setError(data.error);
            }
        } catch (err) {
            console.error('Error connecting to server:', err);
            setError('Failed to connect to server.',err);
        }
    };

    return (
        <form onSubmit={handleLogin} className="flex flex-col">
            {error && <p className="text-red-500 mb-2">{error}</p>}
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
                Sign In
            </button>
            <p className="mt-2 text-sm text-gray-700">
                Don&apos;t have an account?{' '}
            <button
                    type="button"
                    onClick={switchToSignup}
                    className="text-blue-500 underline hover:text-blue-600"
                >
                    Sign Up
                </button>
            </p>
        </form>
    );
}
