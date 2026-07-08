import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import herodest from '../assets/Images/herobgdest.jpg'
import SearchBar from '../components/SearchBar';
import { images } from '../data/imageUrls';

const Destinations = () => {
    const [searchQuery, setSearchQuery] = useState({
        destination: '',
        date: '',
        guests: '1 Guest'
    });

    const handleSearch = (e) => {
        e.preventDefault();
        console.log('Searching for:', searchQuery);
        // Integrate your routing or search API here
    };
    return (
        <>
            <Navbar />

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
                            Explore the World’s <span className="text-[#3C6300]">Hidden Gems</span>
                        </h1>
                        <br />
                        <br />
                        <div className="inline-block max-w-2xl rounded-full border border-white/10 bg-black/50 px-6 py-3 text-[18px] text-gray backdrop-blur-[4px]">
                            <p className='brightness-150'>Discover breathtaking destinations, curated local experiences, and exclusive travel deals tailored just for you.</p>
                        </div>
                    </div>

                    {/* Booking Filter Widget */}
                    <div className="w-full max-w-5xl rounded-2xl bg-white p-4 shadow-2xl md:p-6 backdrop-blur-md bg-white/95">
                        <form onSubmit={handleSearch} className="grid grid-cols-1 gap-4 lg:grid-cols-4">

                            {/* Destination Input */}
                            <div className="lg:col-span-3 flex flex-col justify-center border-b pb-2 lg:border-b-0 lg:border-r lg:pr-6">
                                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">📍 Where to?</label>
                                <input
                                    type="text"
                                    placeholder="Country, city, or resort"
                                    value={searchQuery.destination}
                                    onChange={(e) => setSearchQuery({ ...searchQuery, destination: e.target.value })}
                                    className="w-full bg-transparent py-1 text-lg text-gray-800 placeholder-gray-400 focus:outline-none"
                                    required
                                />
                            </div>

                            {/* Submit Action Button */}
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


            
            
        </>
    )
}
export default Destinations
