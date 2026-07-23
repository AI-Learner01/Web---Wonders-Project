import React, { useState, useRef, useEffect, lazy, Suspense } from 'react'
import { useNavigate } from 'react-router-dom';
import { images } from '../../data-destination/imageUrls';
import { destinations } from "../../data-destination/destinations"
import DestinationCard from "../../components/DestinationDetailPageComponents/DestinationCard"

const Destinations = () => {
    const navigate = useNavigate();
    // Explore All Destinations filters
    const [selectedContinent, setSelectedContinent] = useState("All");
    
    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(8);

    //Autocomplete Suggestion
    const [suggestions, setSuggestions] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);

    // Stores values entered in hero search form
    const [searchQuery, setSearchQuery] = useState({
        destination: '',
        date: '',
        guests: '1 Guest'
    });

    useEffect(() => {
        const fetchSuggestions = async () => {
            const term = searchQuery.destination.trim();

            if (term.length < 2) {
                setSuggestions([])
                return;
            }
            try {
                const res = await fetch(`http://localhost:5000/api/destinations/autocomplete?q=${term}`);
                if (!res.ok) throw new Error("API network error");
                const data = await res.json();
                setSuggestions(data);
            }

            catch (err) {
                console.warn("Backend API unavailable, falling back to local dataset matching...", err);
                const localFallback = destinations.filter(d =>
                    d.name.toLowerCase().startsWith(term.toLowerCase()) ||
                    d.country.toLowerCase().startsWith(term.toLowerCase())
                ).map(d => ({ name: d.name, country: d.country }));
                setSuggestions(localFallback.slice(0, 6));
            }

        }
        // Debounce typing inputs to optimize resource processing rates
        const delayDebounce = setTimeout(() => {
            fetchSuggestions();
        }, 250);

        return () => clearTimeout(delayDebounce);
    }, [searchQuery.destination])

    // Closes popup list instantly if clicking outside the elements structure bounds
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        // mobile set only 4 cards per page
        if (window.innerWidth < 640) {
            setItemsPerPage(4);
        }
        // others set 8 cards per page
        else {
            setItemsPerPage(4);
        }
    }, []);

    // Reset to page 1 whenever the filter changes
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedContinent]);

    const continents = [
        "All",
        ...new Set(destinations.map((destination) => destination.continent))
    ]

    //Only show featured dest in slider 
    const featuredDestinations = destinations.filter(
        (destination) => destination.featured
    );


    // Reference to the horizontal slider
    const sliderRef = useRef(null);

    // Scroll cards towards left
    const scrollLeft = () => {
        sliderRef.current.scrollBy({
            left: -320,
            behavior: "smooth",
        });
    };

    // Scroll cards towards right
    const scrollRight = () => {
        sliderRef.current.scrollBy({
            left: 320,
            behavior: "smooth",
        });
    };



    const handleSearch = (e) => {
        e.preventDefault();
        console.log('Searching for:', searchQuery);

        //Navigate the user dynamically!
        if (searchQuery.destination.trim()) {
            // Convert to a slug format (e.g., "New York" becomes "new-york")
            const searchSlug = searchQuery.destination
                .trim()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, "") // Remove accent characters
                .toLowerCase()
                .replace(/\s+/g, '-'); // Replace spaces with hyphens

            // Navigate to the dynamic route you set up in App.jsx / DestApp.jsx
            navigate(`/destinations/${searchSlug}`);
        }
    };

    const filteredDestinations = destinations.filter((destination) => {

        if (destination.featured) return false;

        return selectedContinent === "All" || destination.continent === selectedContinent;
    });


    // --- PAGINATION LOGIC ---
    const indexOfLastItem = currentPage * itemsPerPage; //Finds EndPoit of that page
    const indexOfFirstItem = indexOfLastItem - itemsPerPage; //Finding Start Point
    const currentDestinations = filteredDestinations.slice(indexOfFirstItem, indexOfLastItem); //Slicing the array 
    const totalPages = Math.ceil(filteredDestinations.length / itemsPerPage);// Calculating Total Pages

    return (
        <>

            {/* Hero Section */}
            <section className='relative h-screen min-h-[600px] w-full bg-cover bg-center bg-no-repeat' style={{ backgroundImage: `url(${images.hero.destinations})` }}>
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-black/10 to-transparent" />
                <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-center px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl text-left text-white mb-10">
                        <span className="inline-block rounded-full bg-black/50 px-4 py-1.5 text-sm font-semibold tracking-wide uppercase backdrop-blur-sm mb-4">
                            Plan Your Next Escape
                        </span>
                        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                            Explore the World's <span className="text-[#3C6300]">Hidden Gems</span>
                        </h1>
                        <br /><br />
                        <div className="inline-block max-w-2xl rounded-full border border-white/10 bg-black/50 px-6 py-3 text-[18px] text-gray backdrop-blur-[4px]">
                            <p className='brightness-150'>
                                Discover breathtaking destinations, curated local experiences, and exclusive travel deals tailored just for you.
                            </p>
                        </div>
                    </div>

                    {/* Search Widget Container */}
                    <div className="w-full max-w-5xl rounded-2xl bg-white p-4 shadow-2xl md:p-6 backdrop-blur-md bg-white/95">
                        <form onSubmit={handleSearch} className="grid grid-cols-1 gap-4 lg:grid-cols-4">

                            {/* Autocomplete Input Block */}
                            <div ref={dropdownRef} className="lg:col-span-3 flex flex-col justify-center border-b pb-2 lg:border-b-0 lg:border-r lg:pr-6 relative">
                                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
                                    Where to?
                                </label>
                                <input
                                    type="text"
                                    placeholder="Country, city, or resort"
                                    value={searchQuery.destination}
                                    onChange={(e) => {
                                        setSearchQuery({ ...searchQuery, destination: e.target.value });
                                        setShowDropdown(true);
                                    }}
                                    onFocus={() => setShowDropdown(true)}
                                    className="w-full bg-transparent py-1 text-lg text-gray-800 placeholder-gray-400 focus:outline-none"
                                    required
                                    autoComplete="off"
                                />

                                {/* Interactive Suggestions Dropdown List overlay menu */}
                                {showDropdown && suggestions.length > 0 && (
                                    <ul className="absolute left-0 top-[105%] z-50 mt-1 w-full max-h-60 overflow-y-auto rounded-xl bg-white p-2 shadow-2xl border border-gray-100 transition-all duration-200">
                                        {suggestions.map((place, idx) => (
                                            <li
                                                key={idx}
                                                onClick={() => {
                                                    setSearchQuery({ ...searchQuery, destination: place.name });
                                                    setShowDropdown(false);
                                                }}
                                                className="cursor-pointer rounded-lg px-4 py-2.5 text-left text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition font-medium flex justify-between items-center"
                                            >
                                                <span className="font-semibold text-gray-800">{place.name}</span>
                                                <span className="text-xs font-semibold uppercase bg-gray-100 text-gray-400 px-2 py-0.5 rounded-md">{place.country}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            {/* Search Submission Buttons */}
                            <div className="lg:col-span-1 flex items-center">
                                <button
                                    type="submit"
                                    className="w-full rounded-xl bg-emerald-500 py-4 px-6 font-semibold text-white transition duration-200 hover:bg-emerald-600 cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 lg:h-full text-xl"
                                >
                                    Search
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
            {/* Heroes Section ends */}

            {/* ---------------------------------------------- */}


            {/* Popular destination */}
            <section className="py-16 bg-slate-200 relative overflow-hidden">

                {/* Optional: Add a subtle color blob behind the text to make the glass effect visible on the light background */}
                <div className="absolute top-10 left-10 w-64 h-64 bg-gray-500/70 rounded-full mix-blend-multiply filter blur-3xl opacity-90 animate-pulse"></div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    {/*Section Heading + Slider*/}
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-6">

                        {/* --- GLASSMORPHISM TEXT AREA --- */}
                        <div className="backdrop-blur-xl bg-white/40 border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.06)] rounded-3xl py-5 px-8 inline-block">
                            <h2 className="text-4xl font-extrabold text-slate-800 tracking-tight">
                                Popular Destinations
                            </h2>
                            <p className="text-slate-600 mt-2 font-medium">
                                Explore our handpicked destinations around the globe.
                            </p>
                        </div>


                        {/* Left & Right Navigation Buttons */}
                        <div className="flex justify-center items-center gap-3">

                            <button
                                onClick={scrollLeft}
                                className="h-12 w-12 rounded-full bg-white shadow hover:bg-emerald-500 hover:text-white transition cursor-pointer"
                            >
                                ←
                            </button>

                            <button
                                onClick={scrollRight}
                                className="h-12 w-12 rounded-full bg-white shadow hover:bg-emerald-500 hover:text-white transition cursor-pointer"
                            >
                                →
                            </button>

                        </div>

                    </div>


                    {/* Horizontal Destination Cards Slider */}
                    <div
                        className="rounded-3xl bg-gradient-to-br from-slate-100 via-white to-slate-200 p-6 shadow-[20px_20px_45px_#d6dae0,-20px_-20px_45px_#ffffff]"
                    >
                        <div
                            ref={sliderRef}
                            className="flex gap-8 overflow-x-auto overflow-y-hidden scroll-smooth no-scrollbar pb-3"
                        >

                            {/* Render each destination card */}
                            {featuredDestinations.map((destination) => (
                                <DestinationCard
                                    key={destination.id}
                                    {...destination}
                                />
                            ))}
                        </div>
                    </div>

                </div>

            </section>

            {/* -------------------------------------------------- */}


            {/* Explore all destinations */}
            <section className="py-20 bg-white">

                <div className="max-w-7xl mx-auto px-6">

                    {/* Heading */}

                    <div className="text-center mb-10">

                        <h2 className="text-4xl font-bold">
                            Explore All Destinations
                        </h2>

                        <p className="mt-3 text-gray-500 text-lg">
                            Discover breathtaking places across every continent.
                        </p>

                    </div>

                    {/* Filters - Tab Style */}
                    <div className="border-b border-gray-400 mb-12">
                        <div className="flex overflow-x-auto no-scrollbar gap-8">
                            {continents.map((continent) => (
                                <button
                                    key={continent}
                                    onClick={() => setSelectedContinent(continent)}
                                    className={`pb-4 text-lg font-medium whitespace-nowrap transition-colors duration-200 border-b-2 focus:outline-none cursor-pointer ${selectedContinent === continent
                                            ? "border-emerald-500 text-emerald-600"
                                            : "border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-500 transition-1"
                                        }`}
                                >
                                    {continent}
                                </button>
                            ))}
                        </div>
                    </div>


                    {/* Destination Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {currentDestinations.map((destination) => (
                            <DestinationCard
                                key={destination.id}
                                {...destination}
                            />
                        ))}
                    </div>

                   {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-2 mt-12">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium cursor-pointer"
                            >
                                Prev
                            </button>
                            
                            {[...Array(totalPages)].map((_, index) => (
                                <button
                                    key={index + 1}
                                    onClick={() => setCurrentPage(index + 1)}
                                    className={`w-10 h-10 rounded-lg font-medium transition-colors cursor-pointer ${
                                        currentPage === index + 1
                                            ? "bg-emerald-500 text-white shadow-md border-transparent"
                                            : "border border-gray-200 text-gray-600 hover:bg-emerald-50 hover:text-emerald-600"
                                    }`}
                                >
                                    {index + 1}
                                </button>
                            ))}

                            <button
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium cursor-pointer"
                            >
                                Next
                            </button>
                        </div>
                    )}

                </div>

            </section>
        </>
    )
}


export default Destinations
