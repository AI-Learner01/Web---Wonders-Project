import BookingForm from "../components/BookingForm";

function Booking() {
    return (
        <div className="min-h-screen bg-slate-50">

            {/* Hero */}

            <section className="bg-gradient-to-r from-blue-700 to-sky-500 text-white">

                <div className="max-w-7xl mx-auto px-6 py-20">

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

                        <BookingForm />

                    </div>

                    <div>

                        <div className="bg-white rounded-3xl shadow-xl p-6 sticky top-6">

                            <h2 className="text-2xl font-bold">

                                Booking Summary

                            </h2>

                            <img
                                src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800"
                                alt="Bali"
                                className="w-full h-48 object-cover rounded-2xl"
                            />

                            <hr className="my-5" />

                            <div className="space-y-3 text-gray-700">

                                <div className="flex justify-between">

                                    <span>Package</span>

                                    <span>Bali Escape</span>

                                </div>

                                <div className="flex justify-between">

                                    <span>Travellers</span>

                                    <span>2</span>

                                </div>

                                <div className="flex justify-between">

                                    <span>Duration</span>

                                    <span>5 Days</span>

                                </div>

                                <div className="flex justify-between font-bold text-blue-700 text-xl pt-4">

                                    <span>Total</span>

                                    <span>₹69,998</span>

                                </div>

                            </div>

                            <button className="mt-10 w-full bg-gradient-to-r from-blue-600 to sky-500 hover:to-sky-600 transition-all duration-300 text-white py-4 rounded-2xl font-bold text-lg">

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