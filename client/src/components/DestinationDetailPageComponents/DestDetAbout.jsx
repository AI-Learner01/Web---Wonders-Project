import React from "react";
import DestDetHowToGetThere from "./DestDetHowToGetThere";
import DestDetWhereToStay from "./DestDetWhereToStay";

const DestDetAbout = () => {
    return (
        <>
            <div className="rounded-2xl bg-white p-8 shadow">
                <h2 className="mb-4 text-3xl font-bold">About</h2>

                <p className="leading-8 text-gray-600">
                    Destination information will appear here once connected to the API.
                </p>
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