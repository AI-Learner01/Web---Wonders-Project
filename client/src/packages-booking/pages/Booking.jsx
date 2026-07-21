import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

import BookingForm from "../components/BookingForm";
import { useParams, useNavigate } from 'react-router-dom';
import packages from '../data/packages';

function Booking({ selectedPackage, onBack, onContinue }) {

    const { packageId } = useParams();
    const navigate = useNavigate();
    // const selectedPackage = packages.find(p => p.id === Number(packageId));

    const [bookingData, setBookingData] = useState({
        name: "",
        email: "",
        phone: "",
        departureDate: "",
        travellers: 2,
        roomType: "Standard",
        services: [],
    });

    const [errors, setErrors] = useState({});

    const validateBooking = () => {

        const newErrors = {};

        if (!bookingData.name.trim()) {
            newErrors.name = "Name is required";
        }

        if (!bookingData.email.trim()) {
            newErrors.email = "Email is required";
        }
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(bookingData.email)) {
            newErrors.email = "Enter a valid email";
        }

        if (!bookingData.phone.trim()) {
            newErrors.phone = "Phone number is required";
        }
        else if (!/^[0-9]{10}$/.test(bookingData.phone)) {
            newErrors.phone = "Phone must contain exactly 10 digits";
        }

        if (!bookingData.departureDate) {
            newErrors.departureDate = "Please select a departure date";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleContinue = async () => {

    if (!validateBooking()) return;

    try {

        const booking = {

            packageId: selectedPackage._id,

            packageTitle: selectedPackage.title,

            travellerName: bookingData.name,

            email: bookingData.email,

            phone: bookingData.phone,

            travellers: bookingData.travellers,

            travelDate: bookingData.departureDate,

            roomType: bookingData.roomType,

            services: bookingData.services,

            totalAmount: total

        };

        const response = await fetch(
            "http://localhost:5000/api/bookings",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(booking)
            }
        );

        const result = await response.json();

        if (!result.success) {

            alert("Booking Failed");

            return;

        }

        console.log("Booking Saved:", result.bookingId);

        onContinue(bookingData);

    }

    catch (err) {

        console.error(err);

        alert("Server Error");

    }

};

    let total = selectedPackage.price * bookingData.travellers;

    if (bookingData.roomType === "Deluxe") {

        total += 3000;

    }

    if (bookingData.roomType === "Suite") {

        total += 7000;

    }

    if (bookingData.services.includes("Travel Insurance")) {

        total += 999;

    }

    if (bookingData.services.includes("Guided City Tour")) {

        total += 1499;

    }

    return (
        <div className="min-h-screen bg-slate-50">

            {/* Hero */}

            <section className="w-full py-20 bg-gradient-to-r from-blue-700 to-sky-500 text-white">

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

                <div className="grid grid-cols-1 lg:grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">

                    <div className="lg:col-span-2">

                        <BookingForm

                            bookingData={bookingData}
                            setBookingData={setBookingData}
                            errors={errors}

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

                                    <span>{bookingData.travellers}</span>

                                </div>



                                <div className="flex justify-between">

                                    <span>Duration</span>

                                    <span>{selectedPackage.duration}</span>

                                </div>

                                <div className="flex justify-between">

                                    <span>RoomType</span>

                                    <span>{bookingData.roomType}</span>

                                </div>

                                <div className="mt-5">

                                    <h3 className="font-semibold mb-2">

                                        Selected Services

                                    </h3>

                                    {
                                        bookingData.services.length === 0
                                            ? (
                                                <p className="text-gray-400">
                                                    None
                                                </p>
                                            )
                                            : (
                                                <ul className="space-y-1">

                                                    {
                                                        bookingData.services.map((service) => (

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

                            <button
                                onClick={handleContinue}
                                className="mt-10 w-full bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white py-4 rounded-2xl font-bold text-lg transition"
                            >
                                Continue to Review →
                            </button>
                        </div>

                    </div>

                </div>

            </section>

        </div>
    );
}

export default Booking;