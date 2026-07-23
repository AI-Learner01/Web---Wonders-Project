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

function PackageCard({ packageData, onBookNow }) {
    return (

        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group flex flex-col h-full overflow-hidden rounded-[32px] bg-white/35 backdrop-blur-2xl border border-white/30 shadow-[0_20px_60px_rgba(16,185,129,0.15)] hover:shadow-[0_30px_80px_rgba(16,185,129,0.28)] hover:scale-[1.03] hover:-translate-y-2 transition-all duration-500">

            {/* Image */}
            <div className="relative overflow-hidden rounded-t-[32px]">

                <img
                    src={packageData.image}
                    alt={packageData.title}
                    className="w-full
h-64
object-cover
group-hover:scale-110
transition-transform
duration-700"/>

                <div className="absolute top-4 right-4 flex items-center gap-3">

                    <button className="
bg-white/30
backdrop-blur-xl
border
border-white/40
hover:bg-red-500
hover:text-white
transition-all
duration-300
p-3
rounded-full
shadow-lg
hover:scale-110
">

                        ❤

                    </button>


                    {/* Badge */}
                    <div className="
bg-emerald-600/90
backdrop-blur-md
text-white
px-4
py-1.5
rounded-full
text-sm
font-semibold
shadow-lg
">

                        {packageData.badge}

                    </div>

                </div>


                {/* Rating */}
                <div className="absolute
top-4
left-4
bg-white/35
backdrop-blur-xl
border
border-white/40
px-3
py-2
rounded-full
flex
items-center
gap-2
shadow-lg">

                    <FaStar className="text-yellow-500" />

                    <span className="font-semibold text-sm">
                        {packageData.rating}
                    </span>

                </div>


            </div>

            {/* Content */}
            <div className="p-7 flex flex-col flex-grow">

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
                            className="flex items-center gap-1 text-sm text-gray-700 bg-white/30 backdrop-blur-xl border border-white/40 px-3 py-2 rounded-full shadow-sm"
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

                {/* Itinerary Highlights */}

                <div className="mt-5">

                    <h4 className="text-sm font-semibold text-gray-800 mb-2">

                        ✨ Trip Highlights

                    </h4>

                    <div className="space-y-1">

                        {packageData.itinerary.map((place, index) => (

                            <div
                                key={index}
                                className="flex items-center gap-2 text-sm text-gray-600"
                            >

                                <span className="text-emerald-600 font-bold">✔</span>

                                <span>{place}</span>

                            </div>

                        ))}

                    </div>

                </div>

                {/* Price */}

                <div classname="mt-auto pt-6">

                    <div className="mt-6">

                        <p className="text-sm text-gray-500 font-medium">

                            Starting From

                        </p>

                        <div className="flex items-end gap-3">

                            <span className="text-4xl font-extrabold text-emerald-600 drop-shadow-sm">

                                ₹{packageData.price.toLocaleString()}

                            </span>

                            <span className="text-gray-500 mb-1">

                                / person

                            </span>

                            <span className="text-gray-400 line-through text-lg">

                                ₹{packageData.originalPrice.toLocaleString()}

                            </span>

                        </div>

                    </div>
                    <p className="text-emerald-700 font-semibold mt-2">

                        Save ₹
                        {(
                            packageData.originalPrice -
                            packageData.price
                        ).toLocaleString()}

                    </p>

                    {/* Button */}

                    <button
                        onClick={() => {
                            onBookNow(packageData); // This will now trigger the details page navigation
                        }}
                        className="mt-7 w-full rounded-2xl py-4 font-bold text-lg text-white flex justify-center items-center gap-3 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                    >
                        View Details
                        <FaArrowRight />
                    </button>
                </div>

            </div>

        </motion.div>
    );
}

export default PackageCard;