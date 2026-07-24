import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import DestApp from './pages/Destination-pages/DestApp';
import Home from './homepage/Home';
import Login from './authentication/Login';
import Signup from './authentication/Signup';
import Contact from './authentication/Contact';
import About from './authentication/About';
import Navbar from './homepage/Navbar';
import PackagesApp from './packages-booking/PackagesApp';
import Footer from './homepage/Footer'; 
import ItineraryBuilder from './pages/Destination-pages/ItineraryBuilder';

// 2. Create a helper component that reads the current URL
function ConditionalFooter() {
  const location = useLocation();
  const path = location.pathname.toLowerCase();

  // Exact routes where the footer should NOT appear
  const hiddenPaths = ['/login', '/signup', '/contact'];

  // Hide on exact routes OR if the URL contains "/booking" 
  const hideFooter = hiddenPaths.includes(path) || path.includes('/booking');

  if (hideFooter) {
    return null; // Render nothing
  }

  return <Footer />; // Render the Footer everywhere else
}

function App() {
  return (
    <BrowserRouter>
      {/* Global Navbar */}
      <Navbar />
      
      {/* Main Content */}
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/destinations/*" element={<DestApp />} />
          <Route path="/packages/*" element={<PackagesApp />} />
          <Route path="/itinerary" element={<ItineraryBuilder />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Place the conditional footer at the very bottom */}
      <ConditionalFooter />
    </BrowserRouter>
  );
}

export default App;