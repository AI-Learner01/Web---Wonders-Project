import { useParams, useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaClock, FaStar, FaArrowLeft, FaCheckCircle, FaMap } from "react-icons/fa";
import PackageSection from "../components/PackageSection";

const createSlug = (title) => {
    if (!title) return "";
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
};

function PackageDetails({ packages, onBookNow, onViewDetails }) {
    const { packageId } = useParams();
    const navigate = useNavigate();

    const selectedPackage = packages.find(
        (p) => createSlug(p.title) === packageId
    );

    if (!selectedPackage) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <p className="text-gray-500 text-xl font-semibold">Loading or Package not found...</p>
            </div>
        );
    }

    // Filter similar packages based on the category/type of the current one
    const similarPackages = packages
        .filter((p) => p.type === selectedPackage.type && p.id !== selectedPackage.id)
        .slice(0, 5); // Take up to 5 similar packages

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* 1. HERO SECTION */}
            <section
                className="relative h-[450px] lg:h-[550px] bg-cover bg-center flex items-end pb-12"
                style={{ backgroundImage: `url(${selectedPackage.image})` }}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
                <div className="relative max-w-7xl mx-auto px-6 w-full text-white">
                    <button
                        onClick={() => navigate("/packages")}
                        className="mb-6 bg-white/20 backdrop-blur-md border border-white/30 px-5 py-2 rounded-full flex items-center gap-2 hover:bg-white/30 transition-all duration-300"
                    >
                        <FaArrowLeft /> Back
                    </button>
                    <div className="flex gap-3 mb-4">
                        <span className="bg-emerald-600/90 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-bold shadow-lg">
                            {selectedPackage.badge || selectedPackage.type}
                        </span>
                        <span className="bg-white/30 backdrop-blur-xl border border-white/40 px-3 py-1.5 rounded-full text-sm font-semibold flex items-center gap-1 shadow-lg">
                            <FaStar className="text-yellow-400" /> {selectedPackage.rating}
                        </span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-lg">
                        {selectedPackage.title}
                    </h1>
                    <div className="flex flex-wrap gap-5 text-gray-200 text-lg">
                        <span className="flex items-center gap-2"><FaMapMarkerAlt /> {selectedPackage.location}</span>
                        <span className="flex items-center gap-2"><FaClock /> {selectedPackage.duration}</span>
                    </div>
                </div>
            </section>

            {/* MAIN CONTENT AREA */}
            <section className="max-w-7xl mx-auto px-6 -mt-8 relative z-10 space-y-8">

                {/* ROW 1: ABOUT (Left) & PRICE (Right) */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* ABOUT SECTION */}
                    <div className="lg:col-span-2 bg-white/70 backdrop-blur-2xl border border-white/40 rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-8">
                        <h2 className="text-3xl font-bold text-gray-800 mb-5">About</h2>
                        <p className="text-gray-600 leading-relaxed text-lg mb-8">
                            Experience the trip of a lifetime with our meticulously crafted {selectedPackage.title} package.
                            Immerse yourself in the beauty of {selectedPackage.location} over {selectedPackage.duration}.
                            Whether you're looking for adventure, relaxation, or cultural exploration, this package includes premium accommodations, expert guides, and unforgettable memories tailored just for you.
                        </p>
                        <h3 className="text-2xl font-bold text-gray-800 mb-5">What's Included</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {selectedPackage.features.map((feature, idx) => (
                                <div key={idx} className="flex items-center gap-3 text-emerald-700 font-medium bg-emerald-50/50 px-4 py-3 rounded-2xl border border-emerald-100">
                                    <FaCheckCircle className="text-emerald-500" /> {feature}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* PRICE SECTION (With Book Now Button) */}
                    <div className="lg:col-span-1 bg-white/70 backdrop-blur-2xl border border-white/40 rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-8 sticky top-6 self-start">
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Book Your Trip</h2>
                        <p className="text-gray-500 mb-6">Secure your spot today!</p>

                        <div className="flex items-end gap-3 mb-1">
                            <span className="text-4xl font-extrabold text-emerald-600 drop-shadow-sm">
                                ₹{selectedPackage.price.toLocaleString()}
                            </span>
                            <span className="text-gray-500 mb-1 font-medium">/ person</span>
                        </div>
                        <p className="text-gray-400 line-through text-lg mb-8">
                            ₹{selectedPackage.originalPrice.toLocaleString()}
                        </p>

                        {/* BOOKING BUTTON */}
                        <button
                            onClick={() => onBookNow(selectedPackage)}
                            className="w-full rounded-2xl py-4 font-bold text-lg text-white flex justify-center items-center gap-3 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                        >
                            Book Now
                        </button>
                    </div>
                </div>

                {/* ROW 2: ITINERARY (Left) & MAP (Right) */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* ITINERARY SECTION */}
                    <div className="lg:col-span-1 bg-white/70 backdrop-blur-2xl border border-white/40 rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-8">
                        <h2 className="text-3xl font-bold text-gray-800 mb-8">Itinerary</h2>
                        <div className="relative border-l-2 border-emerald-200 ml-4 space-y-8">
                            {selectedPackage.itinerary.map((item, idx) => (
                                <div key={idx} className="relative pl-8">
                                    {/* Timeline Node */}
                                    <div className="absolute -left-[11px] top-1 w-5 h-5 rounded-full bg-emerald-500 border-4 border-white shadow-sm"></div>
                                    <h3 className="font-bold text-gray-800 text-lg">Day {idx + 1}</h3>
                                    <p className="text-gray-600 mt-2">{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* MAP SECTION */}
                    <div className="lg:col-span-2 bg-white/70 backdrop-blur-2xl border border-white/40 rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-8 flex flex-col items-center justify-center min-h-[400px]">
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6 shadow-inner">
                            <FaMap className="text-4xl text-gray-300" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-400 mb-3">Map Coming Soon</h2>
                        <p className="text-gray-500 text-center max-w-md text-lg">
                            We are currently updating our interactive routing maps for {selectedPackage.location}. Check back shortly!
                        </p>
                    </div>
                </div>

                {/* ROW 3: SIMILAR PACKAGES SLIDER */}
                {similarPackages.length > 0 && (
                    <div className="pt-8">
                        {/* We reuse your PackageSection here, mapping clicks back to the details page handler */}
                        <PackageSection
                            title="Similar Packages"
                            packages={similarPackages}
                            onBookNow={onViewDetails}
                        />
                    </div>
                )}
            </section>
        </div>
    );
}

export default PackageDetails;