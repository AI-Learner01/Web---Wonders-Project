import React from "react";
import { useState, useEffect } from "react";
import DestDetHowToGetThere from "./DestDetHowToGetThere";
import DestDetWhereToStay from "./DestDetWhereToStay";
import { FaMapMarkerAlt } from "react-icons/fa";

const DestDetAbout = ({aboutText, locationName}) => {

    // States for Attractions
    const [attractions, setAttractions] = useState([]);
    const [loadingAttractions, setLoadingAttractions] = useState(true);

    // Fetch Attractions
    useEffect(() => {
        if (!locationName) return;

        const fetchAttractions = async () => {
            setLoadingAttractions(true);
            try {
                const response = await fetch(`http://localhost:5000/api/destinations/attractions?name=${encodeURIComponent(locationName)}`);
                const result = await response.json();
                if (result.success) {
                    setAttractions(result.data);
                }
            } catch (err) {
                console.error("Failed to fetch attractions:", err);
            } finally {
                setLoadingAttractions(false);
            }
        };

        fetchAttractions();
    }, [locationName]);

    // Helper function to clean and beautify Wikipedia text
    const formatText = (text) => {
        if (!text) return <p>Destination information is currently unavailable.</p>;
        
        // 1. Remove messy Wikipedia pronunciations and parenthetical clutter
        const cleanText = text.replace(/\s*\([^)]*\)/g, '');
        
        // 2. Split the raw text into an array of individual sentences
        const sentences = cleanText.match(/[^.!?]+[.!?]+/g) || [cleanText];
        
        // 3. Group every 3 sentences together to form proper paragraphs
        const paragraphs = [];
        for (let i = 0; i < sentences.length; i += 3) {
            paragraphs.push(sentences.slice(i, i + 3).join(' ').trim());
        }

        // 4. Map them into beautiful HTML paragraphs
        return paragraphs.map((para, index) => (
            <p key={index} className="mb-5 leading-relaxed text-slate-800 text-[20px] text-left">
                {index === 0 ? (
                    // Add a beautiful "Drop Cap" to the first letter of the first paragraph
                    <span className="float-left mr-2 mt-1 text-4xl font-extrabold text-emerald-700 leading-none">
                        {para.charAt(0)}
                    </span>
                ) : null}
                {index === 0 ? para.slice(1) : para}
            </p>
        ));
    };


    return (

        <>
            <div className="rounded-2xl bg-white p-8 shadow">
                
                {/* --- ATTRACTIONS SECTION --- */}
                <div className="mb-10">
                    <h2 className="mb-6 text-4xl font-bold">Top Attractions</h2>
                    {loadingAttractions ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="h-[90px] bg-slate-200 animate-pulse rounded-2xl"></div>
                            ))}
                        </div>
                    ) : attractions.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {attractions.map((place, idx) => (
                                <div key={idx} className="bg-emerald-50/50 border border-emerald-100 p-4 rounded-2xl flex items-start gap-3 hover:bg-emerald-50 transition-colors">
                                    <FaMapMarkerAlt className="text-emerald-500 mt-1 flex-shrink-0 text-xl" />
                                    <div>
                                        <h4 className="font-bold text-gray-800">{place.name}</h4>
                                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">{place.formattedAddress}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 italic bg-gray-50 p-4 rounded-xl border border-gray-100">
                            No specific attractions found for this location.
                        </p>
                    )}
                </div>
                
                <hr className="border-gray-200 mb-10" />

                {/* --- ABOUT SECTION --- */}
                <h2 className="mb-4 text-4xl font-bold">About {locationName}</h2>
                <div className="mt-8 about-content">
                    {formatText(aboutText)}
                </div>
            </div>



            {/* Temp how to get there ... later replaced by api */}
            <DestDetHowToGetThere
                transport={[
                    {
                        type: "air",
                        title: "By Air",
                        description:
                            "The nearest international airport connects the destination with major cities worldwide."
                    },
                    {
                        type: "train",
                        title: "By Train",
                        description:
                            "Regular rail services are available from nearby metropolitan cities."
                    },
                    {
                        type: "road",
                        title: "By Road",
                        description:
                            "Well-connected highways make road trips comfortable and scenic."
                    }
                ]}
            />

            {/* Temp where to stay ... later replaced by api */}
            <DestDetWhereToStay
                stayOptions={[
                    {
                        type: "luxury",
                        title: "Luxury Resorts",
                        description: "Experience premium beachfront resorts with world-class amenities.",
                    },
                    {
                        type: "hotel",
                        title: "Hotels",
                        description: "Comfortable hotels offering modern facilities and excellent service.",
                    },
                    {
                        type: "homestay",
                        title: "Homestays",
                        description: "Stay with local hosts for an authentic cultural experience.",
                    },
                    {
                        type: "hostel",
                        title: "Hostels",
                        description: "Budget-friendly accommodation for backpackers and solo travellers.",
                    },
                    {
                        type: "villa",
                        title: "Private Villas",
                        description: "Enjoy privacy with luxury villas, pools, and scenic surroundings.",
                    },
                    {
                        type: "apartment",
                        title: "Serviced Apartments",
                        description: "Ideal for families and long stays with home-like comfort.",
                    },
                ]}
            />

        </>
    );
};

export default DestDetAbout;