import React, { useState } from 'react'

const Navbar = () => {
    const [smallMenu, setHid] = useState(true);
    const [openMenu, setOpen] = useState(false); // for menu to be opened onclick in smaller screens
  return (

    // items-center -> Vertical centering
    // justify-center -> Horizontal content centering
    // justify-between -> Horizontal space centering
    // px -> padding in horizontal
    // h-14 -> height is 14
    // mr-5 -> margin-right: 1.25rem;
    // sm -> responsiveness for small screens like mobile phones 
    //       to the left of sm works for smaller screen
    //       to the right of sm just after with no space : works for not smaller screen        
    <>
    <div className='flex items-center justify-between h-14 bg-gray-200 px-16'>
        {smallMenu && (<div className='-px-2 font-bold'>AuraAvenue</div>)}

        {/* Desktop Nav */}
        <div className='hidden sm:flex gap-8 cursor-pointer'>
            <span>Home</span>
            <span>Destinations</span>
            <span>Itinerary</span>
            <span>Packages</span>
            <span>About Us</span>
            <span>Contact</span>
        </div>

        <button className='fixed right-4 bg-blue-200 px-4 py-1 rounded-sm shadow-inner cursor-pointer text-md border-0 sm:hidden' onClick={() => {setOpen(!openMenu); setHid(!smallMenu);}}>Menu</button>

    </div>
        {/* Mobile Nav */}
        {openMenu && (
            <div className='flex flex-col text-center pr-5 bg-gray-200 gap-2 '>
                <span>Home</span>
                <span>Destinations</span>
                <span>Itinerary</span>
                <span>Packages</span>
                <span>About Us</span>
                <span>Contact</span>
            </div>
        )}
    </>
  )
}

export default Navbar
