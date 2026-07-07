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

function BookingForm() {
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
                            placeholder="2"
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

                                <div className="border rounded-2xl p-4 hover:border-blue-600 hover:bg-blue-50 cursor-pointer transition">

                                    <FaBed className="text-2xl text-blue-600 mb-3" />

                                    <p className="font-semibold">

                                        Standard

                                    </p>

                                </div>

                                <div className="border rounded-2xl p-4 hover:border-blue-600 hover:bg-blue-50 cursor-pointer transition">

                                    <FaBed className="text-2xl text-blue-600 mb-3" />

                                    <p className="font-semibold">

                                        Deluxe

                                    </p>

                                </div>

                                <div className="border rounded-2xl p-4 hover:border-blue-600 hover:bg-blue-50 cursor-pointer transition">

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

                    <div className="border rounded-2xl p-4 flex items-center justify-between hover:border-blue-600 cursor-pointer transition">

                        <div className="flex items-center gap-3">

                            <FaPlaneArrival className="text-blue-600" />

                            Airport Pickup

                        </div>

                        <span>Included</span>

                    </div>

                    <div className="border rounded-2xl p-4 flex items-center justify-between hover:border-blue-600 cursor-pointer transition">

                        <div className="flex items-center gap-3">

                            <FaShieldAlt className="text-green-600" />

                            Travel Insurance

                        </div>

                        <span>₹999</span>

                    </div>

                    <div className="border rounded-2xl p-4 flex items-center justify-between hover:border-blue-600 cursor-pointer transition">

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