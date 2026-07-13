import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// 1. Import the Home page you just built!
// (Make sure the path matches where you saved it)
import Home from './pages/Home'; 

// React Router se zaroori cheezein import karein
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/authetication/Login';  
import Signup from './pages/authetication/Signup'; 
import Contact from './pages/authetication/Contact';
import About from './pages/authetication/About';

function App() {
  return (
    <Router>
      <Routes>
        {/* 2. Tell React to load your Home component when users visit the main link */}
        <Route path="/" element={<Home />} />
        
        {/* Your team can add their routes here later, like: */}
        {/* <Route path="/destinations" element={<Destinations />} /> */}
        {/* <Route path="/login" element={<Login />} /> */}
        {/* Jab koi sirf website open kare (path="/"), toh wo direct /login par chala jaye */}
        <Route path="/" element={<Navigate to="/login" />} />
        {/* Login aur Signup ke alag-alag raste (paths) */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;