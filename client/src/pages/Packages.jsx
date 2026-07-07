import PackageFilter from "../components/PackageFilter";

function Packages() {

    const categories = [
        "🏖 Beach",
        "🏔 Mountains",
        "🌆 City",
        "🧭 Adventure",
        "🌿 Nature",
        "✨ Luxury"
    ];

    return (

        <div className="min-h-screen bg-slate-50">

            {/* Hero */}

            <section className="bg-gradient-to-r from-blue-700 to-sky-500 text-white">

                <div className="max-w-7xl mx-auto px-6 py-24">

                    <h1 className="text-5xl font-bold mb-5">

                        Explore Amazing Holiday Packages

                    </h1>

                    <p className="text-lg md:text-xl max-w-2xl">

                        Discover breathtaking destinations, unforgettable experiences,
                        and perfectly crafted tour packages for your next vacation.

                    </p>

                    <button
                        className="mt-8 bg-orange-500 hover:bg-orange-600 transition px-8 py-4 rounded-full font-semibold">

                        Explore Packages

                    </button>

                </div>

            </section>

            {/* Categories */}

            <section className="max-w-7xl mx-auto px-6 mt-14">

                <h2 className="text-3xl font-bold text-gray-800">

                    Popular Categories

                </h2>

                <div className="flex flex-wrap gap-4 mt-8">

                    {categories.map((item) => (

                        <button
                            key={item}
                            className="bg-white shadow-md rounded-full px-6 py-3 hover:bg-blue-600 hover:text-white transition">

                            {item}

                        </button>

                    ))}

                </div>

            </section>

            {/* Filters */}

            <div className="max-w-7xl mx-auto px-6">

                <PackageFilter />

            </div>

            {/* Packages */}

            <section className="max-w-7xl mx-auto px-6 py-16">

                <h2 className="text-3xl font-bold text-gray-800 mb-10">

                    Popular Tour Packages

                </h2>

                <div
                    className="bg-white rounded-2xl shadow-lg p-16 text-center">

                    <h3 className="text-2xl font-semibold text-gray-700">

                        Tour Package Cards Coming Soon

                    </h3>

                    <p className="text-gray-500 mt-3">

                        Phase 2 will display beautiful travel package cards here.

                    </p>

                </div>

            </section>

        </div>

    );

}

export default Packages;