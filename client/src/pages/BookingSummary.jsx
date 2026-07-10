import TravellerCard from "../components/TravellerCard";
import SummaryCard from "../components/SummaryCard";

function BookingSummary({

    selectedPackage,

    bookingData,

    onBack

}) {

    if (!selectedPackage || !bookingData) {
        return (
            <div className="bg-white rounded-3xl shadow-xl p-6">
                <p className="text-gray-500">
                    Loading booking summary...
                </p>
            </div>
        );
    }

    return (

        <div className="min-h-screen bg-slate-50">

            {/* Hero */}

            <section className="bg-gradient-to-r from-blue-700 to-sky-500 text-white">

                <div className="max-w-7xl mx-auto px-6 py-16">

                    <button
                        onClick={onBack}
                        className="mb-6 bg-white text-blue-700 px-5 py-2 rounded-full shadow hover:bg-blue-50 transition"
                    >
                        ← Back
                    </button>

                    <h1 className="text-5xl font-bold">

                        Booking Review

                    </h1>

                    <p className="mt-4 text-lg">

                        Please review your booking details before payment.

                    </p>

                </div>

            </section>

            <section className="max-w-7xl mx-auto px-6 py-12 grid lg:grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">

                <div className="lg:col-span-2">

                    <TravellerCard

                        bookingData={bookingData}
                    />

                </div>

                <div>

                    <SummaryCard
                        selectedPackage={selectedPackage}
                        bookingData={bookingData}
                    />

                </div>

            </section>

        </div>

    );

}

export default BookingSummary;