'use client';
import { useState, useEffect } from 'react';
import Notification from './Notification';



export default function SeatsGrid() {
    const [seats, setSeats] = useState([]);
    const [seatCount, setSeatCount] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        const fetchSeats = async () => {
            const response = await fetch('http://localhost:5000/api/seats');
            const data = await response.json();
            setSeats(data);
        };

        fetchSeats();
    }, []);

    const handleReset = async () => {
        const response = await fetch('http://localhost:5000/api/seats/reset', { method: 'POST' });
        if (response.ok) {
            setSeats(
                seats.map((seat) => ({
                    ...seat,
                    is_reserved: false,
                }))
            );
        } else {
            setError('Failed to reset bookings. Please try again.');
        }
    };

    const handleBooking = async () => {
        if (!seatCount || seatCount < 1 || seatCount > 7) {
            setNotification({
                message: 'Please enter a valid number between 1 and 7.',
                type: 'error',
            });
            return;
        }

        const response = await fetch('http://localhost:5000/api/seats/book', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ seatCount: parseInt(seatCount, 10) }),
        });

        const data = await response.json();
        console.log(data);
        if (response.ok) {
            setSeats((prevSeats) =>
                prevSeats.map((seat) =>
                    data.allocatedSeats.some((allocatedSeat) => allocatedSeat.seat_id === seat.seat_id)
                        ? { ...seat, is_reserved: true }
                        : seat
                )
            );
            setNotification({
                message: `Seats successfully booked: ${data.allocatedSeats
                    .map((seat) => seat.seat_number)
                    .join(', ')}`,
                type: 'success',
            });
        } else {
        setNotification({
            message: `Booking failed Not Enough seats Available`,
            type: 'error',
        });
        }
    };


    const closeNotification = () => {
        setNotification(null);
    };

    const availableSeats = seats.filter((seat) => !seat.is_reserved).length;
    const bookedSeats = seats.filter((seat) => seat.is_reserved).length;

    return (
        <div className="flex flex-col md:flex-row p-4 md:p-8">
            {/* Seats Grid */}
            <div className="flex-1">
                <h1 className="text-xl md:text-2xl font-bold text-black text-center mb-4">
                    Ticket Booking
                </h1>
                <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 gap-1">
                    {seats.map((seat) => (
                        <div
                            key={seat.seat_id}
                            className={`w-10 h-10 md:w-12 md:h-12 border rounded flex items-center justify-center text-sm font-bold ${
                                seat.is_reserved ? 'bg-yellow-500' : 'bg-green-500'
                            }`}
                            title={`Seat ${seat.seat_number}`}
                        >
                            {seat.seat_number}
                        </div>
                    ))}
                </div>
            </div>

            {/* Seat Statistics */}
            <div className="mt-6 md:mt-0 md:ml-8 flex flex-col items-center space-y-4">
                {/* Booked Seats */}
                <div className="flex flex-col items-center">
                    <div className="bg-yellow-500 text-black font-bold w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded shadow-md">
                        {bookedSeats}
                    </div>
                    <p className="text-xs md:text-sm text-gray-700 mt-1">Booked</p>
                </div>

                {/* Available Seats */}
                <div className="flex flex-col items-center">
                    <div className="bg-green-500 text-white font-bold w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded shadow-md">
                        {availableSeats}
                    </div>
                    <p className="text-xs md:text-sm text-gray-700 mt-1">Available</p>
                </div>
            </div>

            {/* Booking Form */}
            <div className="w-full md:w-1/3 mt-6 md:mt-0 md:ml-8 p-4 border rounded bg-white shadow">
                <h2 className="text-lg md:text-xl text-black font-bold mb-4">Book Seats</h2>
                {error && <p className="text-red-500 mb-2">{error}</p>}
                {successMessage && <p className="text-green-500 mb-2">{successMessage}</p>}
                <input
                    type="number"
                    value={seatCount}
                    onChange={(e) => setSeatCount(e.target.value)}
                    placeholder="Enter number of seats"
                    className="border px-2 py-1 w-full mb-4 text-black"
                    min="1"
                    max="7"
                />
                <button
                    onClick={handleBooking}
                    className="bg-blue-500 text-white px-4 py-2 rounded w-full mb-2 hover:bg-blue-600"
                >
                    Book
                </button>
                <button
                    onClick={handleReset}
                    className="bg-red-500 text-white px-4 py-2 rounded w-full hover:bg-red-600"
                >
                    Reset Booking
                </button>
            </div>

            {/* Notification */}
            {notification && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                    onClose={closeNotification}
                />
            )}
        </div>
    );
}
