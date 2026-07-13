
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// 1. Import the Home page you just built!
// (Make sure the path matches where you saved it)
import Home from './pages/Home'; 

function App() {
  return (
    <Router>
      <Routes>
        {/* 2. Tell React to load your Home component when users visit the main link */}
        <Route path="/" element={<Home />} />
        
        {/* Your team can add their routes here later, like: */}
        {/* <Route path="/destinations" element={<Destinations />} /> */}
        {/* <Route path="/login" element={<Login />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
