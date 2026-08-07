import React from "react";

/**
 * this component provides information about the AuraAvenue platform, including its mission, offerings, and reasons to choose it. It also includes a navigation button to the admin panel.
 * @returns JSX Element representing the About section of the platform
 */


const loginBg = "https://res.cloudinary.com/xzjjff1k/image/upload/f_auto,q_auto,w_1920/v1784311631/login-bg_our3np.jpg";

function About() {
    return (
        <div 
            className="min-h-screen bg-cover bg-center bg-no-repeat py-12 px-6 flex items-center justify-center"
            style={{ backgroundImage: `url(${loginBg})` }}
        >
            <div className="max-w-5xl w-full bg-white/95 backdrop-blur-sm shadow-xl rounded-2xl p-8 md:p-10 border border-gray-100">

                {/* Top Header Row with Title and Admin Button */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 pb-4 border-b border-gray-100">
                    <h1 className="text-3xl sm:text-4xl font-bold text-blue-700">
                        About AuraAvenue
                    </h1>
                </div>

                <p className="text-gray-700 text-lg leading-8 text-center mb-10 max-w-3xl mx-auto">
                    AuraAvenue is a modern travel and tourism platform designed to help travelers
                    discover breathtaking destinations, plan memorable journeys, and explore
                    new experiences with ease. Our mission is to make travel planning simple,
                    reliable, and enjoyable for everyone.
                </p>

                <div className="grid md:grid-cols-2 gap-8">

                    {/* Mission Card */}
                    <div className="bg-blue-50/80 p-6 rounded-xl border border-blue-100 shadow-sm hover:shadow-md transition">
                        <h2 className="text-2xl font-semibold text-blue-700 mb-3 flex items-center gap-2">
                            <span>🌍</span> Our Mission
                        </h2>

                        <p className="text-gray-700 leading-relaxed">
                            We aim to inspire people to travel with confidence by
                            providing accurate destination information, beautiful
                            locations, and an easy-to-use platform.
                        </p>
                    </div>

                    {/* What We Offer Card */}
                    <div className="bg-green-50/80 p-6 rounded-xl border border-green-100 shadow-sm hover:shadow-md transition">
                        <h2 className="text-2xl font-semibold text-green-700 mb-3 flex items-center gap-2">
                            <span>✈️</span> What We Offer
                        </h2>

                        <ul className="list-disc ml-5 text-gray-700 space-y-2">
                            <li>Popular tourist destinations</li>
                            <li>Travel guides and recommendations</li>
                            <li>Beautiful destination galleries</li>
                            <li>Easy contact and support</li>
                            <li>User-friendly experience</li>
                        </ul>
                    </div>

                </div>

                {/* Why Choose Us Card */}
                <div className="mt-8 bg-amber-50/80 p-6 rounded-xl border border-amber-100 shadow-sm hover:shadow-md transition">
                    <h2 className="text-2xl font-semibold text-amber-700 mb-3 flex items-center gap-2">
                        <span>💡</span> Why Choose AuraAvenue?
                    </h2>

                    <p className="text-gray-700 leading-7">
                        AuraAvenue provides carefully curated destinations, travel recommendations,
                        and a seamless experience to help every traveler create unforgettable
                        memories, whether it's a weekend getaway or an international adventure.
                    </p>
                </div>

            </div>
        </div>
    );
}

export default About;