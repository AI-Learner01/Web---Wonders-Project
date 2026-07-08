import { useState } from "react";

import Packages from "./pages/Packages";
import Booking from "./pages/Booking";

function App() {

    const [page, setPage] = useState("packages");

    const [selectedPackage, setSelectedPackage] = useState(null);

    const handleBookNow = (tourPackage) => {

        setSelectedPackage(tourPackage);

        setPage("booking");

    };

    return (

        <>
            {page === "packages" && (

                <Packages onBookNow={handleBookNow} />

            )}

            {page === "booking" && (

                <Booking
                    selectedPackage={selectedPackage}
                    onBack={() => setPage("packages")}
                />

            )}
        </>

    );

}

export default App;