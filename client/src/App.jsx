import Packages from "./pages/Packages";
import Booking from "./pages/Booking";

function App() {
  // Change this value while developing
  const currentPage = "booking";

  if (currentPage === "packages") return <Packages />;
  if (currentPage === "booking") return <Booking />;
  
  return null;
}

export default App;