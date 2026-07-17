import { useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import PackageCard from "./PackageCard";

function PackageSection({
    title,
    packages,
    onBookNow
}) {
    const scrollRef = useRef(null);
    
    // State to toggle between slider view and grid view
    const [showAll, setShowAll] = useState(false);

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: -420,
                behavior: "smooth",
            });
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: 420,
                behavior: "smooth",
            });
        }
    };

    return (
        <section className="mb-16">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-gray-800">
                    {title}
                </h2>

                {/* Toggle Button */}
                <button
                    onClick={() => setShowAll(!showAll)}
                    className="text-green-600 font-semibold hover:text-green-700 hover:underline transition"
                >
                    {showAll ? "Show Less ←" : "See All →"}
                </button>
            </div>

            {showAll ? (
                // Responsive Grid View (Shows when "See All" is clicked)
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-2">
                    {packages.map((item) => (
                        <div key={item.id} className="w-full flex justify-center">
                            <PackageCard
                                packageData={item}
                                onBookNow={onBookNow}
                            />
                        </div>
                    ))}
                </div>
            ) : (
                // Horizontal Slider View (Default)
                <div className="relative">
                    {/* Left Arrow */}
                    <button
                        onClick={scrollLeft}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white shadow-xl border flex items-center justify-center hover:bg-green-600 hover:text-white transition"
                    >
                        <FaChevronLeft />
                    </button>

                    {/* Cards Container */}
                    <div
                        ref={scrollRef}
                        className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar snap-x snap-mandatory px-14 py-4"
                    >
                        {packages.map((item) => (
                            <div
                                key={item.id}
                                className="min-w-[350px] max-w-[350px] flex-shrink-0 snap-start"
                            >
                                <PackageCard
                                    packageData={item}
                                    onBookNow={onBookNow}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Right Arrow */}
                    <button
                        onClick={scrollRight}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white shadow-xl border flex items-center justify-center hover:bg-green-600 hover:text-white transition"
                    >
                        <FaChevronRight />
                    </button>
                </div>
            )}
        </section>
    );
}

export default PackageSection;