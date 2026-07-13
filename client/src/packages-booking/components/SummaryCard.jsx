function SummaryCard({

    selectedPackage, bookingData

}) {
    console.log("selectedPackage:", selectedPackage);
    console.log("bookingData:", bookingData);

    const roomCharges = {
        Standard: 0,
        Deluxe: 3000,
        Suite: 7000
    };

    const serviceCharges = {
        "Travel Insurance": 999,
        "Airport Pickup": 800,
        "Guided City Tour": 1499
    };

    const roomPrice =
        roomCharges[bookingData.roomType] || 0;

    const services = bookingData?.services || [];

    const servicesPrice =
        services.reduce(
            (sum, service) =>
                sum + (serviceCharges[service] || 0),
            0
        );

    const packagePrice =
        selectedPackage.price *
        bookingData.travellers;

    const grandTotal =
        packagePrice +
        roomPrice +
        servicesPrice;

    
    const handlePayment = () => {

        alert(

        "🎉 Payment Gateway will be integrated in the backend phase.\n\nYour booking details have been successfully reviewed."

    );

    };

    return (


        <div className="bg-white rounded-3xl shadow-xl p-6 sticky top-6">

            <h2 className="text-2xl font-bold">

                Package Summary

            </h2>

            <hr className="my-5" />

            <div className="flex justify-between items-center mb-4">

                <span className="text-gray-500">

                    Booking ID

                </span>

                <span className="font-bold text-blue-600">

                    WW-{Math.floor(100000 + Math.random() * 900000)}

                </span>

            </div>

            <img

                src={selectedPackage.image}

                alt={selectedPackage.title}

                className="rounded-2xl h-52 w-full object-cover"

            />

            <h2 className="text-2xl font-bold mt-5">

                {selectedPackage.title}

            </h2>

            <p className="text-gray-500">

                {selectedPackage.duration}

            </p>

            <p className="text-3xl font-bold text-blue-700 mt-4">

                ₹{selectedPackage.price.toLocaleString()}

                <span className="text-base text-gray-500">

                    /person

                </span>

            </p>

            <hr className="my-6" />

            <div className="space-y-4 mt-6">

                <div className="flex justify-between">
                    <span>Package</span>
                    <span>
                        ₹{selectedPackage.price.toLocaleString()}
                    </span>
                </div>

                <div className="flex justify-between">
                    <span>
                        Travellers × {bookingData.travellers}
                    </span>
                    <span>
                        ₹{packagePrice.toLocaleString()}
                    </span>
                </div>

                <div className="flex justify-between">
                    <span>
                        Room ({bookingData.roomType})
                    </span>

                    <span>
                        +₹{roomPrice.toLocaleString()}
                    </span>
                </div>

                {bookingData.services.map((service) => (

                    <div
                        key={service}
                        className="flex justify-between text-gray-600"
                    >

                        <span>
                            ✓ {service}
                        </span>

                        <span>
                            +₹{serviceCharges[service].toLocaleString()}
                        </span>

                    </div>

                ))}

                <hr />

                <div className="flex justify-between text-2xl font-bold">

                    <span>
                        Grand Total
                    </span>

                    <span className="text-blue-600">
                        ₹{grandTotal.toLocaleString()}
                    </span>

                </div>

            </div>

            <hr className="my-6" />

            <div className="space-y-3 mb-6">

                <div className="flex items-center gap-2 text-green-600">

                    <span>✔</span>

                    <span>Secure SSL Payment</span>

                </div>

                <div className="flex items-center gap-2 text-green-600">

                    <span>✔</span>

                    <span>Instant Booking Confirmation</span>

                </div>

                <div className="flex items-center gap-2 text-green-600">

                    <span>✔</span>

                    <span>24×7 Customer Support</span>

                </div>

                <button

                    onClick={handlePayment}

                    className="w-full bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white py-4 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-[1.02] shadow-lg"

                >

                    💳 Proceed to Payment

                </button>

                <div className="mt-6 text-center">

                    <p className="text-sm text-gray-500 mb-3">

                        We Accept

                    </p>

                    <div className="flex justify-center gap-3">

                        <div className="border rounded-lg px-3 py-2">

                            VISA

                        </div>

                        <div className="border rounded-lg px-3 py-2">

                            Mastercard

                        </div>

                        <div className="border rounded-lg px-3 py-2">

                            UPI

                        </div>

                        <div className="border rounded-lg px-3 py-2">

                            Paytm

                        </div>

                    </div>

                </div>

            </div>

        </div>

        
    );


}

export default SummaryCard;