import { Navigate, Route, Routes, useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Booking from "./pages/Booking";
import BookingSummary from "./pages/BookingSummary";
import Packages from "./pages/Packages";
import ScrollToTop from "../components/DestinationDetailPageComponents/ScrollToTop";

function PackagesWrapper() {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/packages");
                const result = await response.json();

                if (result.success) {
                    setPackages(result.data);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPackages();
    }, []);

    if (loading) {
        return <h2>Loading...</h2>;
    }

    return <PackagesRoutes packages={packages} />;
}

function PackagesRoute({packages}) {
    const navigate = useNavigate();
    return (
        <Packages
            packages={packages}
            onBookNow={(tourPackage) =>
                navigate(`/packages/booking/${tourPackage._id}`)
            }
        />
    );
}

function BookingRoute({packages}) {
    const navigate = useNavigate();
    const { packageId } = useParams();
    
    const selectedPackage = packages.find(
        (tourPackage) => tourPackage._id === packageId
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
                navigate(`/packages/booking/${selectedPackage._id}/summary`, {
                    state: { bookingData },
                })
            }
        />
    );
}

function BookingSummaryRoute({packages}) {
    const navigate = useNavigate();
    const location = useLocation();
    const { packageId } = useParams();
    
    const selectedPackage = packages.find(
        (tourPackage) => tourPackage._id === packageId
    );
    const bookingData = location.state?.bookingData;

    if (!selectedPackage) {
        return <Navigate to="/packages" replace />;
    }

    if (!bookingData) {
        return <Navigate to={`/packages/booking/${selectedPackage._id}`} replace />;
    }

    return (
        <BookingSummary
            selectedPackage={selectedPackage}
            bookingData={bookingData}
            onBack={() => navigate(`/packages/booking/${selectedPackage._id}`)}
        />
    );
}

function PackagesRoutes({packages}) {
    return (
        <>
            <ScrollToTop/>
            <Routes>
                {/* Use 'index' to guarantee it perfectly matches the base /packages route */}
                <Route index element={<PackagesRoute packages={packages} />} />
                
                {/*  Relative child routes */}
                <Route path="booking/:packageId" element={<BookingRoute packages={packages} />} />
                <Route path="booking/:packageId/summary" element={<BookingSummaryRoute packages={packages} />} />
                
                {/* Safe absolute fallback to prevent infinite loops */}
                <Route path="*" element={<Navigate to="/packages" replace />} />
            </Routes>
        </>
    );
}

function PackagesApp() {
    return <PackagesWrapper />;
}

export default PackagesApp;