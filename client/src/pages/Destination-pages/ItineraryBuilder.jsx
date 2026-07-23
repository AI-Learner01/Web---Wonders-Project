import { useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaTrash, FaMapMarkerAlt, FaClock, FaBed, FaUtensils, FaCamera } from "react-icons/fa";

export default function ItineraryBuilder() {
  const [tripName, setTripName] = useState("My Dream Vacation");
  const [days, setDays] = useState([
    {
      id: 1,
      title: "Arrival & City Tour",
      activities: [
        { id: 101, time: "10:00 AM", title: "Check-in at Hotel", type: "stay" },
        { id: 102, time: "01:00 PM", title: "Lunch at Local Cafe", type: "food" },
        { id: 103, time: "03:00 PM", title: "Explore Old Town", type: "explore" }
      ]
    }
  ]);

  // --- CRUD Operations for Days ---
  const addDay = () => {
    const newDay = {
      id: Date.now(),
      title: `Day ${days.length + 1} Plan`,
      activities: []
    };
    setDays([...days, newDay]);
  };

  const deleteDay = (dayId) => {
    setDays(days.filter(day => day.id !== dayId));
  };

  const updateDayTitle = (dayId, newTitle) => {
    setDays(days.map(day => day.id === dayId ? { ...day, title: newTitle } : day));
  };

  // --- CRUD Operations for Activities ---
  const addActivity = (dayId) => {
    const newActivity = {
      id: Date.now(),
      time: "12:00 PM",
      title: "New Activity",
      type: "explore"
    };
    setDays(days.map(day => 
      day.id === dayId ? { ...day, activities: [...day.activities, newActivity] } : day
    ));
  };

  const deleteActivity = (dayId, activityId) => {
    setDays(days.map(day => 
      day.id === dayId ? { 
        ...day, 
        activities: day.activities.filter(act => act.id !== activityId) 
      } : day
    ));
  };

  const updateActivity = (dayId, activityId, field, value) => {
    setDays(days.map(day => 
      day.id === dayId ? {
        ...day,
        activities: day.activities.map(act => 
          act.id === activityId ? { ...act, [field]: value } : act
        )
      } : day
    ));
  };

  const getActivityIcon = (type) => {
    switch(type) {
      case 'stay': return <FaBed className="text-blue-500" />;
      case 'food': return <FaUtensils className="text-orange-500" />;
      case 'explore': return <FaCamera className="text-emerald-500" />;
      default: return <FaMapMarkerAlt className="text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F4EF] text-[#14201A] pb-20">
      
      {/* Hero Section matching Home theme */}
      <section className="bg-[#0F1D16] py-16 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#3DD68C] mb-6">
            Custom Builder
          </span>
          <input 
            type="text" 
            value={tripName}
            onChange={(e) => setTripName(e.target.value)}
            className="block w-full bg-transparent font-serif text-4xl sm:text-5xl lg:text-6xl text-white outline-none border-b-2 border-transparent focus:border-[#3DD68C] transition-colors pb-2"
            placeholder="Name your trip..."
          />
          <p className="mt-4 text-white/70 text-lg max-w-2xl">
            Design your perfect journey day by day. Add destinations, customize times, and build an adventure that stays with you.
          </p>
        </div>
      </section>

      {/* Main Builder Area */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left Column: Day-by-Day Timeline */}
        <div className="lg:col-span-2 space-y-8">
          {days.map((day, index) => (
            <div key={day.id} className="bg-white rounded-3xl border border-[#E5E7E0] shadow-sm p-6 sm:p-8">
              
              {/* Day Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#E5E7E0]">
                <div className="flex items-center gap-4 flex-1">
                  <div className="bg-[#167A44] text-white font-bold h-12 w-12 rounded-xl flex items-center justify-center shrink-0">
                    D{index + 1}
                  </div>
                  <input 
                    type="text"
                    value={day.title}
                    onChange={(e) => updateDayTitle(day.id, e.target.value)}
                    className="text-2xl font-extrabold text-[#14201A] outline-none border-b border-transparent focus:border-[#3DD68C] w-full"
                    placeholder="E.g., Arrival in Paris"
                  />
                </div>
                <button 
                  onClick={() => deleteDay(day.id)}
                  className="text-red-400 hover:text-red-600 p-2 transition-colors self-end sm:self-auto"
                  title="Delete Day"
                >
                  <FaTrash />
                </button>
              </div>

              {/* Activities List */}
              <div className="space-y-4 pl-2 sm:pl-6 border-l-2 border-[#E5E7E0] ml-4 sm:ml-6">
                {day.activities.map((activity) => (
                  <div key={activity.id} className="relative bg-[#F5F4EF] rounded-2xl p-4 flex flex-col sm:flex-row gap-4 sm:items-center group border border-transparent hover:border-[#3DD68C]/30 transition-all">
                    
                    {/* Timeline Dot */}
                    <div className="absolute -left-[27px] sm:-left-[43px] top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-4 border-[#167A44] rounded-full"></div>
                    
                    {/* Activity Time & Type */}
                    <div className="flex items-center gap-3 w-full sm:w-auto shrink-0">
                      <select 
                        value={activity.type}
                        onChange={(e) => updateActivity(day.id, activity.id, 'type', e.target.value)}
                        className="bg-white border border-[#E5E7E0] rounded-lg p-2 outline-none"
                      >
                        <option value="explore">Explore</option>
                        <option value="food">Dining</option>
                        <option value="stay">Stay</option>
                      </select>
                      <div className="flex items-center gap-2 bg-white border border-[#E5E7E0] rounded-lg px-3 py-2">
                        <FaClock className="text-[#6B7167] text-sm" />
                        <input 
                          type="text" 
                          value={activity.time}
                          onChange={(e) => updateActivity(day.id, activity.id, 'time', e.target.value)}
                          className="w-20 outline-none text-sm font-semibold text-[#14201A]"
                        />
                      </div>
                    </div>

                    {/* Activity Title */}
                    <div className="flex-1 flex items-center gap-3">
                      <div className="bg-white p-3 rounded-full shadow-sm">
                        {getActivityIcon(activity.type)}
                      </div>
                      <input 
                        type="text"
                        value={activity.title}
                        onChange={(e) => updateActivity(day.id, activity.id, 'title', e.target.value)}
                        className="w-full bg-transparent font-bold text-[#14201A] outline-none border-b border-transparent focus:border-[#3DD68C]"
                        placeholder="What are you doing?"
                      />
                    </div>

                    {/* Delete Activity */}
                    <button 
                      onClick={() => deleteActivity(day.id, activity.id)}
                      className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 transition-opacity absolute right-4 top-4 sm:relative sm:top-0 sm:right-0"
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))}

                {/* Add Activity Button */}
                <button 
                  onClick={() => addActivity(day.id)}
                  className="mt-6 flex items-center gap-2 text-[#167A44] font-semibold hover:text-[#125E36] transition-colors"
                >
                  <div className="bg-[#1EA35B]/10 p-2 rounded-full">
                    <FaPlus className="text-sm" />
                  </div>
                  Add an activity
                </button>
              </div>
            </div>
          ))}

          {/* Add Day Button */}
          <button 
            onClick={addDay}
            className="w-full py-6 border-2 border-dashed border-[#167A44]/30 rounded-3xl text-[#167A44] font-bold text-lg hover:bg-[#1EA35B]/5 hover:border-[#167A44] transition-all flex items-center justify-center gap-3"
          >
            <FaPlus /> Add Another Day
          </button>
        </div>

        {/* Right Column: Tools & Inspiration */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-3xl border border-[#E5E7E0] p-6 shadow-sm sticky top-6">
            <h3 className="text-xl font-bold text-[#14201A] mb-4">Itinerary Summary</h3>
            <div className="space-y-3 mb-8">
              <div className="flex justify-between text-[#6B7167]">
                <span>Total Days</span>
                <span className="font-bold text-[#14201A]">{days.length}</span>
              </div>
              <div className="flex justify-between text-[#6B7167]">
                <span>Total Activities</span>
                <span className="font-bold text-[#14201A]">{days.reduce((total, day) => total + day.activities.length, 0)}</span>
              </div>
            </div>

            <h3 className="text-lg font-bold text-[#14201A] mb-4">Need Inspiration?</h3>
            <p className="text-sm text-[#6B7167] mb-6">
              Browse our curated destinations and instantly add them to your custom itinerary.
            </p>
            <Link 
              to="/destinations"
              className="block w-full text-center rounded-full bg-[#167A44] px-6 py-3 font-semibold text-white transition hover:bg-[#125E36]"
            >
              Browse Destinations
            </Link>
            
            <div className="mt-4 pt-4 border-t border-[#E5E7E0]">
              <p className="text-sm text-[#6B7167] mb-4 text-center">Or start with a pre-planned route:</p>
              <Link 
                to="/packages"
                className="block w-full text-center rounded-full border border-[#167A44] px-6 py-3 font-semibold text-[#167A44] transition hover:bg-[#1EA35B]/5"
              >
                View Curated Packages
              </Link>
            </div>
          </div>
        </div>

      </section>
    </div>
  );
}