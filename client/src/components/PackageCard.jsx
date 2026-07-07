import {
    FaStar,
    FaMapMarkerAlt,
    FaClock,
    FaHotel,
    FaPlane,
    FaUtensils,
    FaArrowRight,
} from "react-icons/fa";

import { motion } from "framer-motion";

function PackageCard({ packageData }) {
    return (

        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group bg-white rounded-2xl shadow-x1 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">

            {/* Image */}
            <div className="relative overflow-hidden">

                <img
                    src={packageData.image}
                    alt={packageData.title}
                    className="w-full h-60 object-cover group-hover:scale-110 transition-transform duration-500"
                />

                <div className="absolute top-4 right-4 flex items-center gap-3">

                    <button className="bg-white/90 hover:bg-red-500 hover:text-white transition-all duration-300 p-2 rounded-full shadow-md hover:scale-110">

                        ❤

                    </button>

                
                {/* Badge */}
                <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow">

                    {packageData.badge}

                </div>

                </div>


                {/* Rating */}
                <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full flex items-center gap-1 shadow">

                    <FaStar className="text-yellow-500" />

                    <span className="font-semibold text-sm">
                        {packageData.rating}
                    </span>

                </div>

                
            </div>

            {/* Content */}
            <div className="p-6">

                <h3 className="text-2xl font-bold text-gray-800">

                    {packageData.title}

                </h3>

                <div className="flex items-center gap-2 text-gray-500 mt-2">

                    <FaMapMarkerAlt />

                    <span>{packageData.location}</span>

                </div>

                <div className="flex items-center gap-2 mt-3 text-gray-600">

                    <FaClock />

                    <span>{packageData.duration}</span>

                </div>

                {/* Features */}

                <div className="flex flex-wrap gap-3 mt-5">

                    {packageData.features.map((feature, index) => (

                        <div
                            key={index}
                            className="flex items-center gap-1 text-sm text-gray-700 bg-slate-100 px-3 py-2 rounded-full"
                        >

                            {feature === "Hotel" && <FaHotel />}

                            {feature === "Flight" && <FaPlane />}

                            {(feature === "Breakfast" || feature === "Meals") && (
                                <FaUtensils />
                            )}

                            <span>{feature}</span>

                        </div>

                    ))}
                </div>

                {/* Price */}

                <div className="mt-6">

                    <span className="text-3xl font-bold text-blue-700">

                        ₹{packageData.price.toLocaleString()}

                    </span>

                    <span className="ml-3 text-gray-400 line-through">

                        ₹{packageData.originalPrice.toLocaleString()}

                    </span>

                </div>

                <p className="text-green-600 font-semibold mt-2">

                    Save ₹
                    {(
                        packageData.originalPrice -
                        packageData.price
                    ).toLocaleString()}

                </p>

                {/* Button */}

                <button className="mt-6 w-full bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white py-3 rounded-xl font-semibold flex justify-center items-center gap-2 transition-all duration-300">
                    Book Now

                    <FaArrowRight />

                </button>

            </div>

        </motion.div>
    );
}

export default PackageCard;