import { useState } from 'react'
import './App.css'
import Destinations from './pages/Destinations';
import SearchBar from './components/SearchBar';
import DestinationCard from './components/DestinationCard';

function App() {

  return(
    <>
    <div className="overflow-x-hidden">
    {/* whole page */}
     <Destinations/>
</div>
    </>
  )
}

export default App;
