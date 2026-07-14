
import React from 'react';
import { BrowserRouter as Router, Routes, Route, BrowserRouter} from 'react-router-dom';
import DestApp from './pages/Destination-pages/DestApp';
import AuthApp from './authentication/AuthApp'
import Home from './homepage/Home';
import Login from './authentication/Login';
import Signup from './authentication/Signup';
import Contact from './authentication/Contact';
import About from './authentication/About';
import PackagesApp from './packages-booking/PackagesApp'
function App() {
  return (
    <BrowserRouter>
      <Routes>
                {/* <Route path="/" element={<Navigate to="/home" />} /> */}
        
        <Route path="/" element={<Home />} />
        <Route path = "/destinations/*" element = {<DestApp/>} />
        <Route path="/login" element = {<Login/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
