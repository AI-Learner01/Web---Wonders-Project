import { useState } from "react";

import Packages from "./pages/Packages";
import Booking from "./pages/Booking";
import BookingSummary from "./pages/BookingSummary";

function App() {

    const [page, setPage] = useState("packages");

    const [selectedPackage, setSelectedPackage] = useState(null);

    const [bookingData, setBookingData] = useState(null);

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
                    onContinue={(data) => {

                        setBookingData(data);

                        setPage("summary");

                    }}
                />

            )}

            {page === "summary" && (
                <BookingSummary
                    selectedPackage={selectedPackage}
                    bookingData={bookingData}
                    onBack={() => setPage("booking")}
                />
            )}
        </>

    );

}

export default App;