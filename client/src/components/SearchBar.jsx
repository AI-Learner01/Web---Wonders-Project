import React from 'react'
import SearchIcon from "../assets/Icons/search-outline-svgrepo-com.svg"

const SearchBar = () => {
  return (
    <>
    <div className='flex items-center justify-center'>
        <img
          src={SearchIcon}
          alt="Search"
          className="w-5 h-5 -mr-10 z-10"
        />

        <input type="search" id="search" className='p-4 w-1/3 brightness-1.5 rounded-full border-2 border-blue-500 pl-12' placeholder="Search" required />
    </div>
    </>
  )
}

export default SearchBar
