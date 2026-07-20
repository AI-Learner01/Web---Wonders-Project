import Itinerary from "./Itinerary";

function ItineraryPage() {
    return (
        // The pt-28 (padding-top) ensures the content starts below the sticky Navbar
        <div className="min-h-screen bg-slate-50 pt-28 pb-12">
            <div className="max-w-7xl mx-auto px-6 text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                    Your Travel Itinerary
                </h1>
                <p className="text-lg text-gray-600">
                    Review your day-by-day vacation schedule below.
                </p>
            </div>
            
            <Itinerary />
        </div>
    );
}

export default ItineraryPage;