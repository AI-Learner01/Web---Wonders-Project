import React, {useState} from 'react'
import DestDetAbout from "./DestDetAbout"
import DestDetGallery from "./DestDetGallery"
import DestDetWeather from './DestDetWeather'
import DestDetMap from "./DestDetMap"

const DestDetTabs = ({aboutText, locationName, caption}) => {
    const [activeTab, setActiveTab] = useState("about");

    const tabs = [
        {id: "about", label: "About"},
        {id: "map", label: "Map"},
        {id: "weather" , label: "Live Weather"},
    ];
  return (
    <div>
      <section className='bg-white'>
        {/* Sticky tab bar */}
        <div className='sticky top-14 z-30 border-b bg-white shadow-md'>
            <div className="mx-auto flex items-center justify-center gap-4 overflow-x-auto px-4 py-4 max-w-7xl no-scrollbar">

                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`cursor-pointer rounded-full px-6 py-2 font-semibold transition-all duration-300
                                ${
                                    activeTab === tab.id ? "bg-emerald-500 text-white shadow-md" : "bg-gray-100 text-gray-700 hover:bg-emerald-100"
                                }
                            `}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
        </div>


        {/* Tab content */}
        <div className='mx-auto max-w-7xl px-6 py-10'>
                {activeTab === "about" && <DestDetAbout aboutText = {aboutText}/>}
                {activeTab === "map" && <DestDetMap locationName={locationName} caption = {caption}/>}
                {activeTab === "weather" && <DestDetWeather locationName={locationName}/>}
        </div>
      </section>
    </div>
  )
}

export default DestDetTabs
