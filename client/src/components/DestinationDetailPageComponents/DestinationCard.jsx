import React from 'react'
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
const DestinationCard = ({
    slug,
    name,
    country,
    description,
    image: initialImage,
    rating,
    featured,
}) => {

    const navigate = useNavigate();

    // 1. Check if the incoming image is a "lorem ipsum" placeholder
    const isPlaceholder = initialImage && initialImage.includes("picsum.photos");

    // 2. If it's a placeholder, start with 'null' (no image). Otherwise, use the real image.
    const [cardImage, setCardImage] = useState(isPlaceholder ? null : initialImage);

    // 3. Create a reference to track when the card scrolls into view
    const cardRef = useRef(null);

    useEffect(() => {
        // If we already have a real image, we don't need to do any lazy fetching!
        if (!isPlaceholder) return;

        // 4. Set up the Intersection Observer
        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;

                // When the card enters the screen...
                if (entry.isIntersecting) {
                    const fetchWikiImage = async () => {
                        try {
                            const res = await fetch(`http://localhost:5000/api/destinations/info?name=${name}`);
                            const apiData = await res.json();

                            if (apiData.success) {
                                // 1. Try heroImage (from your DB or Unsplash)
                                // 2. Try thumbnail (from Wikipedia)
                                // 3. Ultimate fallback image so it never gets stuck loading
                                const finalImage = apiData.data.heroImage || apiData.data.thumbnail || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800";
                                setCardImage(finalImage);
                            } else {
                                // If the API fails to find the location at all, use the fallback
                                setCardImage("https://images.unsplash.com/photo-1469854523086-cc02fe5d8800");
                            }
                        } catch (error) {
                            console.error(`Error fetching Wiki image for ${name}:`, error);
                            setCardImage("https://images.unsplash.com/photo-1469854523086-cc02fe5d8800");
                        }
                    };

                    fetchWikiImage();

                    // Disconnect the observer so it only fetches once
                    observer.disconnect();
                }
            },
            { threshold: 0.1 } // Triggers when 10% of the card is visible
        );

        // Start observing the card
        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        // Cleanup observer on unmount
        return () => {
            if (cardRef.current) observer.unobserve(cardRef.current);
        };
    }, [isPlaceholder, name]);


    return (
        <div ref={cardRef} className="min-w-[280px] max-w-[280px] rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300 flex flex-col">
            {/* Top part is image */}
            <div className="relative bg-gray-200" style={{ height: "180px" }}>
                {cardImage ? (
                    <img
                        src={cardImage}
                        alt={name}
                        loading="lazy" // Native browser lazy loading as a fallback
                        className="h-full w-full object-cover transition-opacity duration-500"
                    />
                ) : (
                    // Show a skeleton loader instead of picsum.photos
                    <div className="flex h-full w-full animate-pulse items-center justify-center bg-slate-200">
                        <span className="text-sm font-medium text-slate-400">Loading image...</span>
                    </div>
                )}

                <div className="absolute top-3 left-3 flex items-center gap-1 rounded-full bg-white/95 px-3 py-1 text-sm font-semibold shadow">
                    ⭐ {rating}
                </div>
            </div>

            {/* description part */}
            <div className='flex flex-col flex-1 p-4 text-center'>
                {featured && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-sky-100 px-2 py-1 text-xs font-semibold text-sky-700">
                        🔥 Trending
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
                        className="w-6 h-6 transition-transform duration-300 group-hover:rotate-45"
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
    )
}

export default DestinationCard
