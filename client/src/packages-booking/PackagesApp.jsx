import { Navigate, Route, Routes, useLocation, useNavigate, useParams } from "react-router-dom";
import Booking from "./pages/Booking";
import BookingSummary from "./pages/BookingSummary";
import Packages from "./pages/Packages";
import packages from "./data/packages"; // Required for the wrappers to fetch package data
import ScrollToTop from "../components/DestinationDetailPageComponents/ScrollToTop";

function PackagesRoute() {
    const navigate = useNavigate();
    return (
        <Packages
            onBookNow={(tourPackage) =>
                navigate(`/packages/booking/${tourPackage.id}`)
            }
        />
    );
}

function BookingRoute() {
    const navigate = useNavigate();
    const { packageId } = useParams();
    
    const selectedPackage = packages.find(
        (tourPackage) => tourPackage.id === Number(packageId)
    );

    // If a user types a fake ID in the URL, safely send them back to the packages page
    if (!selectedPackage) {
        return <Navigate to="/packages" replace />;
    }

    return (
        <Booking
            selectedPackage={selectedPackage}
            onBack={() => navigate("/packages")}
            onContinue={(bookingData) =>
                navigate(`/packages/booking/${selectedPackage.id}/summary`, {
                    state: { bookingData },
                })
            }
        />
    );
}

function BookingSummaryRoute() {
    const navigate = useNavigate();
    const location = useLocation();
    const { packageId } = useParams();
    
    const selectedPackage = packages.find(
        (tourPackage) => tourPackage.id === Number(packageId)
    );
    const bookingData = location.state?.bookingData;

    if (!selectedPackage) {
        return <Navigate to="/packages" replace />;
    }

    if (!bookingData) {
        return <Navigate to={`/packages/booking/${selectedPackage.id}`} replace />;
    }

    return (
        <BookingSummary
            selectedPackage={selectedPackage}
            bookingData={bookingData}
            onBack={() => navigate(`/packages/booking/${selectedPackage.id}`)}
        />
    );
}

function PackagesApp() {
    return (
        <>
            <ScrollToTop/>
            <Routes>
                {/* Use 'index' to guarantee it perfectly matches the base /packages route */}
                <Route index element={<PackagesRoute />} />
                
                {/*  Relative child routes */}
                <Route path="booking/:packageId" element={<BookingRoute />} />
                <Route path="booking/:packageId/summary" element={<BookingSummaryRoute />} />
                
                {/* Safe absolute fallback to prevent infinite loops */}
                <Route path="*" element={<Navigate to="/packages" replace />} />
            </Routes>
        </>
    );
}

export default PackagesApp;