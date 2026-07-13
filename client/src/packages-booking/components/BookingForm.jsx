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


function BookingForm({

    bookingData,
    setBookingData,
    errors
    

}) {
    const toggleService = (service) => {

        const updatedServices =
            bookingData.services.includes(service)
                ? bookingData.services.filter(item => item !== service)
                : [...bookingData.services, service];

        setBookingData({
            ...bookingData,
            services: updatedServices
        });

    };


    return (
        <form className="bg-white rounded-3xl shadow-xl p-8">

            <h2 className="text-3xl font-bold text-gray-800 mb-8">
                Traveller Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div>
                    <label className="block mb-2 font-medium">
                        Full Name <span className="text-red-500">*</span>
                    </label>

                    <div className="relative">

                        <FaUser className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />

                        <input
                            type="text"
                            placeholder="Enter your name"
                            value={bookingData.name}
                            onChange={(e) =>
                                setBookingData({
                                    ...bookingData,
                                    name: e.target.value
                                })
                            }
                            className="w-full border rounded-xl pl-14 pr-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.name}
                            </p>
                        )}

                    </div>
                </div>

                <div>
                    <label className="block mb-2 font-medium">
                        Email <span className="text-red-500">*</span>
                    </label>

                    <div className="relative">

                        <FaEnvelope className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />


                        <input
                            type="email"
                            placeholder="Enter email"
                            value={bookingData.email}
                            onChange={(e) =>
                                setBookingData({
                                    ...bookingData,
                                    email: e.target.value
                                })
                            }
                            className="w-full border rounded-xl pl-14 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.email}
                            </p>
                        )}

                    </div>
                </div>

                <div>
                    <label className="block mb-2 font-medium">
                        Phone Number <span className="text-red-500">*</span>
                    </label>

                    <div className="relative">

                        <FaPhone className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />


                        <input
                            type="tel"
                            placeholder="Enter phone number"
                            value={bookingData.phone}
                            onChange={(e) =>
                                setBookingData({
                                    ...bookingData,
                                    phone: e.target.value
                                })
                            }
                            className="w-full border rounded-xl pl-14 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                        />

                        {errors.phone && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.phone}
                            </p>
                        )}

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
                            value={bookingData.travellers}
                            onChange={(e) => {
                                const value = Number(e.target.value);
                                setBookingData({
                                    ...bookingData,
                                    travellers: Math.max(1, Number(e.target.value))
                                })
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
                            Departure Date <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">

                            <FaCalendarAlt className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />

                            <input
                                type="date"
                                value={bookingData.departureDate}
                                onChange={(e) =>
                                    setBookingData({
                                        ...bookingData,
                                        departureDate: e.target.value
                                    })
                                }
                                className="w-full border rounded-xl pl-14 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                            {errors.departureDate && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.departureDate}
                                </p>
                            )}

                        </div>
                    </div>

                    <div>

                        <div>

                            <h3 className="font-semibold mb-4">

                                Room Type

                            </h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">

                                <div
                                    onClick={() => setBookingData({
                                        ...bookingData,
                                        roomType: "Standard"
                                    })}
                                    className={`border rounded-2xl p-4 cursor-pointer transition

    ${bookingData.roomType === "Standard"

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
                                    onClick={() => setBookingData({
                                        ...bookingData,
                                        roomType: "Deluxe"
                                    })}
                                    className={`border rounded-2xl p-4 cursor-pointer transition

    ${bookingData.roomType === "Deluxe"

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
                                    onClick={() => setBookingData({
                                        ...bookingData,
                                        roomType: "Suite"
                                    })}
                                    className={`border rounded-2xl p-4 cursor-pointer transition

    ${bookingData.roomType === "Suite"

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

${bookingData.services.includes("Airport Pickup")

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

${bookingData.services.includes("Travel Insurance")

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

${bookingData.services.includes("Guided City Tour")

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