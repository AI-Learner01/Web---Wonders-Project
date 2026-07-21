import React from "react";
const loginBg = "https://res.cloudinary.com/xzjjff1k/image/upload/f_auto,q_auto,w_1920/v1784311631/login-bg_our3np.jpg";

function About() {
    return (
        <div className="min-h-screen bg-slate-100 py-12 px-6"
            style={{ backgroundImage: `url(${loginBg})` }}>
            <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-8">

                <h1 className="text-4xl font-bold text-center text-blue-700 mb-6">
                    About AuraAvenue
                </h1>

                <p className="text-gray-700 text-lg leading-8 text-center mb-10">
                    AuraAvenue is a modern travel and tourism platform designed to help travelers
                    discover breathtaking destinations, plan memorable journeys, and explore
                    new experiences with ease. Our mission is to make travel planning simple,
                    reliable, and enjoyable for everyone.
                </p>

                <div className="grid md:grid-cols-2 gap-8">

                    <div className="bg-blue-50 p-6 rounded-xl shadow">
                        <h2 className="text-2xl font-semibold text-blue-700 mb-3">
                            🌍 Our Mission
                        </h2>

                        <p className="text-gray-700">
                            We aim to inspire people to travel with confidence by
                            providing accurate destination information, beautiful
                            locations, and an easy-to-use platform.
                        </p>
                    </div>

                    <div className="bg-green-50 p-6 rounded-xl shadow">
                        <h2 className="text-2xl font-semibold text-green-700 mb-3">
                            ✈️ What We Offer
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

                <div className="mt-10 bg-yellow-50 p-6 rounded-xl shadow">
                    <h2 className="text-2xl font-semibold text-yellow-700 mb-3">
                        💡 Why Choose AuraAvenue?
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