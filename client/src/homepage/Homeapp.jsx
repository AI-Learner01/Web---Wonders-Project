
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Home from './pages/Home'; 

function HomeApp() {
  return (
    <Router>
      <Routes>
        {/* 2. Tell React to load your Home component when users visit the main link */}
        <Route path="/" element={<Home />} />
        
      </Routes>
    </Router>
  );
}

export default HomeApp;
