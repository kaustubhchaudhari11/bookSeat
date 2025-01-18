'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SeatsGrid from '../components/SeatsGrid';


export default function Dashboard() {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Please log in first!');
            router.push('/'); 
        }
    }, [router]);

    return (
        <div className="h-screen bg-gray-100">
            {/* Header Section */}
            <header className="w-full bg-white shadow-md py-4 px-8 flex items-center justify-between">
            <div className="flex-grow flex justify-center items-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-black">Welcome to the Dashboard</h1>
                    <p className="text-sm text-gray-700">Here you can start booking tickets for your journey.</p>
                </div>
            </div>
                <button
                    onClick={() => {
                        localStorage.removeItem('token');
                        alert('Logged out successfully.');
                        router.push('/'); // Redirect to homepage
                    }}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                    Logout
                </button>
            </header>

            {/* Main Content (optional, if needed for further UI below header) */}
            <main className="p-8">
                    <SeatsGrid/>
            </main>
        </div>
    );
}
