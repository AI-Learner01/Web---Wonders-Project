import { useState, useRef,useEffect } from "react";
import PackageFilter from "../components/PackageFilter";
import PackageSection from "../components/PackageSection";
import { motion } from "framer-motion";
import { images } from "../data/imageUrls";
import Navbar from "../../homepage/Navbar";

function Packages({ packages,loading,error,onRetry,onBookNow }) {
    // --- States ---
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [searchInput, setSearchInput] = useState("");
    const [appliedSearch, setAppliedSearch] = useState("");
    const [filters, setFilters] = useState({
        destination: "",
        budget: "",
        duration: "",
        category: ""
    });

    const packagesSectionRef = useRef(null);


    const categories = [
        "🏖 Beach",
        "🏔 Mountains",
        "🌆 City",
        "🧭 Adventure",
        "🌿 Nature",
        "✨ Luxury"
    ];

    // --- Helpers ---
    const getCategoryText = (catStr) => catStr.replace(/[^a-zA-Z]/g, '').trim();

    const scrollToPackages = () => {
        packagesSectionRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };

    // --- Handlers (Working Individually) ---

    // 1. When a Category Button is clicked
    const handleCategoryClick = (category) => {
        if (selectedCategory === category) {
            setSelectedCategory(null);
        } else {
            setSelectedCategory(category);
            // Reset Search and Dropdown Filters
            setAppliedSearch("");
            setSearchInput("");
            setFilters({ destination: "", budget: "", duration: "", category: "" });
            scrollToPackages();
        }
    };

    // 2. When the Search Bar is used
    const handleSearchClick = () => {
        if (!searchInput.trim()) return;
        setAppliedSearch(searchInput);
        // Reset Category Buttons and Dropdown Filters
        setSelectedCategory(null);
        setFilters({ destination: "", budget: "", duration: "", category: "" });
        scrollToPackages();
    };

    // 3. When a Dropdown Filter is changed
    const handleFilterChange = (filterName, value) => {
        setFilters((prev) => ({ ...prev, [filterName]: value }));
        // Reset Category Buttons and Search
        setSelectedCategory(null);
        setAppliedSearch("");
        setSearchInput("");
        scrollToPackages();
    };

    const clearAllFilters = () => {
        setSelectedCategory(null);
        setAppliedSearch("");
        setSearchInput("");
        setFilters({ destination: "", budget: "", duration: "", category: "" });
    };

    // --- Safe Filtering Logic ---
    const isFilteringActive =
        selectedCategory ||
        appliedSearch ||
        filters.destination ||
        filters.budget ||
        filters.duration ||
        filters.category;

    const filteredPackages = isFilteringActive
        ? packages.filter((pkg) => {
            // Safely cast to string to prevent crashes if data is an array or undefined
            const pkgTitle = String(pkg.title || "").toLowerCase();
            const pkgLocation = String(pkg.location || "").toLowerCase();
            const pkgPrice = Number(pkg.price) || 0;
            const pkgDurationDays = parseInt(String(pkg.duration || "0").match(/\d+/)?.[0] || "0", 10);

            // COMBINED CATEGORY AREA: Merges all possible tags into one string so `.includes()` never misses
            const categorySearchArea = String(
                (pkg.category || "") + " " +
                (pkg.theme || "") + " " +
                (pkg.tags || "") + " " +
                (pkg.type || "")
            ).toLowerCase();

            // 1. Quick Categories Pill
            if (selectedCategory) {
                const catText = getCategoryText(selectedCategory).toLowerCase();
                if (!categorySearchArea.includes(catText)) return false;
            }

            // 2. Search Bar
            if (appliedSearch) {
                const query = appliedSearch.toLowerCase();
                if (!pkgTitle.includes(query) && !pkgLocation.includes(query)) return false;
            }

            // 3. Dropdown Filters
            if (filters.destination && !pkgLocation.includes(filters.destination.toLowerCase())) return false;

            // Match Dropdown Category against our combined category string
            if (filters.category && !categorySearchArea.includes(filters.category.toLowerCase())) return false;

            if (filters.budget) {
                if (filters.budget === "10k-20k" && (pkgPrice < 10000 || pkgPrice > 20000)) return false;
                if (filters.budget === "20k-40k" && (pkgPrice <= 20000 || pkgPrice > 40000)) return false;
                if (filters.budget === "40k+" && pkgPrice <= 40000) return false;
            }

            if (filters.duration) {
                if (filters.duration === "1-3" && (pkgDurationDays < 1 || pkgDurationDays > 3)) return false;
                if (filters.duration === "4-6" && (pkgDurationDays < 4 || pkgDurationDays > 6)) return false;
                if (filters.duration === "7+" && pkgDurationDays < 7) return false;
            }

            return true;
        })
        : [];

    // --- Default Arrays ---
    const popularPackages = packages.filter((pkg) => pkg.badge === "Bestseller" || pkg.badge === "Popular" || pkg.badge === "Trending");
    const indiaPackages = packages.filter((pkg) => pkg.category === "India");
    const asiaPackages = packages.filter((pkg) => pkg.continent === "Asia" && pkg.category === "International");
    const worldPackages = packages.filter((pkg) => pkg.continent !== "Asia");

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero */}
            <section
                className="relative min-h-[500px] md:h-[650px] bg-cover bg-center"
                style={{ backgroundImage: `url(${images.hero.destinations})` }}
            >
                <div className="absolute inset-0 bg-black/55"></div>
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative max-w-7xl mx-auto px-6 h-full flex flex-col justify-center"
                >
                    <span className="bg-emerald-600 text-white px-5 py-2 rounded-full w-fit font-semibold mb-5 shadow-md">
                        🌍 Explore the World
                    </span>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-3xl">
                        Discover Your Next Dream Vacation
                    </h1>
                    <p className="text-gray-200 text-lg mt-6 max-w-2xl">
                        Choose from carefully curated holiday packages designed to create unforgettable travel experiences.
                    </p>
                    <button
                        onClick={scrollToPackages}
                        className="mt-8 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-4 rounded-full font-semibold text-white w-fit hover:scale-105"
