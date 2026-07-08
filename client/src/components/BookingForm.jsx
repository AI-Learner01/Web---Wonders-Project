import {
    FaUser,
    FaEnvelope,
    FaPhone,
    FaUsers,
    FaCalendarAlt,
    FaBed,
    FaPlaneArrival,
    FaShieldAlt,
    FaMapMarkedAlt,
} from "react-icons/fa";

import { useState } from "react";

function BookingForm({

    travellers,
    setTravellers,

    roomType,
    setRoomType,

    services,
    setServices

}) {
    const toggleService = (service) => {

        if (services.includes(service)) {

            setServices(
                services.filter(item => item !== service)
            );

        }

        else {

            setServices([
                ...services,
                service
            ]);

        }

    };



    return (
        <form className="bg-white rounded-3xl shadow-xl p-8">

            <h2 className="text-3xl font-bold text-gray-800 mb-8">
                Traveller Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div>
                    <label className="block mb-2 font-medium">
                        Full Name
                    </label>

                    <div className="relative">

                        <FaUser className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />

                        <input
                            type="text"
                            placeholder="Enter your name"
                            className="w-full border rounded-xl pl-14 pr-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                        />

                    </div>
                </div>

                <div>
                    <label className="block mb-2 font-medium">
                        Email
                    </label>

                    <div className="relative">

                        <FaEnvelope className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />


                        <input
                            type="email"
                            placeholder="Enter email"
                            className="w-full border rounded-xl pl-14 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                        />

                    </div>
                </div>

                <div>
                    <label className="block mb-2 font-medium">
                        Phone Number
                    </label>

                    <div className="relative">

                        <FaPhone className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />


                        <input
                            type="tel"
                            placeholder="Enter phone number"
                            className="w-full border rounded-xl pl-14 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>
                </div>

                <div>
                    <label className="block mb-2 font-medium">
                        Number of Travellers
                    </label>

                    <div className="relative">

                        <FaUsers className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />


                        <input
                            type="number"
                            min="1"
                            value={travellers}
                            onChange={(e) => {
                                const value = Number(e.target.value);
                                setTravellers(Math.max(1, value));
                            }

                            }
                            className="w-full border rounded-xl pl-14 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                        />

                    </div>
                </div>

            </div>

            <div className="bg-white rounded-3xl shadow-xl p-8 mt-8">

                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    Travel Details
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <div>
                        <label className="block mb-2 font-medium">
                            Departure Date
                        </label>
                        <div className="relative">

                            <FaCalendarAlt className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />

                            <input
                                type="date"
                                className="w-full border rounded-xl pl-14 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                            />

                        </div>
                    </div>

                    <div>

                        <div>

                            <h3 className="font-semibold mb-4">

                                Room Type

                            </h3>

                            <div className="grid grid-cols-3 gap-4">

                                <div
                                    onClick={() => setRoomType("Standard")}
                                    className={`border rounded-2xl p-4 cursor-pointer transition

    ${roomType === "Standard"

                                            ? "border-blue-600 bg-blue-50"

                                            : "hover:border-blue-600"
                                        }`}
                                >

                                    <FaBed className="text-2xl text-blue-600 mb-3" />

                                    <p className="font-semibold">

                                        Standard

                                    </p>

                                </div>

                                <div
                                    onClick={() => setRoomType("Deluxe")}
                                    className={`border rounded-2xl p-4 cursor-pointer transition

    ${roomType === "Deluxe"

                                            ? "border-blue-600 bg-blue-50"

                                            : "hover:border-blue-600"
                                        }`}
                                >

                                    <FaBed className="text-2xl text-blue-600 mb-3" />

                                    <p className="font-semibold">

                                        Deluxe

                                    </p>

                                </div>

                                <div
                                    onClick={() => setRoomType("Suite")}
                                    className={`border rounded-2xl p-4 cursor-pointer transition

    ${roomType === "Suite"

                                            ? "border-blue-600 bg-blue-50"

                                            : "hover:border-blue-600"
                                        }`}
                                >

                                    <FaBed className="text-2xl text-blue-600 mb-3" />

                                    <p className="font-semibold">

                                        Suite

                                    </p>

                                </div>

                            </div>

                        </div>
                    </div>

                </div>

            </div>

            <div className="bg-white rounded-3xl shadow-xl p-8 mt-8">

                <h2 className="text-2xl font-bold mb-6">

                    Additional Services

                </h2>

                <div className="space-y-4">

                    <div

                        onClick={() => toggleService("Airport Pickup")}

                        className={`border rounded-2xl p-4 flex justify-between items-center cursor-pointer transition

${services.includes("Airport Pickup")

                                ? "border-blue-600 bg-blue-50"

                                : "hover:border-blue-600"
                            }`}

                    >
                        <div className="flex items-center gap-3">

                            <FaPlaneArrival className="text-blue-600" />

                            Airport Pickup

                        </div>

                        <span>Included</span>

                    </div>

                    <div

                        onClick={() => toggleService("Travel Insurance")}

                        className={`border rounded-2xl p-4 flex justify-between items-center cursor-pointer transition

${services.includes("Travel Insurance")

                                ? "border-blue-600 bg-blue-50"

                                : "hover:border-blue-600"
                            }`}

                    >
                        <div className="flex items-center gap-3">

                            <FaShieldAlt className="text-green-600" />

                            Travel Insurance

                        </div>

                        <span>₹999</span>

                    </div>

                    <div

                        onClick={() => toggleService("Guided City Tour")}

                        className={`border rounded-2xl p-4 flex justify-between items-center cursor-pointer transition

${services.includes("Guided City Tour")

                                ? "border-blue-600 bg-blue-50"

                                : "hover:border-blue-600"
                            }`}

                    >
                        <div className="flex items-center gap-3">

                            <FaMapMarkedAlt className="text-orange-500" />

                            Guided City Tour

                        </div>

                        <span>₹1499</span>

                    </div>

                </div>

            </div>

            <div className="mt-8">

                <label className="block mb-2 font-medium">

                    Special Requests

                </label>

                <textarea
                    rows="5"
                    placeholder="Tell us about your travel preferences..."
                    className="w-full border rounded-xl p-4"
                />

            </div>

        </form>
    );
}

export default BookingForm;