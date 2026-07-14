import { useState } from "react";

import Packages from "../packages-booking/pages/Packages"
import Booking from "../packages-booking/pages/Packages";
import BookingSummary from "../packages-booking/pages/Packages";

function PackagesApp() {

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

export default PackagesApp;