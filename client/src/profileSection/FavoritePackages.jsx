import React, { useState, useEffect } from 'react';
import { FaHeart, FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const createSlug = (title) => {
    if (!title) return "";
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
};

const FavoritePackages = ({ userData, refreshProfile }) => {
    // Read directly from the fetched database user object!
    const favorites = userData?.favorites || [];

    const removeFavorite = async (pkg) => {
        try {
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/toggle-favorite`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ packageData: pkg })
            });
            const data = await res.json();
            if (data.success) {
                refreshProfile(); // Instantly refresh the UI from the database
            }
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <div className="w-full space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="text-lg font-bold text-gray-800 mb-6 border-b pb-3 border-gray-100 flex items-center gap-2">
                    Favorite Packages
                </h3>

                {favorites.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                        <FaHeart className="mx-auto text-4xl text-gray-300 mb-3" />
                        <p className="text-gray-500 font-medium">You haven't favorited any packages yet.</p>
                        <p className="text-sm text-gray-400 mt-1">Click the heart icon on any package to save it here.</p>
                        <Link to="/packages" className="inline-block mt-4 bg-emerald-50 text-[#167A44] px-6 py-2.5 rounded-lg font-bold hover:bg-emerald-100 transition">
                            Browse Packages
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {favorites.map(pkg => (
                            <div key={pkg.id || pkg._id} className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm bg-white hover:shadow-md transition">
                                <div className="h-44 bg-gray-200 relative">
                                    <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover" />
                                    <button
                                        onClick={() => removeFavorite(pkg.id || pkg._id)}
                                        className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2.5 rounded-full shadow-md text-red-500 hover:scale-110 transition"
                                    >
                                        <FaHeart />
                                    </button>
                                </div>
                                <div className="p-5">
                                    <h4 className="font-bold text-gray-900 text-lg truncate">{pkg.title}</h4>
                                    <p className="text-sm text-gray-500 flex items-center gap-1.5 mt-1 font-medium">
                                        <FaMapMarkerAlt className="text-[#167A44]" /> {pkg.location}
                                    </p>
                                    <div className="mt-5 flex justify-between items-center border-t border-gray-100 pt-4">
                                        <span className="font-extrabold text-[#167A44] text-lg">₹{pkg.price?.toLocaleString()}</span>
                                        <Link to={`/packages/details/${createSlug(pkg.title)}`} className="text-sm font-bold text-blue-600 hover:text-blue-800 hover:underline">
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FavoritePackages;