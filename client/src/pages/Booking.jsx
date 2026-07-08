import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

import BookingForm from "../components/BookingForm";

function Booking({ selectedPackage, onBack }) {

    const [travellers, setTravellers] = useState(2);

    const [roomType, setRoomType] = useState("Standard");

    const [services, setServices] = useState([]);


    let total = selectedPackage.price * travellers;

    if (roomType === "Deluxe") {

        total += 3000;

    }

    if (roomType === "Suite") {

        total += 7000;

    }

    if (services.includes("Travel Insurance")) {

        total += 999;

    }

    if (services.includes("Guided City Tour")) {

        total += 1499;

    }
    return (
        <div className="min-h-screen bg-slate-50">

            {/* Hero */}

            <section className="bg-gradient-to-r from-blue-700 to-sky-500 text-white">

                <div className="max-w-7xl mx-auto px-6 py-20">

                    <button
                        onClick={onBack}
                        className="inline-flex items-center gap-2 mb-6 px-5 py-2 bg-white/15 backdrop-blur-md border border-white/30 text-white rounded-full hover:bg-white/25 transition-all duration-300"
                    >
                        <FaArrowLeft />
                        Back to Packages
                    </button>


                    <h1 className="text-5xl font-bold">

                        Book Your Dream Vacation

                    </h1>

                    <p className="mt-4 text-lg">

                        Complete your booking details and get ready for an unforgettable journey.

                    </p>

                </div>

            </section>

            {/* Content */}

            <section className="max-w-7xl mx-auto px-6 py-14">

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    <div className="lg:col-span-2">

                        <BookingForm

                            travellers={travellers}
                            setTravellers={setTravellers}

                            roomType={roomType}
                            setRoomType={setRoomType}

                            services={services}
                            setServices={setServices}

                        />

                    </div>

                    <div>

                        <div className="bg-white rounded-3xl shadow-xl p-6 sticky top-6">

                            <h2 className="text-2xl font-bold">

                                Booking Summary

                            </h2>

                            <img
                                src={selectedPackage.image}

                                alt={selectedPackage.title}

                                className="w-full h-48 object-cover rounded-2xl"
                            />

                            <hr className="my-5" />

                            <div className="space-y-3 text-gray-700">

                                <div className="flex justify-between">

                                    <span>Package</span>

                                    <span>{selectedPackage.title}</span>

                                </div>

                                <div className="flex justify-between">

                                    <span>Travellers</span>

                                    <span>{travellers}</span>

                                </div>



                                <div className="flex justify-between">

                                    <span>Duration</span>

                                    <span>{selectedPackage.duration}</span>

                                </div>

                                <div className="flex justify-between">

                                    <span>RoomType</span>

                                    <span>{roomType}</span>

                                </div>

                                <div className="mt-5">

                                    <h3 className="font-semibold mb-2">

                                        Selected Services

                                    </h3>

                                    {
                                        services.length === 0
                                            ? (
                                                <p className="text-gray-400">
                                                    None
                                                </p>
                                            )
                                            : (
                                                <ul className="space-y-1">

                                                    {
                                                        services.map((service) => (

                                                            <li key={service}>
                                                                ✔ {service}
                                                            </li>

                                                        ))
                                                    }

                                                </ul>
                                            )
                                    }

                                </div>


                                <div className="flex justify-between font-bold text-blue-700 text-xl pt-4">

                                    <span>Total</span>

                                    <span>₹{total.toLocaleString()}</span>

                                </div>

                            </div>

                            <button className="mt-10 w-full bg-gradient-to-r from-blue-600 to-sky-500 hover:to-sky-600 transition-all duration-300 text-white py-4 rounded-2xl font-bold text-lg">

                                Continue Booking

                            </button>

                        </div>

                    </div>

                </div>

            </section>

        </div>
    );
}

export default Booking;