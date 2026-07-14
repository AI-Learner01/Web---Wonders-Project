import React from 'react'
import { useNavigate } from "react-router-dom";

const DestinationCard = ({
    slug,
    name,
    country,
    description,
    image,
    rating,
    featured,
}) => {

    const navigate = useNavigate();
    return (
        <>
            {/* destination card */}
            <div class="min-w-[280px] max-w-[280px] rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300 flex flex-col">
                {/* Top part is image  */}

                <div className="relative">
                    <img
                        src={image}
                        alt={name}
                        className="h-42 w-full object-cover"
                    />

                    <div className="absolute top-3 left-3 flex items-center gap-1 rounded-full bg-white/95 px-3 py-1 text-sm font-semibold shadow">
                        ⭐ {rating}
                    </div>
                </div>
                {/* description part */}
                <div className='flex flex-col flex-1 p-4 text-center'>
                    {featured && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-sky-100 px-2 py-1 text-xs font-semibold text-sky-700">
                            ⚡ Trending
                        </span>
                    )}

                    <div className="mt-4 space-y-2">
                        <div id="name" className="font-bold text-xl mb-2">{name}</div>
                        <div id="country" className="font-semibold text-lg">{country}</div>
                        <p id="description" className="text-gray-600 leading-relaxed text-md font-medium mt-2">
                            {description}
                        </p>
                    </div>
                </div>
                <div className="flex justify-center mt-auto pt-4 pb-5">
                    <button 
                    onClick={() => navigate(`/destinations/${slug}`)}
                    className="group mt-2 mb-4 cursor-pointer flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-600">
                        <span>Explore</span>

                        <svg
                            className="w-6 h-6 transition-transform duration-300 group-hover:rotate-30"
                            viewBox="0 0 25 25"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M9 8.5H16.5V16"
                                stroke="white"
                                strokeWidth="1.8"
                            />
                            <path
                                d="M16.5 8.5L7 18"
                                stroke="white"
                                strokeWidth="1.8"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </>
    )
}

export default DestinationCard
