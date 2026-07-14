import React from 'react';
// React Router se zaroori cheezein import karein
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';  
import Signup from './Signup'; 
import Contact from './Contact';
import About from './About';

function AuthApp() {
  return (
    <>
      <Routes>
        {/* Jab koi sirf website open kare (path="/"), toh wo direct /login par chala jaye */}
        {/* <Route path="/" element={<Navigate to="/home" />} /> */}
        {/* Login aur Signup ke alag-alag raste (paths) */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

export default AuthApp;