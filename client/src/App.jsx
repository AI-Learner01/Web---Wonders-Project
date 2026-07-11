import { useState } from 'react'
import './App.css'
import Destinations from './pages/Destinations';
import SearchBar from './components/SearchBar';
import DestinationCard from './components/DestinationCard';
import DestinationDetailes from './pages/DestinationDetailes';

function App() {

  return(
    <>
    {/* <div className="overflow-x-hidden"> */}
    {/* whole page */}
     {/* <Destinations/> */}
     <DestinationDetailes/>
    {/* </div> */}
    </>
  )
}

export default App;
