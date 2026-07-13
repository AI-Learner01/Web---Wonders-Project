import React from 'react';
// React Router se zaroori cheezein import karein
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './authetication/Login';  
import Signup from './authetication/Signup'; 
import Contact from './authetication/Contact';
import About from './authetication/About';

function App() {
  return (
    <Router>
      <Routes>
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