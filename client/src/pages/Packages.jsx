import PackageFilter from "../components/PackageFilter";
import packages from "../data/packages";
import PackageCard from "../components/PackageCard";
import { motion } from "framer-motion";

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

            <section
                className="relative h-[500px] bg-cover bg-center"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600')",
                }}
            >
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/55"></div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative max-w-7xl mx-auto px-6 h-full flex flex-col justify-center"
                >
                    <span className="bg-orange-500 text-white px-5 py-2 rounded-full w-fit font-semibold mb-5">
                        🌍 Explore the World
                    </span>

                    <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight max-w-3xl">
                        Discover Your Next Dream Vacation
                    </h1>

                    <p className="text-gray-200 text-lg mt-6 max-w-2xl">
                        Choose from carefully curated holiday packages designed to create unforgettable travel experiences.
                    </p>

                    <button className="mt-8 bg-blue-600 hover:bg-blue-700 transition px-8 py-4 rounded-full font-semibold text-white w-fit">
                        Explore Packages
                    </button>

                </motion.div>

                <div className="mt-8 bg-white rounded-2xl shadow-xl p-3 flex flex-col md:flex-row gap-3 max-w-3xl">

                    <input
                        type="text"
                        placeholder="Search destinations (e.g. Goa, Bali, Kashmir)"
                        className="flex-1 px-4 py-3 rounded-xl outline-none text-gray-700"
                    />

                    <button
                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition"
                    >
                        Search
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

                        <motion.button
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.96 }}
                            key={item}
                            className="bg-white shadow-md rounded-full px-6 py-3 hover:bg-gradient-to-r hover:from-blue-600 hover:to-sky-500 hover:text-white transition">

                            {item}

                        </motion.button>

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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                    {packages.map((item) => (
                        <PackageCard
                            key={item.id}
                            packageData={item}
                        />
                    ))}

                </div>


            </section>

        </div>

    );

}

export default Packages;