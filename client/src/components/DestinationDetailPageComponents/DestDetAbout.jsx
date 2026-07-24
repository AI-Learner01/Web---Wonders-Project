import React from "react";
import DestDetHowToGetThere from "./DestDetHowToGetThere";
import DestDetWhereToStay from "./DestDetWhereToStay";

const DestDetAbout = ({aboutText}) => {

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
                <h2 className="mb-4 text-5xl font-bold">About</h2>

                {/* Render the newly beautified text here */}
                <div className="mt-10 about-content">
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