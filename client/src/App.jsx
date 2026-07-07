import React from 'react';
// React Router se zaroori cheezein import karein
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/authetication/Login';   // Aapka Login component
import Signup from './pages/authetication/Signup'; // Aapka Signup component

function App() {
  return (
    <Router>
      <Routes>
        {/* Jab koi sirf website open kare (path="/"), toh wo direct /login par chala jaye */}
        <Route path="/" element={<Navigate to="/login" />} />
        {/* Login aur Signup ke alag-alag raste (paths) */}
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;