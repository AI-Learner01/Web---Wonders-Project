import React, { useState } from 'react';
import { FaMap, FaTrash, FaClock, FaTimes, FaMapMarkerAlt, FaBed, FaUtensils, FaCamera } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const SavedItineraries = ({ userData, refreshProfile }) => {
    const itineraries = userData?.itineraries || [];
    
    // NEW: State to handle the modal popup
    const [selectedItinerary, setSelectedItinerary] = useState(null);

    const handleDelete = async (id) => {
        try {
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/delete-itinerary/${id}`, {
                method: "DELETE",
                credentials: "include"
            });
            const data = await res.json();
            if (data.success) {
                refreshProfile();
                if (selectedItinerary && selectedItinerary.id === id) {
                    setSelectedItinerary(null);
                }
            }
        } catch (err) {
            console.error(err);
        }
    };

    const getActivityIcon = (type) => {
        switch(type) {
          case 'stay': return <FaBed className="text-blue-500" />;
          case 'food': return <FaUtensils className="text-orange-500" />;
          case 'explore': return <FaCamera className="text-emerald-500" />;
          default: return <FaMapMarkerAlt className="text-gray-500" />;
        }
    };

    return (
        <div className="w-full space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="text-lg font-bold text-gray-800 mb-6 border-b pb-3 border-gray-100">
                    Saved Itineraries
                </h3>

                {itineraries.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                        <FaMap className="mx-auto text-4xl text-gray-300 mb-3" />
                        <p className="text-gray-500 font-medium">No custom itineraries saved yet.</p>
                        <Link to="/itinerary" className="inline-block mt-4 bg-emerald-50 text-[#167A44] px-6 py-2.5 rounded-lg font-bold hover:bg-emerald-100 transition">
                            Create an Itinerary
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-5">
                        {itineraries.map(it => (
                            <div key={it.id} className="p-5 border border-gray-100 bg-gray-50 rounded-xl flex flex-col md:flex-row justify-between items-center gap-4 transition hover:bg-white hover:shadow-md">
                                <div className="w-full">
                                    <h4 className="font-bold text-lg text-gray-900">{it.tripName}</h4>
                                    <p className="text-sm text-gray-500 mt-1 flex items-center gap-2 font-medium">
                                        <FaClock className="text-gray-400" /> Saved on: {new Date(it.dateSaved).toLocaleDateString()}
                                    </p>
                                    <div className="mt-3 flex gap-2">
                                        <span className="text-xs font-bold bg-emerald-100 border border-emerald-200 text-emerald-700 px-3 py-1 rounded-md">
                                            {it.daysCount} Days
                                        </span>
                                        <span className="text-xs font-bold bg-blue-100 border border-blue-200 text-blue-700 px-3 py-1 rounded-md">
                                            {it.activitiesCount} Activities
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 shrink-0">
                                    {/* NEW: View Full Itinerary Button */}
                                    <button
                                        onClick={() => setSelectedItinerary(it)}
                                        className="text-sm font-bold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-4 py-2.5 rounded-xl transition"
                                    >
                                        View Full Itinerary
                                    </button>
                                    <button
                                        onClick={() => handleDelete(it.id)}
                                        className="text-red-500 hover:text-red-700 hover:bg-red-50 p-3 bg-white border border-gray-200 rounded-full shadow-sm transition"
                                        title="Delete Itinerary"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* NEW: Full Itinerary Modal */}
            {selectedItinerary && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl p-6 w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl animate-in fade-in zoom-in duration-200">
                        
                        {/* Modal Header */}
                        <div className="flex justify-between items-center border-b border-gray-100 pb-4 mb-4 shrink-0">
                            <div>
                                <h2 className="text-2xl font-black text-gray-800">{selectedItinerary.tripName}</h2>
                                <p className="text-sm text-gray-500 font-medium mt-1">Saved on {new Date(selectedItinerary.dateSaved).toLocaleDateString()}</p>
                            </div>
                            <button 
                                onClick={() => setSelectedItinerary(null)} 
                                className="text-gray-400 hover:text-red-500 bg-gray-100 hover:bg-red-50 p-2.5 rounded-full transition"
                            >
                                <FaTimes className="text-xl" />
                            </button>
                        </div>

                        {/* Modal Content (Scrollable) */}
                        <div className="overflow-y-auto pr-2 pb-4 space-y-6">
                            {selectedItinerary.days.map((day, idx) => (
                                <div key={day.id} className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                                    <h3 className="font-extrabold text-lg text-[#167A44] mb-4 flex items-center gap-2">
                                        <span className="bg-[#167A44] text-white w-8 h-8 rounded-lg flex items-center justify-center text-sm">
                                            D{idx + 1}
                                        </span>
                                        {day.title}
                                    </h3>
                                    
                                    <div className="space-y-3 pl-4 sm:pl-10 border-l-2 border-gray-200 ml-4">
                                        {day.activities.map(act => (
                                            <div key={act.id} className="relative flex items-center gap-4 bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                                                <div className="absolute -left-[30px] sm:-left-[54px] w-3 h-3 bg-white border-2 border-gray-400 rounded-full"></div>
                                                <div className="font-bold text-sm text-gray-600 bg-gray-100 px-3 py-1.5 rounded-lg shrink-0">
                                                    {act.time}
                                                </div>
                                                <div className="w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center shrink-0">
                                                    {getActivityIcon(act.type)}
                                                </div>
                                                <div className="font-semibold text-gray-800 text-[15px]">
                                                    {act.title}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SavedItineraries;