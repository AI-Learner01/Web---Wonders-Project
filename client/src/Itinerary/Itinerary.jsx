import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    FaChevronDown, FaMapMarkerAlt, FaUtensils, 
    FaBed, FaCamera, FaEdit, FaCheck, FaPlus, FaTrash 
} from "react-icons/fa";

const defaultItinerary = [
    {
        title: "Arrival & Welcome Dinner",
        activities: [
            { icon: <FaMapMarkerAlt />, text: "Arrive at the airport and transfer to the hotel." },
            { icon: <FaBed />, text: "Check-in and relax at a 4-star resort." },
            { icon: <FaUtensils />, text: "Welcome dinner with traditional local cuisine." }
        ]
    },
    {
        title: "City Sightseeing & Culture",
        activities: [
            { icon: <FaUtensils />, text: "Breakfast at the hotel." },
            { icon: <FaCamera />, text: "Guided tour of the historical old town." },
            { icon: <FaCamera />, text: "Visit to the grand museum and local markets." }
        ]
    }
];

function Itinerary({ schedule = defaultItinerary }) {
    // State to manage the editable data
    const [itineraryData, setItineraryData] = useState(schedule);
    const [isEditing, setIsEditing] = useState(false);
    const [openDay, setOpenDay] = useState(0); // Uses array index now

    const toggleDay = (index) => {
        if (!isEditing) {
            setOpenDay(openDay === index ? null : index);
        }
    };

    // --- EDITING FUNCTIONS ---

    const handleTitleChange = (index, newTitle) => {
        const newData = [...itineraryData];
        newData[index].title = newTitle;
        setItineraryData(newData);
    };

    const handleActivityChange = (dayIndex, actIndex, newText) => {
        const newData = [...itineraryData];
        newData[dayIndex].activities[actIndex].text = newText;
        setItineraryData(newData);
    };

    const addActivity = (dayIndex) => {
        const newData = [...itineraryData];
        newData[dayIndex].activities.push({ 
            icon: <FaMapMarkerAlt />, // Default icon for new activities
            text: "New Activity" 
        });
        setItineraryData(newData);
        setOpenDay(dayIndex); // Ensure the accordion is open to see the new item
    };

    const deleteActivity = (dayIndex, actIndex) => {
        const newData = [...itineraryData];
        newData[dayIndex].activities.splice(actIndex, 1);
        setItineraryData(newData);
    };

    const addNewDay = () => {
        const newData = [...itineraryData];
        newData.push({
            title: "New Day Plan",
            activities: [{ icon: <FaMapMarkerAlt />, text: "New Activity" }]
        });
        setItineraryData(newData);
        setOpenDay(newData.length - 1); // Open the newly created day
    };

    const deleteDay = (dayIndex) => {
        const newData = [...itineraryData];
        newData.splice(dayIndex, 1);
        setItineraryData(newData);
    };

    const toggleEditMode = () => {
        if (isEditing) {
            // This is where you would eventually send 'itineraryData' to your database
            console.log("Saved Itinerary Data:", itineraryData);
        } else {
            // Open all days when entering edit mode so everything is visible
            setOpenDay(null); 
        }
        setIsEditing(!isEditing);
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-4">
            {/* Header Area */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                <h2 className="text-3xl font-bold text-gray-800">Trip Itinerary</h2>
                
                <button
                    onClick={toggleEditMode}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold text-white transition-all shadow-md ${
                        isEditing 
                            ? "bg-green-500 hover:bg-green-600" 
                            : "bg-blue-600 hover:bg-blue-700"
                    }`}
                >
                    {isEditing ? <FaCheck /> : <FaEdit />}
                    {isEditing ? "Save Itinerary" : "Edit Itinerary"}
                </button>
            </div>

            {/* Timeline */}
            <div className="space-y-4 relative border-l-2 border-blue-200 ml-4 pl-6">
                {itineraryData.map((item, dayIndex) => {
                    // In edit mode, force everything open, otherwise use accordion logic
                    const isOpen = isEditing || openDay === dayIndex;

                    return (
                        <div key={dayIndex} className="relative group">
                            {/* Timeline Dot */}
                            <div className="absolute -left-[35px] top-4 w-5 h-5 bg-blue-500 rounded-full border-4 border-white shadow-sm z-10"></div>

                            {/* Accordion Header */}
                            <div
                                onClick={() => toggleDay(dayIndex)}
                                className={`w-full flex items-center justify-between p-5 rounded-2xl transition-all duration-300 ${
                                    isOpen && !isEditing ? "bg-blue-600 text-white shadow-lg" : "bg-white text-gray-800 shadow-md"
                                } ${!isEditing ? "cursor-pointer hover:bg-gray-50" : "border-b-0 rounded-b-none border border-gray-200"}`}
                            >
                                <div className="text-left flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 w-full mr-4">
                                    <span className={`font-bold text-lg min-w-[70px] ${isOpen && !isEditing ? "text-blue-200" : "text-blue-600"}`}>
                                        Day {dayIndex + 1}
                                    </span>
                                    
                                    {isEditing ? (
                                        <input 
                                            type="text" 
                                            value={item.title}
                                            onChange={(e) => handleTitleChange(dayIndex, e.target.value)}
                                            className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg outline-none focus:border-blue-500 text-gray-800 font-semibold text-lg"
                                        />
                                    ) : (
                                        <span className="font-semibold text-xl">{item.title}</span>
                                    )}
                                </div>
                                
                                <div className="flex items-center gap-4 text-gray-400">
                                    {isEditing && (
                                        <button 
                                            onClick={() => deleteDay(dayIndex)}
                                            className="text-red-400 hover:text-red-600 transition p-2 bg-red-50 hover:bg-red-100 rounded-full"
                                            title="Delete Day"
                                        >
                                            <FaTrash />
                                        </button>
                                    )}
                                    {!isEditing && (
                                        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                                            <FaChevronDown className={isOpen ? "text-white" : "text-gray-400"} />
                                        </motion.div>
                                    )}
                                </div>
                            </div>

                            {/* Accordion Body */}
                            <AnimatePresence>
                                {isOpen && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className="overflow-hidden"
                                    >
                                        <div className={`bg-white p-6 pt-6 shadow-inner text-gray-700 ${isEditing ? "border border-t-0 border-gray-200 rounded-b-2xl" : "mt-[-10px] border border-t-0 border-gray-100 rounded-b-2xl"}`}>
                                            <ul className="space-y-4">
                                                {item.activities.map((activity, actIndex) => (
                                                    <li key={actIndex} className="flex items-start gap-4">
                                                        <span className="text-blue-500 mt-2 flex-shrink-0 text-lg">
                                                            {activity.icon}
                                                        </span>
                                                        
                                                        {isEditing ? (
                                                            <div className="flex w-full items-center gap-3">
                                                                <textarea
                                                                    rows={2}
                                                                    value={activity.text}
                                                                    onChange={(e) => handleActivityChange(dayIndex, actIndex, e.target.value)}
                                                                    className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg outline-none focus:border-blue-500 text-gray-700 resize-none"
                                                                />
                                                                <button 
                                                                    onClick={() => deleteActivity(dayIndex, actIndex)}
                                                                    className="text-gray-400 hover:text-red-500 transition"
                                                                >
                                                                    <FaTrash />
                                                                </button>
                                                            </div>
                                                        ) : (
                                                            <span className="leading-relaxed mt-1">
                                                                {activity.text}
                                                            </span>
                                                        )}
                                                    </li>
                                                ))}
                                            </ul>

                                            {/* Add Activity Button (Only in Edit Mode) */}
                                            {isEditing && (
                                                <button 
                                                    onClick={() => addActivity(dayIndex)}
                                                    className="mt-6 flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-800 transition"
                                                >
                                                    <FaPlus className="text-sm" /> Add Activity
                                                </button>
                                            )}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}
            </div>

            {/* Add New Day Button (Only in Edit Mode) */}
            {isEditing && (
                <button 
                    onClick={addNewDay}
                    className="mt-10 ml-4 flex items-center gap-2 px-6 py-3 bg-white border-2 border-dashed border-gray-300 text-gray-600 rounded-xl font-bold hover:border-blue-500 hover:text-blue-600 transition-all w-full max-w-sm"
                >
                    <FaPlus /> Add New Day
                </button>
            )}
        </div>
    );
}

export default Itinerary;