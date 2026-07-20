import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { images } from '../../data-destination/imageUrls';
import DestinationCard from '../../components/DestinationDetailPageComponents/DestinationCard';
import { destinations } from "../../data-destination/destinations"

const Destinations = () => {
    const navigate = useNavigate();
    // Explore All Destinations filters
    const [selectedContinent, setSelectedContinent] = useState("All");
    const [selectedRating, setSelectedRating] = useState("All");
    const [visibleCards, setVisibleCards] = useState(8);

    useEffect(() => {
        //mobile set only 4 cards
        if (window.innerWidth < 640) {
            setVisibleCards(4)
        } 
        // others set 8 cards
        else {
            setVisibleCards(8)
        }
    }, [])

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

    // Stores values entered in hero search form
    const [searchQuery, setSearchQuery] = useState({
        destination: '',
        date: '',
        guests: '1 Guest'
    });

    const handleSearch = (e) => {
        e.preventDefault();
        console.log('Searching for:', searchQuery);
        
        //Navigate the user dynamically!
        if (searchQuery.destination.trim()) {
            // Convert to a slug format (e.g., "New York" becomes "new-york")
            const searchSlug = searchQuery.destination.trim().toLowerCase().replace(/\s+/g, '-');
            
            // Navigate to the dynamic route you set up in App.jsx / DestApp.jsx
            navigate(`/destinations/${searchSlug}`);
        }
    };

    const filteredDestinations = destinations.filter((destination) => {

        if (destination.featured) return false;

        const continentMatch =
            selectedContinent === "All" ||
            destination.continent === selectedContinent;

        const ratingMatch =
            selectedRating === "All" ||
            destination.rating >= Number(selectedRating);

        return continentMatch && ratingMatch;
    });


    return (
        <>

            {/* hero section */}
            <section className='relative h-screen min-h-[600px] w-full bg-cover bg-center bg-no-repeat' style={{ backgroundImage: `url(${images.hero.destinations})` }}>

                {/* Light dark overlay for writing text */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-black/10 to-transparent" />

                {/* hero content contianer */}
                <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-center px-4 sm:px-6 lg:px-8">

                    {/* Main Heading */}
                    <div className="max-w-3xl text-left text-white mb-10">

                        <span className="inline-block rounded-full bg-black/50 px-4 py-1.5 text-sm font-semibold tracking-wide uppercase backdrop-blur-sm mb-4">
                            Plan Your Next Escape
                        </span>

                        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                            Explore the World's <span className="text-[#3C6300]">Hidden Gems</span>
                        </h1>

                        <br />
                        <br />

                        <div className="inline-block max-w-2xl rounded-full border border-white/10 bg-black/50 px-6 py-3 text-[18px] text-gray backdrop-blur-[4px]">
                            <p className='brightness-150'>
                                Discover breathtaking destinations, curated local experiences,
                                and exclusive travel deals tailored just for you.
                            </p>
                        </div>

                    </div>

                    {/* Hero search Widget */}
                    <div className="w-full max-w-5xl rounded-2xl bg-white p-4 shadow-2xl md:p-6 backdrop-blur-md bg-white/95">

                        <form
                            onSubmit={handleSearch}
                            className="grid grid-cols-1 gap-4 lg:grid-cols-4">

                            {/* Destination Input */}
                            <div className="lg:col-span-3 flex flex-col justify-center border-b pb-2 lg:border-b-0 lg:border-r lg:pr-6">

                                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
                                    📍 Where to?
                                </label>

                                <input
                                    type="text"
                                    placeholder="Country, city, or resort"
                                    value={searchQuery.destination}
                                    onChange={(e) => setSearchQuery({ ...searchQuery, destination: e.target.value })}
                                    className="w-full bg-transparent py-1 text-lg text-gray-800 placeholder-gray-400 focus:outline-none"
                                    required
                                />

                            </div>

                            {/* Search Button */}
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
            <section className="py-16 bg-gray-50">

                <div className="max-w-7xl mx-auto px-6">

                    {/*Seaction Heading + SLider*/}
                    <div className="flex items-center justify-between mb-8">

                        <div>
                            <h2 className="text-4xl font-bold">
                                Popular Destinations
                            </h2>

                            <p className="text-gray-500 mt-2">
                                Explore our handpicked destinations around the globe.
                            </p>
                        </div>


                        {/* Left & Right Navigation Buttons */}
                        <div className="flex gap-3">

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

                    {/* Filters */}

                    <div className="flex flex-wrap justify-center gap-4 mb-12">

                        {/* Continent */}

                        <select
                            value={selectedContinent}
                            onChange={(e) => setSelectedContinent(e.target.value)}
                            className="rounded-full border px-5 py-3 shadow-sm cursor-pointer"
                        >
                            {
                                continents.map((continent) => (
                                    <option key = {continent} value={continent}>
                                        {continent}
                                    </option>
                                ))
                            }
                        </select>

                        {/* Rating */}

                        <select
                            value={selectedRating}
                            onChange={(e) => setSelectedRating(e.target.value)}
                            className="rounded-full border px-5 py-3 shadow-sm cursor-pointer"
                        >
                            <option value="All">All Ratings</option>
                            <option value="4.5">4.5+</option>
                            <option value="4.7">4.7+</option>
                            <option value="4.8">4.8+</option>
                            <option value="4.9">4.9</option>
                        </select>

                    </div>

                    {/* Destination Grid */}

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

                        {filteredDestinations
                            .slice(0, Math.min(visibleCards, 16))
                            .map((destination) => (

                                <DestinationCard
                                    key={destination.id}
                                    {...destination}
                                />

                            ))}

                    </div>

                    {/* Load More */}

                    {visibleCards < Math.min(filteredDestinations.length, 16) && (

                        <div className="flex justify-center mt-12">

                            <button
                                onClick={() => setVisibleCards((prev) => prev+4)}
                                className="rounded-full bg-emerald-500 px-8 py-4 text-white font-semibold hover:bg-emerald-600 transition cursor-pointer"
                            >
                                Load More ↓
                            </button>

                        </div>

                    )}

                </div>

            </section>
        </>
    )
}


export default Destinations
