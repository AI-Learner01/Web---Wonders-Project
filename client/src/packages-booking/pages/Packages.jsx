import PackageFilter from "../components/PackageFilter";
import packages from "../data/packages";
import PackageCard from "../components/PackageCard";
import { motion } from "framer-motion";
import { images } from "../data/imageUrls";
import Navbar from "../../homepage/Navbar";

function Packages({ onBookNow }) {

    const categories = [
        "🏖 Beach",
        "🏔 Mountains",
        "🌆 City",
        "🧭 Adventure",
        "🌿 Nature",
        "✨ Luxury"
    ];

    return (
        <>
        {/* <Navbar/> */}
        <div className="min-h-screen bg-slate-50">

            {/* Hero */}

            <section
                className="relative min-h-[500px] md:h-[650px] bg-cover bg-center"
                style={{
                    backgroundImage: `url(${images.hero.destinations})`,
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

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-3xl">
                        Discover Your Next Dream Vacation
                    </h1>

                    <p className="text-gray-200 text-lg mt-6 max-w-2xl">
                        Choose from carefully curated holiday packages designed to create unforgettable travel experiences.
                    </p>

                    <button className="mt-8 bg-blue-600 hover:bg-blue-700 transition px-8 py-4 rounded-full font-semibold text-white w-fit">
                        Explore Packages
                    </button>

                </motion.div>


            </section>

            <section className="relative z-20 -mt-12">

                <div className="max-w-5xl mx-auto px-6">

                    <div className="bg-white rounded-2xl shadow-2xl p-4 flex flex-col md:flex-row gap-4">

                        <input
                            type="text"
                            placeholder="Search destinations (e.g. Goa, Bali, Kashmir)"
                            className="flex-1 px-5 py-4 rounded-xl border border-gray-200 outline-none focus:border-blue-500"
                        />

                        <button
                            className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-xl font-semibold transition"
                        >
                            Search
                        </button>

                    </div>

                </div>

            </section>

            {/* Categories */}

            <section className="max-w-7xl mx-auto px-6 mt-8">

                <h2 className="text-3xl font-bold text-gray-800">

                    Popular Categories

                </h2>

                <div className="flex flex-wrap gap-4 mt-8">

                    {categories.map((item) => (

                        <motion.button
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.96 }}
                            key={item}
                            className="bg-white rounded-full px-6 py-3 shadow-md hover:bg-blue-500 hover:text-white transition-all duration-300">

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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">

                    {packages.map((item) => (
                        <PackageCard
                            key={item.id}
                            packageData={item}
                            onBookNow={onBookNow}
                        />
                    ))}

                </div>


            </section>

        </div>
        </>

    );

}

export default Packages;