>
                        Explore Packages
                    </button>
                </motion.div>
            </section>

            {/* Search Bar */}
            <section className="relative z-20 -mt-12">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl p-4 flex flex-col md:flex-row gap-4">
                        <input
                            type="text"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSearchClick()}
                            placeholder="Search destinations (e.g. Goa, Bali, Kashmir)"
                            className="flex-1 px-5 py-4 rounded-xl bg-white/30 backdrop-blur-md border border-white/40 placeholder:text-white/70 text-white outline-none focus:border-emerald-400"
                        />
                        <button
                            onClick={handleSearchClick}
                            className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 shadow-xl text-white px-10 py-4 rounded-xl font-semibold transition"
                        >
                            Search
                        </button>
                    </div>
                </div>
            </section>

            {/* Categories Pills */}
            <section className="max-w-7xl mx-auto px-6 mt-8">
                <h2 className="text-3xl font-bold text-gray-800">Popular Categories</h2>
                <div className="flex flex-wrap gap-4 mt-8">
                    {categories.map((item) => (
                        <motion.button
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.96 }}
                            key={item}
                            onClick={() => handleCategoryClick(item)}
                            className={`rounded-full px-6 py-3 shadow-md transition-all duration-300 ${selectedCategory === item
                                ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white"
                                : "bg-white/20 backdrop-blur-lg border border-white/30 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200"
                                }`}
                        >
                            {item}
                        </motion.button>
                    ))}
                </div>
            </section>

            {/* Dropdown Filters */}
            <div className="max-w-7xl mx-auto px-6">
                <PackageFilter filters={filters} onFilterChange={handleFilterChange} />
            </div>

            {loading && (
                <section className="max-w-7xl mx-auto px-6 py-16">
                    <div className="flex flex-col items-center justify-center py-24">

                        <div className="w-16 h-16 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin"></div>

                        <h2 className="mt-8 text-2xl font-semibold text-gray-700">
                            Loading Packages...
                        </h2>

                        <p className="mt-2 text-gray-500">
                            Please wait while we fetch the latest travel packages.
                        </p>

                    </div>
                </section>
            )}

            {!loading && error && (
    <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center shadow-sm">

            <div className="text-5xl mb-4">
                ⚠️
            </div>

            <h2 className="text-2xl font-bold text-red-700">
                Unable to Load Packages
            </h2>

            <p className="text-gray-600 mt-2">
                {error}
            </p>

            <button
                onClick={onRetry}
                className="mt-6 px-6 py-3 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 hover:underline font-medium"
            >
                Retry
            </button>

        </div>
    </section>
)}

            {/* Packages Display Section */}
            {!loading && !error && (
                <section ref={packagesSectionRef} className="max-w-7xl mx-auto px-6 py-16">
                    {isFilteringActive ? (
                        filteredPackages.length > 0 ? (
                            <PackageSection
                                title="Search Results"
                                packages={filteredPackages}
                                onBookNow={onBookNow}
                            />
                        ) : (
                            <div className="text-center py-12">
                                <h3 className="text-2xl font-semibold text-gray-600">
                                    No packages found matching your criteria.
                                </h3>
                                <button
                                    onClick={clearAllFilters}
                                    className="mt-4 text-blue-600 hover:underline"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        )
                    ) : (
                        <>
                            <PackageSection title="⭐ Popular Packages" packages={popularPackages} onBookNow={onBookNow} />
                            <PackageSection title="🇮🇳 India" packages={indiaPackages} onBookNow={onBookNow} />
                            <PackageSection title="🌏 Asia" packages={asiaPackages} onBookNow={onBookNow} />
                            <PackageSection title="🌍 World" packages={worldPackages} onBookNow={onBookNow} />
                        </>
                    )}
                </section>
            )}
        </div>
    );
}

export default Packages;