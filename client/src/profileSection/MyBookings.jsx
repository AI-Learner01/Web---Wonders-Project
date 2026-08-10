import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaUsers, FaBed, FaSuitcase } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const MyBookings = ({ userData }) => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/bookings`,{
                    headers: { "ngrok-skip-browser-warning": "true" }
                });
                const data = await res.json();
                if (data.success) {
                    // Filter bookings for the currently logged-in user
                    const userBookings = data.data.filter(b => b.email === userData.email);
                    setBookings(userBookings);
                }
            } catch (err) {
                console.error("Failed to fetch bookings", err);
            } finally {
                setLoading(false);
            }
        };

        if (userData?.email) {
            fetchBookings();
        } else {
            setLoading(false);
        }
    }, [userData]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64 text-gray-500 font-medium">
                Loading your bookings...
            </div>
        );
    }

    return (
        <div className="w-full space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="text-lg font-bold text-gray-800 mb-6 border-b pb-3 border-gray-100">
                    My Bookings
                </h3>

                {bookings.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                        <FaSuitcase className="mx-auto text-4xl text-gray-300 mb-3" />
                        <p className="text-gray-500 font-medium">You haven't booked any packages yet.</p>
                        <Link to="/packages" className="inline-block mt-4 bg-emerald-50 text-[#167A44] px-6 py-2.5 rounded-lg font-bold hover:bg-emerald-100 transition">
                            Explore Packages
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-5">
                        {bookings.map((b) => (
                            <div key={b._id} className="p-5 border border-gray-100 bg-gray-50 rounded-xl flex flex-col md:flex-row justify-between gap-4 transition hover:shadow-md hover:bg-white">
                                <div>
                                    <h4 className="font-bold text-lg text-gray-900">{b.packageTitle}</h4>
                                    <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-600 font-medium">
                                        <span className="flex items-center gap-1.5"><FaCalendarAlt className="text-[#167A44]" /> {b.travelDate}</span>
                                        <span className="flex items-center gap-1.5"><FaUsers className="text-[#167A44]" /> {b.travellers} Travellers</span>
                                        <span className="flex items-center gap-1.5"><FaBed className="text-[#167A44]" /> {b.roomType}</span>
                                    </div>
                                </div>
                                <div className="text-left md:text-right border-t md:border-t-0 pt-4 md:pt-0 border-gray-200 flex flex-col justify-center">
                                    <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Total Amount</span>
                                    <span className="text-2xl font-black text-[#167A44]">₹{b.totalAmount?.toLocaleString('en-IN')}</span>
                                    <span className="block mt-2 text-xs font-bold text-emerald-700 bg-emerald-100 border border-emerald-200 px-3 py-1 rounded-full w-fit md:ml-auto">
                                        {b.bookingStatus || 'Confirmed'}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyBookings;